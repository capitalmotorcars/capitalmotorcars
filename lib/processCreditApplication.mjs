/**
 * Shared credit-application processor: validate -> build PDF -> email via Resend.
 * Called by both the Vercel function (api/webhooks/credit.ts) and the local
 * Express dev server (server/index.js) so local testing matches production.
 *
 * Does NOT save to the database; callers handle persistence with their own
 * Supabase client.
 */
import { Resend } from 'resend';
import { CONSULTANT_EMAIL_MAP, CREDIT_CC_EMAILS } from './sendEmailSecurity.mjs';
import { buildCreditPdf } from './creditPdfTemplate.mjs';
import { htmlToPdfBase64 } from './htmlToPdf.mjs';

const BUSINESS_TYPE = 'Business Credit Application';

function requiredFieldsFor(isBusiness) {
  return isBusiness
    ? [
        ['BusinessName', 'Missing business name'],
        ['Email', 'Missing business email'],
        ['BusinessPhone', 'Missing business phone'],
        ['PersonalGuarantorName', 'Missing guarantor name'],
        ['Consultant', 'Missing consultant selection'],
        ['ConsultantEmail', 'Missing consultant email'],
      ]
    : [
        ['FirstName', 'Missing applicant first name'],
        ['LastName', 'Missing applicant last name'],
        ['Email', 'Missing applicant email'],
        ['Phone', 'Missing applicant phone'],
        ['Consultant', 'Missing consultant selection'],
        ['ConsultantEmail', 'Missing consultant email'],
      ];
}

/**
 * @param {Record<string, any>} body  Submitted credit application payload.
 * @returns {Promise<{ status: number, json: object }>}
 */
export async function processCreditApplication(body) {
  const isBusiness = body?.VehicleOrService === BUSINESS_TYPE;

  for (const [field, message] of requiredFieldsFor(isBusiness)) {
    if (!body?.[field]) {
      return { status: 400, json: { success: false, error: message } };
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { status: 500, json: { success: false, error: 'Server configuration error' } };
  }
  const fromEmail = process.env.FROM_EMAIL?.trim() || 'Capital Motor Cars <onboarding@resend.dev>';

  // Recipient: derive from Consultant id server-side (never trust client email).
  const consultantId = typeof body?.Consultant === 'string' ? body.Consultant : '';
  const resolvedTo = CONSULTANT_EMAIL_MAP[consultantId] ?? 'info@capitalmotorcars.com';

  // TEST_EMAIL_OVERRIDE: when set, route ALL credit mail to this one address
  // (no CC). For local testing without a verified Resend domain. Leave unset in prod.
  const override = process.env.TEST_EMAIL_OVERRIDE?.trim();
  const to = override || resolvedTo;
  const cc = override ? [] : CREDIT_CC_EMAILS.filter((e) => e.toLowerCase() !== to.toLowerCase());

  // Generate the printable PDF; never block the lead email if PDF.co fails.
  const { html, fileName } = buildCreditPdf(body);
  const attachments = [];
  let pdfFailed = false;
  try {
    const pdfBase64 = await htmlToPdfBase64(html, fileName);
    attachments.push({ filename: fileName, content: pdfBase64 });
  } catch (err) {
    pdfFailed = true;
    console.error('[PDF] Generation failed:', err instanceof Error ? err.message : err);
  }

  // Attach any uploaded supporting documents.
  if (body?.Document1Base64 && body?.Document1FileName) {
    attachments.push({ filename: String(body.Document1FileName), content: String(body.Document1Base64) });
  }
  if (body?.Document2Base64 && body?.Document2FileName) {
    attachments.push({ filename: String(body.Document2FileName), content: String(body.Document2Base64) });
  }

  const applicantName = String(body?.Name ?? body?.BusinessName ?? 'Applicant');
  const subject = isBusiness
    ? `New Business Credit Application - ${applicantName}`
    : `New Credit Application - ${applicantName}`;
  const emailHtml = `
    <div style="font-family:Arial,sans-serif;color:#333;line-height:1.6;">
      <h2 style="color:#1a365d;">${isBusiness ? '🏢 New Business Credit Application' : '🏦 New Credit Application'}</h2>
      <p>Hi Team,<br>A new credit application has been submitted through the portal${pdfFailed ? '' : '. Please see the attached PDF for full details'}.</p>
      ${pdfFailed ? '<p style="color:#b00;"><b>Note:</b> PDF generation failed; the full submission is saved in the CRM.</p>' : ''}
      <p><b>Consultant:</b> ${consultantId || '—'}<br><b>Submitted:</b> ${new Date().toISOString().slice(0, 10)}</p>
    </div>`;

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to,
      cc,
      subject,
      html: emailHtml,
      attachments,
    });
    if (error) {
      return { status: 502, json: { success: false, error: error.message } };
    }
    return { status: 200, json: { success: true, id: data?.id } };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to send email';
    return { status: 502, json: { success: false, error: message } };
  }
}
