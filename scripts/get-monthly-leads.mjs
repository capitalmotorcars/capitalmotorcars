import 'dotenv/config';
import readline from 'node:readline';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('\x1b[31m[Error] Missing Supabase credentials in .env\x1b[0m');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

function parseDateRange(inputMonth, customStart, customEnd) {
  if (customStart && customEnd) {
    const startIso = new Date(customStart).toISOString();
    const endDate = new Date(customEnd);
    endDate.setHours(23, 59, 59, 999);
    return {
      label: `${customStart} to ${customEnd}`,
      startDate: startIso,
      endDate: endDate.toISOString(),
    };
  }

  // Handle month inputs like "2026-10", "10", "oct", "october"
  const now = new Date();
  let year = now.getFullYear();
  let monthIndex = now.getMonth(); // 0-based

  if (inputMonth) {
    const raw = String(inputMonth).trim().toLowerCase();
    const monthNames = [
      'january', 'february', 'march', 'april', 'may', 'june',
      'july', 'august', 'september', 'october', 'november', 'december'
    ];

    if (/^\d{4}-\d{1,2}$/.test(raw)) {
      const [y, m] = raw.split('-');
      year = parseInt(y, 10);
      monthIndex = parseInt(m, 10) - 1;
    } else if (/^\d{1,2}$/.test(raw)) {
      monthIndex = parseInt(raw, 10) - 1;
    } else {
      const matched = monthNames.findIndex((m) => m.startsWith(raw));
      if (matched !== -1) {
        monthIndex = matched;
      }
    }
  }

  const start = new Date(Date.UTC(year, monthIndex, 1, 0, 0, 0));
  const end = new Date(Date.UTC(year, monthIndex + 1, 0, 23, 59, 59, 999));

  const monthLabel = start.toLocaleString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
  return {
    label: monthLabel,
    startDate: start.toISOString(),
    endDate: end.toISOString(),
  };
}

export async function fetchMonthlyLeads({
  month = null,
  start = null,
  end = null,
  type = 'contact',
} = {}) {
  const range = parseDateRange(month, start, end);

  let query = supabase
    .from('form_submissions')
    .select('id, type, created_at, payload')
    .gte('created_at', range.startDate)
    .lte('created_at', range.endDate)
    .order('created_at', { ascending: true });

  if (type && type !== 'all') {
    query = query.eq('type', type);
  }

  const { data, error } = await query;
  if (error) {
    throw new Error(`Failed to fetch from Supabase: ${error.message}`);
  }

  const seen = new Set();
  const uniqueLeads = [];
  const duplicateLeads = [];

  for (const item of data || []) {
    const p = item.payload || {};
    const name = (p.Name || p.name || p.fullName || `${p.FirstName || ''} ${p.LastName || ''}`).trim() || 'Unknown';
    const email = (p.Email || p.email || '').trim().toLowerCase();
    const phone = (p.Phone || p.phone || '').replace(/\D/g, '');
    const location = p.Location || p.location || p.City || p.city || 'N/A';
    const message = p.Message || p.message || '';

    // Primary deduplication key: email, or phone, or full name
    const dedupeKey = email ? `email:${email}` : phone ? `phone:${phone}` : `name:${name.toLowerCase()}`;

    const leadRecord = {
      id: item.id,
      name,
      email: email || 'N/A',
      phone: p.Phone || p.phone || 'N/A',
      location,
      submissionDate: item.created_at,
      type: item.type,
      messageSnippet: message ? message.slice(0, 60).replace(/\n/g, ' ') : '',
    };

    if (seen.has(dedupeKey)) {
      duplicateLeads.push(leadRecord);
    } else {
      seen.add(dedupeKey);
      uniqueLeads.push(leadRecord);
    }
  }

  return {
    range,
    type,
    totalRaw: (data || []).length,
    totalUnique: uniqueLeads.length,
    totalDuplicates: duplicateLeads.length,
    uniqueLeads,
    duplicateLeads,
  };
}

function printReport(result) {
  console.log('\n============================================================');
  console.log(`  CAPITAL MOTOR CARS - MONTHLY LEAD AUDIT`);
  console.log('============================================================');
  console.log(`Period:         \x1b[36m${result.range.label}\x1b[0m`);
  console.log(`Type Filter:    \x1b[33m${result.type}\x1b[0m`);
  console.log(`Date Range:     ${result.range.startDate.slice(0, 10)} to ${result.range.endDate.slice(0, 10)}`);
  console.log('------------------------------------------------------------');
  console.log(`Total Raw Submissions:   \x1b[1m${result.totalRaw}\x1b[0m`);
  console.log(`Duplicates Removed:      \x1b[31m${result.totalDuplicates}\x1b[0m`);
  console.log(`Total Unique Leads:      \x1b[32m\x1b[1m${result.totalUnique}\x1b[0m`);
  console.log('============================================================\n');

  if (result.uniqueLeads.length === 0) {
    console.log('No leads found for this period.');
    return;
  }

  console.log('\x1b[32m--- UNIQUE LEADS (' + result.totalUnique + ') ---\x1b[0m');
  result.uniqueLeads.forEach((lead, i) => {
    const num = String(i + 1).padStart(2, ' ');
    const date = new Date(lead.submissionDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    console.log(`${num}. \x1b[1m${lead.name}\x1b[0m`);
    console.log(`    Email:    ${lead.email}`);
    console.log(`    Phone:    ${lead.phone}`);
    console.log(`    Date:     ${date} (${lead.submissionDate})`);
    if (lead.location && lead.location !== 'N/A') {
      console.log(`    Location: ${lead.location}`);
    }
  });

  if (result.duplicateLeads.length > 0) {
    console.log('\n\x1b[31m--- DUPLICATES REMOVED (' + result.totalDuplicates + ') ---\x1b[0m');
    result.duplicateLeads.forEach((dup, i) => {
      const num = String(i + 1).padStart(2, ' ');
      console.log(`${num}. ${dup.name} (${dup.email}) - Submitted at ${dup.submissionDate.slice(0, 10)}`);
    });
  }

  console.log('\n============================================================\n');
}

async function runCli() {
  const args = process.argv.slice(2);

  let monthArg = null;
  let startArg = null;
  let endArg = null;
  let typeArg = 'contact';

  for (const arg of args) {
    if (arg.startsWith('--month=')) {
      monthArg = arg.split('=')[1];
    } else if (arg.startsWith('--start=')) {
      startArg = arg.split('=')[1];
    } else if (arg.startsWith('--end=')) {
      endArg = arg.split('=')[1];
    } else if (arg.startsWith('--type=')) {
      typeArg = arg.split('=')[1];
    } else if (!arg.startsWith('--') && !monthArg) {
      monthArg = arg;
    }
  }

  if (monthArg || (startArg && endArg)) {
    const result = await fetchMonthlyLeads({
      month: monthArg,
      start: startArg,
      end: endArg,
      type: typeArg,
    });
    printReport(result);
    return;
  }

  // If no arguments passed, prompt interactively
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log('\nSelect option:');
  console.log('1. Check specific month (e.g. "October", "2026-10", "2026-09")');
  console.log('2. Check custom start and end date (e.g. "2026-09-20 to 2026-10-20")');

  rl.question('\nEnter month name, YYYY-MM, or press Enter for current month: ', async (answer) => {
    rl.close();
    const chosen = answer.trim() || new Date().toISOString().slice(0, 7);
    const result = await fetchMonthlyLeads({
      month: chosen,
      type: typeArg,
    });
    printReport(result);
  });
}

// Only run CLI when invoked directly from command line
if (process.argv[1]?.endsWith('get-monthly-leads.mjs')) {
  runCli().catch((err) => {
    console.error('\x1b[31m[Error]\x1b[0m', err.message);
    process.exit(1);
  });
}
