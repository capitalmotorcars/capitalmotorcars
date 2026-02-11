-- =====================================================
-- STORAGE BUCKET CONFIGURATION (Vehicle Images)
-- =====================================================

-- 1. Create the bucket (if it doesn't exist)
INSERT INTO storage.buckets (id, name, public)
VALUES ('vehicle-images', 'vehicle-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Enable RLS (Row Level Security) on objects if not already enabled
-- (storage.objects usually has RLS enabled by default)

-- 3. Create Policies

-- Policy: Public can view vehicle images
-- Allows anyone to view images in this bucket
DROP POLICY IF EXISTS "Public can view vehicle images" ON storage.objects;
CREATE POLICY "Public can view vehicle images"
  ON storage.objects FOR SELECT
  USING ( bucket_id = 'vehicle-images' );

-- Policy: Authenticated users can upload vehicle images
-- Only logged-in users (admins) can upload
DROP POLICY IF EXISTS "Authenticated users can upload vehicle images" ON storage.objects;
CREATE POLICY "Authenticated users can upload vehicle images"
  ON storage.objects FOR INSERT
  WITH CHECK ( bucket_id = 'vehicle-images' AND auth.role() = 'authenticated' );

-- Policy: Authenticated users can update/replace vehicle images
DROP POLICY IF EXISTS "Authenticated users can update vehicle images" ON storage.objects;
CREATE POLICY "Authenticated users can update vehicle images"
  ON storage.objects FOR UPDATE
  USING ( bucket_id = 'vehicle-images' AND auth.role() = 'authenticated' );

-- Policy: Authenticated users can delete vehicle images
DROP POLICY IF EXISTS "Authenticated users can delete vehicle images" ON storage.objects;
CREATE POLICY "Authenticated users can delete vehicle images"
  ON storage.objects FOR DELETE
  USING ( bucket_id = 'vehicle-images' AND auth.role() = 'authenticated' );
