/**
 * Derive the submitter's IP and origin location from request headers.
 * Vercel sets x-vercel-ip-* headers; locally they are absent (country is blank).
 * Always overwrites client-supplied values so they can't be forged.
 */
const header = (headers, name) => {
  const v = headers?.[name];
  const s = Array.isArray(v) ? v[0] : v;
  return typeof s === 'string' ? s.trim() : '';
};

const decode = (s) => {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
};

export function withClientGeo(body, headers) {
  const ip =
    header(headers, 'x-forwarded-for').split(',')[0].trim() ||
    header(headers, 'x-real-ip');
  const country = decode(header(headers, 'x-vercel-ip-country'));
  const region = decode(header(headers, 'x-vercel-ip-country-region'));
  const city = decode(header(headers, 'x-vercel-ip-city'));
  const location = [city, region, country].filter(Boolean).join(', ');
  return {
    ...(body ?? {}),
    IP: ip || 'Unknown',
    Country: country || 'Unknown',
    Location: location || 'Unknown',
  };
}

/**
 * Kora's SMS template only prints fixed fields, so fold IP/location into Message
 * for the Kora forward only (DB and email keep the original message).
 */
export function withGeoInMessage(lead) {
  const base = typeof lead.Message === 'string' ? lead.Message : '';
  return {
    ...lead,
    Message: `${base}\n\nIP: ${lead.IP}\nLocation: ${lead.Location}`.trim(),
  };
}
