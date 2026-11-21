// Page titles and meta descriptions, from shonenjiujitsu.com (client's permission).
// BaseLayout looks a page up here by its path and falls back to its own `title` and `description`.

export interface PageMeta {
  /** The full <title>, suffix included */
  title: string;
  description: string;
}

export const pageMeta: Record<string, PageMeta> = {
  '/': {
    title: 'Brazilian Jiu Jitsu in Glen Burnie, MD | Shonen Jiu Jitsu',
    description:
      'Brazilian Jiu Jitsu for kids and adults in Glen Burnie, MD, taught by IBJJF black belt Professor Lee Rosenfield. No sign-up fees. Your first class is free.',
  },
  '/programs': {
    title: 'Jiu Jitsu Programs for Kids & Adults | Shonen Jiu Jitsu',
    description:
      'Kids (4–7, 8–13), adult gi and no-gi Brazilian Jiu Jitsu and birthday parties in Glen Burnie, MD. Classes grouped by age. Your first class is free.',
  },
  '/programs/kids': {
    title: 'Kids Jiu Jitsu Classes (Ages 4–13) in Glen Burnie | Shonen',
    description:
      'Kids Brazilian Jiu Jitsu for ages 4–7 and 8–13 in Glen Burnie, MD. Confidence, focus and real self-defense, taught by an IBJJF black belt. First class free.',
  },
  '/programs/bjj': {
    title: 'Adult Brazilian Jiu Jitsu Classes in Glen Burnie | Shonen',
    description:
      'Adult BJJ (14+) in Glen Burnie, MD: Gi Basics for beginners, All-Levels and No-Gi classes with IBJJF black belt Lee Rosenfield. No sign-up fees. First class free.',
  },
  '/programs/no-gi': {
    title: 'No-Gi Jiu Jitsu Classes in Glen Burnie, MD | Shonen Jiu Jitsu',
    description:
      'No-gi Brazilian Jiu Jitsu (submission grappling) Tuesdays and Thursdays in Glen Burnie, MD, taught by an IBJJF no-gi national champion. Try a free class.',
  },
  '/programs/birthday-parties': {
    title: 'Kids Jiu Jitsu Birthday Parties in Glen Burnie | Shonen',
    description:
      'Host your child’s birthday on the mats. Coach-led jiu jitsu birthday parties for ages 4–13 in Glen Burnie, MD. Safe, active and unforgettable. Plan yours today.',
  },
  '/schedule': {
    title: 'Class Schedule | Shonen Jiu Jitsu, Glen Burnie MD',
    description:
      'Weekly Brazilian Jiu Jitsu class schedule at Shonen Jiu Jitsu in Glen Burnie: kids classes Tue, Thu & Sat; adult gi and no-gi classes six days a week. First class free.',
  },
  '/free-trial': {
    title: 'Free Jiu Jitsu Class in Glen Burnie, MD | Shonen Jiu Jitsu',
    description:
      'Book a free Brazilian Jiu Jitsu class for kids or adults in Glen Burnie, MD. Every class is open to first-timers, and a clean gi is provided. No sign-up fees.',
  },
  '/about': {
    title: 'About Our Academy | Shonen Jiu Jitsu, Glen Burnie MD',
    description:
      'Shonen Jiu Jitsu is a Glen Burnie, MD Brazilian Jiu Jitsu academy led by Mendes Brothers black belt Lee Rosenfield. Clean, organized, welcoming. No sign-up fees.',
  },
  '/team/professor-lee-rosenfield': {
    title: 'Professor Lee Rosenfield, BJJ Black Belt | Shonen Jiu Jitsu',
    description:
      'Meet Professor Lee Rosenfield: Mendes Brothers black belt, former Art of Jiu Jitsu instructor and IBJJF no-gi national champion, teaching in Glen Burnie, MD.',
  },
  '/contact': {
    title: 'Contact & Directions | Shonen Jiu Jitsu, Glen Burnie MD',
    description:
      'Visit Shonen Jiu Jitsu at 7389 Baltimore Annapolis Blvd, Glen Burnie, MD 21061 (Cromwell Field Shopping Center). Call (443) 304-8884 or book a free class online.',
  },
  '/faq': {
    title: 'FAQ: Starting Jiu Jitsu at Shonen Jiu Jitsu, Glen Burnie',
    description:
      'Answers to common questions about Brazilian Jiu Jitsu at Shonen: free trial class, what to wear, kids ages, gi vs no-gi, etiquette and fees. No sign-up fees.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Shonen Jiu Jitsu',
    description:
      'Privacy Policy for Shonen Jiu Jitsu. Learn how we collect, use, and protect your personal information.',
  },
  '/terms-and-conditions': {
    title: 'Terms & Conditions | Shonen Jiu Jitsu',
    description:
      'Terms and Conditions for Shonen Jiu Jitsu. Review our terms of service and usage policies.',
  },
  '/waiver': {
    title: 'Waiver & Release | Shonen Jiu Jitsu',
    description: 'Waiver for Shonen Jiu Jitsu. Review our liability waiver and release form.',
  },
  '/blog': {
    title: 'Blog | Shonen Jiu Jitsu, Glen Burnie MD',
    description:
      'Training advice, beginner guides and parent tips from Shonen Jiu Jitsu, a Brazilian Jiu Jitsu academy for kids and adults in Glen Burnie, MD.',
  },
  '/blog/starting-jiu-jitsu-after-35': {
    title: "Starting Jiu Jitsu After 35: It's Not Too Late | Shonen Jiu Jitsu, Glen Burnie MD",
    description:
      'Thinking about starting Brazilian Jiu Jitsu in your 30s, 40s or 50s? What to expect in your first months at Shonen in Glen Burnie, and how to train smart.',
  },
  '/blog/kids-first-jiu-jitsu-class': {
    title:
      "Your Child's First Jiu Jitsu Class: A Parent's Guide | Shonen Jiu Jitsu, Glen Burnie MD",
    description:
      "Booking your child's first jiu jitsu class in Glen Burnie? What happens in a Shonen kids class, what to bring, how we keep kids safe and how to help a nervous child.",
  },
};

/** Meta for a URL path (trailing slash ignored), if the original site has an entry for it. */
export function metaFor(pathname: string): PageMeta | undefined {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return pageMeta[path];
}
