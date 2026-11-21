import { describe, expect, it } from 'vitest';
import { readingMinutes } from './blog';

describe('readingMinutes', () => {
  it('rounds to whole minutes at about 160 words a minute', () => {
    expect(readingMinutes('word '.repeat(1200))).toBe(8);
    expect(readingMinutes('word '.repeat(930))).toBe(6);
  });

  it('is at least one minute', () => {
    expect(readingMinutes('')).toBe(1);
    expect(readingMinutes('a few words')).toBe(1);
  });
});
