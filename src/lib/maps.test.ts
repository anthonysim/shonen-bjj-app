import { describe, expect, it } from 'vitest';
import { site } from '@/data/site';
import { mapsUrl } from './maps';

describe('mapsUrl', () => {
  it('encodes the full address as a Maps search query', () => {
    const url = new URL(mapsUrl(site.address));
    expect(url.origin + url.pathname).toBe('https://www.google.com/maps/search/');
    expect(url.searchParams.get('api')).toBe('1');
    expect(url.searchParams.get('query')).toBe(
      `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`,
    );
  });
});
