import { db } from './_lib/supabase.js';
import { hashPassword } from './_lib/password.js';
import { setSessionCookie, toPublicUser } from './_lib/session.js';

const USERNAME_RE = /^[a-z0-9._-]{3,24}$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token, name, username, password } = req.body || {};
  const cleanName = String(name || '').trim();
  const cleanUsername = String(username || '').toLowerCase().trim();

  if (!token) return res.status(400).json({ error: 'Missing invite token' });
  if (!cleanName) return res.status(400).json({ error: 'Enter your name' });
  if (!USERNAME_RE.test(cleanUsername)) {
    return res.status(400).json({ error: 'Username must be 3-24 characters: letters, numbers, dots, dashes or underscores' });
  }
  if (!password || password.length < 8) {
    return res.status(400).json({ error: 'Password needs at least 8 characters' });
  }

  const passwordHash = await hashPassword(password);

  const { data, error } = await db().rpc('redeem_invite', {
    p_token: token,
    p_username: cleanUsername,
    p_name: cleanName,
    p_password_hash: passwordHash,
  });

  if (error) {
    if (error.message && error.message.includes('invite_invalid')) {
      return res.status(410).json({ error: 'This invite link is invalid, has already been used, or was revoked.' });
    }
    if (error.code === '23505') {
      const dupe = /username/.test(error.message) ? 'That username is taken, try another.' : 'That email already has an account.';
      return res.status(409).json({ error: dupe });
    }
    return res.status(500).json({ error: 'Something went wrong. Try again.' });
  }

  const userRow = Array.isArray(data) ? data[0] : data;
  const publicUser = toPublicUser(userRow);
  setSessionCookie(res, publicUser);
  return res.status(200).json({ user: publicUser });
}
