// Copy for the adults program page, from shonenjiujitsu.com/programs/bjj (client's permission).
import type { Titled } from './academy';

export interface Track {
  id: string;
  /** Small label above the name, e.g. "Start here" */
  label: string;
  name: string;
  blurb: string;
  bullets: string[];
  /** "60 minutes, gi". Shown as a "Class" row when the track has one kind of class. */
  classInfo?: string;
  /** Schedule class ids, in display order (see `schedule` in schedule.ts) */
  classIds: string[];
}

export const tracks: Track[] = [
  {
    id: 'gi-basics',
    label: 'Start here',
    name: 'Gi Basics',
    blurb:
      'A curriculum built to teach the core concepts of jiu jitsu. Perfect for new students, or anyone upgrading to the most modern, effective style.',
    bullets: [
      'Essential techniques & positions',
      'Self-defense',
      'Fitness, balance & flexibility',
      'Positional and live sparring',
      'Personalized instructor feedback',
    ],
    classInfo: '60 minutes, gi',
    classIds: ['adults-basics'],
  },
  {
    id: 'all-levels',
    label: 'Gi & No-Gi',
    name: 'All-Levels',
    blurb:
      'For those with experience who want to go further: intricate technique, development of your individual game, and competition preparation and analysis.',
    bullets: [
      'Modern and advanced jiu jitsu',
      'Development of your individual game',
      'Positional, situational and live sparring',
      'Competition preparation and analysis',
    ],
    classIds: [
      'adults-all-levels-evening',
      'adults-all-levels-noon',
      'adults-all-levels-saturday',
      'no-gi',
    ],
  },
];

export const adultClassSteps: Titled[] = [
  { title: 'Warm-up', body: 'Movement drills that prepare your body for grappling.' },
  { title: 'Technique', body: 'The position of the day, broken down in detail.' },
  { title: 'Drilling', body: 'Reps with a partner, with instructor feedback as you go.' },
  {
    title: 'Positional sparring',
    body: 'Start from the day’s position and work it against resistance.',
  },
  {
    title: 'Live rounds',
    body: 'Timed rounds against a resisting partner, at the level you’re ready for.',
  },
  { title: 'Q&A', body: 'Ask questions and get personal feedback on your game.' },
];

export const neverTrained = {
  heading: 'Most of our members started from zero.',
  accent: 'started from zero.',
  body: [
    'You don’t need experience or to be in shape. Adults start in Gi Basics, your conditioning builds naturally, and your training partners want to see you succeed.',
  ],
};

export const womens = {
  heading: 'A safe place for women to train and compete.',
  accent: 'train and compete.',
  body: [
    'Shonen offers a safe environment for women to learn and feel empowered: learn to protect yourself, build awareness and grow your confidence, while taking your fitness to the next level. The women’s jiu jitsu community is growing fast. If you’ve tried jiu jitsu elsewhere and had a negative experience, give our program a chance. We’re confident it will win you back to the mat.',
  ],
};
