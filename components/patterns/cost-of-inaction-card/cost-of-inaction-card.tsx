// Dependencies: motion, lucide-react
// Source: boxbuild-landing-page

'use client'

import { motion } from 'motion/react'
import { AlertTriangle } from 'lucide-react'

export interface CostOfInactionCardProps {
  title?: string
  description: string
  gradient?: string
  icon?: React.ReactNode
}

function DiagonalPattern() {
  return (
    <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id="coi-diag"
          x="0"
          y="0"
          width="32"
          height="32"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="32" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#coi-diag)" />
    </svg>
  )
}

export default function CostOfInactionCard({
  title = 'The Cost of Inaction',
  description,
  gradient = 'linear-gradient(135deg, #7F1D1D 0%, #991B1B 50%, #B91C1C 100%)',
  icon,
}: CostOfInactionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl shadow-xl"
      style={{ background: gradient }}
    >
      <DiagonalPattern />

      <div className="relative z-10 p-8 md:p-10 lg:p-12">
        <div className="mb-5 flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15">
            {icon || <AlertTriangle className="h-6 w-6 text-white" />}
          </div>
          <h3 className="text-xl font-bold text-white md:text-2xl">
            {title}
          </h3>
        </div>

        <div className="mb-5 h-[2px] w-10 bg-white/30" />

        <p className="max-w-[900px] text-[16px] font-medium leading-relaxed text-white/90 md:text-[17px]">
          {description}
        </p>
      </div>
    </motion.div>
  )
}
