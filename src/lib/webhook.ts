const WEBHOOK_URL_DEFAULT = 'https://hook.eu1.make.com/zfw7p0asc4teuk2znyk1pbbg18fv7q7b';

export const WEBHOOK_URL =
  (import.meta as unknown as { env: { VITE_WEBHOOK_URL?: string } }).env?.VITE_WEBHOOK_URL ??
  WEBHOOK_URL_DEFAULT;

export const WEBHOOK_URL_CREDIT_APPLICATION = 'https://hook.eu1.make.com/jmxgdt9co9e5403vopzm8witym4kg5mv';

const WEBHOOK_TRADE_IN_DEFAULT = 'https://hook.eu1.make.com/zfw7p0asc4teuk2znyk1pbbg18fv7q7b';
export const WEBHOOK_URL_TRADE_IN =
  (import.meta as unknown as { env: { VITE_WEBHOOK_URL_TRADE_IN?: string } }).env?.VITE_WEBHOOK_URL_TRADE_IN ??
  WEBHOOK_TRADE_IN_DEFAULT;

