// Dependencies: (none)
// Source: TTRPG

'use client'

export type ChipVariant = 'default' | 'success' | 'danger' | 'warning' | 'info' | 'purple' | 'custom'

const variantStyles: Record<Exclude<ChipVariant, 'custom'>, { bg: string; text: string; border: string }> = {
  default: { bg: '#1a1a2e', text: '#94a3b8', border: '#2a2a3e' },
  success: { bg: 'rgba(34,197,94,0.12)', text: '#22c55e', border: 'rgba(34,197,94,0.3)' },
  danger: { bg: 'rgba(239,68,68,0.12)', text: '#ef4444', border: 'rgba(239,68,68,0.3)' },
  warning: { bg: 'rgba(245,158,11,0.12)', text: '#f59e0b', border: 'rgba(245,158,11,0.3)' },
  info: { bg: 'rgba(96,165,250,0.12)', text: '#60a5fa', border: 'rgba(96,165,250,0.3)' },
  purple: { bg: 'rgba(167,139,250,0.12)', text: '#a78bfa', border: 'rgba(167,139,250,0.3)' },
}

export interface AvatarChipProps {
  label: string
  portrait?: string | null
  icon?: React.ReactNode
  variant?: ChipVariant
  customColor?: string
  size?: 'xs' | 'sm' | 'md'
  onClick?: () => void
}

export function AvatarChip({
  label, portrait, icon, variant = 'default', customColor, size = 'sm', onClick,
}: AvatarChipProps) {
  const styles = variant === 'custom' && customColor
    ? { bg: `${customColor}18`, text: customColor, border: `${customColor}44` }
    : variantStyles[variant === 'custom' ? 'default' : variant]

  const avatarSize = size === 'xs' ? 14 : size === 'sm' ? 18 : 22
  const fontSize = size === 'xs' ? '0.55rem' : size === 'sm' ? '0.6rem' : '0.7rem'
  const padding = size === 'xs' ? '1px 6px 1px 2px' : size === 'sm' ? '2px 8px 2px 3px' : '3px 10px 3px 4px'

  return (
    <button
      onClick={onClick}
      className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full transition-all duration-150"
      style={{ background: styles.bg, border: `1px solid ${styles.border}`, padding }}
    >
      {portrait ? (
        <img src={portrait} alt={label} className="shrink-0 rounded-full object-cover" style={{ width: avatarSize, height: avatarSize }} />
      ) : icon ? (
        <span className="flex shrink-0 items-center justify-center rounded-full" style={{ width: avatarSize, height: avatarSize, color: styles.text }}>{icon}</span>
      ) : (
        <span className="flex shrink-0 items-center justify-center rounded-full text-[0.5rem] font-bold" style={{ width: avatarSize, height: avatarSize, background: `${styles.text}22`, color: styles.text }}>{label[0]}</span>
      )}
      <span className="whitespace-nowrap font-medium" style={{ fontSize, color: styles.text }}>{label}</span>
    </button>
  )
}

export function ChipRow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex flex-wrap gap-1.5 ${className ?? ''}`}>{children}</div>
}

export default AvatarChip
