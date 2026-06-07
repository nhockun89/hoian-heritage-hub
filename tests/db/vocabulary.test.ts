import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  COLOR_THEMES,
  ERA_VALUES,
  MEDIA_TYPES,
  PLACE_CONTENT_TYPES,
  SUBMISSION_STATUSES,
  SUBMISSION_TYPES,
  SQL_CHECK_LOCATIONS,
} from "@/domain/vocabulary";

/**
 * These tests assert that the canonical vocabulary constants in
 * `src/domain/vocabulary.ts` agree with the SQL CHECK constraints
 * in `supabase/migrations/*.sql`. If a value is added to a constant
 * but not to the migration, these tests fail. If a value is added
 * to the migration but not to the constant, these tests also fail.
 *
 * The contract is: the constant is the source of truth; the SQL
 * CHECK is a downstream artifact. The test enforces the contract.
 */

function readMigration(filename: string): string {
  return readFileSync(
    resolve(process.cwd(), "supabase", "migrations", filename),
    "utf-8",
  );
}

function extractCheckValues(sql: string, checkName: string): string[] {
  const re = new RegExp(
    `CONSTRAINT\\s+${checkName}\\s+CHECK\\s*\\(\\s*([\\w]+)\\s+IN\\s*\\(([^)]+)\\)`,
    "i",
  );
  const match = sql.match(re);
  if (!match) return [];
  return match[2]
    .split(",")
    .map((s) => s.trim().replace(/^'/, "").replace(/'$/, ""));
}

describe("Vocabulary ↔ SQL CHECK agreement", () => {
  const migration = readMigration(SQL_CHECK_LOCATIONS.COLOR_THEMES);

  it("COLOR_THEMES matches categories_color_theme_check", () => {
    const sqlValues = extractCheckValues(
      migration,
      "categories_color_theme_check",
    );
    expect([...COLOR_THEMES].sort()).toEqual([...sqlValues].sort());
  });

  it("PLACE_CONTENT_TYPES matches place_contents_type_check", () => {
    const sqlValues = extractCheckValues(
      migration,
      "place_contents_type_check",
    );
    expect([...PLACE_CONTENT_TYPES].sort()).toEqual([...sqlValues].sort());
  });

  it("MEDIA_TYPES matches place_media_type_check", () => {
    const sqlValues = extractCheckValues(
      migration,
      "place_media_type_check",
    );
    expect([...MEDIA_TYPES].sort()).toEqual([...sqlValues].sort());
  });

  it("SUBMISSION_TYPES matches submissions_type_check", () => {
    const sqlValues = extractCheckValues(
      migration,
      "submissions_type_check",
    );
    expect([...SUBMISSION_TYPES].sort()).toEqual([...sqlValues].sort());
  });

  it("SUBMISSION_STATUSES matches submissions_status_check", () => {
    const sqlValues = extractCheckValues(
      migration,
      "submissions_status_check",
    );
    expect([...SUBMISSION_STATUSES].sort()).toEqual([...sqlValues].sort());
  });
});

describe("Vocabulary consistency", () => {
  it("every constant is non-empty", () => {
    expect(COLOR_THEMES.length).toBeGreaterThan(0);
    expect(ERA_VALUES.length).toBeGreaterThan(0);
    expect(MEDIA_TYPES.length).toBeGreaterThan(0);
    expect(PLACE_CONTENT_TYPES.length).toBeGreaterThan(0);
    expect(SUBMISSION_TYPES.length).toBeGreaterThan(0);
    expect(SUBMISSION_STATUSES.length).toBeGreaterThan(0);
  });

  it("every constant has unique values", () => {
    for (const arr of [
      COLOR_THEMES,
      ERA_VALUES,
      MEDIA_TYPES,
      PLACE_CONTENT_TYPES,
      SUBMISSION_TYPES,
      SUBMISSION_STATUSES,
    ]) {
      expect(new Set(arr).size).toBe(arr.length);
    }
  });
});

describe("Zod validators agree with vocabulary constants", () => {
  it("every value in COLOR_THEMES is accepted by colorThemeEnum", async () => {
    const { colorThemeEnum } = await import("@/db/validations");
    for (const v of COLOR_THEMES) {
      expect(colorThemeEnum.safeParse(v).success).toBe(true);
    }
  });

  it("every value in ERA_VALUES is accepted by eraEnumSchema", async () => {
    const { eraEnumSchema } = await import("@/db/validations");
    for (const v of ERA_VALUES) {
      expect(eraEnumSchema.safeParse(v).success).toBe(true);
    }
  });

  it("every value in MEDIA_TYPES is accepted by placeMediaTypeSchema", async () => {
    const { placeMediaTypeSchema } = await import("@/db/validations");
    for (const v of MEDIA_TYPES) {
      expect(placeMediaTypeSchema.safeParse(v).success).toBe(true);
    }
  });

  it("every value in PLACE_CONTENT_TYPES is accepted by placeContentTypeSchema", async () => {
    const { placeContentTypeSchema } = await import("@/db/validations");
    for (const v of PLACE_CONTENT_TYPES) {
      expect(placeContentTypeSchema.safeParse(v).success).toBe(true);
    }
  });

  it("every value in SUBMISSION_TYPES is accepted by submissionTypeSchema", async () => {
    const { submissionTypeSchema } = await import("@/db/validations");
    for (const v of SUBMISSION_TYPES) {
      expect(submissionTypeSchema.safeParse(v).success).toBe(true);
    }
  });

  it("every value in SUBMISSION_STATUSES is accepted by submissionStatusSchema", async () => {
    const { submissionStatusSchema } = await import("@/db/validations");
    for (const v of SUBMISSION_STATUSES) {
      expect(submissionStatusSchema.safeParse(v).success).toBe(true);
    }
  });

  it("Zod rejects values NOT in the constant", async () => {
    const { colorThemeEnum } = await import("@/db/validations");
    expect(colorThemeEnum.safeParse("not-a-color").success).toBe(false);
    expect(colorThemeEnum.safeParse("").success).toBe(false);
  });
});
