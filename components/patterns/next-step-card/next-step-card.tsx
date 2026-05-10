// Dependencies: motion
// Source: payload-demo (solutions/owners)

'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

export interface NextStepCardStat {
  value: string
  label: string
}

export interface NextStepCardProps {
  overline?: string
  headline: string
  headlineAccent?: string
  description: string
  ctaLabel?: string
  onCtaClick?: () => void
  imageSrc: string
  imageAlt?: string
  stats?: NextStepCardStat[]
  layout?: 'horizontal' | 'vertical'
  gradient?: string
  accentColor?: string
  accentLight?: string
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

export default function NextStepCard({
  overline = 'Next Step',
  headline,
  headlineAccent,
  description,
  ctaLabel = 'Get Started',
  onCtaClick,
  imageSrc,
  imageAlt = '',
  stats = [],
  layout = 'horizontal',
  gradient = 'linear-gradient(135deg, #003D6B 0%, #0064B0 60%, #0078D4 100%)',
  accentColor = '#0064B0',
  accentLight = '#8ED1FC',
}: NextStepCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  if (layout === 'vertical') {
    return (
      <motion.div
        ref={ref}
        className="relative overflow-hidden"
        style={{ background: gradient, borderRadius: '16px' }}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <DiagonalPattern id="nsc-vert-diag" />

        {/* Image — top */}
        <div className="relative w-full overflow-hidden" style={{ height: '180px', borderRadius: '16px 16px 0 0' }}>
          <img
            src={imageSrc}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>

        <div className="relative z-10 p-6">
          <p className="mb-4 text-[9px] font-semibold uppercase tracking-[0.4em] text-white/35">
            {overline}
          </p>
          <div className="mb-5 h-[2px] w-8 bg-white/40" />
          <h2
            className="mb-4 leading-[1.05] tracking-[-0.025em] text-white"
            style={{ fontSize: '26px' }}
          >
            {headline}
            {headlineAccent && (
              <>
                <br />
                <em className="not-italic" style={{ color: accentLight }}>{headlineAccent}</em>
              </>
            )}
          </h2>
          <p className="mb-6 text-[13px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
            {description}
          </p>
          <button
            onClick={onCtaClick}
            className="group inline-flex items-center gap-3 px-6 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300"
            style={{ background: 'white', color: accentColor, borderRadius: '2px' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#EDF0F2' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'white' }}
          >
            {ctaLabel}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M2 7H12M12 7L7 2M12 7L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {stats.length > 0 && (
            <div className="mt-6 flex items-center gap-6 border-t pt-5" style={{ borderColor: 'rgba(255,255,255,0.12)' }}>
              {stats.map((s, i) => (
                <div key={i}>
                  <p className="font-serif text-lg leading-none text-white">{s.value}</p>
                  <p className="mt-1 text-[8px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.35)' }}>{s.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    )
  }

  // Horizontal layout — always side-by-side via CSS grid
  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: gradient, borderRadius: '20px' }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <DiagonalPattern id="nsc-horiz-diag" />

      <div className="relative z-10 grid h-full" style={{ gridTemplateColumns: '55% 45%' }}>
        {/* Left — text content */}
        <div className="flex flex-col justify-between p-10 xl:p-14">
          <p className="text-[9px] font-semibold uppercase tracking-[0.4em] text-white/35">
            {overline}
          </p>

          <div className="flex flex-col justify-center py-6">
            <div className="mb-6 h-[2px] w-10 bg-white/40" />
            <h2
              className="mb-4 leading-[1.05] tracking-[-0.025em] text-white"
              style={{ fontSize: 'clamp(28px, 2.8vw, 46px)' }}
            >
              {headline}
              {headlineAccent && (
                <>
                  <br />
                  <em className="not-italic" style={{ color: accentLight }}>{headlineAccent}</em>
                </>
              )}
            </h2>
            <p className="mb-8 max-w-sm text-[13px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {description}
            </p>
            <button
              onClick={onCtaClick}
              className="group inline-flex items-center gap-3 self-start px-7 py-4 text-sm font-semibold tracking-wide transition-all duration-300"
              style={{ background: 'white', color: accentColor, borderRadius: '2px' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#EDF0F2' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'white' }}
            >
              {ctaLabel}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M2 7H12M12 7L7 2M12 7L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {stats.length > 0 && (
            <div className="flex items-center gap-8 border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.12)' }}>
              {stats.map((s, i) => (
                <div key={i}>
                  <p className="font-serif text-xl leading-none text-white">{s.value}</p>
                  <p className="mt-1 text-[9px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.35)' }}>{s.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right — image panel */}
        <div className="relative overflow-hidden" style={{ borderRadius: '0 20px 20px 0' }}>
          <img
            src={imageSrc}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </motion.div>
  )
}
