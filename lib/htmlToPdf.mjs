/**
 * HTML->PDF via the PDF.co API (no headless Chromium / native libs).
 * Renders the same HTML template used for the email, so layout is unchanged.
 *
 * Requires env PDF_CO_API_KEY. Throws on any failure so the caller can fall
 * back gracefully (the lead email is still sent without the attachment).
 */

const PDFCO_ENDPOINT = 'https://api.pdf.co/v1/pdf/convert/from/html';

/**
 * @param {string} html  Full HTML document to render.
 * @param {string} name  Output file name.
 * @returns {Promise<string>} base64-encoded PDF bytes.
 */
export async function htmlToPdfBase64(html, name) {
  const apiKey = process.env.PDF_CO_API_KEY?.trim();
  if (!apiKey) {
    throw new Error('PDF_CO_API_KEY is not set');
  }

  // 1) Ask PDF.co to convert the HTML; it returns a URL to the generated PDF.
  const convertRes = await fetch(PDFCO_ENDPOINT, {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      html,
      name: name || 'Application.pdf',
      paperSize: 'Letter',
      printBackground: true,
      // top right bottom left — matches the prior Chromium margins.
      margins: '40px 0px 32px 0px',
      async: false,
    }),
  });

  const data = await convertRes.json().catch(() => null);
  if (!convertRes.ok || !data || data.error || !data.url) {
    const reason = data?.message || `${convertRes.status} ${convertRes.statusText}`;
    throw new Error(`PDF.co conversion failed: ${reason}`);
  }

  // 2) Download the generated PDF and return it as base64 for the email attachment.
  const fileRes = await fetch(data.url);
  if (!fileRes.ok) {
    throw new Error(`PDF.co download failed: ${fileRes.status} ${fileRes.statusText}`);
  }
  const bytes = Buffer.from(await fileRes.arrayBuffer());
  return bytes.toString('base64');
}
