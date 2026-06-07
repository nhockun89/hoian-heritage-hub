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

-- ============================================================================
-- TAGS
-- ============================================================================

INSERT INTO tags (id, name, slug, type) VALUES
('unesco', 'UNESCO World Heritage', 'unesco', 'theme'),
('colonial', 'French Colonial', 'colonial', 'era'),
('japanese', 'Japanese Influence', 'japanese', 'theme'),
('chinese', 'Chinese Heritage', 'chinese', 'theme'),
('family-owned', 'Family-Owned', 'family-owned', 'feature');
