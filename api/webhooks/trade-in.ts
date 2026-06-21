import { createClient } from '@supabase/supabase-js';
import { applyApiCors } from '../../lib/httpCors.mjs';
import { processLead } from '../../lib/processLead.mjs';

declare var process: { env: Record<string, string | undefined> };

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl || '', supabaseKey || '');
const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

async function saveSubmissionToDb(type: string, payload: any) {
  if (!isSupabaseConfigured) {
    console.warn('[Database] Missing supabase configuration environment variables.');
    return;
  }
  try {
    const { error } = await supabase.from('form_submissions').insert([{ type, payload }]);
    if (error) {
      console.error(`[Database] Error saving submission to Supabase:`, error.message, error.details);
    } else {
      console.log(`[Database] Successfully saved submission to Supabase for type: ${type}`);
    }
  } catch (err) {
    console.error(`[Database] Exception saving submission:`, err);
  }
}

type Req = {
  method?: string;
  body?: unknown;
  headers?: { origin?: string; [key: string]: string | string[] | undefined };
};

type Res = {
  status: (n: number) => Res;
  setHeader: (n: string, v: string) => void;
  json: (o: object) => void;
  end: (s?: string) => void;
  send: (body: string) => void;
};

export default async function handler(req: Req, res: Res) {
  applyApiCors(req as any, res as any);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  // Save to database first so a submission is never lost even if email fails.
  await saveSubmissionToDb('trade-in', req.body);

  const { status, json } = await processLead('trade-in', (req.body ?? {}) as Record<string, unknown>);
  return res.status(status).json(json);
}
