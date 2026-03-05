
-- Create Company Info / About Page Table
CREATE TABLE IF NOT EXISTS company_info (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_name TEXT NOT NULL DEFAULT 'Beeckle Network',
  tagline TEXT,
  about_title TEXT NOT NULL DEFAULT 'About Us',
  about_content TEXT NOT NULL,
  mission_title TEXT DEFAULT 'Our Mission',
  mission_content TEXT,
  vision_title TEXT DEFAULT 'Our Vision',
  vision_content TEXT,
  values TEXT[] DEFAULT '{}',
  contact_email TEXT,
  contact_phone TEXT,
  address TEXT,
  social_links JSONB DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE company_info ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Public read company info" ON company_info;
DROP POLICY IF EXISTS "Authenticated update company info" ON company_info;
DROP POLICY IF EXISTS "Authenticated insert company info" ON company_info;

CREATE POLICY "Public read company info" ON company_info FOR SELECT USING (true);
CREATE POLICY "Authenticated update company info" ON company_info FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated insert company info" ON company_info FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Insert Initial Data (Singleton)
INSERT INTO company_info (
  company_name, 
  about_content, 
  mission_content, 
  vision_content,
  values
) VALUES (
  'Beeckle Network',
  'Beeckle Network is a leading technology solutions provider specializing in comprehensive security systems, network infrastructure, and software development. We bridge the gap between complex technology and business needs.',
  'To empower businesses with secure, scalable, and innovative technology solutions that drive growth and efficiency.',
  'To be the most trusted partner in digital transformation and security infrastructure across the region.',
  '{"Innovation", "Integrity", "Excellence", "Customer Focus"}'
);
