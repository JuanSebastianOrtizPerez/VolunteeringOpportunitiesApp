/*
# Seed demo data for Gively

Inserts demo auth users, company profiles, volunteer profiles, events, and hours log entries
so the app has content visible immediately.

1. Demo Users (in auth.users)
   - Demo company: Higher Fire (higherfire demo)
   - Demo volunteer: Jordan Rivera

2. Company profile linked to the demo company user

3. 6 seeded events across all categories

4. Sample hours log for the demo volunteer
*/

DO $$
DECLARE
  company_uid uuid := '00000000-0000-0000-0000-000000000001';
  volunteer_uid uuid := '00000000-0000-0000-0000-000000000002';
BEGIN

-- Create demo users in auth.users if they don't exist
INSERT INTO auth.users (
  id, email, encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
  aud, role
)
VALUES
(
  company_uid,
  'contact@higherfire.org',
  crypt('gively2026', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(), now(),
  'authenticated', 'authenticated'
),
(
  volunteer_uid,
  'jordan@example.com',
  crypt('gively2026', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(), now(),
  'authenticated', 'authenticated'
)
ON CONFLICT (id) DO NOTHING;

-- Create identity rows (required for email auth)
INSERT INTO auth.identities (
  id, user_id, provider_id, provider, identity_data, created_at, updated_at, last_sign_in_at
)
VALUES
(
  gen_random_uuid(), company_uid, 'contact@higherfire.org', 'email',
  format('{"sub": "%s", "email": "contact@higherfire.org"}', company_uid::text)::jsonb,
  now(), now(), now()
),
(
  gen_random_uuid(), volunteer_uid, 'jordan@example.com', 'email',
  format('{"sub": "%s", "email": "jordan@example.com"}', volunteer_uid::text)::jsonb,
  now(), now(), now()
)
ON CONFLICT DO NOTHING;

-- Company profile
INSERT INTO company_profiles (id, company_name, email, phone, website, description)
VALUES (
  company_uid,
  'Higher Fire',
  'contact@higherfire.org',
  '+1 (718) 440-9920',
  'higherfire.org',
  'A Brooklyn-based nonprofit empowering youth through leadership programs, arts, and community action.'
)
ON CONFLICT (id) DO NOTHING;

-- Volunteer profile
INSERT INTO volunteer_profiles (id, first_name, last_name, email)
VALUES (
  volunteer_uid,
  'Jordan',
  'Rivera',
  'jordan@example.com'
)
ON CONFLICT (id) DO NOTHING;

-- Events
INSERT INTO events (company_id, title, category, location, commitment, spots, description, skills, image)
VALUES
(
  company_uid,
  'Youth Leadership Workshop Series',
  'Education',
  'Brooklyn, NY',
  '4 hrs/week',
  12,
  'Facilitate weekly workshops empowering teens with public speaking, civic engagement, and leadership skills. Ideal for educators and community organizers.',
  ARRAY['Facilitation', 'Youth Development', 'Public Speaking'],
  'https://images.pexels.com/photos/5905445/pexels-photo-5905445.jpeg?auto=compress&cs=tinysrgb&w=800'
),
(
  company_uid,
  'Urban Reforestation Crew',
  'Environment',
  'Queens, NY',
  '6 hrs/month',
  20,
  'Join weekend planting crews to restore urban green spaces. No experience needed — just bring gloves and a willingness to dig!',
  ARRAY['Physical Stamina', 'Teamwork'],
  'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=800'
),
(
  company_uid,
  'Adult Literacy Tutor',
  'Education',
  'Harlem, NY',
  '2 hrs/week',
  8,
  'Tutor adults working toward their GED or basic literacy skills. Training provided. Make a lasting impact on someone''s future.',
  ARRAY['Patience', 'Communication', 'Teaching'],
  'https://images.pexels.com/photos/1367269/pexels-photo-1367269.jpeg?auto=compress&cs=tinysrgb&w=800'
),
(
  company_uid,
  'Community Health Fair Support',
  'Health',
  'Bronx, NY',
  '1 day event',
  15,
  'Assist at our annual health fair — welcome visitors, distribute resources, and guide attendees to screenings and services.',
  ARRAY['Customer Service', 'Organization'],
  'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=800'
),
(
  company_uid,
  'Mural Project Assistant',
  'Arts',
  'Lower East Side, NY',
  '3 hrs/week',
  6,
  'Help local artists create murals celebrating neighborhood history. No art experience required — roles include prep, painting, and community outreach.',
  ARRAY['Creativity', 'Community Outreach'],
  'https://images.pexels.com/photos/1053687/pexels-photo-1053687.jpeg?auto=compress&cs=tinysrgb&w=800'
),
(
  company_uid,
  'Neighborhood Clean-Up',
  'Community',
  'Flatbush, Brooklyn',
  'Monthly Saturday',
  30,
  'Join us every last Saturday to clean parks and streets in Flatbush. A great way to meet neighbors and take pride in your community.',
  ARRAY['Physical Activity', 'Teamwork'],
  'https://images.pexels.com/photos/2990644/pexels-photo-2990644.jpeg?auto=compress&cs=tinysrgb&w=800'
)
ON CONFLICT DO NOTHING;

-- Hours log for demo volunteer
INSERT INTO hours_log (volunteer_id, title, org, date, hours)
VALUES
(volunteer_uid, 'Urban Reforestation Crew', 'Higher Fire', 'June 7, 2026', 4),
(volunteer_uid, 'Adult Literacy Tutor', 'Higher Fire', 'June 14, 2026', 2),
(volunteer_uid, 'Adult Literacy Tutor', 'Higher Fire', 'June 21, 2026', 2),
(volunteer_uid, 'Neighborhood Clean-Up', 'Higher Fire', 'June 28, 2026', 3),
(volunteer_uid, 'Urban Reforestation Crew', 'Higher Fire', 'July 5, 2026', 4)
ON CONFLICT DO NOTHING;

END $$;
