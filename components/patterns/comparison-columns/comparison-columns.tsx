// Dependencies: motion, lucide-react
// Source: boxbuild-landing-page

'use client'

import { motion } from 'motion/react'
import { X, Check } from 'lucide-react'

export interface ComparisonItem {
  dont: string
  do: string
}

export interface ComparisonColumnsProps {
  leftTitle?: string
  rightTitle?: string
  items: ComparisonItem[]
  accentColor?: string
  rightGradient?: string
  closingMessage?: string
  closingGradient?: string
}

function DiagonalPattern({ id }: { id: string }) {
  return (
    <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id={id}
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
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

export default function ComparisonColumns({
  leftTitle = 'The typical agency',
  rightTitle = 'The difference',
  items,
  accentColor = '#F19A33',
  rightGradient = 'linear-gradient(135deg, #00334E 0%, #005577 60%, #007799 100%)',
  closingMessage,
  closingGradient = 'linear-gradient(135deg, #F19A33 0%, #F5B45C 50%, #F19A33 100%)',
}: ComparisonColumnsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        {/* Left — "Don't" column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-slate-200 bg-gray-50 p-8"
        >
          <p className="mb-6 text-sm font-semibold uppercase tracking-wide text-slate-500">
            {leftTitle}
          </p>
          <div className="space-y-5">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100">
                  <X className="h-3.5 w-3.5 text-red-600" />
                </div>
                <p className="text-[15px] leading-relaxed text-slate-500">
                  {item.dont}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right — "Do" column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl p-8"
          style={{ background: rightGradient }}
        >
          <DiagonalPattern id="comp-col-diag" />

          <div className="relative z-10">
            <p className="mb-6 text-sm font-semibold uppercase tracking-wide" style={{ color: accentColor }}>
              {rightTitle}
            </p>
            <div className="space-y-5">
              {items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${accentColor}33` }}
                  >
                    <Check className="h-3.5 w-3.5" style={{ color: accentColor }} />
                  </div>
                  <p className="text-[15px] font-medium leading-relaxed text-white/85">
                    {item.do}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Closing anchor card */}
      {closingMessage && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl shadow-xl"
          style={{ background: closingGradient }}
        >
          <DiagonalPattern id="comp-closing-diag" />
          <div className="relative z-10 p-8 text-center md:p-10 lg:p-12">
            <p className="mx-auto max-w-[820px] text-lg font-semibold leading-relaxed text-white md:text-xl">
              {closingMessage}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
