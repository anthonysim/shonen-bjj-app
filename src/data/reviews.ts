// Placeholder reviews. Replace with real, permissioned quotes before launch.

export type ReviewTopic = 'general' | 'kids' | 'adults' | 'no-gi' | 'birthday' | 'coach';

export interface Review {
  id: string;
  quote: string;
  author: string;
  topic: ReviewTopic;
  /** Shown in the homepage reviews block */
  featured?: boolean;
}

export const rating = {
  score: 5.0,
  count: 75,
  source: 'Google',
  /** Where "Read all reviews" goes. Placeholder until the real listing exists. */
  url: 'https://www.google.com/maps',
} as const;

export const reviews: Review[] = [
  {
    id: 'general-1',
    featured: true,
    quote: 'Friendly, well-run, and nobody makes you feel out of place on day one.',
    author: 'Placeholder reviewer A.',
    topic: 'general',
  },
  {
    id: 'general-2',
    featured: true,
    quote: 'The coaching is clear and patient. I improve every single week.',
    author: 'Placeholder reviewer B.',
    topic: 'general',
  },
  {
    id: 'kids-1',
    featured: true,
    quote: 'My son looks forward to class all week. His focus at school has improved.',
    author: 'Placeholder parent C.',
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
    featured: true,
    quote: 'I had never trained before. The basics class made it easy to start.',
    author: 'Placeholder student F.',
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
    featured: true,
    quote: 'A world-class competitor who is also an excellent teacher.',
    author: 'Placeholder student J.',
    topic: 'coach',
  },
  {
    id: 'coach-2',
    quote: 'The coach explains the why behind every technique.',
    author: 'Placeholder student K.',
    topic: 'coach',
  },
];

/** Reviews for a topic. Pass "general" or omit to get general ones. Order is stable. */
export function reviewsFor(topic: ReviewTopic = 'general', limit?: number): Review[] {
  const matches = reviews.filter((r) => r.topic === topic);
  return limit === undefined ? matches : matches.slice(0, limit);
}

/** Reviews picked for the homepage, in file order. */
export function featuredReviews(): Review[] {
  return reviews.filter((r) => r.featured);
}
