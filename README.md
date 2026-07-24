# equipworth
Legacy Equipment

## Accounts & invites setup

Sign-in is real (Supabase-backed accounts) and invite-only — there's no public
sign-up form. New accounts are created by opening a one-time invite link sent
from the admin's **Invites** panel in the sidebar.

### 1. Supabase

1. Create a project at supabase.com.
2. Project → SQL Editor → New query → paste in `supabase/schema.sql` → Run.
3. Project → Settings → API: copy the **Project URL** and the **service_role** key
   (not the anon key — the service role key is what the server uses, and it
   must never be exposed to the browser).

### 2. Resend (sends the invite emails)

1. Create an account at resend.com and grab an API key.
2. Add and verify your sending domain (Resend gives you a few DNS records to
   add — takes a few minutes to propagate). Once verified you can send from
   e.g. `EquipWorth <invites@yourdomain.com>`.

### 3. Vercel environment variables

Set these on the Vercel project (Settings → Environment Variables):

| Variable | Value |
|---|---|
| `SUPABASE_URL` | Project URL from step 1 |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role key from step 1 |
| `RESEND_API_KEY` | API key from step 2 |
| `INVITE_FROM_EMAIL` | e.g. `EquipWorth <invites@yourdomain.com>` |
| `SESSION_SECRET` | any long random string (e.g. `openssl rand -base64 48`) |
| `ADMIN_EMAIL` | `sheabarnett95@gmail.com` (defaults to this if unset) |

`APP_URL` is optional — only set it if invite links should point somewhere
other than the deployed domain Vercel serves the request from.

### 4. Create the first (admin) account

There's no one to invite the very first user, so plant one invite directly:
open the commented block at the bottom of `supabase/schema.sql`, uncomment it,
and run it in the SQL editor. It returns a token — open
`https://<your-domain>/invite/<token>` and create the account exactly like any
invited teammate would. From then on that account (matching `ADMIN_EMAIL`)
sees the Invites panel and can invite everyone else by email.

Invite links are single-use and never expire on a timer — they stop working
the moment an account is created from them, not after some fixed number of
days.
