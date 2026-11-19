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

export interface Program {
  slug: string;
  name: string;
  ages: string;
  blurb: string;
}

export interface ScheduleClass {
  program: string;
  /** Short day names, e.g. "Mon" */
  days: Day[];
  time: string;
}

export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
export type Day = (typeof DAYS)[number];

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
  },
  {
    slug: 'bjj',
    name: 'Adults',
    ages: 'Ages 14+',
    blurb: 'Gi classes for every level, from first day to competition.',
  },
  {
    slug: 'no-gi',
    name: 'No-Gi',
    ages: 'Ages 14+',
    blurb: 'Fast, athletic grappling without the kimono.',
  },
  {
    slug: 'birthday-parties',
    name: 'Birthday parties',
    ages: 'All ages',
    blurb: 'A high-energy party your kid will talk about for weeks.',
  },
];

export const schedule: ScheduleClass[] = [
  { program: 'Kids', days: ['Tue', 'Thu'], time: '5:00 PM' },
  { program: 'Kids', days: ['Sat'], time: '9:00 AM' },
  { program: 'Adults Basics', days: ['Mon', 'Tue', 'Wed', 'Thu'], time: '7:00 PM' },
  { program: 'Adults All-Levels', days: ['Mon', 'Wed'], time: '6:00 PM' },
  { program: 'Adults All-Levels', days: ['Fri'], time: '12:00 PM' },
  { program: 'Adults All-Levels', days: ['Sat'], time: '10:00 AM' },
  { program: 'No-Gi', days: ['Tue', 'Thu'], time: '6:00 PM' },
];

export const nav: NavItem[] = [
  {
    label: 'Programs',
    href: '/programs',
    children: programs.map((p) => ({ label: p.name, href: `/programs/${p.slug}` })),
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
