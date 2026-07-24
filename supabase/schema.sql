-- EquipWorth invite-only accounts
-- Run this once in the Supabase SQL editor (Project -> SQL Editor -> New query).

create extension if not exists pgcrypto;

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  username text unique not null,
  name text not null,
  password_hash text not null,
  created_at timestamptz not null default now()
);

create table if not exists invites (
  id uuid primary key default gen_random_uuid(),
  token text unique not null,
  email text not null,
  invited_by uuid references users(id),
  created_at timestamptz not null default now(),
  used_at timestamptz,
  used_by uuid references users(id),
  revoked_at timestamptz
);

create index if not exists invites_email_idx on invites(email);

-- Server-side only access (the app talks to Supabase with the service role
-- key from Vercel serverless functions, never with the anon key from the
-- browser). RLS is enabled with no policies as a backstop: if the anon key
-- ever leaked or got used client-side by mistake, it still couldn't read or
-- write these tables.
alter table users enable row level security;
alter table invites enable row level security;

-- Atomically redeems a single-use invite: marks it used and creates the
-- account in one transaction, so a token can never be raced into creating
-- two accounts and never lingers "used" without a user actually existing.
create or replace function redeem_invite(
  p_token text,
  p_username text,
  p_name text,
  p_password_hash text
) returns users
language plpgsql
security definer
set search_path = public
as $$
declare
  v_invite invites;
  v_user users;
begin
  update invites
    set used_at = now()
    where token = p_token
      and used_at is null
      and revoked_at is null
    returning * into v_invite;

  if v_invite.id is null then
    raise exception 'invite_invalid' using errcode = 'P0001';
  end if;

  insert into users (email, username, name, password_hash)
    values (v_invite.email, p_username, p_name, p_password_hash)
    returning * into v_user;

  update invites set used_by = v_user.id where id = v_invite.id;

  return v_user;
end;
$$;

-- Bootstrap: create your own (admin) account.
-- 1. Run the block below once, with your own email, to plant the first
--    invite directly (there's no one to invite the very first admin).
-- 2. It prints the one-time onboarding link. Open it and create your account
--    exactly like any invited teammate would.
-- 3. Nothing else about the admin account is special in this table --
--    admin rights are granted purely by matching ADMIN_EMAIL in the app's
--    environment variables (see README), not by anything stored here.
--
-- insert into invites (token, email)
-- values (
--   rtrim(replace(replace(encode(gen_random_bytes(32), 'base64'), '+', '-'), '/', '_'), '='),
--   'sheabarnett95@gmail.com'
-- )
-- returning token;
