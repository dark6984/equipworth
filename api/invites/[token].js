import { db } from '../_lib/supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token } = req.query;
  const { data: invite, error } = await db()
    .from('invites')
    .select('email, used_at, revoked_at')
    .eq('token', token)
    .maybeSingle();

  if (error) return res.status(500).json({ error: 'Something went wrong. Try again.' });
  if (!invite) return res.status(404).json({ error: 'invalid' });
  if (invite.used_at) return res.status(410).json({ error: 'used' });
  if (invite.revoked_at) return res.status(410).json({ error: 'revoked' });

  return res.status(200).json({ email: invite.email });
}
