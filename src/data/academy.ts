// Shared academy copy used on several pages. Placeholder text.

export interface Titled {
  title: string;
  body: string;
}

/** "Why us" pillars. Homepage and About. */
export const values: Titled[] = [
  {
    title: 'Authentic',
    body: 'Real jiu-jitsu with real technique, taught the way it is practiced and competed.',
  },
  {
    title: 'Elite',
    body: 'Coaching from a proven competitor who builds clear, repeatable skills.',
  },
  {
    title: 'Safe',
    body: 'A structured, respectful room where beginners are looked after from day one.',
  },
];

/** What a first class looks like. Homepage and Free Trial. */
export const firstClassSteps: Titled[] = [
  {
    title: 'Pick a class',
    body: 'Choose a time that suits you. We will text to confirm and answer any questions.',
  },
  {
    title: 'Arrive 15 minutes early',
    body: 'Meet your coach, get a tour, and borrow a gi if you need one.',
  },
  {
    title: 'Train at your own pace',
    body: 'Warm up, learn a technique, and drill with a partner. Rest whenever you need to.',
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
