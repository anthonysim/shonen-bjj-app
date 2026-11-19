import { describe, expect, it } from 'vitest';
import { featuredReviews, rating, reviews, reviewsFor } from './reviews';

describe('reviews', () => {
  it('has unique ids and non-empty quotes', () => {
    expect(new Set(reviews.map((r) => r.id)).size).toBe(reviews.length);
    for (const r of reviews) {
      expect(r.quote.trim().length).toBeGreaterThan(0);
      expect(r.author.trim().length).toBeGreaterThan(0);
    }
  });

  it('has a sane rating', () => {
    expect(rating.score).toBeGreaterThan(0);
    expect(rating.score).toBeLessThanOrEqual(5);
    expect(rating.count).toBeGreaterThan(0);
  });

  it('has reviews for every topic the pages use', () => {
    for (const topic of ['general', 'kids', 'adults', 'no-gi', 'birthday', 'coach'] as const) {
      expect(reviewsFor(topic).length, topic).toBeGreaterThan(0);
    }
  });

  it('defaults to general and respects the limit', () => {
    expect(reviewsFor().every((r) => r.topic === 'general')).toBe(true);
    expect(reviewsFor('kids', 2)).toHaveLength(2);
  });

  it('features five reviews across topics for the homepage', () => {
    const featured = featuredReviews();
    expect(featured).toHaveLength(5);
    expect(new Set(featured.map((r) => r.topic)).size).toBeGreaterThan(2);
  });
});
