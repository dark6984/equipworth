import { db } from '../_lib/supabase.js';
import { requireAdmin } from '../_lib/session.js';
import { generateInviteToken } from '../_lib/password.js';
import { sendInviteEmail } from '../_lib/email.js';
import { appUrlFromReq } from '../_lib/url.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  const admin = requireAdmin(req, res);
  if (!admin) return;

  if (req.method === 'GET') return listInvites(req, res);
  if (req.method === 'POST') return createInvite(req, res, admin);

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'Method not allowed' });
}

async function listInvites(req, res) {
  const { data: invites, error } = await db()
    .from('invites')
    .select('id, email, created_at, used_at, revoked_at, invited_by, used_by')
    .order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: 'Could not load invites' });

  const userIds = [...new Set(invites.flatMap((i) => [i.invited_by, i.used_by]).filter(Boolean))];
  let usersById = {};
  if (userIds.length) {
    const { data: users } = await db().from('users').select('id, name, email, username').in('id', userIds);
    usersById = Object.fromEntries((users || []).map((u) => [u.id, u]));
  }

  const rows = invites.map((i) => ({
    id: i.id,
    email: i.email,
    createdAt: i.created_at,
    status: i.used_at ? 'joined' : i.revoked_at ? 'revoked' : 'pending',
    joinedAs: i.used_by ? usersById[i.used_by] || null : null,
    invitedBy: i.invited_by ? usersById[i.invited_by] || null : null,
  }));

  return res.status(200).json({ invites: rows });
}

async function createInvite(req, res, admin) {
  const email = String((req.body || {}).email || '').toLowerCase().trim();
  if (!EMAIL_RE.test(email)) return res.status(400).json({ error: 'Enter a valid email address' });

  const { data: existingUser } = await db().from('users').select('id').eq('email', email).maybeSingle();
  if (existingUser) return res.status(409).json({ error: 'That email already has an account' });

  await db().from('invites').update({ revoked_at: new Date().toISOString() })
    .eq('email', email).is('used_at', null).is('revoked_at', null);

  const token = generateInviteToken();
  const { data: invite, error } = await db()
    .from('invites')
    .insert({ token, email, invited_by: admin.id })
    .select('id, email, created_at')
    .single();
  if (error) return res.status(500).json({ error: 'Could not create the invite' });

  const inviteUrl = `${appUrlFromReq(req)}/invite/${token}`;
  const logoUrl = `${appUrlFromReq(req)}/email/equipworth-email-logo.png`;

  let emailSent = true;
  try {
    await sendInviteEmail({ to: email, inviteUrl, logoUrl, invitedByName: admin.name });
  } catch (e) {
    emailSent = false;
  }

  return res.status(200).json({
    invite: { id: invite.id, email: invite.email, createdAt: invite.created_at, status: 'pending', inviteUrl },
    emailSent,
  });
}
