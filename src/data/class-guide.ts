// "Which class is for me?" rows on the schedule page, from shonenjiujitsu.com/schedule (client's
// permission).

export interface GuideItem {
  /** Small label beside the title, e.g. "Start here" */
  tag: string;
  title: string;
  body: string;
  /** Text of the link at the end of the body */
  link: string;
  href: string;
}

export const classGuide: GuideItem[] = [
  {
    tag: 'Ages 4–13',
    title: 'Kids BJJ',
    body: 'Kids 4–7 and 8–13 train in the same 45-minute slot, with games, technique and supervised sparring.',
    link: 'Kids program',
    href: '/programs/kids',
  },
  {
    tag: 'Start here',
    title: 'Gi Basics',
    body: 'The core concepts of jiu jitsu for new adults and teens 14+. The best first class if you’ve never trained.',
    link: 'Adult program',
    href: '/programs/bjj',
  },
  {
    tag: 'Ages 14+',
    title: 'Gi All-Levels',
    body: 'Advanced technique, your individual game and competition-style training, in the gi.',
    link: 'All-Levels',
    href: '/programs/bjj#all-levels',
  },
  {
    tag: 'Ages 14+',
    title: 'No-Gi All-Levels',
    body: 'Faster-paced grappling in a rash guard and shorts. Beginners are welcome; pair it with Gi Basics.',
    link: 'No-Gi program',
    href: '/programs/no-gi',
  },
];
