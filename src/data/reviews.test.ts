import { describe, expect, it } from 'vitest';
import { featuredReviews, rating, reviewLabel, reviews, reviewsById, reviewsFor } from './reviews';

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

  it('features four reviews across topics for the homepage, in order', () => {
    const featured = featuredReviews();
    expect(featured).toHaveLength(4);
    expect(featured.map((r) => r.featured)).toEqual([1, 2, 3, 4]);
    expect(new Set(featured.map((r) => r.topic)).size).toBeGreaterThan(2);
  });

  it('labels reviews with role and source, or a custom caption', () => {
    expect(reviewLabel({})).toBe('Google review');
    expect(reviewLabel({ role: 'Parent' })).toBe('Parent \u00b7 Google review');
    expect(reviewLabel({ role: 'Parent', caption: 'From a fellow academy' })).toBe(
      'From a fellow academy',
    );
  });

  it('looks reviews up by id in the given order, skipping unknown ids', () => {
    expect(reviewsById(['kids-1', 'nope', 'general-1']).map((r) => r.id)).toEqual([
      'kids-1',
      'general-1',
    ]);
  });

  it('has only real reviews (no placeholders, which would be captioned as Google reviews)', () => {
    for (const r of reviews) {
      expect(r.author, r.id).not.toMatch(/placeholder/i);
      expect(r.quote, r.id).not.toMatch(/placeholder/i);
    }
  });
});
