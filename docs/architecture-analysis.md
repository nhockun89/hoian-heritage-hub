# Hoi An Heritage Hub -- Codebase Architecture Analysis

> Generated: 2026-06-17
> Stack: React 19 + TypeScript + Vite 8 + Tailwind CSS 4 + Drizzle ORM + PostgreSQL + Supabase

---

## 1. Architecture Overview

### Pattern and Stack

This is a **single-page React application** built with:
- **Vite + React 19** as the frontend framework (`src/main.tsx:6`)
- **Tailwind CSS v4** with a custom `@theme` block for design tokens (`src/index.css:3-87`)
- **TypeScript** with strict settings (`noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`) (`tsconfig.app.json:15-17`)
- **Drizzle ORM** with PostgreSQL for the database layer (`src/db/schema.ts`)
- **Supabase** client initialized but unused (`src/lib/supabase.ts`)
- **Zod** for runtime validation (`src/db/validations.ts`)
- **Vitest** for testing (`vitest.config.ts`)

### File Organization

```
src/
  main.tsx                              -- Entry point
  App.tsx                               -- Root component (14 section imports)
  App.css                               -- Unused Vite template boilerplate
  index.css                             -- Tailwind theme, custom classes, animations
  assets/                               -- Static images (react.svg, vite.svg, hero.png)
  components/                           -- 14 section components, all flat (no subdirectories)
    Navigation.tsx
    HeroSection.tsx
    CategoryShortcuts.tsx
    HeritageSection.tsx
    ThisMonthSection.tsx
    DiscoverSection.tsx
    HowToExplore.tsx
    ItinerarySection.tsx
    ExperiencesDirectory.tsx
    LocalSecretsSection.tsx
    FeaturedSection.tsx
    FoodSection.tsx
    PhotoGallerySection.tsx
    NewsletterSection.tsx
    Footer.tsx
  data/
    mockData.ts                         -- 596 lines of hardcoded content data
  db/
    schema.ts                           -- 10 Drizzle table definitions
    types.ts                            -- Inferred types + discriminated union for content JSON
    validations.ts                      -- Zod schemas mirroring DB constraints
    index.ts                            -- Drizzle client initialization
  hooks/
    useScrollReveal.ts                  -- IntersectionObserver-based animation hook
  lib/
    supabase.ts                         -- Supabase client (unused)
    utils.ts                            -- Re-exports + slugify + eraDisplayName
```

### Component Architecture Pattern

The app follows a **flat, section-based landing page** pattern. `App.tsx` is a single function that renders 14 section components in sequence. Each component:
- Imports its own data from `mockData.ts`
- Uses inline Tailwind classes for styling
- Uses `reveal-on-scroll` CSS class for scroll-triggered animations
- Has no props (except `FeaturedSection` which takes a `variant` prop)
- Contains both presentation and local state logic

---

## 2. Benefits of This Approach

### 2.1 Excellent Design Token System
The `@theme` block in `index.css` defines a comprehensive Material Design 3-inspired color palette with 50+ semantic color tokens (`--color-surface-container`, `--color-on-surface-variant`, etc.), custom fonts, spacing variables, and animations. This provides strong visual consistency.

### 2.2 Well-Structured Database Schema
The Drizzle schema (`src/db/schema.ts`) is genuinely well-designed:
- Proper normalization with 10 tables
- Text PKs for lookup tables (locations, categories, tags) and UUID PKs for content tables
- Junction tables with composite primary keys (`placeTags`, `placeMediaAssignments`)
- CHECK constraints at the DB level (`schema.ts:35`, `44`, `100`, `118`, `155-159`)
- Proper cascade/restrict delete behavior
- Indexes for common query patterns (`schema.ts:67-68`, `99`, `128`, `142`)

### 2.3 Zod Validation Mirrors DB Constraints
The validation layer (`src/db/validations.ts`) duplicates enum constraints as Zod schemas, enabling runtime validation before DB writes. The `validateContentJson` function (`validations.ts:64-74`) provides a type-safe dispatcher for the discriminated union content types.

### 2.4 Discriminated Union for Polymorphic Content
The `ContentJson` type (`src/db/types.ts:68-72`) uses a discriminated union pattern (`{ type: "history" } & HistoryContent | ...`) which is an excellent approach for polymorphic JSON content stored in a single `jsonb` column.

### 2.5 Good Test Coverage for DB Layer
Tests cover schema exports, validation schemas, and query patterns (`tests/db/`). The query tests (`tests/db/queries.test.ts:22-77`) document the intended query patterns even though they are skipped.

### 2.6 Accessibility Consideration
The `prefers-reduced-motion` media query (`index.css:142-152`) disables all animations for users who prefer reduced motion.

### 2.7 TypeScript Strictness
The tsconfig enables `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, and `verbatimModuleSyntax` (`tsconfig.app.json:15-17`), catching errors early.

### 2.8 Fast & Simple
No over-engineering. Vite HMR gives instant feedback. The flat structure means zero mental overhead navigating nested directories.

---

## 3. Drawbacks and Contrasts

### 3.1 No Component Abstraction -- Massive Duplication
Every section component follows the identical header pattern:

```tsx
<div className="text-center max-w-3xl mx-auto mb-12 reveal-on-scroll">
  <span className="text-XXX font-label uppercase tracking-widest mb-4 block">{data.subtitle}</span>
  <h2 className="font-headline text-display-lg-mobile md:text-5xl text-on-surface mb-6">{data.title}</h2>
  <p className="text-on-surface-variant text-lg leading-relaxed">{data.description}</p>
</div>
```

This exact pattern appears in **7 components**:
- `ThisMonthSection.tsx:7-17`
- `HowToExplore.tsx:7-17`
- `ItinerarySection.tsx:11-21`
- `ExperiencesDirectory.tsx:17-27`
- `LocalSecretsSection.tsx:7-17`
- `PhotoGallerySection.tsx:15-25`
- `FoodSection.tsx:7-17`

A reusable `<SectionHeader>` component would eliminate ~70 lines of duplication.

### 3.2 Filter Logic Duplicated Across Components
The category filter pattern is repeated in three components:
- `HeroSection.tsx:6` -- `useState('All')` + `setActiveCategory`
- `ExperiencesDirectory.tsx:5` -- `useState('All')` + `setActiveFilter` + filter logic at lines 9-12
- `PhotoGallerySection.tsx:5` -- `useState('All')` + `setActiveCategory` + filter logic at lines 7-10

A `useFilter` hook or a `<FilterTabs>` component would DRY this up.

### 3.3 `App.css` Is Dead Code
`src/App.css` (184 lines) contains Vite template boilerplate styles (`.counter`, `.hero`, `#center`, `#next-steps`, `#docs`, `#spacer`, `.ticks`) that are never used by any component. It is imported in `main.tsx:3` but serves zero purpose.

### 3.4 `supabase.ts` Is Dead Code
`src/lib/supabase.ts` exports a Supabase client that is **never imported anywhere**. The app uses Drizzle/Postgres directly. This file references `NEXT_PUBLIC_*` env vars (`supabase.ts:3-4`) which is a Next.js convention, not a Vite convention (Vite uses `VITE_` prefix).

### 3.5 `tsconfig.app.json` Excludes `src/lib`
`tsconfig.app.json:21` excludes `src/lib` from the app's TypeScript compilation. This means `supabase.ts` and `utils.ts` are not type-checked as part of the frontend build. The `utils.ts` file has an `@/db/validations` import which would only be resolved by the vitest config alias, not the app tsconfig.

### 3.6 Flat Component Directory
All 14 components live in a single `src/components/` directory with no subcategorization. As the app grows, this becomes hard to navigate. There is no distinction between layout components (Navigation, Footer), page sections (HeroSection, HeritageSection), and reusable UI primitives.

### 3.7 No Shared UI Component Library
There are no reusable primitives like `<Button>`, `<Card>`, `<Badge>`, `<Section>`, `<Icon>`. Every component builds its own UI from raw Tailwind classes. For example, the "pill" button pattern appears in:
- `HeroSection.tsx:33-44` (category pills)
- `ItinerarySection.tsx:26-37` (day selector)
- `ExperiencesDirectory.tsx:31-43` (filter tabs)
- `PhotoGallerySection.tsx:29-41` (category filter)

All four use the same active/inactive styling logic but are implemented independently.

### 3.8 Hardcoded Magic Values
Colors like `#f4d03f`, `#76d7c4`, `#705d00`, `#815000`, `#faf9f5` are scattered throughout components as inline Tailwind values (e.g., `bg-[#f4d03f]`, `text-[#815000]`) instead of using the design tokens defined in `index.css`. For example:
- `Navigation.tsx:33` uses `text-[#815000]` instead of `text-on-tertiary-container`
- `HeroSection.tsx:37` uses `bg-[#f4d03f]` instead of `bg-primary-container`
- `CategoryShortcuts.tsx:11-17` hardcodes color pairs that should map to the theme

### 3.9 `mockData.ts` Is a 596-Line Monolith
All content data lives in a single file (`src/data/mockData.ts`). This file exports 14 different data objects/arrays. It should be split into per-domain files (e.g., `data/hero.ts`, `data/experiences.ts`, `data/food.ts`).

### 3.10 Category Data Is Duplicated Across Multiple Sources
The 7 categories (Heritage, Food, Nature, Arts, Activities, Local Life, Stays) are defined in at least 3 places:
1. `heroData.searchCategories` (`mockData.ts:7`) -- array of strings
2. `categoryShortcuts` (`mockData.ts:10-18`) -- array of objects with icons, colors, counts
3. `experiencesData.filters` (`mockData.ts:179-188`) -- array of `{label, value}` objects
4. `navLinks` in `Navigation.tsx:14-22` -- array of `{label, full}` objects

These are all manually maintained and will drift out of sync.

### 3.11 `FeaturedSection` Has Unsafe Type Casting
`src/components/FeaturedSection.tsx:27-28` does `featuredData.find()` and then casts with `as BridgeData` or `as GreenData` at lines 33 and 77. The `find()` call can return `undefined` (handled at line 28), but the type cast bypasses TypeScript's type narrowing. The `GreenData` interface at line 17-24 has `variant: string` which should be `'green'` for proper narrowing.

### 3.12 No Image Optimization
All images are loaded from Unsplash URLs with no lazy loading strategy beyond `loading="lazy"`. The hero image (`HeroSection.tsx:12-15`) uses `scale-110 animate-breath` which causes layout shift. There is no `srcset`, no WebP conversion, no blur-up placeholders.

### 3.13 `useScrollReveal` Operates on the DOM Directly
`src/hooks/useScrollReveal.ts:19` uses `document.querySelectorAll('.reveal-on-scroll')` which is an anti-pattern in React. It bypasses React's rendering model and uses a `MutationObserver` (`useScrollReveal.ts:26-27`) to watch for DOM changes, which is fragile and performance-heavy. A ref-based approach per component would be more idiomatic.

### 3.14 Search Is Non-Functional
The search input in `HeroSection.tsx:49-55` and `Navigation.tsx:61-65` captures state but does nothing with it. The search button has no handler. The nav search input has a truncated placeholder `"Search experien..."` (`Navigation.tsx:63`).

### 3.15 All Links Are Dead
Every `<a href="#">` with `onClick={(e) => e.preventDefault()}` throughout the codebase is a placeholder. This includes all navigation links, category shortcuts, footer links, and "View All" CTAs.

### 3.16 No Mobile Navigation
`Navigation.tsx:38` hides the nav links on mobile (`hidden md:flex`) but provides no hamburger menu or mobile navigation alternative.

### 3.17 `beforeYouGoData` Is Defined But Never Used
`src/data/mockData.ts:422-433` exports `beforeYouGoData` with 6 first-timer tips, but no component renders it.

---

## 4. Redundant Code and DRY Violations

### 4.1 Section Header Pattern (7 instances)
The subtitle/title/description header block is copy-pasted 7 times with only color token variations.

### 4.2 Filter/Tab Pattern (4 instances)
The pill-shaped active/inactive toggle buttons appear in HeroSection, ItinerarySection, ExperiencesDirectory, and PhotoGallerySection with nearly identical styling logic.

### 4.3 Card Hover Animation Pattern
The `hover:-translate-y-1` or `hover:-translate-y-2` with `transition-all duration-500` pattern appears in:
- `CategoryShortcuts.tsx:14`
- `ThisMonthSection.tsx:23`
- `DiscoverSection.tsx:18`
- `HowToExplore.tsx:33`
- `ExperiencesDirectory.tsx:51`
- `LocalSecretsSection.tsx:23`
- `FoodSection.tsx:28`
- `Footer.tsx:109,113`

### 4.4 Image Overlay Gradient Pattern
The `bg-gradient-to-t from-black/...` overlay on images appears in:
- `DiscoverSection.tsx:30`
- `PhotoGallerySection.tsx:58`

### 4.5 `style={{ transitionDelay: ... }}` Inline Pattern
Staggered animation delays via inline style appear in:
- `ThisMonthSection.tsx:24`
- `DiscoverSection.tsx:21`
- `HowToExplore.tsx:24`
- `ItinerarySection.tsx:50`
- `ExperiencesDirectory.tsx:52`
- `LocalSecretsSection.tsx:24`
- `FoodSection.tsx:25`
- `FeaturedSection.tsx:59`

### 4.6 Enum Duplication Between DB and Zod
The enum values are defined twice: as SQL CHECK constraints in `schema.ts` and as Zod enums in `validations.ts`. While this is intentional (DB-level + app-level validation), there is no single source of truth. If you add a new content type, you must update both files manually.

---

## 5. Enhancement Opportunities

### 5.1 Create a `<SectionHeader>` Component
**File to create:** `src/components/ui/SectionHeader.tsx`

Extract the repeated header pattern from 7 components. Accept props: `subtitle`, `title`, `description`, `accentColor` (Tailwind class), `className`.

**Components to refactor:** `ThisMonthSection.tsx:7-17`, `HowToExplore.tsx:7-17`, `ItinerarySection.tsx:11-21`, `ExperiencesDirectory.tsx:17-27`, `LocalSecretsSection.tsx:7-17`, `PhotoGallerySection.tsx:15-25`, `FoodSection.tsx:7-17`

### 5.2 Create a `<FilterTabs>` or `<PillGroup>` Component
**File to create:** `src/components/ui/FilterTabs.tsx`

Accept `items: { label: string; value: string }[]`, `activeValue: string`, `onChange`, `activeColor` (Tailwind class). Replace the filter logic in `ExperiencesDirectory.tsx:30-43`, `PhotoGallerySection.tsx:28-41`, `ItinerarySection.tsx:24-37`, and `HeroSection.tsx:31-44`.

### 5.3 Create a `useFilter` Hook
**File to create:** `src/hooks/useFilter.ts`

Encapsulate the `useState('All')` + filter function pattern. Return `{ activeFilter, setActiveFilter, filteredItems }`.

### 5.4 Delete Dead Files
- Delete `src/App.css` (184 lines of unused Vite boilerplate)
- Delete `src/lib/supabase.ts` (6 lines, never imported, wrong env var prefix)
- Remove `src/assets/react.svg` and `src/assets/vite.svg` (Vite template leftovers)

### 5.5 Split `mockData.ts` Into Per-Domain Files
**Files to create:** `src/data/hero.ts`, `src/data/categories.ts`, `src/data/heritage.ts`, `src/data/experiences.ts`, `src/data/food.ts`, `src/data/itinerary.ts`, `src/data/gallery.ts`, `src/data/footer.ts`, etc.

Move each export from `mockData.ts` into its own file. Create a barrel export in `src/data/index.ts` if needed.

### 5.6 Create a Single Source of Truth for Categories
**File to create:** `src/data/categories.ts`

Define the 7 categories once as a structured array with all properties (label, fullLabel, icon, color, count, slug). Derive `navLinks`, `categoryShortcuts`, `searchCategories`, and `experiencesData.filters` from this single source.

### 5.7 Fix `FeaturedSection` Type Safety
**File:** `src/components/FeaturedSection.tsx`

Change `GreenData.variant` from `string` to `'green'` (line 24). Use TypeScript's discriminated union narrowing instead of `as` casts. Or better: define `type FeaturedItem = BridgeData | GreenData` and use `data.variant` for the runtime check.

### 5.8 Replace `useScrollReveal` With a Ref-Based Approach
**File:** `src/hooks/useScrollReveal.ts`

Instead of querying the DOM, create a `useReveal` hook that returns a ref. Each component attaches the ref to its root element. This is the idiomatic React pattern and avoids MutationObserver overhead.

### 5.9 Add Mobile Navigation
**File:** `src/components/Navigation.tsx`

Add a hamburger menu toggle state and a mobile slide-out panel for the 7 nav links that are hidden on screens below `md`.

### 5.10 Use Design Tokens Instead of Hardcoded Colors
**Files:** All components

Replace `bg-[#f4d03f]` with `bg-primary-container`, `text-[#815000]` with `text-on-tertiary-container`, `bg-[#faf9f5]` with `bg-surface`, etc. The tokens are already defined in `index.css:3-52` but are not consistently used.

### 5.11 Add a `<Card>` Component
**File to create:** `src/components/ui/Card.tsx`

The card pattern (image + overlay + content + hover effects) appears in `DiscoverSection.tsx`, `ExperiencesDirectory.tsx`, `FoodSection.tsx`, and `LocalSecretsSection.tsx`. A composable `<Card>` with `<Card.Image>`, `<Card.Badge>`, `<Card.Content>` slots would reduce duplication.

### 5.12 Fix `tsconfig.app.json` to Include `src/lib`
**File:** `tsconfig.app.json:21`

Remove `src/lib` from the `exclude` array so that `utils.ts` and any future lib files are type-checked as part of the frontend build.

### 5.13 Implement the Unused `beforeYouGoData`
**File:** `src/data/mockData.ts:422-433`

Either create a `BeforeYouGoSection.tsx` component to render this data, or remove the data if it is not planned for use.

### 5.14 Add `aria-label` and Accessibility Attributes
Throughout all components, interactive elements (buttons, links, inputs) lack `aria-label` attributes. The search input in `Navigation.tsx:61-65` has no label. The material-symbols-outlined icons have no `aria-hidden` attribute.

### 5.15 Add Error Boundary
**File to create:** `src/components/ErrorBoundary.tsx`

With 14 section components rendering sequentially, a single component error would crash the entire page. A React error boundary wrapping `<main>` in `App.tsx:24` would provide graceful degradation.

### 5.16 Unify the `tsconfig.backend.json` Reference
The root `tsconfig.json` references `tsconfig.backend.json` but this file was not found in the glob. Either create it or remove the reference.

---

## 6. Summary

This is a visually polished landing page with a well-designed database schema and strong TypeScript discipline. The primary weaknesses are:

1. **Severe component duplication** -- 7 identical section headers, 4 identical filter patterns, no shared UI primitives
2. **Dead code** -- `App.css`, `supabase.ts`, template SVGs, unused `beforeYouGoData`
3. **Design token inconsistency** -- hardcoded hex values alongside a rich theme system
4. **Monolithic data file** -- 596-line `mockData.ts` with duplicated category definitions
5. **Non-idiomatic React patterns** -- DOM-querying scroll hook, no refs, no error boundary

The database layer (Drizzle schema + Zod validation + discriminated unions) is the strongest part of the codebase and shows careful architectural thinking. The frontend UI layer needs refactoring to match that same level of rigor.

---

## 7. Enhancement Priority Matrix

| Priority | Action | Impact | Effort |
|----------|--------|--------|--------|
| **P0** | Create `<SectionHeader>` component | Eliminates 70+ lines of duplication across 7 files | Low |
| **P0** | Create `<FilterTabs>` component | DRYs up 4 filter implementations | Low |
| **P1** | Delete `App.css`, `supabase.ts`, template SVGs | Removes dead weight | Trivial |
| **P1** | Split `mockData.ts` into per-domain files | Improves maintainability | Medium |
| **P1** | Single source of truth for categories | Prevents data drift | Medium |
| **P2** | Replace `useScrollReveal` with ref-based hook | Idiomatic React, better perf | Medium |
| **P2** | Replace hardcoded colors with design tokens | Visual consistency | Medium |
| **P2** | Add mobile hamburger menu | Functional on mobile | Medium |
| **P2** | Fix `FeaturedSection` type safety (`as` casts) | Catch bugs at compile time | Low |
| **P3** | Add `<Card>` component | Reduce card duplication across 4 sections | Medium |
| **P3** | Add error boundary around `<main>` | Graceful degradation | Low |
| **P3** | Fix `tsconfig.app.json` to include `src/lib` | Type-check all frontend code | Trivial |
| **P3** | Add `aria-label` attributes | Accessibility compliance | Medium |
