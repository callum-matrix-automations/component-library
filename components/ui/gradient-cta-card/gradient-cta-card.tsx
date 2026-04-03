// Dependencies: motion/react
// Source: payload-demo (OwnersThemeA CTA card)
// Gradient CTA card with diagonal stripe pattern, optional image panel,
// headline with accent text, description, action button, and stat strip footer.
// Includes both desktop (split layout) and mobile (stacked) variants.

'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

export interface StatItem {
  value: string
  label: string
}

interface GradientCtaCardProps {
  /** Overline label above the headline */
  overline?: string
  /** Main headline text */
  headline: string
  /** Accent-coloured portion of the headline */
  headlineAccent?: string
  /** Description paragraph */
  description?: string
  /** CTA button label */
  buttonLabel: string
  /** CTA button click handler */
  onButtonClick?: () => void
  /** Optional image URL shown in the right panel (desktop) or top (mobile) */
  imageSrc?: string
  /** Gradient start colour */
  gradientFrom?: string
  /** Gradient middle colour */
  gradientVia?: string
  /** Gradient end colour */
  gradientTo?: string
  /** Accent colour for headline accent text */
  accentColor?: string
  /** Stat items shown in a footer strip */
  stats?: StatItem[]
  /** Card border radius (default: 20px desktop, 16px mobile) */
  borderRadius?: string
}

function DiagonalPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="cta-diag" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="32" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cta-diag)" />
    </svg>
  )
}

export default function GradientCtaCard({
  overline = 'Next Step',
  headline,
  headlineAccent,
  description,
  buttonLabel,
  onButtonClick,
  imageSrc,
  gradientFrom = '#003D6B',
  gradientVia = '#0064B0',
  gradientTo = '#0078D4',
  accentColor = '#8ED1FC',
  stats,
  borderRadius = '20px',
}: GradientCtaCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientVia} 60%, ${gradientTo} 100%)`,
        borderRadius,
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <DiagonalPattern />

      <div className="relative z-10 h-full flex flex-col md:flex-row">
        {/* Text content */}
        <div className="flex-1 flex flex-col justify-between px-8 md:px-10 lg:px-14 py-10 md:py-12">
          <p className="text-[9px] font-semibold uppercase tracking-[0.4em] text-white/35 mb-4">
            {overline}
          </p>

          <div className="flex-1 flex flex-col justify-center">
            <div className="w-10 h-[2px] bg-white/40 mb-8" />
            <h2
              className="text-white leading-[1.05] tracking-tight mb-4"
              style={{ fontSize: 'clamp(26px, 2.8vw, 46px)' }}
            >
              {headline}
              {headlineAccent && (
                <>
                  <br />
                  <em className="not-italic" style={{ color: accentColor }}>{headlineAccent}</em>
                </>
              )}
            </h2>
            {description && (
              <p className="text-[13px] font-light leading-relaxed mb-8 md:mb-10 max-w-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {description}
              </p>
            )}
            <button
              onClick={onButtonClick}
              className="group inline-flex items-center gap-3 font-semibold text-sm px-7 py-4 transition-all duration-300 tracking-wide self-start"
              style={{ background: 'white', color: gradientVia }}
            >
              {buttonLabel}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transform group-hover:translate-x-1 transition-transform duration-300">
                <path d="M2 7H12M12 7L7 2M12 7L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Stat strip */}
          {stats && stats.length > 0 && (
            <div className="flex items-center gap-6 md:gap-8 border-t pt-5 mt-6" style={{ borderColor: 'rgba(255,255,255,0.12)' }}>
              {stats.map((s, i) => (
                <div key={i}>
                  <p className="text-white text-lg md:text-xl leading-none">{s.value}</p>
                  <p className="text-[8px] md:text-[9px] uppercase tracking-widest mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>{s.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Image panel */}
        {imageSrc && (
          <div className="relative w-full md:w-[45%] overflow-hidden" style={{ borderRadius: `0 ${borderRadius} ${borderRadius} 0`, minHeight: '180px' }}>
            <img
              src={imageSrc}
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>
        )}
      </div>
    </motion.div>
  )
}
