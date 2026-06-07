# Hoi An Heritage Hub

A curated heritage tourism web app for Hoi An, Vietnam. The site presents
Hoi An as a "living museum" of Japanese, Chinese, and European cultural
fusion: heritage sites, artisan food, lantern-lit streets, day-by-day
itineraries, local secrets, and a community-driven content model with
moderated submissions.

## Language

**Section**:
A top-level chunk of the home page. One component, one data file, one
named page-level type. Examples: Hero, Discover, ExperiencesDirectory,
Itinerary, FoodSection.
_Avoid_: block, panel, segment, page.

**Taxonomy**:
The 7-element category vocabulary that drives cross-section filtering
(Heritage, Food, Nature, Arts, Activities, Local Life, Stays). Each
entry has an editorial `id`, a `short` label, a `full` long-form label,
an `icon` codepoint, a `color` (one of the four ColorThemes), and an
editorial `count`. The single source of truth is `CATEGORIES` in
`src/domain/taxonomy.ts`; every section that needs a category reads
from it.
_Avoid_: category list, tag list.

**ColorTheme**:
A 4-value visual theme (`heritage | food | nature | activity`). The
editorial category and the visual color are intentionally independent:
`Arts` and `Heritage` both use the `heritage` color, but they are
different sections of the site. The single source of truth is
`COLOR_THEMES` in `src/domain/vocabulary.ts`; the SQL CHECK constraint
on `categories.color_theme` mirrors it (verified by
`tests/db/vocabulary.test.ts`).
_Avoid_: palette, theme (overloaded with Tailwind themes), style.

**Vocabulary**:
A canonical `as const` array of string literals that constrains a
database column. Every enum that the database CHECKs lives here
(COLOR_THEMES, ERA_VALUES, PLACE_CONTENT_TYPES, MEDIA_TYPES,
SUBMISSION_TYPES, SUBMISSION_STATUSES). Zod enums in
`src/db/validations.ts` are derived from these constants; SQL CHECKs
in `supabase/migrations/` are downstream artifacts verified by
`tests/db/vocabulary.test.ts`.
_Avoid_: enum (overloaded with TypeScript's `enum` keyword),
constant.

**Content type**:
A 5-value enum that constrains `place_contents.type` (`history`,
`comparison`, `story`, `tip`, `highlight`). Each value pairs with a
Zod schema describing the `content_json` shape for that type. The
Zod schemas and the `ContentJson` discriminated union in
`src/db/types.ts` are projections of the same idea — the schemas are
runtime-validated, the union is statically projected.
_Avoid_: kind, block type.

**Adapter**:
A thing that produces values of a domain type. The per-section files
in `src/data/sections/*.ts` are the **mock adapter**; the live
Supabase adapter is a future work item. Components are agnostic to
which adapter is wired up — they consume the named type.
_Avoid_: data source, repository, service.

**Section data**:
A typed const that one section consumes. Cross-reference invariants
between sections (e.g. the 7 categories must agree across hero,
discover, experiences filters, and footer) are tested in
`tests/data/sections.test.ts`.
_Avoid_: mock data, fixture (when the fixture is the production data
shape).

**Era**:
A historical period marker for place content. One of
`1800s | 1900s | colonial | pre-war | present`. Used on
`place_contents.content_json.era` (history type) and on
`place_media.era` (photo-past type). Has Zod + TS type validation
but no SQL CHECK — a known gap (see Flagged ambiguities).
_Avoid_: period, date.

**Editorial count**:
The number shown in marketing copy (e.g. "12 Heritage Sites" on the
hero). It is a hand-curated figure, not a live count from the
database. The number lives in `CATEGORIES[*].count` in the taxonomy
module; sections that show it read from there.
_Avoid_: live count, db count.

## Relationships

- A **Section** consumes one **Section data** const.
- A **Section data** const may reference zero or more entries from
  the **Taxonomy**.
- The **Taxonomy** assigns each entry a **ColorTheme**.
- The **ColorTheme** palette and the **Vocabulary** for `color_theme`
  are the same set of 4 values; the seam is the SQL ↔ Zod ↔ TS
  agreement test.
- A `place_contents` row is shaped by its **Content type**; the
  content_json shape is the Zod schema paired with that type.

## Example dialogue

> **Dev:** "When I add a new category (say, Wellness) to the
> taxonomy, what else needs to change?"
>
> **Domain expert:** "Add it to `CATEGORIES` in taxonomy.ts. The
> category shortcut, the discover card, the experiences filter,
> and the footer link all derive from that — they update
> automatically. If it gets a new color, add the new color to
> `COLOR_THEMES` (and the matching SQL CHECK in a new migration
> under `supabase/migrations/`); the snapshot test in
> `tests/db/vocabulary.test.ts` will fail until the migration
> lands."

> **Dev:** "What does the `<Reveal>` component do?"
>
> **Domain expert:** "Each `<Reveal>` owns its own
> IntersectionObserver. It wraps any block you want to fade in
> when it scrolls into view. There's no global mutation observer
> — the previous `useScrollReveal` hook ran `querySelectorAll`
> on every DOM change, which was a smell."

## Flagged ambiguities

- **`era` has no SQL CHECK.** The Zod enum (`eraEnumSchema`) and
  the TS type (`EraValue`) both validate `era` at the application
  boundary, but `placeMedia.era` is bare `text` in the schema.
  A wrong value can land in the database via direct SQL. Resolution:
  Round 2's vocabulary ↔ SQL agreement test covers the 5 enums
  that have SQL CHECKs; the `era` gap is documented but not
  closed. Closing it would mean a new migration adding a CHECK
  constraint, which is a separate work item.

- **`color_theme` SQL has 4 values; the design system uses 4
  hex swatches.** The original `categoryShortcuts` data
  referenced 3 hex pairs but had 7 entries with 2 hex pairs shared
  (Heritage/Arts → gold; Food/Local Life → orange; Nature/Stays →
  light teal; Activities → dark teal). Resolution: the 4-value
  ColorTheme is the source of truth; the dark teal `#0f766e` is
  the `activity` theme, the light teal `#76d7c4` is `nature`. The
  `tokens.ts` module owns the swatch table.

- **`beforeYouGoData` was dead data.** The original `mockData.ts`
  exported a `beforeYouGoData` object that was never imported by
  any component, only linked to from the footer's "Plan" column.
  Resolution: dropped in Round 4 when the data was split into
  per-section files.
