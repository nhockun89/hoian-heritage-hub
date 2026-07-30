import { describe, it, expect } from "vitest";
import { foodPageData } from "@/data/sections";

const VALID_PRICES = new Set(["$", "$$", "$$$"]);

/**
 * Data-shape invariants for the Food page mock adapter.
 *
 * These tests act as a snapshot of the editorial contract: every
 * must-try item must have a unique id, every place must reference
 * valid vibe ids, prices must be in the allowed vocabulary, etc.
 */

describe("Food page data shape", () => {
  it("has all required top-level sections", () => {
    expect(foodPageData.hero).toBeDefined();
    expect(foodPageData.search).toBeDefined();
    expect(foodPageData.mustTaste).toBeDefined();
    expect(foodPageData.places).toBeDefined();
    expect(foodPageData.riverside).toBeDefined();
    expect(foodPageData.stories).toBeDefined();
  });

  it("hero has non-empty title and description", () => {
    expect(foodPageData.hero.title.trim()).not.toBe("");
    expect(foodPageData.hero.description.trim()).not.toBe("");
    expect(foodPageData.hero.imageUrl).toMatch(/^https:\/\//);
  });

  it("must-taste items have unique ids", () => {
    const ids = foodPageData.mustTaste.items.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("must-taste items have valid prices and positive serving counts", () => {
    for (const item of foodPageData.mustTaste.items) {
      expect(
        VALID_PRICES.has(item.price),
        `invalid price "${item.price}" on ${item.id}`,
      ).toBe(true);
      expect(item.servingPlaceCount).toBeGreaterThanOrEqual(0);
    }
  });

  it("must-taste items have image URLs and tags", () => {
    for (const item of foodPageData.mustTaste.items) {
      expect(item.imageUrl).toMatch(/^https:\/\//);
      expect(item.tag.trim()).not.toBe("");
    }
  });

  it("vibe tags have unique ids and 4 featured tags", () => {
    const ids = foodPageData.places.vibeTags.map((v) => v.id);
    expect(new Set(ids).size).toBe(ids.length);
    const featured = foodPageData.places.vibeTags.filter((v) => v.featured);
    expect(featured).toHaveLength(4);
  });

  it("place ids are unique", () => {
    const ids = foodPageData.places.places.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every place references only known vibe ids", () => {
    const validVibeIds = new Set(foodPageData.places.vibeTags.map((v) => v.id));
    for (const place of foodPageData.places.places) {
      for (const vibeId of place.vibes) {
        expect(
          validVibeIds.has(vibeId),
          `unknown vibe "${vibeId}" on place "${place.id}"`,
        ).toBe(true);
      }
    }
  });

  it("every place neighborhood is in the allowed list", () => {
    const allowed = new Set(foodPageData.places.neighborhoods);
    for (const place of foodPageData.places.places) {
      expect(
        allowed.has(place.neighborhood),
        `unknown neighborhood "${place.neighborhood}" on place "${place.id}"`,
      ).toBe(true);
    }
  });

  it("every place has a valid price and rating", () => {
    for (const place of foodPageData.places.places) {
      expect(VALID_PRICES.has(place.price)).toBe(true);
      expect(place.rating).toBeGreaterThanOrEqual(0);
      expect(place.rating).toBeLessThanOrEqual(5);
    }
  });

  it("places have at least one dish and a non-empty description", () => {
    for (const place of foodPageData.places.places) {
      expect(place.dishes.length).toBeGreaterThan(0);
      expect(place.description.trim()).not.toBe("");
    }
  });

  it("riverside and story cards have image URLs", () => {
    expect(foodPageData.riverside.imageUrl).toMatch(/^https:\/\//);
    for (const story of foodPageData.stories.stories) {
      expect(story.imageUrl).toMatch(/^https:\/\//);
    }
  });

  it("mini story and spice card have required copy", () => {
    expect(foodPageData.stories.miniStory.tag.trim()).not.toBe("");
    expect(foodPageData.stories.miniStory.title.trim()).not.toBe("");
    expect(foodPageData.stories.miniStory.body.trim()).not.toBe("");
    expect(foodPageData.stories.miniStory.icon.trim()).not.toBe("");
    expect(foodPageData.stories.spiceCard.tag.trim()).not.toBe("");
    expect(foodPageData.stories.spiceCard.title.trim()).not.toBe("");
    expect(foodPageData.stories.spiceCard.body.trim()).not.toBe("");
    expect(foodPageData.stories.spiceCard.icon.trim()).not.toBe("");
  });

  it("stories section has title and subtitle", () => {
    expect(foodPageData.stories.title.trim()).not.toBe("");
    expect(foodPageData.stories.subtitle.trim()).not.toBe("");
  });

  it("story ids are unique", () => {
    const ids = foodPageData.stories.stories.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
