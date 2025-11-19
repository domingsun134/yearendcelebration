-- Add DELETE policy for answers table
-- Run this in Supabase SQL Editor to allow deleting answers

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Anyone can delete answers" ON answers;

-- Allow anyone to delete answers (for admin functionality)
CREATE POLICY "Anyone can delete answers" ON answers
  FOR DELETE USING (true);

