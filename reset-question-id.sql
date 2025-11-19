-- Reset questions table ID sequence back to 1
-- This will also delete all existing questions and related answers due to CASCADE

-- Option 1: Truncate table (recommended - resets sequence and clears data)
-- This will delete all questions and their related answers
TRUNCATE TABLE questions CASCADE;

-- Reset the sequence to start from 1
ALTER SEQUENCE questions_id_seq RESTART WITH 1;

-- Option 2: If you want to keep existing data but just reset the sequence
-- (Uncomment the lines below and comment out the TRUNCATE above)
-- Note: This could cause ID conflicts if you insert new rows
-- SELECT setval('questions_id_seq', 1, false);

