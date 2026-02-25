import { Resend } from 'resend';

const TO_EMAILS = [
  'info@capitalmotorcars.com',
  'camico@capitalmotorcars.com',
  'henry@capitalmotorcars.com',
];

// Consultant email mapping (matches frontend)
const CONSULTANT_EMAIL_MAP: Record<string, string> = {
  'henry_liu': 'henry@capitalmotorcars.com',
  'christopher_amico': 'camico@capitalmotorcars.com',
  'michael_minerva': 'mike.minerva@capitalmotorcars.com',
  'vicky_azrak': 'vicky@capitalmotorcars.com',
  'james_dai': 'james@capitalmotorcars.com',
  'aaron_cui': 'info@capitalmotorcars.com',
  'abby_gorani': 'info@capitalmotorcars.com',
  'bobby_kaufman': 'bobby@capitalmotorcars.com',
  'christine_reich': 'info@capitalmotorcars.com',
  'derek_anton': 'derek@capitalmotorcars.com',
  'daniel_jay_lehrer': 'dlehrer@capitalmotorcars.com',
  'jeffrey_horn': 'jeffrey@capitalmotorcars.com',
  'mark_onbashian': 'mark@capitalmotorcars.com',
  'markin': 'mark@capitalmotorcars.com',
  'michael_zeitoune': 'mzeitoune@capitalmotorcars.com',
  'michael_van_houten': 'mvanhouten@capitalmotorcars.com',
  'rafael_frias': 'rafael@capitalmotorcars.com',
  'ricky_wong': 'ricky@capitalmotorcars.com',
  'rushi_sanghavi': 'info@capitalmotorcars.com',
  'sarah_flynn': 'sarah@capitalmotorcars.com',
  'stephen_jo': 'info@capitalmotorcars.com',
  'wilson_dong': 'info@capitalmotorcars.com',
  'finance_team': 'info@capitalmotorcars.com',
  'yehuda_cohen': 'info@capitalmotorcars.com',
  'other': 'info@capitalmotorcars.com',
};

const SUBJECT = '🚗 New Lead: Capital Motor Cars';

function buildHtml(type: 'contact' | 'credit', body: Record<string, unknown>): string {
  const rows = Object.entries(body)
    .filter(([, v]) => v != null && v !== '')
    .map(([k, v]) => `<tr><td style="padding:8px 12px;border:1px solid #eee;"><strong>${k}</strong></td><td style="padding:8px 12px;border:1px solid #eee;">${String(v)}</td></tr>`)
    .join('');
  return `
    <div style="font-family:sans-serif;max-width:600px;">
      <h2 style="color:#1a1a1a;">New ${type === 'contact' ? 'Contact' : 'Credit'} Lead</h2>
      <p style="color:#555;">Submitted from Capital Motor Cars website.</p>
      <table style="width:100%;border-collapse:collapse;margin-top:16px;">
        ${rows}
      </table>
    </div>
  `;
}

export default async function handler(
  req: { method?: string; body?: Record<string, unknown> },
  res: { status: (n: number) => { json: (o: object) => void }; setHeader: (n: string, v: string) => void }
) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
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

  const label = (key: string) => key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());

  const fields: Record<string, unknown> = { ...body };
  delete fields.type;
  const displayBody: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(fields)) {
    displayBody[label(k)] = v;
  }

  // Use consultant's email if available, otherwise use default recipients
  let toEmails = [...TO_EMAILS];
  
  // First try to use ConsultantEmail from payload
  if (fields.ConsultantEmail && fields.ConsultantEmail !== 'info@capitalmotorcars.com') {
    // Send ONLY to selected consultant
    toEmails = [fields.ConsultantEmail as string];
  }
  // Fallback: use server-side mapping if Consultant field exists but no ConsultantEmail
  else if (fields.Consultant && CONSULTANT_EMAIL_MAP[fields.Consultant as string]) {
    const consultantEmail = CONSULTANT_EMAIL_MAP[fields.Consultant as string];
    if (consultantEmail !== 'info@capitalmotorcars.com') {
      // Send ONLY to selected consultant
      toEmails = [consultantEmail];
    }
  }

  const html = buildHtml(type, displayBody);
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
