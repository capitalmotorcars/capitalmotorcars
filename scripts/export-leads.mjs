import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';
import * as XLSX from 'xlsx';
import { extractLeadsForSheet, syncLeadToSheet, GOOGLE_SHEET_WEBHOOK_URL, formatDateTime } from '../lib/sheetSync.mjs';




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('[Export] Missing Supabase credentials in environment.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const args = process.argv.slice(2);
  const shouldSync = args.includes('--sync');
  const typeFilter = args.find((a) => a.startsWith('--type='))?.split('=')[1] || 'credit'; // 'credit' | 'all' | 'trade-in'

  console.log(`[Export] Fetching submissions from Supabase (type: ${typeFilter})...`);

  let query = supabase
    .from('form_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (typeFilter !== 'all') {
    query = query.eq('type', typeFilter);
  }

  const { data, error } = await query;
  if (error) {
    console.error('[Export] Failed to fetch submissions:', error.message);
    process.exit(1);
  }

  console.log(`[Export] Retrieved ${data?.length || 0} submission records.`);

  const allLeads = [];
  for (const item of data || []) {
    const extracted = extractLeadsForSheet(item.type, item.payload);
    for (const lead of extracted) {
      allLeads.push({
        ...lead,
        dbId: item.id,
        createdAt: item.created_at,
      });
    }
  }

  console.log(`[Export] Extracted ${allLeads.length} lead entries.`);

  // Write CSV file (Excel-compatible with UTF-8 BOM)
  const csvOutputPath = path.join(rootDir, 'credit_applications.csv');
  const header = 'First Name,Email,Submission Type,Date Submitted\r\n';
  const csvLines = allLeads.map((lead) => {
    const fName = `"${(lead.firstName || '').replace(/"/g, '""')}"`;
    const email = `"${(lead.email || '').replace(/"/g, '""')}"`;
    const type = `"${(lead.submissionType || '').replace(/"/g, '""')}"`;
    const date = `"${formatDateTime(lead.createdAt || lead.submittedAt).replace(/"/g, '""')}"`;
    return `${fName},${email},${type},${date}`;
  });

  const fileContent = '\uFEFF' + header + csvLines.join('\r\n');
  fs.writeFileSync(csvOutputPath, fileContent, 'utf-8');
  console.log(`[Export] Successfully wrote Excel-compatible CSV to: ${csvOutputPath}`);

  // Write native Microsoft Excel Workbook (.xlsx)
  const xlsxOutputPath = path.join(rootDir, 'credit_applications.xlsx');
  const xlsxRows = allLeads.map((lead) => ({
    'First Name': lead.firstName || '',
    'Email': lead.email || '',
    'Submission Type': lead.submissionType || '',
    'Date Submitted': formatDateTime(lead.createdAt || lead.submittedAt),
  }));


  const worksheet = XLSX.utils.json_to_sheet(xlsxRows, {
    header: ['First Name', 'Email', 'Submission Type', 'Date Submitted'],
  });

  // Professional column widths for Excel
  worksheet['!cols'] = [
    { wch: 22 }, // First Name
    { wch: 38 }, // Email
    { wch: 38 }, // Submission Type
    { wch: 30 }, // Date Submitted
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Credit Applications');
  XLSX.writeFile(workbook, xlsxOutputPath);
  console.log(`[Export] Successfully wrote native Excel file to: ${xlsxOutputPath}`);


  if (shouldSync) {
    console.log('[Export] Syncing historical leads to Google Sheet webhook...');
    const webhookUrl =
      GOOGLE_SHEET_WEBHOOK_URL ||
      process.env.GOOGLE_SHEET_WEBHOOK_URL ||
      process.env.EXCEL_WEBHOOK_URL ||
      process.env.LEAD_SHEET_WEBHOOK_URL;


    if (!webhookUrl) {
      console.warn('[Export] GOOGLE_SHEET_WEBHOOK_URL is not set. Cannot sync to sheet.');
    } else {
      for (const lead of allLeads) {
        await syncLeadToSheet(lead.submissionType.includes('Credit') ? 'credit' : 'trade-in', {
          FirstName: lead.firstName,
          Email: lead.email,
        });
      }
      console.log('[Export] Historical sync completed.');
    }
  }
}

main().catch((err) => {
  console.error('[Export] Uncaught error:', err);
  process.exit(1);
});
