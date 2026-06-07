-- Migration: Add is_featured column to blog_posts
-- Run this in your Supabase SQL editor (Dashboard -> SQL Editor -> New query)

ALTER TABLE blog_posts
  ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- Create an index to speed up featured post queries
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(is_featured) WHERE is_featured = true;

-- Mark the June 2026 blog as the featured post
UPDATE blog_posts
  SET is_featured = true
  WHERE slug = 'best-car-lease-deals-june-2026';

-- Make sure no other post is marked featured
UPDATE blog_posts
  SET is_featured = false
  WHERE slug != 'best-car-lease-deals-june-2026';
