-- 00002_seed_data.sql
-- Hoi An Heritage Hub: seed data for locations, categories, and tags

-- ============================================================================
-- LOCATIONS
-- ============================================================================

INSERT INTO locations (id, name, slug, region, country, description, published) VALUES
('hoi-an', 'Hoi An', 'hoi-an', 'Quang Nam Province', 'Vietnam',
 'A living museum where ancient yellow walls house modern dreams, and the Thu Bon River carries stories across centuries.',
 true);

-- ============================================================================
-- CATEGORIES
-- ============================================================================

INSERT INTO categories (id, name, slug, icon, color_theme, description, sort_order) VALUES
('historic-places', 'Historic Places', 'historic-places', 'landmark', 'heritage',
 'Temples, bridges, assembly halls, and ancient houses that whisper stories across centuries', 1),
('beverage', 'Beverage', 'beverage', 'coffee', 'food',
 'From traditional Vietnamese coffee to craft cocktails in lantern-lit courtyards', 2),
('nature-escape', 'Nature Escape', 'nature-escape', 'leaf', 'nature',
 'River banks, beaches, rice paddies, and tropical gardens', 3),
('activities', 'Activities & Experiences', 'activities', 'compass', 'activity',
 'Lantern making, cooking classes, boat rides, and cycling through the ancient town', 4);

-- ============================================================================
-- TAGS
-- ============================================================================

INSERT INTO tags (id, name, slug, type) VALUES
('unesco', 'UNESCO World Heritage', 'unesco', 'theme'),
('colonial', 'French Colonial', 'colonial', 'era'),
('japanese', 'Japanese Influence', 'japanese', 'theme'),
('chinese', 'Chinese Heritage', 'chinese', 'theme'),
('family-owned', 'Family-Owned', 'family-owned', 'feature');
