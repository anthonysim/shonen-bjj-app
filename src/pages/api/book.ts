import type { APIRoute } from 'astro';
import { handleBooking } from '@/lib/booking';

// On-demand route: runs as a function, everything else is prerendered.
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData().catch(() => null);
  if (!form) {
    return Response.json({ ok: false, errors: { form: 'Invalid submission.' } }, { status: 400 });
  }

  // Delivery (email) is wired up in a later PR. For now valid bookings are only validated.
  const { status, body } = await handleBooking(Object.fromEntries(form));
  return Response.json(body, { status });
};
