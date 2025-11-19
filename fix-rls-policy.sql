-- Quick fix: Add missing INSERT policy for questions table
-- Run this in Supabase SQL Editor if you're getting RLS policy errors

DROP POLICY IF EXISTS "Anyone can insert questions" ON questions;

CREATE POLICY "Anyone can insert questions" ON questions
  FOR INSERT WITH CHECK (true);

