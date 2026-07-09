import { Search, Clock, LayoutDashboard, LogOut, Heart, Plus } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import type { Screen } from '../types'

interface Props {
  screen: Screen
  onNavigate: (screen: Screen) => void
}

export default function Nav({ screen, onNavigate }: Props) {
  const { volunteerProfile, companyProfile, signOut } = useAuth()
  const isVolunteer = !!volunteerProfile
  const isCompany = !!companyProfile

  async function handleSignOut() {
    await signOut()
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <button
          onClick={() => onNavigate(isVolunteer ? 'browse' : isCompany ? 'company-dash' : 'landing')}
          className="flex items-center gap-2 text-green-700 font-bold text-lg"
        >
          <Heart size={16} className="fill-green-600 text-green-600" />
          Gively
        </button>

        <div className="flex items-center gap-1">
          {isVolunteer && (
            <>
              <NavBtn active={screen === 'browse'} onClick={() => onNavigate('browse')} icon={<Search size={15} />} label="Browse" />
              <NavBtn active={screen === 'my-hours'} onClick={() => onNavigate('my-hours')} icon={<Clock size={15} />} label="My hours" />
            </>
          )}
          {isCompany && (
            <>
              <NavBtn active={screen === 'company-dash'} onClick={() => onNavigate('company-dash')} icon={<LayoutDashboard size={15} />} label="Dashboard" />
              <NavBtn active={screen === 'post-opportunity'} onClick={() => onNavigate('post-opportunity')} icon={<Plus size={15} />} label="Post" />
            </>
          )}

          <div className="w-px h-4 bg-gray-200 mx-2" />

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="hidden sm:block font-medium">
              {isVolunteer ? `${volunteerProfile.first_name} ${volunteerProfile.last_name}` : companyProfile?.company_name}
            </span>
            <span className="text-xs text-gray-400 hidden sm:block">{isVolunteer ? 'Volunteer' : 'Organization'}</span>
          </div>

          <button
            onClick={handleSignOut}
            className="ml-2 flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 transition-colors px-2 py-1.5 rounded-lg hover:bg-red-50"
          >
            <LogOut size={14} />
            <span className="hidden sm:block">Sign out</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

function NavBtn({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
        active
          ? 'bg-green-50 text-green-700'
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
      }`}
    >
      {icon}
      <span className="hidden sm:block">{label}</span>
    </button>
  )
}
