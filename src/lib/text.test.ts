import { describe, expect, it } from 'vitest';
import { splitAccent } from './text';

describe('splitAccent', () => {
  it('splits around the first match', () => {
    expect(splitAccent('Become the hero of your story', 'hero')).toEqual({
      before: 'Become the ',
      accent: 'hero',
      after: ' of your story',
    });
  });

  it('handles an accent at the start or end', () => {
    expect(splitAccent('Train hard', 'Train')).toEqual({
      before: '',
      accent: 'Train',
      after: ' hard',
    });
    expect(splitAccent('Train hard', 'hard')).toEqual({
      before: 'Train ',
      accent: 'hard',
      after: '',
    });
  });

  it('only accents the first occurrence', () => {
    expect(splitAccent('go go go', 'go')?.after).toBe(' go go');
  });

  it('returns null with no accent or no match', () => {
    expect(splitAccent('Train hard')).toBeNull();
    expect(splitAccent('Train hard', '')).toBeNull();
    expect(splitAccent('Train hard', 'easy')).toBeNull();
  });
});
