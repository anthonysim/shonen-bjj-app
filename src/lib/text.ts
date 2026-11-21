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

/**
 * Like `splitAccent`, but the accent runs from its first occurrence to the END of the text, so a
 * heading can italicize its tail ("Training for *every stage.*"). If the accent is at the very
 * start there is no tail to speak of, so only the accent itself is returned.
 */
export function accentTail(text: string, accent?: string): AccentParts | null {
  const parts = splitAccent(text, accent);
  if (!parts) return null;
  if (parts.before === '') return parts;
  return { before: parts.before, accent: text.slice(parts.before.length), after: '' };
}
