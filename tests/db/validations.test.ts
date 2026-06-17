import { describe, it, expect } from "vitest";
import {
  historyContentSchema,
  comparisonContentSchema,
  storyContentSchema,
  tipContentSchema,
  highlightContentSchema,
  eraEnumSchema,
  placeMediaTypeSchema,
  placeContentTypeSchema,
  submissionTypeSchema,
  submissionStatusSchema,
} from "@/db/validations";

const validHistory = {
  headline: "A Bridge Between Cultures",
  body: "Built in the early 17th century...",
  era: "colonial" as const,
};

const validComparison = {
  past_media_id: "550e8400-e29b-41d4-a716-446655440000",
  present_media_id: "550e8400-e29b-41d4-a716-446655440001",
  caption: "Then and now",
  insight: "The structure remains",
};

describe("Content JSON schemas", () => {
  it("validates history content", () => {
    expect(historyContentSchema.safeParse(validHistory).success).toBe(true);
    expect(historyContentSchema.safeParse({ headline: "X" }).success).toBe(false);
  });

  it("validates comparison content with valid UUIDs", () => {
    expect(comparisonContentSchema.safeParse(validComparison).success).toBe(true);
    expect(comparisonContentSchema.safeParse({ past_media_id: "not-uuid" }).success).toBe(false);
  });

  it("validates comparison insight is optional", () => {
    const withoutInsight = { past_media_id: "550e8400-e29b-41d4-a716-446655440000", present_media_id: "550e8400-e29b-41d4-a716-446655440001", caption: "Caption" };
    expect(comparisonContentSchema.safeParse(withoutInsight).success).toBe(true);
  });

  it("validates story content", () => {
    expect(storyContentSchema.safeParse({ headline: "Title", body: "Body" }).success).toBe(true);
    expect(storyContentSchema.safeParse({ body: "Body" }).success).toBe(false);
  });

  it("validates tip content", () => {
    expect(tipContentSchema.safeParse({ body: "Visit at sunrise" }).success).toBe(true);
    expect(tipContentSchema.safeParse({}).success).toBe(false);
  });

  it("validates highlight content", () => {
    expect(highlightContentSchema.safeParse({
      title: "Lantern Making",
      description: "Watch artisans",
      icon: "lantern",
    }).success).toBe(true);
  });

  it("rejects invalid era values", () => {
    expect(eraEnumSchema.safeParse("colonial").success).toBe(true);
    expect(eraEnumSchema.safeParse("medieval").success).toBe(false);
  });

  it("validates place media type enum", () => {
    expect(placeMediaTypeSchema.safeParse("photo-past").success).toBe(true);
    expect(placeMediaTypeSchema.safeParse("hologram").success).toBe(false);
  });

  it("validates place content type enum", () => {
    expect(placeContentTypeSchema.safeParse("history").success).toBe(true);
    expect(placeContentTypeSchema.safeParse("recipe").success).toBe(false);
  });

  it("validates submission type", () => {
    expect(submissionTypeSchema.safeParse("local_voice").success).toBe(true);
    expect(submissionTypeSchema.safeParse("correction").success).toBe(true);
    expect(submissionTypeSchema.safeParse("new_place").success).toBe(true);
    expect(submissionTypeSchema.safeParse("spam").success).toBe(false);
  });

  it("validates submission status enum", () => {
    expect(submissionStatusSchema.safeParse("pending").success).toBe(true);
    expect(submissionStatusSchema.safeParse("approved").success).toBe(true);
    expect(submissionStatusSchema.safeParse("in_review").success).toBe(false);
  });
});
