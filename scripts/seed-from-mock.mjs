import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';
import { MOCK_BLOGS } from './mockBlogs.mjs';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error(
    'Missing Supabase credentials. Please configure VITE_SUPABASE_URL and either VITE_SUPABASE_SERVICE_ROLE_KEY or VITE_SUPABASE_ANON_KEY in your .env file.'
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

import crypto from 'crypto';

async function main() {
  console.log(`Preparing to upsert ${MOCK_BLOGS.length} blogs into Supabase...`);

  const cleanedBlogs = MOCK_BLOGS.map(({ author, id, ...rest }) => ({
    ...rest,
    id: id || crypto.randomUUID(),
  }));

  const { data, error: upsertError } = await supabase
    .from('blog_posts')
    .upsert(cleanedBlogs, { onConflict: 'slug' })
    .select('slug');

  if (upsertError) {
    throw upsertError;
  }

  console.log(`Successfully upserted ${data.length} blog posts to Supabase.`);
}

main().catch((error) => {
  console.error('Failed to seed blog posts:', error);
  process.exit(1);
});
