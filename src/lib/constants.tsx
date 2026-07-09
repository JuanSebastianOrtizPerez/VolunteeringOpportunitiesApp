import { Leaf, BookOpen, Palette, Stethoscope, Users } from 'lucide-react'
import type { Category } from '../types'

export const CATEGORY_ICONS: Record<Exclude<Category, 'All'>, React.ReactNode> = {
  Environment: <Leaf size={14} />,
  Education: <BookOpen size={14} />,
  Health: <Stethoscope size={14} />,
  Arts: <Palette size={14} />,
  Community: <Users size={14} />,
}

export const CATEGORY_COLORS: Record<Exclude<Category, 'All'>, string> = {
  Environment: 'bg-emerald-100 text-emerald-800',
  Education: 'bg-sky-100 text-sky-800',
  Health: 'bg-rose-100 text-rose-800',
  Arts: 'bg-violet-100 text-violet-800',
  Community: 'bg-amber-100 text-amber-800',
}
