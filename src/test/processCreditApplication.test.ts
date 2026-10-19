import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { processCreditApplication, validateCreditApplication } from '../../lib/processCreditApplication.mjs';
import { Resend } from 'resend';

vi.mock('resend', () => {
  const sendMock = vi.fn().mockResolvedValue({ data: { id: 'test-email-id-123' }, error: null });
  return {
    Resend: vi.fn().mockImplementation(() => ({
      emails: {
        send: sendMock,
      },
    })),
  };
});

describe('processCreditApplication local testing', () => {
  const originalEnv = { ...process.env };

  const validPersonalPayload = {
    VehicleOrService: 'Credit Application',
    FirstName: 'John',
    LastName: 'Doe',
    Name: 'John Doe',
    Email: 'johndoe@example.com',
    Phone: '(201) 555-0123',
    SSN: '123456789',
    DOB: '01-01-1990',
    Housing: 'own',
    Street: '123 Main St',
    City: 'Hackensack',
    State: 'NJ',
    ZIP: '07601',
    YearsAtResidence: '3',
    MonthlyPayment: '1800',
    HousingPaymentType: 'mortgage',
    Employer: 'Tech Corp',
    Position: 'Developer',
    GrossAnnualIncome: '95000',
    Consultant: 'michael_dai',
    Signature: 'John Doe',
    LegalAgreed: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('validates required fields for credit application', () => {
    const result = validateCreditApplication(validPersonalPayload);
    expect(result.valid).toBe(true);
  });

  it('skips sending email locally when RESEND_API_KEY is not configured', async () => {
    delete process.env.RESEND_API_KEY;

    const res = await processCreditApplication(validPersonalPayload);
    expect(res.status).toBe(200);
    expect(res.json.success).toBe(true);
    expect(res.json.message).toContain('email skipped in local environment');
  });

  it('routes to mdai@capitalmotorcars.com when Consultant is michael_dai with Resend active', async () => {
    process.env.RESEND_API_KEY = 're_test_dummy_key';
    delete process.env.TEST_EMAIL_OVERRIDE;

    const res = await processCreditApplication(validPersonalPayload);
    expect(res.status).toBe(200);
    expect(res.json.success).toBe(true);
    expect(res.json.id).toBe('test-email-id-123');

    const resendInstance = vi.mocked(Resend).mock.results[0].value;
    expect(resendInstance.emails.send).toHaveBeenCalledTimes(1);

    const sendCallArgs = resendInstance.emails.send.mock.calls[0][0];
    expect(sendCallArgs.to).toBe('mdai@capitalmotorcars.com');
    expect(sendCallArgs.cc).toEqual([
      'kai@capitalmotorcars.com',
      'sales@capitalmotorcars.com',
      'henry@capitalmotorcars.com',
      'camico@capitalmotorcars.com',
    ]);
    expect(sendCallArgs.subject).toBe('New Credit Application - John Doe');
  });

  it('routes business credit application to mdai@capitalmotorcars.com when michael_dai is selected', async () => {
    process.env.RESEND_API_KEY = 're_test_dummy_key';
    delete process.env.TEST_EMAIL_OVERRIDE;

    const validBusinessPayload = {
      VehicleOrService: 'Business Credit Application',
      BusinessName: 'Acme Logistics LLC',
      Email: 'contact@acmelogistics.com',
      BusinessPhone: '(201) 555-9876',
      PersonalGuarantorName: 'Jane Smith',
      PersonalGuarantorSSN: '987654321',
      GrossAnnualIncome: '350000',
      Consultant: 'michael_dai',
      Signature: 'Jane Smith',
      LegalAgreed: true,
    };

    const res = await processCreditApplication(validBusinessPayload);
    expect(res.status).toBe(200);
    expect(res.json.success).toBe(true);

    const resendInstance = vi.mocked(Resend).mock.results[0].value;
    const sendCallArgs = resendInstance.emails.send.mock.calls[0][0];
    expect(sendCallArgs.to).toBe('mdai@capitalmotorcars.com');
    expect(sendCallArgs.subject).toBe('New Business Credit Application - Acme Logistics LLC');
  });
});
