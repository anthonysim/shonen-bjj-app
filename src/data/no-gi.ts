// Copy for the no-gi program page, from shonenjiujitsu.com/programs/no-gi (client's permission).

export interface Comparison {
  id: string;
  /** Small label above the title, e.g. "The uniform" */
  label: string;
  title: string;
  blurb: string;
  rows: { label: string; value: string }[];
}

export const comparison: Comparison[] = [
  {
    id: 'gi',
    label: 'The uniform',
    title: 'Gi',
    blurb: 'The uniform is used for grips and control, which rewards patient, technical play.',
    rows: [
      { label: 'Wear', value: 'A white, black or royal-blue gi' },
      { label: 'Classes', value: 'Gi Basics & All-Levels' },
    ],
  },
  {
    id: 'no-gi',
    label: 'Submission grappling',
    title: 'No-Gi',
    blurb: 'No collar or sleeves, so the game is faster and more athletic.',
    rows: [
      { label: 'Wear', value: 'Rash guard & shorts' },
      { label: 'Classes', value: 'No-Gi All-Levels, Tue & Thu' },
    ],
  },
];

/** Static rows for "The details". "When" is added from the schedule. */
export const noGiDetails = [
  {
    label: 'Wear',
    value: 'A rash guard and shorts without zippers or pockets, or leggings',
  },
  {
    label: 'Level',
    value: 'All levels. Beginners should also take Gi Basics, Monday to Thursday at 7 PM',
  },
  { label: 'Ages', value: '14 and up' },
] as const;
