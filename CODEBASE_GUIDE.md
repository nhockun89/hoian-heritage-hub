# Codebase Guide

> A new-developer-friendly walkthrough of how the code is organized, how data flows through the app, and how to make common changes.

If you've just cloned the repo, start with [README.md](./README.md) for setup, then come back here for the **why** behind the layout.

---

## 1. The Mental Model in 30 Seconds

The app is a single long-scroll landing page about Hoi An. It's composed of ~15 **section components** that all read from a single **`mockData.ts`** file. Behind the scenes, a **typed PostgreSQL schema** (Drizzle + Supabase) is fully defined and tested — but components haven't been wired to it yet.

```
Browser  →  src/components/*Section.tsx  →  src/data/mockData.ts
                                              ↑
                                          (will be replaced by)
                                              ↓
                                       src/db/* + Supabase
```

There are **three TypeScript projects** in this repo (see `tsconfig.json`):

| Project         | Config                       | What it covers                              |
| --------------- | ---------------------------- | ------------------------------------------- |
| `app`           | `tsconfig.app.json`          | Components, data, hooks, `App.tsx`          |
| `node`          | `tsconfig.node.json`         | Vite + scripts                              |
| `backend`       | `tsconfig.backend.json`      | `src/db`, `src/lib`, tests, `drizzle.config` |

`src/db` and `src/lib` are **excluded** from the app build on purpose — they reference `node:process` and `postgres`, which the browser bundle shouldn't pull in.

---

## 2. UI Map — What Each Section Does

Reading `src/App.tsx` top to bottom:

| Order | Component                | Purpose                                                                | Data source              |
| ----- | ------------------------ | ---------------------------------------------------------------------- | ------------------------ |
| 1     | `Navigation`             | Sticky header, hides/reveals style on scroll                           | inline                   |
| 2     | `HeroSection`            | Headline, subhead, search-by-category bar, hero image                  | `heroData`               |
| 3     | `CategoryShortcuts`      | 7 pill shortcuts to category landing pages                             | `categoryShortcuts`      |
| 4     | `HeritageSection`        | Editorial blurb about Hoi An's cultural fusion                        | `heritageData`           |
| 5     | `ThisMonthSection`       | Seasonal events & best-time-to-visit cards                             | `thisMonthData.items`    |
| 6     | `DiscoverSection`        | Visual grid of all 7 categories (image + count + CTA)                  | `discoverData.categories`|
| 7     | `HowToExplore`           | 4-step process (Discover → Plan → Experience → Share)                  | `howToExploreData.steps` |
| 8     | `ItinerarySection`       | Tabbed 24h / Weekend / Rainy-day timelines                            | `itineraryData.days`     |
| 9     | `ExperiencesDirectory`   | Filterable card grid of ~12 activities, each with `howTo` instructions | `experiencesData.items`  |
| 10    | `LocalSecretsSection`    | 6 insider tips attributed to local friends                             | `localSecretsData.secrets`|
| 11    | `FeaturedSection`        | Two long-form features (Japanese Bridge / Coconut Forest)             | `featuredData`           |
| 12    | `FoodSection`            | Editorial cards about signature dishes                                | `foodData.items`         |
| 13    | `PhotoGallerySection`    | Categorized mood-board gallery (All / Lanterns / Streets / …)         | `photoGalleryData.photos`|
| 14    | `NewsletterSection`      | Email capture for monthly insider guide                                | `newsletterData`         |
| 15    | `Footer`                 | Site map, contact, social, popular tags                                | `footerData`             |

All sections are pure presentational — none of them fetch. When you wire a section to the DB, drop the import from `mockData.ts` and replace it with a query result.

---

## 3. Where to Make Common Changes

### "I want to edit the hero copy"
→ `src/data/mockData.ts` → `heroData` object.

### "I want to add a new category"
1. `src/data/mockData.ts` → add to `categoryShortcuts` and `discoverData.categories`.
2. The color theme must be one of `heritage | food | nature | activity` (see [Theming](./README.md#theming)).
3. If you have a DB-backed category, also add a row in `supabase/migrations/00002_seed_data.sql` (or a new migration).

### "I want to change the color palette"
→ `src/index.css` — the `@theme { ... }` block. Tailwind v4 reads these directly; no JS config needed.

### "I want to change the fonts"
→ `index.html` (the Google Fonts `<link>` tags) and `src/index.css` (`font-family` references in component classes).

### "I want to add a new section"
1. Create `src/components/MyNewSection.tsx`. Default-export a component.
2. Add the data shape to `src/data/mockData.ts`.
3. Import + render it inside `<main>` in `src/App.tsx`.

### "I want to read from the database instead of mock data"
1. Import the relevant Drizzle table from `src/db/schema.ts`.
2. Use `db` from `src/db/index.ts` to query.
3. Validate any `content_json` from `place_contents` through `validateContentJson(type, data)` in `src/db/validations.ts` before reading.
4. Add a Vitest under `tests/db/` for the query.

---

## 4. The Data Layer in Detail

### `src/db/schema.ts`

Eleven tables. Read it as three groups:

**Lookup tables (text PKs)**
- `locations` — destinations (start with `hoian`)
- `categories` — 7 top-level categories, with a `color_theme` CHECK constraint
- `tags` — themes, eras, features; `(type)` CHECK in `('theme', 'era', 'feature')`

**Content tables (uuid PKs)**
- `places` — the core entity. Belongs to a `location` and a `category`. Has lat/lng, SEO meta, `published` flag, `sort_order`.
- `contributors` — locals and travelers who provide quotes, photos, corrections.
- `placeContents` — typed long-form content blocks (`history | comparison | story | tip | highlight`), stored as `jsonb`. The Zod schema in `validations.ts` matches each `type`.
- `placeMedia` — photos (past/present), video, audio, document. URLs are split into `url` / `thumbnail_url` / `medium_url` / `large_url` for responsive serving.

**Junction tables**
- `placeTags` — many-to-many places ↔ tags
- `placeMediaAssignments` — many-to-many places ↔ media, with a `role` (`hero | gallery`) and `sort_order`

**Community**
- `localVoices` — quotes tied to a place and (optionally) a contributor. `verified` + `published` flag the editorial gate.
- `submissions` — user-submitted content. `type = 'new_place'` requires `place_id IS NULL`; `local_voice` and `correction` require it set. Status workflow: `pending → approved | rejected`.

### `src/db/validations.ts`

Defines all the enums in two places — the SQL CHECK constraints **and** the Zod enums — and they must stay in sync. If you add a new color theme or content type:

1. Add to the SQL CHECK in `supabase/migrations/00001_initial_schema.sql` (and a new migration if it's a live DB).
2. Add to the matching `z.enum([...])` in `validations.ts`.
3. If it's a new `place_contents` type, add a Zod schema and wire it into `contentJsonSchemaByType`.

The `ContentJson` discriminated union in `src/db/types.ts` mirrors this so TypeScript narrows correctly when reading `place_contents.content_json`.

### `src/db/index.ts`

A standard Drizzle + `postgres-js` client. It throws if `DATABASE_URL` is missing. There is currently only one consumer path: the tests in `tests/db/`. The frontend does not import it yet (and `tsconfig.app.json` excludes it).

### `src/lib/supabase.ts`

Browser-safe Supabase client. The env var names are `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` for historical reasons — the project is plain Vite + React, not Next.js. The prefix is preserved to keep the Supabase dashboard config simple. **Rename only if you also rename the keys in `.env.example` and your hosting provider.**

### `src/lib/utils.ts`

Three things:
- Re-exports of the enum arrays from `validations.ts` for ergonomic consumption.
- `slugify(text)` — used in the content authoring flow.
- `eraDisplayName(era)` — maps the era enum (`1800s | 1900s | colonial | pre-war | present`) to a human label.

---

## 5. Migrations Cheat-Sheet

| File                                  | Purpose                                                      |
| ------------------------------------- | ------------------------------------------------------------ |
| `00001_initial_schema.sql`            | All 11 tables, CHECK constraints, indexes, FKs               |
| `00002_seed_data.sql`                 | Initial seed (locations, categories, sample places)          |
| `00003_triggers_and_guards.sql`       | Triggers (e.g. `updated_at` maintenance) and CHECK guards    |
| `00004_rls_policies.sql`              | Row-Level Security policies                                  |
| `00005_category_taxonomy_update.sql`  | Refined the category taxonomy                                |

**Order matters.** Apply them in numeric order, or use `supabase db reset` (local) which replays them from scratch.

**To add a new migration:**

1. Create `supabase/migrations/00006_your_change.sql`.
2. Apply it: `supabase db reset` (local) or `psql $DATABASE_URL -f …` (remote).
3. If you changed a table, update `src/db/schema.ts` to match — and consider regenerating types with `drizzle-kit generate` to compare.
4. Add or update a test in `tests/db/`.

---

## 6. Common Local Development Tasks

### First-time setup
```bash
nvm use 20                # or whatever brings Node ≥ 20
npm install
cp .env.example .env
# fill in DATABASE_URL, Supabase keys
supabase start
supabase db reset
npm run dev
```

### Run the tests
```bash
npm test
```

### Lint
```bash
npm run lint
```

### Build a production bundle
```bash
npm run build
npm run preview    # serves dist/ on http://localhost:4173
```

### Reset the local database to a clean seeded state
```bash
supabase db reset
```

---

## 7. Debugging Tips

- **"Module not found: @/db/..."** — the `@/` alias is set in `tsconfig.backend.json` and `vitest.config.ts` only. Frontend code should use **relative imports** (`../db/schema`) — that's how the existing components do it.
- **"Cannot find module 'postgres'"** in a Vite build — you imported from `src/db` in a component. `tsconfig.app.json` excludes `src/db` to keep `postgres` and `node:*` out of the browser bundle. Use Supabase (`@supabase/supabase-js`) for browser-side DB access, or run the query on the server.
- **Tailwind class not applying** — Tailwind v4 picks up classes by scanning the source. Custom tokens go in the `@theme` block in `src/index.css`, not in `tailwind.config.js` (there isn't one).
- **Color looks wrong** — check the `color_theme` value: it must be `heritage | food | nature | activity`. The Drizzle `check` constraint and the SQL migration agree on the same set.

---

## 8. Glossary

- **Place** — a single heritage site, restaurant, beach, workshop, etc. Has a `category` and a `location`, plus media and content blocks.
- **Category** — top-level grouping (Heritage, Food, Nature, Arts, Activities, Local Life, Stays). Has a fixed `color_theme` for UI theming.
- **Era** — one of `1800s | 1900s | colonial | pre-war | present`. Used on `place_contents` (history) and `place_media` (photo-past).
- **Contributor** — a local or traveler attributed to a quote or media. Can be `null` on `local_voices` (anonymous).
- **Submission** — a user-submitted correction, local voice, or new place. Goes through a `pending → approved/rejected` workflow.
