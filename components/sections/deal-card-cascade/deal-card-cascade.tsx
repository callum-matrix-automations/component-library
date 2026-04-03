// Dependencies: motion/react
// Source: payload-demo (ArchitectsThemeA — desk sequence)
// Scroll-driven card "dealing" animation: specification-sheet cards slide in from
// the right, stack with subtle rotation, then compress to reveal a CTA panel.
// Desktop: sticky scroll sequence. Mobile: vertical card stack with inView reveals.
// Cards have a "lined paper" aesthetic with blue top rule and ghost numbers.

'use client'

import React, { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useInView,
  type MotionValue,
} from 'motion/react'

/* ─── Types ─── */

export interface SpecSection {
  id: string
  /** Reference code label (e.g. "A-01") */
  refCode: string
  headline: string
  body: string
  /** Bullet-point benefits */
  benefits: string[]
}

interface DealCardCascadeProps {
  /** Specification sections to render as cards */
  sections: SpecSection[]
  /** Section overline label */
  sectionLabel?: string
  /** Count label (e.g. "3 specification sheets") */
  countLabel?: string
  /** Accent colour for top rule, ref code, benefits */
  accentColor?: string
  /** CTA panel content */
  cta?: {
    overline?: string
    headline: string
    headlineAccent?: string
    description?: string
    buttonLabel: string
    onButtonClick?: () => void
  }
  /** Breakpoint below which mobile layout is used (default: 768) */
  mobileBreakpoint?: number
}

/* ─── Card Face (shared between desktop & mobile) ─── */

function CardFace({
  section,
  index,
  total,
  accentColor,
}: {
  section: SpecSection
  index: number
  total: number
  accentColor: string
}) {
  return (
    <>
      {/* Blue top rule */}
      <div className="h-[3px] w-full flex-shrink-0" style={{ backgroundColor: accentColor }} />

      {/* Lined paper texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, transparent, transparent 31px, rgba(0,0,0,0.03) 31px, rgba(0,0,0,0.03) 32px)',
          backgroundPosition: '0 56px',
        }}
      />

      <div className="relative flex flex-col h-full">
        {/* Doc header */}
        <div className="flex items-center justify-between px-7 lg:px-10 py-4 border-b border-black/[0.07] flex-shrink-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: accentColor }}>
            {section.refCode}
          </p>
          <p className="text-[10px] text-[#9CA3AF] tracking-wider uppercase">
            Sheet {index + 1} of {total}
          </p>
        </div>

        {/* Two-column body */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-black/[0.07] flex-1 min-h-0">
          {/* Left — headline + body */}
          <div className="px-5 md:px-7 lg:px-10 py-6 md:py-8 lg:py-10 flex flex-col justify-center">
            <h2 className="tracking-tight text-[#0B1221] mb-4 md:mb-5" style={{ fontSize: 'clamp(22px,2.4vw,38px)', lineHeight: 1.05 }}>
              {section.headline}
            </h2>
            <p className="text-[13px] text-[#4B5563] leading-[1.8] font-light">
              {section.body}
            </p>
          </div>

          {/* Right — benefits */}
          <div className="px-5 md:px-7 lg:px-10 py-5 md:py-8 lg:py-10 flex flex-col justify-center gap-3 md:gap-5">
            {section.benefits.map((b, bi) => (
              <div key={bi} className="flex items-start gap-3">
                <span
                  className="mt-[4px] flex-shrink-0 w-[13px] h-[13px] border flex items-center justify-center bg-white/80"
                  style={{ borderColor: `${accentColor}80` }}
                >
                  <span className="w-[5px] h-[5px]" style={{ backgroundColor: accentColor }} />
                </span>
                <span className="text-[13px] text-[#374151] leading-snug">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ghost number */}
      <div
        className="absolute right-5 md:right-7 lg:right-10 bottom-4 select-none pointer-events-none leading-none"
        style={{ fontSize: 'clamp(56px,7vw,90px)', color: `${accentColor}0A` }}
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </div>
    </>
  )
}

/* ─── Desktop Deal Card ─── */

const SEG = 0.2
const STACK_START = 0.6
const STACK_END = 1.0
const CARD_REST_X = 26
const NUDGE = [6, 3]
const STACK_DELTA_X = [-22, -20, -18]
const STACK_ROTATE = [-5, -1, 4]
const STACK_SCALE = [0.82, 0.85, 0.88]

function DealCard({
  section,
  index,
  total,
  progress,
  accentColor,
}: {
  section: SpecSection
  index: number
  total: number
  progress: MotionValue<number>
  accentColor: string
}) {
  const reduced = useReducedMotion()

  const dealStart = index * SEG
  const dealEnd = dealStart + SEG
  const dealX = useTransform(progress, [dealStart, dealEnd], ['100vw', `${CARD_REST_X}vw`])

  const nudgeAmt = NUDGE[index] ?? 0
  const nudgeStart = (index + 1) * SEG
  const nudgeEnd = (index + 2) * SEG
  const nudgeX = useTransform(
    progress,
    nudgeAmt > 0 ? [nudgeStart, Math.min(nudgeEnd, STACK_START)] : [0, 1],
    nudgeAmt > 0 ? ['0vw', `-${nudgeAmt}vw`] : ['0vw', '0vw'],
  )

  const stackX = useTransform(progress, [STACK_START, STACK_END], ['0vw', `${STACK_DELTA_X[index] ?? -18}vw`])
  const stackRotate = useTransform(progress, [STACK_START, STACK_END], [0, STACK_ROTATE[index] ?? 4])
  const stackScale = useTransform(progress, [STACK_START, STACK_END], [1, STACK_SCALE[index] ?? 0.88])

  return (
    <motion.div
      className="absolute top-[16vh] will-change-transform"
      style={{
        width: '53vw',
        height: '68vh',
        left: 0,
        zIndex: index + 1,
        x: reduced ? `${CARD_REST_X}vw` : dealX,
      }}
    >
      <motion.div className="absolute inset-0" style={{ x: reduced ? 0 : nudgeX }}>
        <motion.div
          className="absolute inset-0"
          style={{
            x: reduced ? 0 : stackX,
            rotate: reduced ? 0 : stackRotate,
            scale: reduced ? 1 : stackScale,
            transformOrigin: 'center bottom',
            zIndex: index + 1,
          }}
        >
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, #FDFCF8 0%, #F9F7F2 100%)',
              border: '1px solid rgba(0,0,0,0.09)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.14), 0 4px 14px rgba(0,0,0,0.07)',
            }}
          >
            <CardFace section={section} index={index} total={total} accentColor={accentColor} />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Desktop CTA Panel ─── */

function CtaPanel({
  progress,
  cta,
  accentColor,
}: {
  progress: MotionValue<number>
  cta: NonNullable<DealCardCascadeProps['cta']>
  accentColor: string
}) {
  const reduced = useReducedMotion()
  const slideX = useTransform(progress, [STACK_START, STACK_END], ['100%', '0%'])

  return (
    <motion.div
      className="absolute top-0 bottom-0 right-0 w-[40vw] flex flex-col items-start justify-center px-12 lg:px-16"
      style={reduced ? {} : { x: slideX }}
    >
      {cta.overline && (
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] mb-6" style={{ color: accentColor }}>
          {cta.overline}
        </p>
      )}
      <h2 className="text-[#0B1221] leading-[1.05] tracking-tight mb-5" style={{ fontSize: 'clamp(28px,3vw,48px)' }}>
        {cta.headline}
        {cta.headlineAccent && (
          <>
            <br />
            <span style={{ color: accentColor }}>{cta.headlineAccent}</span>
          </>
        )}
      </h2>
      {cta.description && (
        <p className="text-[13px] text-[#4B5563] font-light leading-relaxed mb-10">
          {cta.description}
        </p>
      )}
      <button
        onClick={cta.onButtonClick}
        className="group inline-flex items-center gap-3 border-2 font-semibold text-sm px-7 py-4 transition-all duration-300 tracking-wide"
        style={{ borderColor: accentColor, color: accentColor }}
      >
        {cta.buttonLabel}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transform group-hover:translate-x-1 transition-transform duration-300">
          <path d="M2 7H12M12 7L7 2M12 7L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </motion.div>
  )
}

/* ─── Mobile Card ─── */

function MobileCardFace({
  section,
  index,
  total,
  accentColor,
}: {
  section: SpecSection
  index: number
  total: number
  accentColor: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #FDFCF8 0%, #F9F7F2 100%)',
        border: '1px solid rgba(0,0,0,0.09)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.05)',
        borderRadius: '12px',
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <CardFace section={section} index={index} total={total} accentColor={accentColor} />
    </motion.div>
  )
}

/* ─── Main Component ─── */

export default function DealCardCascade({
  sections,
  sectionLabel = 'Technical Overview',
  countLabel,
  accentColor = '#0064B0',
  cta,
  mobileBreakpoint = 768,
}: DealCardCascadeProps) {
  const deskRef = useRef<HTMLDivElement>(null)
  const isMobile = typeof window !== 'undefined' && window.matchMedia(`(max-width: ${mobileBreakpoint}px)`).matches
  const resolvedCountLabel = countLabel ?? `${sections.length} specification sheets`

  const { scrollYProgress } = useScroll({
    target: deskRef,
    offset: ['start end', 'end end'],
  })

  if (isMobile) {
    return (
      <div className="relative z-10 px-5 py-12" style={{ background: '#ECEEF0' }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(circle, #9AA3AD 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: accentColor }}>{sectionLabel}</p>
            <p className="text-[10px] text-[#9CA3AF] tracking-wider">{resolvedCountLabel}</p>
          </div>
          <div className="flex flex-col gap-6">
            {sections.map((section, index) => (
              <MobileCardFace key={section.id} section={section} index={index} total={sections.length} accentColor={accentColor} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative z-10" style={{ background: '#ECEEF0' }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(circle, #9AA3AD 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />

      <div className="relative z-10 px-8 lg:px-16 xl:px-24 pt-20 pb-10">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: accentColor }}>{sectionLabel}</p>
          <p className="text-[10px] text-[#9CA3AF] tracking-wider">{resolvedCountLabel}</p>
        </div>
      </div>

      <div ref={deskRef} className="relative" style={{ height: '400vh' }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#9CA3AF]">Specification Sheets</p>
          </div>

          {sections.map((section, index) => (
            <DealCard
              key={section.id}
              section={section}
              index={index}
              total={sections.length}
              progress={scrollYProgress}
              accentColor={accentColor}
            />
          ))}

          {cta && <CtaPanel progress={scrollYProgress} cta={cta} accentColor={accentColor} />}
        </div>
      </div>
    </div>
  )
}
