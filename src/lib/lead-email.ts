import { PROGRAM_CHOICES, WHEN_CHOICES, type BookingData } from '@/lib/booking-schema';

export interface LeadEmailConfig {
  apiKey: string;
  /** Where leads go, e.g. the academy inbox */
  to: string;
  /** Verified Resend sender, e.g. "Shonen Jiu Jitsu <leads@shonenjiujitsu.com>" */
  from: string;
}

const labelOf = (list: readonly { value: string; label: string }[], value: string) =>
  list.find((item) => item.value === value)?.label ?? value;

/** "5555550100" -> "(555) 555-0100" */
export function formatPhone(digits: string) {
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  );

/** Subject and bodies for a new-lead email. */
export function buildLeadEmail(data: BookingData, source = 'website') {
  const program = labelOf(PROGRAM_CHOICES, data.program);
  const rows: [string, string][] = [
    ['Name', data.name],
    ['Program', program],
    ['When', labelOf(WHEN_CHOICES, data.when)],
    ['Phone', formatPhone(data.phone)],
    ['Email', data.email],
    ['Source', source],
  ];
  const subject = `New free class request: ${data.name} (${program})`;
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nReply to this email or call to book their class.`;
  const html = `<table cellpadding="6" style="font-family:sans-serif;font-size:15px">${rows
    .map(([k, v]) => `<tr><th align="left">${escapeHtml(k)}</th><td>${escapeHtml(v)}</td></tr>`)
    .join(
      '',
    )}</table><p style="font-family:sans-serif">Reply to this email or call to book their class.</p>`;
  return { subject, text, html };
}

/** Send a lead through Resend's REST API. Throws when Resend does not accept it. */
export async function sendLeadEmail(
  data: BookingData,
  config: LeadEmailConfig,
  fetchFn: typeof fetch = fetch,
  source?: string,
) {
  const { subject, text, html } = buildLeadEmail(data, source);
  const response = await fetchFn('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${config.apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: config.from,
      to: [config.to],
      reply_to: data.email,
      subject,
      text,
      html,
    }),
  });
  if (!response.ok) {
    throw new Error(`Resend rejected the lead email (${response.status})`);
  }
}
