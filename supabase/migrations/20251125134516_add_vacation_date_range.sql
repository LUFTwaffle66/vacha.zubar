/*
  # Update vacation status table for date range

  1. Changes
    - Rename `return_date` column to `end_date` for clarity
    - Add `start_date` column to track when vacation begins
    - Both dates are nullable to support flexible scheduling

  2. Notes
    - Existing data is preserved
    - `start_date` will be NULL for existing records until updated
*/

-- Add start_date column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vacation_status' AND column_name = 'start_date'
  ) THEN
    ALTER TABLE vacation_status ADD COLUMN start_date date;
  END IF;
END $$;

-- Rename return_date to end_date for clarity
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vacation_status' AND column_name = 'return_date'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vacation_status' AND column_name = 'end_date'
  ) THEN
    ALTER TABLE vacation_status RENAME COLUMN return_date TO end_date;
  END IF;
END $$;