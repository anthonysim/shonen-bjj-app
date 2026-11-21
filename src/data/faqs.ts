// FAQ content from shonenjiujitsu.com (client's permission): the /faq page's groups, plus the
// short lists on each program page, which word some answers differently from /faq.
//
// Answers are plain text with two light conventions: a blank line ("\n\n") starts a new paragraph,
// and [text](/path) is a link. `answerParts` and `answerText` read them.

export type FaqPage = 'kids' | 'bjj' | 'no-gi' | 'birthday';

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
        question: 'What is Brazilian Jiu Jitsu?',
        answer:
          'Brazilian Jiu Jitsu (BJJ) is a grappling martial art built on leverage, timing and technique rather than size or strength. Students learn to control an opponent, escape bad positions and finish with safe submissions, which makes it one of the most practical self-defense arts for kids and adults alike.',
      },
      {
        question: 'Do you offer a free trial class?',
        answer:
          'Yes. Every class on our schedule is open to first-timers, so you or your child can try a real class before committing to anything. [Book a free class online](/free-trial) and we’ll have a clean gi ready for your first visit.',
      },
      {
        question: 'Do I need experience or to be in shape to start?',
        answer:
          'No. Most of our students walked in with zero grappling experience. Adults can start in our Gi Basics class, which runs Monday through Thursday at 7:00 PM and focuses on fundamentals, and your conditioning will build naturally as you train.',
      },
      {
        question: 'When should I arrive for my first class?',
        answer:
          'Please try to arrive fifteen minutes early so you can meet the staff and instructor, sign a waiver, and take a tour of the facility.',
      },
      {
        question: 'How can I get started?',
        answer:
          'Please [sign up for a free class](/free-trial) or come into the academy and a staff member will be more than happy to get you signed up. We look forward to meeting you!',
      },
    ],
  },
  {
    id: 'what-to-wear',
    title: 'What to wear & bring',
    items: [
      {
        question: 'What should I bring to my first class?',
        answer:
          'Footwear is required off the mat, so we recommend you bring some flip-flops or sandals. If you have a white, black or royal blue gi of your own, you are welcome to bring it. If you are doing your free class, a clean uniform will be provided. Please wear an athletic top and pants comfortable to work out in to be worn under the gi.\n\nFor no-gi classes, shorts without zippers or pockets and a rashguard are required. A water bottle is highly recommended. We have water and other refreshments available at the academy.',
      },
      {
        question: 'I don’t own a gi. Do I need one?',
        answer:
          'No. A clean gi will be provided for your free class. Gis are available to rent or buy at the academy.',
      },
      {
        question: 'What color gis are allowed?',
        answer: 'Any IBJJF approved gi (white, black, or royal blue) is allowed at the academy.',
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
          'Kids can start at age 4. Our [kids classes](/programs/kids) are grouped into ages 4–7 and 8–13, so every child trains with partners close to their age and size. Students 14 and older join our adult classes.',
      },
      {
        question: 'Why choose jiu jitsu for my child over other martial arts?',
        answer:
          'Jiu Jitsu has a strong focus on controlling situations as safely as possible. Unlike most other martial arts with punching and kicking, Jiu Jitsu allows the opportunity for live sparring against fully resisting opponents without the risk of a punch or kick to the head. Your child will be well prepared to deal with bullies or an attacker, as it won’t be the first time someone has put their hands on them.\n\nAt Shonen, we will teach your children the necessary skills to stand up for themselves. Jiu Jitsu is also a great sport and athletic endeavor for your child, and our instructor has an outstanding pedigree training kids to become some of the world’s greatest Jiu Jitsu athletes.',
      },
    ],
  },
  {
    id: 'training',
    title: 'Training at Shonen',
    items: [
      {
        question: 'What is the difference between gi and no-gi?',
        answer:
          'The use of the uniform is the main difference between the two. In gi classes, the uniform can be utilized for techniques and movements to gain control and submissions. No-gi, sometimes referred to as submission grappling, is often faster paced and closely resembles wrestling. In this class, you wear a rash guard and shorts, or leggings.\n\nBoth gi and no-gi share many fundamental similarities, and both styles have become widely popular sports that you can watch or compete in. When you begin training with us, you’ll find that both styles complement each other greatly.',
      },
      {
        question: 'Is jiu jitsu good for self-defense?',
        answer:
          'Brazilian Jiu Jitsu was originally developed as a form of self defense that would be ideal if you found yourself in a situation where you must defend against an attacker that is larger, stronger, faster, and more aggressive than you, by focusing on grappling and submission holds as a means to level the playing field.\n\nJiu Jitsu exploded in popularity after UFC 1, when Royce Gracie demonstrated that a skilled grappler can overcome a physically imposing striker by using leverage and technique. BJJ has since been adopted into the defensive tactics curriculum for all major branches of the US Armed Forces due to its efficiency and history of success. It is an excellent martial art to learn as a form of realistic self defense.',
      },
      {
        question: 'I’m a woman. Is jiu jitsu right for me?',
        answer:
          'Shonen Jiu Jitsu offers a safe environment for women to learn and feel empowered. The benefits include learning how to protect yourself, developing awareness and increasing self confidence. Our modern style of Jiu Jitsu is also a great way to take your fitness routine to the next level, and competition gives you a chance to challenge yourself mentally and physically.\n\nThe women’s Jiu Jitsu community is rapidly growing and a great place to share your passion and support one another. If you’ve tried BJJ at another school and had a negative experience, give our program a chance and we guarantee it will win you back to the mat.',
      },
      {
        question: 'Are students from other academies welcome?',
        answer: 'Yes. We’re focused on community, so everyone is welcome at Shonen Jiu Jitsu.',
      },
      {
        question: 'What makes Shonen different from other schools in Anne Arundel County?',
        answer:
          'Our head instructor, [Professor Lee Rosenfield](/team/professor-lee-rosenfield), is an active IBJJF black belt competitor who was ranked number two in 2021 and 2022. He coached kids and adults at the Art of Jiu Jitsu Academy in California, and he brings that same world-class curriculum to every class here in Glen Burnie, in an academy that is cleaned and sterilized every day.',
      },
      {
        question: 'Do you charge an enrollment fee?',
        answer:
          'Absolutely not. Sign-up fees and other hidden fees are a completely made up way to exploit clients, and are unfortunately a common practice in martial arts schools. There are no sign-up fees at Shonen.',
      },
    ],
  },
  {
    id: 'kids-page',
    title: 'Kids page',
    onFaqPage: false,
    items: [
      {
        question: 'How old does my child need to be to start?',
        answer:
          'Kids can start at age 4. Our kids program has two age groups, 4–7 and 8–13, so every child trains with partners close to their age and size. Students 14 and older join our adult classes.',
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
          'Yes. Parents are welcome to watch from the lounge. Per our academy etiquette, please let the coaches do the coaching and don’t coach from the sideline.',
        pages: ['kids'],
      },
    ],
  },
  {
    id: 'adults-page',
    title: 'Adults page',
    onFaqPage: false,
    items: [
      {
        question: 'Do I need experience or to be in shape?',
        answer:
          'No. Most of our students walked in with zero grappling experience. Adults can start in Gi Basics, which runs Monday through Thursday at 7 PM and focuses on fundamentals, and your conditioning builds naturally as you train.',
        pages: ['bjj'],
      },
      {
        question: 'What is the difference between gi and no-gi?',
        answer:
          'The uniform is the main difference. In gi classes, the collar and sleeves can be used for grips, control and submissions, which rewards patient, technical play. No-gi, sometimes called submission grappling, is trained in a rash guard and shorts, so it’s faster paced and closely resembles wrestling. Both share the same fundamentals, and training both makes you a more complete grappler.',
        pages: ['bjj'],
      },
      {
        question: 'Is jiu jitsu good for self-defense?',
        answer:
          'Yes. Brazilian Jiu Jitsu was developed as a way to defend yourself against an attacker who is larger, stronger, faster and more aggressive, using leverage, grappling and submission holds to level the playing field. Royce Gracie proved it at UFC 1, and BJJ has since been adopted into the defensive tactics curriculum of every major branch of the US Armed Forces. It’s an excellent martial art for realistic self-defense.',
        pages: ['bjj'],
      },
      {
        question: 'Are students from other academies welcome?',
        answer: 'Yes. We’re focused on community, so everyone is welcome at Shonen.',
        pages: ['bjj'],
      },
    ],
  },
  {
    id: 'no-gi-page',
    title: 'No-gi page',
    onFaqPage: false,
    items: [
      {
        question: 'What should I wear to no-gi class?',
        answer:
          'A rash guard with shorts that have no zippers or pockets, or leggings. Bring flip-flops or sandals for walking off the mat, and a water bottle.',
        pages: ['no-gi'],
      },
      {
        question: 'I’m new. Can I start with no-gi?',
        answer:
          'Yes. Beginners are welcome in the No-Gi All-Levels class. We recommend pairing it with Gi Basics, Monday to Thursday at 7 PM, where you’ll build the fundamentals both styles share.',
        pages: ['no-gi'],
      },
      {
        question: 'Do you compete?',
        answer:
          'Many of our members do, and Professor Lee is an active IBJJF black belt competitor. Competition is encouraged but never required. Plenty of students train purely for fitness, self-defense and fun.',
        pages: ['no-gi'],
      },
    ],
  },
  {
    id: 'birthday-parties',
    title: 'Birthday parties',
    onFaqPage: false,
    items: [
      {
        question: 'What ages are the parties for?',
        answer: 'Our jiu jitsu birthday parties are designed for kids ages 4 to 13.',
        pages: ['birthday'],
      },
      {
        question: 'Do guests need any jiu jitsu experience?',
        answer:
          'No. Every game is taught from scratch by our coaches, so first-timers fit right in.',
        pages: ['birthday'],
      },
      {
        question: 'Can parents stay?',
        answer: 'Yes. Parents are welcome to stay and watch from our lounge.',
        pages: ['birthday'],
      },
      {
        question: 'How do I book a party?',
        answer:
          'Fill in the form on this page and choose “Birthday party”. We’ll call you to find a date and plan the details together.',
        pages: ['birthday'],
      },
    ],
  },
];

/** Academy code of conduct, shown as a bulleted list in the FAQ page's last group. */
export const etiquette: string[] = [
  'All students and visitors must wear a washed and clean gi or no-gi uniform.',
  'Absolutely no coaching your child or other students. You will be asked to leave if you do so.',
  'No photo or video recording allowed during class.',
  'Address black belt instructors as “Professor”, and all non black belt instructors as “Coach”.',
  'If you are late to class, please wait outside the matted area until the Professor gives you permission to join.',
  'Nails must be neatly trimmed. Please remove all jewelry during training.',
  'Food and drinks are not allowed on the mat.',
  'No shoes while on the mat. Shoes or sandals must be worn off the mat.',
  'Clean your feet with the provided wipes if they are dirty before stepping onto the mat.',
  'Show respect to your instructors and training partners.',
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
      'Yes. Parents are welcome to watch from the lounge. Per our code of conduct, please don’t coach from the sideline; our coaches have it covered.',
  },
];

/** Groups shown on the full /faq page, with etiquette as the last group. */
export const faqPageGroups: FaqGroup[] = [
  ...faqGroups.filter((group) => group.onFaqPage !== false),
  {
    id: 'etiquette',
    title: 'Academy etiquette',
    items: [{ question: 'What is the academy’s code of conduct?', answer: '', list: etiquette }],
  },
];

/** Short FAQ list for a page (questions tagged for it), in group order. */
export function faqsFor(page: FaqPage): Faq[] {
  return faqGroups.flatMap((group) => group.items.filter((item) => item.pages?.includes(page)));
}

export type AnswerPart = { text: string; href?: string };

/** An answer split into paragraphs, each a run of text and link parts. */
export function answerParts(answer: string): AnswerPart[][] {
  return answer
    .split('\n\n')
    .filter((paragraph) => paragraph.trim() !== '')
    .map((paragraph) =>
      paragraph
        .split(/(\[[^\]]+\]\([^)]+\))/)
        .filter((part) => part !== '')
        .map((part) => {
          const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
          return link ? { text: link[1], href: link[2] } : { text: part };
        }),
    );
}

/** Plain text of an answer and its list, for structured data. */
export function answerText(item: Pick<Faq, 'answer' | 'list'>): string {
  const prose = answerParts(item.answer)
    .map((paragraph) => paragraph.map((part) => part.text).join(''))
    .join(' ');
  return [prose, ...(item.list ?? [])].filter(Boolean).join(' ');
}
