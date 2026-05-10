// Dependencies: lucide-react
// Source: TTRPG

'use client'

import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export type KpiTone = 'default' | 'gold' | 'success' | 'warning' | 'danger' | 'blue' | 'purple' | 'pink'
export type KpiSize = 'sm' | 'md' | 'lg'
export type KpiTrend = 'up' | 'down' | 'flat'

export interface KpiCardProps {
  label: string
  value: string | number
  delta?: number | string
  trend?: KpiTrend
  caption?: string
  icon?: React.ReactNode
  tone?: KpiTone
  accentColor?: string
  size?: KpiSize
  compact?: boolean
  className?: string
  onClick?: () => void
}

const toneMap: Record<KpiTone, { bg: string; border: string; value: string; deltaUp: string; deltaDown: string }> = {
  default: { bg: '#1a1a2e', border: '#2a2a3e', value: '#e2e8f0', deltaUp: '#22c55e', deltaDown: '#ef4444' },
  gold: { bg: 'rgba(218,165,32,0.08)', border: 'rgba(218,165,32,0.25)', value: '#daa520', deltaUp: '#22c55e', deltaDown: '#ef4444' },
  success: { bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.25)', value: '#22c55e', deltaUp: '#22c55e', deltaDown: '#ef4444' },
  warning: { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)', value: '#f59e0b', deltaUp: '#22c55e', deltaDown: '#ef4444' },
  danger: { bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.25)', value: '#ef4444', deltaUp: '#22c55e', deltaDown: '#ef4444' },
  blue: { bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.25)', value: '#60a5fa', deltaUp: '#22c55e', deltaDown: '#ef4444' },
  purple: { bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.25)', value: '#a78bfa', deltaUp: '#22c55e', deltaDown: '#ef4444' },
  pink: { bg: 'rgba(255,180,220,0.08)', border: 'rgba(255,180,220,0.25)', value: '#ffb4dc', deltaUp: '#22c55e', deltaDown: '#ef4444' },
}

const sizeMap: Record<KpiSize, { pad: string; label: string; value: string; caption: string }> = {
  sm: { pad: '10px', label: '0.55rem', value: '1rem', caption: '0.5rem' },
  md: { pad: '12px', label: '0.6rem', value: '1.125rem', caption: '0.55rem' },
  lg: { pad: '16px', label: '0.75rem', value: '1.5rem', caption: '0.6rem' },
}

export default function KpiCard({
  label, value, delta, trend = 'flat', caption, icon, tone = 'default', accentColor, size = 'sm', compact = false, className, onClick,
}: KpiCardProps) {
  const baseTone = toneMap[tone]
  const t = accentColor
    ? { ...baseTone, bg: `${accentColor}14`, border: `${accentColor}40`, value: accentColor }
    : baseTone
  const s = sizeMap[size]
  const deltaValue = typeof delta === 'number' ? `${delta > 0 ? '+' : ''}${delta}%` : delta
  const isUp = trend === 'up'
  const isDown = trend === 'down'
  const DeltaIcon = isUp ? TrendingUp : isDown ? TrendingDown : Minus

  return (
    <div
      className={`relative overflow-hidden rounded-xl transition-all duration-150 ${!compact ? 'min-h-[60px]' : ''} ${onClick ? 'cursor-pointer' : ''} ${className || ''}`}
      style={{ padding: s.pad, background: t.bg, border: `1px solid ${t.border}` }}
      onClick={onClick}
    >
      <div className="relative flex items-start justify-between gap-2">
        <div className="space-y-0.5">
          <div className="font-medium" style={{ fontSize: s.label, color: '#94a3b8' }}>{label}</div>
          <div className="font-semibold tracking-tight tabular-nums" style={{ fontSize: s.value, color: t.value }}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
          {caption && <div style={{ fontSize: s.caption, color: '#94a3b8' }}>{caption}</div>}
        </div>

        <div className="flex items-center gap-1.5">
          {typeof deltaValue !== 'undefined' && (
            <div className="flex items-center gap-0.5 font-medium" style={{ fontSize: '0.6rem', color: isUp ? t.deltaUp : isDown ? t.deltaDown : '#94a3b8' }}>
              <DeltaIcon size={12} />
              {deltaValue}
            </div>
          )}
          {icon && (
            <div className="rounded-full p-1" style={{ background: t.border, color: t.value }}>
              {icon}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
