import { useState } from 'react'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'
import GivelyLogo from '../components/GivelyLogo'
import VineBg from '../components/VineBg'
import { supabase } from '../lib/supabase'
import type { Screen } from '../types'

interface Props { onNavigate: (screen: Screen) => void }

export default function LoginScreen({ onNavigate }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) setError(error.message)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
      <VineBg opacity={0.05} />
      <div className="p-6 relative z-10">
        <button onClick={() => onNavigate('landing')} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm transition-colors">
          <ArrowLeft size={16} /> Back
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center px-6 pb-16 relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <GivelyLogo size={36} />
              <span className="text-xl font-bold text-green-700">Gively</span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Welcome back</h2>
            <p className="text-gray-500 mt-1 text-sm">Sign in to continue giving.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 transition" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {error && <p className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-xl">{error}</p>}
            <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-green-700 transition disabled:opacity-60 mt-2">
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
          <div className="mt-6 pt-6 border-t border-gray-100 text-center space-y-2">
            <p className="text-sm text-gray-500">New volunteer? <button onClick={() => onNavigate('signup-volunteer')} className="text-green-600 font-medium hover:text-green-700">Create account</button></p>
            <p className="text-sm text-gray-500">Posting opportunities? <button onClick={() => onNavigate('signup-company')} className="text-green-600 font-medium hover:text-green-700">Register your org</button></p>
          </div>
        </div>
      </div>
    </div>
  )
}
