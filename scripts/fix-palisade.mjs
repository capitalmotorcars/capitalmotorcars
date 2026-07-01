import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  const { error } = await supabase
    .from('lease_deals')
    .update({ year: 2026 })
    .eq('id', '8efcb227-ae41-42b5-ad42-0e015a39b884'); // Palisade ID

  if (error) throw error;
  console.log("Successfully updated the Hyundai Palisade to 2026.");
}

main().catch(console.error);
