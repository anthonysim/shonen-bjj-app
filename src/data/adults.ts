// Copy for the adults program page. Placeholder text.
import type { Titled } from './academy';

export interface Track {
  id: string;
  name: string;
  blurb: string;
  bullets: string[];
  length: string;
  attire: string;
  /** Schedule class ids, in display order (see `schedule` in schedule.ts) */
  classIds: string[];
}

export const tracks: Track[] = [
  {
    id: 'gi-basics',
    name: 'Gi Basics',
    blurb: 'A structured starting point. Learn the fundamentals in a patient, beginner-only room.',
    bullets: [
      'Built for brand-new students',
      'Core positions, escapes, and submissions',
      'Slow, clear instruction with lots of repetition',
      'Light, optional positional drilling',
      'A loaner gi for your first classes',
    ],
    length: '60 min',
    attire: 'Gi (loaner available)',
    classIds: ['adults-basics'],
  },
  {
    id: 'all-levels',
    name: 'All-Levels',
    blurb:
      'Open to everyone. Beginners and experienced students train together, at their own pace.',
    bullets: [
      'Technique that builds on the basics',
      'Partner drilling and positional sparring',
      'Live rounds when you are ready',
      'Gi and no-gi options through the week',
    ],
    length: '60-90 min',
    attire: 'Gi or no-gi, depending on the class',
    classIds: [
      'adults-all-levels-evening',
      'adults-all-levels-noon',
      'adults-all-levels-saturday',
      'no-gi',
    ],
  },
];

export const adultClassSteps: Titled[] = [
  { title: 'Warm-up', body: 'Easy movement drills loosen you up and get you breathing.' },
  { title: 'Technique', body: 'The coach demonstrates one idea, step by step, from a few angles.' },
  { title: 'Drilling', body: 'You practice it with a partner while coaches correct and help.' },
  {
    title: 'Positional sparring',
    body: 'Start from a set position and work on just that part of the game.',
  },
  { title: 'Live rounds', body: 'Optional, controlled sparring. Sit out any round you like.' },
  { title: 'Q&A', body: 'We close with questions, a bow, and a plan for next time.' },
];

export const neverTrained = {
  heading: 'Never trained? Start here.',
  accent: 'Start here.',
  body: [
    'Most of our students walked in with no experience at all. Nobody expects you to know anything, and nobody is keeping score.',
    'Come to a Basics class, borrow a gi, and take it at your own speed. We will show you where to stand and what to do.',
  ],
};

export const womens = {
  heading: 'Women are welcome here.',
  accent: 'welcome here.',
  body: [
    'Our adult classes are mixed, respectful, and run with careful attention to how people partner up.',
    'Many of our newest students are women who wanted a confident, practical way to train. You will find training partners at every size and level.',
  ],
};
