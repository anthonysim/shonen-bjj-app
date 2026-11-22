import { site } from '@/data/site';

/** The academy's Google Maps listing, so links open the business, not just an address pin. */
type Place = { name: string; placeId: string };

const academy: Place = { name: site.name, placeId: site.googlePlaceId };

/** Google Maps search for the academy by name, pinned to its listing. Opens the Maps app on phones. */
export function mapsUrl(place: Place = academy) {
  const params = new URLSearchParams({
    api: '1',
    query: place.name,
    query_place_id: place.placeId,
  });
  return `https://www.google.com/maps/search/?${params}`;
}

/**
 * Embeddable Google Map of the academy for an iframe. Uses the plain embed (no API key), searched
 * by name and street address so the pin lands on the business.
 */
export function embedMapUrl() {
  const { street, city, region, postalCode } = site.address;
  const params = new URLSearchParams({
    q: `${site.name}, ${street}, ${city}, ${region} ${postalCode}`,
    z: '15',
    output: 'embed',
  });
  return `https://maps.google.com/maps?${params}`;
}

/** Google Maps directions to the academy's listing from wherever the person is. */
export function directionsUrl(place: Place = academy) {
  const params = new URLSearchParams({
    api: '1',
    destination: place.name,
    destination_place_id: place.placeId,
  });
  return `https://www.google.com/maps/dir/?${params}`;
}
