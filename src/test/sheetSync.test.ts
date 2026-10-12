import { describe, it, expect, vi } from 'vitest';
import { extractFirstName, normalizeEmail, extractLeadsForSheet, syncLeadToSheet } from '../../lib/sheetSync.mjs';

describe('sheetSync', () => {
  describe('extractFirstName', () => {
    it('extracts first name from standard "First Last"', () => {
      expect(extractFirstName('Michael Scott')).toBe('Michael');
    });

    it('extracts first name from single name', () => {
      expect(extractFirstName('Dwight')).toBe('Dwight');
    });

    it('extracts first name with leading/trailing spaces', () => {
      expect(extractFirstName('  Jim Halpert  ')).toBe('Jim');
    });

    it('extracts first name from "Last, First"', () => {
      expect(extractFirstName('Beesly, Pam')).toBe('Pam');
    });

    it('handles empty or non-string input safely', () => {
      expect(extractFirstName('')).toBe('');
      expect(extractFirstName(null)).toBe('');
      expect(extractFirstName(undefined)).toBe('');
    });
  });

  describe('normalizeEmail', () => {
    it('trims and lowercases emails', () => {
      expect(normalizeEmail('  John.Doe@EXAMPLE.COM ')).toBe('john.doe@example.com');
    });
  });

  describe('extractLeadsForSheet', () => {
    it('extracts personal credit application with single applicant', () => {
      const payload = {
        VehicleOrService: 'Credit Application',
        FirstName: 'Tony',
        LastName: 'Stark',
        Email: 'TONY@STARK.COM',
        Phone: '555-0100',
      };
      const leads = extractLeadsForSheet('credit', payload);
      expect(leads).toHaveLength(1);
      expect(leads[0].firstName).toBe('Tony');
      expect(leads[0].lastName).toBe('Stark');
      expect(leads[0].email).toBe('tony@stark.com');
      expect(leads[0].submissionType).toBe('Personal Credit Application');
    });

    it('extracts only main applicant from personal credit application', () => {
      const payload = {
        VehicleOrService: 'Credit Application',
        FirstName: 'Peter',
        LastName: 'Parker',
        Email: 'peter@dailybugle.com',
        CoApplicantEnabled: true,
        CoFirstName: 'Mary',
        CoLastName: 'Jane',
        CoEmail: 'mj@watson.com',
      };
      const leads = extractLeadsForSheet('credit', payload);
      expect(leads).toHaveLength(1);
      expect(leads[0].firstName).toBe('Peter');
      expect(leads[0].lastName).toBe('Parker');
      expect(leads[0].email).toBe('peter@dailybugle.com');
      expect(leads[0].submissionType).toBe('Personal Credit Application');
    });

    it('keeps full name in firstName when lastName is not provided', () => {
      const payload = {
        VehicleOrService: 'Credit Application',
        Name: 'Natasha Romanoff',
        Email: 'natasha@avengers.com',
      };
      const leads = extractLeadsForSheet('credit', payload);
      expect(leads).toHaveLength(1);
      expect(leads[0].firstName).toBe('Natasha Romanoff');
      expect(leads[0].lastName).toBe('');
      expect(leads[0].email).toBe('natasha@avengers.com');
    });

    it('extracts business credit application with personal guarantor', () => {
      const payload = {
        VehicleOrService: 'Business Credit Application',
        BusinessName: 'Wayne Enterprises',
        Email: 'contact@wayneenterprises.com',
        PersonalGuarantorName: 'Bruce Wayne',
        PersonalGuarantorEmail: 'bruce@wayne.com',
      };
      const leads = extractLeadsForSheet('credit', payload);
      expect(leads).toHaveLength(1);
      expect(leads[0].firstName).toBe('Bruce Wayne');
      expect(leads[0].lastName).toBe('');
      expect(leads[0].email).toBe('bruce@wayne.com');
      expect(leads[0].submissionType).toBe('Business Credit Application');
    });

    it('extracts trade-in evaluation (PDF lead)', () => {
      const payload = {
        Type: 'Trade-In Value',
        Name: 'Clark Kent',
        Email: 'clark@dailyplanet.com',
        VIN: '1HGCR2F83HA123456',
      };
      const leads = extractLeadsForSheet('trade-in', payload);
      expect(leads).toHaveLength(1);
      expect(leads[0].firstName).toBe('Clark Kent');
      expect(leads[0].lastName).toBe('');
      expect(leads[0].email).toBe('clark@dailyplanet.com');
      expect(leads[0].submissionType).toBe('Trade-In Valuation (PDF)');
    });

    it('extracts contact lead only when SYNC_CONTACT_LEADS or SYNC_ALL_LEADS is enabled', () => {
      delete process.env.SYNC_CONTACT_LEADS;
      delete process.env.SYNC_ALL_LEADS;
      expect(extractLeadsForSheet('contact', { Name: 'Barry Allen', Email: 'barry@centralcity.com' })).toEqual([]);

      process.env.SYNC_CONTACT_LEADS = 'true';
      const leads = extractLeadsForSheet('contact', { Name: 'Barry Allen', Email: 'barry@centralcity.com' });
      expect(leads).toHaveLength(1);
      expect(leads[0].firstName).toBe('Barry Allen');
      expect(leads[0].lastName).toBe('');
      delete process.env.SYNC_CONTACT_LEADS;
    });
  });

  describe('syncLeadToSheet', () => {
    it('returns success safely when webhook URL is not set', async () => {
      process.env.GOOGLE_SHEET_WEBHOOK_URL = '';
      const res = await syncLeadToSheet('credit', {
        FirstName: 'Bruce',
        Email: 'bruce@test.com',
      });
      expect(res.success).toBe(true);
      expect(res.syncedCount).toBe(0);
    });

    it('sends lead data to webhook when GOOGLE_SHEET_WEBHOOK_URL is set', async () => {
      process.env.GOOGLE_SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/test/exec';
      const originalFetch = globalThis.fetch;
      let capturedBody: any = null;

      globalThis.fetch = vi.fn().mockImplementation(async (url, init) => {
        capturedBody = JSON.parse(init.body);
        return {
          ok: true,
          status: 200,
          text: async () => '{"result":"success"}',
        };
      }) as any;

      try {
        const res = await syncLeadToSheet('credit', {
          FirstName: 'Diana',
          LastName: 'Prince',
          Email: 'diana@themyscira.com',
        });

        expect(res.success).toBe(true);
        expect(res.syncedCount).toBe(1);
        expect(capturedBody).toBeDefined();
        expect(capturedBody.firstName).toBe('Diana');
        expect(capturedBody.lastName).toBe('Prince');
        expect(capturedBody.email).toBe('diana@themyscira.com');
        expect(capturedBody['First Name']).toBe('Diana');
        expect(capturedBody['Last Name']).toBe('Prince');
        expect(capturedBody['Email']).toBe('diana@themyscira.com');
      } finally {
        globalThis.fetch = originalFetch;
        delete process.env.GOOGLE_SHEET_WEBHOOK_URL;
      }
    });

    it('handles webhook fetch errors gracefully without throwing', async () => {
      process.env.GOOGLE_SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/test/exec';
      const originalFetch = globalThis.fetch;

      globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error')) as any;

      try {
        const res = await syncLeadToSheet('credit', {
          FirstName: 'Arthur',
          LastName: 'Curry',
          Email: 'arthur@atlantis.com',
        });

        expect(res.success).toBe(false);
        expect(res.syncedCount).toBe(0);
      } finally {
        globalThis.fetch = originalFetch;
        delete process.env.GOOGLE_SHEET_WEBHOOK_URL;
      }
    });
  });
});

