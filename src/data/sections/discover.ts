import { tokensFor } from "../../domain/tokens";
import type { DiscoverData } from "../../domain/types";
import type { ColorTheme } from "../../domain/vocabulary";

/**
 * Discover section. Each category card has a `tag` (short label),
 * a `title` (long label), an `imageUrl`, a `count`, a `cta`, a
 * `color: ColorTheme`, and a `tagColor` Tailwind class string
 * derived from the `tag` token for that color theme.
 *
 * The `count` is editorial and must match the corresponding
 * `CATEGORIES` entry in taxonomy.ts. The cross-reference is
 * tested in tests/data/discover.test.ts (see Round 6).
 */

interface DiscoverRow {
  readonly id: DiscoverData["categories"][number]["id"];
  readonly tag: string;
  readonly title: string;
  readonly description: string;
  readonly imageUrl: string;
  readonly count: number;
  readonly cta: string;
  readonly color: ColorTheme;
}

const ROWS: readonly DiscoverRow[] = [
  {
    id: "heritage",
    tag: "Heritage",
    title: "Heritage Sites",
    description:
      "Wander through centuries-old merchant houses, assembly halls, and the iconic Japanese Covered Bridge.",
    imageUrl: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80",
    count: 12,
    cta: "View 12 Sites",
    color: "heritage",
  },
  {
    id: "food",
    tag: "Food & Drink",
    title: "Food & Drink",
    description:
      "Taste the rich history of Hoi An through Cao Lau, White Rose dumplings, and bustling night markets.",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    count: 24,
    cta: "Discover 24 Flavors",
    color: "food",
  },
  {
    id: "nature",
    tag: "Nature",
    title: "Nature & Outdoors",
    description:
      "Experience the peaceful rhythm of the Thu Bon River, coconut forests, and An Bang Beach.",
    imageUrl: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=800&q=80",
    count: 8,
    cta: "Explore 8 Tours",
    color: "nature",
  },
  {
    id: "arts",
    tag: "Arts",
    title: "Arts & Crafts",
    description:
      "Discover lantern making, silk weaving, wood carving, and pottery workshops with master artisans.",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
    count: 6,
    cta: "Explore 6 Workshops",
    color: "heritage",
  },
  {
    id: "activities",
    tag: "Activities",
    title: "Activities & Experiences",
    description:
      "From basket boat rides and cycling tours to cooking classes and sunset river cruises.",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    count: 15,
    cta: "View 15 Activities",
    color: "activity",
  },
  {
    id: "local-life",
    tag: "Local Life",
    title: "Local Life & Markets",
    description:
      "Immerse yourself in morning markets, tailors, family-run cafes, and the rhythm of daily life.",
    imageUrl: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80",
    count: 10,
    cta: "Explore 10 Spots",
    color: "food",
  },
  {
    id: "stays",
    tag: "Stays",
    title: "Stays & Accommodation",
    description:
      "From heritage homestays in the old town to beachfront villas and boutique hotels.",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    count: 18,
    cta: "View 18 Stays",
    color: "nature",
  },
];

export const discoverData: DiscoverData = {
  title: "Discover Your Path",
  categories: ROWS.map((r) => ({
    ...r,
    tagColor: tokensFor(r.color).tag,
  })),
};
