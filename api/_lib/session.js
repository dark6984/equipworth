import crypto from 'node:crypto';

const COOKIE_NAME = 'ew_session';
const MAX_AGE_SECONDS = 30 * 24 * 60 * 60; // sessions expire after 30 days of inactivity; unrelated to invite links, which never expire

function secret() {
  const s = process.env.SESSION_SECRET;
  if (!s) throw new Error('SESSION_SECRET is not configured');
  return s;
}

function sign(data) {
  return crypto.createHmac('sha256', secret()).update(data).digest('base64url');
}

export function isAdminEmail(email) {
  const adminEmail = (process.env.ADMIN_EMAIL || 'sheabarnett95@gmail.com').toLowerCase();
  return (email || '').toLowerCase() === adminEmail;
}

export function toPublicUser(userRow) {
  return {
    id: userRow.id,
    email: userRow.email,
    username: userRow.username,
    name: userRow.name,
    isAdmin: isAdminEmail(userRow.email),
  };
}

export function createSessionToken(publicUser) {
  const payload = JSON.stringify({ ...publicUser, iat: Date.now() });
  const data = Buffer.from(payload, 'utf8').toString('base64url');
  return data + '.' + sign(data);
}

export function verifySessionToken(token) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return null;
  const dot = token.lastIndexOf('.');
  const data = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  let expected;
  try {
    expected = sign(data);
  } catch {
    return null;
  }
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf8'));
    if (!payload.iat || Date.now() - payload.iat > MAX_AGE_SECONDS * 1000) return null;
    // isAdmin is recomputed from the current ADMIN_EMAIL env var on every
    // request rather than trusted from the (older) cookie payload, so
    // admin access follows the env var immediately, not just on next login.
    return { ...payload, isAdmin: isAdminEmail(payload.email) };
  } catch {
    return null;
  }
}

function parseCookieHeader(header) {
  const out = {};
  (header || '').split(';').forEach((pair) => {
    const i = pair.indexOf('=');
    if (i < 0) return;
    const k = pair.slice(0, i).trim();
    if (!k) return;
    try { out[k] = decodeURIComponent(pair.slice(i + 1).trim()); } catch { out[k] = pair.slice(i + 1).trim(); }
  });
  return out;
}

export function getSessionUser(req) {
  const cookies = req.cookies || parseCookieHeader(req.headers.cookie);
  return verifySessionToken(cookies[COOKIE_NAME]);
}

// Returns the session user if they're an admin, otherwise writes the
// appropriate 401/403 response and returns null -- callers should return
// immediately when this returns null.
export function requireAdmin(req, res) {
  const user = getSessionUser(req);
  if (!user) {
    res.status(401).json({ error: 'Not signed in' });
    return null;
  }
  if (!user.isAdmin) {
    res.status(403).json({ error: 'Admin access required' });
    return null;
  }
  return user;
}

function serializeCookie(name, value, { maxAge }) {
  const parts = [`${name}=${encodeURIComponent(value)}`, 'HttpOnly', 'Secure', 'SameSite=Lax', 'Path=/'];
  parts.push(`Max-Age=${maxAge}`);
  return parts.join('; ');
}

export function setSessionCookie(res, publicUser) {
  const token = createSessionToken(publicUser);
  appendCookie(res, serializeCookie(COOKIE_NAME, token, { maxAge: MAX_AGE_SECONDS }));
}

export function clearSessionCookie(res) {
  appendCookie(res, serializeCookie(COOKIE_NAME, '', { maxAge: 0 }));
}

function appendCookie(res, cookieStr) {
  const existing = res.getHeader('Set-Cookie');
  if (!existing) {
    res.setHeader('Set-Cookie', cookieStr);
  } else if (Array.isArray(existing)) {
    res.setHeader('Set-Cookie', [...existing, cookieStr]);
  } else {
    res.setHeader('Set-Cookie', [existing, cookieStr]);
  }
}
