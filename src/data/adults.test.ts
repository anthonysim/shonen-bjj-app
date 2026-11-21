import { describe, expect, it } from 'vitest';
import { adultClassSteps, neverTrained, tracks, womens } from './adults';
import { schedule } from './schedule';

describe('adults page data', () => {
  it('has two tracks with unique ids and bullets', () => {
    expect(tracks).toHaveLength(2);
    expect(new Set(tracks.map((t) => t.id)).size).toBe(tracks.length);
    for (const track of tracks) {
      expect(track.bullets.length, track.id).toBeGreaterThanOrEqual(4);
      for (const bullet of track.bullets) expect(bullet.trim()).not.toBe('');
    }
  });

  it('points every track at real adult or no-gi classes', () => {
    const byId = new Map(schedule.map((c) => [c.id, c]));
    for (const track of tracks) {
      expect(track.classIds.length, track.id).toBeGreaterThan(0);
      for (const id of track.classIds) {
        const cls = byId.get(id);
        expect(cls, `${track.id} -> ${id}`).toBeDefined();
        expect(['bjj', 'no-gi']).toContain(cls?.program);
      }
    }
  });

  it('lists every adult gi class in some track, so the page cannot drift from the schedule', () => {
    const listed = new Set(tracks.flatMap((t) => t.classIds));
    for (const cls of schedule.filter((c) => c.program === 'bjj')) {
      expect(listed.has(cls.id), cls.id).toBe(true);
    }
  });

  it('has six class steps and non-empty copy', () => {
    expect(adultClassSteps).toHaveLength(6);
    expect(new Set(adultClassSteps.map((s) => s.title)).size).toBe(6);
    for (const section of [neverTrained, womens]) {
      expect(section.body.length).toBeGreaterThan(0);
      // The accent must be a real tail of the heading
      expect(section.heading.endsWith(section.accent)).toBe(true);
    }
  });
});
