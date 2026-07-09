import { useState, useEffect } from 'react'
import { MapPin, Clock, Users, ChevronRight, Globe, Mail, Phone, ChevronDown, ChevronUp } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { CATEGORY_ICONS, CATEGORY_COLORS } from '../lib/constants'
import { useAuth } from '../context/AuthContext'
import type { Event, Application, Category, Screen } from '../types'

interface Props { onNavigate: (screen: Screen) => void }

export default function CompanyDashScreen({ onNavigate }: Props) {
  const { companyProfile } = useAuth()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [activeEvent, setActiveEvent] = useState<Event | null>(null)
  const [applicants, setApplicants] = useState<Application[]>([])
  const [loadingApplicants, setLoadingApplicants] = useState(false)
  const [expandedApplicant, setExpandedApplicant] = useState<string | null>(null)

  useEffect(() => {
    if (!companyProfile) return
    supabase.from('events').select('*').eq('company_id', companyProfile.id).order('posted_at', { ascending: false })
      .then(({ data }) => {
        const evs = data ?? []
        setEvents(evs)
        if (evs.length > 0) selectEvent(evs[0])
        setLoading(false)
      })
  }, [companyProfile])

  async function selectEvent(event: Event) {
    setActiveEvent(event)
    setExpandedApplicant(null)
    setLoadingApplicants(true)
    const { data } = await supabase.from('applications').select('*').eq('event_id', event.id).order('applied_at', { ascending: false })
    setApplicants(data ?? [])
    setLoadingApplicants(false)
  }

  const totalSpots = events.reduce((s, e) => s + e.spots, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-6 pt-8 pb-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-green-700 font-medium uppercase tracking-wide mb-1">Organization dashboard</p>
          <h1 className="text-2xl font-semibold text-gray-900">{companyProfile?.company_name}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-400">
            {companyProfile?.website && <span className="flex items-center gap-1"><Globe size={13} />{companyProfile.website}</span>}
            <span className="flex items-center gap-1"><Mail size={13} />{companyProfile?.email}</span>
            {companyProfile?.phone && <span className="flex items-center gap-1"><Phone size={13} />{companyProfile.phone}</span>}
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[{ label: 'Active events', value: events.length }, { label: 'Total spots', value: totalSpots }, { label: 'Total applicants', value: applicants.length }].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4 text-center"><p className="text-3xl font-bold text-gray-900">{s.value}</p><p className="text-xs text-gray-500 mt-1">{s.label}</p></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 text-sm">Your posts</h2>
              <button onClick={() => onNavigate('post-opportunity')} className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-full hover:bg-green-700 transition">+ New</button>
            </div>
            {loading ? (
              <div className="p-4 space-y-2">{[...Array(3)].map((_, i) => <div key={i} className="h-14 bg-gray-50 rounded-xl animate-pulse" />)}</div>
            ) : events.length === 0 ? (
              <div className="py-10 text-center text-gray-400 text-sm px-4"><p>No posts yet.</p><button onClick={() => onNavigate('post-opportunity')} className="mt-3 text-green-600 font-medium hover:text-green-700">Post your first opportunity</button></div>
            ) : (
              events.map(evt => {
                const cat = evt.category as Exclude<Category, 'All'>
                return (
                  <button key={evt.id} onClick={() => selectEvent(evt)} className={`w-full text-left px-5 py-3.5 border-b border-gray-50 last:border-0 hover:bg-gray-50/70 transition-colors flex items-center justify-between group ${activeEvent?.id === evt.id ? 'bg-green-50/50' : ''}`}>
                    <div className="flex-1 min-w-0">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${CATEGORY_COLORS[cat]} mb-1`}>{CATEGORY_ICONS[cat]} {cat}</span>
                      <p className="text-sm font-medium text-gray-900 truncate">{evt.title}</p>
                    </div>
                    <ChevronRight size={14} className="text-gray-400 shrink-0 ml-2" />
                  </button>
                )
              })
            )}
          </div>
          <div className="lg:col-span-2 space-y-4">
            {activeEvent ? (
              <>
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${CATEGORY_COLORS[activeEvent.category as Exclude<Category, 'All'>]}`}>{CATEGORY_ICONS[activeEvent.category as Exclude<Category, 'All'>]} {activeEvent.category}</span>
                      <h2 className="text-lg font-semibold text-gray-900 mt-2">{activeEvent.title}</h2>
                    </div>
                    <div className="text-right shrink-0"><p className="text-2xl font-bold text-green-700">{applicants.length}</p><p className="text-xs text-gray-400">of {activeEvent.spots} spots</p></div>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><MapPin size={12} />{activeEvent.location}</span>
                    <span className="flex items-center gap-1"><Clock size={12} />{activeEvent.commitment}</span>
                    <span className="flex items-center gap-1"><Users size={12} />{activeEvent.spots} spots</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{activeEvent.description}</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-100"><h3 className="font-semibold text-gray-900 text-sm">Applicants — {loadingApplicants ? '…' : applicants.length} received</h3></div>
                  {loadingApplicants ? (
                    <div className="p-4 space-y-2">{[...Array(3)].map((_, i) => <div key={i} className="h-12 bg-gray-50 rounded-xl animate-pulse" />)}</div>
                  ) : applicants.length === 0 ? (
                    <div className="py-10 text-center text-gray-400 text-sm">No applicants yet.</div>
                  ) : (
                    <>
                      <div className="grid grid-cols-3 px-5 py-2 text-xs font-medium text-gray-400 border-b border-gray-50"><span>Name</span><span>Email</span><span>Applied</span></div>
                      {applicants.map(applicant => (
                        <div key={applicant.id} className="border-b border-gray-50 last:border-0">
                          <button onClick={() => setExpandedApplicant(expandedApplicant === applicant.id ? null : applicant.id)} className="w-full grid grid-cols-3 px-5 py-3.5 text-left hover:bg-gray-50/70 transition-colors">
                            <span className="text-sm font-medium text-gray-900">{applicant.first_name} {applicant.last_name}</span>
                            <span className="text-sm text-gray-500 truncate">{applicant.email}</span>
                            <span className="text-sm text-gray-400 flex items-center gap-1 justify-between">{new Date(applicant.applied_at).toLocaleDateString()}{expandedApplicant === applicant.id ? <ChevronUp size={13} /> : <ChevronDown size={13} />}</span>
                          </button>
                          {expandedApplicant === applicant.id && (
                            <div className="px-5 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50/50">
                              {applicant.phone && <div><p className="text-xs text-gray-400 mb-0.5">Phone</p><a href={`tel:${applicant.phone}`} className="text-sm text-green-600 hover:underline">{applicant.phone}</a></div>}
                              <div><p className="text-xs text-gray-400 mb-0.5">Availability</p><p className="text-sm text-gray-700">{applicant.availability}</p></div>
                              <div className="sm:col-span-2"><p className="text-xs text-gray-400 mb-0.5">Why they want to volunteer</p><p className="text-sm text-gray-700">{applicant.motivation}</p></div>
                              <div><a href={`mailto:${applicant.email}?subject=Your application to ${activeEvent.title}`} className="text-sm text-green-600 font-medium hover:text-green-700 hover:underline">Reply to {applicant.first_name}</a></div>
                            </div>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 flex items-center justify-center h-64 text-gray-400 text-sm">Select an event to see details</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
