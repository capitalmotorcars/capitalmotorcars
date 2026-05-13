import 'dotenv/config';
import express from 'express';
import rateLimit from 'express-rate-limit';
import { Resend } from 'resend';
import { applyApiCors } from '../lib/httpCors.mjs';
import {
  buildHtml,
  labelKey,
  resolveConsultantRecipients,
  sanitizeLeadFields,
} from '../lib/sendEmailSecurity.mjs';
import { forwardJsonToWebhook } from '../lib/webhookForward.mjs';

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
app.use(express.json({ limit: '2mb' }));

app.use((req, res, next) => {
  if (req.method === 'OPTIONS' && req.path.startsWith('/api')) {
    return res.status(204).end();
  }
  next();
});

const DEFAULT_MAKE_CONTACT = 'https://hook.eu1.make.com/zfw7p0asc4teuk2znyk1pbbg18fv7q7b';
const DEFAULT_MAKE_CREDIT = 'https://hook.eu1.make.com/jmxgdt9co9e5403vopzm8witym4kg5mv';
const DEFAULT_MAKE_TRADE_IN = 'https://hook.eu1.make.com/zfw7p0asc4teuk2znyk1pbbg18fv7q7b';

async function proxyMakeWebhook(req, res, envKey, fallbackUrl) {
  const upstream =
    process.env[envKey] && process.env[envKey].trim() ? process.env[envKey].trim() : fallbackUrl;
  try {
    const r = await forwardJsonToWebhook(upstream, req.body ?? {});
    const text = await r.text();
    const ct = r.headers.get('content-type') ?? 'application/json';
    res.status(r.status).setHeader('Content-Type', ct).send(text);
  } catch {
    res.status(502).json({ success: false, error: 'Upstream error' });
  }
}

app.post('/api/webhooks/contact', (req, res) =>
  proxyMakeWebhook(req, res, 'MAKE_WEBHOOK_CONTACT_URL', DEFAULT_MAKE_CONTACT),
);
app.post('/api/webhooks/credit', (req, res) =>
  proxyMakeWebhook(req, res, 'MAKE_WEBHOOK_CREDIT_URL', DEFAULT_MAKE_CREDIT),
);
app.post('/api/webhooks/trade-in', (req, res) =>
  proxyMakeWebhook(req, res, 'MAKE_WEBHOOK_TRADE_IN_URL', DEFAULT_MAKE_TRADE_IN),
);

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
