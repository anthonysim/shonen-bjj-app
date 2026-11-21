import { describe, expect, it } from 'vitest';
import { footerLinks, legalLinks, nav, programCards, programs, site } from './site';

const allNavHrefs = nav.flatMap((item) => [item.href, ...(item.children ?? []).map((c) => c.href)]);

describe('site data', () => {
  it('has unique nav hrefs', () => {
    expect(new Set(allNavHrefs).size).toBe(allNavHrefs.length);
  });

  it('uses root-relative internal hrefs', () => {
    const hrefs = [
      ...allNavHrefs,
      ...footerLinks.map((l) => l.href),
      ...legalLinks.map((l) => l.href),
      site.cta.href,
    ];
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

  it('keeps FAQ in the mobile menu only', () => {
    expect(nav.find((item) => item.href === '/faq')?.mobileOnly).toBe(true);
    expect(nav.filter((item) => !item.mobileOnly).map((item) => item.label)).not.toContain('FAQ');
  });

  it('has unique program slugs', () => {
    expect(new Set(programs.map((p) => p.slug)).size).toBe(programs.length);
  });

  it('gives every program three hero facts', () => {
    for (const program of programs) {
      expect(program.facts).toHaveLength(3);
    }
  });

  it('splits kids into age groups and gives each a card', () => {
    const kids = programs.find((p) => p.slug === 'kids');
    expect(kids?.ageGroups?.length).toBeGreaterThan(1);
    expect(programCards.filter((c) => c.href.startsWith('/programs/kids#'))).toHaveLength(
      kids?.ageGroups?.length ?? 0,
    );
  });

  it('has unique card ids and root-relative card hrefs', () => {
    expect(new Set(programCards.map((c) => c.id)).size).toBe(programCards.length);
    for (const card of programCards) {
      expect(card.href.startsWith('/programs/')).toBe(true);
    }
  });
});
