import { createClient } from '@supabase/supabase-js';
import { clientEnv } from '@/lib/clientEnv';

export const isSupabaseConfigured = Boolean(
  clientEnv.supabaseUrl && clientEnv.supabaseAnonKey,
);

export const supabase = createClient(
  clientEnv.supabaseUrl || 'https://placeholder.supabase.co',
  clientEnv.supabaseAnonKey || 'placeholder',
  {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
    },
});
