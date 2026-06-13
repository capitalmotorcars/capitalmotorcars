-- =====================================================
-- Capital Motor Cars - Form Submissions Database Schema
-- =====================================================

-- Create Form Submissions Table
CREATE TABLE IF NOT EXISTS form_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type VARCHAR(50) NOT NULL, -- 'contact' | 'credit' | 'trade-in'
  payload JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Allow insert/select for service_role
CREATE POLICY "Allow full access for service_role" 
  ON form_submissions 
  TO service_role 
  USING (true) 
  WITH CHECK (true);
