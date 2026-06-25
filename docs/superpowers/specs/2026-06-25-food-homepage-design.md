# Food Homepage Design

**Date:** 2026-06-25
**Status:** Approved (pending user spec review)
**Scope:** Redesign of `src/pages/FoodPage.tsx` — the Food category page for Hoi An Heritage Hub.

## Goal

Help first-time travelers to Hoi An discover:
1. What food they should try (special courses / must-try dishes).
2. Where they can eat it (places matching their vibe and style).
3. The stories and cultural insights behind the food.

## Target users

- First-time visitors to Hoi An.
- Travelers who want quick recommendations.
- Travelers who care about the food experience, not just restaurant listings.

## Design principles

- Simple, clean UI. Easy to scan.
- Information-rich but not overwhelming.
- Search-friendly.
- Curated, editorial voice (the "living museum" brand promise from CONTEXT.md).
- Extensible via the Vocabulary pattern (`src/domain/vocabulary.ts` → Zod → SQL CHECK → snapshot test).

## Decisions (from brainstorming session)

| Question | Decision |
|---|---|
| Scope | Redesign the existing Hoi An `FoodPage.tsx` in this repo. Reuse data, design tokens, and conventions. |
| Primary job on first visit | Lead with a short editorial "food story of Hoi An" intro, then split into dishes and places. |
| Search/filter architecture | Architecture B: scoped filters. Search bar searches Dishes + Places only. Vibe tags + structured filters live only inside the Places section. Dishes and Stories stay editorial (un-filterable). Dish→Place connected via click-through, not shared filters. |
| Click behavior | Hybrid: dish click stays in-page (filters Places directory below); place click navigates to `/food/place/<slug>` detail page. |
| Vibe tags | 8 tags in two groups (setting: Riverside, Rice paddy, Rooftop, Heritage interior, Garden, Beachside; character: Hidden gem, Local favorite). Soft, multi-select, hand-curated. |
| Structured filters | 5 filters (Price, Open now, Neighborhood, Cuisine, Pet-friendly). Hard, categorical. Live inside a `Filters` drawer, not always visible. |
| Filter UI pattern | Pattern C: vibe chips primary (always visible), structured filters in a drawer. Active filters render as removable chips above the grid. |
| Place card content | Editorial-rich: image, name, one-line description, neighborhood, price, top 2-3 vibe chips, Open now badge, signature dish badges, rating. |
| Stories section | Keep the bento (2 large + 2 mini). Add bidirectional dish/place badges. Add "More food stories →" link to future archive. |
| Page composition | Approach 3: utility-led with editorial bookends. Editorial intro → search → dishes → Places (dominant) → stories (closing bookend). |
| Extensibility | Hard constraint. Vibe tags and structured filters must be extensible via the Vocabulary pattern. Adding a tag or filter = one vocabulary edit + one migration + snapshot test update. |

---

## 1. Homepage structure

**Page:** `src/pages/FoodPage.tsx` (replaces current implementation).

| # | Section | Type | Role | Weight |
|---|---|---|---|---|
| 1 | Editorial intro | Editorial | Open the brand promise. Short hero with image + headline + 1-paragraph orientation. Broader than the current Cao Lau-only hero. | Medium |
| 2 | Search bar | Utility | Direct-lookup. Searches Dishes + Places only (not Stories). | Small |
| 3 | Must-Taste Dishes | Editorial | 6-12 curated dish cards (horizontal scroller). Click a dish → filters Places directory to "serves this dish." | Medium |
| 4 | **Places to Eat** | **Utility (dominant)** | Vibe tag chips (8) + `Filters` button (5 structured filters in drawer) + 6-8 place cards. Active filters as removable chips. Live match count. No-results guidance. | **Largest** |
| 5 | Kitchen Stories | Editorial | Bento: 2 large + 2 mini story cards. Bidirectional dish/place badges. "More food stories →" link to future archive. | Medium |

### Section relationships

- **Dish → Place:** click a dish in §3 → §4 grid auto-filters to places serving that dish. Vibe and structured filters compose on top (e.g. "Cao Lau + Hidden gem + $$").
- **Place → Dish:** each place card in §4 shows badges for signature dishes it serves. Clicking a badge scrolls up to that dish in §3.
- **Story → both:** each story card in §5 shows dish + place mentioned badges. Dish badge → scrolls up to §3. Place badge → navigates to `/food/place/<slug>`.
- **Vibe chips and structured filters never apply to Dishes or Stories.** They live only in §4. Vibe is a place attribute, not a dish attribute.

### What's dropped from current `FoodPage.tsx`

The current hero focuses on a single dish ("The Golden Secret of Cao Lau"). The new hero broadens to the food landscape (Cao Lau can still be the hero image, but the framing is the whole cuisine). The single-dish deep-dive content moves to a story in §5 or a future dish detail page.

---

## 2. Section-by-section UX

### §1 Editorial intro

**Content:**
- Full-bleed hero image (Cao Lau noodles or lantern-lit night market). Existing `animate-breath` Ken Burns effect.
- Eyebrow pill: `HERITAGE CUISINE` (reuse `text-on-tertiary-fixed-variant bg-tertiary-fixed`).
- Headline: broader framing, e.g. "Three cuisines, one ancient town." (Sets up the Japanese/Chinese/European fusion thesis.)
- 1-paragraph orientation (~40-60 words): names the food cultures, hints at the dish + place + story journey.
- Single CTA: "Discover the flavors" — smooth-scrolls to §3.

**UX notes:**
- No search bar in the hero (search lives in §2). Keeps hero uncluttered.
- Mobile: hero height ~520px (reduced from current 707px) to keep search bar above the fold.
- Reuse existing `pb-hero-pad-sm md:pb-hero-pad-lg` padding tokens.

### §2 Search bar

**Content & behavior:**
- One input, max-w-2xl centered on desktop, full width on mobile.
- Placeholder: "Search dishes or places…"
- Searches two indices: Dishes (from §3 data) + Places (from §4 data). Not Stories.
- Debounced 200ms. Dropdown shows max 5 dishes (dish icon) + 5 places (location icon).
- Dish result click → smooth-scroll to that dish card in §3.
- Place result click → navigate to `/food/place/<slug>`.
- Empty query → dropdown hidden.

**UX notes:**
- Sticky variant appears on scroll-up only (hides on scroll-down). Optional — can defer.
- Visual: `surface-container-low` background, `outline-variant` border, `primary` focus ring.

### §3 Must-Taste Dishes

**Content & layout:**
- Section heading: "Must-Taste Icons" + subtitle "Essential flavors that define the Ancient Town's palate."
- Horizontal scroller (existing pattern: `flex overflow-x-auto gap-gutter hide-scrollbar` + chevron buttons on desktop). 6-12 cards.
- **Dish card:**
  - Image (aspect 3/4) with `group-hover:scale-105` zoom.
  - Top-left badge: editorial tag (`THE WORLD'S BEST`, `STREET CLASSIC`, etc.).
  - Bottom overlay: dish name + one-line story teaser (new).
  - Below image: location pin + neighborhood + price band.
  - One primary vibe tag chip (e.g. `Local favorite`) — previews the vibe vocabulary.
  - "Where to try it →" affordance on hover.
- **Click behavior:** clicking the card smooth-scrolls to §4 and auto-applies a `serves=this-dish` filter. The Places heading updates to "Places serving Cao Lau" with a clear-able chip.

**UX notes:**
- Cards stay editorial — no rating, no "add to list."
- Reveal animation: per-card `<Reveal delay={index * 100}>`.

### §4 Places to Eat (dominant section)

**Content & layout:**
- Section heading: "Places to Eat" + subtitle "Find a table that matches your mood."
- **Vibe tag row (always visible):** 8 chips in two groups:
  - Setting (6): Riverside, Rice paddy, Rooftop, Heritage interior, Garden, Beachside — tinted with `food` ColorTheme (`bg-tertiary-container/30 text-on-tertiary-container`).
  - Character (2): Hidden gem, Local favorite — same tint, icon prefix to distinguish.
  - Multi-select. Active = filled bg; inactive = outline only.
  - Horizontal wrap on mobile; `overflow-x-auto hide-scrollbar` on desktop.
- **`Filters` button:** right end of vibe row. Opens a drawer (desktop: right-side sheet; mobile: bottom sheet) with 5 structured filters:
  - Price — single-select chips: $, $$, $$$
  - Open now — toggle (default off)
  - Neighborhood — dropdown: Old Town, An Bang, Tra Que, Cam Thanh, Cam Nam, Riverside
  - Cuisine — multi-select chips: Vietnamese, Cao Lau, Banh Mi, Seafood, Vegetarian, Cafe, Fusion
  - Pet-friendly — toggle (default off)
  - Drawer actions: `Apply` / `Clear all` / `Close`. Apply is deferred (not live). Vibe chips are live (immediate).
- **Active filter chips row:** above grid, below vibe row. Every active constraint as a removable chip: `× Hidden gem  × $-$$  × Old Town  × Open now`. `Clear all` at right. Vibe chips use warm tint; structured filter chips use neutral outline (`border-outline-variant text-on-surface-variant`).
- **Match count:** "12 places match" left-aligned above grid, updates live.
- **Place grid:** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter`. Default 6-8 editor-curated cards. Filtered state re-renders in place with 200ms fade.
- **Place card (editorial-rich):**
  - Image (aspect 4/3) with hover zoom.
  - Top-left: primary vibe tag chip.
  - Top-right: `Open now` badge (green dot + "Open") or `Closed` (muted).
  - Body: name (headline font), one-line description (`line-clamp-1`), neighborhood + price band row, signature dish badges (capped 2 with `+N more` overflow), rating (e.g. `4.8 ★`).
  - Card click → `/food/place/<slug>`.
  - Dish badge click → smooth-scroll up to that dish in §3.
- **No results state:** "No places match all filters. Try removing `Rooftop`?" — suggested chip is clickable to relax. Never silently relax.
- **"View all places →"** link below grid → future `/food/places` archive.

**UX notes:**
- All filter state in local `useState` (mirrors `ExperiencesDirectory`). No global state.
- All controls use existing tokens. No new colors.
- `<Reveal>` for card entrance, staggered by `index % 3`.

### §5 Kitchen Stories

**Content & layout:**
- Section heading: "Kitchen Stories" + subtitle "The people behind the plate."
- Bento grid: `grid grid-cols-1 md:grid-cols-12 gap-8`.
  - 2 large cards (`md:col-span-8`, alternating image-left/right via `md:flex-row-reverse`).
  - 1 mini card (`md:col-span-4`) — vignette with icon + detail.
  - 1 visual card (`md:col-span-4`) — circular image or accent-color block.
- **Story card content:**
  - Large: image + tag + title + excerpt (2-3 lines) + bidirectional badges (`◦Cao Lau  ◦Ba Le Well`, capped 2-3) + `READ FULL STORY →` link to `/food/stories/<slug>`.
  - Mini: icon + title + 1-line excerpt + detail (e.g. "5:00 AM start").
  - Visual: accent color + short hook.
- **"More food stories →"** link below bento → future `/food/stories` archive.
- Min 3 cards visible above section fold (both large + one mini).

**UX notes:**
- Dish badge click → scrolls up to §3. Place badge click → `/food/place/<slug>`.
- Reuse existing bento styles from current `FoodPage.tsx`. We're adding badges + "More" link + route links.

---

## 3. Wireframe / layout

### Desktop (full page)

```
┌──────────────────────────────────────────────────────────────────┐
│  [NAV: Heritage · Food · Nature · Arts · Activities · Local ·…]  │
├──────────────────────────────────────────────────────────────────┤
│  [full-bleed hero image, Ken Burns breath]                       │
│  (HERITAGE CUISINE)                                              │
│  Three cuisines, one ancient town.                               │
│  Japanese noodle craft, Chinese broth logic, French              │
│  baguette — all folded into a UNESCO river port.                 │
│  [ Discover the flavors ↓ ]                                      │
├──────────────────────────────────────────────────────────────────┤
│         [ 🔍  Search dishes or places…              ]            │
├──────────────────────────────────────────────────────────────────┤
│  MUST-TASTE ICONS                            ◀  ▶                │
│  Essential flavors of the Ancient Town.                          │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐  ← horizontal scroll  │
│  │ 🍜 │ │ 🥟 │ │ 🥖 │ │ 🍚 │ │ ☕ │ │ 🍲 │                      │
│  │Cao │White│Banh │Com  │Heri │Mi   │                       │
│  │Lau │Rose │Mi   │Ga   │Cof  │Quang│                       │
│  │$$  │$$  │$    │$    │$    │$$  │                       │
│  │Local fav│Street│Hidden│…    │…   │…    │                       │
│  └────┘ └────┘ └────┘ └────┘ └────┘ └────┘                      │
├──────────────────────────────────────────────────────────────────┤
│  PLACES TO EAT                                                   │
│  Find a table that matches your mood.                            │
│  (Riverside)(Rice paddy)(Rooftop)(Heritage)(Garden)(Beachside)  │
│  (Hidden gem)(Local favorite)                       [ Filters ] │
│  Active: × Hidden gem  × $$  × Old Town  × Open now     Clear all    │
│  ────────────────────────────────────────────────────────── 12  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                        │
│  │ [img]    │ │ [img]    │ │ [img]    │                        │
│  │Hidden gem│ │Riverside │ │Local fav │                        │
│  │Thanh Cao │ │Ba Le Well│ │Madame Kh │                        │
│  │ Lau      │ │  Cao Lau │ │  Banh Mi │                        │
│  │"Noodle…."│ │"40-yr…." │ │"Queen of"│                        │
│  │Old Town$$│ │Old Town$$│ │Old Town$ │                        │
│  │★4.8 Open │ │★4.9 Open │ │★4.7 Closd│                        │
│  └──────────┘ └──────────┘ └──────────┘                        │
│              View all places →                                   │
├──────────────────────────────────────────────────────────────────┤
│  KITCHEN STORIES                                                 │
│  The people behind the plate.                                    │
│  ┌──────────────────────┐ ┌──────────────┐                      │
│  │ [large image]        │ │ [image]      │                      │
│  │ THE VENDOR'S TALE    │ │ MARKET SECR  │                      │
│  │ The Keeper of the    │ │ Under the    │                      │
│  │ Well                 │ │ Red Roofs    │                      │
│  │ ◦Cao Lau ◦Ba Le Well │ │ ◦Banh Mi     │                      │
│  │ READ FULL STORY →    │ │ READ →       │                      │
│  └──────────────────────┘ └──────────────┘                      │
│  ┌─────────┐ ┌──────────────────────┐                          │
│  │ ◯ SPICE │ │ MARKET MORNING       │                          │
│  │ OF LIFE │ │ 5:00 AM · herbs      │                          │
│  └─────────┘ └──────────────────────┘                          │
│              More food stories →                                 │
├──────────────────────────────────────────────────────────────────┤
│  [FOOTER]                                                        │
└──────────────────────────────────────────────────────────────────┘
```

### Mobile (key differences)

- Hero: ~520px (reduced from 707px) to keep search bar above the fold.
- Search bar: full width, flush below hero.
- Dish cards: horizontal swipe, ~160px wide each.
- Vibe chips: wrap to 2 rows (3-4 per row).
- Filter drawer: bottom sheet (thumb-reachable) instead of right-side sheet.
- Place grid: 1 column.
- Bento: single-column stack.

---

## 4. Data model & extensibility

### New vocabulary (in `src/domain/vocabulary.ts`)

All new enums follow the existing `COLOR_THEMES` pattern: `as const` array → Zod enum in `src/db/validations.ts` → SQL CHECK in a migration → snapshot test in `tests/db/vocabulary.test.ts`.

**`VIBE_TAGS`** — 8 soft tags:

| id | label | group |
|---|---|---|
| `riverside` | Riverside | setting |
| `rice-paddy` | Rice paddy | setting |
| `rooftop` | Rooftop | setting |
| `heritage-interior` | Heritage interior | setting |
| `garden` | Garden | setting |
| `beachside` | Beachside | setting |
| `hidden-gem` | Hidden gem | character |
| `local-favorite` | Local favorite | character |

Extending: add an entry here + one migration. UI auto-renders the new chip.

**`PLACE_FILTERS`** — 5 structured filters (metadata):

| id | label | control | values |
|---|---|---|---|
| `price` | Price | single-select | `$`, `$$`, `$$$` |
| `open-now` | Open now | toggle | (boolean) |
| `neighborhood` | Neighborhood | dropdown | `old-town`, `an-bang`, `tra-que`, `cam-thanh`, `cam-nam`, `riverside` |
| `cuisine` | Cuisine | multi-select | `vietnamese`, `cao-lau`, `banh-mi`, `seafood`, `vegetarian`, `cafe`, `fusion` |
| `pet-friendly` | Pet-friendly | toggle | (boolean) |

Extending: add a filter entry here. The `Filters` drawer auto-renders it. Backend adds the matching column or tag.

**`NEIGHBORHOODS`** and **`CUISINES`** — derived from `PLACE_FILTERS.values`, also usable standalone for place detail pages and search indexing.

### Schema changes (new migration `supabase/migrations/00006_food_directory.sql`)

**Chosen approach: vibes as tags, structured as columns.**

- Extend `tags.type` CHECK to include `'vibe'` (currently `'theme'|'era'|'feature'`). Vibe tags reuse the existing `place_tags` junction — no new junction table.
- Add columns to `places`:
  - `price_band TEXT CHECK (price_band IN ('$','$$','$$$'))`
  - `opening_hours JSONB` — `{mon:"7-21", tue:"7-21", ...}` for `open-now` computation.
  - `pet_friendly BOOLEAN DEFAULT false`
  - `cuisine TEXT[]` — multi-value array.
  - `rating DECIMAL(2,1)` — editorial or aggregated.
- `neighborhood` is derived from the existing `locations` table — no new column.
- `open-now` is computed at query time from `opening_hours` + current time in the **live Supabase adapter** (future). The **mock adapter** uses a static `openNow: boolean` field per place for simplicity.
- `rating` is a static editorial value in the **mock adapter** (`rating: number` per place). The **live adapter** may source it from aggregated reviews or keep it editorial — a separate decision.

**Rejected alternative:** all-as-tags (vibes + structured in `place_tags`). Loses SQL filtering performance and makes `open-now` impossible to compute. Rejected.

**Extensibility test:** `tests/db/vocabulary.test.ts` snapshot test fails until the migration lands — same workflow as `COLOR_THEMES` (per CONTEXT.md). Adding a 9th vibe tag or 6th structured filter = one vocabulary edit + one migration + snapshot update.

### New adapters (mock, in `src/data/sections/`)

**`src/data/sections/places.ts`** — `PlacesData` type + mock data:

```ts
export interface PlaceEntry {
  id: string;
  slug: string;
  name: string;
  imageUrl: string;
  neighborhood: string;
  priceBand: "$" | "$$" | "$$$";
  description: string;
  rating: number;
  openNow: boolean;
  vibeTagIds: readonly VibeTagId[];
  cuisine: readonly CuisineId[];
  petFriendly: boolean;
  signatureDishIds: readonly string[];
}

export interface PlacesData {
  subtitle: string;
  title: string;
  description: string;
  places: readonly PlaceEntry[];
}

export const placesData: PlacesData = { /* 8 mock places */ };
```

**`src/data/sections/foodStories.ts`** — `FoodStoriesData` type + mock data:

```ts
export interface FoodStoryEntry {
  id: string;
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  span: string;
  dishIds: readonly string[];
  placeIds: readonly string[];
  variant: "large" | "mini" | "visual";
}

export const foodStoriesData: FoodStoriesData = { /* 4 mock stories */ };
```

**Extend `src/data/sections/food.ts`** — add `id`, `vibeTagId`, `storyTeaser` to each dish entry. Dishes currently lack ids, which are needed for dish→place and story→dish links.

### New page-level types (in `src/domain/types.ts`)

Following the existing `FoodData` named type pattern:
- `PlacesData` (consumed by `PlacesDirectory` component).
- `FoodStoriesData` (consumed by `KitchenStories` component — replaces the inline `kitchenStories` const in `FoodPage.tsx`).
- Extend the existing `FoodData` dish item shape with `id`, `vibeTagId`, `storyTeaser`.

---

## 5. Routes & navigation

### New routes

| Route | Component | Status |
|---|---|---|
| `/food` | `FoodPage` (redesigned) | In scope — this spec. |
| `/food/place/:slug` | `PlaceDetailPage` (new) | Out of scope — stub route ("coming soon") so links don't 404. |
| `/food/stories/:slug` | `FoodStoryPage` (new) | Out of scope — stub route. |
| `/food/stories` | `FoodStoriesArchive` | Out of scope — stub route. |
| `/food/places` | `PlacesArchive` | Out of scope — stub route. |

**In-scope:** only `/food` (the redesigned homepage). Stub routes exist so homepage links (place cards, story cards, "More" links) don't 404. Each stub renders "This page is coming soon" with a back-to-`/food` link.

### In-page navigation (smooth scroll)

- Dish card click (§3) → smooth-scroll to `#places-to-eat` + set `serves-dish=<id>` filter state in §4.
- Place card dish badge click (§4) → smooth-scroll up to the matching dish card in §3.
- Story card dish badge click (§5) → smooth-scroll up to §3.
- Story card place badge click (§5) → navigate to `/food/place/<slug>`.
- Hero CTA → smooth-scroll to §3.
- All smooth-scroll targets use `id` attributes on section wrappers.

### Search bar navigation

- Dish result click → smooth-scroll to that dish card in §3.
- Place result click → navigate to `/food/place/<slug>`.

---

## 6. Best practices for clean-but-data-rich

1. **Progressive disclosure.** The homepage shows curated subsets (6-12 dishes, 6-8 places, 4 stories). Full directories live behind "View all →" links to future archive pages. The homepage is a showcase, not a database dump.

2. **Two-tier visual language without two rows.** Vibe chips (warm `food` ColorTheme tint) vs structured filter chips (neutral outline) — same shape, different tint. Users perceive two mental models without chrome overhead. The `Filters` drawer hides the 5 structured controls until requested.

3. **Editorial sections stay un-filterable.** Dishes and Stories are curated. Filtering them would undermine the editorial promise. Only the Places directory is interactive. This respects the scale mismatch (6-12 dishes vs 50+ places) and the category boundary (vibes are place attributes, not dish attributes).

4. **Bidirectional links, not unified filters.** Sections connect via click-through (dish→place, place→dish, story→both) rather than shared filter state. This composes the two jobs without forcing one filter vocabulary onto two different content types.

5. **Live vs. deferred filtering.** Vibe chips filter live (immediate, low cognitive cost). Structured filters apply on drawer `Apply` (avoids jarring re-renders while setting multiple constraints). Active filter chips always visible above the grid.

6. **Match count + no-results guidance.** "12 places match" sets expectations. On zero results, suggest the strictest filter to relax — never silently relax (erodes trust in filter state).

7. **Reuse existing patterns.** `<Reveal>` for scroll animations, `ExperiencesDirectory`'s `useState` filter pattern, `FoodPage`'s existing bento + horizontal scroller. No new animation or state management primitives.

8. **Extensibility via the Vocabulary pattern.** Every enum (`VIBE_TAGS`, `PLACE_FILTERS`, `NEIGHBORHOODS`, `CUISINES`) lives as an `as const` array in `src/domain/vocabulary.ts` with Zod + SQL CHECK + snapshot test. Adding a tag or filter is a one-file edit + one migration. UI auto-renders from the array — no hardcoded chip lists in components.

9. **Sticky search on scroll-up only.** The search bar sticks to the top when scrolling up but hides when scrolling down. Optional — can defer to a later iteration.

10. **Mobile-first density control.** Vibe chips wrap to 2 rows. Place grid collapses to 1 column. Bento collapses to single-column stack. Hero shrinks to ~520px. Filter drawer becomes a bottom sheet on mobile (thumb-reachable) vs. right-side sheet on desktop.

---

## Out of scope

- Place detail page (`/food/place/:slug`) — stub only.
- Story detail page (`/food/stories/:slug`) — stub only.
- Stories archive (`/food/stories`) — stub only.
- Places archive (`/food/places`) — stub only.
- Live Supabase adapter — mock adapter only (per the existing Adapter pattern; live adapter is a future work item).
- Sticky search bar on scroll — optional, can defer.
- User-submitted content / community moderation — existing DB has `submissions` table but this spec doesn't wire it up.

## Open questions for implementation

- Should the search bar's live dropdown index be built from the mock adapter data at module load, or computed on each keystroke? (Performance question for implementation.)
- Should the `Filters` drawer's `Apply` button show a preview count ("12 matches") before applying? (Nice-to-have, not required.)
- Should dish cards in §3 show a "serves at N places" count to set expectations before click-through? (Depends on mock data shape.)
