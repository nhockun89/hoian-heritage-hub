import { ERA_VALUES, PLACE_CONTENT_TYPES, MEDIA_TYPES } from "@/db/validations";

export { ERA_VALUES, PLACE_CONTENT_TYPES, MEDIA_TYPES };

export type EraValue = (typeof ERA_VALUES)[number];
export type PlaceContentType = (typeof PLACE_CONTENT_TYPES)[number];
export type MediaType = (typeof MEDIA_TYPES)[number];

export const MEDIA_ASSIGNMENT_ROLES = ["hero", "gallery"] as const;
export type MediaAssignmentRole = (typeof MEDIA_ASSIGNMENT_ROLES)[number];

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function eraDisplayName(era: EraValue): string {
  const labels: Record<EraValue, string> = {
    "1800s": "19th Century",
    "1900s": "20th Century",
    "colonial": "French Colonial Period (1887–1954)",
    "pre-war": "Pre-War Period",
    "present": "Present Day",
  };
  return labels[era];
}
