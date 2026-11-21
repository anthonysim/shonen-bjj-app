import { handleBooking } from '@/lib/booking';
import type { BookingData } from '@/lib/booking-schema';
import { verifyTurnstile } from '@/lib/spam';

export interface EndpointDeps {
  /** The submitted form fields */
  fields: Record<string, unknown>;
  ip?: string;
  /** The page script asks for JSON; a plain HTML form post (no JS) gets a redirect */
  wantsJson: boolean;
  allow: (ip: string) => boolean;
  /** Set when Turnstile is configured */
  turnstileSecret?: string;
  /** Delivers a valid lead (email). Throwing means it was not delivered. */
  deliver: (data: BookingData) => Promise<void>;
  fetchFn?: typeof fetch;
}

export type EndpointResult =
  | { status: number; json: { ok: boolean; errors?: Record<string, string> } }
  | { status: 303; redirect: string };

const THANKS = '/free-trial/thanks';
const ERROR = '/free-trial/error';

/**
 * The booking endpoint's logic, without Astro: rate limit, Turnstile (if configured), validate,
 * deliver. Returns JSON for the page script or a redirect for no-JS form posts.
 */
export async function processBooking(deps: EndpointDeps): Promise<EndpointResult> {
  const fail = (status: number, message: string): EndpointResult =>
    deps.wantsJson
      ? { status, json: { ok: false, errors: { form: message } } }
      : { status: 303, redirect: ERROR };

  if (!deps.allow(deps.ip ?? 'unknown')) {
    return fail(429, 'Too many tries. Please wait a minute or call us.');
  }

  if (deps.turnstileSecret) {
    const token = deps.fields['cf-turnstile-response'];
    const human = await verifyTurnstile(
      typeof token === 'string' ? token : undefined,
      deps.turnstileSecret,
      deps.ip,
      deps.fetchFn,
    );
    if (!human) return fail(400, 'Please complete the check and try again.');
  }

  let deliveryFailed = false;
  const result = await handleBooking(deps.fields, async (data) => {
    try {
      await deps.deliver(data);
    } catch (error) {
      deliveryFailed = true;
      console.error('Lead delivery failed', error);
    }
  });

  if (deliveryFailed) return fail(502, 'We could not send that. Please call us instead.');
  if (result.status === 422) {
    return deps.wantsJson ? { status: 422, json: result.body } : { status: 303, redirect: ERROR };
  }
  return deps.wantsJson ? { status: 200, json: { ok: true } } : { status: 303, redirect: THANKS };
}
