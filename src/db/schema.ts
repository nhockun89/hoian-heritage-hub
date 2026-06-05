import {
  pgTable, text, uuid, integer, boolean, decimal, jsonb, timestamp, uniqueIndex, index,
  primaryKey, check,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// === LOOKUP TABLES (text PKs) ===

export const locations = pgTable("locations", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  region: text("region"),
  country: text("country").notNull(),
  description: text("description"),
  hero_image_url: text("hero_image_url"),
  meta_title: text("meta_title"),
  meta_description: text("meta_description"),
  og_image_url: text("og_image_url"),
  published: boolean("published").notNull().default(false),
  created_at: timestamp("created_at", { withTimezone: true }).notNull().default(sql`now()`),
  updated_at: timestamp("updated_at", { withTimezone: true }).notNull().default(sql`now()`),
});

export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  short_name: text("short_name").notNull(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  icon: text("icon").notNull(),
  color_theme: text("color_theme").notNull(),
  description: text("description"),
  sort_order: integer("sort_order").notNull().default(0),
}, (table) => [
  check("categories_color_theme_check", sql`${table.color_theme} IN ('heritage', 'food', 'nature', 'activity')`),
]);

export const tags = pgTable("tags", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  type: text("type").notNull(),
}, (table) => [
  check("tags_type_check", sql`${table.type} IN ('theme', 'era', 'feature')`),
]);

// === JUNCTION: place_tags ===

export const placeTags = pgTable("place_tags", {
  place_id: uuid("place_id").notNull().references(() => places.id, { onDelete: "cascade" }),
  tag_id: text("tag_id").notNull().references(() => tags.id, { onDelete: "cascade" }),
}, (table) => [
  primaryKey({ columns: [table.place_id, table.tag_id] }),
]);

// === CONTENT TABLES (uuid PKs) ===

export const places = pgTable("places", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  location_id: text("location_id").notNull().references(() => locations.id, { onDelete: "cascade" }),
  category_id: text("category_id").notNull().references(() => categories.id, { onDelete: "restrict" }),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  address: text("address"),
  lat: decimal("lat", { precision: 10, scale: 7 }),
  lng: decimal("lng", { precision: 10, scale: 7 }),
  short_description: text("short_description"),
  meta_title: text("meta_title"),
  meta_description: text("meta_description"),
  og_image_url: text("og_image_url"),
  published: boolean("published").notNull().default(false),
  sort_order: integer("sort_order").notNull().default(0),
  created_at: timestamp("created_at", { withTimezone: true }).notNull().default(sql`now()`),
  updated_at: timestamp("updated_at", { withTimezone: true }).notNull().default(sql`now()`),
}, (table) => [
  uniqueIndex("places_location_category_slug_unique").on(table.location_id, table.category_id, table.slug),
  index("places_location_category_published").on(table.location_id, table.category_id, table.published),
]);

export const contributors = pgTable("contributors", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  role: text("role"),
  bio: text("bio"),
  avatar_url: text("avatar_url"),
  created_at: timestamp("created_at", { withTimezone: true }).notNull().default(sql`now()`),
  updated_at: timestamp("updated_at", { withTimezone: true }).notNull().default(sql`now()`),
});

export const placeContents = pgTable("place_contents", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  place_id: uuid("place_id").notNull().references(() => places.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  content_json: jsonb("content_json").notNull(),
  sort_order: integer("sort_order").notNull().default(0),
  created_at: timestamp("created_at", { withTimezone: true }).notNull().default(sql`now()`),
  updated_at: timestamp("updated_at", { withTimezone: true }).notNull().default(sql`now()`),
}, (table) => [
  index("place_contents_place_type").on(table.place_id, table.type),
  check("place_contents_type_check", sql`${table.type} IN ('history', 'comparison', 'story', 'tip', 'highlight')`),
]);

export const placeMedia = pgTable("place_media", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  type: text("type").notNull(),
  era: text("era"),
  era_display: text("era_display"),
  url: text("url").notNull(),
  thumbnail_url: text("thumbnail_url"),
  medium_url: text("medium_url"),
  large_url: text("large_url"),
  alt_text: text("alt_text"),
  caption: text("caption"),
  credit: text("credit"),
  created_at: timestamp("created_at", { withTimezone: true }).notNull().default(sql`now()`),
  updated_at: timestamp("updated_at", { withTimezone: true }).notNull().default(sql`now()`),
}, (table) => [
  check("place_media_type_check", sql`${table.type} IN ('photo-past', 'photo-present', 'video', 'audio', 'document')`),
]);

export const placeMediaAssignments = pgTable("place_media_assignments", {
  place_id: uuid("place_id").notNull().references(() => places.id, { onDelete: "cascade" }),
  media_id: uuid("media_id").notNull().references(() => placeMedia.id, { onDelete: "restrict" }),
  role: text("role").notNull(),
  sort_order: integer("sort_order").notNull().default(0),
}, (table) => [
  primaryKey({ columns: [table.place_id, table.media_id] }),
  index("place_media_assignments_media_id").on(table.media_id),
]);

export const localVoices = pgTable("local_voices", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  place_id: uuid("place_id").notNull().references(() => places.id, { onDelete: "cascade" }),
  contributor_id: uuid("contributor_id").references(() => contributors.id, { onDelete: "set null" }),
  quote: text("quote").notNull(),
  context: text("context"),
  verified: boolean("verified").notNull().default(false),
  published: boolean("published").notNull().default(false),
  sort_order: integer("sort_order").notNull().default(0),
  created_at: timestamp("created_at", { withTimezone: true }).notNull().default(sql`now()`),
}, (table) => [
  index("local_voices_place_verified_published").on(table.place_id, table.verified, table.published),
]);

export const submissions = pgTable("submissions", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  place_id: uuid("place_id").references(() => places.id, { onDelete: "set null" }),
  contributor_name: text("contributor_name").notNull(),
  contributor_contact: text("contributor_contact"),
  type: text("type").notNull(),
  content_json: jsonb("content_json").notNull(),
  status: text("status").notNull().default("pending"),
  created_at: timestamp("created_at", { withTimezone: true }).notNull().default(sql`now()`),
}, (table) => [
  check("submissions_type_check", sql`${table.type} IN ('local_voice', 'correction', 'new_place')`),
  check("submissions_status_check", sql`${table.status} IN ('pending', 'approved', 'rejected')`),
  check("submissions_place_id_check",
    sql`(${table.type} = 'new_place' AND ${table.place_id} IS NULL) OR (${table.type} IN ('local_voice', 'correction') AND ${table.place_id} IS NOT NULL)`
  ),
]);
