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

export interface BreadcrumbItem {
  label: string;
  /** Root-relative or absolute. Omit on the current page. */
  href?: string;
}

/**
 * schema.org BreadcrumbList. `origin` resolves root-relative hrefs; a crumb with no href
 * (the current page) uses `currentUrl`.
 */
export function breadcrumbListJsonLd(items: BreadcrumbItem[], origin: string, currentUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? new URL(item.href, origin).href : currentUrl,
    })),
  };
}
