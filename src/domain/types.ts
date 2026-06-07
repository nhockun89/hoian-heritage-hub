/**
 * Page-level domain types.
 *
 * These are the shapes the components consume as props. They are
 * intentionally distinct from the *persistence* types in
 * `src/db/types.ts` (which are the Drizzle row shapes) — the
 * components don't see `Place` or `LocalVoice` rows; they see the
 * editorial, denormalized view of a place that the home page
 * needs (a hero card, an experience card, a food card, etc.).
 *
 * `mockData.ts` (and, eventually, a live Supabase adapter) is the
 * producer of these types. Components are the consumers. The type
 * is the contract.
 *
 * Adding a new section: define a `XxxData` interface here, create
 * `src/data/sections/xxx.ts` that exports a `XxxData`, and have
 * `App.tsx` hand it to the component.
 */

import type { ColorTheme, EraValue } from "./vocabulary";
import type { CategoryId } from "./taxonomy";

/** A simple icon name. Material Symbols codepoints are passed as
 * strings to <span className="material-symbols-outlined">. The set
 * is not validated at the type level; new icons are added by
 * importing a new string. */
export type IconName = string;

// === Hero & header ===

export interface HeroData {
  readonly subtitle: string;
  readonly title: string;
  readonly ctaPrimary: string;
  readonly ctaSecondary: string;
  readonly imageUrl: string;
  /** First entry is the "all" sentinel for the dropdown. */
  readonly searchCategories: readonly string[];
}

// === Category shortcuts & discover ===

export interface CategoryShortcutData {
  readonly id: CategoryId;
  readonly icon: IconName;
  readonly label: string;
  readonly fullLabel: string;
  readonly count: number;
  /** Tailwind class string for the swatch. See
   * CategoryShortcutRow in src/data/sections/categoryShortcuts.ts
   * for the migration TODO. */
  readonly color: string;
  readonly theme: ColorTheme;
}

export interface DiscoverCategoryData {
  readonly id: CategoryId;
  readonly tag: string;
  /** Tailwind class string for the tag pill (e.g.
   *  bg-[#f4d03f]/90 text-[#221b00]). */
  readonly tagColor: string;
  readonly title: string;
  readonly description: string;
  readonly imageUrl: string;
  readonly count: number;
  readonly cta: string;
  readonly color: ColorTheme;
}

export interface DiscoverData {
  readonly title: string;
  readonly categories: readonly DiscoverCategoryData[];
}

// === This-month editorial ===

export interface ThisMonthItemData {
  readonly icon: IconName;
  readonly title: string;
  readonly date: string;
  readonly description: string;
  /** Tailwind class string for the icon color (e.g. text-tertiary). */
  readonly color: string;
  /** Tailwind class string for the icon background
   *  (e.g. bg-tertiary-container/30). */
  readonly bgColor: string;
}

export interface ThisMonthData {
  readonly subtitle: string;
  readonly title: string;
  readonly description: string;
  readonly items: readonly ThisMonthItemData[];
}

// === Heritage blurb ===

export interface HeritageData {
  readonly subtitle: string;
  readonly title: string;
  readonly description: string;
}

// === How to Explore ===

export interface HowToExploreStepData {
  readonly number: string;
  readonly icon: IconName;
  readonly title: string;
  readonly description: string;
}

export interface HowToExploreData {
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly steps: readonly HowToExploreStepData[];
}

// === Experiences directory ===

export interface ExperienceData {
  readonly id: number;
  readonly title: string;
  /** Long form of a CategoryId.full (e.g. "Heritage Sites"). */
  readonly category: string;
  readonly rating: number;
  readonly reviews: number;
  readonly duration: string;
  readonly price: string;
  readonly imageUrl: string;
  readonly tag: string;
  readonly howTo: string;
}

export interface ExperiencesFilterData {
  readonly label: string;
  readonly value: string;
}

export interface ExperiencesData {
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly filters: readonly ExperiencesFilterData[];
  readonly items: readonly ExperienceData[];
}

// === Itinerary ===

export interface ItineraryTimelineItemData {
  readonly time: string;
  readonly title: string;
  readonly description: string;
  readonly icon: IconName;
}

export interface ItineraryDayData {
  readonly label: string;
  readonly timeline: readonly ItineraryTimelineItemData[];
}

export interface ItineraryData {
  readonly subtitle: string;
  readonly title: string;
  readonly description: string;
  readonly days: readonly ItineraryDayData[];
}

// === Local secrets ===

export interface LocalSecretData {
  readonly icon: IconName;
  readonly title: string;
  readonly description: string;
  readonly source: string;
}

export interface LocalSecretsData {
  readonly subtitle: string;
  readonly title: string;
  readonly description: string;
  readonly secrets: readonly LocalSecretData[];
}

// === Featured ===

export interface FeaturedFeatureData {
  readonly icon: IconName;
  readonly title: string;
  readonly description: string;
}

export type FeaturedVariant = "bridge" | "green";

export interface FeaturedData {
  readonly subtitle: string;
  readonly title: string;
  readonly description: string;
  readonly imageUrl: string;
  readonly features?: readonly FeaturedFeatureData[];
  readonly cta?: string;
  readonly images?: readonly string[];
  readonly variant: FeaturedVariant;
}

// === Food ===

export interface FoodItemData {
  readonly name: string;
  readonly description: string;
  readonly imageUrl: string;
  readonly price: "$" | "$$" | "$$$";
  readonly cuisine: string;
  readonly location: string;
  readonly neighborhood: string;
  readonly cta: string;
}

export interface FoodData {
  readonly subtitle: string;
  readonly title: string;
  readonly description: string;
  readonly items: readonly FoodItemData[];
}

// === Photo gallery ===

export interface PhotoData {
  readonly src: string;
  readonly category: string;
  readonly caption: string;
}

export interface PhotoGalleryData {
  readonly subtitle: string;
  readonly title: string;
  readonly description: string;
  readonly categories: readonly string[];
  readonly photos: readonly PhotoData[];
}

// === Newsletter ===

export interface NewsletterData {
  readonly subtitle: string;
  readonly title: string;
  readonly description: string;
  readonly placeholder: string;
  readonly cta: string;
  readonly disclaimer: string;
}

// === Footer ===

export interface FooterLinkData {
  readonly title: string;
  readonly links?: readonly string[];
  readonly items?: readonly { readonly icon: IconName; readonly text: string }[];
}

export interface FooterData {
  readonly brand: string;
  readonly copyright: string;
  readonly columns: readonly FooterLinkData[];
  readonly socialIcons: readonly IconName[];
  readonly popularTags: readonly string[];
}

// === Era labels (display layer) ===

export interface EraLabelData {
  readonly value: EraValue;
  readonly label: string;
}
