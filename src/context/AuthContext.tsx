import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { User, Session } from '@supabase/supabase-js'
import type { VolunteerProfile, CompanyProfile } from '../types'

interface AuthContextValue {
  user: User | null
  session: Session | null
  volunteerProfile: VolunteerProfile | null
  companyProfile: CompanyProfile | null
  loading: boolean
  refreshProfile: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  session: null,
  volunteerProfile: null,
  companyProfile: null,
  loading: true,
  refreshProfile: async () => {},
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [volunteerProfile, setVolunteerProfile] = useState<VolunteerProfile | null>(null)
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null)
  const [loading, setLoading] = useState(true)

  async function loadProfile(uid: string) {
    const [{ data: vol }, { data: comp }] = await Promise.all([
      supabase.from('volunteer_profiles').select('*').eq('id', uid).maybeSingle(),
      supabase.from('company_profiles').select('*').eq('id', uid).maybeSingle(),
    ])
    setVolunteerProfile(vol)
    setCompanyProfile(comp)
  }

  async function refreshProfile() {
    if (user) await loadProfile(user.id)
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        loadProfile(session.user.id).finally(() => setLoading(false))
      } else {
        setLoading(false)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        ;(async () => {
          await loadProfile(session.user.id)
          setLoading(false)
        })()
      } else {
        setVolunteerProfile(null)
        setCompanyProfile(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function signOut() {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, session, volunteerProfile, companyProfile, loading, refreshProfile, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
