import { describe, it, expect } from "vitest";
import {
  CATEGORIES,
  CATEGORY_BY_ID,
  COLOR_THEMES,
  findCategoryByFull,
  findCategoryById,
} from "@/domain/taxonomy";
import { TOKENS_BY_THEME } from "@/domain/tokens";

describe("CATEGORIES vocabulary", () => {
  it("has exactly 7 categories", () => {
    expect(CATEGORIES).toHaveLength(7);
  });

  it("has unique ids, shorts, and fulls", () => {
    const ids = CATEGORIES.map((c) => c.id);
    const shorts = CATEGORIES.map((c) => c.short);
    const fulls = CATEGORIES.map((c) => c.full);

    expect(new Set(ids).size).toBe(7);
    expect(new Set(shorts).size).toBe(7);
    expect(new Set(fulls).size).toBe(7);
  });

  it("every category has a known color theme", () => {
    for (const c of CATEGORIES) {
      expect(COLOR_THEMES).toContain(c.color);
    }
  });

  it("every category has an icon and a non-zero count", () => {
    for (const c of CATEGORIES) {
      expect(c.icon).toBeTruthy();
      expect(c.count).toBeGreaterThan(0);
    }
  });

  it("CATEGORY_BY_ID covers every category in CATEGORIES", () => {
    for (const c of CATEGORIES) {
      expect(CATEGORY_BY_ID[c.id]).toBe(c);
    }
  });
});

describe("Category lookups", () => {
  it("findCategoryByFull returns the matching category", () => {
    expect(findCategoryByFull("Heritage Sites")?.id).toBe("heritage");
    expect(findCategoryByFull("Food & Drink")?.id).toBe("food");
    expect(findCategoryByFull("Stays & Accommodation")?.id).toBe("stays");
  });

  it("findCategoryByFull returns undefined for unknown values", () => {
    expect(findCategoryByFull("Heritage Site")).toBeUndefined();
    expect(findCategoryByFull("")).toBeUndefined();
  });

  it("findCategoryById returns the matching category", () => {
    expect(findCategoryById("activities")?.full).toBe("Activities & Experiences");
  });

  it("findCategoryById returns undefined for unknown ids", () => {
    expect(findCategoryById("not-a-category")).toBeUndefined();
  });
});

describe("TOKENS_BY_THEME", () => {
  it("has a token entry for every color theme", () => {
    for (const theme of COLOR_THEMES) {
      expect(TOKENS_BY_THEME[theme]).toBeDefined();
    }
  });

  it("every token entry has all four surface strings", () => {
    for (const theme of COLOR_THEMES) {
      const t = TOKENS_BY_THEME[theme];
      expect(t.swatch).toMatch(/^bg-\[#[0-9a-fA-F]{6}\]\/\d+/);
      expect(t.tag).toMatch(/^bg-\[#[0-9a-fA-F]{6}\]\/\d+/);
      expect(t.surface).toMatch(/^bg-[a-z-]+(\/\d+)?$/);
      expect(t.ink).toMatch(/^text-[a-z-]+$/);
    }
  });
});
