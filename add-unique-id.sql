-- Add unique_id column to questions table
-- This migration adds a UUID column for unique question identifiers

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Add unique_id column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='questions' AND column_name='unique_id') THEN
    ALTER TABLE questions ADD COLUMN unique_id UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL;
    
    -- Generate UUIDs for existing questions that don't have one
    UPDATE questions SET unique_id = uuid_generate_v4() WHERE unique_id IS NULL;
  END IF;
END $$;

-- Create index on unique_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_questions_unique_id ON questions(unique_id);


