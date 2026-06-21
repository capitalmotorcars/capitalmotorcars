/**
 * Shared helpers for lead email HTML and recipient resolution.
 * Used by server/index.js and api/send-email.ts.
 */

export const TO_EMAILS = [
  'info@capitalmotorcars.com',
  'camico@capitalmotorcars.com',
  'henry@capitalmotorcars.com',
];


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
  dj_kim: 'dkim@capitalmotorcars.com',
  chris_case: 'ccase@capitalmotorcars.com',
  finance_team: 'info@capitalmotorcars.com',
  other: 'info@capitalmotorcars.com',
};

/** Team addresses CC'd on every lead email (credit, contact, trade-in). */
export const TEAM_CC_EMAILS = [
  'kai@capitalmotorcars.com',
  'sales@capitalmotorcars.com',
  'henry@capitalmotorcars.com',
  'camico@capitalmotorcars.com',
];

/** @deprecated alias kept for callers; use {@link TEAM_CC_EMAILS}. */
export const CREDIT_CC_EMAILS = TEAM_CC_EMAILS;

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
 * Resolve To: list from the consultant id only (never trust client-supplied email).
 * Accepts either `Consultant` (contact/credit forms) or `SalesAgent` (trade-in form).
 * @param {Record<string, unknown>} fields
 */
export function resolveConsultantRecipients(fields) {
  let toEmails = [...TO_EMAILS];
  const consultantKey =
    (typeof fields.Consultant === 'string' && fields.Consultant) ||
    (typeof fields.SalesAgent === 'string' && fields.SalesAgent) ||
    '';
  if (consultantKey && CONSULTANT_EMAIL_MAP[consultantKey]) {
    const consultantEmail = CONSULTANT_EMAIL_MAP[consultantKey];
    if (consultantEmail && consultantEmail !== 'info@capitalmotorcars.com') {
      toEmails = [consultantEmail];
    }
  }
  return toEmails;
}
