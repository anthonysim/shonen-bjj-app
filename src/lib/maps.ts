import type { site } from '@/data/site';

type Address = (typeof site)['address'];

/** Google Maps search link for an address. Opens the Maps app on phones. */
export function mapsUrl(address: Pick<Address, 'street' | 'city' | 'region' | 'postalCode'>) {
  const query = `${address.street}, ${address.city}, ${address.region} ${address.postalCode}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
