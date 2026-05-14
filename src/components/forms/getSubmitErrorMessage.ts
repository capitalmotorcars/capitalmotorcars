import { clientEnv } from '@/lib/clientEnv';

const isDev = clientEnv.isDev;

type JsonBody = { error?: string; message?: string };

/** User-facing copy when the app cannot reach the backend or upstream is unavailable. */
const UNAVAILABLE =
  "We're having trouble reaching our services. Please try again in a moment.";

const NETWORK_ERROR =
  'Unable to reach our servers. Please check your connection and try again.';

/**
 * Returns a user-facing error message from an API response.
 * In development, also logs response details to the console.
 */
export function getSubmitErrorMessage(res: Response, json: unknown): string {
  const body = json as JsonBody;
  const serverMessage =
    typeof body?.error === 'string'
      ? body.error
      : typeof body?.message === 'string'
        ? body.message
        : null;

  if (isDev) {
    console.warn('[Form submit]', res.status, res.statusText, body);
  }

  if (res.status === 502 || res.status === 503) {
    return serverMessage ?? UNAVAILABLE;
  }

  if (isDev && serverMessage) return serverMessage;

  return serverMessage ?? 'Something went wrong. Please try again.';
}

/** Returns a user-facing error message for a thrown exception (e.g. network error). */
export function getSubmitErrorFromException(e: unknown): string {
  if (e instanceof Error) {
    if (isDev) {
      console.error('[Form submit]', e);
    }
    if (e.message === 'Failed to fetch') {
      return NETWORK_ERROR;
    }
    if (isDev) {
      return e.message;
    }
  }
  return 'Something went wrong. Please try again.';
}
