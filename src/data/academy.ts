// Shared academy copy used on several pages, from shonenjiujitsu.com (client's permission).

export interface Titled {
  title: string;
  body: string;
}

/** "Why us" pillars. Homepage and About. */
export const values: Titled[] = [
  {
    title: 'Authentic',
    body: 'Everyone is welcome, from total beginners to seasoned competitors. We value your budget, so fair, transparent business is non-negotiable. There are no sign-up fees at Shonen.',
  },
  {
    title: 'Elite',
    body: 'World-class instruction that specializes in jiu jitsu, led by a coach with proven success as a competitor and coach at the highest level of the sport.',
  },
  {
    title: 'Safe',
    body: 'Bathrooms, lockers and mats are cleaned and sterilized daily, and our mats sit on a raised floor for your safety. The most organized, well-supervised martial arts experience around.',
  },
];

/** What a first class looks like. Homepage and Free Trial. */
export const firstClassSteps: Titled[] = [
  {
    title: 'Pick a class',
    body: "Book any class on the schedule. They're all open to first-timers. Kids train Tuesday and Thursday evenings and Saturday mornings; adults can start in Gi Basics, Monday to Thursday at 7 PM.",
  },
  {
    title: 'Arrive 15 minutes early',
    body: 'Meet the staff and Professor Lee, sign a quick waiver and take a tour. A clean gi is provided for your free class. Just wear athletic clothes underneath.',
  },
  {
    title: 'Train at your own pace',
    body: "Warm up, learn the technique of the day and drill it with a partner. Coaches stay close, and you'll leave knowing more than when you walked in.",
  },
];

export interface PathwayStage extends Titled {
  /** Page (and optional anchor) for this stage */
  href: string;
}

/** The progression from first class to competition. Programs index. */
export const pathway: PathwayStage[] = [
  {
    title: 'Start young',
    body: 'Ages 4-7 learn balance, listening, and teamwork through games and gentle drills.',
    href: '/programs/kids#kids-4-7',
  },
  {
    title: 'Build real skill',
    body: 'Ages 8-13 move into technique, drilling, and supervised live rounds.',
    href: '/programs/kids#kids-8-13',
  },
  {
    title: 'Train as an adult',
    body: 'From 14 up, gi classes for every level, whether you are brand new or returning.',
    href: '/programs/bjj',
  },
  {
    title: 'Go fast and compete',
    body: 'No-gi sharpens your game with quicker, more athletic grappling.',
    href: '/programs/no-gi',
  },
];

export interface Feature {
  /** Short label shown in the left column, e.g. "Mats" */
  tag: string;
  title: string;
}

/** What the building has. About page, as compact rows. Placeholder text. */
export const academyFeatures: Feature[] = [
  { tag: 'Mats', title: 'Padded mats, cleaned and sanitized every day' },
  { tag: 'Changing', title: 'Private changing rooms and restrooms' },
  { tag: 'Lockers', title: 'Lockers for your bag and valuables' },
  { tag: 'Lounge', title: 'A seating area where parents can watch class' },
  { tag: 'Day one', title: 'A clean loaner gi for your first class' },
];
