// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
// Production URL. Set SITE_URL in Vercel; the fallback is a placeholder.
const site = process.env.SITE_URL ?? 'https://example.com';

/**
 * Dev only: serve font files as immutable, like Vercel does for /_astro/*.
 * Vite sends them `no-cache`, so some browsers (Brave) re-check every font on each page load and
 * paint the new page in the fallback fonts until the check returns: text swaps and the nav shifts.
 * Safe because font URLs include the package version.
 */
function cacheFontsInDev() {
  return {
    name: 'cache-fonts-in-dev',
    apply: /** @type {const} */ ('serve'),
    /** @param {{ middlewares: { use: (fn: Function) => void } }} server */
    configureServer(server) {
      server.middlewares.use(
        /**
         * @param {import('node:http').IncomingMessage} req
         * @param {import('node:http').ServerResponse} res
         * @param {() => void} next
         */
        (req, res, next) => {
          if (/\.woff2?(\?|$)/.test(req.url ?? '')) {
            // Vite's file server sets its own Cache-Control when it writes the head; replace it there
            /** @type {(...args: any[]) => any} */
            const writeHead = res.writeHead.bind(res);
            /** @type {any} */ (res).writeHead = (/** @type {any[]} */ ...args) => {
              const headers = args.find((a) => a && typeof a === 'object' && !Array.isArray(a));
              for (const key of Object.keys(headers ?? {})) {
                if (key.toLowerCase() === 'cache-control') delete headers[key];
              }
              res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
              return writeHead(...args);
            };
          }
          next();
        },
      );
    },
  };
}

export default defineConfig({
  site,
  vite: {
    plugins: [tailwindcss(), cacheFontsInDev()],
  },

  integrations: [react(), mdx(), sitemap({ filter: (page) => !page.includes('/styleguide') })],
  adapter: vercel(),
});
