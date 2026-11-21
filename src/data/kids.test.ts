import { describe, expect, it } from 'vitest';
import { classSteps, parentNote, safetyPoints, whyJiuJitsu } from './kids';

describe('kids page copy', () => {
  it('has the expected counts', () => {
    expect(whyJiuJitsu).toHaveLength(4);
    expect(classSteps).toHaveLength(4);
    expect(safetyPoints).toHaveLength(3);
  });

  it('has unique, non-empty titles and text', () => {
    for (const list of [whyJiuJitsu, classSteps]) {
      expect(new Set(list.map((i) => i.title)).size).toBe(list.length);
      for (const item of list) {
        expect(item.title.trim()).not.toBe('');
        expect(item.body.trim()).not.toBe('');
      }
    }
    for (const point of safetyPoints) expect(point.trim()).not.toBe('');
    expect(parentNote.trim()).not.toBe('');
  });
});
