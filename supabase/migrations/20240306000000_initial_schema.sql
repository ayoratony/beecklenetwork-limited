-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Tables

-- Services Table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  icon_url TEXT,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects Table (Portfolio)
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  client TEXT NOT NULL,
  completion_date DATE,
  website_url TEXT,
  images TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author_id UUID REFERENCES auth.users(id),
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE,
  cover_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_name TEXT NOT NULL,
  company TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leads Table (Contact Form Submissions)
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service_interest TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Row Level Security Policies

-- Services: Public read, authenticated write
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Authenticated write services" ON services FOR ALL USING (auth.role() = 'authenticated');

-- Projects: Public read, authenticated write
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Authenticated write projects" ON projects FOR ALL USING (auth.role() = 'authenticated');

-- Blog Posts: Public read published posts, authenticated write
CREATE POLICY "Public read published posts" ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Authenticated read all posts" ON blog_posts FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write posts" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');

-- Testimonials: Public read approved, authenticated write
CREATE POLICY "Public read approved testimonials" ON testimonials FOR SELECT USING (approved = true);
CREATE POLICY "Authenticated read all testimonials" ON testimonials FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');

-- Leads: Public insert, authenticated full access
CREATE POLICY "Public insert leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated full access leads" ON leads FOR ALL USING (auth.role() = 'authenticated');

-- Insert Sample Data

-- Sample Services
INSERT INTO services (title, slug, description, icon_url, category) VALUES
('Website Development', 'website-development', 'Custom website development with modern technologies and responsive design', '/icons/website.svg', 'Web Dev'),
('Mobile App Development', 'mobile-app-development', 'Native and cross-platform mobile applications for iOS and Android', '/icons/mobile.svg', 'Software'),
('CCTV Installation', 'cctv-installation', 'Professional CCTV installation and security camera systems for businesses', '/icons/cctv.svg', 'Security'),
('Biometrics & Access Control', 'biometrics-access-control', 'Advanced biometric systems and access control solutions', '/icons/biometrics.svg', 'Security'),
('Alarm Systems', 'alarm-systems', 'Comprehensive alarm systems and security infrastructure', '/icons/alarm.svg', 'Security'),
('Network Design', 'network-design', 'Enterprise network design with BGP, OSPF, VRF, MPLS configurations', '/icons/network.svg', 'Network'),
('System Automation', 'system-automation', 'Business process automation with n8n, Zoho, and AI integration', '/icons/automation.svg', 'Automation'),
('Cloud Integration', 'cloud-integration', 'Cloud system integration and migration services', '/icons/cloud.svg', 'Cloud');

-- Sample Projects
INSERT INTO projects (title, slug, description, client, completion_date, images, tags, featured) VALUES
('Corporate Website Redesign', 'corporate-website-redesign', 'Complete redesign of corporate website with modern UI/UX', 'Tech Corp', '2024-01-15', '{"/images/project1.jpg"}', '{"web", "design", "corporate"}', true),
('Mobile Banking App', 'mobile-banking-app', 'Secure mobile banking application with biometric authentication', 'Finance Bank', '2023-12-20', '{"/images/project2.jpg"}', '{"mobile", "banking", "security"}', true),
('Retail Security System', 'retail-security-system', 'Comprehensive security system for retail chain including CCTV and alarms', 'Retail Chain', '2023-11-30', '{"/images/project3.jpg"}', '{"security", "cctv", "retail"}', false);

-- Sample Testimonials
INSERT INTO testimonials (client_name, company, content, rating, approved) VALUES
('John Smith', 'Tech Innovations Inc', 'Beeckle Network delivered an exceptional website that exceeded our expectations. Their attention to detail and technical expertise is outstanding.', 5, true),
('Sarah Johnson', 'Secure Solutions Ltd', 'Professional service and excellent results. The security system they installed has been flawless.', 5, true),
('Michael Chen', 'Digital Dynamics', 'Great communication and project management. They delivered our mobile app on time and within budget.', 4, true);
