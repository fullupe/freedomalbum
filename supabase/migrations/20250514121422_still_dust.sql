/*
  # Create wedding album database schema

  1. New Tables
    - `photos`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `title` (text)
      - `description` (text)
      - `image_url` (text)
      - `category` (text, nullable)
      - `featured` (boolean, default false)
    - `comments`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `photo_id` (uuid, foreign key to photos)
      - `name` (text)
      - `comment` (text)
  
  2. Security
    - Enable RLS on photos and comments
    - Policies for:
      - Public read access for photos
      - Public read/create access for comments
      - Admin access for all operations
*/

-- Create photos table
CREATE TABLE IF NOT EXISTS photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  category text,
  featured boolean DEFAULT false
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  photo_id uuid NOT NULL REFERENCES photos(id) ON DELETE CASCADE,
  name text NOT NULL,
  comment text NOT NULL
);

-- Enable Row Level Security
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Create policies for photos
CREATE POLICY "Anyone can view photos"
  ON photos
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated users can manage photos"
  ON photos
  USING (auth.role() = 'authenticated');

-- Create policies for comments
CREATE POLICY "Anyone can view comments"
  ON comments
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can create comments"
  ON comments
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage comments"
  ON comments
  USING (auth.role() = 'authenticated');

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_comments_photo_id ON comments(photo_id);
CREATE INDEX IF NOT EXISTS idx_photos_featured ON photos(featured) WHERE featured = true;