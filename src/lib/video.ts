/** Hero video only plays from this width up (iPad portrait and larger). Phones get the poster. */
export const HERO_VIDEO_MEDIA = '(min-width: 768px)';

export interface AutoplayEnv {
  wideEnough: boolean;
  reducedMotion: boolean;
  saveData: boolean;
}

/** Background video is decoration: skip it for small screens, reduced motion, and data savers. */
export function shouldAutoplayVideo(env: AutoplayEnv): boolean {
  return env.wideEnough && !env.reducedMotion && !env.saveData;
}
