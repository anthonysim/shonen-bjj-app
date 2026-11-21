# shonen

Marketing site for a jiu-jitsu academy. Static content, ~15 pages, blog, one lead form.

## Tech stack

- **Framework:** Astro (TypeScript strict), file-based routes in `src/pages`
- **Package manager:** pnpm
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`), mobile-first; theme tokens in `src/styles/global.css`
- **Tooling:** ESLint, Prettier, Vitest. TypeScript is pinned to 6.x because typescript-eslint and `@astrojs/check` don't support TS 7 yet
- Planned, added in later PRs: React islands, MDX blog, sitemap, Vercel adapter

## Look

Editorial and monochrome, matched to the original site: black ink on warm paper (`paper`, `surface` white, `dark` black sections), no accent color, Fraunces light for headings and DM Sans for body, uppercase tracked labels and buttons, 2px corners, hairline rules, black-and-white photography (`Photo` applies a grade). Tokens live in `src/styles/global.css`.

- `Heading`'s `accent` is where the italic **tail** starts: the accent phrase through the end of the text is italic ("Find your _class_"). Pass the tail phrase.
- Headings read `--heading` (white on dark sections), so never hard-code heading colors
- Cards use `currentColor` borders and opacity so they work on every tone
- Focus rings use `currentColor`, so there is nothing to set per component

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
