import { ArrowLeft, ArrowRight } from 'lucide-react'
import VineBg from '../components/VineBg'
import type { Screen } from '../types'

interface Props {
  onNavigate: (screen: Screen) => void
}

const CREATORS = [
  {
    screen: 'creator-muhssina' as Screen,
    name: 'Muhssina Traore',
    role: 'UI/UX Designer',
    initials: 'MT',
    color: 'from-pink-300 to-rose-400',
    bg: 'bg-pink-50',
    border: 'border-pink-100',
    text: 'text-pink-700',
    contribution: 'Muhssina shaped the soul of Gively — she brought personality and structure to the website, ensuring every page felt intentional, warm, and true to the platform\'s mission.',
    emoji: '✨',
  },
  {
    screen: 'creator-sincere' as Screen,
    name: 'Sincere Shakur',
    role: 'Full-Stack Developer',
    initials: 'SS',
    color: 'from-green-400 to-emerald-600',
    bg: 'bg-green-50',
    border: 'border-green-100',
    text: 'text-green-700',
    contribution: 'Sincere built the sign-out flow, engineered the event-posting system, and designed the database architecture that keeps every user\'s data organized and secure.',
    emoji: '🛠️',
  },
  {
    screen: 'creator-juan' as Screen,
    name: 'Juan Ortiz',
    role: 'Project Lead',
    initials: 'JO',
    color: 'from-red-400 to-red-600',
    bg: 'bg-red-50',
    border: 'border-red-100',
    text: 'text-red-700',
    contribution: 'Juan shaped the structure of the project, actively shared the results of his prompts, and drove the project forward by adding creativity and leadership at every stage.',
    emoji: '🏆',
  },
]

export default function CreatorsScreen({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 relative">
      <VineBg opacity={0.05} />
      <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        <button onClick={() => onNavigate('landing')} className="flex items-center gap-2 text-gray-400 hover:text-gray-600 text-sm mb-10 transition-colors">
          <ArrowLeft size={15} /> Back
        </button>
        <div className="text-center mb-12">
          <p className="text-xs text-green-700 font-semibold uppercase tracking-widest mb-3">TTL Summer Camp 2026</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Meet the creators</h1>
          <p className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed">
            The team behind Gively — three creators who built this platform to make giving accessible to everyone.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CREATORS.map(c => (
            <button key={c.name} onClick={() => onNavigate(c.screen)} className={`${c.bg} border ${c.border} rounded-2xl p-6 text-left hover:shadow-md hover:-translate-y-1 transition-all group`}>
              <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center text-white font-bold text-lg mb-4 shadow-sm`}>{c.initials}</div>
              <p className={`text-xs font-semibold uppercase tracking-wide ${c.text} mb-1`}>{c.role}</p>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{c.name}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">{c.contribution}</p>
              <span className={`inline-flex items-center gap-1 text-xs font-medium ${c.text} group-hover:gap-2 transition-all`}>
                View profile <ArrowRight size={12} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
