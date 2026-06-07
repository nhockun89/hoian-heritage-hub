import { describe, it, expect } from "vitest";
import { CATEGORIES } from "@/domain/taxonomy";
import {
  categoryShortcuts,
  discoverData,
  experiencesData,
  footerData,
  heroData,
} from "@/data/sections";

/**
 * Cross-reference invariants. The 7-element category vocabulary
 * is defined once in src/domain/taxonomy.ts. Every section that
 * references a category by its long name ("Heritage Sites",
 * "Food & Drink", …) must agree with that vocabulary. A typo
 * like "Heritage Site" (singular) would silently filter to
 * nothing in ExperiencesDirectory.
 */

const FULL_NAMES = CATEGORIES.map((c) => c.full);
const SHORT_NAMES = CATEGORIES.map((c) => c.short);

describe("Category cross-references", () => {
  it("categoryShortcuts covers all 7 categories", () => {
    expect(categoryShortcuts).toHaveLength(7);
    for (const c of CATEGORIES) {
      const found = categoryShortcuts.find((s) => s.id === c.id);
      expect(found, `shortcut missing for ${c.id}`).toBeDefined();
      expect(found?.fullLabel).toBe(c.full);
    }
  });

  it("heroData.searchCategories is ['All', ...all 7 category full names]", () => {
    const [, ...rest] = heroData.searchCategories;
    expect(rest).toHaveLength(7);
    for (const c of CATEGORIES) {
      expect(rest).toContain(c.full);
    }
  });

  it("discoverData.categories covers all 7 category ids", () => {
    const ids = discoverData.categories.map((c) => c.id);
    expect(ids.sort()).toEqual(CATEGORIES.map((c) => c.id).sort());
  });

  it("discoverData category counts match the CATEGORIES editorial counts", () => {
    for (const c of CATEGORIES) {
      const card = discoverData.categories.find((d) => d.id === c.id);
      expect(card?.count, `count mismatch for ${c.id}`).toBe(c.count);
    }
  });

  it("discoverData category full-title matches CATEGORIES full", () => {
    for (const c of CATEGORIES) {
      const card = discoverData.categories.find((d) => d.id === c.id);
      expect(card?.title, `title mismatch for ${c.id}`).toBe(c.full);
    }
  });

  it("experiencesData.filters first entry is the 'All' sentinel; rest match category fulls", () => {
    expect(experiencesData.filters[0].value).toBe("All");
    const filterValues = experiencesData.filters
      .slice(1)
      .map((f) => f.value);
    for (const c of CATEGORIES) {
      expect(filterValues).toContain(c.full);
    }
  });

  it("every experiencesData item category matches a known full name (or 'All')", () => {
    const allowed = new Set(["All", ...FULL_NAMES]);
    for (const item of experiencesData.items) {
      expect(
        allowed.has(item.category),
        `unknown category "${item.category}" on experience "${item.title}"`,
      ).toBe(true);
    }
  });

  it("footer 'Explore' column links are the 7 category fulls", () => {
    const exploreCol = footerData.columns.find((c) => c.title === "Explore");
    expect(exploreCol?.links).toHaveLength(7);
    for (const c of CATEGORIES) {
      expect(exploreCol?.links).toContain(c.full);
    }
  });

  it("category short names are unique", () => {
    expect(new Set(SHORT_NAMES).size).toBe(7);
  });
});
