/**
 * Shared helpers for lead email HTML and recipient resolution.
 * Used by server/index.js and api/send-email.ts.
 */

export const TO_EMAILS = [
  'info@capitalmotorcars.com',
  'camico@capitalmotorcars.com',
  'henry@capitalmotorcars.com',
];

/** Must stay in sync with `src/lib/creditConstants.ts` CONSULTANT_EMAIL_MAP (form Consultant values). */
export const CONSULTANT_EMAIL_MAP = {
  henry_liu: 'henry@capitalmotorcars.com',
  christopher_amico: 'camico@capitalmotorcars.com',
  michael_minerva: 'mike.minerva@capitalmotorcars.com',
  vicky_azrak: 'vicky@capitalmotorcars.com',
  james_dai: 'james@capitalmotorcars.com',
  aaron_cui: 'aaron@capitalmotorcars.com',
  bobby_kaufman: 'bobby@capitalmotorcars.com',
  christine_reich: 'info@capitalmotorcars.com',
  derek_anton: 'derek@capitalmotorcars.com',
  daniel_jay_lehrer: 'dlehrer@capitalmotorcars.com',
  jeffrey_horn: 'jeffrey@capitalmotorcars.com',
  mark_onbashian: 'monbash@capitalmotorcars.com',
  markin: 'mark@capitalmotorcars.com',
  michael_zeitoune: 'mike@capitalmotorcars.com',
  rafael_frias: 'rafael@capitalmotorcars.com',
  ricky_wong: 'ricky@capitalmotorcars.com',
  sarah_flynn: 'sarah@capitalmotorcars.com',
  stephen_jo: 'info@capitalmotorcars.com',
  wilson_dong: 'info@capitalmotorcars.com',
  finance_team: 'info@capitalmotorcars.com',
  other: 'info@capitalmotorcars.com',
};

/** Escape text for HTML email bodies (prevents HTML/script injection from form fields). */
export function escapeHtml(value) {
  if (value == null) return '';
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function labelKey(key) {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());
}

/**
 * @param {'contact' | 'credit'} type
 * @param {Record<string, unknown>} displayBody
 */
export function buildHtml(type, displayBody) {
  const rows = Object.entries(displayBody)
    .filter(([, v]) => v != null && v !== '')
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #eee;"><strong>${escapeHtml(k)}</strong></td><td style="padding:8px 12px;border:1px solid #eee;">${escapeHtml(v)}</td></tr>`,
    )
    .join('');
  const title = type === 'contact' ? 'Contact' : 'Credit';
  return `
    <div style="font-family:sans-serif;max-width:600px;">
      <h2 style="color:#1a1a1a;">New ${title} Lead</h2>
      <p style="color:#555;">Submitted from Capital Motor Cars website.</p>
      <table style="width:100%;border-collapse:collapse;margin-top:16px;">
        ${rows}
      </table>
    </div>
  `;
}

/** Strip fields the client must not control for routing or display. */
export function sanitizeLeadFields(body) {
  const fields = { ...(body ?? {}) };
  delete fields.type;
  delete fields.ConsultantEmail;
  return fields;
}

/**
 * Resolve To: list from Consultant id only (never trust client-supplied email).
 * @param {Record<string, unknown>} fields
 */
export function resolveConsultantRecipients(fields) {
  let toEmails = [...TO_EMAILS];
  const consultantKey = fields.Consultant;
  if (consultantKey && typeof consultantKey === 'string' && CONSULTANT_EMAIL_MAP[consultantKey]) {
    const consultantEmail = CONSULTANT_EMAIL_MAP[consultantKey];
    if (consultantEmail && consultantEmail !== 'info@capitalmotorcars.com') {
      toEmails = [consultantEmail];
    }
  }
  return toEmails;
}
