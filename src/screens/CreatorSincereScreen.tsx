import { ArrowLeft, ArrowRight } from 'lucide-react'
import VineBg from '../components/VineBg'
import type { Screen } from '../types'

interface Props { onNavigate: (screen: Screen) => void }

const INTERESTS = [
  { emoji: '💻', label: 'Engineering', value: 'Full-stack systems & databases' },
  { emoji: '🏗️', label: 'Architecture', value: 'Building things that last' },
  { emoji: '🌿', label: 'Community', value: 'Tech that serves people' },
  { emoji: '📊', label: 'Data', value: 'Clean schemas, clean mind' },
]

export default function CreatorSincereScreen({ onNavigate }: Props) {
  return (
    <div className="min-h-screen relative" style={{ background: 'linear-gradient(160deg, #f0fdf4 0%, #dcfce7 45%, #f0fdf4 100%)' }}>
      <VineBg opacity={0.04} />
      <div className="fixed top-9 left-0 right-0 z-50 border-b border-green-100" style={{ background: 'rgba(240,253,244,0.88)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={() => onNavigate('creators')} className="flex items-center gap-2 text-green-500 hover:text-green-700 text-sm transition-colors">
            <ArrowLeft size={15} /> Creators
          </button>
          <span className="text-green-700 font-semibold text-sm">TTL Summer Camp 2026</span>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-6 pt-24 pb-16 relative z-10">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 text-white flex items-center justify-center text-3xl font-bold shadow-lg shadow-green-200 mb-4">SS</div>
          <p className="text-green-600 text-sm font-medium mb-1">Full-Stack Developer · TTL Summer Camp 2026</p>
          <h1 className="text-green-800" style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.8rem', fontWeight: 700, lineHeight: 1.15 }}>Sincere Shakur</h1>
          <p className="text-green-700 mt-4 max-w-md leading-relaxed text-sm">An engineer who builds with intention. Sincere turns complex ideas into clean, reliable systems — and makes sure everything just works.</p>
        </div>
        <div className="bg-white/70 border border-green-200 rounded-2xl p-5 mb-6">
          <p className="text-green-600 font-semibold text-xs uppercase tracking-wide mb-2">🛠️ Project contribution</p>
          <p className="text-green-900 text-sm leading-relaxed">Sincere built the <strong>sign-out flow</strong> for both volunteer and company accounts, and engineered the <strong>event-posting system</strong> that lets organizations publish opportunities directly from their dashboard. He also designed the <strong>behind-the-scenes database architecture</strong> that processes all accounts entering and leaving the platform — keeping every user's data organized and secure.</p>
        </div>
        <div className="bg-white/70 border border-green-200 rounded-2xl p-5 mb-8">
          <p className="text-green-600 font-semibold text-xs uppercase tracking-wide mb-4">🎯 Interests</p>
          <div className="grid grid-cols-2 gap-3">
            {INTERESTS.map(item => (
              <div key={item.label} className="bg-green-50 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1"><span>{item.emoji}</span><span className="text-green-600 text-xs font-semibold uppercase tracking-wide">{item.label}</span></div>
                <p className="text-green-900 text-sm font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => onNavigate('creator-muhssina')} className="flex-1 flex items-center justify-between bg-white/70 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-700 hover:bg-green-50 transition-colors">
            <span className="font-medium">Muhssina Traore</span><ArrowRight size={14} />
          </button>
          <button onClick={() => onNavigate('creator-juan')} className="flex-1 flex items-center justify-between bg-white/70 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-700 hover:bg-green-50 transition-colors">
            <span className="font-medium">Juan Ortiz</span><ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
