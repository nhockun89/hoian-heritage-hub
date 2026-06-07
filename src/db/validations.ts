/**
 * Zod validators derived from the canonical vocabulary in
 * `src/domain/vocabulary.ts`. The constants are the single source
 * of truth; the Zod enums below are derived from them.
 *
 * The content_json Zod schemas are not enums — they describe the
 * shape of `place_contents.content_json` for each `type`, and live
 * here because they're the runtime-validated counterpart of the
 * `ContentJson` discriminated union in `src/db/types.ts`.
 *
 * If you need to *read* a value of one of these enums from the
 * browser, import the constant or type from `src/domain/vocabulary`
 * directly. This module is server-side (Zod, runtime validation)
 * and excluded from the frontend bundle.
 */

import { z } from "zod";
import {
  COLOR_THEMES,
  ERA_VALUES,
  MEDIA_TYPES,
  MEDIA_ASSIGNMENT_ROLES,
  PLACE_CONTENT_TYPES,
  SUBMISSION_STATUSES,
  SUBMISSION_TYPES,
} from "../domain/vocabulary";

export const colorThemeEnum = z.enum(
  COLOR_THEMES as unknown as [string, ...string[]],
);
export const eraEnumSchema = z.enum(
  ERA_VALUES as unknown as [string, ...string[]],
);
export const placeContentTypeSchema = z.enum(
  PLACE_CONTENT_TYPES as unknown as [string, ...string[]],
);
export const placeMediaTypeSchema = z.enum(
  MEDIA_TYPES as unknown as [string, ...string[]],
);
export const mediaAssignmentRoleSchema = z.enum(
  MEDIA_ASSIGNMENT_ROLES as unknown as [string, ...string[]],
);
export const submissionTypeSchema = z.enum(
  SUBMISSION_TYPES as unknown as [string, ...string[]],
);
export const submissionStatusSchema = z.enum(
  SUBMISSION_STATUSES as unknown as [string, ...string[]],
);

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

export function validateContentJson(
  type: string,
  data: unknown,
): { success: boolean; errors?: z.ZodError } {
  const schema =
    contentJsonSchemaByType[type as keyof typeof contentJsonSchemaByType];
  if (!schema) {
    return {
      success: false,
      errors: new z.ZodError([
        {
          code: "custom",
          message: `Unknown content type: ${type}`,
          path: ["type"],
        },
      ]),
    };
  }
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true };
  }
  return { success: false, errors: result.error };
}
