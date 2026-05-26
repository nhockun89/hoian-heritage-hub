import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import {
  locations, categories, tags, placeTags, places, contributors,
  placeContents, placeMedia, placeMediaAssignments, localVoices, submissions,
} from "./schema";

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

// Content JSON discriminated union types
export type HistoryContent = {
  headline: string;
  body: string;
  era: "1800s" | "1900s" | "colonial" | "pre-war" | "present";
};

export type ComparisonContent = {
  past_media_id: string;
  present_media_id: string;
  caption: string;
  insight?: string;
};

export type StoryContent = {
  headline: string;
  body: string;
};

export type TipContent = {
  body: string;
};

export type HighlightContent = {
  title: string;
  description: string;
  icon: string;
};

export type ContentJson =
  | ({ type: "history" } & HistoryContent)
  | ({ type: "comparison" } & ComparisonContent)
  | ({ type: "story" } & StoryContent)
  | ({ type: "tip" } & TipContent)
  | ({ type: "highlight" } & HighlightContent);
