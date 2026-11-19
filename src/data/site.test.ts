import { describe, expect, it } from 'vitest';
import { DAYS, footerLinks, nav, programs, schedule, site } from './site';

const allNavHrefs = nav.flatMap((item) => [item.href, ...(item.children ?? []).map((c) => c.href)]);

describe('site data', () => {
  it('has unique nav hrefs', () => {
    expect(new Set(allNavHrefs).size).toBe(allNavHrefs.length);
  });

  it('uses root-relative internal hrefs', () => {
    const hrefs = [...allNavHrefs, ...footerLinks.map((l) => l.href), site.cta.href];
    for (const href of hrefs) {
      expect(href.startsWith('/')).toBe(true);
    }
  });

  it('builds a Programs dropdown with one child per program', () => {
    const programsNav = nav.find((item) => item.label === 'Programs');
    expect(programsNav?.children?.map((c) => c.href)).toEqual(
      programs.map((p) => `/programs/${p.slug}`),
    );
  });

  it('has unique program slugs', () => {
    expect(new Set(programs.map((p) => p.slug)).size).toBe(programs.length);
  });

  it('only schedules classes on valid days, with no repeats within a class', () => {
    for (const cls of schedule) {
      expect(cls.days.length).toBeGreaterThan(0);
      expect(new Set(cls.days).size).toBe(cls.days.length);
      for (const day of cls.days) {
        expect(DAYS).toContain(day);
      }
    }
  });
});
