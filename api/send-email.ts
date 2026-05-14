import { Resend } from 'resend';
import { applyApiCors } from '../lib/httpCors.mjs';
import {
  buildHtml,
  labelKey,
  resolveConsultantRecipients,
  sanitizeLeadFields,
} from '../lib/sendEmailSecurity.mjs';

const SUBJECT = '🚗 New Lead: Capital Motor Cars';

type VercelReq = {
  method?: string;
  headers?: { origin?: string; [key: string]: string | string[] | undefined };
  body?: Record<string, unknown>;
};

type VercelRes = {
  status: (n: number) => VercelRes;
  setHeader: (n: string, v: string) => void;
  json: (o: object) => void;
  end: (s?: string) => void;
};

export default async function handler(req: VercelReq, res: VercelRes) {
  applyApiCors(req as Parameters<typeof applyApiCors>[0], res as Parameters<typeof applyApiCors>[1]);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ success: false, error: 'Server configuration error' });
  }

  const body = req.body ?? {};
  const type = (body.type as 'contact' | 'credit') ?? 'contact';
  const fromEmail = process.env.FROM_EMAIL ?? 'Capital Motor Cars <onboarding@resend.dev>';

  const fields = sanitizeLeadFields(body);
  const displayBody: Record<string, unknown> = {};
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
}
