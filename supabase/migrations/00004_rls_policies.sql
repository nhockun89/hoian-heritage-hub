-- 00004_rls_policies.sql
-- Hoi An Heritage Hub: RLS policies for public read and service role full access

ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE place_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE places ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributors ENABLE ROW LEVEL SECURITY;
ALTER TABLE place_contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE place_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE place_media_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE local_voices ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Public read access on published content
CREATE POLICY "Public can read published locations" ON locations
  FOR SELECT USING (published = true);

CREATE POLICY "Public can read categories" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Public can read tags" ON tags
  FOR SELECT USING (true);

CREATE POLICY "Public can read place_tags" ON place_tags
  FOR SELECT USING (true);

CREATE POLICY "Public can read published places" ON places
  FOR SELECT USING (published = true);

CREATE POLICY "Public can read published place_contents" ON place_contents
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM places WHERE places.id = place_contents.place_id AND places.published = true)
  );

CREATE POLICY "Public can read place_media" ON place_media
  FOR SELECT USING (true);

CREATE POLICY "Public can read place_media_assignments" ON place_media_assignments
  FOR SELECT USING (true);

CREATE POLICY "Public can read published local_voices" ON local_voices
  FOR SELECT USING (published = true AND verified = true);

CREATE POLICY "Public can read contributors" ON contributors
  FOR SELECT USING (true);

-- Admin full access (via service_role key)
CREATE POLICY "Service role has full access to locations" ON locations
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role has full access to categories" ON categories
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role has full access to tags" ON tags
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role has full access to place_tags" ON place_tags
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role has full access to places" ON places
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role has full access to contributors" ON contributors
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role has full access to place_contents" ON place_contents
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role has full access to place_media" ON place_media
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role has full access to place_media_assignments" ON place_media_assignments
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role has full access to local_voices" ON local_voices
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role has full access to submissions" ON submissions
  FOR ALL USING (true) WITH CHECK (true);
