/**
 * Shared contact / trade-in lead processor: validate -> build HTML -> email via Resend.
 * Called by both the Vercel functions (api/webhooks/contact.ts, trade-in.ts) and
 * the local Express dev server (server/index.js) so local testing matches production.
 *
 * Replaces the old Make.com webhook forward. Does NOT save to the database or
 * forward to Kora; callers handle persistence and Kora with their own clients.
 */
import { Resend } from 'resend';
import { escapeHtml, labelKey, resolveConsultantRecipients, TEAM_CC_EMAILS } from './sendEmailSecurity.mjs';
import { buildLeadPdf } from './leadPdfTemplate.mjs';
import { htmlToPdfBase64 } from './htmlToPdf.mjs';

// Photo arrays ([{ filename, base64 }]) become attachments, not table rows.
const PHOTO_KEYS = ['ExteriorPhotos', 'InteriorPhotos'];
// Never render these in the table (routing fields / large/raw values).
const HIDE_KEYS = new Set(['ConsultantEmail', 'SalesAgentEmail', 'type', ...PHOTO_KEYS]);

const SUBJECTS = {
  contact: '🚗 New Lead Captured: Capital Motor Cars Website',
  'trade-in': '🚙 New Trade-In Request: Capital Motor Cars',
};

const TITLES = { contact: 'Contact', 'trade-in': 'Trade-In' };

/** Escaped text with newlines preserved as <br> for HTML email bodies. */
function escapeMultiline(value) {
  return escapeHtml(value).replace(/\r?\n/g, '<br>');
}

/**
 * Formatted contact-lead email matching the legacy "New Lead Captured" layout:
 * LEAD INFORMATION + DETAILS sections with icons and a submission footer.
 */
function buildContactLeadHtml(body) {
  const serviceVehicle =
    (body.Vehicle && body.Vehicle !== 'N/A' && body.Vehicle) || body.Service || '';
  const detailLines = [
    body.Message ? `📝 <strong>Interest:</strong> ${escapeMultiline(body.Message)}` : '',
    serviceVehicle ? `🚗 <strong>Service/Vehicle:</strong> ${escapeHtml(serviceVehicle)}` : '',
  ]
    .filter(Boolean)
    .join('<br>');

  return `
    <div style="font-family:sans-serif;color:#222;line-height:1.6;max-width:640px;">
      <p>Hi Team,</p>
      <p>A new lead has just submitted their details.<br>Please follow up as soon as possible.</p>
      <p><strong>LEAD INFORMATION:</strong><br>
        👤 <strong>Full Name:</strong> ${escapeHtml(body.Name ?? '')}<br>
        📞 <strong>Phone Number:</strong> ${escapeHtml(body.Phone ?? '')}<br>
        📧 <strong>Email Address:</strong> ${escapeHtml(body.Email ?? '')}
      </p>
      ${detailLines ? `<p><strong>DETAILS:</strong><br>${detailLines}</p>` : ''}
      <p>🕐 <strong>Submitted at:</strong> ${escapeHtml(new Date().toISOString())}<br>
        Sent via Capital Motor Cars Automated System</p>
    </div>
  `;
}

/** Pull base64 photos from the payload into Resend attachment objects. */
function collectPhotoAttachments(body) {
  const out = [];
  for (const key of PHOTO_KEYS) {
    const arr = body?.[key];
    if (!Array.isArray(arr)) continue;
    for (const p of arr) {
      if (p && p.base64 && p.filename) {
        out.push({ filename: String(p.filename), content: String(p.base64) });
      }
    }
  }
  return out;
}

/** Booleans render as Yes/No; everything else as its string value. */
function displayValue(v) {
  if (v === true) return 'Yes';
  if (v === false) return 'No';
  return v;
}

function buildLeadHtml(type, body) {
  const rows = Object.entries(body)
    .filter(([k, v]) => !HIDE_KEYS.has(k) && v != null && v !== '')
    .map(([k, v]) => {
      const value = displayValue(v);
      return `<tr><td style="padding:8px 12px;border:1px solid #eee;"><strong>${escapeHtml(labelKey(k))}</strong></td><td style="padding:8px 12px;border:1px solid #eee;">${escapeHtml(value)}</td></tr>`;
    })
    .join('');
  const title = TITLES[type] ?? 'Lead';
  return `
    <div style="font-family:sans-serif;max-width:600px;">
      <h2 style="color:#1a1a1a;">New ${title} Lead</h2>
      <p style="color:#555;">Submitted from the Capital Motor Cars website.</p>
      <table style="width:100%;border-collapse:collapse;margin-top:16px;">
        ${rows}
      </table>
    </div>
  `;
}

/**
 * @param {'contact' | 'trade-in'} type
 * @param {Record<string, any>} body  Submitted lead payload.
 * @returns {Promise<{ status: number, json: object }>}
 */
export async function processLead(type, body) {
  const name = typeof body?.Name === 'string' ? body.Name.trim() : '';
  const email = typeof body?.Email === 'string' ? body.Email.trim() : '';
  const phone = typeof body?.Phone === 'string' ? body.Phone.trim() : '';
  if (!name || !email || !phone) {
    return { status: 400, json: { success: false, error: 'Name, Email, and Phone are required' } };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { status: 500, json: { success: false, error: 'Server configuration error' } };
  }
  const fromEmail = process.env.FROM_EMAIL?.trim() || 'Capital Motor Cars <onboarding@resend.dev>';

  // Recipient: derive from consultant/sales-agent id server-side (never trust client email).
  const resolvedTo = resolveConsultantRecipients(body ?? {});
  // TEST_EMAIL_OVERRIDE: when set, route ALL lead mail to this one address (no CC).
  const override = process.env.TEST_EMAIL_OVERRIDE?.trim();
  const to = override ? [override] : resolvedTo;
  // CC the team on real sends; never CC an address already in To.
  const toSet = new Set(to.map((e) => e.toLowerCase()));
  const cc = override ? [] : TEAM_CC_EMAILS.filter((e) => !toSet.has(e.toLowerCase()));

  // Contact: clean "New Lead Captured" layout. Trade-in: full field table.
  const html = type === 'contact' ? buildContactLeadHtml(body ?? {}) : buildLeadHtml(type, body ?? {});
  const attachments = collectPhotoAttachments(body ?? {});

  // Trade-in carries a printable PDF of all vehicle details + photos.
  // Never block the email if PDF rendering fails.
  if (type === 'trade-in') {
    try {
      const { html: pdfHtml, fileName } = buildLeadPdf(type, body ?? {});
      const pdfBase64 = await htmlToPdfBase64(pdfHtml, fileName);
      attachments.unshift({ filename: fileName, content: pdfBase64 });
    } catch (err) {
      console.error('[PDF] Lead PDF generation failed:', err instanceof Error ? err.message : err);
    }
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to,
      cc,
      subject: SUBJECTS[type] ?? SUBJECTS.contact,
      html,
      ...(attachments.length ? { attachments } : {}),
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
