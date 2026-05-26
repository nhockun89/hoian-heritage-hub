-- 00003_triggers_and_guards.sql
-- Hoi An Heritage Hub: triggers for updated_at and media deletion guard

-- ============================================================================
-- Auto-update updated_at timestamp
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at ON locations;
CREATE TRIGGER set_updated_at BEFORE UPDATE ON locations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS set_updated_at ON places;
CREATE TRIGGER set_updated_at BEFORE UPDATE ON places
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS set_updated_at ON contributors;
CREATE TRIGGER set_updated_at BEFORE UPDATE ON contributors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS set_updated_at ON place_contents;
CREATE TRIGGER set_updated_at BEFORE UPDATE ON place_contents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS set_updated_at ON place_media;
CREATE TRIGGER set_updated_at BEFORE UPDATE ON place_media
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- Prevent deletion of media referenced in comparison content blocks
-- ============================================================================

CREATE OR REPLACE FUNCTION guard_media_deletion()
RETURNS TRIGGER AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM place_contents
    WHERE type = 'comparison'
    AND (content_json->>'past_media_id' = OLD.id::text
      OR content_json->>'present_media_id' = OLD.id::text)
  ) THEN
    RAISE EXCEPTION 'Cannot delete media %: referenced in comparison content blocks', OLD.id;
  END IF;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS prevent_media_delete ON place_media;
CREATE TRIGGER prevent_media_delete BEFORE DELETE ON place_media
  FOR EACH ROW EXECUTE FUNCTION guard_media_deletion();
