/**
 * Forward JSON POST body to Make (or other) webhook URL.
 * @param {string} upstreamUrl
 * @param {unknown} body
 */
export async function forwardJsonToWebhook(upstreamUrl, body) {
  return fetch(upstreamUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body ?? {}),
  });
}
