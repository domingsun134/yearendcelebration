-- Enable real-time replication for the answers table
-- This allows real-time subscriptions to work
-- Run this in Supabase SQL Editor

-- Enable replication for answers table (required for real-time subscriptions)
-- Note: This may fail if the table is already in the publication, which is fine
DO $$ 
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE answers;
EXCEPTION
  WHEN duplicate_object THEN
    -- Table is already in the publication, which is fine
    NULL;
END $$;

-- Check the current replication status (optional):
-- SELECT * FROM pg_publication_tables WHERE pubname = 'supabase_realtime';

