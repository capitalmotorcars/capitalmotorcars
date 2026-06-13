const isDev = import.meta.env.DEV;

type LogMeta = Record<string, unknown>;

function fmt(ms: number) {
  return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(2)}s`;
}

export const apiLog = {
  start(label: string, meta?: LogMeta): number {
    const t = performance.now();
    if (isDev) console.log(`%c[API] ▶ ${label}`, 'color:#60a5fa;font-weight:600', meta ?? '');
    return t;
  },
  success(label: string, t: number, meta?: LogMeta): void {
    const ms = Math.round(performance.now() - t);
    if (isDev) console.log(`%c[API] ✓ ${label} ${fmt(ms)}`, 'color:#34d399;font-weight:600', meta ?? '');
  },
  error(label: string, t: number, err: unknown, meta?: LogMeta): void {
    const ms = Math.round(performance.now() - t);
    console.error(`[API] ✗ ${label} ${fmt(ms)}`, err, meta ?? '');
  },
};
