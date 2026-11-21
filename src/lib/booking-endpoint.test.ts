import { describe, expect, it, vi } from 'vitest';
import { processBooking, type EndpointDeps } from './booking-endpoint';

const fields = {
  program: 'adults',
  when: 'flexible',
  name: 'Sam Rivera',
  phone: '4433048884',
  email: 'sam@example.com',
};

const deps = (over: Partial<EndpointDeps> = {}): EndpointDeps => ({
  fields,
  ip: '1.2.3.4',
  wantsJson: true,
  allow: () => true,
  deliver: vi.fn(async () => {}),
  ...over,
});

describe('processBooking', () => {
  it('delivers a valid lead and returns ok JSON', async () => {
    const d = deps();
    expect(await processBooking(d)).toEqual({ status: 200, json: { ok: true } });
    expect(d.deliver).toHaveBeenCalledOnce();
  });

  it('redirects to the thanks page for a no-JS form post', async () => {
    expect(await processBooking(deps({ wantsJson: false }))).toEqual({
      status: 303,
      redirect: '/free-trial/thanks',
    });
  });

  it('returns field errors as JSON, or the error page without JS, and does not deliver', async () => {
    const d = deps({ fields: { ...fields, email: 'nope' } });
    const result = await processBooking(d);
    expect(result.status).toBe(422);
    expect(d.deliver).not.toHaveBeenCalled();
    expect(
      await processBooking(deps({ fields: { ...fields, email: 'nope' }, wantsJson: false })),
    ).toEqual({
      status: 303,
      redirect: '/free-trial/error',
    });
  });

  it('blocks rate-limited requests before doing anything else', async () => {
    const d = deps({ allow: () => false });
    expect((await processBooking(d)).status).toBe(429);
    expect(d.deliver).not.toHaveBeenCalled();
  });

  it('requires a passing Turnstile check when a secret is configured', async () => {
    const fetchFn = vi.fn(async () => Response.json({ success: false })) as unknown as typeof fetch;
    const d = deps({
      turnstileSecret: 's',
      fetchFn,
      fields: { ...fields, 'cf-turnstile-response': 't' },
    });
    expect((await processBooking(d)).status).toBe(400);
    expect(d.deliver).not.toHaveBeenCalled();
  });

  it('reports a delivery failure instead of pretending it worked', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const d = deps({ deliver: async () => Promise.reject(new Error('resend down')) });
    expect(await processBooking(d)).toEqual({
      status: 502,
      json: { ok: false, errors: { form: 'We could not send that. Please call us instead.' } },
    });
    error.mockRestore();
  });

  it('still pretends success to bots that fill the honeypot, without delivering', async () => {
    const d = deps({ fields: { ...fields, website: 'spam' } });
    expect((await processBooking(d)).status).toBe(200);
    expect(d.deliver).not.toHaveBeenCalled();
  });
});
