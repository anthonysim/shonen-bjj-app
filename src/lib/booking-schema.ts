import { z } from 'astro/zod';

export const PROGRAM_CHOICES = [
  { value: 'kids', label: 'Kids (4\u201313)' },
  { value: 'adults', label: 'Adults (14+)' },
  { value: 'birthday', label: 'Birthday party' },
] as const;

export const WHEN_CHOICES = [
  { value: 'this-week', label: 'This week' },
  { value: 'next-week', label: 'Next week' },
  { value: 'flexible', label: "I'm flexible" },
] as const;

export type ProgramChoice = (typeof PROGRAM_CHOICES)[number]['value'];
export type WhenChoice = (typeof WHEN_CHOICES)[number]['value'];

export const bookingSchema = z.object({
  program: z.enum(
    PROGRAM_CHOICES.map((c) => c.value),
    { error: 'Please pick one to continue.' },
  ),
  when: z.enum(
    WHEN_CHOICES.map((c) => c.value),
    { error: 'Please pick one to continue.' },
  ),
  name: z
    .string({ error: 'Please enter your name.' })
    .trim()
    .min(2, 'Please enter your name.')
    .max(100, 'That name is too long.'),
  phone: z
    .string({ error: 'Please enter your phone number.' })
    .trim()
    .transform((value) => value.replace(/\D/g, ''))
    // Accept a leading US country code
    .transform((digits) =>
      digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits,
    )
    .refine((digits) => digits.length === 10, 'Enter a 10-digit phone number.'),
  email: z
    .string({ error: 'Please enter your email.' })
    .trim()
    .toLowerCase()
    .pipe(z.email('Enter a valid email address.')),
  /** Honeypot. Hidden from people; bots fill it. Must stay empty. */
  website: z.string().max(0).optional(),
});

export type BookingInput = z.input<typeof bookingSchema>;
export type BookingData = z.output<typeof bookingSchema>;

/** First error message per field, keyed by field name. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const field = String(issue.path[0] ?? 'form');
    errors[field] ??= issue.message;
  }
  return errors;
}
