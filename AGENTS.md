# AGENTS.md

## Stack

Astro 6 + React 19 + Tailwind CSS v4 + TypeScript (strict). Package manager: **bun**.

## Commands

- `bun run dev` — dev server
- `bun run build` — production build
- `bun run lint` / `bun run lint:fix` — ESLint (flat config)
- `bun run fmt` / `bun run fmt:check` — Prettier

Run `lint` then `fmt:check` after changes. Pre-commit hook runs `lint-staged` (eslint --fix + prettier --write on `*.{astro,ts,tsx}`).

## Conventions

- Path alias: `@/*` → `./src/*`
- Prettier: no semicolons, single quotes, tabs, printWidth 150. Plugins: `prettier-plugin-astro`, `prettier-plugin-tailwindcss`.
- `bunfig.toml` enforces exact dependency versions and minimum release age (86400s).
- Node >= 22.12.0
- **Component filenames:** kebab-case (e.g., `search-input.tsx`, `orders-list.tsx`).

## Fonts

Two fonts configured for pixel-perfect Figma implementation:

- **Avenir** (local TTF in `public/fonts/Avenir/`) — declared via `@font-face` in `src/styles/global.css`. Weight mapping: Light=300, Regular=400, Book=450, Heavy=800, Black=900.
- **Inter Variable** (`@fontsource-variable/inter`) — imported in `src/layouts/layout.astro`. Type declaration in `src/env.d.ts`.
- Tailwind classes: `font-avenir` and `font-inter` (defined via `@theme` in `global.css`).

## Theme

Tailwind v4 custom tokens defined via `@theme` in `src/styles/global.css`:

- **Fonts:** `font-avenir`, `font-inter`
- **Colors:** `primary` (#ffEE00), `txt` (#EDEDED), `bg` (#080C0F), `accent` (#0C7DED), `txt-secondary` (#808183), `txt-tertiary` (#4C4D4E), `disabled` (#D9D9D9), `margin-black` (#000000), `margin-white` (#BABABA), `margin-gray` (#848484)

Use as standard Tailwind utilities: `bg-primary`, `text-txt`, `border-accent`, etc.

## Project Context

This is a front-end evaluation test. Implementation must be **pixel perfect** from the [Figma design](https://www.figma.com/design/a3ZLOVSXnQliLKNloQoXN1/Prueba-Devs). Data comes from mock Postman API endpoints (see README.md for URLs).
