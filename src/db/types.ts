/**
 * Drizzle-derived row types and content_json types.
 *
 * The Drizzle row types (Location, Place, Contributor, etc.) are
 * derived from the schema in `./schema.ts` via `InferSelectModel`
 * and `InferInsertModel`. These are the *persistence* shape — what
 * comes out of the database or goes in.
 *
 * The content_json types (HistoryContent, ContentJson, etc.) are
 * derived from the Zod schemas in `./validations.ts` via
 * `z.infer`. The Zod schemas are the source of truth; the TS
 * types are projections of them. Adding a field to the Zod schema
 * automatically extends the inferred type.
 */

import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import type { z } from "zod";
import {
  locations, categories, tags, placeTags, places, contributors,
  placeContents, placeMedia, placeMediaAssignments, localVoices, submissions,
} from "./schema";
import {
  historyContentSchema,
  comparisonContentSchema,
  storyContentSchema,
  tipContentSchema,
  highlightContentSchema,
} from "./validations";

export type Location = InferSelectModel<typeof locations>;
export type NewLocation = InferInsertModel<typeof locations>;

export type Category = InferSelectModel<typeof categories>;
export type NewCategory = InferInsertModel<typeof categories>;

export type Tag = InferSelectModel<typeof tags>;
export type NewTag = InferInsertModel<typeof tags>;

export type PlaceTag = InferSelectModel<typeof placeTags>;

export type Place = InferSelectModel<typeof places>;
export type NewPlace = InferInsertModel<typeof places>;

export type Contributor = InferSelectModel<typeof contributors>;
export type NewContributor = InferInsertModel<typeof contributors>;

export type PlaceContent = InferSelectModel<typeof placeContents>;
export type NewPlaceContent = InferInsertModel<typeof placeContents>;

export type PlaceMedium = InferSelectModel<typeof placeMedia>;
export type NewPlaceMedium = InferInsertModel<typeof placeMedia>;

export type PlaceMediaAssignment = InferSelectModel<typeof placeMediaAssignments>;

export type LocalVoice = InferSelectModel<typeof localVoices>;
export type NewLocalVoice = InferInsertModel<typeof localVoices>;

export type Submission = InferSelectModel<typeof submissions>;
export type NewSubmission = InferInsertModel<typeof submissions>;

/**
 * Content_json shape per type. Derived from the Zod schemas in
 * `./validations.ts`. The Zod schemas are the runtime-validated
 * source; the TS types are their static projection.
 */
export type HistoryContent = z.infer<typeof historyContentSchema>;
export type ComparisonContent = z.infer<typeof comparisonContentSchema>;
export type StoryContent = z.infer<typeof storyContentSchema>;
export type TipContent = z.infer<typeof tipContentSchema>;
export type HighlightContent = z.infer<typeof highlightContentSchema>;

export type ContentJson =
  | ({ type: "history" } & HistoryContent)
  | ({ type: "comparison" } & ComparisonContent)
  | ({ type: "story" } & StoryContent)
  | ({ type: "tip" } & TipContent)
  | ({ type: "highlight" } & HighlightContent);
