// Placeholder coach profile. Replace with the real academy's coach.

export interface Credential {
  title: string;
  /** Event, org, or year tag shown beside the credential */
  tag: string;
}

export const coach = {
  slug: 'head-coach',
  name: 'Alex Morgan',
  title: 'Head Coach and Black Belt',
  summary: 'Competitor, teacher, and the reason the mats feel like a community.',
  bio: [
    'Alex started jiu-jitsu as a teenager and never stopped. Two decades later, the goal is the same: help every student get a little better every week.',
    'Classes blend clear technique, honest drilling, and live rounds at a pace that fits each person, whether they are four years old or forty.',
  ],
  pullQuote: 'Show up, stay curious, and the rest takes care of itself.',
  /** Competition results, shown as a numbered list */
  competitionRecord: [
    { title: 'World Championship, Black Belt', tag: '2024' },
    { title: 'Pan American Championship, Gold', tag: '2023' },
    { title: 'National Championship, Gold', tag: '2022' },
    { title: 'Regional Open, Gold (x3)', tag: '2019-2021' },
  ] satisfies Credential[],
  /** Teaching and professional highlights */
  professional: [
    { title: 'Certified instructor', tag: 'Federation' },
    { title: 'Youth safety and first-aid trained', tag: 'Current' },
    { title: 'Over 15 years coaching kids and adults', tag: 'Experience' },
  ] satisfies Credential[],
  lineage:
    'Trained under a respected lineage of black belts and carries that standard of technique and etiquette into every class.',
} as const;
