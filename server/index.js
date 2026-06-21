import 'dotenv/config';
import express from 'express';
import rateLimit from 'express-rate-limit';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { applyApiCors } from '../lib/httpCors.mjs';
import {
  buildHtml,
  labelKey,
  resolveConsultantRecipients,
  sanitizeLeadFields,
} from '../lib/sendEmailSecurity.mjs';
import { processCreditApplication, validateCreditApplication } from '../lib/processCreditApplication.mjs';
import { processLead } from '../lib/processLead.mjs';

// Initialize Supabase Client with robust env variable fallback
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Safe background database saving function
async function saveSubmissionToDb(type, payload) {
  try {
    console.log(`[Database] Attempting to save submission for type: ${type}`);
    const { data, error } = await supabase
      .from('form_submissions')
      .insert([{ type, payload }]);
    if (error) {
      console.error(`[Database] Error inserting submission:`, error.message);
    } else {
      console.log(`[Database] Successfully saved submission:`, data);
    }
  } catch (err) {
    console.error(`[Database] Uncaught error saving submission:`, err);
  }
}

const SUBJECT = '🚗 New Lead: Capital Motor Cars';

const app = express();
app.set('trust proxy', 1);

app.use((req, res, next) => {
  applyApiCors(req, res);
  next();
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.method === 'OPTIONS',
});

app.use('/api', apiLimiter);

/** Webhooks forward JSON with base64 files (credit, trade-in, contact photos). ~4/3 size inflation; allow generous headroom. */
const WEBHOOK_JSON_LIMIT = '128mb';
const jsonWebhook = express.json({ limit: WEBHOOK_JSON_LIMIT });
const jsonDefault = express.json({ limit: '2mb' });
app.use((req, res, next) => {
  /* After app.use('/api', …), req.url is stripped — use originalUrl so /api/webhooks/* is detected. */
  const pathname = (req.originalUrl ?? req.url ?? '').split('?')[0];
  if (pathname.startsWith('/api/webhooks')) {
    return jsonWebhook(req, res, next);
  }
  return jsonDefault(req, res, next);
});

app.use((req, res, next) => {
  const pathname = (req.originalUrl ?? req.url ?? '').split('?')[0];
  if (req.method === 'OPTIONS' && pathname.startsWith('/api')) {
    return res.status(204).end();
  }
  next();
});

/**
 * Forward a lead to Kora CRM and confirm receipt. Awaited for log visibility,
 * but never throws: Kora downtime must not break website lead capture.
 */
async function forwardToKora(body) {
  const koraApiKey = process.env.KORA_API_KEY?.trim();
  if (!koraApiKey) {
    console.warn('[Kora] Skipped forward: KORA_API_KEY not configured.');
    return;
  }
  try {
    const resp = await fetch('https://api.tellkora.com/api/cmc/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CMC-Api-Key': koraApiKey },
      body: JSON.stringify(body),
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

app.post('/api/webhooks/contact', async (req, res) => {
  saveSubmissionToDb('contact', req.body ?? {});
  await forwardToKora(req.body ?? {});
  const { status, json } = await processLead('contact', req.body ?? {});
  return res.status(status).json(json);
});

app.post('/api/webhooks/credit', async (req, res) => {
  // Reject incomplete/forged payloads before persisting (see api/webhooks/credit.ts).
  const { valid, error } = validateCreditApplication(req.body ?? {});
  if (!valid) {
    return res.status(400).json({ success: false, error });
  }
  saveSubmissionToDb('credit', req.body ?? {});
  const { status, json } = await processCreditApplication(req.body ?? {});
  return res.status(status).json(json);
});

app.post('/api/webhooks/trade-in', async (req, res) => {
  saveSubmissionToDb('trade-in', req.body ?? {});
  const { status, json } = await processLead('trade-in', req.body ?? {});
  return res.status(status).json(json);
});

app.get('/api/submissions', async (req, res) => {
  const apiKey = req.headers['x-cmc-api-key'];
  const expectedKey = process.env.CMC_API_KEY;

  if (!expectedKey || apiKey !== expectedKey) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  const { type, startDate, endDate } = req.query;

  try {
    let query = supabase
      .from('form_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (type) {
      query = query.eq('type', type);
    }
    if (startDate) {
      query = query.gte('created_at', startDate);
    }
    if (endDate) {
      query = query.lte('created_at', endDate);
    }

    const { data, error } = await query;

    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }

    return res.status(200).json({ success: true, data });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Internal server error';
    return res.status(500).json({ success: false, error: msg });
  }
});

app.post('/api/send-email', async (req, res) => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ success: false, error: 'Server configuration error' });
  }

  const body = req.body ?? {};
  const type = body.type ?? 'contact';
  const fromEmail = process.env.FROM_EMAIL ?? 'Capital Motor Cars <onboarding@resend.dev>';

  const fields = sanitizeLeadFields(body);
  const displayBody = {};
  for (const [k, v] of Object.entries(fields)) {
    displayBody[labelKey(k)] = v;
  }

  const toEmails = resolveConsultantRecipients(fields);
  const html = buildHtml(type === 'credit' ? 'credit' : 'contact', displayBody);
  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmails,
      subject: SUBJECT,
      html,
    });
    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
    return res.status(200).json({ success: true, id: data?.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to send email';
    return res.status(500).json({ success: false, error: message });
  }
});

const PORT = process.env.API_PORT ?? 3001;
app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
