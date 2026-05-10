// Dependencies: motion
// Source: boxbuild-landing-page

'use client'

import { motion } from 'motion/react'

export interface FounderQuoteCardProps {
  quote: string
  attribution: string
  gradient?: string
  accentColor?: string
}

function DiagonalPattern() {
  return (
    <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id="fq-diag"
          x="0"
          y="0"
          width="32"
          height="32"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="32" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#fq-diag)" />
    </svg>
  )
}

export default function FounderQuoteCard({
  quote,
  attribution,
  gradient = 'linear-gradient(135deg, #00334E 0%, #005577 60%, #007799 100%)',
  accentColor = '#F19A33',
}: FounderQuoteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl p-8"
      style={{ background: gradient }}
    >
      <DiagonalPattern />
      <div className="relative z-10">
        <div className="mb-5 h-[2px] w-8 bg-white/30" />
        <p className="text-lg italic leading-relaxed text-white/90">
          &ldquo;{quote}&rdquo;
        </p>
        <p className="mt-4 text-sm font-medium" style={{ color: accentColor }}>
          &mdash; {attribution}
        </p>
      </div>
    </motion.div>
  )
}
