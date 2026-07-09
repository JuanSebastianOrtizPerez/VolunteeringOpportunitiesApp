import { ArrowRight, Heart, Leaf, BookOpen, Users } from 'lucide-react'
import type { Screen } from '../types'

interface Props {
  onNavigate: (screen: Screen) => void
}

export default function LandingScreen({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold text-green-700 tracking-tight">Gively</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('login')}
              className="text-sm text-gray-600 hover:text-gray-900 px-4 py-2 transition-colors"
            >
              Sign in
            </button>
            <button
              onClick={() => onNavigate('signup-volunteer')}
              className="text-sm bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors"
            >
              Get started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm font-medium px-4 py-2 rounded-full mb-8 border border-green-100">
            <Heart size={14} className="fill-green-600" />
            Community volunteering platform
          </div>
          <h1 className="font-playfair text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-6">
            Give your time{' '}
            <span className="text-green-600">where it matters.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
            Browse open volunteer opportunities below. Sign up to apply and make a lasting impact in your community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('signup-volunteer')}
              className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-700 transition-all hover:shadow-lg hover:shadow-green-200 text-base"
            >
              I want to volunteer
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => onNavigate('signup-company')}
              className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 px-8 py-4 rounded-full font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all text-base"
            >
              Post opportunities
            </button>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Leaf size={22} className="text-emerald-600" />,
              bg: 'bg-emerald-50',
              title: 'Environment',
              desc: 'Plant trees, clean parks, and restore green spaces in your city.',
            },
            {
              icon: <BookOpen size={22} className="text-sky-600" />,
              bg: 'bg-sky-50',
              title: 'Education',
              desc: 'Tutor students, lead workshops, and open doors to opportunity.',
            },
            {
              icon: <Users size={22} className="text-amber-600" />,
              bg: 'bg-amber-50',
              title: 'Community',
              desc: 'Connect neighbors, organize events, and build belonging.',
            },
          ].map((f) => (
            <div key={f.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all">
              <div className={`${f.bg} w-10 h-10 rounded-xl flex items-center justify-center mb-4`}>
                {f.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Minimal preview of opportunities */}
      <section className="pb-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto pt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">Open opportunities</h2>
            <button
              onClick={() => onNavigate('login')}
              className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
            >
              Browse all <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'Youth Leadership Workshop', org: 'Higher Fire', cat: 'Education', img: 'https://images.pexels.com/photos/5905445/pexels-photo-5905445.jpeg?auto=compress&cs=tinysrgb&w=400' },
              { title: 'Urban Reforestation Crew', org: 'GreenCity Alliance', cat: 'Environment', img: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=400' },
              { title: 'Community Health Fair', org: 'Bronx Community Health', cat: 'Health', img: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=400' },
            ].map((item) => (
              <div
                key={item.title}
                onClick={() => onNavigate('login')}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <img src={item.img} alt={item.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-full">{item.cat}</span>
                  <h3 className="font-semibold text-gray-900 mt-2 text-sm">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{item.org}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button
              onClick={() => onNavigate('signup-volunteer')}
              className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-green-700 transition-all"
            >
              Sign up to see all <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-lg font-bold text-green-700">Gively</span>
          <p className="text-sm text-gray-400">Making giving accessible to everyone.</p>
        </div>
      </footer>
    </div>
  )
}
