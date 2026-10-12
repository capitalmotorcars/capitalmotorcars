import { createClient } from '@supabase/supabase-js';
import { applyApiCors } from '../lib/httpCors.mjs';
import { extractLeadsForSheet, formatDateTime } from '../lib/sheetSync.mjs';


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

  if (expectedKey && apiKey !== expectedKey) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
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
  const type = (typeof req.query?.type === 'string' ? req.query.type : 'credit') || 'credit';
  const format = (typeof req.query?.format === 'string' ? req.query.format : 'csv') || 'csv';

  try {
    let query = supabase
      .from('form_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (type && type !== 'all') {
      query = query.eq('type', type);
    }

    const { data, error } = await query;
    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }

    const rows: Array<{ firstName: string; email: string; type: string; date: string }> = [];
    for (const sub of (data || [])) {
      const extracted = extractLeadsForSheet(sub.type, sub.payload);
      for (const item of extracted) {
        rows.push({
          firstName: item.firstName,
          email: item.email,
          type: item.submissionType,
          date: formatDateTime(sub.created_at || item.submittedAt),
        });

      }
    }

    if (format === 'json') {
      return res.status(200).json({ success: true, count: rows.length, leads: rows });
    }

    const csvHeader = 'First Name,Email,Submission Type,Date Submitted\r\n';
    const csvRows = rows
      .map((r) => {
        const cleanFirst = `"${(r.firstName || '').replace(/"/g, '""')}"`;
        const cleanEmail = `"${(r.email || '').replace(/"/g, '""')}"`;
        const cleanType = `"${(r.type || '').replace(/"/g, '""')}"`;
        const cleanDate = `"${(r.date || '').replace(/"/g, '""')}"`;
        return `${cleanFirst},${cleanEmail},${cleanType},${cleanDate}`;
      })
      .join('\r\n');

    const csvContent = '\uFEFF' + csvHeader + csvRows;

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="capital_motor_cars_leads.csv"');
    return res.status(200).send(csvContent);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Internal server error';
    return res.status(500).json({ success: false, error: msg });
  }
}
