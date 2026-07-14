import { ArrowLeft, ArrowRight } from 'lucide-react'
import VineBg from '../components/VineBg'
import type { Screen } from '../types'

interface Props { onNavigate: (screen: Screen) => void }

const INTERESTS = [
  { emoji: '🎨', label: 'Design', value: 'UI/UX & Visual storytelling' },
  { emoji: '📚', label: 'Learning', value: 'Always growing, always curious' },
  { emoji: '💚', label: 'Giving', value: 'Making giving accessible to all' },
  { emoji: '🌸', label: 'Aesthetics', value: 'Beauty in intentional design' },
]

export default function CreatorMuhssinaScreen({ onNavigate }: Props) {
  return (
    <div className="min-h-screen relative" style={{ background: 'linear-gradient(160deg, #fff0f5 0%, #fce4ec 40%, #fdf2f8 100%)' }}>
      <VineBg opacity={0.04} />
      <div className="fixed top-9 left-0 right-0 z-50 border-b border-pink-100" style={{ background: 'rgba(255,240,245,0.88)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={() => onNavigate('creators')} className="flex items-center gap-2 text-pink-400 hover:text-pink-600 text-sm transition-colors">
            <ArrowLeft size={15} /> Creators
          </button>
          <span className="text-pink-600 font-semibold text-sm">TTL Summer Camp 2026</span>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-6 pt-24 pb-16 relative z-10">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-300 to-rose-400 text-white flex items-center justify-center text-3xl font-bold shadow-lg shadow-pink-200 mb-4">MT</div>
          <p className="text-pink-500 text-sm font-medium mb-1">UI/UX Designer · TTL Summer Camp 2026</p>
          <h1 className="text-pink-800" style={{ fontFamily: 'Dancing Script, cursive', fontSize: '3.5rem', lineHeight: 1.2 }}>Muhssina Traore</h1>
          <p className="text-pink-600 mt-4 max-w-md leading-relaxed text-sm">A creative soul with a gift for making digital spaces feel warm and human. Muhssina believes every pixel should have purpose — and every user should feel seen.</p>
        </div>
        <div className="bg-white/70 border border-pink-200 rounded-2xl p-5 mb-6">
          <p className="text-pink-500 font-semibold text-xs uppercase tracking-wide mb-2">✨ Project contribution</p>
          <p className="text-pink-900 text-sm leading-relaxed">Muhssina shaped the soul of Gively — she brought <strong>personality and structure</strong> to the website, ensuring every page felt intentional, warm, and true to the platform's mission of making giving accessible to everyone.</p>
        </div>
        <div className="bg-white/70 border border-pink-200 rounded-2xl p-5 mb-8">
          <p className="text-pink-500 font-semibold text-xs uppercase tracking-wide mb-4">🎯 Interests</p>
          <div className="grid grid-cols-2 gap-3">
            {INTERESTS.map(item => (
              <div key={item.label} className="bg-pink-50 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1"><span>{item.emoji}</span><span className="text-pink-500 text-xs font-semibold uppercase tracking-wide">{item.label}</span></div>
                <p className="text-pink-900 text-sm font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => onNavigate('creator-sincere')} className="flex-1 flex items-center justify-between bg-white/70 border border-pink-200 rounded-xl px-4 py-3 text-sm text-pink-700 hover:bg-pink-50 transition-colors">
            <span className="font-medium">Sincere Shakur</span><ArrowRight size={14} />
          </button>
          <button onClick={() => onNavigate('creator-juan')} className="flex-1 flex items-center justify-between bg-white/70 border border-pink-200 rounded-xl px-4 py-3 text-sm text-pink-700 hover:bg-pink-50 transition-colors">
            <span className="font-medium">Juan Ortiz</span><ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
