# shonen

Marketing site for a jiu-jitsu academy. Static content, ~15 pages, blog, one lead form.

## Tech stack

- **Framework:** Astro (TypeScript strict), file-based routes in `src/pages`
- **Package manager:** pnpm
- Planned, added in later PRs: Tailwind v4, React islands, MDX blog, sitemap, Vercel adapter, ESLint, Prettier, Vitest

## Commands

- `pnpm dev` starts the dev server on port 4321
- `pnpm build` builds to `dist/`
- `pnpm preview` serves the build

## Conventions

- Import app code with the `@/` alias (maps to `src/`)
- Never commit secrets. Real credentials live only in `.env.local` and Vercel; `.env.example` holds placeholders
- Placeholder text and images only; do not copy the original site's photos, video, or copy
- Work lands in small PRs, one at a time
