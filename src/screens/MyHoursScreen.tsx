import { useState, useEffect } from 'react'
import { Clock, Calendar, Award, Star, Gift } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import type { HourEntry } from '../types'

export default function MyHoursScreen() {
  const { volunteerProfile } = useAuth()
  const [entries, setEntries] = useState<HourEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!volunteerProfile) return
    async function load() {
      const { data } = await supabase
        .from('hours_log')
        .select('*')
        .eq('volunteer_id', volunteerProfile!.id)
        .order('logged_at', { ascending: false })
      setEntries(data ?? [])
      setLoading(false)
    }
    load()
  }, [volunteerProfile])

  const totalHours = entries.reduce((s, e) => s + e.hours, 0)
  const badgeLevel = totalHours >= 20 ? 'Gold' : totalHours >= 10 ? 'Silver' : 'Bronze'
  const badgeColor = badgeLevel === 'Gold' ? 'text-yellow-600' : badgeLevel === 'Silver' ? 'text-gray-500' : 'text-amber-700'

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-6 pt-8 pb-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-green-700 font-medium uppercase tracking-wide mb-1">Your impact</p>
          <h1 className="text-2xl font-semibold text-gray-900">Service hours</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total hours', value: totalHours, icon: <Clock size={18} className="text-green-600" /> },
            { label: 'Events attended', value: entries.length, icon: <Calendar size={18} className="text-sky-600" /> },
            { label: 'Badge level', value: badgeLevel, icon: <Award size={18} className={badgeColor} /> },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Hours log */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Service log</h2>
            <span className="text-sm text-gray-400">{entries.length} entries</span>
          </div>

          {loading ? (
            <div className="p-6 space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-50 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : entries.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              <Gift size={32} className="mx-auto mb-3 opacity-40" />
              <p className="font-medium">No hours logged yet</p>
              <p className="text-sm mt-1">Apply to an opportunity and start giving!</p>
            </div>
          ) : (
            <>
              {entries.map(entry => (
                <div key={entry.id} className="px-6 py-4 border-b border-gray-50 last:border-0 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{entry.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{entry.org} · {entry.date}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={13} className="text-green-500" />
                    <span className="text-sm font-semibold text-green-700">{entry.hours}h</span>
                  </div>
                </div>
              ))}
              {/* Total */}
              <div className="px-6 py-4 bg-green-50 flex items-center justify-between">
                <span className="text-sm font-semibold text-green-800">Total</span>
                <div className="flex items-center gap-1.5">
                  <Star size={14} className="text-green-600 fill-green-600" />
                  <span className="text-sm font-bold text-green-800">{totalHours} hours</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
