import type { APIRoute } from 'astro';
import { processBooking } from '@/lib/booking-endpoint';
import type { BookingData } from '@/lib/booking-schema';
import { sendLeadEmail } from '@/lib/lead-email';
import { createRateLimiter } from '@/lib/spam';

// On-demand route: runs as a function, everything else is prerendered.
export const prerender = false;

// 5 submissions per IP per 10 minutes, per warm function instance
const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60_000 });

async function deliver(data: BookingData) {
  const { RESEND_API_KEY: apiKey, LEAD_TO_EMAIL: to, LEAD_FROM_EMAIL: from } = import.meta.env;
  if (apiKey && to && from) {
    await sendLeadEmail(data, { apiKey, to, from });
    return;
  }
  // Never drop a lead silently in production: fail so the person is told to call instead
  if (import.meta.env.PROD) {
    throw new Error(
      'Lead email is not configured (RESEND_API_KEY, LEAD_TO_EMAIL, LEAD_FROM_EMAIL)',
    );
  }
  console.info('[dev] Lead received (email not configured, nothing sent):', data);
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const wantsJson = (request.headers.get('accept') ?? '').includes('application/json');
  const form = await request.formData().catch(() => null);
  if (!form) {
    return Response.json({ ok: false, errors: { form: 'Invalid submission.' } }, { status: 400 });
  }

  let ip: string | undefined;
  try {
    ip = clientAddress;
  } catch {
    ip = undefined;
  }

  const result = await processBooking({
    fields: Object.fromEntries(form),
    ip,
    wantsJson,
    allow: (key) => limiter.check(key),
    turnstileSecret: import.meta.env.TURNSTILE_SECRET_KEY || undefined,
    deliver,
  });

  if ('redirect' in result) {
    return new Response(null, { status: 303, headers: { Location: result.redirect } });
  }
  return Response.json(result.json, { status: result.status });
};
