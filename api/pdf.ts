import { createClient } from '@supabase/supabase-js';
import { applyApiCors } from '../lib/httpCors.mjs';
import { buildCreditPdf } from '../lib/creditPdfTemplate.mjs';
import { buildLeadPdf } from '../lib/leadPdfTemplate.mjs';

declare var process: { env: Record<string, string | undefined> };

type Req = {
  method?: string;
  query?: Record<string, string | string[]>;
  headers?: { origin?: string; [key: string]: string | string[] | undefined };
};

type Res = {
  status: (n: number) => Res;
  setHeader: (n: string, v: string) => void;
  json: (o: object) => void;
  end: (s?: string) => void;
  send: (body: string) => void;
};

export default async function handler(req: Req, res: Res) {
  applyApiCors(req as any, res as any);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const queryKey = typeof req.query?.key === 'string' ? req.query.key : undefined;
  const headerKey = req.headers?.['x-cmc-api-key'] as string | undefined;
  const apiKey = headerKey || queryKey;
  const expectedKey = process.env.CMC_API_KEY;

  if (expectedKey && apiKey && apiKey !== expectedKey) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  const id = typeof req.query?.id === 'string' ? req.query.id : undefined;
  if (!id) {
    return res.status(400).json({ success: false, error: 'Missing submission id parameter' });
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.VITE_SUPABASE_SERVICE_ROLE_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ success: false, error: 'Database configuration missing' });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { data, error } = await supabase
      .from('form_submissions')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return res.status(404).json({ success: false, error: 'Submission not found' });
    }

    let renderedHtml = '';
    let docTitle = 'Application';

    if (data.type === 'credit') {
      const result = buildCreditPdf(data.payload || {});
      renderedHtml = result.html;
      docTitle = result.fileName || 'Credit_Application.pdf';
    } else if (data.type === 'trade-in') {
      const result = buildLeadPdf('trade-in', data.payload || {});
      renderedHtml = result.html;
      docTitle = result.fileName || 'Trade_In_Request.pdf';
    } else {
      const result = buildLeadPdf('contact', data.payload || {});
      renderedHtml = result.html;
      docTitle = 'Contact_Lead.html';
    }

    // Inject print toolbar at top of document
    const printToolbar = `
      <div id="print-toolbar" style="background:#1a365d;color:#fff;padding:12px 20px;font-family:sans-serif;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:9999;box-shadow:0 2px 4px rgba(0,0,0,0.15);">
        <div>
          <strong style="font-size:15px;">Capital Motor Cars</strong>
          <span style="margin-left:12px;opacity:0.85;font-size:13px;">${docTitle}</span>
        </div>
        <div>
          <button onclick="window.print()" style="background:#fff;color:#1a365d;border:none;padding:6px 16px;border-radius:4px;font-weight:bold;cursor:pointer;font-size:13px;">
            🖨️ Print / Save as PDF
          </button>
        </div>
      </div>
      <style>
        @media print {
          #print-toolbar { display: none !important; }
        }
      </style>
    `;

    const fullHtml = renderedHtml.replace('<body>', '<body>' + printToolbar);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(fullHtml);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Internal server error';
    return res.status(500).json({ success: false, error: msg });
  }
}
