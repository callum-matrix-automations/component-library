// Dependencies: motion/react
// Source: payload-demo (HeroPinSequence)
// Full-viewport hero with scroll-driven parallax: headline scales/fades,
// accent block slides off, subtitle and scroll cue fade out at different rates.
// Supports a "ready" prop to defer entrance animations (e.g. after an intro loader).

'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

interface ParallaxHeroProps {
  /** Overline label (e.g. "Company — Solutions") */
  overline?: string
  /** Main headline — array of lines, each rendered as a clip-reveal block */
  headlineLines: Array<{ text: string; italic?: boolean; accentColor?: string }>
  /** Subtitle paragraph below the headline */
  subtitle?: string
  /** Text for the scroll cue (default: "Scroll to explore") */
  scrollCueText?: string
  /** Bottom-right floating label — line 1 */
  cornerLabelTop?: string
  /** Bottom-right floating label — line 2 */
  cornerLabelBottom?: string
  /** Accent colour used for overline, stripe, and accent block */
  accentColor?: string
  /** Background colour of the accent block (defaults to accentColor) */
  accentBlockColor?: string
  /** Whether entrance animations should play (tie to loader completion) */
  ready?: boolean
}

const enterVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const clipVariants = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: { clipPath: 'inset(0 0 0% 0)' },
}

export default function ParallaxHero({
  overline,
  headlineLines,
  subtitle,
  scrollCueText = 'Scroll to explore',
  cornerLabelTop,
  cornerLabelBottom,
  accentColor = '#0064B0',
  accentBlockColor,
  ready = true,
}: ParallaxHeroProps) {
  const reduced = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const headlineScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.08])
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const headlineY = useTransform(scrollYProgress, [0, 0.6], ['0%', '-12%'])

  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const subtitleY = useTransform(scrollYProgress, [0, 0.5], ['0%', '-8%'])

  const blueBlockX = useTransform(scrollYProgress, [0, 0.7], ['0%', '18%'])
  const blueBlockOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const overlineOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  const ease = [0.16, 1, 0.3, 1] as const
  const blockColor = accentBlockColor ?? accentColor

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-white overflow-hidden flex flex-col"
    >
      {/* Left edge accent stripe */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 z-10" style={{ backgroundColor: accentColor }} aria-hidden="true" />

      {/* Accent corner block — slides off right on scroll */}
      <motion.div
        className="absolute top-0 right-0 w-[45vw] h-[62vh] hidden lg:block"
        style={{
          backgroundColor: blockColor,
          ...(reduced ? {} : { x: blueBlockX, opacity: blueBlockOpacity }),
        }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </motion.div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col justify-center flex-1 px-8 lg:px-16 pt-24 pb-20">
        <div className="max-w-7xl mx-auto w-full">

          {/* Overline */}
          {overline && (
            <motion.div
              variants={enterVariants}
              initial="hidden"
              animate={ready ? 'visible' : 'hidden'}
              transition={{ duration: 0.55, delay: 0.05, ease }}
              style={reduced ? {} : { opacity: overlineOpacity }}
              className="flex items-center gap-4 mb-10"
            >
              <div className="w-8 h-px flex-shrink-0" style={{ backgroundColor: accentColor }} />
              <span className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: accentColor }}>
                {overline}
              </span>
            </motion.div>
          )}

          {/* Headline — scales up and fades as you scroll */}
          <motion.div
            className="max-w-3xl lg:max-w-4xl"
            style={reduced ? {} : { scale: headlineScale, opacity: headlineOpacity, y: headlineY }}
          >
            <h1 style={{ fontSize: 'clamp(52px,7.5vw,108px)', lineHeight: 0.95, letterSpacing: '-0.02em' }}>
              {headlineLines.map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.span
                    className="block"
                    style={{
                      fontStyle: line.italic ? 'italic' : undefined,
                      color: line.accentColor ?? '#0B1221',
                    }}
                    variants={reduced ? enterVariants : clipVariants}
                    initial="hidden"
                    animate={ready ? 'visible' : 'hidden'}
                    transition={{ duration: 0.7, delay: 0.15 + i * 0.15, ease }}
                  >
                    {line.text}
                  </motion.span>
                </div>
              ))}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <motion.p
                variants={enterVariants}
                initial="hidden"
                animate={ready ? 'visible' : 'hidden'}
                transition={{ duration: 0.6, delay: 0.5, ease }}
                style={reduced ? {} : { opacity: subtitleOpacity, y: subtitleY }}
                className="mt-8 text-lg md:text-xl max-w-xl leading-relaxed font-light"
              >
                {subtitle}
              </motion.p>
            )}
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            variants={enterVariants}
            initial="hidden"
            animate={ready ? 'visible' : 'hidden'}
            transition={{ duration: 0.5, delay: 0.75, ease }}
            style={reduced ? {} : { opacity: scrollCueOpacity }}
            className="mt-20 hidden md:flex items-center gap-5"
          >
            <div className="w-px h-16 bg-black/15" />
            <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-black/25">
              {scrollCueText}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Bottom-right label */}
      {(cornerLabelTop || cornerLabelBottom) && (
        <motion.div
          variants={enterVariants}
          initial="hidden"
          animate={ready ? 'visible' : 'hidden'}
          transition={{ duration: 0.5, delay: 0.9, ease }}
          style={reduced ? {} : { opacity: overlineOpacity }}
          className="absolute bottom-8 right-8 lg:bottom-12 lg:right-12 z-10 text-right hidden md:block"
        >
          {cornerLabelTop && (
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50 mb-1">
              {cornerLabelTop}
            </p>
          )}
          {cornerLabelBottom && (
            <p className="text-2xl text-white italic">
              {cornerLabelBottom}
            </p>
          )}
        </motion.div>
      )}
    </section>
  )
}
