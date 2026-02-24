-- ═══════════════════════════════════════════════════════════════
-- Saaras Blueprint: Auth + Moderation Migration
-- Run this in Supabase Dashboard → SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- 1. Create blueprint_users table
CREATE TABLE IF NOT EXISTS blueprint_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'consultant',
  allowed_dashboards TEXT[] NOT NULL DEFAULT '{}',
  is_admin BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE blueprint_users ENABLE ROW LEVEL SECURITY;

-- Open RLS policy (internal tool, all users can read/write)
CREATE POLICY "blueprint_users_all" ON blueprint_users
  FOR ALL USING (true) WITH CHECK (true);

-- 2. Seed existing users
INSERT INTO blueprint_users (user_id, name, password, role, allowed_dashboards, is_admin) VALUES
  ('piush', 'Piush Thakker', 'saaras2026', 'PM / Founder', '{}', true),
  ('dhavalbhai', 'Dhavalbhai', 'dhaval2026', 'Developer', '{}', false),
  ('manishbhai', 'Manishbhai', 'manish2026', 'Consultant', '{}', false),
  ('farheen', 'Farheen', 'farheen2026', 'Consultant', '{}', false),
  ('kunjal', 'Kunjal', 'kunjal2026', 'Consultant', '{}', false)
ON CONFLICT (user_id) DO NOTHING;

-- 3. Add moderation columns to feedback table
ALTER TABLE feedback
  ADD COLUMN IF NOT EXISTS moderation_status TEXT NOT NULL DEFAULT 'approved',
  ADD COLUMN IF NOT EXISTS admin_notes TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS moderated_by TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS moderated_at TIMESTAMPTZ DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS original_remark TEXT DEFAULT NULL;
