import { describe, expect, it, vi } from 'vitest';
import type { BookingData } from './booking-schema';
import { buildLeadEmail, formatPhone, sendLeadEmail } from './lead-email';

const lead: BookingData = {
  program: 'kids',
  when: 'this-week',
  name: 'Sam <Rivera>',
  phone: '4433048884',
  email: 'sam@example.com',
};
const config = { apiKey: 'key_123', to: 'info@example.com', from: 'Leads <leads@example.com>' };

describe('buildLeadEmail', () => {
  it('names the person and program and lists every field', () => {
    const email = buildLeadEmail(lead);
    expect(email.subject).toBe('New free class request: Sam <Rivera> (Kids (4\u201313))');
    expect(email.text).toContain('Phone: (443) 304-8884');
    expect(email.text).toContain('When: This week');
  });

  it('escapes HTML in the html body', () => {
    expect(buildLeadEmail(lead).html).toContain('Sam &lt;Rivera&gt;');
  });

  it('formats phone numbers', () => {
    expect(formatPhone('5555550100')).toBe('(555) 555-0100');
  });
});

describe('sendLeadEmail', () => {
  it('posts to Resend with the key, recipients and a reply-to of the person', async () => {
    const fetchFn = vi.fn(async () => new Response('{"id":"1"}', { status: 200 }));
    await sendLeadEmail(lead, config, fetchFn as unknown as typeof fetch);
    const [url, init] = fetchFn.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('https://api.resend.com/emails');
    expect((init.headers as Record<string, string>).Authorization).toBe('Bearer key_123');
    const body = JSON.parse(String(init.body));
    expect(body).toMatchObject({
      from: config.from,
      to: ['info@example.com'],
      reply_to: 'sam@example.com',
    });
  });

  it('throws when Resend rejects the email', async () => {
    const fetchFn = vi.fn(async () => new Response('bad', { status: 422 }));
    await expect(sendLeadEmail(lead, config, fetchFn as unknown as typeof fetch)).rejects.toThrow(
      '422',
    );
  });
});
