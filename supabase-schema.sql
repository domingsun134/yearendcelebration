-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer TEXT NOT NULL CHECK (correct_answer IN ('A', 'B', 'C', 'D')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Migrate existing questions table if it doesn't have the new columns
-- (Only runs if columns don't exist - safe to run multiple times)
DO $$ 
BEGIN
  -- Add option_a if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='questions' AND column_name='option_a') THEN
    ALTER TABLE questions ADD COLUMN option_a TEXT;
  END IF;
  
  -- Add option_b if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='questions' AND column_name='option_b') THEN
    ALTER TABLE questions ADD COLUMN option_b TEXT;
  END IF;
  
  -- Add option_c if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='questions' AND column_name='option_c') THEN
    ALTER TABLE questions ADD COLUMN option_c TEXT;
  END IF;
  
  -- Add option_d if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='questions' AND column_name='option_d') THEN
    ALTER TABLE questions ADD COLUMN option_d TEXT;
  END IF;
  
  -- Add correct_answer if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='questions' AND column_name='correct_answer') THEN
    ALTER TABLE questions ADD COLUMN correct_answer TEXT CHECK (correct_answer IN ('A', 'B', 'C', 'D'));
  END IF;
END $$;

-- Create answers table
CREATE TABLE IF NOT EXISTS answers (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  employee_email TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Migrate existing answers table if it has the old column name
DO $$ 
BEGIN
  -- Rename employee_name to employee_email if it exists
  IF EXISTS (SELECT 1 FROM information_schema.columns 
             WHERE table_name='answers' AND column_name='employee_name') THEN
    ALTER TABLE answers RENAME COLUMN employee_name TO employee_email;
  END IF;
END $$;

-- Enable Row Level Security
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid errors on re-run)
DROP POLICY IF EXISTS "Anyone can read questions" ON questions;
DROP POLICY IF EXISTS "Anyone can insert questions" ON questions;
DROP POLICY IF EXISTS "Anyone can insert answers" ON answers;
DROP POLICY IF EXISTS "Anyone can read answers" ON answers;
DROP POLICY IF EXISTS "Anyone can delete answers" ON answers;

-- Allow anyone to read questions
CREATE POLICY "Anyone can read questions" ON questions
  FOR SELECT USING (true);

-- Allow anyone to insert questions (for seeding)
CREATE POLICY "Anyone can insert questions" ON questions
  FOR INSERT WITH CHECK (true);

-- Allow anyone to insert answers
CREATE POLICY "Anyone can insert answers" ON answers
  FOR INSERT WITH CHECK (true);

-- Allow anyone to read answers (for admin dashboard)
CREATE POLICY "Anyone can read answers" ON answers
  FOR SELECT USING (true);

-- Allow anyone to delete answers (for admin functionality)
CREATE POLICY "Anyone can delete answers" ON answers
  FOR DELETE USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_answers_question_id ON answers(question_id);
CREATE INDEX IF NOT EXISTS idx_answers_created_at ON answers(created_at);

-- Prevent duplicate submissions: one email can only answer each question once
CREATE UNIQUE INDEX IF NOT EXISTS idx_answers_unique_question_email 
ON answers(question_id, employee_email);

-- Enable real-time replication for answers table (required for real-time subscriptions)
-- This allows the question page to update in real-time when someone submits a correct answer
-- Note: This may fail if the table is already in the publication, which is fine
DO $$ 
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE answers;
EXCEPTION
  WHEN duplicate_object THEN
    -- Table is already in the publication, which is fine
    NULL;
END $$;

