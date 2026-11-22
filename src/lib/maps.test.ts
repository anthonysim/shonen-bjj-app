import { describe, expect, it } from 'vitest';
import { site } from '@/data/site';
import { directionsUrl, embedMapUrl, mapsUrl } from './maps';

describe('mapsUrl', () => {
  it('searches Maps for the academy by name, pinned to its Google listing', () => {
    const url = new URL(mapsUrl());
    expect(url.origin + url.pathname).toBe('https://www.google.com/maps/search/');
    expect(url.searchParams.get('api')).toBe('1');
    expect(url.searchParams.get('query')).toBe('Shonen Jiu Jitsu');
    expect(url.searchParams.get('query_place_id')).toBe(site.googlePlaceId);
  });
});

describe('directionsUrl', () => {
  it('opens Maps directions to the academy listing', () => {
    const url = new URL(directionsUrl());
    expect(url.origin + url.pathname).toBe('https://www.google.com/maps/dir/');
    expect(url.searchParams.get('destination')).toBe('Shonen Jiu Jitsu');
    expect(url.searchParams.get('destination_place_id')).toBe(site.googlePlaceId);
  });
});

describe('embedMapUrl', () => {
  it('is a keyless Google embed searched by name and street address', () => {
    const url = new URL(embedMapUrl());
    expect(url.origin + url.pathname).toBe('https://maps.google.com/maps');
    expect(url.searchParams.get('output')).toBe('embed');
    const query = url.searchParams.get('q') ?? '';
    expect(query).toContain(site.name);
    expect(query).toContain(site.address.street);
    expect(query).toContain(site.address.postalCode);
  });
});
