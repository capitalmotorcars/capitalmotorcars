import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  console.log("Reading Sitemap...");
  const sitemapXml = fs.readFileSync('public/sitemap.xml', 'utf8');
  const locRegex = /<loc>(https:\/\/(www\.)?capitalmotorcars\.com)?(\/[^<]*)<\/loc>/g;
  const sitemapUrls = [];
  let match;
  while ((match = locRegex.exec(sitemapXml)) !== null) {
    let path = match[3];
    if (path === '') path = '/';
    sitemapUrls.push(path);
  }
  console.log(`Found ${sitemapUrls.length} URLs in sitemap.`);

  console.log("Reading App.tsx...");
  const appTsx = fs.readFileSync('src/App.tsx', 'utf8');
  
  // Extract hardcoded routes
  const routeRegex = /<Route[^>]+path="([^"]+)"/g;
  const appRoutes = new Set();
  while ((match = routeRegex.exec(appTsx)) !== null) {
    appRoutes.add(match[1]);
  }

  // Extract blogSlugs array
  let allSlugs = [];
  const blogSlugsRegex = /const blogSlugs = \[([\s\S]*?)\];/;
  const blogSlugsMatch = blogSlugsRegex.exec(appTsx);
  if (blogSlugsMatch) {
    allSlugs = blogSlugsMatch[1].match(/'([^']+)'/g)?.map(s => s.replace(/'/g, '')) || [];
    allSlugs.forEach(slug => appRoutes.add(`/${slug}`));
  }
  console.log(`Found ${appRoutes.size} total routes in App.tsx.`);

  console.log("Fetching blogs from Supabase...");
  const { data: blogs, error } = await supabase.from('blog_posts').select('slug');
  if (error) throw error;
  const supabaseSlugs = new Set(blogs.map(b => `/${b.slug}`));
  console.log(`Found ${supabaseSlugs.size} blogs in Supabase.`);

  console.log("\n--- Validating Sitemap Links ---");
  let missingInApp = 0;
  let missingInSupabase = 0;
  
  for (const url of sitemapUrls) {
    if (!appRoutes.has(url) && url !== '/sitemap.xml' && url !== '/') { 
      console.error(`❌ [Missing in App Router]: ${url}`);
      missingInApp++;
    }
    
    // Check if it's a blog url (exists in allSlugs)
    const urlSlug = url.replace(/^\//, '');
    if (allSlugs.includes(urlSlug)) {
      if (!supabaseSlugs.has(url)) {
        console.error(`❌ [Missing in Supabase]: ${url}`);
        missingInSupabase++;
      }
    }
  }

  console.log(`\nValidation complete. Missing in App: ${missingInApp}, Missing in Supabase (Blog): ${missingInSupabase}`);
}

main().catch(console.error);
