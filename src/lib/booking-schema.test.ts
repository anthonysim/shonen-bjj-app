import { describe, expect, it } from 'vitest';
import { bookingSchema, fieldErrors } from './booking-schema';

const valid = {
  program: 'kids',
  when: 'this-week',
  name: 'Jordan Lee',
  phone: '(555) 555-0100',
  email: 'Jordan@Example.com ',
};

describe('bookingSchema', () => {
  it('accepts a valid submission and normalizes it', () => {
    const result = bookingSchema.safeParse(valid);
    expect(result.success).toBe(true);
    expect(result.data).toMatchObject({
      program: 'kids',
      when: 'this-week',
      name: 'Jordan Lee',
      phone: '5555550100',
      email: 'jordan@example.com',
    });
  });

  it('accepts phone formats and a leading country code', () => {
    for (const phone of ['555-555-0100', '555.555.0100', '+1 555 555 0100', '15555550100']) {
      expect(bookingSchema.safeParse({ ...valid, phone }).data?.phone, phone).toBe('5555550100');
    }
  });

  it('rejects short or non-numeric phones', () => {
    for (const phone of ['', '555', 'call me', '555-555-01001']) {
      expect(bookingSchema.safeParse({ ...valid, phone }).success, phone).toBe(false);
    }
  });

  it('rejects bad emails, short names, and unknown choices', () => {
    expect(bookingSchema.safeParse({ ...valid, email: 'not-an-email' }).success).toBe(false);
    expect(bookingSchema.safeParse({ ...valid, name: 'A' }).success).toBe(false);
    expect(bookingSchema.safeParse({ ...valid, program: 'pottery' }).success).toBe(false);
    expect(bookingSchema.safeParse({ ...valid, when: 'someday' }).success).toBe(false);
  });

  it('requires the honeypot to stay empty', () => {
    expect(bookingSchema.safeParse({ ...valid, website: '' }).success).toBe(true);
    expect(bookingSchema.safeParse({ ...valid, website: 'spam.example' }).success).toBe(false);
  });
});

describe('fieldErrors', () => {
  it('returns the first message per field', () => {
    const result = bookingSchema.safeParse({ ...valid, name: '', phone: '1', program: undefined });
    expect(result.success).toBe(false);
    const errors = fieldErrors(result.error!);
    expect(Object.keys(errors).sort()).toEqual(['name', 'phone', 'program']);
    expect(errors.phone).toBe('Enter a 10-digit phone number.');
    expect(errors.program).toBe('Please pick one to continue.');
  });
});
