/**
 * Forward a credit application to Kora CRM so it becomes a customer + credit
 * application + deal (consultant attached as external broker).
 *
 * Contract: NEVER throws and never blocks the applicant. The consultant email
 * is sent independently by processCreditApplication; if Kora is down, slow or
 * rejects the payload, only a log line is written.
 *
 * Env:
 *   KORA_API_KEY  required (same key the contact-form forward uses)
 *   KORA_API_URL  optional override, e.g. http://localhost:3001 for local tests
 */

const DEFAULT_KORA_URL = 'https://api.tellkora.com';
const TIMEOUT_MS = 12_000;
/** Kora accepts ~30 MB bodies; drop the uploaded files (still in the email) past this. */
const MAX_BODY_CHARS = 25_000_000;

/**
 * @param {Record<string, unknown>} body Submitted credit application payload.
 * @returns {Promise<void>}
 */
export async function forwardCreditToKora(body) {
  const koraApiKey = process.env.KORA_API_KEY?.trim();
  if (!koraApiKey) {
    console.warn('[Kora] Credit app forward skipped: KORA_API_KEY not configured.');
    return;
  }
  const baseUrl = (process.env.KORA_API_URL?.trim() || DEFAULT_KORA_URL).replace(/\/$/, '');

  try {
    let payload = JSON.stringify(body ?? {});
    if (payload.length > MAX_BODY_CHARS) {
      const { Document1Base64, Document2Base64, ...rest } = body ?? {};
      payload = JSON.stringify(rest);
      console.warn('[Kora] Credit app too large; forwarding without uploaded documents.');
    }

    const resp = await fetch(`${baseUrl}/api/cmc/credit-app`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CMC-Api-Key': koraApiKey },
      body: payload,
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    const text = await resp.text();
    if (resp.ok) {
      console.log(`[Kora] Credit app forwarded (status ${resp.status}): ${text}`);
    } else {
      console.error(`[Kora] Credit app forward failed (status ${resp.status}): ${text}`);
    }
  } catch (err) {
    console.error('[Kora] Credit app forward threw:', err instanceof Error ? err.message : err);
  }
}
