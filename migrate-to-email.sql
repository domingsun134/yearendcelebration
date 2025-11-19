-- Migration script to change employee_name to employee_email
-- Run this in Supabase SQL Editor if you already have data with employee_name

-- Rename the column from employee_name to employee_email
ALTER TABLE answers RENAME COLUMN employee_name TO employee_email;

