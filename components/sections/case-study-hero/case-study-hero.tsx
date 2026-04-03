// Dependencies: motion/react
// Source: payload-demo (CaseStudyPage Hero)
// Full-screen hero with parallax background image, dark gradient overlay,
// project name + metadata pinned to the bottom-left, scroll indicator centred,
// and an optional tagline positioned bottom-right.

'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

interface CaseStudyHeroProps {
  /** Hero background image URL */
  heroImage: string
  /** Project name (large headline) */
  projectName: string
  /** Overline text (e.g. "Commercial Office — Specialist Subcontractor") */
  overline?: string
  /** Location + year label */
  locationLabel?: string
  /** Italic tagline positioned bottom-right */
  tagline?: string
  /** Whether entrance animations should play */
  ready?: boolean
  /** Accent colour for the scroll indicator */
  accentColor?: string
}

export default function CaseStudyHero({
  heroImage,
  projectName,
  overline,
  locationLabel,
  tagline,
  ready = true,
  accentColor = '#0064B0',
}: CaseStudyHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const ease = [0.16, 1, 0.3, 1] as const

  return (
    <div ref={heroRef} className="relative min-h-screen overflow-hidden">
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0"
        style={reduced ? {} : { y: bgY }}
      >
        <img
          src={heroImage}
          alt={projectName}
          className="w-full h-full object-cover object-center"
          style={{ minHeight: '110%', marginTop: '-5%' }}
        />
      </motion.div>

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.85) 100%)',
        }}
      />

      {/* Content — bottom-left */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end pb-14 sm:pb-20 px-6 sm:px-10 lg:px-16">
        {/* Overline */}
        {overline && (
          <motion.p
            className="text-[10px] uppercase tracking-[0.35em] mb-4 sm:mb-5"
            style={{ color: 'rgba(255,255,255,0.45)' }}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            {overline}
          </motion.p>
        )}

        {/* Project name */}
        <div className="overflow-hidden">
          <motion.h1
            className="text-white leading-[0.92] tracking-tight"
            style={{ fontSize: 'clamp(52px,6vw,88px)' }}
            initial={reduced ? false : { opacity: 0, y: 40 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35, ease }}
          >
            {projectName}
          </motion.h1>
        </div>

        {/* Location + year */}
        {locationLabel && (
          <motion.p
            className="text-[13px] mt-4"
            style={{ color: 'rgba(255,255,255,0.5)' }}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.55, ease }}
          >
            {locationLabel}
          </motion.p>
        )}

        {/* Scroll indicator — bottom centre */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={reduced ? false : { opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <span className="text-[9px] uppercase tracking-[0.35em]" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Scroll
          </span>
          <div className="relative w-px h-10 overflow-hidden" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <motion.div
              className="absolute top-0 left-0 w-full"
              style={{ height: '40%', background: `${accentColor}99` }}
              animate={{ y: ['0%', '180%'] }}
              transition={{ duration: 1.4, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.3 }}
            />
          </div>
        </motion.div>
      </div>

      {/* Tagline — bottom-right */}
      {tagline && (
        <motion.p
          className="absolute bottom-14 sm:bottom-20 right-6 sm:right-10 lg:right-16 z-10 italic text-right"
          style={{
            fontSize: 'clamp(18px,2.2vw,30px)',
            color: 'rgba(255,255,255,0.65)',
            maxWidth: '340px',
          }}
          initial={reduced ? false : { opacity: 0, x: 24 }}
          animate={ready ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7, ease }}
        >
          {tagline}
        </motion.p>
      )}
    </div>
  )
}
