# Hoi An Heritage Hub

A curated heritage tourism web app for **Hoi An, Vietnam** — built with React 19, TypeScript, Vite, Tailwind CSS v4, Supabase, and Drizzle ORM.

The site presents Hoi An as a "living museum" of Japanese, Chinese, and European cultural fusion: heritage sites, artisan food, lantern-lit streets, day-by-day itineraries, local secrets, and a community-driven content model with moderated submissions.

> Status: **Frontend + content data layer in place.** Database schema, migrations, and typed ORM are wired; live Supabase integration of components is a future phase. Current page content is driven by `src/data/mockData.ts`.

---

## Table of Contents

- [Stack](#stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Database & Migrations](#database--migrations)
- [Working with Data](#working-with-data)
- [Testing](#testing)
- [Theming](#theming)
- [Content Authoring](#content-authoring)
- [Code Conventions](#code-conventions)
- [Roadmap](#roadmap)
- [Documentation](#documentation)

---

## Stack

| Layer        | Tool                                      |
| ------------ | ----------------------------------------- |
| UI           | React 19, TypeScript 6                    |
| Build        | Vite 8, `@vitejs/plugin-react` (Oxc)      |
| Styling      | Tailwind CSS v4 (CSS-first config)        |
| Icons        | Material Symbols Outlined (via Google Fonts) |
| Typeface     | Noto Serif (display) + Manrope (body)    |
| Database     | PostgreSQL (Supabase local or remote)     |
| ORM          | Drizzle ORM + `drizzle-kit`               |
| BaaS         | Supabase (Auth, Storage, PostgREST, RLS)  |
| Validation   | Zod                                       |
| Testing      | Vitest                                    |
| Linting      | ESLint flat config + `typescript-eslint`  |

---

## Prerequisites

- **Node.js ≥ 20** (project uses Vite 8 and TS 6)
- **npm** (or pnpm / yarn — examples use npm)
- **PostgreSQL 14+** with the `pgcrypto` extension (for `gen_random_uuid()`)
  - The repo assumes **Supabase** locally via the [Supabase CLI](https://supabase.com/docs/guides/cli), or any reachable Postgres URL
- **Supabase CLI** (optional, for local Supabase: `supabase start`)

---

## Quick Start

```bash
# 1. Clone and install
git clone <your-fork-url> hoian-heritage-hub
cd hoian-heritage-hub
npm install

# 2. Configure environment
cp .env.example .env
# then edit .env (see Environment Variables below)

# 3. Apply database migrations (Supabase local or your Postgres URL)
#    Option A — Supabase local stack:
supabase start
supabase db reset              # applies all migrations + seed data

#    Option B — your own Postgres:
#    psql "$DATABASE_URL" -f supabase/migrations/00001_initial_schema.sql
#    psql "$DATABASE_URL" -f supabase/migrations/00002_seed_data.sql
#    psql "$DATABASE_URL" -f supabase/migrations/00003_triggers_and_guards.sql
#    psql "$DATABASE_URL" -f supabase/migrations/00004_rls_policies.sql
#    psql "$DATABASE_URL" -f supabase/migrations/00005_category_taxonomy_update.sql

# 4. Run the dev server
npm run dev
# → http://localhost:5173
```

---

## Available Scripts

| Script          | What it does                                                    |
| --------------- | --------------------------------------------------------------- |
| `npm run dev`   | Start Vite dev server with HMR on `http://localhost:5173`       |
| `npm run build` | TypeScript project-references build (`tsc -b`) + Vite production build |
| `npm run preview`| Preview the production build locally                          |
| `npm start`     | Alias of `npm run preview`                                      |
| `npm run lint`  | Run ESLint over the project                                     |
| `npm test`      | Run Vitest test suite once (CI mode)                            |

---

## Project Structure

```
hoian-heritage-hub/
├── index.html                  # Vite entry HTML; loads Noto Serif + Manrope + Material Symbols
├── package.json
├── tsconfig.json               # Solution-style: references app/node/backend
├── tsconfig.app.json           # Frontend build (excludes src/db, src/lib)
├── tsconfig.backend.json       # Server/DB build (src/db, src/lib, tests, drizzle.config)
├── tsconfig.node.json          # Vite config + scripts
├── vite.config.ts              # Vite + React plugin
├── vitest.config.ts            # Vitest (node env, @/ path alias)
├── drizzle.config.ts           # drizzle-kit: schema=src/db/schema.ts, out=./drizzle
├── postcss.config.js           # Tailwind v4 via @tailwindcss/postcss
├── eslint.config.js            # Flat config: js + ts + react-hooks + react-refresh
│
├── public/                     # Static assets served as-is (favicon, icons, etc.)
│
├── src/
│   ├── main.tsx                # React 19 root + StrictMode
│   ├── App.tsx                 # Composes the page from section components
│   ├── App.css                 # Legacy styles (kept for compatibility)
│   ├── index.css               # Tailwind import + @theme color tokens (Material 3 palette)
│   │
│   ├── assets/                 # Bundled images (hero.png, etc.)
│   │
│   ├── components/             # 15 presentational section components
│   │   ├── Navigation.tsx
│   │   ├── HeroSection.tsx
│   │   ├── CategoryShortcuts.tsx
│   │   ├── HeritageSection.tsx
│   │   ├── ThisMonthSection.tsx
│   │   ├── DiscoverSection.tsx
│   │   ├── HowToExplore.tsx
│   │   ├── ItinerarySection.tsx
│   │   ├── ExperiencesDirectory.tsx
│   │   ├── LocalSecretsSection.tsx
│   │   ├── FeaturedSection.tsx         # Renders 'bridge' and 'green' variants
│   │   ├── FoodSection.tsx
│   │   ├── PhotoGallerySection.tsx
│   │   ├── NewsletterSection.tsx
│   │   └── Footer.tsx
│   │
│   ├── data/
│   │   └── mockData.ts         # All current page content (single source for sections)
│   │
│   ├── hooks/
│   │   └── useScrollReveal.ts  # IntersectionObserver → adds `.is-visible` to `.reveal-on-scroll`
│   │
│   ├── db/
│   │   ├── index.ts            # Drizzle client bound to DATABASE_URL (postgres-js)
│   │   ├── schema.ts           # 11 tables: locations, categories, tags, places, contributors,
│   │   │                       #           placeTags, placeContents, placeMedia,
│   │   │                       #           placeMediaAssignments, localVoices, submissions
│   │   ├── types.ts            # Inferred Insert/Select types + ContentJson discriminated union
│   │   └── validations.ts      # Zod enums + per-type content_json schemas + validator
│   │
│   └── lib/
│       ├── supabase.ts         # createClient wired to NEXT_PUBLIC_SUPABASE_URL/ANON_KEY
│       └── utils.ts            # slugify, eraDisplayName, enum re-exports
│
├── supabase/
│   └── migrations/             # 5 hand-written SQL files (see Database & Migrations)
│       ├── 00001_initial_schema.sql
│       ├── 00002_seed_data.sql
│       ├── 00003_triggers_and_guards.sql
│       ├── 00004_rls_policies.sql
│       └── 00005_category_taxonomy_update.sql
│
├── tests/
│   └── db/                     # Vitest suites for the data layer
│       ├── schema.test.ts
│       ├── queries.test.ts
│       └── validations.test.ts
│
└── research-data-templates/    # Authoring templates for content contributors
    ├── v1/                     # Legacy: combined .docx + .xlsx
    ├── v2/                     # Combined .docx + .xlsx (revised)
    └── v3/                     # Split per-table workbooks (content, core-places,
                                # local-voices, media)
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in:

```env
# PostgreSQL connection string used by Drizzle (src/db/index.ts)
DATABASE_URL=postgresql://postgres:password@localhost:5432/hoian_heritage_hub

# Supabase project (browser-safe, prefixed NEXT_PUBLIC_ to match existing code)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Server-only — never expose to the browser
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

> **Naming note:** the variables are prefixed `NEXT_PUBLIC_` for historical reasons; this project does **not** use Next.js. Vite reads any `VITE_`-prefixed env at build time, and the Supabase client uses `process.env.*` (which Vite exposes for `NEXT_PUBLIC_*` only because of the `import.meta.env` substitution). If you migrate to Vite-native env vars, rename the references in `src/lib/supabase.ts`.

---

## Database & Migrations

The schema is **manually authored SQL** in `supabase/migrations/` (not generated by `drizzle-kit`) — see the comment in `00001_initial_schema.sql`. Eleven tables, three groups:

- **Lookup tables (text PKs):** `locations`, `categories`, `tags`
- **Content tables (uuid PKs):** `places`, `contributors`, `placeContents`, `placeMedia`
- **Junction tables:** `placeTags`, `placeMediaAssignments`
- **Community tables:** `localVoices`, `submissions`

Constraints of note (enforced in SQL and mirrored in Drizzle):
- `categories.color_theme` ∈ `('heritage', 'food', 'nature', 'activity')`
- `place_contents.type` ∈ `('history', 'comparison', 'story', 'tip', 'highlight')`
- `place_media.type` ∈ `('photo-past', 'photo-present', 'video', 'audio', 'document')`
- `submissions.status` defaults to `pending`; `submissions.type = 'new_place'` requires `place_id IS NULL`

Row-Level Security policies are defined in `00004_rls_policies.sql`.

### Generating Drizzle types

```bash
# Drizzle is configured (drizzle.config.ts) but migrations are hand-written.
# If you change schema.ts, generate the SQL diff with:
npx drizzle-kit generate
# Then either adopt the generated SQL or keep the manual migrations — they must
# stay in lockstep. The current contract is: schema.ts ↔ 00001_initial_schema.sql.
```

---

## Working with Data

Today, every section reads from `src/data/mockData.ts`. The shape of the data mirrors the long-term goal of feeding the UI from the database.

**Pattern to follow when wiring a section to the DB:**

```ts
// Example: switching a section to live data
import { db } from "@/db";
import { places } from "@/db/schema";
import { eq, and } from "drizzle-orm";

const featured = await db
  .select()
  .from(places)
  .where(and(eq(places.published, true), eq(places.location_id, "hoian")));
```

The `ContentJson` discriminated union in `src/db/types.ts` matches the Zod schemas in `src/db/validations.ts` — when reading `place_contents.content_json`, parse it through `validateContentJson(type, data)` from `validations.ts` for type-safe access.

---

## Testing

```bash
npm test              # one-shot run (CI)
```

Test files live in `tests/db/` and exercise the data layer only (schema exports, query construction, Zod validation). The frontend currently has no test suite; add Vitest + Testing Library as components are wired to live data.

---

## Theming

Tailwind v4 with CSS-first config. The full Material 3-style color palette is defined as `@theme` tokens in `src/index.css`:

- `primary` / `primary-container` — warm gold (heritage)
- `secondary` / `secondary-container` — teal (nature)
- `tertiary` / `tertiary-container` — amber (food)
- `surface-*` / `on-*` — warm-neutral backgrounds and ink
- `error` / `error-container` — standard error pair

Use the semantic tokens in components (e.g. `bg-primary-container text-on-primary-container`) rather than raw hex values. The hard-coded color classes in `src/data/mockData.ts` are a known debt to migrate.

Custom fonts are loaded from Google Fonts in `index.html`:
- **Display:** `Noto Serif` — used for headlines and section titles
- **Body:** `Manrope` — used for paragraph and UI text
- **Icons:** `Material Symbols Outlined` — used as the icon set across components

---

## Content Authoring

`research-data-templates/` holds contributor-facing templates for populating the database. Three versions exist; **v3 is current** and is split by table for clean imports:

- `v3-core-places.xlsx` — place records (name, address, category, location, lat/lng, etc.)
- `v3-content.xlsx` — `place_contents` rows (history, story, tip, highlight, comparison)
- `v3-media.xlsx` — `place_media` rows (photo-past, photo-present, video, audio, document)
- `v3-local-voices.xlsx` — community quotes and contributor attributions

The older `v1/` and `v2/` directories are kept for reference but should not be used for new content.

---

## Code Conventions

- **TypeScript:** strict, no `any` in new code. `verbatimModuleSyntax` and `erasableSyntaxOnly` are on — use `import type` for type-only imports.
- **Path alias:** `@/*` → `src/*` (configured in `tsconfig.backend.json` and `vitest.config.ts`; the Vite/TS-app config does not include the alias — the backend and tests do, the UI does not currently need it).
- **Components:** functional, default-exported, presentational. Data comes from `src/data/mockData.ts` until live wiring lands.
- **No comments** unless absolutely required to explain non-obvious intent.
- **Linting:** `npm run lint` must pass before opening a PR.
- **Three TypeScript projects** (app / node / backend) — the solution-style `tsconfig.json` keeps builds incremental and scoped.

---

## Roadmap

- [ ] Wire sections to live Supabase queries (replace `mockData.ts` reads)
- [ ] Add Supabase Auth for the contributor / admin flows
- [ ] Build admin moderation UI for `submissions` (currently pending/approved/rejected only)
- [ ] Add Vitest + Testing Library for component tests
- [ ] i18n (English + Vietnamese) — schema and content templates already separate prose from metadata
- [ ] Lighthouse pass and image optimization pipeline

---

## Documentation

- **[CODEBASE_GUIDE.md](./CODEBASE_GUIDE.md)** — deep dive into the data model, section-by-section UI map, and contributor workflows.
- **`supabase/migrations/`** — SQL is the source of truth for the database; comments at the top of each file explain its scope.
- **`src/db/validations.ts`** — Zod schemas double as machine-readable content contracts.

---

## License

Private / unlicensed at this time. Add a `LICENSE` file when the project goes public.
