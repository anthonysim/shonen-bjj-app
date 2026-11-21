import { coach } from '@/data/coach';
import type { FaqGroup } from '@/data/faqs';
import { site } from '@/data/site';

/** Stable @id for the academy, so other entities (the coach) can point at it. */
export function academyId(origin: string) {
  return new URL('/#academy', origin).href;
}

/** schema.org LocalBusiness JSON-LD built from the site data. */
export function localBusinessJsonLd(url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    '@id': academyId(url),
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

/**
 * schema.org ProfilePage whose main entity is the coach (Person), linked to the academy by @id.
 * `imageUrl` is the absolute URL of the profile photo, if any.
 */
export function coachProfileJsonLd(pageUrl: string, origin: string, imageUrl?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: `${coach.displayName}, BJJ Black Belt | ${site.name}`,
    mainEntity: {
      '@type': 'Person',
      '@id': `${pageUrl}#person`,
      name: coach.name,
      honorificPrefix: coach.honorific,
      jobTitle: coach.jobTitle,
      description: coach.summary,
      url: pageUrl,
      ...(imageUrl ? { image: imageUrl } : {}),
      worksFor: { '@id': academyId(origin) },
      award: coach.competitionRecord.map((record) => record.title),
    },
  };
}

/** schema.org AboutPage whose main entity is the academy (by @id). */
export function aboutPageJsonLd(pageUrl: string, origin: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: `About | ${site.name}`,
    mainEntity: { '@id': academyId(origin) },
  };
}

/** schema.org FAQPage: every question on the page with its answer (list items appended). */
export function faqPageJsonLd(groups: readonly FaqGroup[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: groups.flatMap((group) =>
      group.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.list?.length ? `${item.answer} ${item.list.join(' ')}` : item.answer,
        },
      })),
    ),
  };
}

/** schema.org ContactPage whose main entity is the academy (by @id). */
export function contactPageJsonLd(pageUrl: string, origin: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: `Contact | ${site.name}`,
    mainEntity: { '@id': academyId(origin) },
  };
}
