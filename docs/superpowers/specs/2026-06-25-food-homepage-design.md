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
| Click behavior | Hybrid: dish click stays in-page (filters Places directory below); place click opens the in-page expandable/modal. |
| Vibe tags | 8 tags in two groups (setting: Riverside, Rice paddy, Rooftop, Heritage interior, Garden, Beachside; character: Hidden gem, Local favorite). Soft, multi-select, hand-curated. |
| Structured filters | 4 filters (Price, Open now, Neighborhood, Pet-friendly). Hard, categorical. Live inside a `Filters` drawer, not always visible. |
| Filter UI pattern | Pattern C: vibe chips primary (always visible), structured filters in a drawer. Active filters render as removable chips above the grid. |
| Place card content | Scan-optimized: image, name, neighborhood, price, primary vibe chip, Open now badge, signature dish badges. Description, rating, hours, and full dish list live in the in-page expandable. |
| Stories section | Keep the bento (2 large + 2 mini). Add bidirectional dish/place badges. Add "More food stories →" link to future archive. |
| Page composition | Approach 3: utility-led with editorial bookends. Editorial intro → search → dishes → Places (dominant) → stories (closing bookend). |
| Extensibility | Hard constraint. Vibe tags and structured filters must be extensible via the Vocabulary pattern. Adding a tag or filter = one vocabulary edit + one migration + snapshot test update. |

---

## 1. Homepage structure

**Page:** `src/pages/FoodPage.tsx` (replaces current implementation).

| # | Section | Type | Role | Weight |
|---|---|---|---|---|
| 1 | Editorial intro | Editorial | Open the brand promise. Short hero with image + headline + 1-paragraph orientation. Broader than the current Cao Lau-only hero. | Medium |
| 2 | Search bar | Utility | Direct-lookup in a compact strip below the hero. Searches Dishes + Places only (not Stories). | Small strip |
| 3 | Must-Taste Dishes | Editorial | 6-12 curated dish cards (horizontal scroller). Click a dish → filters Places directory to "serves this dish." | Medium |
| 4 | **Places to Eat** | **Utility (dominant)** | 4 featured vibe chips + `More vibes` + `Filters` button (5 structured filters in drawer) + 6 starting place cards (8 when filtered). Active filters as removable chips. Live match count. No-results guidance. | **Largest** |
| 5 | Kitchen Stories | Editorial | Bento: 2 large + 1 mini + 1 visual story card. Bidirectional dish/place badges. "More food stories →" link to future archive. | Medium |

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
- Headline: "Three cuisines, one ancient town — start with Cao Lau." (Keeps the thesis but retains a concrete dish anchor for first-time visitors.)
- 1-paragraph orientation (~40-60 words): names the food cultures, hints at the dish + place + story journey.
- Single CTA: "Discover the flavors" — smooth-scrolls to §3.

**UX notes:**
- The search bar (§2) lives in a compact `surface-container` strip directly below the hero — not overlaid on the image, not a full 120px section. This preserves legibility and the 120px `--spacing-section-gap` rhythm for the real content sections.
- Mobile: hero height ~520px (reduced from current 707px) to keep search bar above the fold.
- Reuse existing `pb-hero-pad-sm md:pb-hero-pad-lg` padding tokens (used in current `FoodPage.tsx:66`; verify token provenance during implementation — may need to be added to `index.css` if not defined elsewhere).

### §2 Search bar (below hero, compact strip)

**Content & behavior:**
- One input, max-w-2xl centered on desktop, full width on mobile. Sits in a compact `surface-container` strip (~80px tall) directly below the hero — not a full 120px section, and not overlaid on the Ken Burns image.
- Placeholder: "Search dishes or places…"
- Searches two indices: Dishes (from §3 data) + Places (from §4 data). Not Stories.
- Debounced 200ms. Dropdown shows max 5 dishes (dish icon) + 5 places (location icon).
- **Dropdown styling:** `bg-surface-container-lowest` (white) with `border-outline-variant`, `shadow-lg`, `rounded-xl`. Dish results show a `restaurant` icon; place results show a `location_on` icon. Each result: name + one-line meta (dish: neighborhood; place: neighborhood + price).
- **Empty state (0 matches):** dropdown shows "No matches for '<query>'" with a muted icon. Not hidden.
- **Vibe suggestion:** if the query fuzzy-matches a vibe tag id or label (e.g. "river" → "Riverside", "quiet" → "Hidden gem"), show a "Try vibe: Riverside" suggestion above the result list. Clicking it closes the dropdown and activates that vibe chip in §4 (smooth-scroll to Places).
- **Keyboard navigation:** Arrow Up/Down moves highlight, Enter selects highlighted result, Escape closes dropdown. ARIA: `role="combobox"`, `aria-expanded`, `aria-activedescendant` on the input; `role="listbox"` and `role="option"` on the dropdown.
- **Dismiss:** click outside the dropdown closes it.
- Dish result click → smooth-scroll to that dish card in §3 (and `scrollIntoView({inline:'center'})` the specific card in the horizontal scroller).
- Place result click → navigate to `/food/place/<slug>`.
- Empty query → dropdown hidden.

**UX notes:**
- Sticky variant appears on scroll-up only (hides on scroll-down). This is in-scope, not optional — on a tall page with a dominant Places section, sticky search serves the "Search-friendly" design principle.
- Mobile: dropdown overlays as a sheet anchored to the search bar, max-height 50vh, with a scrim behind. Does not push content down.
- Visual: `surface-container-low` background, `outline-variant` border, `primary` focus ring.

### §3 Must-Taste Dishes

**Content & layout:**
- Section heading: "Must-Taste Icons" + subtitle "Essential flavors that define the Ancient Town's palate."
- Horizontal scroller (existing pattern: `flex overflow-x-auto gap-gutter hide-scrollbar` + chevron buttons on desktop, hidden on mobile with swipe implied). 6-12 cards.
- **Dish card:**
  - Image (aspect 3/4) with `group-hover:scale-110` zoom (matches `FoodSection.tsx:31`, `ExperiencesDirectory.tsx:57`, current `FoodPage.tsx:109` — not `scale-105`).
  - Top-left badge: editorial tag (`THE WORLD'S BEST`, `STREET CLASSIC`, etc.).
  - Bottom overlay: dish name + one-line story teaser (new).
  - Below image (single info zone, matching place card body pattern): location pin + neighborhood + price band + "Serves at N places" count (sets expectations before click-through; derived from `servingPlaceCount` in the dish adapter).
  - No vibe tag on dish cards. The spec's own rule is "vibes are place attributes, not dish attributes" (§1) — showing a vibe tag on a dish contradicts that rule. Removed.
  - "Where to try it →" affordance on hover (only shown if `signatureDishIds` on places yields > 0; a dish with 0 serving places hides the affordance).
- **Click behavior:** clicking the card (with `serves-place-count > 0`) smooth-scrolls to §4 and sets a `serves-dish=<id>` filter. The Places heading updates to "Places serving Cao Lau" with a clear-able chip. See §4 "Dish filter composition" for how this interacts with existing filters.

**UX notes:**
- Cards stay editorial — no rating, no "add to list."
- Reveal animation: per-card `<Reveal delay={index * 100}>`.
- Place→Dish scroll-back (from §4 or §5) must also `scrollIntoView({inline:'center'})` the specific dish card in the horizontal scroller, not just scroll to §3.

### §4 Places to Eat (dominant section)

**Content & layout:**
- Section heading: "Places to Eat" + subtitle "Find a table that matches your mood." Uses `text-headline` (32px) like other section headings. Dominance comes from content volume and interactivity, not heading size.
- **Vibe tag row (progressive disclosure):** 4 featured chips always visible, plus a `More vibes` button that expands to reveal the remaining 4. This keeps the default row scannable while preserving the full 8-tag vocabulary.
  - Featured 4: Riverside, Rice paddy, Hidden gem, Local favorite.
  - Revealed via `More vibes`: Rooftop, Heritage interior, Garden, Beachside.
  - All 8 share the same `food` ColorTheme tint (`bg-tertiary-container/30 text-on-tertiary-container`).
  - Two groups are still distinguished by a `·` divider and icon prefixes: setting tags (Riverside, Rice paddy, Rooftop, Heritage interior, Garden, Beachside) vs character tags (Hidden gem, Local favorite).
  - Multi-select. Active = filled bg; inactive = outline only.
  - Horizontal wrap on mobile; `overflow-x-auto hide-scrollbar` on desktop.
- **`Filters` button:** right end of vibe row. Opens a drawer (desktop: right-side sheet, 300ms slide — matches `btn-hover` duration; mobile: bottom sheet) with 5 structured filters:
  - Price — single-select chips: $, $$, $$$
  - Open now — toggle (default off)
  - Neighborhood — dropdown: Old Town, An Bang, Tra Que, Cam Thanh, Cam Nam, Riverside
  - Pet-friendly — toggle (default off)
  - **Drawer behavior:** all filters are **live** (same as vibe chips — no Apply button). Toggling a filter immediately updates the grid. This removes the live-vs-deferred inconsistency. Drawer actions: `Clear all` (clears all filters, vibes + structured) and `Close` (closes drawer — since filters are live, there are no "unsaved changes" to discard). A dot appears on the `Filters` button when any structured filter is active.
  - Drawer uses `rounded-xl` (largest defined radius token, 0.75rem) and `bg-surface-container-lowest`.
- **Active filter chips row:** above grid, below vibe row. Active constraints render as removable chips. **Two labeled groups** with a separator: `Vibe: × Hidden gem  × Riverside  |  Filters: × $$  × Old Town  × Open now`. `Clear all` at right clears both groups. Vibe chips use warm tint; structured filter chips use `border-outline` (#837567, darker/cooler than `outline-variant` #cfc6ae) for actual contrast against the warm vibe chips.
- **Match count / visible cap:** "Showing 6 of 12 places" left-aligned above grid in default state (no filters). In default state, only the 6 editor-curated starting places render; "View all 12 →" links to the full archive. Once any filter is active, all matching places render up to a cap of 8; if more than 8 match, the first 8 render with "View all N →" below the grid. The first number is the visible count; the second is the total matching current filters.
- **Place grid:** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter`. Default shows 6-8 editor-curated cards. Filtered state re-renders in place with a 200ms fade (add `--animate-fade-fast: fade-fast 200ms ease-out` to `index.css` so the duration isn't a magic number; `@keyframes fade-fast { from { opacity: 0.4 } to { opacity: 1 } }`).
- **Place card (scan-optimized):**
  - Image (aspect 4/3) with `group-hover:scale-110` zoom.
  - Top-left: primary vibe tag chip.
  - Top-right: `Open now` badge — icon + word + `--color-success`.
  - Body (single info zone below image): name (headline font), neighborhood + price band row, signature dish badges — capped at 2 on `lg:grid-cols-3` with `+N more` overflow.
  - The one-line description, rating, hours, and full dish list live in the in-page expandable/modal, not on the card. This keeps the grid scannable and clean.
  - Card click → opens the in-page expandable/modal.
  - Dish badge click → smooth-scroll up to that dish in §3 with `scrollIntoView({inline:'center'})`.
- **Dish filter composition (from §3 click-through):** when a user clicks a dish in §3, the `serves-dish` filter **replaces** any prior dish filter (only one dish active at a time) and **composes with** existing vibe/structured filters. Example: user has `Hidden gem + $$` active, clicks Cao Lau → Places shows places that are Hidden gem AND $$ AND serve Cao Lau. If composition yields zero results, the no-results state (below) surfaces the dish chip as a relaxation candidate: "No places serving Cao Lau match your other filters — clear them?"
- **No results state:** "No places match all filters." Below the message, show the suggested relaxation: for each active filter, compute the count if that filter alone were removed; suggest the one yielding the most results. Tie-break order: structured > vibe > dish. The suggested filter renders as a clickable chip ("Try removing Rooftop?"). If the dish filter is the sole cause (0 places serve it regardless of other filters), surface the dish chip explicitly. Never silently relax.
- **Loading state:** while the adapter loads, show a 3-card skeleton grid (pulsing `bg-surface-container` blocks with `animate-pulse-slow`).
- **Genuinely-empty state (0 places in adapter, distinct from filter no-results):** editorial message "We're still curating Hoi An's tables — check back soon." with a link to `/food/stories` as an alternative.
- **"View all places →"** link below the grid → future `/food/places` archive. Only shown when filtered count > 8.

**UX notes:**
- All filter state in local `useState` (mirrors `ExperiencesDirectory`). No global state.
- The `Filters` button shows a count badge when structured filters are active (e.g. "Filters (3)").
- `<Reveal>` for card entrance, staggered by `index % 3`.
- **Place card click is the #1 conversion flow.** Ship a minimal in-page expandable/modal from the existing card data (description, rating, dishes, vibe, hours) as the first-iteration detail view. The expandable contains enough information to feel complete; no "coming soon" messaging. The full `PlaceDetailPage` with map/photos is a future work item. Mobile: modal overlay. Desktop: inline card expansion.

### §5 Kitchen Stories

**Content & layout:**
- Section heading: "Kitchen Stories" + subtitle "The people behind the plate."
- Bento grid: `grid grid-cols-1 md:grid-cols-12 gap-8`.
  - 2 large cards (`md:col-span-8`, alternating image-left/right via `md:flex-row-reverse`).
  - 1 mini card (`md:col-span-4`) — vignette with icon + detail.
  - 1 visual card (`md:col-span-4`) — circular image or accent-color block.
- **Story card content:**
  - Large: image + tag + title + excerpt (2-3 lines) + bidirectional badges — capped at 2 dishes + 2 places. Selection rule: dishes/places with a matching card on this page first, then order of mention. If > 2, show "+N more" that links to the story detail page. `READ FULL STORY →` link to `/food/stories/<slug>`.
  - Mini: icon + title + 1-line excerpt + detail (e.g. "5:00 AM start"). No badges (space-constrained).
  - Visual: accent color + short hook. No badges.
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
│  Three cuisines, one ancient town — start with Cao Lau.          │
│  Japanese noodle craft, Chinese broth logic, French              │
│  baguette — all folded into a UNESCO river port.                 │
│  [ Discover the flavors ↓ ]                                      │
│         [ 🔍  Search dishes or places…              ]            │
├──────────────────────────────────────────────────────────────────┤ ← 120px gap
│  MUST-TASTE ICONS                            ◀  ▶                │
│  Essential flavors of the Ancient Town.                          │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐  ← horizontal scroll  │
│  │ 🍜 │ │ 🥟 │ │ 🥖 │ │ 🍚 │ │ ☕ │ │ 🍲 │                      │
│  │Cao │White│Banh │Com  │Heri │Mi   │                       │
│  │Lau │Rose │Mi   │Ga   │Cof  │Quang│                       │
│  │$$  │$$  │$    │$    │$    │$$  │                       │
│  │Old Town│Old Town│Old Town│…    │…   │…    │                       │
│  └────┘ └────┘ └────┘ └────┘ └────┘ └────┘                      │
├──────────────────────────────────────────────────────────────────┤
│  PLACES TO EAT                                                   │
│  Find a table that matches your mood.                            │
│  (Riverside)(Rice paddy)(◈Hidden gem)(♥Local favorite) [More] [ Filters ]│
│  (Rooftop)(Heritage)(Garden)(Beachside)  ← revealed by More     │
│  Vibe: × Hidden gem × Riverside | Filters: × $$ × Old Town       │
│                                           × Open now   Clear all│
│  Showing 6 of 12 places (6 curated starting places)              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                        │
│  │ [img]    │ │ [img]    │ │ [img]    │                        │
│  │Hidden gem│ │Riverside │ │Local fav │  ← top-left vibe chip   │
│  │      ⊙Open│ │      ⊙Open│ │     ○Closed│ ← top-right badge   │
│  │Thanh Cao │ │Ba Le Well│ │Madame Kh │                        │
│  │ Lau      │ │  Cao Lau │ │  Banh Mi │                        │
│  │Old Town$$│ │Old Town$$│ │Old Town$ │                        │
│  │Serves:   │ │Serves:   │ │Serves:   │                        │
│  │Cao Lau+1 │ │Cao Lau   │ │Banh Mi+1 │  ← dish badges +N      │
│  └──────────┘ └──────────┘ └──────────┘                        │
│              View all 12 places →                               │
├──────────────────────────────────────────────────────────────────┤
│  KITCHEN STORIES                                                 │
│  The people behind the plate.                                    │
│  ┌──────────────────────┐ ┌──────────────┐                      │
│  │ [large image]        │ │ [image]      │                      │
│  │ THE VENDOR'S TALE    │ │ MARKET SECR  │                      │
│  │ The Keeper of the    │ │ Under the    │                      │
│  │ Well                 │ │ Red Roofs    │                      │
│  │ ◦Cao Lau ◦Ba Le Well │ │ ◦Banh Mi +1  │  ← capped 2 + N      │
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
- Search bar: full width, in a compact `surface-container` strip directly below hero. Dropdown overlays as a sheet (max-height 50vh, scrim behind) — does not push content.
- Dish cards: horizontal swipe (~160px wide), chevrons hidden.
- Vibe chips: 4 featured visible + "More" button revealing 4 more. `·` divider and icon prefixes preserved.
- Filter drawer: bottom sheet (thumb-reachable) instead of right-side sheet.
- Place grid: 1 column. Dish badges cap at 1 + overflow on 1-col.
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
| `pet-friendly` | Pet-friendly | toggle | (boolean) |

Extending: add a filter entry here. The `Filters` drawer auto-renders it. Backend adds the matching column or tag.

**`NEIGHBORHOODS`** — derived from `PLACE_FILTERS.values`, also usable standalone for place detail pages and search indexing.

### Schema changes (new migration `supabase/migrations/00006_food_directory.sql`)

**Chosen approach: vibes as tags, structured as columns.**

- Extend `tags.type` CHECK to include `'vibe'` (currently `'theme'|'era'|'feature'`). Vibe tags reuse the existing `place_tags` junction — no new junction table.
- Add columns to `places`:
  - `price_band TEXT CHECK (price_band IN ('$','$$','$$$'))`
  - `opening_hours JSONB` — `{mon:"7-21", tue:"7-21", ...}` for `open-now` computation.
  - `pet_friendly BOOLEAN DEFAULT false`
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
  hours: string; // e.g. "7:00 AM – 9:00 PM"
  vibeTagIds: readonly VibeTagId[];
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

**Extend `src/data/sections/food.ts`** — add `id`, `vibeTagId`, `storyTeaser`, and a derived `servingPlaceCount: number` to each dish entry. `servingPlaceCount` is computed once at adapter definition by counting places whose `signatureDishIds` include the dish id. Dishes currently lack ids, which are needed for dish→place and story→dish links. A count of 0 hides the "Where to try it →" affordance.
- Remove `CuisineId` / cuisine vocabulary from this work since the Cuisine structured filter was removed.

### New page-level types (in `src/domain/types.ts`)

Following the existing `FoodData` named type pattern:
- `PlacesData` (consumed by `PlacesDirectory` component).
- `FoodStoriesData` (consumed by `KitchenStories` component — replaces the inline `kitchenStories` const in `FoodPage.tsx`).
- Extend the existing `FoodData` dish item shape with `id`, `vibeTagId`, `storyTeaser`, `servingPlaceCount`.

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

- Dish card click (§3) → smooth-scroll to `#places-to-eat` + set `serves-dish=<id>` filter state in §4. The dish filter replaces any prior dish filter; composes with existing vibe/structured filters. Also `scrollIntoView({inline:'center'})` the specific dish card if scrolling back.
- Place card dish badge click (§4) → smooth-scroll up to the matching dish card in §3 with `scrollIntoView({inline:'center'})` (so the card lands in view in the horizontal scroller).
- Story card dish badge click (§5) → smooth-scroll up to §3 + `scrollIntoView({inline:'center'})` the dish.
- Story card place badge click (§5) → navigate to `/food/place/<slug>` (or open the in-page expandable if detail page is stubbed — see §4 "Place card click" note).
- Hero CTA → smooth-scroll to §3.
- All smooth-scroll targets use `id` attributes on section wrappers.

### Search bar navigation

- Dish result click → smooth-scroll to that dish card in §3 with `scrollIntoView({inline:'center'})`.
- Place result click → navigate to `/food/place/<slug>` (or open the in-page expandable).
- Keyboard: Arrow Up/Down to highlight, Enter to select, Escape to close. ARIA combobox role.

---

## 6. Best practices for clean-but-data-rich

1. **Progressive disclosure.** The homepage shows curated subsets (6-12 dishes, 6-8 places, 4 stories). Full directories live behind "View all →" links to future archive pages. The homepage is a showcase, not a database dump.

2. **Two-tier visual language with explicit labels.** Vibe chips (warm `food` ColorTheme tint) vs structured filter chips (`border-outline` #837567, darker/cooler than `outline-variant`) — same shape, different tint AND labeled groups ("Vibe:" / "Filters:") with a separator in the active chips row. Users don't have to infer the two mental models. The `Filters` drawer hides the 5 structured controls until requested.

3. **Editorial sections stay un-filterable.** Dishes and Stories are curated. Filtering them would undermine the editorial promise. Only the Places directory is interactive. This respects the scale mismatch (6-12 dishes vs 50+ places) and the category boundary (vibes are place attributes, not dish attributes — which is why dish cards no longer show a vibe tag).

4. **Bidirectional links, not unified filters.** Sections connect via click-through (dish→place, place→dish, story→both) rather than shared filter state. This composes the two jobs without forcing one filter vocabulary onto two different content types.

5. **Live filtering for both layers.** Vibe chips and structured filters both filter live (no Apply button). This gives users one consistent mental model — toggling any filter immediately updates the grid. The `Filters` drawer has `Clear all` and `Close` only. A 200ms fade (`--animate-fade-fast`) smooths the re-render.

6. **Match count + no-results guidance.** "Showing 6 of 12 places" sets expectations (visible vs total). On zero results, the suggestion algorithm computes which single filter removal yields the most results, with a tie-break order (structured > vibe > dish). The dish filter is surfaced explicitly if it's the sole cause. Never silently relax.

7. **Reuse existing patterns.** `<Reveal>` for scroll animations, `ExperiencesDirectory`'s `useState` filter pattern, `FoodPage`'s existing bento + horizontal scroller, `group-hover:scale-110` for image zoom (codebase standard, not `scale-105`). No new animation primitives except `--animate-fade-fast` for filter re-render.

8. **Extensibility via the Vocabulary pattern.** Every enum (`VIBE_TAGS`, `PLACE_FILTERS`, `NEIGHBORHOODS`) lives as an `as const` array in `src/domain/vocabulary.ts` with Zod + SQL CHECK + snapshot test. Adding a tag or filter is a one-file edit + one migration. UI auto-renders from the array — no hardcoded chip lists in components.

9. **Sticky search on scroll-up only.** The search bar sticks to the top when scrolling up (serves the "Search-friendly" principle on a tall page) but hides when scrolling down (doesn't cover content). In-scope, not optional.

10. **Mobile-first density control.** Vibe chips wrap to 2 rows with `·` divider preserved. Place grid collapses to 1 column with dish badges capped at 1 + overflow. Bento collapses to single-column stack. Hero shrinks to ~520px. Filter drawer becomes a bottom sheet on mobile (thumb-reachable) vs. right-side sheet on desktop. Search dropdown overlays as a 50vh sheet with scrim.

11. **Accessibility baseline.** `Open now` badge uses icon + word plus `--color-success` (not color-only). Search dropdown is a combobox with keyboard nav and ARIA roles. Filter chips are keyboard-focusable toggles. Drawer traps focus while open. Color contrast for warm vibe chips vs `border-outline` structured chips and `--color-success` vs `surface` meets WCAG AA.

12. **Place card click as primary conversion.** The #1 outward flow (place card → details) ships as an in-page expandable/modal from existing card data, not a "coming soon" stub. Full `PlaceDetailPage` with map/photos is a future work item. This avoids dead-ending the primary conversion on a redesigned homepage.

---

## Out of scope

- Place detail page (`/food/place/:slug`) — full page with map/photos is out of scope. **In-scope:** a minimal in-page expandable/modal from existing card data so the primary conversion flow doesn't dead-end.
- Story detail page (`/food/stories/:slug`) — stub only.
- Stories archive (`/food/stories`) — stub only.
- Places archive (`/food/places`) — stub only.
- Live Supabase adapter — mock adapter only (per the existing Adapter pattern; live adapter is a future work item).
- User-submitted content / community moderation — existing DB has `submissions` table but this spec doesn't wire it up.

## Open questions for implementation

- Should the search bar's live dropdown index be built from the mock adapter data at module load, or computed on each keystroke? (Performance question for implementation.)
- The in-page place expandable should be a modal (overlay) on mobile and inline expansion (card grows in place) on desktop. Modal is simpler for mobile; inline preserves grid context on wider screens.
- The "strictest filter" suggestion algorithm: for each active filter, compute count if removed alone — is this performant enough on every no-results render with the mock adapter? (Likely yes at 50 places; needs verification at scale with the live adapter.)
- `--color-success` value: `#2e7d32` proposed; verify WCAG AA contrast against `surface` (#fff8ef) during implementation.
