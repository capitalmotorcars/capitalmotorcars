/**
 * Same-origin lead endpoint paths. The server validates, persists to Supabase,
 * and emails via Resend (credit also builds a PDF; contact also forwards to Kora).
 */
export const WEBHOOK_CONTACT_PATH = '/api/webhooks/contact';
export const WEBHOOK_CREDIT_APPLICATION_PATH = '/api/webhooks/credit';
export const WEBHOOK_TRADE_IN_PATH = '/api/webhooks/trade-in';
