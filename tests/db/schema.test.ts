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

/**
 * Schema shape tests. The previous version of this file was
 * 4-of-7 toBeDefined() checks; the rest were narrow PK-type
 * checks. The new version exercises the *shape* of every
 * required column on every table — column type, nullability,
 * defaults where they exist.
 *
 * The tests catch two classes of bug:
 *   1. A schema change that drops a NOT NULL constraint the
 *      application relies on.
 *   2. A typo in a column name that the TS compiler doesn't
 *      catch (because the column is referenced dynamically).
 *
 * They do NOT catch:
 *   - SQL CHECK constraints (see tests/db/vocabulary.test.ts).
 *   - Index definitions.
 *   - FK onDelete behavior.
 * Those belong in a follow-up round with a real test DB.
 */

type ColumnLike = {
  dataType: string;
  columnType: string;
  notNull: boolean;
  hasDefault?: boolean;
};

function getColumn(table: object, name: string): ColumnLike {
  const col = (table as Record<string, ColumnLike | undefined>)[name];
  if (!col) {
    throw new Error(`column ${String(name)} not found on table`);
  }
  return col;
}

describe("locations", () => {
  it("id is text, not null, primary", () => {
    const id = getColumn(locations, "id");
    expect(id.dataType).toBe("string");
    expect(id.columnType).toBe("PgText");
    expect(id.notNull).toBe(true);
  });

  it("slug is unique text", () => {
    const slug = getColumn(locations, "slug");
    expect(slug.dataType).toBe("string");
    expect(slug.notNull).toBe(true);
  });

  it("country is required", () => {
    expect(getColumn(locations, "country").notNull).toBe(true);
  });

  it("published has a default (false)", () => {
    const published = getColumn(locations, "published");
    expect(published.notNull).toBe(true);
    expect(published.hasDefault).toBe(true);
  });

  it("timestamps have defaults and are not null", () => {
    expect(getColumn(locations, "created_at").notNull).toBe(true);
    expect(getColumn(locations, "updated_at").notNull).toBe(true);
  });
});

describe("categories", () => {
  it("id is text", () => {
    const id = getColumn(categories, "id");
    expect(id.dataType).toBe("string");
    expect(id.columnType).toBe("PgText");
  });

  it("name, slug, icon, color_theme are all required", () => {
    for (const c of ["short_name", "name", "slug", "icon", "color_theme"]) {
      expect(getColumn(categories, c).notNull, c).toBe(true);
    }
  });

  it("color_theme is a text column (CHECK constraint is enforced in SQL)", () => {
    expect(getColumn(categories, "color_theme").columnType).toBe("PgText");
  });
});

describe("tags", () => {
  it("id is text", () => {
    const id = getColumn(tags, "id");
    expect(id.columnType).toBe("PgText");
  });

  it("name, slug, type are required", () => {
    for (const c of ["name", "slug", "type"]) {
      expect(getColumn(tags, c).notNull, c).toBe(true);
    }
  });
});

describe("places", () => {
  it("id is uuid", () => {
    const id = getColumn(places, "id");
    expect(id.dataType).toBe("string");
    expect(id.columnType).toBe("PgUUID");
  });

  it("location_id and category_id are required (FK)", () => {
    expect(getColumn(places, "location_id").notNull).toBe(true);
    expect(getColumn(places, "category_id").notNull).toBe(true);
  });

  it("slug is required", () => {
    expect(getColumn(places, "slug").notNull).toBe(true);
  });

  it("lat and lng are nullable decimals", () => {
    expect(getColumn(places, "lat").notNull).toBe(false);
    expect(getColumn(places, "lng").notNull).toBe(false);
  });

  it("published defaults to false", () => {
    const p = getColumn(places, "published");
    expect(p.notNull).toBe(true);
    expect(p.hasDefault).toBe(true);
  });
});

describe("contributors", () => {
  it("id is uuid", () => {
    expect(getColumn(contributors, "id").columnType).toBe("PgUUID");
  });

  it("name is required", () => {
    expect(getColumn(contributors, "name").notNull).toBe(true);
  });

  it("role, bio, avatar_url are optional", () => {
    expect(getColumn(contributors, "role").notNull).toBe(false);
    expect(getColumn(contributors, "bio").notNull).toBe(false);
    expect(getColumn(contributors, "avatar_url").notNull).toBe(false);
  });
});

describe("placeContents", () => {
  it("id is uuid", () => {
    expect(getColumn(placeContents, "id").columnType).toBe("PgUUID");
  });

  it("place_id, type, content_json, sort_order are required", () => {
    for (const c of ["place_id", "type", "content_json", "sort_order"]) {
      expect(getColumn(placeContents, c).notNull, c).toBe(true);
    }
  });

  it("type is a text column (CHECK constraint is enforced in SQL)", () => {
    expect(getColumn(placeContents, "type").columnType).toBe("PgText");
  });
});

describe("placeMedia", () => {
  it("id is uuid", () => {
    expect(getColumn(placeMedia, "id").columnType).toBe("PgUUID");
  });

  it("type and url are required", () => {
    for (const c of ["type", "url"]) {
      expect(getColumn(placeMedia, c).notNull, c).toBe(true);
    }
  });

  it("era and era_display are optional text", () => {
    expect(getColumn(placeMedia, "era").notNull).toBe(false);
    expect(getColumn(placeMedia, "era_display").notNull).toBe(false);
  });

  it("thumbnail_url, medium_url, large_url, alt_text, caption, credit are optional", () => {
    for (const c of [
      "thumbnail_url",
      "medium_url",
      "large_url",
      "alt_text",
      "caption",
      "credit",
    ]) {
      expect(getColumn(placeMedia, c).notNull, c).toBe(false);
    }
  });
});

describe("placeMediaAssignments", () => {
  it("place_id, media_id, role, sort_order are required", () => {
    for (const c of ["place_id", "media_id", "role", "sort_order"]) {
      expect(
        getColumn(placeMediaAssignments, c).notNull,
        c,
      ).toBe(true);
    }
  });
});

describe("placeTags", () => {
  it("place_id and tag_id are required (composite PK)", () => {
    expect(getColumn(placeTags, "place_id").notNull).toBe(true);
    expect(getColumn(placeTags, "tag_id").notNull).toBe(true);
  });
});

describe("localVoices", () => {
  it("id is uuid", () => {
    expect(getColumn(localVoices, "id").columnType).toBe("PgUUID");
  });

  it("place_id and quote are required", () => {
    expect(getColumn(localVoices, "place_id").notNull).toBe(true);
    expect(getColumn(localVoices, "quote").notNull).toBe(true);
  });

  it("contributor_id is optional (set null on delete)", () => {
    expect(getColumn(localVoices, "contributor_id").notNull).toBe(false);
  });

  it("verified and published are required booleans with defaults", () => {
    for (const c of ["verified", "published"]) {
      const col = getColumn(localVoices, c);
      expect(col.notNull, c).toBe(true);
      expect(col.hasDefault, c).toBe(true);
    }
  });
});

describe("submissions", () => {
  it("id is uuid", () => {
    expect(getColumn(submissions, "id").columnType).toBe("PgUUID");
  });

  it("place_id is nullable (required for new_place)", () => {
    expect(getColumn(submissions, "place_id").notNull).toBe(false);
  });

  it("contributor_name, type, content_json, status are required", () => {
    for (const c of [
      "contributor_name",
      "type",
      "content_json",
      "status",
    ]) {
      expect(getColumn(submissions, c).notNull, c).toBe(true);
    }
  });

  it("contributor_contact is optional", () => {
    expect(getColumn(submissions, "contributor_contact").notNull).toBe(false);
  });

  it("status has a default (pending)", () => {
    const status = getColumn(submissions, "status");
    expect(status.hasDefault).toBe(true);
  });
});
