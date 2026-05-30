import { getVehicleTypeBySlug } from '../src/services/vehicleTypeService.js';
import 'dotenv/config';

// Mock Supabase environment variables for the service
process.env.VITE_SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://onsxnzwhuugnmsxaqpzt.supabase.co';
process.env.VITE_SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uc3huendodXVnbm1zeGFxcHp0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDc0NjkxOCwiZXhwIjoyMDg2MzIyOTE4fQ.9F_QSd9_xiEdxnJk0Fjw4DhZ4_KlE8dT_6grlS-71Jg';

async function test() {
  console.log('Testing getVehicleTypeBySlug for mercedes-e350...');
  try {
    const result = await getVehicleTypeBySlug('mercedes-e350');
    console.log('Result:', JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('Thrown error:', err);
  }
}

test();
