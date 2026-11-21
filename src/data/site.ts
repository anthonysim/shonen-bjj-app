// Single source of truth for site-wide content: the academy's real details (shonenjiujitsu.com).

export interface NavChild {
  label: string;
  href: string;
  /** Short qualifier shown after the label in the mobile menu, e.g. "ages 4-13". */
  detail?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
  /** Shown in the mobile menu only, not the desktop nav. */
  mobileOnly?: boolean;
}

export interface AgeGroup {
  id: string;
  name: string;
  ages: string;
  classLength: string;
  format: string;
  /** Short line for the homepage and programs index cards */
  blurb: string;
  /** Longer description on the kids page card */
  description: string;
}

export interface Program {
  slug: string;
  name: string;
  ages: string;
  blurb: string;
  /** Three short facts for the hero fact strip */
  facts: [string, string, string];
  /** Kids is split into age groups, each with its own card */
  ageGroups?: AgeGroup[];
}

/** A card on the homepage and programs index. Kids appears once per age group. */
export interface ProgramCard {
  id: string;
  name: string;
  ages: string;
  blurb: string;
  href: string;
}

export const site = {
  name: 'Shonen Jiu Jitsu',
  legalName: 'Shonen Jiu Jitsu LLC',
  tagline: 'Brazilian Jiu Jitsu for kids and adults in Glen Burnie, Maryland',
  phone: { display: '(443) 304-8884', href: 'tel:+14433048884' },
  email: 'info@shonenjiujitsu.com',
  address: {
    street: '7389 Baltimore Annapolis Blvd',
    city: 'Glen Burnie',
    region: 'MD',
    postalCode: '21061',
    /** Shown under the address in the visit block */
    note: "In the Cromwell Field Shopping Center, next to Dunkin', with plenty of parking.",
  },
  /** The academy's Google Maps listing (place ID), used for map, directions and review links */
  googlePlaceId: 'ChIJlRMV2Iv9t4kRTmSeyCYYSp8',
  /** IANA time zone of the academy. Class times are in this zone, whatever the viewer's is */
  timeZone: 'America/New_York',
  /** The county the academy serves, shown with the city in the hero */
  county: 'Anne Arundel County',
  hours: [
    { days: 'Mon\u2013Fri', time: '9:00 AM \u2013 9:00 PM' },
    { days: 'Saturday', time: '9:00 AM \u2013 12:00 PM' },
    { days: 'Sunday', time: 'Closed' },
  ],
  /** schema.org openingHours format, kept in sync with `hours` */
  openingHours: ['Mo-Fr 09:00-21:00', 'Sa 09:00-12:00'],
  serviceArea: [
    'Glen Burnie',
    'Ferndale',
    'Severn',
    'Linthicum Heights',
    'Brooklyn Park',
    'Pasadena',
    'Gambrills',
    'Severna Park',
    'Riviera Beach',
    'Hanover',
    'Elkridge',
    'Columbia',
    'Catonsville',
    'Baltimore',
    'Baltimore Highlands',
    'Patapsco',
  ],
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/shonenjiujitsu/' },
    { label: 'Facebook', href: 'https://www.facebook.com/Shonen-Jiu-Jitsu-100957869171176/' },
  ],
  cta: { label: 'Book a free class', href: '/free-trial' },
} as const;

/**
 * "Book a free class" inside a page: jumps to that page's booking form (the FormBand, #book),
 * like the original. The header, footer and homepage hero use `site.cta` (the /free-trial page).
 */
export const bookOnPage = { label: site.cta.label, href: '#book' } as const;

export const programs: Program[] = [
  {
    slug: 'kids',
    name: 'Kids',
    ages: 'Ages 4\u201313',
    blurb: 'Confidence, focus and fitness through play-based jiu-jitsu.',
    facts: ['5.0 \u2605 Google', 'Ages 4\u201313', 'First class free'],
    ageGroups: [
      {
        id: 'kids-4-7',
        name: 'Kids 4\u20137',
        ages: 'Ages 4\u20137',
        classLength: '45 minutes',
        format: 'gi',
        blurb: 'Coordination, listening and confidence, built through games and real technique.',
        description:
          'A playful, structured introduction to jiu jitsu. Younger students focus on mobility and coordination, combining jiu jitsu drills with games that build listening skills, confidence and the tools to handle a bully.',
      },
      {
        id: 'kids-8-13',
        name: 'Kids 8\u201313',
        ages: 'Ages 8\u201313',
        classLength: '45 minutes',
        format: 'gi',
        blurb: 'Real grappling technique, focus and self-defense, alongside supportive teammates.',
        description:
          'Real grappling technique with a greater focus on the sport. Older students build focus, confidence and self-defense skills, and learn competition rules and strategy alongside supportive teammates.',
      },
    ],
  },
  {
    slug: 'bjj',
    name: 'Adults',
    ages: 'Ages 14+',
    blurb: 'Gi Basics for beginners and All-Levels classes for experienced grapplers.',
    facts: ['5.0 \u2605 Google \u00b7 75 reviews', 'Gi & No-Gi', 'No sign-up fees'],
  },
  {
    slug: 'no-gi',
    name: 'No-Gi',
    ages: 'Ages 14+',
    blurb: 'Rash guard and shorts. Faster, closer to wrestling, just as technical.',
    facts: ['Tue & Thu \u00b7 6:00 PM', 'Ages 14+', 'First class free'],
  },
  {
    slug: 'birthday-parties',
    name: 'Birthday parties',
    ages: 'Ages 4\u201313',
    blurb: 'A high-energy party your kid will talk about for weeks.',
    facts: ['Ages 4\u201313', 'Coach-led', 'No experience needed'],
  },
];

/** Cards for the homepage and programs index: kids split by age group. */
export const programCards: ProgramCard[] = programs.flatMap((program) =>
  program.ageGroups
    ? program.ageGroups.map((group) => ({
        id: group.id,
        // Both kids cards say "Kids"; the label carries the ages, like the original
        name: program.name,
        ages: group.ages,
        blurb: group.blurb,
        href: `/programs/${program.slug}#${group.id}`,
      }))
    : [
        {
          id: program.slug,
          name: program.name,
          ages: program.ages,
          blurb: program.blurb,
          href: `/programs/${program.slug}`,
        },
      ],
);

export const nav: NavItem[] = [
  {
    label: 'Programs',
    href: '/programs',
    children: programs.map((p) => ({
      label: p.name,
      href: `/programs/${p.slug}`,
      detail: p.ages.toLowerCase(),
    })),
  },
  { label: 'Schedule', href: '/schedule' },
  { label: 'Meet the Coach', href: '/team/professor-lee-rosenfield' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq', mobileOnly: true },
  { label: 'Contact', href: '/contact' },
];

/** Footer "Academy" column, like the original. */
export const footerLinks = [
  { label: 'Kids jiu jitsu', href: '/programs/kids' },
  { label: 'Adult jiu jitsu', href: '/programs/bjj' },
  { label: 'No-Gi', href: '/programs/no-gi' },
  { label: 'Birthday parties', href: '/programs/birthday-parties' },
  { label: 'Meet the Coach', href: '/team/professor-lee-rosenfield' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
] as const;

/** Footer bottom row. */
export const legalLinks = [
  { label: 'Privacy', href: '/privacy-policy' },
  { label: 'Terms', href: '/terms-and-conditions' },
  { label: 'Waiver', href: '/waiver' },
] as const;
