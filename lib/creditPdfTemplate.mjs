/**
 * Credit application PDF HTML templates (personal + business).
 * Ported from the Make.com PDF.co modules so the same printable PDF is
 * produced server-side. All values are HTML-escaped to keep user input from
 * breaking the layout.
 */
import { escapeHtml } from './sendEmailSecurity.mjs';

const BUSINESS_TYPE = 'Business Credit Application';

function doc(html) {
  const style = `
    body { margin: 0; }
    /* Keep a section header with its content and avoid splitting a block across pages. */
    h3, h4 { break-after: avoid; page-break-after: avoid; }
    p { break-inside: avoid; page-break-inside: avoid; }
  `;
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${style}</style></head><body>${html}</body></html>`;
}

/** Grey section header bar, matching the original Make layout. */
function bar(title) {
  return `<h3 style="background-color:#f4f4f4;padding:5px;">${escapeHtml(title)}</h3>`;
}

/** Inline "<b>Label:</b> value<br>" line; skipped when value empty. */
function line(label, value) {
  if (value == null || value === '') return '';
  return `<b>${escapeHtml(label)}:</b> ${escapeHtml(value)}<br>`;
}

/** Render a boolean-ish agreement flag as Yes/No (blank if undefined). */
function yesNo(v) {
  if (v === true || v === 'true' || v === 'Yes' || v === 'yes') return 'Yes';
  if (v === false || v === 'false' || v === 'No' || v === 'no') return 'No';
  return '';
}

/** Uploaded document filenames present in the payload. */
function uploadedDocs(p) {
  return [p.Document1FileName, p.Document2FileName].filter(Boolean);
}

function buildBusinessHtml(p) {
  const body = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#333;padding:20px;">
      <h2 style="color:#1a365d;border-bottom:2px solid #1a365d;">🏛 BUSINESS INQUIRY - NEW APPLICATION</h2>

      <p>Hi Team,<br>A new credit application has been submitted through the portal. Please review the details below:</p>

      ${bar('1. BUSINESS INFORMATION')}
      <p>
        ${line('Business Name', p.BusinessName)}
        ${line('Tax ID Number', p.TaxIDNumber)}
        ${line('Business Type', p.BusinessType)}
        ${line('Email', p.EmailAddress || p.Email)}
        ${line('Phone', p.BusinessPhone)}
        ${line('Address', p.BusinessAddress)}
        ${line('Gross Annual Income', p.GrossAnnualIncome ? '$' + p.GrossAnnualIncome : '')}
        ${line('Year of Establishment', p.YearOfEstablishment)}
      </p>

      ${bar('2. GUARANTOR INFORMATION')}
      <p>
        ${line('Name', p.PersonalGuarantorName)}
        ${line('SSN', p.PersonalGuarantorSSN)}
        ${line('Date of Birth', p.PersonalGuarantorDOB)}
        ${line('Email', p.PersonalGuarantorEmail)}
        ${line('Phone', p.PersonalGuarantorPhone)}
        ${line('Address', p.PersonalGuarantorAddress)}
        ${line('Years at Residence', p.PersonalGuarantorYearsAtResidence)}
        ${line('Own or Rent', p.PersonalGuarantorOwnOrRent)}
        ${line('Monthly Payment', p.PersonalGuarantorMonthlyPayment ? '$' + p.PersonalGuarantorMonthlyPayment : '')}
      </p>

      ${bar('3. GUARANTOR EMPLOYMENT')}
      <p>
        ${line('Employer', p.PersonalGuarantorEmployer)}
        ${line('Position', p.PersonalGuarantorPosition)}
        ${line('Business Address', p.PersonalGuarantorEmployerAddress)}
        ${line('Employer Phone', p.PersonalGuarantorEmployerPhone)}
        ${line('Length of Employment', p.PersonalGuarantorYearsAtEmployment)}
        ${line('Gross Annual Income', p.PersonalGuarantorGrossAnnualIncome ? '$' + p.PersonalGuarantorGrossAnnualIncome : '')}
      </p>

      ${bar('4. BANK INFORMATION')}
      <p>
        ${line('Bank Name', p.BankName)}
        ${line('Bank Phone', p.BankPhone)}
        ${line('Branch Address', p.BankBranchAddress)}
      </p>

      ${uploadedDocs(p).length ? `${bar('UPLOADED DOCUMENTS')}<p>${uploadedDocs(p).map((n) => line('File', n)).join('')}</p>` : ''}

      ${bar('AUTHORIZATION & DETAILS')}
      <p>
        ${line('Consultant', p.Consultant)}
        ${line('Authorization Agreed', yesNo(p.LegalAgreed))}
        ${line('Signature', p.Signature)}
        ${line('Signature Date', p.SignatureDate)}
      </p>

      <hr>
      <p style="font-size:12px;color:#777;">Submission Date: ${escapeHtml(new Date().toISOString())}</p>
    </div>`;
  return doc(body);
}

/** Smaller sub-header (used inside co-applicant). */
function subBar(title) {
  return `<h4 style="margin-bottom:0;">${escapeHtml(title)}</h4>`;
}

/** Header + paragraph of lines; returns '' when every line is empty (so the header is hidden). */
function block(header, lines, pStyle = '') {
  const bodyLines = lines.filter(Boolean).join('\n        ');
  if (!bodyLines) return '';
  return `${header}\n      <p${pStyle ? ` style="${pStyle}"` : ''}>\n        ${bodyLines}\n      </p>`;
}

function buildCoApplicant(p) {
  const info = block(bar('4. CO-APPLICANT INFORMATION'), [
    line('Full Name', [p.CoFirstName, p.CoLastName].filter(Boolean).join(' ')),
    line('SSN', p.CoSSN),
    line('Date of Birth', p.CoDOB),
    line('Housing', p.CoHousing),
    line('Phone', p.CoPhone),
    line('Email', p.CoEmail),
  ]);
  const address = block(subBar('Address'), [
    line('Street', p.CoStreet),
    line('City/State/Zip', [p.CoCity, p.CoState, p.CoZIP].filter(Boolean).join(', ')),
    line('Years at Residence', p.CoYearsAtResidence),
    line('Monthly Payment', p.CoMonthlyPayment ? '$' + p.CoMonthlyPayment : ''),
    line('Housing Payment Type', p.CoHousingPaymentType),
  ], 'margin-top:5px;');
  const employment = block(subBar('Employment & Income'), [
    line('Employer', p.CoEmployer),
    line('Employer Phone', p.CoEmploymentPhone),
    line('Position', p.CoPosition),
    line('Employer Address', [p.CoEmploymentStreet, p.CoEmploymentCity, p.CoEmploymentState, p.CoEmploymentZip].filter(Boolean).join(', ')),
    line('Years at Job', p.CoYearsAtJob),
    line('Gross Annual Income', p.CoGrossAnnualIncome ? '$' + p.CoGrossAnnualIncome : ''),
    line('Other Annual Income', p.CoOtherAnnualIncome ? '$' + p.CoOtherAnnualIncome : ''),
    line('Organization', p.CoOrganizationAffiliation),
  ], 'margin-top:5px;');

  // Show the co-applicant section only if it was enabled AND has any data.
  if (!p.CoApplicantEnabled) return '';
  const parts = [info, address, employment].filter(Boolean);
  return parts.length ? parts.join('\n      ') : '';
}

function buildPersonalHtml(p) {
  const coApplicant = buildCoApplicant(p);

  const docs = uploadedDocs(p);
  const body = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#333;padding:20px;">
      <h2 style="color:#1a365d;border-bottom:2px solid #1a365d;">🏦 NEW CREDIT APPLICATION: CAPITAL MOTOR CARS</h2>

      <p>Hi Team,<br>A new credit application has been submitted through the portal. Please review the details below:</p>

      ${bar('1. APPLICANT INFORMATION')}
      <p>
        ${line('Full Name', p.Name || [p.FirstName, p.LastName].filter(Boolean).join(' '))}
        ${line('SSN', p.SSN)}
        ${line('Date of Birth', p.DOB)}
        ${line('Housing', p.Housing)}
        ${line('Phone', p.Phone)}
        ${line('Email', p.Email)}
      </p>

      ${bar('2. RESIDENTIAL ADDRESS')}
      <p>
        ${line('Street Address', p.Street)}
        ${line('City/State/Zip', [p.City, p.State, p.ZIP].filter(Boolean).join(', '))}
        ${line('Monthly Payment', p.MonthlyPayment ? '$' + p.MonthlyPayment : '')}
        ${line('Housing Payment Type', p.HousingPaymentType)}
        ${line('Years at Address', p.YearsAtResidence)}
      </p>

      ${bar('3. EMPLOYMENT & INCOME')}
      <p>
        ${line('Employer', p.Employer)}
        ${line('Employment Address', p.EmploymentStreet)}
        ${line('Employment Address', [p.EmploymentCity, p.EmploymentState, p.EmploymentZip].filter(Boolean).join(', '))}
        ${line('Position', p.Position)}
        ${line('Years at Job', p.YearsAtJob)}
        ${line('Employment Phone', p.EmploymentPhone)}
        ${line('Gross Annual Income', p.GrossAnnualIncome ? '$' + p.GrossAnnualIncome : '')}
        ${line('Other Annual Income', p.OtherAnnualIncome ? '$' + p.OtherAnnualIncome : '')}
        ${line('Organization', p.OrganizationAffiliation)}
      </p>

      ${coApplicant}

      ${docs.length ? `${bar('UPLOADED DOCUMENTS')}<p>${docs.map((n) => line('File', n)).join('')}</p>` : ''}

      ${bar('AUTHORIZATION & DETAILS')}
      <p>
        ${line('Consultant', p.Consultant)}
        ${line('Authorization Agreed', yesNo(p.LegalAgreed))}
        ${line('Signature', p.Signature)}
        ${line('Signature Date', p.SignatureDate)}
      </p>

      <hr>
      <p style="font-size:12px;color:#777;">Submission Date: ${escapeHtml(new Date().toISOString())}</p>
    </div>`;
  return doc(body);
}

/**
 * @param {Record<string, any>} payload  Submitted credit application payload.
 * @returns {{ html: string, fileName: string, isBusiness: boolean }}
 */
export function buildCreditPdf(payload) {
  const isBusiness = payload?.VehicleOrService === BUSINESS_TYPE;
  const html = isBusiness ? buildBusinessHtml(payload) : buildPersonalHtml(payload);
  const safeName = String(payload?.Name || payload?.BusinessName || 'Applicant')
    .replace(/[^a-z0-9]+/gi, '_')
    .replace(/^_+|_+$/g, '') || 'Applicant';
  return { html, fileName: `Application_${safeName}.pdf`, isBusiness };
}
