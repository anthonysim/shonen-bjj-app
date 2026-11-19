// Single source of truth for site-wide content. All values are placeholders.

export interface NavChild {
  label: string;
  href: string;
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
  name: 'Shonen BJJ',
  tagline: 'Brazilian jiu-jitsu for kids and adults',
  phone: { display: '(555) 555-0100', href: 'tel:+15555550100' },
  email: 'hello@example.com',
  address: {
    street: '123 Main St',
    city: 'Anytown',
    region: 'MD',
    postalCode: '00000',
  },
  hours: [
    { days: 'Mon-Fri', time: '9am-9pm' },
    { days: 'Sat', time: '9am-12pm' },
    { days: 'Sun', time: 'Closed' },
  ],
  /** schema.org openingHours format, kept in sync with `hours` */
  openingHours: ['Mo-Fr 09:00-21:00', 'Sa 09:00-12:00'],
  serviceArea: ['Anytown', 'Springfield', 'Riverside', 'Fairview'],
  social: [
    { label: 'Instagram', href: 'https://instagram.com/' },
    { label: 'Facebook', href: 'https://facebook.com/' },
  ],
  cta: { label: 'Book a free class', href: '/free-trial' },
} as const;

export const programs: Program[] = [
  {
    slug: 'kids',
    name: 'Kids',
    ages: 'Ages 4-13',
    blurb: 'Confidence, focus and fitness through play-based jiu-jitsu.',
    facts: ['Ages 4-13', 'Two age groups', 'First class free'],
    ageGroups: [
      {
        id: 'kids-4-7',
        name: 'Kids 4-7',
        ages: 'Ages 4-7',
        classLength: '45 min',
        format: 'Games, drills and gentle partner work',
        blurb: 'Short, playful classes that build listening skills, balance and coordination.',
      },
      {
        id: 'kids-8-13',
        name: 'Kids 8-13',
        ages: 'Ages 8-13',
        classLength: '60 min',
        format: 'Technique, drilling and supervised live rounds',
        blurb: 'Real jiu-jitsu progression with a focus on respect, resilience and fitness.',
      },
    ],
  },
  {
    slug: 'bjj',
    name: 'Adults',
    ages: 'Ages 14+',
    blurb: 'Gi classes for every level, from first day to competition.',
    facts: ['Ages 14+', 'Gi classes', 'First class free'],
  },
  {
    slug: 'no-gi',
    name: 'No-Gi',
    ages: 'Ages 14+',
    blurb: 'Fast, athletic grappling without the kimono.',
    facts: ['Tue & Thu evenings', 'Ages 14+', 'First class free'],
  },
  {
    slug: 'birthday-parties',
    name: 'Birthday parties',
    ages: 'All ages',
    blurb: 'A high-energy party your kid will talk about for weeks.',
    facts: ['We run the party', 'Gear provided', 'Easy to book'],
  },
];

/** Cards for the homepage and programs index: kids split by age group. */
export const programCards: ProgramCard[] = programs.flatMap((program) =>
  program.ageGroups
    ? program.ageGroups.map((group) => ({
        id: group.id,
        name: group.name,
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
    children: programs.map((p) => ({ label: p.name, href: `/programs/${p.slug}` })),
  },
  { label: 'Schedule', href: '/schedule' },
  { label: 'Meet the Coach', href: '/team/head-coach' },
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
