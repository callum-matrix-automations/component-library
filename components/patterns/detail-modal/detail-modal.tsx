// Dependencies: lucide-react
// Source: TTRPG (AppearanceModal — image with categorized text details)

'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

export interface DetailCategory {
  title: string
  fields: { label: string; value: string }[]
}

export interface DetailModalProps {
  name: string
  subtitle: string
  portrait?: string | null
  summary?: string
  categories: DetailCategory[]
  accentColor?: string
  stats?: { label: string; value: number; max?: number; color?: string }[]
  badge?: string
  onClose: () => void
}

export default function DetailModal({
  name, subtitle, portrait, summary, categories, accentColor = '#60a5fa', stats, badge, onClose,
}: DetailModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)

  useEffect(() => { requestAnimationFrame(() => setVisible(true)) }, [])
  const handleClose = useCallback(() => { setClosing(true); setTimeout(onClose, 200) }, [onClose])
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [handleClose])

  const isOpen = visible && !closing

  return createPortal(
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: isOpen ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0)',
        backdropFilter: isOpen ? 'blur(6px)' : 'blur(0px)',
        transition: 'background 200ms ease, backdrop-filter 200ms ease',
      }}
      onClick={(e) => { if (e.target === backdropRef.current) handleClose() }}
    >
      <div
        className="relative mx-4 w-full max-w-3xl overflow-hidden rounded-2xl"
        style={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.97) translateY(12px)',
          transition: 'opacity 200ms ease, transform 200ms ease',
        }}
      >
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 z-20 flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg"
          style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid #2a2a3e', color: '#94a3b8' }}
          aria-label="Close"
        >
          <X size={14} />
        </button>

        <div className="rounded-2xl p-6 md:p-8" style={{ background: 'rgba(15, 15, 26, 0.85)', border: '1px solid #2a2a3e', backdropFilter: 'blur(24px)' }}>
          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            {/* Left — Profile */}
            <div className="space-y-4">
              <div className="relative flex flex-col overflow-hidden rounded-2xl" style={{ background: 'rgba(20, 15, 30, 0.6)', border: '1px solid #2a2a3e', backdropFilter: 'blur(16px)' }}>
                <div className="relative w-full" style={{ aspectRatio: '3/4' }}>
                  {portrait ? (
                    <img src={portrait} alt={name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center text-5xl font-bold" style={{ background: '#0f0f1a', color: '#64748b' }}>{name[0]}</div>
                  )}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(20, 15, 30, 0.95) 100%)' }} />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="text-lg font-bold tracking-tight text-white" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>{name}</h3>
                    <p className="mt-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.25em]" style={{ color: `${accentColor}cc` }}>{subtitle}</p>
                    {badge && (
                      <span className="mt-2 inline-block rounded-full px-2.5 py-1 text-[0.6rem] font-semibold" style={{ background: `${accentColor}22`, color: accentColor, border: `1px solid ${accentColor}44` }}>{badge}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Stats */}
              {stats && stats.length > 0 && (
                <div className="space-y-2.5 rounded-xl p-4" style={{ background: 'rgba(20, 15, 30, 0.6)', border: '1px solid #2a2a3e' }}>
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em]" style={{ color: accentColor }}>{name.split(' ')[0]}&apos;s Metrics</p>
                  {stats.map((stat, i) => {
                    const pct = stat.max ? (stat.value / stat.max) * 100 : stat.value
                    const barColor = stat.color ?? accentColor
                    return (
                      <div key={i}>
                        <div className="mb-0.5 flex items-center justify-between text-[0.6rem]">
                          <span style={{ color: '#64748b' }}>{stat.label}</span>
                          <span className="font-semibold tabular-nums" style={{ color: '#94a3b8' }}>{stat.value}{stat.max ? `/${stat.max}` : '%'}</span>
                        </div>
                        <div className="h-1 w-full rounded-full" style={{ background: '#1a1a2e' }}>
                          <div className="h-1 rounded-full transition-all" style={{ width: `${Math.min(pct, 100)}%`, background: barColor }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Right — Categorized details */}
            <div className="max-h-[65vh] space-y-3 overflow-y-auto pr-1">
              {summary && (
                <div className="rounded-xl p-4" style={{ background: 'rgba(20, 15, 30, 0.6)', border: '1px solid #2a2a3e' }}>
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em]" style={{ color: '#64748b' }}>Overview</p>
                  <p className="mt-1.5 text-xs italic leading-relaxed" style={{ color: '#94a3b8' }}>{summary}</p>
                </div>
              )}

              {categories.map((category) => {
                const visibleFields = category.fields.filter((f) => f.value && f.value !== '—')
                if (visibleFields.length === 0) return null
                return (
                  <div key={category.title} className="group relative overflow-hidden rounded-xl p-4 transition-all" style={{ background: 'rgba(20, 15, 30, 0.6)', border: '1px solid #2a2a3e' }}>
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: `linear-gradient(135deg, ${accentColor}06 0%, transparent 100%)` }} />
                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em]" style={{ color: '#64748b' }}>{category.title}</p>
                    <div className="mt-1.5 space-y-1.5">
                      {visibleFields.map((field) => (
                        <div key={field.label} className="flex items-start gap-2 rounded-lg px-2 py-1.5" style={{ background: 'rgba(10, 10, 20, 0.3)' }}>
                          <span className="w-24 shrink-0 text-[0.6rem] font-medium" style={{ color: '#64748b' }}>{field.label}</span>
                          <span className="flex-1 text-[0.6rem] leading-relaxed" style={{ color: '#94a3b8' }}>{field.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
