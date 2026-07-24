import { db } from '../../_lib/supabase.js';
import { requireAdmin } from '../../_lib/session.js';

export default async function handler(req, res) {
  const admin = requireAdmin(req, res);
  if (!admin) return;

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;
  const { data, error } = await db()
    .from('invites')
    .update({ revoked_at: new Date().toISOString() })
    .eq('id', id)
    .is('used_at', null)
    .select('id')
    .maybeSingle();

  if (error) return res.status(500).json({ error: 'Could not revoke the invite' });
  if (!data) return res.status(404).json({ error: 'Invite not found, or already used' });

  return res.status(200).json({ ok: true });
}
