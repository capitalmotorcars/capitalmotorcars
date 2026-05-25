import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing credentials in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, title, slug, is_active');

  if (error) {
    console.error('Error fetching blogs:', error);
    process.exit(1);
  }

  console.log('Database blogs:');
  console.log(JSON.stringify(data, null, 2));
}

main().catch(console.error);
