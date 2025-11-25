-- Reset table ID sequences back to 1
-- This script provides options for resetting both questions and answers tables

-- ============================================
-- OPTION 1: Reset with data deletion (RECOMMENDED)
-- ============================================
-- This will delete all data and reset sequences to start from 1
-- Use this when you want a clean slate

-- Reset questions table (this will CASCADE delete related answers)
TRUNCATE TABLE questions CASCADE;
ALTER SEQUENCE questions_id_seq RESTART WITH 1;

-- Reset answers table sequence (if you want to reset it separately)
-- Note: This is usually not needed if you use CASCADE above
-- TRUNCATE TABLE answers CASCADE;
-- ALTER SEQUENCE answers_id_seq RESTART WITH 1;

-- ============================================
-- OPTION 2: Reset sequence WITHOUT deleting data
-- ============================================
-- WARNING: This can cause ID conflicts if you insert new rows!
-- Only use this if you understand the implications
-- 
-- To use Option 2, comment out Option 1 above and uncomment below:
--
-- SELECT setval('questions_id_seq', 1, false);
-- SELECT setval('answers_id_seq', 1, false);
--
-- Note: The 'false' parameter means the next value will be 1
-- If you use 'true', the next value will be 2

-- ============================================
-- OPTION 3: Reset to a specific number
-- ============================================
-- If you want to reset to a specific number (e.g., 100) instead of 1:
--
-- ALTER SEQUENCE questions_id_seq RESTART WITH 100;
-- ALTER SEQUENCE answers_id_seq RESTART WITH 100;

