/*
# Gively App — Full Schema

## Overview
Creates all tables needed for the Gively volunteering platform.

## Tables

### volunteer_profiles
Stores extended volunteer profile info linked to auth.users.
- id: uuid (FK to auth.users)
- first_name, last_name: text
- email: text
- created_at: timestamp

### company_profiles
Stores organization profiles linked to auth.users.
- id: uuid (FK to auth.users)
- company_name, email, phone, website, description: text
- created_at: timestamp

### events
Volunteer opportunities posted by organizations.
- id: uuid primary key
- company_id: uuid (FK to company_profiles)
- title, category, location, commitment, description: text
- spots: integer
- skills: text array
- image: text (URL)
- posted_at: timestamp

### applications
Volunteer applications submitted for events.
- id: uuid primary key
- event_id: uuid (FK to events)
- volunteer_id: uuid (FK to volunteer_profiles)
- first_name, last_name, email, phone, availability, motivation: text
- applied_at: timestamp

### hours_log
Tracks volunteer service hours.
- id: uuid primary key
- volunteer_id: uuid (FK to volunteer_profiles)
- event_id: uuid nullable (FK to events)
- title, org, date: text
- hours: integer
- logged_at: timestamp

## Security
All tables have RLS enabled with authenticated-user-scoped policies.
Volunteers can manage their own data; companies can manage their own data.
Events are publicly readable (anon + authenticated) so the browse page works.
Applications: volunteers can insert/read own; companies can read applicants for their events.
*/

-- Volunteer profiles
CREATE TABLE IF NOT EXISTS volunteer_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE volunteer_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "vol_select_own" ON volunteer_profiles;
CREATE POLICY "vol_select_own" ON volunteer_profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "vol_insert_own" ON volunteer_profiles;
CREATE POLICY "vol_insert_own" ON volunteer_profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "vol_update_own" ON volunteer_profiles;
CREATE POLICY "vol_update_own" ON volunteer_profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "vol_delete_own" ON volunteer_profiles;
CREATE POLICY "vol_delete_own" ON volunteer_profiles FOR DELETE
  TO authenticated USING (auth.uid() = id);

-- Company profiles
CREATE TABLE IF NOT EXISTS company_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL DEFAULT '',
  website text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE company_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "comp_select_own" ON company_profiles;
CREATE POLICY "comp_select_own" ON company_profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "comp_insert_own" ON company_profiles;
CREATE POLICY "comp_insert_own" ON company_profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "comp_update_own" ON company_profiles;
CREATE POLICY "comp_update_own" ON company_profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "comp_delete_own" ON company_profiles;
CREATE POLICY "comp_delete_own" ON company_profiles FOR DELETE
  TO authenticated USING (auth.uid() = id);

-- Events
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES company_profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  category text NOT NULL DEFAULT 'Community',
  location text NOT NULL DEFAULT '',
  commitment text NOT NULL DEFAULT '',
  spots integer NOT NULL DEFAULT 10,
  description text NOT NULL DEFAULT '',
  skills text[] NOT NULL DEFAULT '{}',
  image text NOT NULL DEFAULT '',
  posted_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "events_public_select" ON events;
CREATE POLICY "events_public_select" ON events FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "events_company_insert" ON events;
CREATE POLICY "events_company_insert" ON events FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = company_id);

DROP POLICY IF EXISTS "events_company_update" ON events;
CREATE POLICY "events_company_update" ON events FOR UPDATE
  TO authenticated USING (auth.uid() = company_id) WITH CHECK (auth.uid() = company_id);

DROP POLICY IF EXISTS "events_company_delete" ON events;
CREATE POLICY "events_company_delete" ON events FOR DELETE
  TO authenticated USING (auth.uid() = company_id);

-- Applications
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  volunteer_id uuid NOT NULL REFERENCES volunteer_profiles(id) ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL DEFAULT '',
  availability text NOT NULL DEFAULT '',
  motivation text NOT NULL DEFAULT '',
  applied_at timestamptz DEFAULT now(),
  UNIQUE(event_id, volunteer_id)
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "app_vol_select" ON applications;
CREATE POLICY "app_vol_select" ON applications FOR SELECT
  TO authenticated USING (
    auth.uid() = volunteer_id
    OR EXISTS (
      SELECT 1 FROM events e WHERE e.id = event_id AND e.company_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "app_vol_insert" ON applications;
CREATE POLICY "app_vol_insert" ON applications FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = volunteer_id);

DROP POLICY IF EXISTS "app_vol_update" ON applications;
CREATE POLICY "app_vol_update" ON applications FOR UPDATE
  TO authenticated USING (auth.uid() = volunteer_id) WITH CHECK (auth.uid() = volunteer_id);

DROP POLICY IF EXISTS "app_vol_delete" ON applications;
CREATE POLICY "app_vol_delete" ON applications FOR DELETE
  TO authenticated USING (auth.uid() = volunteer_id);

-- Hours log
CREATE TABLE IF NOT EXISTS hours_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  volunteer_id uuid NOT NULL DEFAULT auth.uid() REFERENCES volunteer_profiles(id) ON DELETE CASCADE,
  event_id uuid REFERENCES events(id) ON DELETE SET NULL,
  title text NOT NULL,
  org text NOT NULL DEFAULT '',
  date text NOT NULL DEFAULT '',
  hours integer NOT NULL DEFAULT 1,
  logged_at timestamptz DEFAULT now()
);

ALTER TABLE hours_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "hours_vol_select" ON hours_log;
CREATE POLICY "hours_vol_select" ON hours_log FOR SELECT
  TO authenticated USING (auth.uid() = volunteer_id);

DROP POLICY IF EXISTS "hours_vol_insert" ON hours_log;
CREATE POLICY "hours_vol_insert" ON hours_log FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = volunteer_id);

DROP POLICY IF EXISTS "hours_vol_update" ON hours_log;
CREATE POLICY "hours_vol_update" ON hours_log FOR UPDATE
  TO authenticated USING (auth.uid() = volunteer_id) WITH CHECK (auth.uid() = volunteer_id);

DROP POLICY IF EXISTS "hours_vol_delete" ON hours_log;
CREATE POLICY "hours_vol_delete" ON hours_log FOR DELETE
  TO authenticated USING (auth.uid() = volunteer_id);

-- Indexes
CREATE INDEX IF NOT EXISTS events_company_id_idx ON events(company_id);
CREATE INDEX IF NOT EXISTS applications_event_id_idx ON applications(event_id);
CREATE INDEX IF NOT EXISTS applications_volunteer_id_idx ON applications(volunteer_id);
CREATE INDEX IF NOT EXISTS hours_log_volunteer_id_idx ON hours_log(volunteer_id);
