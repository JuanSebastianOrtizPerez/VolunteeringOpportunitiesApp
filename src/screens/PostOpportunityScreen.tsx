import { useState } from 'react'
import { ArrowLeft, CheckCircle, Plus, X } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import type { Category, Screen } from '../types'

interface Props { onNavigate: (screen: Screen) => void }

const CATEGORIES: Exclude<Category, 'All'>[] = ['Environment', 'Education', 'Health', 'Arts', 'Community']
const STOCK: Record<Exclude<Category, 'All'>, string> = {
  Environment: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=800',
  Education: 'https://images.pexels.com/photos/5905445/pexels-photo-5905445.jpeg?auto=compress&cs=tinysrgb&w=800',
  Health: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=800',
  Arts: 'https://images.pexels.com/photos/1053687/pexels-photo-1053687.jpeg?auto=compress&cs=tinysrgb&w=800',
  Community: 'https://images.pexels.com/photos/2990644/pexels-photo-2990644.jpeg?auto=compress&cs=tinysrgb&w=800',
}

export default function PostOpportunityScreen({ onNavigate }: Props) {
  const { companyProfile } = useAuth()
  const [form, setForm] = useState({ title: '', category: 'Community' as Exclude<Category, 'All'>, location: '', commitment: '', spots: '10', description: '' })
  const [skillInput, setSkillInput] = useState('')
  const [skills, setSkills] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const set = (f: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm(p => ({ ...p, [f]: e.target.value }))

  function addSkill() {
    const s = skillInput.trim()
    if (s && !skills.includes(s)) setSkills(p => [...p, s])
    setSkillInput('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!companyProfile) return
    setError('')
    setSubmitting(true)
    const { error: err } = await supabase.from('events').insert({
      company_id: companyProfile.id, title: form.title, category: form.category, location: form.location,
      commitment: form.commitment, spots: parseInt(form.spots) || 10, description: form.description,
      skills, image: STOCK[form.category],
    })
    setSubmitting(false)
    if (err) setError(err.message)
    else { setSuccess(true); setTimeout(() => onNavigate('company-dash'), 2500) }
  }

  const inp = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 transition bg-white"

  if (success) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl border border-gray-100 p-10 max-w-sm w-full text-center">
        <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle size={28} className="text-green-600" /></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Opportunity posted!</h2>
        <p className="text-sm text-gray-500">Your listing is live. Redirecting to your dashboard…</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-6 pt-8 pb-6">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => onNavigate('company-dash')} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm mb-4 transition-colors"><ArrowLeft size={16} /> Back to dashboard</button>
          <p className="text-xs text-green-700 font-medium uppercase tracking-wide mb-1">New listing</p>
          <h1 className="text-2xl font-semibold text-gray-900">Post a volunteer opportunity</h1>
          <p className="text-sm text-gray-400 mt-1">This will be listed publicly and attributed to {companyProfile?.company_name}.</p>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Opportunity title</label><input value={form.title} onChange={set('title')} required placeholder="e.g. Youth Coding Instructor" className={inp} /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label><select value={form.category} onChange={set('category')} className={inp}>{CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label><input value={form.location} onChange={set('location')} required placeholder="e.g. Brooklyn, NY" className={inp} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Commitment</label><input value={form.commitment} onChange={set('commitment')} required placeholder="e.g. 4 hrs/week" className={inp} /></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Available spots</label><input type="number" min="1" value={form.spots} onChange={set('spots')} required className={inp} /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label><textarea value={form.description} onChange={set('description')} required rows={4} placeholder="Describe the role…" className={inp + ' resize-none'} /></div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Skills needed</label>
            <div className="flex gap-2 mb-2">
              <input value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSkill() } }} placeholder="e.g. Facilitation" className={inp + ' flex-1'} />
              <button type="button" onClick={addSkill} className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3.5 py-2.5 rounded-xl transition"><Plus size={16} /></button>
            </div>
            {skills.length > 0 && <div className="flex flex-wrap gap-2">{skills.map(s => <span key={s} className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full">{s}<button type="button" onClick={() => setSkills(p => p.filter(x => x !== s))}><X size={12} /></button></span>)}</div>}
          </div>
          {error && <p className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-xl">{error}</p>}
          <button type="submit" disabled={submitting} className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-green-700 transition disabled:opacity-60">{submitting ? 'Posting…' : 'Post opportunity'}</button>
        </form>
      </div>
    </div>
  )
}
