import { describe, expect, it, vi } from 'vitest';
import { createRateLimiter, verifyTurnstile } from './spam';

describe('createRateLimiter', () => {
  it('allows up to the limit per window, then blocks, then resets', () => {
    const limiter = createRateLimiter({ limit: 2, windowMs: 1000 });
    expect(limiter.check('a', 0)).toBe(true);
    expect(limiter.check('a', 10)).toBe(true);
    expect(limiter.check('a', 20)).toBe(false);
    expect(limiter.check('b', 20)).toBe(true);
    expect(limiter.check('a', 1000)).toBe(true);
  });
});

describe('verifyTurnstile', () => {
  const ok = vi.fn(async () => Response.json({ success: true }));
  const no = vi.fn(async () => Response.json({ success: false }));

  it('passes when Cloudflare says success', async () => {
    expect(await verifyTurnstile('tok', 'secret', '1.2.3.4', ok as unknown as typeof fetch)).toBe(
      true,
    );
    const body = (ok.mock.calls[0] as unknown as [string, RequestInit])[1].body as URLSearchParams;
    expect(body.get('secret')).toBe('secret');
    expect(body.get('remoteip')).toBe('1.2.3.4');
  });

  it('fails without a token, on a failed check, or when the request errors', async () => {
    expect(
      await verifyTurnstile(undefined, 'secret', undefined, ok as unknown as typeof fetch),
    ).toBe(false);
    expect(await verifyTurnstile('tok', 'secret', undefined, no as unknown as typeof fetch)).toBe(
      false,
    );
    const boom = vi.fn(async () => {
      throw new Error('network');
    });
    expect(await verifyTurnstile('tok', 'secret', undefined, boom as unknown as typeof fetch)).toBe(
      false,
    );
  });
});
