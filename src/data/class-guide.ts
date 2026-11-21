// "Class guide" cards on the schedule page. Placeholder text.

export interface GuideItem {
  tag: string;
  title: string;
  body: string;
  href: string;
}

export const classGuide: GuideItem[] = [
  {
    tag: 'Kids',
    title: 'Kids 4-7',
    body: 'Playful classes that build listening, balance, and coordination.',
    href: '/programs/kids#kids-4-7',
  },
  {
    tag: 'Kids',
    title: 'Kids 8-13',
    body: 'Real technique, drilling, and supervised live rounds.',
    href: '/programs/kids#kids-8-13',
  },
  {
    tag: 'Adults gi',
    title: 'Adults Basics',
    body: 'The best place to start. Fundamentals in a patient, beginner-only room.',
    href: '/programs/bjj#tracks',
  },
  {
    tag: 'No-gi',
    title: 'No-Gi',
    body: 'Fast, athletic grappling in a rash guard and shorts.',
    href: '/programs/no-gi',
  },
];
