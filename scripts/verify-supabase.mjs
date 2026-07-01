import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('Missing Supabase credentials.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const recentSlugs = [
  'leasing-fees-explained-in-detail-everything-you-need-to-know',
  'wheel-squeaks-when-driving',
  'auto-leasing-cheat-codes-multiple-security-deposits',
  'toyota-sienna-reliability-guide',
  'the-lease-return-checklist-7-things-to-expect-when-returning-your-lease',
  'top-5-things-most-leasing-companies-dont-want-you-to-know-about-leasing-a-car',
  'one-pay-leasing-pros-and-cons',
  'mazda-cx-9-reliability-detailed-review',
  '7-upgrades-to-turn-your-suv-into-a-high-tech-dream-car',
  'should-i-lease-a-car-as-a-pet-owner',
  'roadside-assistance-which-automaker-does-it-best',
  '5-tips-leasing-car-2026',
  'bmw-x1-reliability-performance-review',
  'bad-credit-car-lease-approval-guide',
  'the-money-factor-do-you-know-where-your-lease-rates-come-from',
  'car-lease-end-overview-what-to-do-when-your-lease-is-up'
];

async function main() {
  const { data, error, count } = await supabase
    .from('blog_posts')
    .select('slug', { count: 'exact' });

  if (error) {
    throw error;
  }

  console.log(`Total blogs in Supabase table 'blog_posts': ${count}`);

  const remoteSlugs = new Set(data.map(row => row.slug));
  let missing = [];
  
  console.log('Verifying the 16 newly added blogs...');
  for (const slug of recentSlugs) {
    if (remoteSlugs.has(slug)) {
      console.log(`✅ Verified: ${slug}`);
    } else {
      console.log(`❌ Missing: ${slug}`);
      missing.push(slug);
    }
  }

  if (missing.length === 0) {
    console.log('\nAll 16 new blogs were successfully found in the Supabase database!');
  } else {
    console.log(`\nFailed to find ${missing.length} blogs in the database.`);
  }
}

main().catch((error) => {
  console.error('Verification failed:', error);
  process.exit(1);
});
