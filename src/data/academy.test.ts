import { describe, expect, it } from 'vitest';
import { firstClassSteps, values } from './academy';

describe('academy copy', () => {
  it('has three values and three first-class steps', () => {
    expect(values).toHaveLength(3);
    expect(firstClassSteps).toHaveLength(3);
  });

  it('has unique, non-empty titles and bodies', () => {
    for (const list of [values, firstClassSteps]) {
      expect(new Set(list.map((i) => i.title)).size).toBe(list.length);
      for (const item of list) {
        expect(item.title.trim()).not.toBe('');
        expect(item.body.trim()).not.toBe('');
      }
    }
  });
});
