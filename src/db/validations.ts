import { z } from "zod";

export const colorThemeEnum = z.enum(["heritage", "food", "nature", "activity"]);
export const COLOR_THEMES = colorThemeEnum.options as unknown as readonly [string, ...string[]];

export const categoryIconEnum = z.enum(["landmark", "utensils", "leaf", "palette", "compass", "store", "bed"]);
export const CATEGORY_ICONS = categoryIconEnum.options as unknown as readonly [string, ...string[]];

export const eraEnumSchema = z.enum(["1800s", "1900s", "colonial", "pre-war", "present"]);
export const ERA_VALUES = eraEnumSchema.options as unknown as readonly [string, ...string[]];

export const placeMediaTypeSchema = z.enum([
  "photo-past", "photo-present", "video", "audio", "document",
]);
export const MEDIA_TYPES = placeMediaTypeSchema.options as unknown as readonly [string, ...string[]];

export const placeContentTypeSchema = z.enum([
  "history", "comparison", "story", "tip", "highlight",
]);
export const PLACE_CONTENT_TYPES = placeContentTypeSchema.options as unknown as readonly [string, ...string[]];

export const mediaAssignmentRoleSchema = z.enum(["hero", "gallery"]);
export const MEDIA_ASSIGNMENT_ROLES = mediaAssignmentRoleSchema.options as unknown as readonly [string, ...string[]];

export const submissionTypeSchema = z.enum(["local_voice", "correction", "new_place"]);
export const submissionStatusSchema = z.enum(["pending", "approved", "rejected"]);

export const historyContentSchema = z.object({
  headline: z.string().min(1),
  body: z.string().min(1),
  era: eraEnumSchema,
});

export const comparisonContentSchema = z.object({
  past_media_id: z.string().uuid(),
  present_media_id: z.string().uuid(),
  caption: z.string().min(1),
  insight: z.string().optional(),
});

export const storyContentSchema = z.object({
  headline: z.string().min(1),
  body: z.string().min(1),
});

export const tipContentSchema = z.object({
  body: z.string().min(1),
});

export const highlightContentSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1),
});

export const contentJsonSchemaByType = {
  history: historyContentSchema,
  comparison: comparisonContentSchema,
  story: storyContentSchema,
  tip: tipContentSchema,
  highlight: highlightContentSchema,
} as const;

export function validateContentJson(type: string, data: unknown): { success: boolean; errors?: z.ZodError } {
  const schema = contentJsonSchemaByType[type as keyof typeof contentJsonSchemaByType];
  if (!schema) {
    return { success: false, errors: new z.ZodError([{ code: "custom", message: `Unknown content type: ${type}`, path: ["type"] }]) };
  }
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true };
  }
  return { success: false, errors: result.error };
}
