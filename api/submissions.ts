import { createClient } from '@supabase/supabase-js';
import { applyApiCors } from '../lib/httpCors.mjs';

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

  const apiKey = req.headers['x-cmc-api-key'] as string | undefined;
  const expectedKey = process.env.CMC_API_KEY;

  if (!expectedKey || apiKey !== expectedKey) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ success: false, error: 'Database configuration missing' });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const type = req.query?.type as string | undefined;
  const startDate = req.query?.startDate as string | undefined;
  const endDate = req.query?.endDate as string | undefined;

  try {
    let query = supabase
      .from('form_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (type) {
      query = query.eq('type', type);
    }
    if (startDate) {
      query = query.gte('created_at', startDate);
    }
    if (endDate) {
      query = query.lte('created_at', endDate);
    }

    const { data, error } = await query;

    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }

    return res.status(200).json({ success: true, data });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Internal server error';
    return res.status(500).json({ success: false, error: msg });
  }
}
