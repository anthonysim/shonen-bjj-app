import { describe, expect, it } from 'vitest';
import { partySteps, whyParty } from './birthday';

describe('birthday page copy', () => {
  it('has four reasons and three steps', () => {
    expect(whyParty).toHaveLength(4);
    expect(partySteps).toHaveLength(3);
  });

  it('has unique, non-empty titles and text', () => {
    for (const list of [whyParty, partySteps]) {
      expect(new Set(list.map((i) => i.title)).size).toBe(list.length);
      for (const item of list) {
        expect(item.title.trim()).not.toBe('');
        expect(item.body.trim()).not.toBe('');
      }
    }
  });
});
