// Reviews. The real Google reviews come from shonenjiujitsu.com (used with the client's
// permission); entries still authored "Placeholder ..." need real quotes.

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
    id: 'general-2',
    quote: 'The coaching is clear and patient. I improve every single week.',
    author: 'Placeholder reviewer B.',
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
    id: 'kids-2',
    quote: 'Safe, structured, and fun. The coaches know every kid by name.',
    author: 'Placeholder parent D.',
    topic: 'kids',
  },
  {
    id: 'kids-3',
    quote: 'My daughter gained confidence faster than we expected.',
    author: 'Placeholder parent E.',
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
    id: 'adults-2',
    quote: 'Great training partners and an honest, no-ego room.',
    author: 'Placeholder student G.',
    topic: 'adults',
  },
  {
    id: 'no-gi-1',
    quote: 'No-gi nights are fast and fun. A great workout and a great crowd.',
    author: 'Placeholder student H.',
    topic: 'no-gi',
  },
  {
    id: 'birthday-1',
    quote: 'The party ran itself. The kids were exhausted and thrilled.',
    author: 'Placeholder parent I.',
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

/** Reviews picked for the homepage, in their `featured` order. */
export function featuredReviews(): Review[] {
  return reviews
    .filter((r) => r.featured !== undefined)
    .toSorted((a, b) => (a.featured ?? 0) - (b.featured ?? 0));
}
