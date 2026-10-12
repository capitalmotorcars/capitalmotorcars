/**
 * Google Sheet and Excel Lead Synchronization Module.
 *
 * Automatically captures First Name and Email for credit applications
 * and PDF-generating forms submitted on the Capital Motor Cars website,
 * and syncs them to a configured Google Sheet (or Excel Webhook).
 */
import fs from 'node:fs';
import path from 'node:path';
import * as XLSX from 'xlsx';

const xlsxLib = XLSX.readFile ? XLSX : (XLSX.default || XLSX);


/**
 * Extracts first name from full name or single string.
 * @param {string | unknown} nameStr
 * @returns {string}
 */
export function extractFirstName(nameStr) {
  if (!nameStr || typeof nameStr !== 'string') return '';
  const trimmed = nameStr.trim();
  if (!trimmed) return '';
  // Split on spaces or commas (e.g. "Doe, John" or "John Doe")
  if (trimmed.includes(',')) {
    const parts = trimmed.split(',').map((p) => p.trim()).filter(Boolean);
    if (parts.length > 1) {
      return parts[1].split(/\s+/)[0] || parts[0];
    }
  }
  return trimmed.split(/\s+/)[0] || '';
}

/**
 * Extracts last name from full name or single string.
 * @param {string | unknown} nameStr
 * @returns {string}
 */
export function extractLastName(nameStr) {
  if (!nameStr || typeof nameStr !== 'string') return '';
  const trimmed = nameStr.trim();
  if (!trimmed) return '';
  // "Doe, John" -> "Doe"
  if (trimmed.includes(',')) {
    const parts = trimmed.split(',').map((p) => p.trim()).filter(Boolean);
    return parts[0] || '';
  }
  // "John Doe" or "John Michael Doe" -> "Michael Doe" or "Doe"
  const parts = trimmed.split(/\s+/);
  if (parts.length > 1) {
    return parts.slice(1).join(' ');
  }
  return '';
}


/**
 * Formats a Date or timestamp string into clean "MM/DD/YYYY, hh:mm AM/PM" format.
 * @param {Date | string | unknown} dateInput
 * @returns {string}
 */
export function formatDateTime(dateInput) {
  if (!dateInput) return '';
  const d = dateInput instanceof Date ? dateInput : new Date(dateInput);
  if (isNaN(d.getTime())) return String(dateInput);

  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Normalizes email address.
 * @param {string | unknown} emailStr
 * @returns {string}
 */
export function normalizeEmail(emailStr) {
  if (!emailStr || typeof emailStr !== 'string') return '';
  return emailStr.trim().toLowerCase();
}

/**
 * Extract clean first name, last name, and email list from any form submission payload.
 *
 * @param {string} type - 'credit' | 'trade-in' | 'contact'
 * @param {Record<string, any>} payload
 * @returns {Array<{
 *   firstName: string,
 *   lastName: string,
 *   email: string,
 *   submissionType: string,
 *   submittedAt: string,
 *   fullName?: string
 * }>}
 */
export function extractLeadsForSheet(type, payload) {
  if (!payload || typeof payload !== 'object') return [];

  const leads = [];
  const submittedAt = formatDateTime(payload.SignatureDate || payload.submittedAt || new Date());

  const isBusinessCredit =
    payload.VehicleOrService === 'Business Credit Application' ||
    Boolean(payload.BusinessName && !payload.FirstName && !payload.firstName);

  if (type === 'credit') {
    if (isBusinessCredit) {
      // 1. Business Credit Application:
      const guarantorFirstName = (
        (typeof payload.PersonalGuarantorFirstName === 'string' && payload.PersonalGuarantorFirstName.trim()) ||
        (typeof payload.PersonalGuarantorName === 'string' && payload.PersonalGuarantorName.trim()) ||
        (typeof payload.BusinessName === 'string' && payload.BusinessName.trim()) ||
        ''
      );
      const guarantorLastName = (
        (typeof payload.PersonalGuarantorLastName === 'string' && payload.PersonalGuarantorLastName.trim()) ||
        ''
      );
      const email = normalizeEmail(payload.PersonalGuarantorEmail || payload.Email || payload.EmailAddress || payload.email);

      if (guarantorFirstName || guarantorLastName || email) {
        leads.push({
          firstName: guarantorFirstName,
          lastName: guarantorLastName,
          email,
          fullName: [guarantorFirstName, guarantorLastName].filter(Boolean).join(' ') || guarantorFirstName,
          submissionType: 'Business Credit Application',
          submittedAt,
        });
      }
    } else {
      // 2. Personal Credit Application:
      // Form sends FirstName and LastName directly. If LastName is not provided, keep name in firstName without complicated extraction.
      const firstName = (
        (typeof payload.FirstName === 'string' && payload.FirstName.trim()) ||
        (typeof payload.firstName === 'string' && payload.firstName.trim()) ||
        (typeof payload.Name === 'string' && payload.Name.trim()) ||
        (typeof payload.FullName === 'string' && payload.FullName.trim()) ||
        ''
      );

      const lastName = (
        (typeof payload.LastName === 'string' && payload.LastName.trim()) ||
        (typeof payload.lastName === 'string' && payload.lastName.trim()) ||
        ''
      );

      const email = normalizeEmail(payload.Email || payload.email);
      const fullName = [firstName, lastName].filter(Boolean).join(' ') || (typeof payload.Name === 'string' ? payload.Name.trim() : '');

      if (firstName || lastName || email) {
        leads.push({
          firstName,
          lastName,
          email,
          fullName,
          submissionType: 'Personal Credit Application',
          submittedAt,
        });
      }
    }
  } else if (type === 'trade-in') {
    // 3. Trade-in valuation: if last name is not present, simply use firstName
    const firstName = (
      (typeof payload.FirstName === 'string' && payload.FirstName.trim()) ||
      (typeof payload.firstName === 'string' && payload.firstName.trim()) ||
      (typeof payload.Name === 'string' && payload.Name.trim()) ||
      (typeof payload.FullName === 'string' && payload.FullName.trim()) ||
      ''
    );
    const lastName = (
      (typeof payload.LastName === 'string' && payload.LastName.trim()) ||
      (typeof payload.lastName === 'string' && payload.lastName.trim()) ||
      ''
    );
    const email = normalizeEmail(payload.Email || payload.email);

    if (firstName || lastName || email) {
      leads.push({
        firstName,
        lastName,
        email,
        fullName: [firstName, lastName].filter(Boolean).join(' ') || firstName,
        submissionType: 'Trade-In Valuation (PDF)',
        submittedAt,
      });
    }
  } else if (type === 'contact') {
    // 4. Contact form lead:
    const shouldSyncContact =
      process.env.SYNC_ALL_LEADS === 'true' ||
      process.env.SYNC_CONTACT_LEADS === 'true';

    if (shouldSyncContact) {
      const firstName = (
        (typeof payload.FirstName === 'string' && payload.FirstName.trim()) ||
        (typeof payload.firstName === 'string' && payload.firstName.trim()) ||
        (typeof payload.Name === 'string' && payload.Name.trim()) ||
        (typeof payload.FullName === 'string' && payload.FullName.trim()) ||
        ''
      );
      const lastName = (
        (typeof payload.LastName === 'string' && payload.LastName.trim()) ||
        (typeof payload.lastName === 'string' && payload.lastName.trim()) ||
        ''
      );
      const email = normalizeEmail(payload.Email || payload.email);

      if (firstName || lastName || email) {
        leads.push({
          firstName,
          lastName,
          email,
          fullName: [firstName, lastName].filter(Boolean).join(' ') || firstName,
          submissionType: 'Contact Lead',
          submittedAt,
        });
      }
    }
  }

  return leads;
}

/**
 * Appends new leads directly to local credit_applications.xlsx and credit_applications.csv
 * if running in an environment with local filesystem write access (e.g. dev/local server).
 * Safely ignores if in a read-only environment like Vercel.
 *
 * @param {Array<{ firstName: string, lastName: string, email: string, submissionType: string, submittedAt: string }>} leads
 */
export function appendToLocalExcelFiles(leads) {
  if (!leads || !leads.length) return;

  try {
    const rootDir = process.cwd();
    const csvPath = path.join(rootDir, 'credit_applications.csv');
    const xlsxPath = path.join(rootDir, 'credit_applications.xlsx');

    // 1. Append to CSV
    if (fs.existsSync(csvPath)) {
      const csvLines = leads.map((l) => {
        const cleanFirst = `"${(l.firstName || '').replace(/"/g, '""')}"`;
        const cleanLast = `"${(l.lastName || '').replace(/"/g, '""')}"`;
        const cleanEmail = `"${(l.email || '').replace(/"/g, '""')}"`;
        const cleanType = `"${(l.submissionType || '').replace(/"/g, '""')}"`;
        const cleanDate = `"${(formatDateTime(l.submittedAt) || formatDateTime(new Date())).replace(/"/g, '""')}"`;
        return `${cleanFirst},${cleanLast},${cleanEmail},${cleanType},${cleanDate}`;
      });
      fs.appendFileSync(csvPath, csvLines.join('\r\n') + '\r\n', 'utf-8');
    }

    // 2. Append to XLSX
    if (fs.existsSync(xlsxPath)) {
      try {
        const workbook = xlsxLib.readFile(xlsxPath);
        const sheetName = workbook.SheetNames[0] || 'Credit Applications';
        const worksheet = workbook.Sheets[sheetName];
        const existingRows = xlsxLib.utils.sheet_to_json(worksheet);

        const newRows = leads.map((l) => ({
          'First Name': l.firstName || '',
          'Last Name': l.lastName || '',
          'Email': l.email || '',
          'Submission Type': l.submissionType || '',
          'Date Submitted': formatDateTime(l.submittedAt) || formatDateTime(new Date()),
        }));

        const updatedRows = [...existingRows, ...newRows];
        const updatedSheet = xlsxLib.utils.json_to_sheet(updatedRows, {
          header: ['First Name', 'Last Name', 'Email', 'Submission Type', 'Date Submitted'],
        });

        updatedSheet['!cols'] = [
          { wch: 20 },
          { wch: 20 },
          { wch: 38 },
          { wch: 38 },
          { wch: 30 },
        ];

        workbook.Sheets[sheetName] = updatedSheet;
        xlsxLib.writeFile(workbook, xlsxPath);
        console.log(`[SheetSync] Appended ${leads.length} lead(s) to local credit_applications.xlsx`);
      } catch (xlsxErr) {
        console.warn('[SheetSync] Could not append to local .xlsx:', xlsxErr.message);
      }
    }

  } catch (err) {
    console.debug('[SheetSync] Local file append skipped (filesystem may be read-only):', err.message);
  }
}

/** Default Google Sheet Webhook URL */
export const GOOGLE_SHEET_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbxFA9CLFPC3n0idkVOWBCKbZNs9JZcwzTI6kbpzotAPVBAJFOcigLJ0BZAlB3QdVok/exec';

/**
 * Synchronize extracted leads to the configured Google Sheet / Excel Webhook.
 * Fails safely without throwing, so form submission and email processing
 * are never disrupted.
 *
 * @param {string} type - 'credit' | 'trade-in' | 'contact'
 * @param {Record<string, any>} payload
 * @returns {Promise<{ success: boolean, syncedCount: number, error?: string }>}
 */
export async function syncLeadToSheet(type, payload, webhookOverride) {
  const webhookUrl =
    webhookOverride !== undefined
      ? webhookOverride
      : (process.env.GOOGLE_SHEET_WEBHOOK_URL !== undefined
          ? process.env.GOOGLE_SHEET_WEBHOOK_URL.trim()
          : (GOOGLE_SHEET_WEBHOOK_URL || process.env.EXCEL_WEBHOOK_URL?.trim()));

  const leads = extractLeadsForSheet(type, payload);
  if (!leads.length) {
    return { success: true, syncedCount: 0 };
  }

  // Appends to local Excel (.xlsx and .csv) files if they exist on disk
  appendToLocalExcelFiles(leads);

  if (!webhookUrl) {
    console.log(
      `[SheetSync] GOOGLE_SHEET_WEBHOOK_URL not configured. Captured ${leads.length} lead(s) for sheet storage:`,
      leads.map((l) => `${l.firstName} ${l.lastName} <${l.email}>`).join(', ')
    );
    return { success: true, syncedCount: 0 };
  }

  let syncedCount = 0;
  for (const lead of leads) {
    try {
      const payloadToSend = {
        firstName: lead.firstName,
        lastName: lead.lastName,
        email: lead.email,
        "First Name": lead.firstName,
        "Last Name": lead.lastName,
        "Email": lead.email,
        submissionType: lead.submissionType,
        "Submission Type": lead.submissionType,
        fullName: lead.fullName || [lead.firstName, lead.lastName].filter(Boolean).join(' '),
        submittedAt: lead.submittedAt,
        "Submitted At": lead.submittedAt,
        date: lead.submittedAt,
        "Date": lead.submittedAt,
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const resp = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadToSend),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (resp.ok) {
        syncedCount++;
        console.log(`[SheetSync] Synced to sheet: ${lead.firstName} ${lead.lastName} (${lead.email})`);
      } else {
        const text = await resp.text().catch(() => '');
        console.warn(`[SheetSync] Webhook response status ${resp.status}: ${text}`);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`[SheetSync] Error syncing lead ${lead.email} to sheet:`, msg);
    }
  }

  return { success: syncedCount > 0, syncedCount };
}
