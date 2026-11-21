import { describe, expect, it } from 'vitest';
import { classGuide } from './class-guide';
import { programs } from './site';

describe('class guide', () => {
  it('has four items with non-empty text', () => {
    expect(classGuide).toHaveLength(4);
    for (const item of classGuide) {
      expect(item.title.trim()).not.toBe('');
      expect(item.body.trim()).not.toBe('');
    }
  });

  it('links to real program pages and real kids anchors', () => {
    const routes = programs.map((p) => `/programs/${p.slug}`);
    const kidsAnchors = (programs.find((p) => p.slug === 'kids')?.ageGroups ?? []).map((g) => g.id);
    for (const item of classGuide) {
      const [path, anchor] = item.href.split('#');
      expect(routes, item.title).toContain(path);
      if (path === '/programs/kids' && anchor) expect(kidsAnchors, item.title).toContain(anchor);
    }
  });
});
