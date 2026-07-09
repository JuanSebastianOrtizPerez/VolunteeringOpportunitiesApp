import { useState } from 'react'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { supabase } from '../lib/supabase'
import type { Screen } from '../types'

interface Props {
  onNavigate: (screen: Screen) => void
}

export default function SignupCompanyScreen({ onNavigate }: Props) {
  const [form, setForm] = useState({
    companyName: '', email: '', password: '', phone: '', website: '', description: '',
  })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { data, error: signUpErr } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    })

    if (signUpErr || !data.user) {
      setError(signUpErr?.message ?? 'Sign up failed')
      setLoading(false)
      return
    }

    const { error: profileErr } = await supabase.from('company_profiles').insert({
      id: data.user.id,
      company_name: form.companyName,
      email: form.email,
      phone: form.phone,
      website: form.website,
      description: form.description,
    })

    setLoading(false)
    if (profileErr) setError(profileErr.message)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="p-6">
        <button onClick={() => onNavigate('landing')} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm transition-colors">
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 pb-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md">
          <div className="mb-8">
            <span className="text-xl font-bold text-green-700">Gively</span>
            <h2 className="text-2xl font-semibold text-gray-900 mt-4">Register your organization</h2>
            <p className="text-gray-500 mt-1 text-sm">Post opportunities and find passionate volunteers.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Organization name</label>
              <input
                value={form.companyName} onChange={set('companyName')} required
                placeholder="Higher Fire"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
                type="email" value={form.email} onChange={set('email')} required
                placeholder="contact@yourorg.org"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'} value={form.password} onChange={set('password')} required
                  placeholder="min. 6 characters" minLength={6}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 transition"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                <input
                  value={form.phone} onChange={set('phone')}
                  placeholder="+1 (718) 555-0000"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Website</label>
                <input
                  value={form.website} onChange={set('website')}
                  placeholder="yourorg.org"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea
                value={form.description} onChange={set('description')}
                placeholder="Tell volunteers about your mission…"
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 transition resize-none"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-xl">{error}</p>
            )}

            <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-green-700 transition disabled:opacity-60 mt-2">
              {loading ? 'Creating account…' : 'Register organization'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Already registered?{' '}
              <button onClick={() => onNavigate('login')} className="text-green-600 font-medium hover:text-green-700">Sign in</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
