// Dependencies: motion
// Source: boxbuild-landing-page

'use client'

import { motion } from 'motion/react'

export interface IssueCardProps {
  index: number
  children: React.ReactNode
  accentColor?: string
}

export default function IssueCard({
  index,
  children,
  accentColor = '#F19A33',
}: IssueCardProps) {
  const label = String(index).padStart(2, '0')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl p-[1px] shadow-sm transition-all duration-500 hover:shadow-xl"
      style={{
        background: `linear-gradient(135deg, ${accentColor}59 0%, rgba(226,232,240,0.6) 35%, rgba(226,232,240,0.6) 100%)`,
      }}
    >
      <div
        className="relative h-full overflow-hidden rounded-2xl p-7"
        style={{
          background: 'linear-gradient(160deg, #FFFFFF 0%, #FAFBFC 55%, #F1F5F9 100%)',
        }}
      >
        {/* Corner glow on hover */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle, ${accentColor}59 0%, transparent 70%)`,
          }}
        />

        {/* Index marker */}
        <div className="relative z-10 mb-5 flex items-start justify-between">
          <span
            className="bg-clip-text text-[11px] font-bold uppercase tracking-[0.15em] text-transparent"
            style={{
              backgroundImage: `linear-gradient(135deg, ${accentColor} 0%, #00334E 120%)`,
            }}
          >
            {label}
          </span>
          <div
            className="h-[2px] w-8 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${accentColor} 0%, ${accentColor}00 100%)`,
            }}
          />
        </div>

        <p className="relative z-10 text-[15px] leading-relaxed text-gray-800">
          {children}
        </p>
      </div>
    </motion.div>
  )
}
