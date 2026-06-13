import { createClient } from '@supabase/supabase-js';
import { applyApiCors } from "../../lib/httpCors.mjs";
import { forwardJsonToWebhook } from "../../lib/webhookForward.mjs";

declare var process: { env: Record<string, string | undefined> };

const DEFAULT_UPSTREAM =
  "https://hook.eu1.make.com/jmxgdt9co9e5403vopzm8witym4kg5mv";

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
  applyApiCors(
    req as any,
    res as any,
  );

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  const body = req.body as Record<string, unknown> | undefined | null;

  const requiredFields: Array<[string, string]> = [
    ["FirstName", "Missing applicant first name"],
    ["LastName", "Missing applicant last name"],
    ["Email", "Missing applicant email"],
    ["Phone", "Missing applicant phone"],
    ["Consultant", "Missing consultant selection"],
    ["ConsultantEmail", "Missing consultant email"],
  ];

  for (const [field, message] of requiredFields) {
    if (!body?.[field]) {
      return res.status(400).json({ success: false, error: message });
    }
  }

  // Save to database
  await saveSubmissionToDb('credit', req.body);

  const upstream =
    process.env.MAKE_WEBHOOK_CREDIT_URL?.trim() || DEFAULT_UPSTREAM;
  try {
    const r = await forwardJsonToWebhook(upstream, req.body);
    const text = await r.text();
    const ct = r.headers.get("content-type") ?? "application/json";
    res.status(r.status);
    res.setHeader("Content-Type", ct);
    res.send(text);
  } catch {
    res.status(502).json({ success: false, error: "Upstream error" });
  }
}
