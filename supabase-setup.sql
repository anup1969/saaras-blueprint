-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)

-- Feedback table for blueprint review system
CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page TEXT NOT NULL,
  element_label TEXT NOT NULL DEFAULT '',
  element_selector TEXT NOT NULL DEFAULT '',
  feedback_type TEXT NOT NULL DEFAULT 'comment',
  remark TEXT NOT NULL,
  submitted_by TEXT NOT NULL DEFAULT 'Anonymous',
  priority TEXT NOT NULL DEFAULT 'medium',
  status TEXT NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  resolved_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_feedback_page ON feedback(page);
CREATE INDEX idx_feedback_status ON feedback(status);
CREATE INDEX idx_feedback_submitted_by ON feedback(submitted_by);

-- Enable RLS but allow public access (blueprint is internal team only)
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read, insert, and update feedback
CREATE POLICY "Allow public read" ON feedback FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON feedback FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON feedback FOR UPDATE USING (true);
