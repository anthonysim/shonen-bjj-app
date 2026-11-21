// Copy for the no-gi program page. Placeholder text.

export interface Comparison {
  id: string;
  title: string;
  blurb: string;
  rows: { label: string; value: string }[];
}

export const comparison: Comparison[] = [
  {
    id: 'gi',
    title: 'Gi',
    blurb: 'The traditional uniform. Grips on the jacket and belt shape the game.',
    rows: [
      { label: 'Wear', value: 'A gi (jacket, pants, belt). Loaners for your first class.' },
      { label: 'Classes', value: 'Adults Basics and All-Levels, across the week.' },
    ],
  },
  {
    id: 'no-gi',
    title: 'No-Gi',
    blurb: 'Fast, close to wrestling, and just as technical. Control comes from the body.',
    rows: [
      { label: 'Wear', value: 'A fitted rash guard and shorts with no pockets or zippers.' },
      { label: 'Classes', value: 'No-Gi nights, plus a no-gi All-Levels option.' },
    ],
  },
];

/** Static rows for "The details". "When" is added from the schedule. */
export const noGiDetails = [
  { label: 'Wear', value: 'Rash guard and shorts, no pockets or zippers' },
  { label: 'Level', value: 'All levels. We suggest a few Basics classes first.' },
  { label: 'Ages', value: '14 and up' },
] as const;

export const competitionBlurb =
  'Our coaches compete at the highest level, and that experience shapes how we teach grappling. Here is a taste of the results.';
