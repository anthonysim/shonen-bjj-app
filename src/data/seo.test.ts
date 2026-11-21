import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { metaFor, pageMeta } from './seo';

describe('page meta', () => {
  it('has a title and description for every entry', () => {
    for (const [path, meta] of Object.entries(pageMeta)) {
      expect(meta.title.trim(), path).not.toBe('');
      expect(meta.description.trim(), path).not.toBe('');
    }
  });

  it('points only at real pages', () => {
    for (const path of Object.keys(pageMeta)) {
      const file = path === '/' ? 'index' : path.slice(1);
      const found =
        existsSync(`src/pages/${file}.astro`) ||
        existsSync(`src/pages/${file}/index.astro`) ||
        path.startsWith('/blog/');
      expect(found, path).toBe(true);
    }
  });

  it('ignores a trailing slash', () => {
    expect(metaFor('/schedule/')).toBe(pageMeta['/schedule']);
    expect(metaFor('/')).toBe(pageMeta['/']);
    expect(metaFor('/nope')).toBeUndefined();
  });
});
