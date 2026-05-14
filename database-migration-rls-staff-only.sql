-- Apply in Supabase SQL Editor if the project already exists (updates RLS from older schema).
-- Matches database-schema.sql RLS section as of 2026-02.

ALTER TABLE lease_deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE deal_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view active deals" ON lease_deals;
CREATE POLICY "Public can view active deals"
  ON lease_deals FOR SELECT
  TO anon
  USING (is_active = true);

DROP POLICY IF EXISTS "Public can view active blog posts" ON blog_posts;
CREATE POLICY "Public can view active blog posts"
  ON blog_posts FOR SELECT
  TO anon
  USING (is_active = true AND (published_at IS NULL OR published_at <= NOW()));

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
