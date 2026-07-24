import { getSessionUser } from '../_lib/session.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const user = getSessionUser(req);
  if (!user) return res.status(401).json({ error: 'Not signed in' });
  const { iat, ...publicUser } = user;
  return res.status(200).json({ user: publicUser });
}
