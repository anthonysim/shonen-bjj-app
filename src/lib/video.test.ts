import { describe, expect, it } from 'vitest';
import { shouldAutoplayVideo } from './video';

const ok = { wideEnough: true, reducedMotion: false, saveData: false };

describe('shouldAutoplayVideo', () => {
  it('plays on wide screens with no restrictions', () => {
    expect(shouldAutoplayVideo(ok)).toBe(true);
  });

  it('skips small screens', () => {
    expect(shouldAutoplayVideo({ ...ok, wideEnough: false })).toBe(false);
  });

  it('skips when the person prefers reduced motion', () => {
    expect(shouldAutoplayVideo({ ...ok, reducedMotion: true })).toBe(false);
  });

  it('skips when Save-Data is on', () => {
    expect(shouldAutoplayVideo({ ...ok, saveData: true })).toBe(false);
  });
});
