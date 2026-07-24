import { db } from '../_lib/supabase.js';
import { verifyPassword } from '../_lib/password.js';
import { setSessionCookie, toPublicUser } from '../_lib/session.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'Enter your email and password' });
  }

  const { data: user, error } = await db()
    .from('users')
    .select('*')
    .eq('email', String(email).toLowerCase().trim())
    .maybeSingle();

  if (error) return res.status(500).json({ error: 'Something went wrong. Try again.' });
  if (!user) return res.status(401).json({ error: 'Invalid email or password' });

  const ok = await verifyPassword(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: 'Invalid email or password' });

  const publicUser = toPublicUser(user);
  setSessionCookie(res, publicUser);
  return res.status(200).json({ user: publicUser });
}
