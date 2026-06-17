/**
 * Canonical category vocabulary for the site.
 *
 * `CATEGORIES` is the single source of truth for the 7 section categories
 * (Heritage, Food, …, Stays). Every other module that needs a category
 * — Navigation, DiscoverSection, ExperiencesDirectory's filter dropdown,
 * the footer's "Explore" column, the hero's search bar — derives from
 * here. Adding, removing, or renaming a category is a one-file change.
 *
 * The `id` is the editorial key (also the slug). The `color` field is
 * one of the four `ColorTheme` values, shared with the database's
 * `categories.color_theme` CHECK constraint (see src/db/validations.ts
 * and src/db/vocabulary.ts). Multiple categories may share a color
 * (e.g. Heritage and Arts both use `heritage`); the editorial category
 * and the visual color are intentionally independent.
 *
 * `count` is an editorial figure used in marketing copy (hero, CTAs,
 * discover grid). It is not a live count from the database.
 */

/**
 * The 4 color themes are owned by the vocabulary module
 * (src/domain/vocabulary.ts) where the SQL CHECK constraint for
 * `categories.color_theme` is also tracked. Imported here so the
 * `Category.color` field can be typed against the same source.
 */
import { COLOR_THEMES, type ColorTheme } from "./vocabulary";
export { COLOR_THEMES, type ColorTheme };

export type CategoryId =
  | "heritage"
  | "food"
  | "nature"
  | "arts"
  | "activities"
  | "local-life"
  | "stays";

export interface Category {
  readonly id: CategoryId;
  readonly short: string;
  readonly full: string;
  readonly icon: string;
  readonly color: ColorTheme;
  readonly count: number;
}

export const CATEGORIES: readonly Category[] = [
  { id: "heritage",   short: "Heritage",   full: "Heritage Sites",           icon: "temple_buddhist",   color: "heritage", count: 12 },
  { id: "food",       short: "Food",       full: "Food & Drink",             icon: "restaurant",        color: "food",     count: 24 },
  { id: "nature",     short: "Nature",     full: "Nature & Outdoors",        icon: "forest",            color: "nature",   count:  8 },
  { id: "arts",       short: "Arts",       full: "Arts & Crafts",            icon: "palette",           color: "heritage", count:  6 },
  { id: "activities", short: "Activities", full: "Activities & Experiences", icon: "directions_bike",   color: "activity", count: 15 },
  { id: "local-life", short: "Local Life", full: "Local Life & Markets",     icon: "storefront",        color: "food",     count: 10 },
  { id: "stays",      short: "Stays",      full: "Stays & Accommodation",    icon: "hotel",             color: "nature",   count: 18 },
] as const;

export const CATEGORY_BY_ID: Readonly<Record<CategoryId, Category>> =
  Object.freeze(
    Object.fromEntries(CATEGORIES.map((c) => [c.id, c])) as Record<CategoryId, Category>,
  );

export function findCategoryByFull(full: string): Category | undefined {
  return CATEGORIES.find((c) => c.full === full);
}

export function findCategoryById(id: string): Category | undefined {
  return (CATEGORY_BY_ID as Record<string, Category | undefined>)[id];
}
