export interface AccentParts {
  before: string;
  accent: string;
  after: string;
}

/**
 * Split `text` around the first occurrence of `accent` so a heading can style one word.
 * Returns null when there is no accent or it isn't found (render the text as-is).
 */
export function splitAccent(text: string, accent?: string): AccentParts | null {
  if (!accent) return null;
  const index = text.indexOf(accent);
  if (index === -1) return null;
  return {
    before: text.slice(0, index),
    accent,
    after: text.slice(index + accent.length),
  };
}
