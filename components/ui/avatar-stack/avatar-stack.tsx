// Dependencies: motion, lucide-react
// Source: TTRPG (NpcAvatars)

'use client'

import { useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { HelpCircle } from 'lucide-react'

export interface AvatarStackMember {
  id: string
  name: string
  portrait: string | null
  color: string
  status?: string
}

export interface AvatarStackProps {
  members: AvatarStackMember[]
  selectedId?: string
  onSelect?: (id: string) => void
  size?: number
  maxVisible?: number
}

const statusColors: Record<string, string> = {
  active: '#22c55e',
  away: '#f59e0b',
  offline: '#64748b',
}

export default function AvatarStack({ members, selectedId, onSelect, size = 40, maxVisible = 8 }: AvatarStackProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const sliced = members.slice(0, Math.min(maxVisible + 1, members.length + 1))
  const exceedsMax = members.length > maxVisible

  const handleKeyEnter = (e: KeyboardEvent<HTMLDivElement>, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') onSelect?.(members[index].id)
  }

  return (
    <div className="relative flex items-center px-3 py-2">
      {sliced.map((member, index) => {
        const isHovered = hoveredIndex === index
        const isSelected = member.id === selectedId
        const isOverflow = exceedsMax && index === maxVisible
        const zIndex = isHovered ? sliced.length + 1 : index
        const shouldScale = isHovered && !isOverflow
        const statusDotColor = statusColors[member.status ?? ''] ?? '#64748b'

        return (
          <motion.div
            key={member.id}
            role="button"
            aria-label={member.name}
            className="relative cursor-pointer rounded-full outline-none"
            style={{ width: size, height: size, zIndex, marginLeft: index === 0 ? 0 : -(size * 0.1) }}
            tabIndex={0}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onFocus={() => setHoveredIndex(index)}
            onBlur={() => setHoveredIndex(null)}
            onKeyDown={(e) => handleKeyEnter(e, index)}
            onClick={() => { if (!isOverflow) onSelect?.(member.id) }}
            animate={{ scale: shouldScale ? 1.25 : isSelected ? 1.1 : 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <div
              className="h-full w-full overflow-hidden rounded-full"
              style={{
                border: `2px solid ${isSelected ? member.color : '#0f0f1a'}`,
                boxShadow: isSelected ? `0 0 10px ${member.color}44` : 'none',
              }}
            >
              {isOverflow ? (
                <div className="flex h-full w-full items-center justify-center text-[0.6rem] font-semibold" style={{ background: '#1a1a2e', color: '#64748b' }}>
                  +{members.length - maxVisible}
                </div>
              ) : member.portrait ? (
                <img src={member.portrait} alt={member.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center" style={{ background: '#1a1a2e' }}>
                  <HelpCircle size={size * 0.4} style={{ color: '#64748b' }} />
                </div>
              )}
            </div>

            {!isOverflow && member.status && (
              <div className="absolute rounded-full" style={{ width: size * 0.22, height: size * 0.22, bottom: 0, right: 0, background: statusDotColor, border: '2px solid #0f0f1a' }} />
            )}

            <AnimatePresence>
              {shouldScale && (
                <motion.div role="tooltip" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.15 }} className="absolute left-1/2 top-full z-50 mt-1.5">
                  <div className="-translate-x-1/2 transform whitespace-nowrap rounded-md px-2 py-1 text-[0.6rem] font-medium" style={{ background: '#1a1a2e', border: '1px solid #2a2a3e', color: '#e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }}>
                    {member.name}
                    {member.status && <span className="ml-1.5 text-[0.5rem]" style={{ color: statusDotColor }}>{member.status}</span>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}
