-- 00005_category_taxonomy_update.sql
-- Hoi An Heritage Hub: add short_name column, CHECK constraints, and replace 4 categories with 7

-- ============================================================================
-- 1. Add short_name column to categories
-- ============================================================================

ALTER TABLE categories ADD COLUMN short_name text;
UPDATE categories SET short_name = name;
ALTER TABLE categories ALTER COLUMN short_name SET NOT NULL;

-- ============================================================================
-- 2. Add CHECK constraints
-- ============================================================================

ALTER TABLE categories ADD CONSTRAINT categories_color_theme_check
  CHECK (color_theme IN ('heritage', 'food', 'nature', 'activity'));

ALTER TABLE categories ALTER COLUMN icon SET NOT NULL;

-- ============================================================================
-- 3. Replace 4 old categories with 7 new categories
-- ============================================================================

-- Remap any existing places to new category IDs (safe if no places exist)
UPDATE places SET category_id = 'heritage-sites' WHERE category_id = 'historic-places';
UPDATE places SET category_id = 'food-and-drink' WHERE category_id = 'beverage';
UPDATE places SET category_id = 'nature-and-outdoors' WHERE category_id = 'nature-escape';
UPDATE places SET category_id = 'activities-and-experiences' WHERE category_id = 'activities';

-- Delete old categories (safe after remapping)
DELETE FROM categories;

-- Insert new 7 categories
INSERT INTO categories (id, short_name, name, slug, icon, color_theme, description, sort_order) VALUES
  ('heritage-sites', 'Heritage', 'Heritage Sites', 'heritage-sites', 'landmark', 'heritage',
   'Temples, ancient houses, assembly halls, and the iconic Japanese Covered Bridge — the living UNESCO story of Hoi An', 1),
  ('food-and-drink', 'Food', 'Food & Drink', 'food-and-drink', 'utensils', 'food',
   'From street-side cao lau to lantern-lit courtyard cocktails — every flavor that makes Hoi An a culinary destination', 2),
  ('nature-and-outdoors', 'Nature', 'Nature & Outdoors', 'nature-and-outdoors', 'leaf', 'nature',
   'Thu Bon River, An Bang Beach, rice paddies, and tropical gardens — where the town breathes', 3),
  ('arts-and-crafts', 'Crafts', 'Arts & Crafts', 'arts-and-crafts', 'palette', 'heritage',
   'Lantern workshops, bespoke tailoring, pottery, and traditional crafts — the artisan soul of Hoi An', 4),
  ('activities-and-experiences', 'Activities', 'Activities & Experiences', 'activities-and-experiences', 'compass', 'activity',
   'Boat rides, cooking classes, cycling tours, and hands-on workshops — things you do, not just see', 5),
  ('local-life-and-markets', 'Local Life', 'Local Life & Markets', 'local-life-and-markets', 'store', 'food',
   'Morning markets, neighborhood alleys, and daily rhythms — Hoi An as its people actually live it', 6),
  ('stays-and-accommodation', 'Stays', 'Stays & Accommodation', 'stays-and-accommodation', 'bed', 'nature',
   'Heritage homestays in ancient houses, boutique riverside hotels, and eco-lodges — sleep inside the story', 7);