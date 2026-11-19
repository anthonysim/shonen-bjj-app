import { describe, expect, it } from 'vitest';
import { site } from '@/data/site';
import { localBusinessJsonLd, serializeJsonLd } from './structured-data';

describe('localBusinessJsonLd', () => {
  const data = localBusinessJsonLd('https://example.com/');

  it('describes the business from site data', () => {
    expect(data['@type']).toBe('SportsActivityLocation');
    expect(data.name).toBe(site.name);
    expect(data.url).toBe('https://example.com/');
    expect(data.address.postalCode).toBe(site.address.postalCode);
  });

  it('lists one served city per service-area entry', () => {
    expect(data.areaServed).toHaveLength(site.serviceArea.length);
  });
});

describe('serializeJsonLd', () => {
  it('escapes "<" so a value cannot close the script tag', () => {
    const out = serializeJsonLd({ name: '</script><script>alert(1)</script>' });
    expect(out).not.toContain('<');
    expect(JSON.parse(out).name).toBe('</script><script>alert(1)</script>');
  });
});
