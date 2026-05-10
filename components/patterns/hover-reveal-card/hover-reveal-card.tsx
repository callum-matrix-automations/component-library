// Dependencies: motion, lucide-react
// Source: TTRPG

'use client'

import { motion, type Transition } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

const springTransition: Transition = { type: 'spring', stiffness: 300, damping: 30 }

const summaryTextVariants = { collapsed: { opacity: 1, y: 0 }, expanded: { opacity: 0, y: -16 } }
const actionTextVariants = { collapsed: { opacity: 0, y: 16 }, expanded: { opacity: 1, y: 0 } }

export interface HoverRevealCardProps {
  summary: React.ReactNode
  details: React.ReactNode
  footerIcon: React.ReactNode
  footerLabel: string
  footerAction?: () => void
  footerActionLabel?: string
  accentColor?: string
  onClick?: () => void
}

export function HoverRevealCard({
  summary, details, footerIcon, footerLabel, footerAction, footerActionLabel, accentColor = '#C8A44E', onClick,
}: HoverRevealCardProps) {
  return (
    <motion.div
      className="cursor-pointer space-y-2 rounded-xl"
      style={{ background: '#1a1a2e', padding: '8px', border: '1px solid #2a2a3e' }}
      initial="collapsed"
      whileHover="expanded"
      onClick={onClick ?? footerAction}
    >
      <motion.div
        layout="position"
        transition={springTransition}
        className="rounded-lg px-3 py-2.5"
        style={{ background: '#0f0f1a', border: '1px solid #1e1e32' }}
      >
        {summary}
        <motion.div
          variants={{ collapsed: { height: 0, opacity: 0, marginTop: 0 }, expanded: { height: 'auto', opacity: 1, marginTop: '10px' } }}
          transition={{ staggerChildren: 0.08, ...springTransition }}
          className="overflow-hidden"
        >
          {details}
        </motion.div>
      </motion.div>

      <div className="flex items-center gap-2 px-1">
        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: accentColor, color: '#0f0f1a' }}>
          {footerIcon}
        </div>
        <span className="grid flex-1">
          <motion.span className="col-start-1 row-start-1 text-[0.7rem] font-medium" style={{ color: '#64748b' }} variants={summaryTextVariants} transition={{ duration: 0.22, ease: 'easeInOut' }}>
            {footerLabel}
          </motion.span>
          <motion.span
            className="col-start-1 row-start-1 flex cursor-pointer items-center gap-1 text-[0.7rem] font-medium"
            style={{ color: accentColor }}
            variants={actionTextVariants}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            onClick={(e) => { if (footerAction) { e.stopPropagation(); footerAction() } }}
          >
            {footerActionLabel ?? 'View Details'} <ArrowUpRight size={13} />
          </motion.span>
        </span>
      </div>
    </motion.div>
  )
}

export function RevealRow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={{ collapsed: { opacity: 0, y: 8 }, expanded: { opacity: 1, y: 0 } }} transition={springTransition} className={className ?? 'mt-1.5'}>
      {children}
    </motion.div>
  )
}

export function RevealBar({ label, value, icon, color }: { label: string; value: string; icon?: React.ReactNode; color?: string }) {
  const barColor = color ?? '#C8A44E'
  return (
    <RevealRow>
      <div className="mb-0.5 flex items-center justify-between text-[0.6rem] font-medium" style={{ color: '#64748b' }}>
        <div className="flex items-center gap-1.5">{icon}{label}</div>
        <span className="tabular-nums text-[0.6rem] font-semibold">{value}</span>
      </div>
      <div className="h-1 w-full rounded-full" style={{ background: '#1a1a2e' }}>
        <motion.div className="h-1 rounded-full" style={{ background: barColor }} variants={{ collapsed: { width: 0 }, expanded: { width: value } }} transition={springTransition} />
      </div>
    </RevealRow>
  )
}

export default HoverRevealCard
