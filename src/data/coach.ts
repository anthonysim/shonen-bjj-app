// The academy's head instructor, from shonenjiujitsu.com (used with the client's permission).

export interface Credential {
  title: string;
  /** Event, org, or year tag shown beside the credential */
  tag: string;
}

export const coach = {
  slug: 'professor-lee-rosenfield',
  /** Legal name, for structured data */
  name: 'Lee Rosenfield',
  honorific: 'Professor',
  /** "Professor Lee Rosenfield": headings */
  displayName: 'Professor Lee Rosenfield',
  /** "Professor Lee": running text and buttons ("Professor Lee's story") */
  shortName: 'Professor Lee',
  /** "Lee": short calls to action ("Book a class with Lee") */
  firstName: 'Lee',
  /** Last word of the display name, set in italic */
  accent: 'Rosenfield',
  title: 'First-degree black belt · Mendes Brothers lineage',
  /** schema.org jobTitle */
  jobTitle: 'Head Instructor, First Degree Brazilian Jiu Jitsu Black Belt',
  /** Homepage spotlight paragraph */
  summary:
    'Professor Lee is a Brazilian Jiu Jitsu black belt under the legendary Mendes Brothers and a former kids and adults instructor at the world-renowned Art of Jiu Jitsu Academy in Costa Mesa, California. Still an active IBJJF black belt competitor, he\u2019s passionate about pushing himself and his students past their limits: the King Midas of teachers, turning his students\u2019 goals into gold.',
  /** Coach page hero */
  intro:
    'First-degree black belt under the legendary Mendes Brothers. Former Art of Jiu Jitsu instructor. IBJJF ranked #2 black belt in 2021 and 2022.',
  bio: [
    'Professor Lee is a Brazilian Jiu Jitsu black belt under the legendary Mendes Brothers. Having been an instructor at the world renown Art of Jiu Jitsu Academy in Costa Mesa, CA, he has gone on to become a top prospect in the adult black belt division. In addition to chasing his dream of becoming black belt world champion, he is passionate about pushing himself and others to surpass their limits.',
    'He brought that same approach from California to Glen Burnie. Whether someone walks in for fitness, for confidence, or to compete, he meets them where they are, from four-year-olds tying their first belt to adults stepping on the mat for the first time, and helps them turn their goals into results.',
  ],
  pullQuote: "The King Midas of teachers, turning his students' goals into gold.",
  /** Where the italic tail of the pull quote starts */
  pullQuoteAccent: 'into gold.',
  /** Short facts for the profile hero */
  facts: ['Mendes Brothers black belt', 'IBJJF No-Gi national champion'],
  /** The four rows in the homepage coach card */
  highlights: [
    { title: 'IBJJF ranked #2 black belt (Gi & No-Gi)', tag: '2021 · 2022' },
    { title: 'Adult Black Belt No-Gi American National Champion', tag: 'IBJJF' },
    { title: 'No-Gi World Championship bronze', tag: 'IBJJF' },
    { title: '5× IBJJF Kids Pan American team titles as a coach', tag: 'AOJ' },
  ] satisfies Credential[],
  /** Competition results */
  competitionRecord: [
    { title: 'IBJJF Adult Black Belt No-Gi American National Champion', tag: 'Nationals' },
    { title: 'IBJJF Adult Black Belt No-Gi World Championship Bronze', tag: 'Worlds' },
    { title: 'IBJJF Masters Black Belt World Championship Bronze', tag: 'Worlds' },
    { title: '2 x IBJJF Adult Black Belt Atlanta Open Champion', tag: '2× Atlanta' },
    { title: '2 x IBJJF Adult Black Belt Miami Open Champion', tag: '2× Miami' },
    { title: 'IBJJF Adult Black Belt New Orleans Open Champion', tag: 'New Orleans' },
    { title: 'IBJJF Adult Black Belt Detroit Open Champion', tag: 'Detroit' },
  ] satisfies Credential[],
  /** Teaching and professional highlights */
  professional: [
    { title: 'IBJJF Ranked #2 Black Belt (Gi/No-Gi)', tag: '2021 · 2022' },
    { title: 'Mendes Brothers First Degree Black Belt', tag: 'Lineage' },
    { title: 'Art of Jiu Jitsu Kids and Adults Instructor', tag: 'AOJ' },
    { title: '5x IBJJF Kids Pan American Team Title (as a coach at AOJ)', tag: 'AOJ' },
  ] satisfies Credential[],
  lineage: [
    'Professor Lee earned his black belt under Rafael and Guilherme Mendes, the Mendes Brothers, whose Art of Jiu Jitsu Academy opened in Costa Mesa, California, in 2012 and became one of the most respected academies in the sport.',
    "He taught kids and adults there, and he coached on the AOJ team that won five IBJJF Kids Pan American team titles. That's the curriculum he teaches at Shonen: modern technique, broken down into details you can actually use, and a class that stays organized from the first bow to the last round.",
  ],
} as const;
