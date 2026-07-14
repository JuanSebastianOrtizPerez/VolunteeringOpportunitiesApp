import { ArrowLeft, ArrowRight } from 'lucide-react'
import VineBg from '../components/VineBg'
import type { Screen } from '../types'

interface Props { onNavigate: (screen: Screen) => void }

const INTERESTS = [
  { emoji: '🎯', label: 'Leadership', value: 'Driving projects from idea to launch' },
  { emoji: '💡', label: 'Creativity', value: 'New ideas, bold solutions' },
  { emoji: '🤝', label: 'Teamwork', value: 'Better together, always' },
  { emoji: '🚀', label: 'Vision', value: 'Turning prompts into products' },
]

const NUM_RAYS = 16
const COMIC = "'Comic Sans MS', 'Comic Sans', cursive"

export default function CreatorJuanScreen({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <VineBg opacity={0.03} />
      {/* Sunray background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ top: '-60%' }}>
        {Array.from({ length: NUM_RAYS }).map((_, i) => (
          <div key={i} className="absolute origin-bottom" style={{ width: '3px', height: '120vh', background: 'linear-gradient(to top, rgba(220,38,38,0.06), transparent)', transform: `rotate(${(360 / NUM_RAYS) * i}deg)`, bottom: 0 }} />
        ))}
      </div>
      <div className="fixed top-9 left-0 right-0 z-50 border-b border-red-100" style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={() => onNavigate('creators')} className="flex items-center gap-2 text-red-400 hover:text-red-600 text-sm transition-colors">
            <ArrowLeft size={15} /> Creators
          </button>
          <span className="text-red-600 font-semibold text-sm" style={{ fontFamily: COMIC }}>TTL Summer Camp 2026</span>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-6 pt-24 pb-16 relative z-10">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-400 to-red-600 text-white flex items-center justify-center text-3xl font-bold shadow-lg shadow-red-200 mb-4">JO</div>
          <p className="text-red-500 text-sm font-medium mb-1" style={{ fontFamily: COMIC }}>Project Lead · TTL Summer Camp 2026</p>
          <h1 className="text-red-700" style={{ fontFamily: COMIC, fontSize: '2.8rem', fontWeight: 700, lineHeight: 1.15 }}>Juan Ortiz</h1>
          <p className="text-red-600 mt-4 max-w-md leading-relaxed text-sm" style={{ fontFamily: COMIC }}>A natural leader with an eye for the big picture. Juan keeps the team aligned, inspired, and always moving forward.</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-6">
          <p className="text-red-500 font-semibold text-xs uppercase tracking-wide mb-2" style={{ fontFamily: COMIC }}>🏆 Project contribution</p>
          <p className="text-red-900 text-sm leading-relaxed" style={{ fontFamily: COMIC }}>Juan shaped the structure of the project, actively shared the results of his prompts, and drove the project forward by adding <strong>creativity and leadership</strong> at every stage.</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-8">
          <p className="text-red-500 font-semibold text-xs uppercase tracking-wide mb-4" style={{ fontFamily: COMIC }}>🎯 Interests</p>
          <div className="grid grid-cols-2 gap-3">
            {INTERESTS.map(item => (
              <div key={item.label} className="bg-white rounded-xl p-3 border border-red-100">
                <div className="flex items-center gap-2 mb-1"><span>{item.emoji}</span><span className="text-red-500 text-xs font-semibold uppercase tracking-wide" style={{ fontFamily: COMIC }}>{item.label}</span></div>
                <p className="text-red-900 text-sm font-medium" style={{ fontFamily: COMIC }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => onNavigate('creator-muhssina')} className="flex-1 flex items-center justify-between bg-white border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 hover:bg-red-50 transition-colors">
            <span className="font-medium" style={{ fontFamily: COMIC }}>Muhssina Traore</span><ArrowRight size={14} />
          </button>
          <button onClick={() => onNavigate('creator-sincere')} className="flex-1 flex items-center justify-between bg-white border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 hover:bg-red-50 transition-colors">
            <span className="font-medium" style={{ fontFamily: COMIC }}>Sincere Shakur</span><ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
