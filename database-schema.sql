-- =====================================================
-- Capital Motor Cars - Lease Deals Database Schema
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLES
-- =====================================================

-- Lease Deals Table
CREATE TABLE lease_deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  make VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year INTEGER NOT NULL,
  trim VARCHAR(100),
  monthly_price DECIMAL(10,2) NOT NULL,
  down_payment DECIMAL(10,2) NOT NULL,
  lease_term INTEGER NOT NULL, -- in months (e.g., 24, 36, 48)
  highlights TEXT, -- key features or notes about the deal
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog Posts Table
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image_url TEXT,
  seo_title VARCHAR(255),
  seo_description TEXT,
  seo_keywords TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin Users Table (Profiles linked to Supabase Auth)
-- Note: Actual authentication is handled by Supabase Auth (auth.users).
-- This table matches additional profile data by email.
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Deal Audit Log Table (tracks all changes)
CREATE TABLE deal_audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  deal_id UUID REFERENCES lease_deals(id) ON DELETE SET NULL,
  action VARCHAR(50) NOT NULL, -- 'created', 'updated', 'deleted', 'reordered'
  admin_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  changes JSONB, -- stores before/after values
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES
-- =====================================================

-- Index for active deals ordered by display_order
CREATE INDEX idx_lease_deals_active_order ON lease_deals(is_active, display_order) WHERE is_active = true;

-- Index for searching by make/model
CREATE INDEX idx_lease_deals_make_model ON lease_deals(make, model);

-- Index for active blog posts ordered by display_order
CREATE INDEX idx_blog_posts_active_order ON blog_posts(is_active, display_order) WHERE is_active = true;

-- Index for blog slug lookup
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);

-- Index for audit log by deal
CREATE INDEX idx_audit_log_deal_id ON deal_audit_log(deal_id);

-- Index for audit log by admin
CREATE INDEX idx_audit_log_admin_id ON deal_audit_log(admin_id);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_lease_deals_updated_at
  BEFORE UPDATE ON lease_deals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger to auto-update updated_at on blog posts
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically log changes to audit table
CREATE OR REPLACE FUNCTION log_deal_changes()
RETURNS TRIGGER AS $$
DECLARE
  admin_uuid UUID;
BEGIN
  -- Attempt to get admin_id from context if set (requires app to set it)
  -- Or just log the event generically
  INSERT INTO deal_audit_log (deal_id, action, changes, created_at)
  VALUES (
    COALESCE(NEW.id, OLD.id),
    TG_OP,
    jsonb_build_object('old', to_jsonb(OLD), 'new', to_jsonb(NEW)),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for audit logging
CREATE TRIGGER audit_lease_deals_changes
  AFTER INSERT OR UPDATE OR DELETE ON lease_deals
  FOR EACH ROW
  EXECUTE FUNCTION log_deal_changes();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE lease_deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE deal_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Helper: only rows in admin_users for the signed-in email may act as staff.
-- Public site uses the anon key; staff dashboard uses authenticated + admin_users row.

-- Public read access to active deals (anon site visitors only)
DROP POLICY IF EXISTS "Public can view active deals" ON lease_deals;
CREATE POLICY "Public can view active deals"
  ON lease_deals FOR SELECT
  TO anon
  USING (is_active = true);

-- Public read access to active blog posts
DROP POLICY IF EXISTS "Public can view active blog posts" ON blog_posts;
CREATE POLICY "Public can view active blog posts"
  ON blog_posts FOR SELECT
  TO anon
  USING (is_active = true AND (published_at IS NULL OR published_at <= NOW()));

-- Staff (authenticated + listed in admin_users) full access to deals
DROP POLICY IF EXISTS "Admins can do everything with deals" ON lease_deals;
DROP POLICY IF EXISTS "Staff manage deals" ON lease_deals;
CREATE POLICY "Staff manage deals"
  ON lease_deals FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users au
      WHERE au.email = (SELECT auth.jwt() ->> 'email')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users au
      WHERE au.email = (SELECT auth.jwt() ->> 'email')
    )
  );

-- Staff full access to blog posts
DROP POLICY IF EXISTS "Admins can do everything with blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Staff manage blog posts" ON blog_posts;
CREATE POLICY "Staff manage blog posts"
  ON blog_posts FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users au
      WHERE au.email = (SELECT auth.jwt() ->> 'email')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users au
      WHERE au.email = (SELECT auth.jwt() ->> 'email')
    )
  );

-- Staff can read admin directory (for profile / future features)
DROP POLICY IF EXISTS "Admins can view admin users" ON admin_users;
DROP POLICY IF EXISTS "Staff can read admin directory" ON admin_users;
CREATE POLICY "Staff can read admin directory"
  ON admin_users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users au
      WHERE au.email = (SELECT auth.jwt() ->> 'email')
    )
  );

-- No INSERT/UPDATE/DELETE on admin_users for authenticated clients (bootstrap via SQL/service role)

-- Staff full access to deal audit log
DROP POLICY IF EXISTS "Admins can do everything with audit logs" ON deal_audit_log;
DROP POLICY IF EXISTS "Staff manage deal audit log" ON deal_audit_log;
CREATE POLICY "Staff manage deal audit log"
  ON deal_audit_log FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users au
      WHERE au.email = (SELECT auth.jwt() ->> 'email')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users au
      WHERE au.email = (SELECT auth.jwt() ->> 'email')
    )
  );

-- =====================================================
-- STORAGE BUCKET (for deal images)
-- =====================================================

-- Run this in Supabase Dashboard > Storage
-- 1. Create a bucket named 'deal-images'
-- 2. Set it to public
-- 3. Add the following policies:

-- Policy for public read access:
-- CREATE POLICY "Public can view deal images"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'deal-images');

-- Policy for authenticated upload:
-- CREATE POLICY "Authenticated users can upload deal images"
--   ON storage.objects FOR INSERT
--   WITH CHECK (bucket_id = 'deal-images' AND auth.role() = 'authenticated');

-- Policy for authenticated delete:
-- CREATE POLICY "Authenticated users can delete deal images"
--   ON storage.objects FOR DELETE
--   USING (bucket_id = 'deal-images' AND auth.role() = 'authenticated');

-- =====================================================
-- STORAGE BUCKET (for blog images)
-- =====================================================

-- Run this in Supabase Dashboard > Storage
-- 1. Create a bucket named 'blog-images'
-- 2. Set it to public
-- 3. Add the following policies:

-- Policy for public read access:
-- CREATE POLICY "Public can view blog images"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'blog-images');

-- Policy for authenticated upload:
-- CREATE POLICY "Authenticated users can upload blog images"
--   ON storage.objects FOR INSERT
--   WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

-- Policy for authenticated delete:
-- CREATE POLICY "Authenticated users can delete blog images"
--   ON storage.objects FOR DELETE
--   USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

-- =====================================================
-- SAMPLE DATA (optional - for testing)
-- =====================================================

-- IMPORTANT: You must ALSO create this user in Supabase Auth (Authentication > Users)
-- using the same email address. The password_hash here was removed as Supabase Auth handles passwords.
INSERT INTO admin_users (email, name) VALUES
  ('admin@capitalmotorcars.com', 'Admin User');

-- Insert sample lease deals
INSERT INTO lease_deals (make, model, year, trim, monthly_price, down_payment, lease_term, highlights, display_order, is_active) VALUES
  ('BMW', '3 Series', 2024, '330i', 499.00, 3500.00, 36, 'Premium package, Navigation, Heated seats', 1, true),
  ('Mercedes-Benz', 'C-Class', 2024, 'C300', 549.00, 4000.00, 36, 'AMG Line, Panoramic roof, Premium audio', 2, true),
  ('Audi', 'A4', 2024, 'Premium Plus', 479.00, 3200.00, 36, 'Virtual cockpit, S-Line package, Apple CarPlay', 3, true);
