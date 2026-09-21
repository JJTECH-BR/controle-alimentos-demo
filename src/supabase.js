import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// O portfolio demo é intencionalmente 100% local.
export const isSupabaseConfigured = false;
export const supabase = isSupabaseConfigured ? createClient(url, anonKey, {
	auth: {
		storage: window.sessionStorage,
		persistSession: true,
		autoRefreshToken: true,
		detectSessionInUrl: true
	}
}) : null;
