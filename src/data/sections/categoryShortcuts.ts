import { CATEGORIES } from "../../domain/taxonomy";
import { tokensFor } from "../../domain/tokens";
import type { CategoryId } from "../../domain/taxonomy";
import type { ColorTheme } from "../../domain/vocabulary";
import type { IconName } from "../../domain/types";

/**
 * The 7 category shortcuts. The `color` field is the
 * `swatch` token for the category's color theme (Tailwind class
 * string), which is what the CategoryShortcuts component
 * consumes directly.
 *
 * TODO(architecture): migrate the component to look up the swatch
 * itself via `tokensFor(category.color).swatch`, replacing the
 * inline class string with the typed `color: ColorTheme` field.
 */
export interface CategoryShortcutRow {
  readonly id: CategoryId;
  readonly icon: IconName;
  readonly label: string;
  readonly fullLabel: string;
  readonly count: number;
  /** Tailwind class string for the swatch background + text. */
  readonly color: string;
  /** Source color theme — kept for the future migration above. */
  readonly theme: ColorTheme;
}

export const categoryShortcuts: readonly CategoryShortcutRow[] =
  CATEGORIES.map((c) => ({
    id: c.id,
    icon: c.icon,
    label: c.short,
    fullLabel: c.full,
    count: c.count,
    color: tokensFor(c.color).swatch,
    theme: c.color,
  }));
