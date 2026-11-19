// Placeholder FAQ content. Replace with the academy's real answers.

export type FaqPage = 'kids' | 'bjj' | 'no-gi' | 'birthday' | 'free-trial';

export interface Faq {
  question: string;
  answer: string;
  /** Pages that show this question in their short FAQ list */
  pages?: FaqPage[];
}

export interface FaqGroup {
  id: string;
  title: string;
  items: Faq[];
  /** False for groups that only appear in a program page's short list. Default true. */
  onFaqPage?: boolean;
}

export const faqGroups: FaqGroup[] = [
  {
    id: 'getting-started',
    title: 'Getting started',
    items: [
      {
        question: 'Do I need experience?',
        answer: 'No. Most students start with none, and our basics classes assume you are new.',
        pages: ['bjj', 'free-trial'],
      },
      {
        question: 'Is the first class really free?',
        answer: 'Yes. Book a time, show up 15 minutes early, and try a full class with no strings.',
        pages: ['free-trial'],
      },
      {
        question: 'How do I book?',
        answer: 'Use the booking form on any page. We will text you to confirm a time.',
      },
      {
        question: 'How fit do I need to be?',
        answer: 'You will get fit by training. Go at your own pace and rest whenever you need to.',
        pages: ['bjj'],
      },
      {
        question: 'Can I just watch first?',
        answer: 'Of course. Parents and curious adults are welcome to watch a class.',
        pages: ['free-trial'],
      },
    ],
  },
  {
    id: 'what-to-wear',
    title: 'What to wear and bring',
    items: [
      {
        question: 'What should I wear to my first class?',
        answer:
          'Athletic clothes with no zippers or pockets. We can lend you a gi for the first class.',
        pages: ['bjj', 'free-trial'],
      },
      {
        question: 'What do I wear for no-gi?',
        answer: 'A fitted rash guard and athletic shorts with no pockets or zippers.',
        pages: ['no-gi'],
      },
      {
        question: 'What should I bring?',
        answer: 'A water bottle and a towel. Everything else is on the mats.',
      },
    ],
  },
  {
    id: 'kids',
    title: 'Kids',
    items: [
      {
        question: 'What age can my child start?',
        answer: 'Kids can start at 4. We group classes by age so every child trains with peers.',
        pages: ['kids'],
      },
      {
        question: 'Is jiu-jitsu safe for kids?',
        answer:
          'Yes. Classes are supervised and structured, with a focus on control and respect rather than striking.',
        pages: ['kids'],
      },
      {
        question: 'Can I stay and watch?',
        answer: 'Yes. Parents are welcome to watch from the seating area.',
        pages: ['kids'],
      },
      {
        question: 'What if my child is shy?',
        answer:
          'That is common. Coaches ease new students in, and most kids open up within a few classes.',
        pages: ['kids'],
      },
    ],
  },
  {
    id: 'training',
    title: 'Training here',
    items: [
      {
        question: 'What is the difference between gi and no-gi?',
        answer:
          'Gi classes use a jacket and belt for grips. No-gi is faster and uses shorts and a rash guard.',
        pages: ['bjj', 'no-gi'],
      },
      {
        question: 'Is jiu-jitsu good for self-defense?',
        answer: 'It is one of the most effective ways to learn control against a larger opponent.',
        pages: ['bjj'],
      },
      {
        question: 'Do women train here?',
        answer: 'Yes. Our classes are mixed, welcoming, and run with attention to safe partnering.',
        pages: ['bjj'],
      },
      {
        question: 'I train at another academy. Can I drop in?',
        answer: 'Usually yes. Contact us first so we can plan for you.',
      },
      {
        question: 'What makes this academy different?',
        answer: 'Clear coaching, a safe room, and a real community on and off the mats.',
      },
      {
        question: 'What does it cost?',
        answer:
          'Your first class is free and there are no sign-up fees. Ask us about current membership options.',
        pages: ['bjj', 'no-gi', 'kids'],
      },
    ],
  },
  {
    id: 'birthday-parties',
    title: 'Birthday parties',
    onFaqPage: false,
    items: [
      {
        question: 'How long is a party?',
        answer: 'About 90 minutes, including a short class, games, and time for cake.',
        pages: ['birthday'],
      },
      {
        question: 'How many kids can come?',
        answer: 'Groups of up to 15 work well. Ask us about larger parties.',
        pages: ['birthday'],
      },
      {
        question: 'Can we bring food?',
        answer: 'Yes. Bring cake and snacks; we will set up a space for them.',
        pages: ['birthday'],
      },
      {
        question: 'Do guests need experience?',
        answer: 'No. Coaches lead everything and keep it fun for first-timers.',
        pages: ['birthday'],
      },
    ],
  },
];

/** Academy etiquette rules, shown as a bulleted list on the FAQ page. */
export const etiquette: string[] = [
  'Arrive 10-15 minutes early and bow when you step on or off the mats.',
  'Keep your gi and body clean, and trim fingernails and toenails.',
  'Take off shoes before stepping on the mats.',
  'No jewelry on the mats.',
  'Respect your partners and coaches, and tap early and often.',
  'Tell your coach about any injuries before class.',
  'Keep phones off the mats.',
  'Stay hydrated and rest when you need to.',
  'Leave the academy clean.',
  'Be kind. Everyone was a beginner once.',
];

/** Groups shown on the full /faq page. */
export const faqPageGroups: FaqGroup[] = faqGroups.filter((group) => group.onFaqPage !== false);

/** Short FAQ list for a page (questions tagged for it), in group order. */
export function faqsFor(page: FaqPage): Faq[] {
  return faqGroups.flatMap((group) => group.items.filter((item) => item.pages?.includes(page)));
}
