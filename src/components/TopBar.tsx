import { useState, useRef, useEffect } from 'react'
import { Users, ChevronDown } from 'lucide-react'
import type { Screen } from '../types'

interface Props {
  onNavigate: (screen: Screen) => void
  screen: Screen
}

const CREATOR_SCREENS: { label: string; screen: Screen }[] = [
  { label: 'Muhssina Traore', screen: 'creator-muhssina' },
  { label: 'Sincere Shakur', screen: 'creator-sincere' },
  { label: 'Juan Ortiz', screen: 'creator-juan' },
]

export default function TopBar({ onNavigate, screen }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-green-700 text-white">
      <div className="max-w-6xl mx-auto px-6 h-9 flex items-center justify-end">
        <div className="relative" ref={ref}>
          <button onClick={() => setOpen(o => !o)} className="flex items-center gap-1.5 text-xs font-medium text-green-100 hover:text-white transition-colors py-1 px-2 rounded hover:bg-green-600">
            <Users size={13} />
            Learn about the creators
            <ChevronDown size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
          {open && (
            <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 w-52 z-50">
              <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wide">TTL Summer Camp 2026</div>
              {CREATOR_SCREENS.map(c => (
                <button key={c.screen} onClick={() => { onNavigate(c.screen); setOpen(false) }} className={`w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 ${screen === c.screen ? 'text-green-700 font-medium' : ''}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${c.screen === 'creator-muhssina' ? 'bg-pink-400' : c.screen === 'creator-sincere' ? 'bg-green-400' : 'bg-red-400'}`} />
                  {c.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
