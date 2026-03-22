
-- Create experiences table
CREATE TABLE public.experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company text NOT NULL,
  role text NOT NULL,
  start_date text NOT NULL,
  end_date text NOT NULL,
  type text DEFAULT 'Remote',
  sort_order integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read experiences" ON public.experiences FOR SELECT TO public USING (true);
CREATE POLICY "Auth users can manage experiences" ON public.experiences FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Seed data
INSERT INTO public.experiences (company, role, start_date, end_date, type, sort_order) VALUES
('Tech Curve AI & Innovations', 'Frontend Developer', 'March 2023', 'October 2023', 'Remote', 1),
('RedSecOps Cyber India Private Limited', 'Frontend Developer & UI Designer', 'November 2023', 'January 2026', 'On-site', 2);
