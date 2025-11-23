/*
  # Create vacation status table

  1. New Tables
    - `vacation_status`
      - `id` (uuid, primary key)
      - `is_on_vacation` (boolean, default false)
      - `return_date` (date, nullable)
      - `message` (text, nullable)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `vacation_status` table
    - Add policy for public read access
    - Add policy for authenticated users to update
*/

CREATE TABLE IF NOT EXISTS vacation_status (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  is_on_vacation boolean DEFAULT false,
  return_date date,
  message text,
  updated_at timestamptz DEFAULT now()
);

-- Insert initial record
INSERT INTO vacation_status (is_on_vacation, return_date, message) 
VALUES (false, null, null);

ALTER TABLE vacation_status ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read vacation status
CREATE POLICY "Anyone can read vacation status"
  ON vacation_status
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to update vacation status
CREATE POLICY "Authenticated users can update vacation status"
  ON vacation_status
  FOR UPDATE
  TO authenticated
  USING (true);