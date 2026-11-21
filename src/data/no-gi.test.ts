import { describe, expect, it } from 'vitest';
import { coach } from './coach';
import { comparison, noGiDetails } from './no-gi';
import { schedule } from './schedule';

describe('no-gi page data', () => {
  it('compares gi and no-gi with the same rows on each side', () => {
    expect(comparison.map((c) => c.id)).toEqual(['gi', 'no-gi']);
    const labels = comparison.map((c) => c.rows.map((r) => r.label).join('|'));
    expect(new Set(labels).size).toBe(1);
  });

  it('has details with non-empty values', () => {
    for (const row of noGiDetails) expect(row.value.trim()).not.toBe('');
  });

  it('has a scheduled no-gi class for the "When" row, and enough credentials to show three', () => {
    expect(schedule.some((c) => c.category === 'no-gi')).toBe(true);
    expect(coach.competitionRecord.length).toBeGreaterThanOrEqual(3);
  });
});
