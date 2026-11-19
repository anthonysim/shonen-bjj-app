import { describe, expect, it } from 'vitest';
import { site } from '@/data/site';
import { breadcrumbListJsonLd, localBusinessJsonLd, serializeJsonLd } from './structured-data';

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

describe('breadcrumbListJsonLd', () => {
  const data = breadcrumbListJsonLd(
    [{ label: 'Home', href: '/' }, { label: 'Programs', href: '/programs' }, { label: 'Kids' }],
    'https://example.com',
    'https://example.com/programs/kids/',
  );

  it('numbers items from 1 in order', () => {
    expect(data['@type']).toBe('BreadcrumbList');
    expect(data.itemListElement.map((i) => i.position)).toEqual([1, 2, 3]);
    expect(data.itemListElement.map((i) => i.name)).toEqual(['Home', 'Programs', 'Kids']);
  });

  it('resolves hrefs to absolute URLs and uses the current URL for the last crumb', () => {
    expect(data.itemListElement.map((i) => i.item)).toEqual([
      'https://example.com/',
      'https://example.com/programs',
      'https://example.com/programs/kids/',
    ]);
  });
});
