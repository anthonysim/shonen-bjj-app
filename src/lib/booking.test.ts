import { describe, expect, it, vi } from 'vitest';
import { handleBooking } from './booking';

const valid = {
  program: 'adults',
  when: 'flexible',
  name: 'Sam Rivera',
  phone: '5555550100',
  email: 'sam@example.com',
};

describe('handleBooking', () => {
  it('accepts a valid booking and passes normalized data to onValid', async () => {
    const onValid = vi.fn();
    const result = await handleBooking(valid, onValid);
    expect(result).toEqual({ status: 200, body: { ok: true } });
    expect(onValid).toHaveBeenCalledOnce();
    expect(onValid.mock.calls[0][0]).toMatchObject({ phone: '5555550100' });
  });

  it('returns 422 with per-field errors and does not deliver', async () => {
    const onValid = vi.fn();
    const result = await handleBooking({ ...valid, email: 'nope', name: '' }, onValid);
    expect(result.status).toBe(422);
    if (result.status === 422) {
      expect(Object.keys(result.body.errors).sort()).toEqual(['email', 'name']);
    }
    expect(onValid).not.toHaveBeenCalled();
  });

  it('pretends success for the honeypot but never delivers', async () => {
    const onValid = vi.fn();
    const result = await handleBooking({ ...valid, website: 'https://spam.example' }, onValid);
    expect(result).toEqual({ status: 200, body: { ok: true } });
    expect(onValid).not.toHaveBeenCalled();
  });

  it('treats uploaded files and junk as validation errors, not crashes', async () => {
    const result = await handleBooking({ name: new Blob(['x']), phone: {}, email: 42 });
    expect(result.status).toBe(422);
  });
});
