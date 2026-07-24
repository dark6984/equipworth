import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';

export async function hashPassword(plain) {
  return bcrypt.hash(plain, 12);
}

export async function verifyPassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

export function generateInviteToken() {
  return crypto.randomBytes(32).toString('base64url');
}
