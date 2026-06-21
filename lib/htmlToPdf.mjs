/**
 * Self-hosted HTML->PDF using headless Chromium (no external API).
 * Renders the exact same HTML template, so layout is identical to the old
 * PDF.co output. Drop-in replacement for the PDF.co helper.
 *
 * - Production/serverless (Vercel/Lambda): bundled @sparticuz/chromium.
 * - Local dev: a system Chrome/Chromium (auto-detected or via CHROME_PATH).
 */

const MAC_CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const LINUX_CHROME_CANDIDATES = [
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
  '/usr/bin/chromium',
];

const isServerless = Boolean(
  process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_VERSION || process.env.AWS_EXECUTION_ENV,
);

async function launchBrowser() {
  const puppeteer = (await import('puppeteer-core')).default;

  if (isServerless) {
    const chromium = (await import('@sparticuz/chromium')).default;
    return puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
  }

  // Local: use an installed Chrome.
  let executablePath = process.env.CHROME_PATH;
  if (!executablePath) {
    const { existsSync } = await import('node:fs');
    executablePath = [MAC_CHROME, ...LINUX_CHROME_CANDIDATES].find((p) => existsSync(p));
  }
  if (!executablePath) {
    throw new Error('No Chrome found. Set CHROME_PATH to a Chrome/Chromium binary.');
  }
  return puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
}

/**
 * @param {string} html  Full HTML document to render.
 * @param {string} _name Output file name (kept for signature parity; unused).
 * @returns {Promise<string>} base64-encoded PDF bytes.
 */
export async function htmlToPdfBase64(html, _name) {
  const browser = await launchBrowser();
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({
      format: 'Letter',
      printBackground: true,
      // Top/bottom margin applies to every page, so page 2+ start with breathing room.
      margin: { top: '40px', right: '0', bottom: '32px', left: '0' },
    });
    return Buffer.from(pdf).toString('base64');
  } finally {
    await browser.close();
  }
}
