/**
 * Visual tokens for the 4 color themes.
 *
 * `TOKENS_BY_THEME` is the single source of truth for how each
 * `ColorTheme` (defined in taxonomy.ts) renders in the UI. The hex
 * classes were previously scattered across `src/data/mockData.ts` in
 * three different formats (background-swatch pairs, tag-pill pairs,
 * surface cards). Centralizing them here:
 *
 *   - makes a color change a one-line edit
 *   - gives components a typed lookup (`tokens.bgSwatch(category.color)`)
 *   - gives tests a single invariant to assert (every ColorTheme has
 *     every token field filled in)
 *
 * When Tailwind theme tokens for these four colors are introduced
 * (Option C in the architecture review), the hex values can be
 * replaced with `bg-heritage/20` etc. without touching any component.
 *
 * The vocabulary in this file is intentionally UI-only. Database
 * constraints for `color_theme` live in src/db/validations.ts.
 */

import type { ColorTheme } from "./taxonomy";

export interface ThemeTokens {
  /** Pill / chip background + text (e.g. category shortcuts). */
  readonly swatch: string;
  /** Solid pill used as a tag in card headers (e.g. Discover cards). */
  readonly tag: string;
  /** Soft tinted surface for editorial cards. */
  readonly surface: string;
  /** Foreground text on `surface`. */
  readonly ink: string;
}

export const TOKENS_BY_THEME: Readonly<Record<ColorTheme, ThemeTokens>> = {
  heritage: {
    swatch: "bg-[#f4d03f]/20 text-[#705d00]",
    tag:    "bg-[#f4d03f]/90 text-[#221b00]",
    surface: "bg-primary-container/30",
    ink:    "text-on-primary-container",
  },
  food: {
    swatch: "bg-[#f39c12]/20 text-[#865300]",
    tag:    "bg-[#f39c12]/90 text-[#ffffff]",
    surface: "bg-tertiary-container/30",
    ink:    "text-on-tertiary-container",
  },
  nature: {
    swatch: "bg-[#76d7c4]/20 text-[#006b5d]",
    tag:    "bg-[#0f766e]/90 text-[#ffffff]",
    surface: "bg-secondary-container/30",
    ink:    "text-on-secondary-container",
  },
  activity: {
    swatch: "bg-[#0f766e]/20 text-[#03362d]",
    tag:    "bg-[#0f766e]/90 text-[#ffffff]",
    surface: "bg-secondary-container/30",
    ink:    "text-on-secondary-container",
  },
};

export function tokensFor(theme: ColorTheme): ThemeTokens {
  return TOKENS_BY_THEME[theme];
}
