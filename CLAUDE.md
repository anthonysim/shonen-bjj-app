# shonen

Marketing site for a jiu-jitsu academy. Static content, ~15 pages, blog, one lead form.

## Tech stack

- **Framework:** Astro (TypeScript strict), file-based routes in `src/pages`
- **Package manager:** pnpm
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`), mobile-first; theme tokens in `src/styles/global.css`
- **Tooling:** ESLint, Prettier, Vitest. TypeScript is pinned to 6.x because typescript-eslint and `@astrojs/check` don't support TS 7 yet
- Planned, added in later PRs: React islands, MDX blog, sitemap, Vercel adapter

## Commands

- `pnpm dev` starts the dev server on port 4321
- `pnpm build` builds to `dist/`
- `pnpm preview` serves the build
- `pnpm typecheck`, `pnpm lint`, `pnpm test` (Vitest)
- `pnpm format` runs Prettier and ESLint fix; run it before committing

## Conventions

- Import app code with the `@/` alias (maps to `src/`)
- Never commit secrets. Real credentials live only in `.env.local` and Vercel; `.env.example` holds placeholders
- Placeholder text and images only; do not copy the original site's photos, video, or copy
- Mobile-first: must work on phones and iPads (375 / 768 / 1024 / 1280 widths). Use base styles for phone, `md:` for iPad portrait, `lg:` for iPad landscape
- Work lands in small PRs, one at a time
