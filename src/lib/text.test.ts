import { describe, expect, it } from 'vitest';
import { accentTail, splitAccent } from './text';

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

describe('accentTail', () => {
  it('italicizes from the accent to the end of the text', () => {
    expect(accentTail('Training for every stage.', 'every stage.')).toEqual({
      before: 'Training for ',
      accent: 'every stage.',
      after: '',
    });
    expect(accentTail('Find your class', 'class')?.accent).toBe('class');
  });

  it('extends a partial match to the end', () => {
    expect(accentTail('Classes for every age', 'every')).toEqual({
      before: 'Classes for ',
      accent: 'every age',
      after: '',
    });
  });

  it('keeps only the accent when it starts the text', () => {
    expect(accentTail('Visit us', 'Visit')).toEqual({ before: '', accent: 'Visit', after: ' us' });
  });

  it('returns null with no accent or no match', () => {
    expect(accentTail('Find your class')).toBeNull();
    expect(accentTail('Find your class', 'nope')).toBeNull();
  });
});
