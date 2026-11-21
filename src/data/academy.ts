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
  /** Small line under the title */
  sub: string;
  /** Link after the body text */
  link: { label: string; href: string };
}

/** "How the classes fit together", from shonenjiujitsu.com/programs (client's permission). */
export const pathway: PathwayStage[] = [
  {
    title: 'Kids (4\u20137)',
    sub: 'Games and fundamentals',
    body: 'A playful, structured introduction: mobility, coordination and listening skills, built through jiu jitsu drills and games.',
    link: { label: 'Kids 4\u20137', href: '/programs/kids#kids-4-7' },
  },
  {
    title: 'Kids (8\u201313)',
    sub: 'Technique, focus and supervised sparring',
    body: 'Real grappling technique with a greater focus on the sport, including competition rules and strategy, alongside supportive teammates.',
    link: { label: 'Kids 8\u201313', href: '/programs/kids#kids-8-13' },
  },
  {
    title: 'Gi Basics',
    sub: 'The core concepts for new adults',
    body: 'Where every adult starts: essential positions, escapes and self-defense, taught step by step, Monday to Thursday at 7 PM.',
    link: { label: 'Adult classes', href: '/programs/bjj' },
  },
  {
    title: 'All-Levels, Gi & No-Gi',
    sub: 'Advanced technique and competition-style training',
    body: 'For students with experience: intricate technique, your own individual game, and competition preparation and analysis.',
    link: { label: 'No-Gi', href: '/programs/no-gi' },
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

/** The academy's name as a dictionary entry. Homepage and About. */
export const nameDefinition = {
  word: 'Shōnen',
  /** Shown with a syllable break; screen readers hear `word` */
  display: 'Shō·nen',
  pronunciation: 'show-nuhn',
  partOfSpeech: 'noun',
  meaning:
    'High-action narratives that focus on competitions or fights to decide their storylines. These stories stress values such as self-perfection, self-discipline, and honorable service to community, family, and friends.',
} as const;
