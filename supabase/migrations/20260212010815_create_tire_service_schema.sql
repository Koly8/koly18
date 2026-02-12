/*
  # Mobile Tire Service Schema

  1. New Tables
    - `service_requests`
      - `id` (uuid, primary key)
      - `name` (text) - Customer name
      - `phone` (text) - Customer phone number
      - `address` (text) - Service address
      - `service_type` (text) - Type of tire service requested
      - `latitude` (numeric) - GPS latitude
      - `longitude` (numeric) - GPS longitude
      - `accuracy` (numeric) - Location accuracy in meters
      - `status` (text) - Request status (pending, confirmed, completed, cancelled)
      - `notes` (text) - Additional notes
      - `created_at` (timestamptz) - Request creation time
      - `updated_at` (timestamptz) - Last update time

    - `location_points`
      - `id` (uuid, primary key)
      - `latitude` (numeric) - GPS latitude
      - `longitude` (numeric) - GPS longitude
      - `accuracy` (numeric) - Location accuracy in meters
      - `provider` (text) - Location provider (gps, network)
      - `speed` (numeric) - Speed in m/s
      - `heading` (numeric) - Heading in degrees
      - `created_at` (timestamptz) - Point creation time

  2. Security
    - Enable RLS on all tables
    - Add policies for public access (service is public-facing)
    - Add policies for admin management
*/

CREATE TABLE IF NOT EXISTS service_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  service_type text NOT NULL,
  latitude numeric,
  longitude numeric,
  accuracy numeric DEFAULT 0,
  status text DEFAULT 'pending',
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS location_points (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  latitude numeric NOT NULL,
  longitude numeric NOT NULL,
  accuracy numeric DEFAULT 0,
  provider text DEFAULT 'gps',
  speed numeric DEFAULT 0,
  heading numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE location_points ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to create service requests"
  ON service_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public to view their service requests"
  ON service_requests
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public to create location points"
  ON location_points
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public to view location points"
  ON location_points
  FOR SELECT
  TO anon
  USING (true);

CREATE INDEX IF NOT EXISTS idx_service_requests_created_at ON service_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_service_requests_status ON service_requests(status);
CREATE INDEX IF NOT EXISTS idx_location_points_created_at ON location_points(created_at DESC);