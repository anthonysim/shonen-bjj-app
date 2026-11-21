// FAQ content. Program-page questions are from shonenjiujitsu.com (client's permission).

export type FaqPage = 'kids' | 'bjj' | 'no-gi' | 'birthday' | 'free-trial';

export interface Faq {
  question: string;
  answer: string;
  /** Optional bullet list shown under the answer */
  list?: readonly string[];
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
        question: 'Do I need experience or to be in shape?',
        answer:
          'No. Most of our students walked in with zero grappling experience. Adults can start in Gi Basics, which runs Monday through Thursday at 7 PM and focuses on fundamentals, and your conditioning builds naturally as you train.',
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
        pages: ['free-trial'],
      },
      {
        question: 'What should I wear to no-gi class?',
        answer:
          'A rash guard with shorts that have no zippers or pockets, or leggings. Bring flip-flops or sandals for walking off the mat, and a water bottle.',
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
        question: 'How old does my child need to be to start?',
        answer:
          'Kids can start at age 4. Our kids program has two age groups, 4\u20137 and 8\u201313, so every child trains with partners close to their age and size. Students 14 and older join our adult classes.',
        pages: ['kids'],
      },
      {
        question: 'What should my child wear to the first class?',
        answer:
          'A clean gi is provided for the free class. Have your child wear athletic clothes to go under it, and bring flip-flops or sandals for walking off the mat, plus a water bottle.',
        pages: ['kids'],
      },
      {
        question: 'Will my child get hurt?',
        answer:
          'Safety comes first. Coaches supervise the whole class, kids train with partners their own age and size, and jiu jitsu is a control-first art with no punches or kicks. Mats are deep-cleaned and sanitized before every kids class.',
        pages: ['kids'],
      },
      {
        question: 'Can parents watch?',
        answer:
          'Yes. Parents are welcome to watch from the lounge. Per our academy etiquette, please let the coaches do the coaching and don\u2019t coach from the sideline.',
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
          'The uniform is the main difference. In gi classes, the collar and sleeves can be used for grips, control and submissions, which rewards patient, technical play. No-gi, sometimes called submission grappling, is trained in a rash guard and shorts, so it\u2019s faster paced and closely resembles wrestling. Both share the same fundamentals, and training both makes you a more complete grappler.',
        pages: ['bjj'],
      },
      {
        question: 'Is jiu jitsu good for self-defense?',
        answer:
          'Yes. Brazilian Jiu Jitsu was developed as a way to defend yourself against an attacker who is larger, stronger, faster and more aggressive, using leverage, grappling and submission holds to level the playing field. Royce Gracie proved it at UFC 1, and BJJ has since been adopted into the defensive tactics curriculum of every major branch of the US Armed Forces. It\u2019s an excellent martial art for realistic self-defense.',
        pages: ['bjj'],
      },
      {
        question: 'Do women train here?',
        answer: 'Yes. Our classes are mixed, welcoming, and run with attention to safe partnering.',
      },
      {
        question: 'Are students from other academies welcome?',
        answer: 'Yes. We\u2019re focused on community, so everyone is welcome at Shonen.',
        pages: ['bjj'],
      },
      {
        question: 'I\u2019m new. Can I start with no-gi?',
        answer:
          'Yes. Beginners are welcome in the No-Gi All-Levels class. We recommend pairing it with Gi Basics, Monday to Thursday at 7 PM, where you\u2019ll build the fundamentals both styles share.',
        pages: ['no-gi'],
      },
      {
        question: 'Do you compete?',
        answer:
          'Many of our members do, and Professor Lee is an active IBJJF black belt competitor. Competition is encouraged but never required. Plenty of students train purely for fitness, self-defense and fun.',
        pages: ['no-gi'],
      },
      {
        question: 'What makes this academy different?',
        answer: 'Clear coaching, a safe room, and a real community on and off the mats.',
      },
      {
        question: 'What does it cost?',
        answer:
          'Your first class is free and there are no sign-up fees. Ask us about current membership options.',
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

/** The free-trial page's "First-class questions", from the original site. */
export const firstClassFaqs: Faq[] = [
  {
    question: 'Do I need experience or to be in shape to start?',
    answer:
      'No. Most of our students walked in with zero grappling experience. Adults can start in our Gi Basics class, which runs Monday through Thursday at 7:00 PM and focuses on fundamentals, and your conditioning will build naturally as you train.',
  },
  {
    question: 'What should I wear to my first class?',
    answer:
      'A clean gi is provided for your free class, so wear an athletic top and pants or shorts to go under it. Please remove jewelry, trim your nails and bring flip-flops or sandals for walking off the mat, plus a water bottle. For no-gi classes, wear a rashguard and shorts without zippers or pockets.',
  },
  {
    question: 'When should I arrive for my first class?',
    answer:
      'Please try to arrive fifteen minutes early so you can meet the staff and instructor, sign a waiver, and take a tour of the facility.',
  },
  {
    question: 'Can parents watch?',
    answer:
      "Yes. Parents are welcome to watch from the lounge. Per our code of conduct, please don't coach from the sideline; our coaches have it covered.",
  },
];

/** Groups shown on the full /faq page, with etiquette as the last group. */
export const faqPageGroups: FaqGroup[] = [
  ...faqGroups.filter((group) => group.onFaqPage !== false),
  {
    id: 'etiquette',
    title: 'Academy etiquette',
    items: [
      {
        question: 'What is the academy code of conduct?',
        answer: 'A few simple rules keep training safe, clean and friendly for everyone:',
        list: etiquette,
      },
    ],
  },
];

/** Short FAQ list for a page (questions tagged for it), in group order. */
export function faqsFor(page: FaqPage): Faq[] {
  return faqGroups.flatMap((group) => group.items.filter((item) => item.pages?.includes(page)));
}
