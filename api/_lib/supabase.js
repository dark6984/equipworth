import { createClient } from '@supabase/supabase-js';

let client;

// Service-role client, used only from serverless functions (never sent to
// the browser). It bypasses row-level security by design -- these API
// routes are the only code allowed to touch the users/invites tables.
export function db() {
  if (!client) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error('SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are not configured');
    }
    client = createClient(url, key, { auth: { persistSession: false } });
  }
  return client;
}
