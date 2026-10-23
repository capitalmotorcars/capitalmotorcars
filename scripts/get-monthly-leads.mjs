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

export function classifyLead(payload) {
  const p = payload || {};
  const msg = (p.Message || p.message || '').trim();
  const lowerMsg = msg.toLowerCase();
  const name = (p.Name || p.name || '').trim();

  if (!msg) {
    return {
      category: 'INCOMPLETE',
      isRealLead: false,
      note: 'No message provided (blank inquiry)',
    };
  }

  // Bot Spam / Gibberish detection
  if (/^[a-zA-Z0-9]{12,}$/.test(msg) && !msg.includes(' ')) {
    return {
      category: 'BOT SPAM',
      isRealLead: false,
      note: 'Automated bot spam (random gibberish string)',
    };
  }

  // Solicitor / Sales pitch detections
  if (lowerMsg.includes('brokerscar.com') || (lowerMsg.includes('domain') && lowerMsg.includes('for sale'))) {
    return {
      category: 'NOT A LEAD (Solicitor)',
      isRealLead: false,
      note: 'Domain broker trying to sell brokerscar.com',
    };
  }
  if (lowerMsg.includes('pays pos') || lowerMsg.includes('credit card processing') || lowerMsg.includes('point of sale')) {
    return {
      category: 'NOT A LEAD (Solicitor)',
      isRealLead: false,
      note: 'Merchant services sales pitch (selling credit card POS processing)',
    };
  }
  if (lowerMsg.includes('jadetrade') || lowerMsg.includes('get more customers') || lowerMsg.includes('paid website services') || lowerMsg.includes('cal.com')) {
    return {
      category: 'NOT A LEAD (Solicitor)',
      isRealLead: false,
      note: 'Agency sales pitch (selling paid marketing / website services)',
    };
  }
  if (lowerMsg.includes('field sales') || lowerMsg.includes('customers in germany') || lowerMsg.includes('b2b sales')) {
    return {
      category: 'NOT A LEAD (Solicitor)',
      isRealLead: false,
      note: 'B2B sales agency pitching outsourced sales services in Germany',
    };
  }
  if (lowerMsg.includes('procurement manager') || lowerMsg.includes('united-metaltek') || lowerMsg.includes('materials and equipment')) {
    return {
      category: 'NOT A LEAD (Solicitor)',
      isRealLead: false,
      note: 'Industrial supply chain solicitation',
    };
  }
  if (lowerMsg.includes('baker botts') || lowerMsg.includes('potential business opportunity') || lowerMsg.includes('formal inquiry to initiate')) {
    return {
      category: 'NOT A LEAD (Business Pitch)',
      isRealLead: false,
      note: 'Law firm outreach for business opportunity / corporate inquiry',
    };
  }

  // Real Automotive Leasing Leads
  if (
    lowerMsg.includes('lease') ||
    lowerMsg.includes('car') ||
    lowerMsg.includes('quote') ||
    lowerMsg.includes('suv') ||
    lowerMsg.includes('mazda') ||
    lowerMsg.includes('lexus') ||
    lowerMsg.includes('mercedes') ||
    lowerMsg.includes('audi') ||
    lowerMsg.includes('bmw') ||
    lowerMsg.includes('volvo') ||
    lowerMsg.includes('kia') ||
    lowerMsg.includes('hyundai') ||
    lowerMsg.includes('infiniti') ||
    lowerMsg.includes('down') ||
    lowerMsg.includes('payment')
  ) {
    // Generate a concise human-readable summary of what they want
    let intentNote = msg.replace(/\n+/g, ' ');
    if (intentNote.length > 95) {
      intentNote = intentNote.slice(0, 92) + '...';
    }
    return {
      category: 'REAL LEAD',
      isRealLead: true,
      note: intentNote,
    };
  }

  return {
    category: 'GENERAL INQUIRY',
    isRealLead: true,
    note: msg.slice(0, 80).replace(/\n+/g, ' '),
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
    const classification = classifyLead(p);

    const leadRecord = {
      id: item.id,
      name,
      email: email || 'N/A',
      phone: p.Phone || p.phone || 'N/A',
      location,
      submissionDate: item.created_at,
      type: item.type,
      message,
      classification,
    };

    if (seen.has(dedupeKey)) {
      duplicateLeads.push(leadRecord);
    } else {
      seen.add(dedupeKey);
      uniqueLeads.push(leadRecord);
    }
  }

  const realLeadsCount = uniqueLeads.filter((l) => l.classification.isRealLead).length;
  const nonLeadsCount = uniqueLeads.filter((l) => !l.classification.isRealLead).length;

  return {
    range,
    type,
    totalRaw: (data || []).length,
    totalUnique: uniqueLeads.length,
    totalDuplicates: duplicateLeads.length,
    realLeadsCount,
    nonLeadsCount,
    uniqueLeads,
    duplicateLeads,
  };
}

function printReport(result) {
  console.log('\n============================================================');
  console.log('  CAPITAL MOTOR CARS - MONTHLY LEAD & INTENT AUDIT');
  console.log('============================================================');
  console.log(`Period:         \x1b[36m${result.range.label}\x1b[0m`);
  console.log(`Type Filter:    \x1b[33m${result.type}\x1b[0m`);
  console.log(`Date Range:     ${result.range.startDate.slice(0, 10)} to ${result.range.endDate.slice(0, 10)}`);
  console.log('------------------------------------------------------------');
  console.log(`Total Raw Submissions:       \x1b[1m${result.totalRaw}\x1b[0m`);
  console.log(`Duplicates Removed:          \x1b[31m${result.totalDuplicates}\x1b[0m`);
  console.log(`Total Unique Contacts:       \x1b[1m${result.totalUnique}\x1b[0m`);
  console.log(`  -> Genuine Customer Leads: \x1b[32m\x1b[1m${result.realLeadsCount}\x1b[0m`);
  console.log(`  -> Solicitors / Bot Spam:  \x1b[33m\x1b[1m${result.nonLeadsCount}\x1b[0m`);
  console.log('============================================================\n');

  if (result.uniqueLeads.length === 0) {
    console.log('No leads found for this period.');
    return;
  }

  console.log('\x1b[1m--- LEAD BREAKDOWN & INTENT NOTES ---\x1b[0m');
  result.uniqueLeads.forEach((lead, i) => {
    const num = String(i + 1).padStart(2, ' ');
    const date = new Date(lead.submissionDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const isReal = lead.classification.isRealLead;
    const catColor = isReal ? '\x1b[32m' : '\x1b[33m';
    const tag = `[${lead.classification.category}]`;

    console.log(`${num}. \x1b[1m${lead.name}\x1b[0m - ${catColor}${tag}\x1b[0m`);
    console.log(`    Date:     ${date} | Phone: ${lead.phone} | Email: ${lead.email}`);
    if (lead.location && lead.location !== 'N/A') {
      console.log(`    Location: ${lead.location}`);
    }
    console.log(`    \x1b[36mNote / Request:\x1b[0m ${lead.classification.note}`);
    console.log('');
  });

  if (result.duplicateLeads.length > 0) {
    console.log('\x1b[31m--- DUPLICATES REMOVED (' + result.totalDuplicates + ') ---\x1b[0m');
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

if (process.argv[1]?.endsWith('get-monthly-leads.mjs')) {
  runCli().catch((err) => {
    console.error('\x1b[31m[Error]\x1b[0m', err.message);
    process.exit(1);
  });
}
