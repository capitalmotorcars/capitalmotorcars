import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const slugs = [
  'best-lease-deals-new-jersey',
  'auto-broker-vs-dealership-new-jersey',
  'bad-credit-car-lease-new-jersey',
  'zero-down-car-lease-new-jersey',
  'luxury-car-lease-new-jersey',
  'how-to-lease-a-car-under-business-name',
  'lease-return-process-explained-new-jersey',
  'leasing-cars-tax-benefits',
  'volvo-s60-reliability',
  'sales-taxes-demystified-your-car-lease-payments-explained',
  'how-to-negotiate-a-lease-deal',
  'gas-vs-hybrid-vs-electric-cars-which-one-is-right-for-me',
  'toyota-prius-reliability',
  'best-hatchback-cars',
  'kia-seltos-reliability-detailed-review',
  'audi-a3-reliability-guide',
  'what-does-a-zero-down-lease-really-mean',
  'choosing-a-car-for-a-college-student-read-this-first',
  'toyota-camry-reliability',
  'how-to-lease-a-car-new-jersey-new-york',
  'best-suv-lease-deals-new-jersey',
  'ev-lease-specials-new-jersey',
  'bmw-lease-specials-new-jersey'
];

const startDate = new Date('2026-04-01T10:00:00Z');

function getDatesForIndex(index) {
  const pubDate = new Date(startDate.getTime());
  pubDate.setUTCDate(startDate.getUTCDate() + index * 3);
  
  const creDate = new Date(pubDate.getTime());
  creDate.setUTCDate(pubDate.getUTCDate() - 2);

  return {
    published_at: pubDate.toISOString().replace('.000', ''),
    created_at: creDate.toISOString().replace('.000', ''),
    updated_at: pubDate.toISOString().replace('.000', '')
  };
}

// 1. Update src/data/mockBlogs.ts & scripts/seed-blogs.mjs
function updateJsTsFile(filePath) {
  console.log(`Processing JS/TS file: ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    const targetDates = getDatesForIndex(i);

    // Find the slug index
    const slugPattern = new RegExp(`slug:\\s*['"]${slug}['"]`);
    const match = content.match(slugPattern);
    if (!match) {
      console.error(`Could not find slug: ${slug} in ${filePath}`);
      process.exit(1);
    }

    const slugIndex = match.index;

    // We will search and replace the next published_at, created_at, updated_at after slugIndex
    const subStr = content.slice(slugIndex);
    
    // Replace published_at
    const pubMatch = subStr.match(/published_at:\s*['"](.*?)['"]/);
    if (!pubMatch) {
      console.error(`Could not find published_at after slug ${slug} in ${filePath}`);
      process.exit(1);
    }
    const oldPubStr = pubMatch[0];
    const newPubStr = `published_at: '${targetDates.published_at}'`;
    
    // Replace created_at
    const creMatch = subStr.match(/created_at:\s*['"](.*?)['"]/);
    if (!creMatch) {
      console.error(`Could not find created_at after slug ${slug} in ${filePath}`);
      process.exit(1);
    }
    const oldCreStr = creMatch[0];
    const newCreStr = `created_at: '${targetDates.created_at}'`;

    // Replace updated_at
    const updMatch = subStr.match(/updated_at:\s*['"](.*?)['"]/);
    if (!updMatch) {
      console.error(`Could not find updated_at after slug ${slug} in ${filePath}`);
      process.exit(1);
    }
    const oldUpdStr = updMatch[0];
    const newUpdStr = `updated_at: '${targetDates.updated_at}'`;

    // Perform the replacements inside the block
    let block = subStr;
    block = block.replace(oldPubStr, newPubStr);
    block = block.replace(oldCreStr, newCreStr);
    block = block.replace(oldUpdStr, newUpdStr);

    // Reconstruct the file content
    content = content.slice(0, slugIndex) + block;
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully updated: ${filePath}`);
}

// 2. Update supabase/seed_blogs.sql
function updateSqlFile(filePath) {
  console.log(`Processing SQL file: ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    const targetDates = getDatesForIndex(i);

    // Find the slug index in the SQL file: 'slug'
    const slugPattern = new RegExp(`'${slug}'`);
    const match = content.match(slugPattern);
    if (!match) {
      console.warn(`Warning: Could not find slug: ${slug} in SQL file ${filePath}. Skipping SQL update for this slug.`);
      continue;
    }

    const slugIndex = match.index;
    const subStr = content.slice(slugIndex);

    // Find the next three ISO date strings (format: 'YYYY-MM-DDTHH:mm:ssZ')
    // We match the quotes as well: '2026-04-01T10:00:00Z'
    const dateRegex = /'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z'/g;
    
    // Find the first three matches
    const matches = [];
    let regexMatch;
    while ((regexMatch = dateRegex.exec(subStr)) !== null && matches.length < 3) {
      matches.push({
        text: regexMatch[0],
        index: regexMatch.index
      });
    }

    if (matches.length < 3) {
      console.error(`Could not find 3 ISO date strings after slug ${slug} in SQL file`);
      process.exit(1);
    }

    // The order in the table: published_at, created_at, updated_at
    // Let's replace them in the block
    let block = subStr;
    // Replace in reverse order so string indices aren't messed up if length changes (though it shouldn't as both are 21 chars)
    block = block.slice(0, matches[2].index) + `'${targetDates.updated_at}'` + block.slice(matches[2].index + matches[2].text.length);
    block = block.slice(0, matches[1].index) + `'${targetDates.created_at}'` + block.slice(matches[1].index + matches[1].text.length);
    block = block.slice(0, matches[0].index) + `'${targetDates.published_at}'` + block.slice(matches[0].index + matches[0].text.length);

    content = content.slice(0, slugIndex) + block;
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully updated: ${filePath}`);
}

// 3. Update Supabase live database directly
async function updateSupabase() {
  console.log('Connecting to Supabase...');
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseServiceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.VITE_SUPABASE_SERVICE_ROLE_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error('Error: Supabase credentials not found in environment variables.');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  console.log('Updating date fields in Supabase database...');
  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    const targetDates = getDatesForIndex(i);

    console.log(`Updating dates for slug: ${slug} -> published: ${targetDates.published_at}`);
    
    // Explicitly update ONLY the three date fields, keeping everything else untouched.
    const { data, error } = await supabase
      .from('blog_posts')
      .update({
        published_at: targetDates.published_at,
        created_at: targetDates.created_at,
        updated_at: targetDates.updated_at
      })
      .eq('slug', slug);

    if (error) {
      console.error(`Failed to update dates for slug "${slug}":`, error.message);
      process.exit(1);
    }
  }
  console.log('Direct Supabase date updates completed successfully!');
}

// Run the script
const workspaceRoot = '/Users/suresh/bricks/capitalmotorcars';
updateJsTsFile(path.join(workspaceRoot, 'src/data/mockBlogs.ts'));
updateJsTsFile(path.join(workspaceRoot, 'scripts/seed-blogs.mjs'));
updateSqlFile(path.join(workspaceRoot, 'supabase/seed_blogs.sql'));

updateSupabase().then(() => {
  console.log('All local and database blog date rescheduling actions completed successfully!');
}).catch(err => {
  console.error('Execution failed:', err);
  process.exit(1);
});
