// Dependencies: motion, lucide-react
// Source: TTRPG (GlassProfile + GlassCard + GlassHighlight + GlassLinkRow)

'use client'

import { motion } from 'motion/react'
import { ArrowUpRight, User } from 'lucide-react'

export function GlassCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className ?? ''}`}
      style={{ background: 'rgba(15, 15, 26, 0.85)', border: '1px solid #2a2a3e', backdropFilter: 'blur(24px)' }}
    >
      <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 50%)' }} />
      <div className="relative">{children}</div>
    </div>
  )
}

export function GlassHighlight({ title, children, accentColor }: { title: string; children: React.ReactNode; accentColor?: string }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="group relative overflow-hidden rounded-xl p-4 transition-all"
      style={{ background: 'rgba(20, 15, 30, 0.6)', border: '1px solid #2a2a3e', backdropFilter: 'blur(12px)' }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'linear-gradient(135deg, rgba(200,164,78,0.04) 0%, transparent 100%)' }} />
      <div className="relative space-y-1.5">
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em]" style={{ color: accentColor ?? '#64748b' }}>{title}</p>
        <div className="text-xs leading-relaxed" style={{ color: '#94a3b8' }}>{children}</div>
      </div>
    </motion.div>
  )
}

export interface ProfileCardProps {
  portrait?: string | null
  name: string
  subtitle: string
  description?: string
  accentColor?: string
  badge?: React.ReactNode
  fullBody?: boolean
  children?: React.ReactNode
}

export function ProfileCard({ portrait, name, subtitle, description, accentColor, badge, fullBody = false, children }: ProfileCardProps) {
  const color = accentColor ?? '#C8A44E'

  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl" style={{ background: 'rgba(20, 15, 30, 0.6)', border: '1px solid #2a2a3e', backdropFilter: 'blur(16px)' }}>
      {fullBody ? (
        <div className="relative w-full" style={{ aspectRatio: '3/4' }}>
          {portrait ? (
            <img src={portrait} alt={name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center" style={{ background: '#0f0f1a' }}>
              <User size={64} style={{ color: '#64748b' }} />
            </div>
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(20, 15, 30, 0.95) 100%)' }} />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <h3 className="text-lg font-bold tracking-tight text-white" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>{name}</h3>
            <p className="mt-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.25em]" style={{ color: `${color}cc` }}>{subtitle}</p>
            {badge && <div className="mt-2">{badge}</div>}
          </div>
        </div>
      ) : (
        <div className="p-6">
          <div className="absolute inset-x-0 top-0 h-32 pointer-events-none" style={{ background: `linear-gradient(180deg, ${color}15 0%, transparent 100%)` }} />
          <div className="relative flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl" style={{ background: `${color}20` }} />
              {portrait ? (
                <img src={portrait} alt={name} className="relative h-24 w-24 rounded-full object-cover" style={{ border: `2px solid ${color}66`, boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }} />
              ) : (
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full text-2xl font-bold" style={{ background: '#1a1a2e', border: `2px solid ${color}66`, color: '#64748b' }}>{name[0]}</div>
              )}
            </div>
            <h3 className="text-lg font-bold tracking-tight text-white">{name}</h3>
            <p className="mt-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.25em]" style={{ color: `${color}aa` }}>{subtitle}</p>
            {description && <p className="mx-auto mt-3 max-w-xs text-xs leading-relaxed" style={{ color: '#94a3b8' }}>{description}</p>}
            {badge && <div className="mt-3">{badge}</div>}
          </div>
        </div>
      )}

      {fullBody && description && (
        <div className="px-5 pb-2"><p className="text-xs leading-relaxed" style={{ color: '#94a3b8' }}>{description}</p></div>
      )}
      {children && <div className="px-5 pb-5">{children}</div>}
    </div>
  )
}

export function GlassLinkRow({ icon, label, detail, accentColor, onClick }: { icon: React.ReactNode; label: string; detail: string; accentColor?: string; onClick?: () => void }) {
  return (
    <motion.div whileHover={{ scale: 1.01, y: -1 }} whileTap={{ scale: 0.99 }} className="group flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 transition-all" style={{ background: 'rgba(20, 15, 30, 0.7)', border: '1px solid #2a2a3e' }} onClick={onClick}>
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: '#1a1a2e', border: '1px solid #2a2a3e', color: accentColor ?? '#94a3b8' }}>{icon}</span>
        <div>
          <p className="text-xs font-semibold text-white">{label}</p>
          <p className="text-[0.6rem]" style={{ color: accentColor ?? '#64748b' }}>{detail}</p>
        </div>
      </div>
      <ArrowUpRight size={14} className="transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: '#64748b' }} />
    </motion.div>
  )
}

export default ProfileCard
