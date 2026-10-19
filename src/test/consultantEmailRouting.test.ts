import { describe, it, expect } from 'vitest';
import { CONSULTANT_OPTIONS, CONSULTANT_EMAIL_MAP as FRONTEND_MAP, getConsultantEmail } from '../lib/creditConstants';
import { CONSULTANT_EMAIL_MAP as BACKEND_MAP, resolveConsultantRecipients } from '../../lib/sendEmailSecurity.mjs';

describe('Consultant Email Routing', () => {
  it('resolves michael_dai to mdai@capitalmotorcars.com in frontend map and helper', () => {
    expect(FRONTEND_MAP['michael_dai']).toBe('mdai@capitalmotorcars.com');
    expect(getConsultantEmail('michael_dai')).toBe('mdai@capitalmotorcars.com');
  });

  it('resolves michael_dai to mdai@capitalmotorcars.com in backend security map', () => {
    expect(BACKEND_MAP['michael_dai']).toBe('mdai@capitalmotorcars.com');
  });

  it('resolves recipient list to mdai@capitalmotorcars.com when Consultant is michael_dai', () => {
    const recipients = resolveConsultantRecipients({ Consultant: 'michael_dai' });
    expect(recipients).toEqual(['mdai@capitalmotorcars.com']);
  });

  it('resolves recipient list to mdai@capitalmotorcars.com when SalesAgent is michael_dai', () => {
    const recipients = resolveConsultantRecipients({ SalesAgent: 'michael_dai' });
    expect(recipients).toEqual(['mdai@capitalmotorcars.com']);
  });

  it('ensures every consultant option from frontend has a backend email mapping', () => {
    const validOptions = CONSULTANT_OPTIONS.filter((opt) => opt.value !== '');
    for (const opt of validOptions) {
      expect(
        BACKEND_MAP[opt.value],
        `Missing backend email mapping for consultant "${opt.value}" (${opt.label})`
      ).toBeDefined();
    }
  });
});
