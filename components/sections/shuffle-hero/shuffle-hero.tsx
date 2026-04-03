// Dependencies: motion/react
// Source: payload-demo (OwnersThemeA hero)
// Full-screen sticky hero with a scroll-driven "shuffle" transition:
// Layer 1 (foreground image + headline) lifts off like a sheet of paper,
// revealing Layer 2 (background image + statement text) beneath.
// Three scroll phases: rest → shuffle → reveal statement.

'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

interface ShuffleHeroProps {
  /** Foreground image URL (Layer 1 — lifts away on scroll) */
  foregroundImage: string
  /** Background image URL (Layer 2 — revealed beneath) */
  backgroundImage: string
  /** Overline label above the headline */
  overline?: string
  /** Main headline text */
  headline: string
  /** Italic accent portion of the headline (displayed on second line) */
  headlineAccent?: string
  /** Large statement text revealed on Layer 2 */
  statementText: string
  /** Accent-coloured portion within the statement (wrapped in <em>) */
  statementAccent?: string
  /** Accent colour */
  accentColor?: string
  /** Dark overlay colour for both layers */
  overlayColor?: string
  /** Total scroll height multiplier (default: 240vh desktop, 180vh mobile) */
  scrollHeight?: string
  /** Whether entrance animations should play */
  ready?: boolean
}

export default function ShuffleHero({
  foregroundImage,
  backgroundImage,
  overline,
  headline,
  headlineAccent,
  statementText,
  statementAccent,
  accentColor = '#0064B0',
  overlayColor = 'rgba(10,20,40,0.55)',
  scrollHeight,
  ready = true,
}: ShuffleHeroProps) {
  const reduced = useReducedMotion()
  const shuffleRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: shuffleRef,
    offset: ['start start', 'end end'],
  })

  // Phase 1 (0–0.33): hero resting, subtle image zoom
  const img1Scale = useTransform(scrollYProgress, [0, 0.33], [1.08, 1.0])
  const gridOpacity = useTransform(scrollYProgress, [0.15, 0.3], [1, 0])
  const p1ContentOpacity = useTransform(scrollYProgress, [0.18, 0.35], [1, 0])
  const p1ContentY = useTransform(scrollYProgress, [0.18, 0.35], ['0%', '-8%'])

  // Phase 2 (0.3–0.7): foreground shuffles off, background rises
  const sheet1Y = useTransform(scrollYProgress, [0.3, 0.65], ['0%', '-105%'])
  const sheet1Rotate = useTransform(scrollYProgress, [0.3, 0.65], [0, -3])
  const sheet1Scale = useTransform(scrollYProgress, [0.3, 0.65], [1, 0.92])
  const sheet1Shadow = useTransform(scrollYProgress, [0.3, 0.55], [
    '0px 0px 0px rgba(0,0,0,0)',
    '0px 40px 80px rgba(0,0,0,0.45)',
  ])
  const sheet2Y = useTransform(scrollYProgress, [0.35, 0.7], ['14%', '0%'])
  const sheet2Opacity = useTransform(scrollYProgress, [0.3, 0.55], [0, 1])

  // Phase 3 (0.65–0.9): statement fades in
  const bodyOpacity = useTransform(scrollYProgress, [0.65, 0.85], [0, 1])
  const bodyY = useTransform(scrollYProgress, [0.65, 0.85], ['24px', '0px'])

  const ease = [0.16, 1, 0.3, 1] as const

  // Build statement with optional accent highlight
  const renderStatement = () => {
    if (!statementAccent) {
      return <>{statementText}</>
    }
    const parts = statementText.split(statementAccent)
    return (
      <>
        {parts[0]}
        <em className="not-italic" style={{ color: accentColor }}>{statementAccent}</em>
        {parts[1] || ''}
      </>
    )
  }

  return (
    <div
      ref={shuffleRef}
      className="relative"
      style={{ height: scrollHeight ?? '240vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Layer 2 (behind): background image + statement */}
        <motion.div
          className="absolute inset-0"
          style={reduced ? {} : { y: sheet2Y, opacity: sheet2Opacity }}
        >
          <img src={backgroundImage} alt="" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ backgroundColor: overlayColor }} />

          <motion.div
            className="absolute inset-0 flex items-center justify-center px-6 sm:px-8"
            style={reduced ? {} : { opacity: bodyOpacity, y: bodyY }}
          >
            <p
              className="text-center text-white max-w-4xl"
              style={{ fontSize: 'clamp(18px,3.2vw,46px)', lineHeight: 1.25, letterSpacing: '-0.01em' }}
            >
              {renderStatement()}
            </p>
          </motion.div>
        </motion.div>

        {/* Layer 1 (on top): foreground image + headline, shuffles off on scroll */}
        <motion.div
          className="absolute inset-0 origin-top"
          style={
            reduced
              ? {}
              : {
                  y: sheet1Y,
                  rotate: sheet1Rotate,
                  scale: sheet1Scale,
                  boxShadow: sheet1Shadow,
                }
          }
        >
          {/* Foreground image */}
          <motion.div
            className="absolute inset-0"
            style={reduced ? {} : { scale: img1Scale }}
            aria-hidden="true"
          >
            <img src={foregroundImage} alt="" className="w-full h-full object-cover object-center" />
          </motion.div>

          {/* Scrim */}
          <div className="absolute inset-0" style={{ backgroundColor: overlayColor }} />

          {/* Grid overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={reduced ? {} : { opacity: gridOpacity }}
            aria-hidden="true"
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
                backgroundSize: '56px 56px',
              }}
            />
          </motion.div>

          {/* Left accent stripe */}
          <div className="absolute left-0 top-0 bottom-0 w-[3px] z-10" style={{ backgroundColor: accentColor }} />

          {/* Hero content — centred */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 sm:px-8">
            {/* Overline */}
            {overline && (
              <motion.div
                className="flex items-center gap-3 mb-6 sm:mb-10"
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={ready ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1, ease }}
                style={reduced ? {} : { opacity: p1ContentOpacity }}
              >
                <div className="w-6 h-px" style={{ backgroundColor: accentColor }} />
                <span className="text-[10px] font-semibold uppercase tracking-[0.35em]" style={{ color: accentColor }}>
                  {overline}
                </span>
                <div className="w-6 h-px" style={{ backgroundColor: accentColor }} />
              </motion.div>
            )}

            {/* Headline */}
            <motion.div
              style={reduced ? {} : { opacity: p1ContentOpacity, y: p1ContentY }}
            >
              <h1
                className="text-white"
                style={{ fontSize: 'clamp(44px,7vw,100px)', lineHeight: 0.95, letterSpacing: '-0.02em' }}
              >
                <motion.span
                  className="block"
                  initial={reduced ? false : { opacity: 0, y: 20 }}
                  animate={ready ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.3, ease }}
                >
                  {headline}
                </motion.span>
                {headlineAccent && (
                  <motion.span
                    className="block italic"
                    style={{ color: accentColor }}
                    initial={reduced ? false : { opacity: 0, y: 20 }}
                    animate={ready ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.45, ease }}
                  >
                    {headlineAccent}
                  </motion.span>
                )}
              </h1>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="flex flex-col items-center gap-2 mt-12"
              initial={reduced ? false : { opacity: 0 }}
              animate={ready ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
              style={reduced ? {} : { opacity: p1ContentOpacity }}
            >
              <span className="text-[9px] uppercase tracking-[0.35em] text-white/20">Scroll</span>
              <div className="relative w-px h-10 bg-white/10 overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 w-full"
                  style={{ height: '40%', backgroundColor: `${accentColor}99` }}
                  animate={{ y: ['0%', '180%'] }}
                  transition={{ duration: 1.4, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.3 }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
