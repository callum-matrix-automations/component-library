// Dependencies: motion
// Source: payload-demo (solutions/builders)

'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'

export interface StepCardProps {
  num: string
  headline: string
  body: string
  callout?: string
  benefits?: string[]
  index?: number
  cascadeIndent?: number
  showConnector?: boolean
  accentColor?: string
}

export default function StepCard({
  num,
  headline,
  body,
  callout,
  benefits = [],
  index = 0,
  cascadeIndent = 32,
  showConnector = false,
  accentColor = '#0064B0',
}: StepCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })
  const reduced = useReducedMotion()

  const indentPx = index * cascadeIndent

  return (
    <motion.div
      ref={ref}
      className="relative"
      style={{ marginLeft: indentPx }}
      initial={reduced ? false : { opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.05 * index }}
    >
      <div
        className="relative overflow-hidden bg-white"
        style={{
          border: '1px solid #DFE3EA',
          borderRadius: '6px',
          maxWidth: '640px',
          boxShadow: '0 2px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.07)',
        }}
      >
        {/* Top accent rule */}
        <div className="h-[3px]" style={{ width: '64px', background: accentColor }} />

        <div className="p-7 sm:p-8 lg:p-10">
          {/* Step number + headline */}
          <div className="mb-5 flex items-start gap-6">
            <div className="shrink-0" style={{ width: '56px' }}>
              <span
                className="block font-serif leading-none"
                style={{ fontSize: '64px', color: accentColor, lineHeight: 0.9 }}
              >
                {num}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <h2
                className="mb-4 tracking-tight text-gray-900"
                style={{ fontSize: 'clamp(22px, 2.4vw, 32px)', lineHeight: 1.1 }}
              >
                {headline}
              </h2>
              <p className="text-[14px] font-light leading-[1.8] text-gray-600">
                {body}
              </p>
            </div>
          </div>

          {/* Callout box */}
          {callout && (
            <div
              className="mb-6 px-4 py-3"
              style={{ borderLeft: `3px solid ${accentColor}`, background: `${accentColor}0A` }}
            >
              <p className="text-[12px] italic leading-snug text-gray-700">
                {callout}
              </p>
            </div>
          )}

          {/* Benefits grid */}
          {benefits.length > 0 && (
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {benefits.map((b, bi) => (
                <div key={bi} className="flex items-center gap-2.5">
                  <div
                    className="h-[5px] w-[5px] shrink-0 rounded-full"
                    style={{ background: accentColor }}
                  />
                  <span className="text-[13px] text-gray-700">{b}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Ghost number */}
        <div
          className="pointer-events-none absolute bottom-2 right-6 select-none font-serif"
          style={{ fontSize: '88px', color: accentColor, opacity: 0.06, lineHeight: 1 }}
          aria-hidden="true"
        >
          {num}
        </div>
      </div>

      {/* Connector line to next card */}
      {showConnector && (
        <div
          className="absolute left-[32px] top-full w-px"
          style={{ height: '32px', background: `linear-gradient(to bottom, ${accentColor}4D, transparent)` }}
          aria-hidden="true"
        />
      )}
    </motion.div>
  )
}
