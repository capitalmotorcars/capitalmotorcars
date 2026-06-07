/**
 * Migration script: adds is_featured column to blog_posts and sets the June 2026 blog as featured.
 * Usage: node scripts/add-featured-column.mjs
 */
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY
);

async function run() {
  console.log('Checking if is_featured column already exists...');

  // Try selecting the column first
  const { error: checkErr } = await supabase
    .from('blog_posts')
    .select('is_featured')
    .limit(1);

  if (checkErr && checkErr.message.includes('column')) {
    console.log('Column missing. Attempting migration via Supabase SQL...');

    // Use fetch to call Supabase REST SQL endpoint with the service role key
    const sqlUrl = `${process.env.VITE_SUPABASE_URL}/rest/v1/rpc/run_sql`;
    const res = await fetch(`${process.env.VITE_SUPABASE_URL}/pg/sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({
        query: `
          ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
          CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(is_featured) WHERE is_featured = true;
        `,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error('Could not run migration automatically:', body);
      console.log('\n=== MANUAL STEP REQUIRED ===');
      console.log('Please run this SQL in your Supabase SQL Editor (supabase.com dashboard):');
      console.log('\nFile: supabase/add_is_featured_column.sql\n');
      console.log('After running the SQL, run this script again to set the featured flag.');
      process.exit(1);
    }

    console.log('Column added successfully!');
  } else {
    console.log('Column already exists.');
  }

  // Set is_featured = true on the June 2026 blog
  console.log('Setting is_featured = true on June 2026 blog...');
  const { error: featErr } = await supabase
    .from('blog_posts')
    .update({ is_featured: true })
    .eq('slug', 'best-car-lease-deals-june-2026');

  if (featErr) {
    console.error('Error setting featured:', featErr.message);
    process.exit(1);
  }

  // Clear featured on all other posts
  const { error: clearErr } = await supabase
    .from('blog_posts')
    .update({ is_featured: false })
    .neq('slug', 'best-car-lease-deals-june-2026');

  if (clearErr) {
    console.error('Error clearing others:', clearErr.message);
    process.exit(1);
  }

  console.log('Done! is_featured set correctly on all blog posts.');
}

run().catch(console.error);
