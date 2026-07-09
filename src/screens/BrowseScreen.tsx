import { useState, useEffect } from 'react'
import { Search, MapPin, Clock, Users } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { CATEGORY_ICONS, CATEGORY_COLORS } from '../lib/constants'
import { useAuth } from '../context/AuthContext'
import type { Event, Category, Screen } from '../types'

interface Props {
  onNavigate: (screen: Screen) => void
  onSelectEvent: (event: Event) => void
}

const CATEGORIES: Category[] = ['All', 'Environment', 'Education', 'Health', 'Arts', 'Community']

export default function BrowseScreen({ onNavigate, onSelectEvent }: Props) {
  const { volunteerProfile } = useAuth()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<Category>('All')

  useEffect(() => {
    supabase.from('events').select('*, company_profiles(company_name, email, website)').order('posted_at', { ascending: false })
      .then(({ data }) => { setEvents(data ?? []); setLoading(false) })
  }, [])

  const filtered = events.filter(e => {
    const matchCat = activeCategory === 'All' || e.category === activeCategory
    const matchSearch = !search || e.title.toLowerCase().includes(search.toLowerCase()) || e.description.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-6 pt-8 pb-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm text-gray-500 mb-1">Welcome back, {volunteerProfile?.first_name}</p>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Find your next opportunity</h1>
          <p className="text-sm text-gray-400">Explore open volunteer positions and apply directly from here.</p>
          <div className="mt-5 relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search opportunities…" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 transition" />
          </div>
          <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{cat}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse"><div className="h-44 bg-gray-100" /><div className="p-4 space-y-2"><div className="h-3 bg-gray-100 rounded w-1/3" /><div className="h-4 bg-gray-100 rounded w-3/4" /></div></div>)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400"><p className="text-lg font-medium">No opportunities found</p><p className="text-sm mt-1">Try a different search or category</p></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(event => {
              const cat = event.category as Exclude<Category, 'All'>
              const orgName = (event.company_profiles as any)?.company_name ?? 'Organization'
              return (
                <div key={event.id} onClick={() => { onSelectEvent(event); onNavigate('event-detail') }} className="bg-white rounded-2xl overflow-hidden border border-gray-100 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all group">
                  <div className="relative overflow-hidden h-44">
                    <img src={event.image || 'https://images.pexels.com/photos/5905445/pexels-photo-5905445.jpeg?auto=compress&cs=tinysrgb&w=600'} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-4">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${CATEGORY_COLORS[cat]}`}>{CATEGORY_ICONS[cat]} {cat}</span>
                    <p className="text-xs text-green-700 font-medium mt-2 mb-1">{orgName}</p>
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-2 line-clamp-2">{event.title}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-3">{event.description}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><MapPin size={11} />{event.location}</span>
                      <span className="flex items-center gap-1"><Clock size={11} />{event.commitment}</span>
                      <span className="flex items-center gap-1"><Users size={11} />{event.spots}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
