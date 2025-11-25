-- Add points column to answers table
-- Points are awarded based on question number:
-- Questions 1-18: 1 point each
-- Question 19: 3 points
-- Question 20: 5 points

-- Add points column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='answers' AND column_name='points') THEN
    ALTER TABLE answers ADD COLUMN points INTEGER DEFAULT 0;
  END IF;
END $$;

-- Create index for faster point queries
CREATE INDEX IF NOT EXISTS idx_answers_points ON answers(points);
CREATE INDEX IF NOT EXISTS idx_answers_employee_email ON answers(employee_email);

