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

/**
 * Forward the lead to Kora CRM and confirm receipt. Awaited for log visibility,
 * but never throws: Kora downtime must not break website lead capture (email +
 * Supabase already succeeded by the time the form result is returned).
 */
async function forwardToKora(payload: unknown) {
  const koraApiKey = process.env.KORA_API_KEY?.trim();
  if (!koraApiKey) {
    console.warn('[Kora] Skipped forward: KORA_API_KEY not configured.');
    return;
  }
  try {
    const resp = await fetch('https://api.tellkora.com/api/cmc/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CMC-Api-Key': koraApiKey },
      body: JSON.stringify(payload),
    });
    const text = await resp.text();
    if (resp.ok) {
      console.log(`[Kora] Lead forwarded (status ${resp.status}): ${text}`);
    } else {
      console.error(`[Kora] Forward failed (status ${resp.status}): ${text}`);
    }
  } catch (err) {
    console.error('[Kora] Forward threw:', err instanceof Error ? err.message : err);
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

  const body = req.body as Record<string, unknown> | null | undefined;
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ success: false, error: 'Invalid request body' });
  }

  await saveSubmissionToDb('contact', req.body);

  await forwardToKora(req.body);

  const { status, json } = await processLead('contact', body as Record<string, unknown>);
  return res.status(status).json(json);
}
