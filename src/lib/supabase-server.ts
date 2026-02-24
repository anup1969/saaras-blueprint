import { createClient } from '@supabase/supabase-js';

// Server-side Supabase client using service role key
// Only use in API routes (never expose to client)
export function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!url || !key) return null;
  return createClient(url, key);
}
