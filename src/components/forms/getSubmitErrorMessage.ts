const isDev = import.meta.env.DEV;

type JsonBody = { error?: string; message?: string };

/**
 * Returns a user-facing error message from an API response.
 * In development: shows server error text, logs to console, and suggests starting API for 502/503.
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
    if (res.status === 502 || res.status === 503) {
      return serverMessage ?? 'API server not reachable. Run `npm run dev` to start the API.';
    }
    if (serverMessage) return serverMessage;
  }

  return serverMessage ?? 'Something went wrong. Please try again.';
}

/**
 * Returns a user-facing error message for a thrown exception (e.g. network error).
 */
export function getSubmitErrorFromException(e: unknown): string {
  if (isDev && e instanceof Error) {
    console.error('[Form submit]', e);
    if (e.message === 'Failed to fetch') {
      return 'Cannot reach server. Run `npm run dev` so both the app and API are running.';
    }
    return e.message;
  }
  return 'Something went wrong. Please try again.';
}
