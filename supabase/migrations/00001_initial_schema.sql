-- 00001_initial_schema.sql
-- Hoi An Heritage Hub: complete initial DDL for all 11 tables
-- Manually written (no drizzle-kit generation — see ADR 0001)

-- ============================================================================
-- LOOKUP TABLES (text PKs)
-- ============================================================================

CREATE TABLE IF NOT EXISTS locations (
  id               TEXT PRIMARY KEY,
  name             TEXT NOT NULL,
  slug             TEXT NOT NULL UNIQUE,
  region           TEXT,
  country          TEXT NOT NULL,
  description      TEXT,
  hero_image_url   TEXT,
  meta_title       TEXT,
  meta_description TEXT,
  og_image_url     TEXT,
  published        BOOLEAN   NOT NULL DEFAULT false,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS categories (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  icon        TEXT,
  color_theme TEXT NOT NULL,
  description TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS tags (
  id   TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL,
  CONSTRAINT tags_type_check CHECK (type IN ('theme', 'era', 'feature'))
);

-- ============================================================================
-- CORE TABLES (uuid PKs)
-- ============================================================================

CREATE TABLE IF NOT EXISTS places (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id       TEXT NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  category_id       TEXT NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  name              TEXT NOT NULL,
  slug              TEXT NOT NULL,
  address           TEXT,
  lat               DECIMAL(10,7),
  lng               DECIMAL(10,7),
  short_description TEXT,
  meta_title        TEXT,
  meta_description  TEXT,
  og_image_url      TEXT,
  published         BOOLEAN   NOT NULL DEFAULT false,
  sort_order        INTEGER   NOT NULL DEFAULT 0,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS places_location_category_slug_unique
  ON places(location_id, category_id, slug);
CREATE INDEX IF NOT EXISTS places_location_category_published
  ON places(location_id, category_id, published);

CREATE TABLE IF NOT EXISTS contributors (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  role       TEXT,
  bio        TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================================
-- CONTENT TABLES
-- ============================================================================

CREATE TABLE IF NOT EXISTS place_contents (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  place_id     UUID  NOT NULL REFERENCES places(id) ON DELETE CASCADE,
  type         TEXT  NOT NULL,
  content_json JSONB NOT NULL,
  sort_order   INTEGER     NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT place_contents_type_check
    CHECK (type IN ('history', 'comparison', 'story', 'tip', 'highlight'))
);
CREATE INDEX IF NOT EXISTS place_contents_place_type
  ON place_contents(place_id, type);
CREATE INDEX IF NOT EXISTS idx_comparison_media_ids
  ON place_contents((content_json->>'past_media_id'), (content_json->>'present_media_id'))
  WHERE type = 'comparison';

CREATE TABLE IF NOT EXISTS place_media (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type          TEXT NOT NULL,
  era           TEXT,
  era_display   TEXT,
  url           TEXT NOT NULL,
  thumbnail_url TEXT,
  medium_url    TEXT,
  large_url     TEXT,
  alt_text      TEXT,
  caption       TEXT,
  credit        TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT place_media_type_check
    CHECK (type IN ('photo-past', 'photo-present', 'video', 'audio', 'document'))
);

-- ============================================================================
-- JUNCTION / ASSIGNMENT TABLES (composite PKs, no surrogate id)
-- ============================================================================

CREATE TABLE IF NOT EXISTS place_media_assignments (
  place_id   UUID    NOT NULL REFERENCES places(id) ON DELETE CASCADE,
  media_id   UUID    NOT NULL REFERENCES place_media(id) ON DELETE RESTRICT,
  role       TEXT    NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (place_id, media_id)
);
CREATE INDEX IF NOT EXISTS place_media_assignments_media_id
  ON place_media_assignments(media_id);

CREATE TABLE IF NOT EXISTS place_tags (
  place_id UUID NOT NULL REFERENCES places(id) ON DELETE CASCADE,
  tag_id   TEXT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (place_id, tag_id)
);

-- ============================================================================
-- COMMUNITY TABLES
-- ============================================================================

CREATE TABLE IF NOT EXISTS local_voices (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  place_id       UUID  NOT NULL REFERENCES places(id) ON DELETE CASCADE,
  contributor_id UUID  REFERENCES contributors(id) ON DELETE SET NULL,
  quote          TEXT  NOT NULL,
  context        TEXT,
  verified       BOOLEAN     NOT NULL DEFAULT false,
  published      BOOLEAN     NOT NULL DEFAULT false,
  sort_order     INTEGER     NOT NULL DEFAULT 0,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS local_voices_place_verified_published
  ON local_voices(place_id, verified, published);

CREATE TABLE IF NOT EXISTS submissions (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  place_id          UUID  REFERENCES places(id) ON DELETE SET NULL,
  contributor_name  TEXT  NOT NULL,
  contributor_contact TEXT,
  type              TEXT  NOT NULL,
  content_json      JSONB NOT NULL,
  status            TEXT  NOT NULL DEFAULT 'pending',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT submissions_type_check
    CHECK (type IN ('local_voice', 'correction', 'new_place')),
  CONSTRAINT submissions_status_check
    CHECK (status IN ('pending', 'approved', 'rejected')),
  CONSTRAINT submissions_place_id_check CHECK (
    (type = 'new_place' AND place_id IS NULL)
    OR (type IN ('local_voice', 'correction') AND place_id IS NOT NULL)
  )
);
