export type Category = 'All' | 'Environment' | 'Education' | 'Health' | 'Arts' | 'Community'

export interface VolunteerProfile {
  id: string
  first_name: string
  last_name: string
  email: string
  created_at: string
}

export interface CompanyProfile {
  id: string
  company_name: string
  email: string
  phone: string
  website: string
  description: string
  created_at: string
}

export interface Event {
  id: string
  company_id: string
  title: string
  category: Exclude<Category, 'All'>
  location: string
  commitment: string
  spots: number
  description: string
  skills: string[]
  image: string
  posted_at: string
  company_profiles?: CompanyProfile
}

export interface Application {
  id: string
  event_id: string
  volunteer_id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  availability: string
  motivation: string
  applied_at: string
}

export interface HourEntry {
  id: string
  volunteer_id: string
  event_id: string | null
  title: string
  org: string
  date: string
  hours: number
  logged_at: string
}

export type Screen =
  | 'landing'
  | 'login'
  | 'signup-volunteer'
  | 'signup-company'
  | 'browse'
  | 'event-detail'
  | 'my-hours'
  | 'company-dash'
  | 'post-opportunity'
  | 'apply'
