/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import { describe, it, expect, vi } from "vitest";

vi.mock("@/db/index", () => ({
  db: { query: {} as any },
}));

import { db } from "@/db/index";
import {
  places,
  placeContents,
  placeMedia,
  placeMediaAssignments,
  localVoices,
  placeTags,
  tags,
  categories,
} from "@/db/schema";
import { eq, and } from "drizzle-orm";

describe.skip("Database query patterns (requires running DB)", () => {
  it("loads a place detail page: place + contents + media + voices + tags", async () => {
    const locationId = "hoi-an";
    const categorySlug = "historic-places";
    const placeSlug = "japanese-covered-bridge";

    const category = await db.query.categories.findFirst({
      where: eq(categories.slug, categorySlug),
    });
    expect(category).toBeDefined();

    const place = await db.query.places.findFirst({
      where: and(
        eq(places.location_id, locationId),
        eq(places.category_id, category!.id),
        eq(places.slug, placeSlug),
        eq(places.published, true),
      ),
    });
    expect(place).toBeDefined();

    const contents = await db.query.placeContents.findMany({
      where: eq(placeContents.place_id, place!.id),
      orderBy: (pc, { asc }) => [asc(pc.sort_order)],
    });

    const mediaAssignments = await db.query.placeMediaAssignments.findMany({
      where: eq(placeMediaAssignments.place_id, place!.id),
      orderBy: (pma, { asc }) => [asc(pma.sort_order)],
    });
    const mediaIds = mediaAssignments.map((m) => m.media_id);
    const media = await db.query.placeMedia.findMany({
      where: (pm, { inArray }) => inArray(pm.id, mediaIds),
    });

    const voices = await db.query.localVoices.findMany({
      where: and(
        eq(localVoices.place_id, place!.id),
        eq(localVoices.verified, true),
        eq(localVoices.published, true),
      ),
      orderBy: (lv, { asc }) => [asc(lv.sort_order)],
    });

    const placeTagRows = await db.query.placeTags.findMany({
      where: eq(placeTags.place_id, place!.id),
    });
    const tagIds = placeTagRows.map((pt) => pt.tag_id);
    const placeTagData = await db.query.tags.findMany({
      where: (t, { inArray }) => inArray(t.id, tagIds),
    });

    expect(contents.length).toBeGreaterThan(0);
    expect(media.length).toBeGreaterThan(0);
    expect(voices.length).toBeGreaterThanOrEqual(0);
    expect(placeTagData.length).toBeGreaterThanOrEqual(0);
  });

  it("lists published places by location and category", async () => {
    const results = await db.query.places.findMany({
      where: and(
        eq(places.location_id, "hoi-an"),
        eq(places.category_id, "historic-places"),
        eq(places.published, true),
      ),
      orderBy: (p, { asc }) => [asc(p.sort_order)],
    });
    expect(results).toBeDefined();
  });

  it("filters local voices by verified and published", async () => {
    const voices = await db.query.localVoices.findMany({
      where: and(
        eq(localVoices.verified, true),
        eq(localVoices.published, true),
      ),
    });
    expect(Array.isArray(voices)).toBe(true);
  });
});
