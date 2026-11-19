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

export default defineConfig({
  site,
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react(), mdx(), sitemap()],
  adapter: vercel(),
});
