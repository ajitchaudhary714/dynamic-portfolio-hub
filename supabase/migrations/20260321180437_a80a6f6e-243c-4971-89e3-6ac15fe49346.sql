
-- Create profile table (single row for portfolio owner)
CREATE TABLE public.profile (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'Ajit Verma',
  title TEXT NOT NULL DEFAULT 'Frontend Developer / UX & UI Designer',
  email TEXT NOT NULL DEFAULT 'ajitchaudhary714@gmail.com',
  phone TEXT DEFAULT '+91 9026029479',
  location TEXT DEFAULT 'Lucknow, Uttar Pradesh',
  bio TEXT DEFAULT 'Passionate about creating beautiful, responsive, and user-friendly web applications. With 2 years of experience, I bring ideas to life through code and creativity.',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  tags TEXT[] DEFAULT '{}',
  link TEXT,
  image_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create skills table
CREATE TABLE public.skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create social_links table
CREATE TABLE public.social_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create messages table (contact form submissions)
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_name TEXT NOT NULL,
  sender_email TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Public read access for landing page
CREATE POLICY "Public can read profile" ON public.profile FOR SELECT USING (true);
CREATE POLICY "Public can read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public can read skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public can read social_links" ON public.social_links FOR SELECT USING (true);

-- Public can insert messages (contact form)
CREATE POLICY "Public can send messages" ON public.messages FOR INSERT WITH CHECK (true);

-- Authenticated users can manage everything
CREATE POLICY "Auth users can update profile" ON public.profile FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can insert profile" ON public.profile FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Auth users can manage projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth users can manage skills" ON public.skills FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth users can manage social_links" ON public.social_links FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Auth users can manage messages" ON public.messages FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profile_updated_at BEFORE UPDATE ON public.profile FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default data
INSERT INTO public.profile (name, title, email, phone, location, bio) VALUES 
('Ajit Verma', 'Frontend Developer / UX & UI Designer', 'ajitchaudhary714@gmail.com', '+91 9026029479', 'Lucknow, Uttar Pradesh', 'Passionate about creating beautiful, responsive, and user-friendly web applications. With 2 years of experience, I bring ideas to life through code and creativity.');

INSERT INTO public.projects (title, description, tags, link, sort_order) VALUES 
('MySkillWallet.ai', 'EdTech platform for building skills, earning certifications, virtual internships and job opportunities. Trusted by Intel, Google, Salesforce, IBM & more.', ARRAY['React', 'EdTech', 'SaaS', 'Full Stack'], 'https://myskillwallet.ai/', 1),
('Troven.ai', 'AI-powered assessment platform with custom coding challenges, secure proctoring, skill-based evaluations and real-time candidate insights.', ARRAY['AI', 'Assessment', 'React', 'Node.js'], 'https://troven.ai/', 2),
('ConQT.com', 'Industrial data analytics & consulting platform. AI-powered insights, data historian solutions, and process optimization for enterprises.', ARRAY['Analytics', 'AI', 'Enterprise', 'WordPress'], 'https://conqt.com/', 3);

INSERT INTO public.skills (name, sort_order) VALUES 
('React', 1), ('Next.js', 2), ('Tailwind CSS', 3), ('JavaScript', 4), ('TypeScript', 5), ('Node.js', 6), ('Git', 7), ('Figma', 8);

INSERT INTO public.social_links (platform, url, sort_order) VALUES 
('GitHub', 'https://github.com/', 1),
('LinkedIn', 'https://linkedin.com/', 2),
('Twitter', 'https://twitter.com/', 3),
('Instagram', 'https://instagram.com/', 4);
