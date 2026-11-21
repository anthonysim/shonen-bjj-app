/**
 * Fixed-window rate limit per key (IP). In memory, so on serverless it limits per warm
 * instance: a speed bump for bursts, not a hard guarantee. Turnstile is the stronger check.
 */
export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const hits = new Map<string, { count: number; start: number }>();
  return {
    /** True if this request is allowed. */
    check(key: string, now = Date.now()) {
      const entry = hits.get(key);
      if (!entry || now - entry.start >= windowMs) {
        hits.set(key, { count: 1, start: now });
        // Keep the map from growing forever
        if (hits.size > 5000) {
          for (const [k, v] of hits) if (now - v.start >= windowMs) hits.delete(k);
        }
        return true;
      }
      entry.count += 1;
      return entry.count <= limit;
    },
  };
}

/** Verify a Cloudflare Turnstile token. */
export async function verifyTurnstile(
  token: string | undefined,
  secret: string,
  ip: string | undefined,
  fetchFn: typeof fetch = fetch,
) {
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set('remoteip', ip);
  try {
    const response = await fetchFn('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
    });
    const data = (await response.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
