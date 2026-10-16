import { createClient } from '@supabase/supabase-js';
const env = (import.meta as unknown as { env: Record<string, string> }).env;
export const configured = Boolean(env.VITE_SUPABASE_URL && env.VITE_SUPABASE_ANON_KEY);
export const supabase = createClient(env.VITE_SUPABASE_URL || 'https://example.supabase.co', env.VITE_SUPABASE_ANON_KEY || 'not-configured', { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false } });
export function reportError(error: unknown) { window.dispatchEvent(new CustomEvent('hulog:error', { detail: error instanceof Error ? error.message : String(error) })); }
