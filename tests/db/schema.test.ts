import { describe, it, expect } from "vitest";
import {
  locations,
  categories,
  tags,
  placeTags,
  places,
  contributors,
  placeContents,
  placeMedia,
  placeMediaAssignments,
  localVoices,
  submissions,
} from "@/db/schema";

describe("Schema exports", () => {
  it("exports all required tables", () => {
    expect(locations).toBeDefined();
    expect(categories).toBeDefined();
    expect(tags).toBeDefined();
    expect(placeTags).toBeDefined();
    expect(places).toBeDefined();
    expect(contributors).toBeDefined();
    expect(placeContents).toBeDefined();
    expect(placeMedia).toBeDefined();
    expect(placeMediaAssignments).toBeDefined();
    expect(localVoices).toBeDefined();
    expect(submissions).toBeDefined();
  });

  it("locations has text PK", () => {
    expect(locations.id.dataType).toBe("string");
    expect(locations.id.columnType).toBe("PgText");
  });

  it("categories has text PK", () => {
    expect(categories.id.dataType).toBe("string");
    expect(categories.id.columnType).toBe("PgText");
  });

  it("tags has text PK", () => {
    expect(tags.id.dataType).toBe("string");
    expect(tags.id.columnType).toBe("PgText");
  });

  it("places has uuid PK", () => {
    expect(places.id.columnType).toBe("PgUUID");
  });

  it("submissions place_id is nullable", () => {
    expect(submissions.place_id.dataType).toBe("string");
  });
});
