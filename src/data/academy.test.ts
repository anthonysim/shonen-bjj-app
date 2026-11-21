import { describe, expect, it } from 'vitest';
import { academyFeatures, firstClassSteps, pathway, values } from './academy';
import { programs } from './site';

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

  it('has a four-stage pathway whose links point at real program pages', () => {
    expect(pathway).toHaveLength(4);
    const routes = programs.map((p) => `/programs/${p.slug}`);
    for (const stage of pathway) {
      expect(routes, stage.title).toContain(stage.href.split('#')[0]);
    }
  });

  it('only links pathway anchors to real kids age groups', () => {
    const kids = programs.find((p) => p.slug === 'kids');
    const anchors = (kids?.ageGroups ?? []).map((g) => g.id);
    for (const stage of pathway) {
      const [, anchor] = stage.href.split('#');
      if (anchor) expect(anchors, stage.title).toContain(anchor);
    }
  });

  it('has academy features with unique tags and non-empty text', () => {
    expect(academyFeatures.length).toBeGreaterThan(0);
    expect(new Set(academyFeatures.map((f) => f.tag)).size).toBe(academyFeatures.length);
    for (const feature of academyFeatures) {
      expect(feature.tag.trim()).not.toBe('');
      expect(feature.title.trim()).not.toBe('');
    }
  });
});
