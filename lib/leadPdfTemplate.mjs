/**
 * Printable PDF template for contact / trade-in leads.
 * Renders the same fields shown in the email table into a clean A4/Letter
 * document, mirroring the credit-application PDF so all leads have an
 * attachable record. Rendered to PDF by lib/htmlToPdf.mjs.
 */
import { escapeHtml, labelKey } from './sendEmailSecurity.mjs';

// Photo arrays become attachments, not table rows.
const PHOTO_KEYS = ['ExteriorPhotos', 'InteriorPhotos'];
const HIDE_KEYS = new Set(['ConsultantEmail', 'SalesAgentEmail', 'type', ...PHOTO_KEYS]);

const TITLES = { contact: 'Contact Lead', 'trade-in': 'Trade-In Request' };

/** Booleans render as Yes/No; everything else as its string value. */
function displayValue(v) {
  if (v === true) return 'Yes';
  if (v === false) return 'No';
  return v;
}

function tableRows(body) {
  return Object.entries(body)
    .filter(([k, v]) => !HIDE_KEYS.has(k) && v != null && v !== '')
    .map(([k, v]) => {
      const value = displayValue(v);
      return `<tr>
        <td style="padding:8px 12px;border:1px solid #e2e8f0;background:#f8fafc;font-weight:bold;width:38%;">${escapeHtml(labelKey(k))}</td>
        <td style="padding:8px 12px;border:1px solid #e2e8f0;">${escapeHtml(value)}</td>
      </tr>`;
    })
    .join('');
}

/**
 * @param {'contact' | 'trade-in'} type
 * @param {Record<string, any>} payload  Submitted lead payload.
 * @returns {{ html: string, fileName: string }}
 */
export function buildLeadPdf(type, payload) {
  const title = TITLES[type] ?? 'Lead';
  const submitted = new Date().toISOString().slice(0, 10);
  const style = `
    body { margin: 0; font-family: Arial, sans-serif; color: #333; }
    h2 { color: #1a365d; border-bottom: 2px solid #1a365d; padding-bottom: 6px; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    tr { break-inside: avoid; page-break-inside: avoid; }
  `;
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${style}</style></head><body>
    <div style="padding:24px;line-height:1.6;">
      <h2>🚗 New ${escapeHtml(title)}: Capital Motor Cars</h2>
      <p>Hi Team,<br>A new ${escapeHtml(title.toLowerCase())} has been submitted through the website. Full details below.</p>
      <table>${tableRows(payload ?? {})}</table>
      <hr style="margin-top:24px;border:none;border-top:1px solid #e2e8f0;">
      <p style="font-size:12px;color:#777;">Submission Date: ${escapeHtml(submitted)}</p>
    </div>
  </body></html>`;

  const safeName = String(payload?.Name || 'Lead')
    .replace(/[^a-z0-9]+/gi, '_')
    .replace(/^_+|_+$/g, '') || 'Lead';
  const prefix = type === 'trade-in' ? 'TradeIn' : 'Contact';
  return { html, fileName: `${prefix}_${safeName}.pdf` };
}
