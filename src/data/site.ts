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
  blurb: string;
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
  ],
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/shonenjiujitsu/' },
    { label: 'Facebook', href: 'https://www.facebook.com/Shonen-Jiu-Jitsu-100957869171176/' },
  ],
  cta: { label: 'Book a free class', href: '/free-trial' },
} as const;

export const programs: Program[] = [
  {
    slug: 'kids',
    name: 'Kids',
    ages: 'Ages 4\u201313',
    blurb: 'Confidence, focus and fitness through play-based jiu-jitsu.',
    facts: ['Ages 4\u201313', 'Two age groups', 'First class free'],
    ageGroups: [
      {
        id: 'kids-4-7',
        name: 'Kids 4\u20137',
        ages: 'Ages 4\u20137',
        classLength: '45 min',
        format: 'Games, drills and gentle partner work',
        blurb: 'Coordination, listening and confidence, built through games and real technique.',
      },
      {
        id: 'kids-8-13',
        name: 'Kids 8\u201313',
        ages: 'Ages 8\u201313',
        classLength: '60 min',
        format: 'Technique, drilling and supervised live rounds',
        blurb: 'Real grappling technique, focus and self-defense, alongside supportive teammates.',
      },
    ],
  },
  {
    slug: 'bjj',
    name: 'Adults',
    ages: 'Ages 14+',
    blurb: 'Gi Basics for beginners and All-Levels classes for experienced grapplers.',
    facts: ['Ages 14+', 'Gi classes', 'First class free'],
  },
  {
    slug: 'no-gi',
    name: 'No-Gi',
    ages: 'Ages 14+',
    blurb: 'Rash guard and shorts. Faster, closer to wrestling, just as technical.',
    facts: ['Tue & Thu evenings', 'Ages 14+', 'First class free'],
  },
  {
    slug: 'birthday-parties',
    name: 'Birthday parties',
    ages: 'Ages 4\u201313',
    blurb: 'A high-energy party your kid will talk about for weeks.',
    facts: ['We run the party', 'Gear provided', 'Easy to book'],
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

export const footerLinks = [
  { label: 'Blog', href: '/blog' },
  { label: 'Privacy policy', href: '/privacy-policy' },
  { label: 'Terms and conditions', href: '/terms-and-conditions' },
  { label: 'Waiver', href: '/waiver' },
] as const;
