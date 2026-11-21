/**
 * Scroll reveals, like the original site: [data-reveal] elements get .is-revealed once they are
 * 15% into the viewport (with a 10% bottom margin) and are then left alone. Everything is revealed
 * at once with reduced motion or without IntersectionObserver; anything already scrolled past
 * (e.g. after a reload mid-page) is revealed immediately.
 */
export function initReveals(root: Document = document) {
  const items = root.querySelectorAll<HTMLElement>('[data-reveal]');
  if (items.length === 0) return;

  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    for (const el of items) el.classList.add('is-revealed');
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
  );

  for (const el of items) {
    if (el.getBoundingClientRect().bottom < 0) el.classList.add('is-revealed');
    else observer.observe(el);
  }
}
