import { useState, useEffect } from 'react'
import { useAuth } from './context/AuthContext'
import LandingScreen from './screens/LandingScreen'
import LoginScreen from './screens/LoginScreen'
import SignupVolunteerScreen from './screens/SignupVolunteerScreen'
import SignupCompanyScreen from './screens/SignupCompanyScreen'
import BrowseScreen from './screens/BrowseScreen'
import EventDetailScreen from './screens/EventDetailScreen'
import MyHoursScreen from './screens/MyHoursScreen'
import CompanyDashScreen from './screens/CompanyDashScreen'
import PostOpportunityScreen from './screens/PostOpportunityScreen'
import CreatorsScreen from './screens/CreatorsScreen'
import CreatorMuhssinaScreen from './screens/CreatorMuhssinaScreen'
import CreatorSincereScreen from './screens/CreatorSincereScreen'
import CreatorJuanScreen from './screens/CreatorJuanScreen'
import Nav from './components/Nav'
import TopBar from './components/TopBar'
import type { Event, Screen } from './types'

const CREATOR_SCREENS: Screen[] = ['creators', 'creator-muhssina', 'creator-sincere', 'creator-juan']
const PUBLIC_SCREENS: Screen[] = ['landing', 'login', 'signup-volunteer', 'signup-company', ...CREATOR_SCREENS]

function AppContent() {
  const { user, volunteerProfile, companyProfile, loading } = useAuth()
  const [screen, setScreen] = useState<Screen>('landing')
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  useEffect(() => {
    if (loading) return
    if (!user) {
      if (!PUBLIC_SCREENS.includes(screen)) setScreen('landing')
    } else if (volunteerProfile) {
      if (['landing', 'login', 'signup-volunteer', 'signup-company'].includes(screen)) setScreen('browse')
    } else if (companyProfile) {
      if (['landing', 'login', 'signup-volunteer', 'signup-company'].includes(screen)) setScreen('company-dash')
    }
  }, [user, volunteerProfile, companyProfile, loading])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Loading…</p>
        </div>
      </div>
    )
  }

  const isAuthenticated = !!(user && (volunteerProfile || companyProfile))

  // Creator pages — always accessible
  if (CREATOR_SCREENS.includes(screen)) {
    return (
      <>
        <TopBar onNavigate={setScreen} screen={screen} />
        <div className="pt-9">
          {screen === 'creators' && <CreatorsScreen onNavigate={setScreen} />}
          {screen === 'creator-muhssina' && <CreatorMuhssinaScreen onNavigate={setScreen} />}
          {screen === 'creator-sincere' && <CreatorSincereScreen onNavigate={setScreen} />}
          {screen === 'creator-juan' && <CreatorJuanScreen onNavigate={setScreen} />}
        </div>
      </>
    )
  }

  // Public screens (not authenticated)
  if (!isAuthenticated) {
    return (
      <>
        <TopBar onNavigate={setScreen} screen={screen} />
        <div className="pt-9">
          {screen === 'login' && <LoginScreen onNavigate={setScreen} />}
          {screen === 'signup-volunteer' && <SignupVolunteerScreen onNavigate={setScreen} />}
          {screen === 'signup-company' && <SignupCompanyScreen onNavigate={setScreen} />}
          {!['login', 'signup-volunteer', 'signup-company'].includes(screen) && <LandingScreen onNavigate={setScreen} />}
        </div>
      </>
    )
  }

  // Authenticated screens
  return (
    <>
      <Nav screen={screen} onNavigate={setScreen} />
      <div className="pt-[92px]">
        {screen === 'browse' && <BrowseScreen onNavigate={setScreen} onSelectEvent={setSelectedEvent} />}
        {screen === 'event-detail' && <EventDetailScreen event={selectedEvent} onNavigate={setScreen} />}
        {screen === 'my-hours' && <MyHoursScreen />}
        {screen === 'company-dash' && <CompanyDashScreen onNavigate={setScreen} />}
        {screen === 'post-opportunity' && <PostOpportunityScreen onNavigate={setScreen} />}
      </div>
    </>
  )
}

export default function App() {
  return <AppContent />
}
