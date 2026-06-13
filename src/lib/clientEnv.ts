/**
 * Browser-exposed configuration from `.env` (`VITE_*`).
 * Import from here instead of reading `import.meta.env` directly.
 */
const isNode = typeof process !== 'undefined' && process.env != null;

export const clientEnv = {
  supabaseUrl: (isNode ? process.env.VITE_SUPABASE_URL : import.meta.env.VITE_SUPABASE_URL) ?? '',
  supabaseAnonKey: (isNode ? process.env.VITE_SUPABASE_ANON_KEY : import.meta.env.VITE_SUPABASE_ANON_KEY) ?? '',
  mapboxAccessToken: (isNode ? process.env.VITE_MAPBOX_ACCESS_TOKEN : import.meta.env.VITE_MAPBOX_ACCESS_TOKEN) ?? '',
  isDev: typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.DEV : false,
} as const;
