import { site } from '@/data/site';

/** schema.org LocalBusiness JSON-LD built from the site data. */
export function localBusinessJsonLd(url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: site.name,
    description: site.tagline,
    url,
    telephone: site.phone.display,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: 'US',
    },
    openingHours: site.openingHours,
    areaServed: site.serviceArea.map((name) => ({ '@type': 'City', name })),
    sameAs: site.social.map((s) => s.href),
  };
}

/** Serialize for an inline <script>; escapes "<" so content can't close the tag. */
export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
