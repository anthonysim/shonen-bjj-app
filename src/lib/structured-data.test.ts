import { describe, expect, it } from 'vitest';
import { coach } from '@/data/coach';
import { site } from '@/data/site';
import {
  academyId,
  breadcrumbListJsonLd,
  coachProfileJsonLd,
  localBusinessJsonLd,
  serializeJsonLd,
} from './structured-data';

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

describe('coachProfileJsonLd', () => {
  const pageUrl = 'https://example.com/team/head-coach';
  const data = coachProfileJsonLd(pageUrl, 'https://example.com', 'https://example.com/a.jpg');

  it('is a ProfilePage about the coach', () => {
    expect(data['@type']).toBe('ProfilePage');
    expect(data.url).toBe(pageUrl);
    expect(data.mainEntity['@type']).toBe('Person');
    expect(data.mainEntity.name).toBe(coach.name);
    expect(data.mainEntity.image).toBe('https://example.com/a.jpg');
  });

  it('links the coach to the academy entity by @id', () => {
    const academy = localBusinessJsonLd('https://example.com/');
    expect(data.mainEntity.worksFor['@id']).toBe(academy['@id']);
    expect(academy['@id']).toBe(academyId('https://example.com'));
  });

  it('lists every competition result as an award', () => {
    expect(data.mainEntity.award).toEqual(coach.competitionRecord.map((r) => r.title));
  });

  it('leaves out the image when there is none', () => {
    expect('image' in coachProfileJsonLd(pageUrl, 'https://example.com').mainEntity).toBe(false);
  });
});
