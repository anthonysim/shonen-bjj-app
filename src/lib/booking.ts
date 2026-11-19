import { bookingSchema, fieldErrors, type BookingData } from '@/lib/booking-schema';

export type BookingResult =
  | { status: 200; body: { ok: true } }
  | { status: 422; body: { ok: false; errors: Record<string, string> } };

/**
 * Validate a submitted booking form. Pure, so the API route stays a thin wrapper.
 * `onValid` is where delivery (email, CRM) plugs in later.
 */
export async function handleBooking(
  input: Record<string, unknown>,
  onValid: (data: BookingData) => Promise<void> | void = () => {},
): Promise<BookingResult> {
  // Honeypot: pretend success so bots learn nothing, but do nothing with it.
  if (typeof input.website === 'string' && input.website.trim() !== '') {
    return { status: 200, body: { ok: true } };
  }

  const parsed = bookingSchema.safeParse(input);
  if (!parsed.success) {
    return { status: 422, body: { ok: false, errors: fieldErrors(parsed.error) } };
  }

  await onValid(parsed.data);
  return { status: 200, body: { ok: true } };
}
