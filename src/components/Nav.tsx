import { useState, useRef, useEffect } from 'react'
import { Search, Clock, LayoutDashboard, LogOut, Plus, Users, ChevronDown } from 'lucide-react'
import GivelyLogo from './GivelyLogo'
import { useAuth } from '../context/AuthContext'
import type { Screen } from '../types'

interface Props {
  screen: Screen
  onNavigate: (screen: Screen) => void
}

const CREATOR_SCREENS: { label: string; screen: Screen }[] = [
  { label: 'Muhssina Traore', screen: 'creator-muhssina' },
  { label: 'Sincere Shakur', screen: 'creator-sincere' },
  { label: 'Juan Ortiz', screen: 'creator-juan' },
]

export default function Nav({ screen, onNavigate }: Props) {
  const { volunteerProfile, companyProfile, signOut } = useAuth()
  const isVolunteer = !!volunteerProfile
  const isCompany = !!companyProfile
  const [creatorsOpen, setCreatorsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setCreatorsOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <>
      {/* Top utility bar with creators menu */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-green-700 text-white">
        <div className="max-w-6xl mx-auto px-6 h-9 flex items-center justify-end">
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setCreatorsOpen(o => !o)} className="flex items-center gap-1.5 text-xs font-medium text-green-100 hover:text-white transition-colors py-1 px-2 rounded hover:bg-green-600">
              <Users size={13} />
              Learn about the creators
              <ChevronDown size={12} className={`transition-transform ${creatorsOpen ? 'rotate-180' : ''}`} />
            </button>
            {creatorsOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 w-52 z-50">
                <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wide">TTL Summer Camp 2026</div>
                {CREATOR_SCREENS.map(c => (
                  <button key={c.screen} onClick={() => { onNavigate(c.screen); setCreatorsOpen(false) }} className={`w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 ${screen === c.screen ? 'text-green-700 font-medium' : ''}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${c.screen === 'creator-muhssina' ? 'bg-pink-400' : c.screen === 'creator-sincere' ? 'bg-green-400' : 'bg-red-400'}`} />
                    {c.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main app nav */}
      <div className="fixed top-9 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={() => onNavigate(isVolunteer ? 'browse' : isCompany ? 'company-dash' : 'landing')} className="flex items-center gap-2">
            <GivelyLogo size={32} />
            <span className="text-xl font-bold text-green-700">Gively</span>
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
              <span className="hidden sm:block font-medium">{isVolunteer ? `${volunteerProfile.first_name} ${volunteerProfile.last_name}` : companyProfile?.company_name}</span>
              <span className="text-xs text-gray-400 hidden sm:block">{isVolunteer ? 'Volunteer' : 'Organization'}</span>
            </div>
            <button onClick={signOut} className="ml-2 flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 transition-colors px-2 py-1.5 rounded-lg hover:bg-red-50">
              <LogOut size={14} />
              <span className="hidden sm:block">Sign out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

function NavBtn({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-green-50 text-green-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>
      {icon}
      <span className="hidden sm:block">{label}</span>
    </button>
  )
}
