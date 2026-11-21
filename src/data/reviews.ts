// Google reviews as shown on shonenjiujitsu.com (used with the client's permission).
// Every entry is a real quote; a test fails if a placeholder is added.

export type ReviewTopic = 'general' | 'kids' | 'adults' | 'no-gi' | 'birthday' | 'coach';

export interface Review {
  id: string;
  quote: string;
  author: string;
  topic: ReviewTopic;
  /** Shown before the source in the caption, e.g. "Parent & student" */
  role?: string;
  /** Replaces the whole caption label, for quotes that are not Google reviews */
  caption?: string;
  /** Position in the homepage reviews block (1 = the large featured quote) */
  featured?: number;
}

/** Caption label under a quote: "Parent & student · Google review". */
export function reviewLabel(review: Pick<Review, 'role' | 'caption'>): string {
  if (review.caption) return review.caption;
  const source = `${rating.source} review`;
  return review.role ? `${review.role} \u00b7 ${source}` : source;
}

export const rating = {
  score: 5.0,
  count: 75,
  source: 'Google',
  /** The academy's Google reviews */
  url: 'https://search.google.com/local/reviews?placeid=ChIJlRMV2Iv9t4kRTmSeyCYYSp8',
} as const;

export const reviews: Review[] = [
  {
    id: 'general-1',
    featured: 1,
    quote:
      'The instruction at Shonen is superb\u2026 The facility is also immaculately clean. Details matter, and the attention given to small details here is second to none.',
    author: 'Mike B.',
    role: 'Parent & student',
    topic: 'general',
  },
  {
    id: 'general-madison',
    quote:
      '…the community at Shonen is characterized by remarkable kindness and a warm welcome including an amazing girls group, alongside a clean and well kept environment.',
    author: 'Madison W.',
    role: 'Student',
    topic: 'general',
  },
  {
    id: 'general-brent',
    quote:
      'Whether you’re an active competitor or looking for a casual introduction to martial arts, Professor Lee’s style of breaking down jujitsu technique will help you improve your ability tremendously.',
    author: 'Brent L.',
    role: 'Student',
    topic: 'general',
  },
  {
    id: 'kids-1',
    featured: 3,
    quote:
      'My 10 year old has a quiet temperament\u2026 ever since she started training at Shonen she definitely gained confidence and became more secure.',
    author: 'Donna A.',
    role: 'Parent',
    topic: 'kids',
  },
  {
    id: 'kids-lia',
    quote:
      'It’s not easy working with a 6 year old but you keep her motivated, I love everything she’s learning, and loves to see you!',
    author: 'Lia R.',
    role: 'Parent',
    topic: 'kids',
  },
  {
    id: 'kids-anna',
    quote:
      'The kids classes are absolutely amazing. The coaches are very patient and kind. My husband joined the adult classes and is having a great time.',
    author: 'Anna M.',
    role: 'Parent',
    topic: 'kids',
  },
  {
    id: 'adults-1',
    featured: 4,
    quote:
      'I started Jiu Jitsu at age 38, with trials at a few local gyms before I landed at Shonen. Easily the best decision I could have made!',
    author: 'Joshua S.',
    topic: 'adults',
  },
  {
    id: 'adults-rob',
    quote:
      'I am 53 with zero experience and have been going for 3 months. The teaching and training has been extremely phenomenal and the students are extremely helpful and caring.',
    author: 'Rob S.',
    topic: 'adults',
  },
  {
    id: 'adults-charlotte',
    quote:
      'Completely new to Ju Jitsu and am so lucky to have landed at Shonen! After checking out a few gyms in the area, none could beat the fantastic instruction\u2026',
    author: 'Charlotte C.',
    topic: 'adults',
  },
  {
    id: 'no-gi-kevin',
    quote:
      'His teachings are detailed and specific, which significantly helps in retaining and applying the techniques. I learned a new guard pass on my first day…',
    author: 'Kevin S.',
    role: 'Student',
    topic: 'no-gi',
  },
  {
    id: 'birthday-anna',
    quote:
      'The kids classes are absolutely amazing. The coaches are very patient and kind. My husband joined the adult classes and is having a great time.',
    author: 'Anna M.',
    role: 'Parent',
    topic: 'birthday',
  },
  {
    id: 'coach-1',
    featured: 2,
    quote:
      'Professor Lee is the real deal\u2026 Lee runs an excellent jiu jitsu class and teaches details that blow my mind even after 11 years of doing jiu jitsu.',
    author: 'Raghav S.',
    topic: 'coach',
  },
  {
    id: 'coach-2',
    quote:
      'His teachings are detailed and specific, which significantly helps in retaining and applying the techniques. I learned a new guard pass on my first day\u2026',
    author: 'Kevin S.',
    topic: 'coach',
  },
  {
    id: 'coach-3',
    quote: 'Shonen is a world class training center with a world class coach and competitor, Lee.',
    author: 'Masterskya Jiu Jitsu',
    caption: 'From a fellow academy \u00b7 New York City',
    topic: 'coach',
  },
];

/** Reviews for a topic. Pass "general" or omit to get general ones. Order is stable. */
export function reviewsFor(topic: ReviewTopic = 'general', limit?: number): Review[] {
  const matches = reviews.filter((r) => r.topic === topic);
  return limit === undefined ? matches : matches.slice(0, limit);
}

/** Reviews by id, in the order given (unknown ids are skipped). */
export function reviewsById(ids: readonly string[]): Review[] {
  return ids.flatMap((id) => reviews.find((r) => r.id === id) ?? []);
}

/** Reviews picked for the homepage, in their `featured` order. */
export function featuredReviews(): Review[] {
  return reviews
    .filter((r) => r.featured !== undefined)
    .toSorted((a, b) => (a.featured ?? 0) - (b.featured ?? 0));
}
