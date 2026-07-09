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
import Nav from './components/Nav'
import type { Event, Screen } from './types'

function AppContent() {
  const { user, volunteerProfile, companyProfile, loading } = useAuth()
  const [screen, setScreen] = useState<Screen>('landing')
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  useEffect(() => {
    if (loading) return
    if (!user) {
      setScreen('landing')
    } else if (volunteerProfile) {
      setScreen('browse')
    } else if (companyProfile) {
      setScreen('company-dash')
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

  // Public screens
  if (!isAuthenticated) {
    if (screen === 'login') return <LoginScreen onNavigate={setScreen} />
    if (screen === 'signup-volunteer') return <SignupVolunteerScreen onNavigate={setScreen} />
    if (screen === 'signup-company') return <SignupCompanyScreen onNavigate={setScreen} />
    return <LandingScreen onNavigate={setScreen} />
  }

  // Authenticated screens
  return (
    <div>
      <Nav screen={screen} onNavigate={setScreen} />
      <div className="pt-14">
        {screen === 'browse' && (
          <BrowseScreen onNavigate={setScreen} onSelectEvent={setSelectedEvent} />
        )}
        {screen === 'event-detail' && (
          <EventDetailScreen event={selectedEvent} onNavigate={setScreen} />
        )}
        {screen === 'my-hours' && <MyHoursScreen />}
        {screen === 'company-dash' && <CompanyDashScreen onNavigate={setScreen} />}
        {screen === 'post-opportunity' && <PostOpportunityScreen onNavigate={setScreen} />}
      </div>
    </div>
  )
}

export default function App() {
  return <AppContent />
}
