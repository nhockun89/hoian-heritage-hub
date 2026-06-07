import { describe, it, expect } from "vitest";
import type {
  HeroData,
  ExperienceData,
  CategoryShortcutData,
  FeaturedData,
} from "@/domain/types";
import { CATEGORIES } from "@/domain/taxonomy";
import type { ColorTheme, EraValue } from "@/domain/vocabulary";

/**
 * Type-level tests. The point of these is to assert that the
 * `src/domain/types.ts` module compiles cleanly and that the
 * shapes line up with the vocabulary / taxonomy they depend on.
 * If a category id is added to CATEGORIES that doesn't match a
 * CategoryId, the assignments below fail to type-check.
 */

describe("Domain type contracts", () => {
  it("HeroData is constructible from a sample literal", () => {
    const hero: HeroData = {
      subtitle: "Subtitle",
      title: "Title",
      ctaPrimary: "Primary",
      ctaSecondary: "Secondary",
      imageUrl: "https://example.com/hero.jpg",
      searchCategories: ["All", "Heritage"],
    };
    expect(hero.title).toBe("Title");
  });

  it("CategoryShortcutData can be derived from CATEGORIES", () => {
    const shortcuts: readonly CategoryShortcutData[] = CATEGORIES.map((c) => ({
      id: c.id,
      icon: c.icon,
      fullLabel: c.full,
      count: c.count,
      color: c.color,
    }));
    expect(shortcuts).toHaveLength(7);
  });

  it("ColorTheme is the type used by CATEGORIES", () => {
    const theme: ColorTheme = "heritage";
    expect(theme).toBe("heritage");
  });

  it("EraValue is one of the canonical 5 values", () => {
    const era: EraValue = "colonial";
    expect(["1800s", "1900s", "colonial", "pre-war", "present"]).toContain(era);
  });

  it("ExperienceData accepts a category by long-form string", () => {
    const e: ExperienceData = {
      id: 1,
      title: "Test",
      category: "Heritage Sites",
      rating: 4.9,
      reviews: 100,
      duration: "3 hours",
      price: "$10",
      imageUrl: "https://example.com/x.jpg",
      tag: "Guided",
      howTo: "Walk to the bridge.",
    };
    expect(e.id).toBe(1);
  });

  it("FeaturedData accepts both variants", () => {
    const bridge: FeaturedData = {
      subtitle: "Legacy Landmark",
      title: "Bridge",
      description: "...",
      imageUrl: "https://example.com/b.jpg",
      features: [],
      variant: "bridge",
    };
    const green: FeaturedData = {
      subtitle: "Sustainable Life",
      title: "Green",
      description: "...",
      imageUrl: "https://example.com/g.jpg",
      features: [],
      cta: "Explore",
      images: [],
      variant: "green",
    };
    expect(bridge.variant).toBe("bridge");
    expect(green.variant).toBe("green");
  });
});
