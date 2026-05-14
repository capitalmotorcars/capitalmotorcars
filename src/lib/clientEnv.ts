/**
 * Browser-exposed configuration from `.env` (`VITE_*`).
 * Import from here instead of reading `import.meta.env` directly.
 */
export const clientEnv = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL ?? '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY ?? '',
  mapboxAccessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN ?? '',
  isDev: import.meta.env.DEV,
} as const;
