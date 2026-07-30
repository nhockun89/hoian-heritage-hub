/**
 * Canonical enums for the data layer.
 *
 * Every enum that constrains a database column lives here as an
 * `as const` array. The Zod validators in `src/db/validations.ts`
 * are derived from these constants; the SQL CHECK constraints in
 * `supabase/migrations/*.sql` are downstream artifacts that a
 * snapshot test (tests/db/vocabulary.test.ts) asserts stay in sync.
 *
 * The browser-safe types (`ColorTheme`, `EraValue`, etc.) are
 * derived here too, so frontend code can use them without pulling
 * in Zod. The DB layer's Zod validators import the same constants,
 * which is what makes the seam real: a change to a value here
 * fails tests on the SQL side and the Zod side at the same time.
 *
 * Adding a value: edit the relevant constant. If the value should
 * be accepted by the database, add it to the SQL CHECK constraint
 * in a new migration (tests/db/vocabulary.test.ts will fail until
 * you do).
 */

export const COLOR_THEMES = ["heritage", "food", "nature", "activity"] as const;
export type ColorTheme = (typeof COLOR_THEMES)[number];

export const ERA_VALUES = ["1800s", "1900s", "colonial", "pre-war", "present"] as const;
export type EraValue = (typeof ERA_VALUES)[number];

export const PLACE_CONTENT_TYPES = [
  "history",
  "comparison",
  "story",
  "tip",
  "highlight",
] as const;
export type PlaceContentType = (typeof PLACE_CONTENT_TYPES)[number];

export const MEDIA_TYPES = [
  "photo-past",
  "photo-present",
  "video",
  "audio",
  "document",
] as const;
export type MediaType = (typeof MEDIA_TYPES)[number];

export const MEDIA_ASSIGNMENT_ROLES = ["hero", "gallery"] as const;
export type MediaAssignmentRole = (typeof MEDIA_ASSIGNMENT_ROLES)[number];

export const SUBMISSION_TYPES = [
  "local_voice",
  "correction",
  "new_place",
] as const;
export type SubmissionType = (typeof SUBMISSION_TYPES)[number];

export const SUBMISSION_STATUSES = [
  "pending",
  "approved",
  "rejected",
] as const;
export type SubmissionStatus = (typeof SUBMISSION_STATUSES)[number];

/**
 * Mapping from a vocabulary constant to the SQL migration filename
 * where its CHECK constraint lives. The snapshot test reads the
 * file as a string and asserts every value of the constant appears
 * in a CHECK clause.
 *
 * When a value is added to a constant, add a new migration file
 * (`supabase/migrations/0000N_*.sql`) that ALTERs the CHECK
 * constraint to include the new value; update the array here.
 */
export const SQL_CHECK_LOCATIONS = {
  COLOR_THEMES: "00005_category_taxonomy_update.sql",
  PLACE_CONTENT_TYPES: "00001_initial_schema.sql",
  MEDIA_TYPES: "00001_initial_schema.sql",
  SUBMISSION_TYPES: "00001_initial_schema.sql",
  SUBMISSION_STATUSES: "00001_initial_schema.sql",
  // ERA_VALUES is intentionally absent — there is no SQL CHECK
  // for `era` in the current schema (see ADR-0001 in the docs
  // folder, when written). The Zod enum is the only constraint.
} as const;
