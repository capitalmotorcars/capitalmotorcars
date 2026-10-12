import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';
import { execSync } from 'child_process';
import crypto from 'crypto';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in environment.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  console.log('Loading full blogs from src/data/mockBlogs.ts...');
  const js = execSync('npx esbuild src/data/mockBlogs.ts --format=cjs', {
    maxBuffer: 30 * 1024 * 1024,
  }).toString();
  const mod = { exports: {} };
  const fn = new Function('module', 'exports', js);
  fn(mod, mod.exports);
  const blogs = mod.exports.mockBlogs || [];
  console.log(`Loaded ${blogs.length} blogs from mockBlogs.ts.`);

  // Fetch existing rows from Supabase to preserve existing UUIDs
  console.log('Fetching existing blog records from Supabase...');
  const { data: existingRows, error: fetchError } = await supabase
    .from('blog_posts')
    .select('id, slug');

  if (fetchError) {
    throw fetchError;
  }

  const existingMap = new Map();
  for (const row of existingRows || []) {
    existingMap.set(row.slug, row.id);
  }
  console.log(`Found ${existingMap.size} existing rows in Supabase.`);

  const now = new Date().toISOString();
  const rowsToUpsert = blogs.map((b) => {
    const existingId = existingMap.get(b.slug);
    return {
      id: existingId || b.id || crypto.randomUUID(),
      title: b.title,
      slug: b.slug,
      excerpt: b.excerpt || '',
      content: b.content || '',
      cover_image_url: b.cover_image_url || null,
      seo_title: b.seo_title || b.title,
      seo_description: b.seo_description || b.excerpt || '',
      seo_keywords: b.seo_keywords || '',
      display_order: b.display_order ?? 0,
      is_active: b.is_active ?? true,
      published_at: b.published_at || now,
      updated_at: now,
      is_featured: b.is_featured ?? false,
    };
  });

  // Upsert in batches of 50 to avoid payload size limits
  const batchSize = 50;
  console.log(`Upserting ${rowsToUpsert.length} blogs in batches of ${batchSize}...`);

  for (let i = 0; i < rowsToUpsert.length; i += batchSize) {
    const batch = rowsToUpsert.slice(i, i + batchSize);
    const { error: upsertErr } = await supabase
      .from('blog_posts')
      .upsert(batch, { onConflict: 'slug' });

    if (upsertErr) {
      console.error(`Error upserting batch ${Math.floor(i / batchSize) + 1}:`, upsertErr);
      throw upsertErr;
    }
    console.log(
      `Batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(rowsToUpsert.length / batchSize)} synced (${batch.length} posts).`
    );
  }

  console.log('Successfully synced all blogs to Supabase!');
}

main().catch((err) => {
  console.error('Failed to sync blogs to Supabase:', err);
  process.exit(1);
});
