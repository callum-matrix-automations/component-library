// Dependencies: motion, lucide-react
// Source: TTRPG (GameSidebar)

'use client'

import { motion } from 'motion/react'
import { PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen } from 'lucide-react'

export interface SidebarNavItem {
  id: string
  name: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  group?: string
}

export interface SidebarNavProps {
  items: SidebarNavItem[]
  activeItem: string
  expanded: boolean
  onItemClick: (id: string) => void
  onToggleExpand: () => void
  side?: 'left' | 'right'
  accentColor?: string
}

const sidebarVariants = { open: { width: '13rem' }, closed: { width: '3.25rem' } }
const labelVariants = {
  open: { x: 0, opacity: 1, transition: { x: { stiffness: 1000, velocity: -100 } } },
  closed: { x: -16, opacity: 0, transition: { x: { stiffness: 100 } } },
}
const transitionProps = { type: 'tween' as const, ease: 'easeOut' as const, duration: 0.2 }
const staggerVariants = { open: { transition: { staggerChildren: 0.03, delayChildren: 0.02 } } }

export default function SidebarNav({
  items, activeItem, expanded, onItemClick, onToggleExpand, side = 'left', accentColor = '#C8A44E',
}: SidebarNavProps) {
  const isCollapsed = !expanded

  const ToggleIcon = side === 'left'
    ? expanded ? PanelLeftClose : PanelLeftOpen
    : expanded ? PanelRightClose : PanelRightOpen

  const groups: { group: string | null; items: SidebarNavItem[] }[] = []
  let currentGroup: string | null | undefined = undefined
  items.forEach((item) => {
    if (item.group !== currentGroup) {
      currentGroup = item.group ?? null
      groups.push({ group: currentGroup, items: [] })
    }
    groups[groups.length - 1].items.push(item)
  })

  return (
    <motion.div
      className="z-40 flex h-full shrink-0 flex-col"
      style={{
        background: 'linear-gradient(180deg, #0f0f1a 0%, #0a0a14 100%)',
        borderRight: side === 'left' ? '1px solid #2a2a3e' : 'none',
        borderLeft: side === 'right' ? '1px solid #2a2a3e' : 'none',
      }}
      initial="closed"
      animate={isCollapsed ? 'closed' : 'open'}
      variants={sidebarVariants}
      transition={transitionProps}
    >
      {/* Toggle */}
      <div className="shrink-0 p-1.5" style={{ borderBottom: '1px solid #1e1e32' }}>
        <button
          onClick={onToggleExpand}
          className="flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 transition-all duration-150"
          style={{ background: 'transparent', border: 'none', color: '#64748b' }}
          aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <div className="flex w-5 shrink-0 items-center justify-center"><ToggleIcon size={16} /></div>
          <motion.span variants={labelVariants} className="overflow-hidden whitespace-nowrap text-[0.7rem]">
            {!isCollapsed && (expanded ? 'Collapse' : 'Expand')}
          </motion.span>
        </button>
      </div>

      <motion.ul variants={staggerVariants} className="flex h-full flex-col">
        <div className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-1.5">
          {groups.map((group, gi) => (
            <div key={gi}>
              {gi > 0 && <div className="mx-2 my-1.5 h-px" style={{ background: '#1e1e32' }} />}
              {group.items.map((item) => {
                const Icon = item.icon
                const isActive = activeItem === item.id

                return (
                  <button
                    key={item.id}
                    onClick={() => onItemClick(item.id)}
                    className="group relative flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-left transition-all duration-150"
                    style={{
                      background: isActive ? `${accentColor}12` : 'transparent',
                      color: isActive ? accentColor : '#64748b',
                    }}
                  >
                    {isActive && (
                      <div
                        className="absolute rounded-full"
                        style={{
                          [side === 'left' ? 'left' : 'right']: '0px',
                          top: '25%', height: '50%', width: '3px',
                          background: accentColor,
                          boxShadow: `0 0 8px ${accentColor}66`,
                        }}
                      />
                    )}

                    <div className="flex w-5 shrink-0 items-center justify-center">
                      <Icon size={16} className={`transition-colors duration-150 ${isActive ? '' : 'group-hover:text-white/60'}`} />
                    </div>

                    <motion.span
                      variants={labelVariants}
                      className={`overflow-hidden whitespace-nowrap text-[0.75rem] ${isActive ? 'font-medium' : 'font-normal'}`}
                    >
                      {!isCollapsed && item.name}
                    </motion.span>

                    {isCollapsed && (
                      <div
                        className={`pointer-events-none absolute z-50 whitespace-nowrap rounded px-2 py-1 text-xs opacity-0 transition-all duration-150 group-hover:opacity-100 ${side === 'left' ? 'left-full ml-2' : 'right-full mr-2'}`}
                        style={{ background: '#1a1a2e', border: '1px solid #2a2a3e', color: '#e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }}
                      >
                        {item.name}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </motion.ul>
    </motion.div>
  )
}
