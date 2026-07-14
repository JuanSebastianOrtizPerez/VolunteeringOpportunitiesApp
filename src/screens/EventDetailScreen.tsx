import { useState } from 'react'
import { MapPin, Clock, Users, ArrowLeft, Send, CheckCircle } from 'lucide-react'
import VineBg from '../components/VineBg'
import { supabase } from '../lib/supabase'
import { CATEGORY_ICONS, CATEGORY_COLORS } from '../lib/constants'
import { useAuth } from '../context/AuthContext'
import type { Event, Category, Screen } from '../types'

interface Props { event: Event | null; onNavigate: (screen: Screen) => void }

export default function EventDetailScreen({ event, onNavigate }: Props) {
  const { volunteerProfile } = useAuth()
  const [form, setForm] = useState({ phone: '', availability: '', motivation: '' })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  if (!event) return <div className="min-h-screen flex items-center justify-center"><p className="text-gray-400">No event selected.</p></div>

  const cat = event.category as Exclude<Category, 'All'>

  async function handleApply(e: React.FormEvent) {
    e.preventDefault()
    if (!volunteerProfile) return
    setError('')
    setSubmitting(true)
    const { error: err } = await supabase.from('applications').insert({
      event_id: event!.id, volunteer_id: volunteerProfile.id,
      first_name: volunteerProfile.first_name, last_name: volunteerProfile.last_name,
      email: volunteerProfile.email, phone: form.phone, availability: form.availability, motivation: form.motivation,
    })
    setSubmitting(false)
    if (err) { setError(err.code === '23505' ? 'You have already applied for this opportunity.' : err.message) }
    else setSuccess(true)
  }

  if (success) return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 relative">
      <VineBg opacity={0.05} />
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100 p-10 max-w-sm w-full text-center relative z-10">
        <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle size={28} className="text-green-600" /></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Application sent!</h2>
        <p className="text-sm text-gray-500 mb-6">The organization will reach out to you at {volunteerProfile?.email}.</p>
        <button onClick={() => onNavigate('browse')} className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-green-700 transition">Browse more opportunities</button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <VineBg opacity={0.04} />
      <div className="max-w-3xl mx-auto px-6 py-8 relative z-10">
        <button onClick={() => onNavigate('browse')} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm mb-6 transition-colors"><ArrowLeft size={16} /> Back to browse</button>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100 overflow-hidden mb-6">
          <img src={event.image || 'https://images.pexels.com/photos/5905445/pexels-photo-5905445.jpeg?auto=compress&cs=tinysrgb&w=800'} alt={event.title} className="w-full h-56 object-cover" />
          <div className="p-6">
            <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${CATEGORY_COLORS[cat]}`}>{CATEGORY_ICONS[cat]} {cat}</span>
            <h1 className="text-2xl font-semibold text-gray-900 mt-3 mb-4">{event.title}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
              {[{ icon: <MapPin size={14} />, label: 'Location', value: event.location }, { icon: <Clock size={14} />, label: 'Commitment', value: event.commitment }, { icon: <Users size={14} />, label: 'Spots', value: `${event.spots} open` }].map(item => (
                <div key={item.label} className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">{item.icon} {item.label}</div>
                  <p className="text-sm font-medium text-gray-800">{item.value}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">{event.description}</p>
            {event.skills.length > 0 && <div className="flex flex-wrap gap-2">{event.skills.map(s => <span key={s} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{s}</span>)}</div>}
          </div>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-5">Apply for this opportunity</h2>
          <form onSubmit={handleApply} className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Phone number</label><input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+1 (555) 000-0000" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 transition" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Availability</label><input value={form.availability} onChange={e => setForm(f => ({ ...f, availability: e.target.value }))} required placeholder="e.g. Weekends, Tuesday evenings" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 transition" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Why do you want to volunteer?</label><textarea value={form.motivation} onChange={e => setForm(f => ({ ...f, motivation: e.target.value }))} required rows={4} placeholder="Tell us what motivates you to give your time…" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 transition resize-none" /></div>
            {error && <p className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-xl">{error}</p>}
            <button type="submit" disabled={submitting} className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-green-700 transition disabled:opacity-60 flex items-center justify-center gap-2">
              <Send size={15} />{submitting ? 'Submitting…' : 'Submit application'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
