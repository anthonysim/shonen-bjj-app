import { describe, expect, it } from 'vitest';
import { coach } from './coach';
import { nav } from './site';

describe('coach', () => {
  it('matches the nav link and route slug', () => {
    const href = nav.find((item) => item.label === 'Meet the Coach')?.href;
    expect(href).toBe(`/team/${coach.slug}`);
  });

  it('has bio, credentials with tags, and a competition record', () => {
    expect(coach.bio.length).toBeGreaterThan(0);
    for (const c of [...coach.competitionRecord, ...coach.professional]) {
      expect(c.title.trim()).not.toBe('');
      expect(c.tag.trim()).not.toBe('');
    }
    expect(coach.competitionRecord.length).toBeGreaterThan(0);
  });
});
