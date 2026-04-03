// Dependencies: motion/react
// Source: payload-demo (BuildersThemeA hero)
// Full-screen hero with a left headline area and a right 2x2 quadrant grid.
// Top quadrants show before/after descriptions; bottom quadrants show metrics
// with animated comparison bars. Includes animated graph-paper grid background.
// Staggered entrance animations tied to a "ready" prop.

'use client'

import { motion, useReducedMotion } from 'motion/react'

/* ─── Types ─── */

export interface QuadrantDescription {
  label: string
  body: string
  badge?: string
  /** Whether this is the "after" / highlighted variant */
  isHighlighted?: boolean
}

export interface QuadrantMetric {
  label: string
  value: string
  unit?: string
  /** Percentage width for the comparison bar (0–100) */
  barPercent?: number
  barNote?: string
  /** Whether this is the "after" / highlighted variant */
  isHighlighted?: boolean
}

interface SplitPanelHeroProps {
  /** Overline label */
  overline?: string
  /** Main headline */
  headline: string
  /** Headline accent (second line, different colour) */
  headlineAccent?: string
  /** Subtitle paragraph */
  subtitle?: string
  /** Accent colour */
  accentColor?: string
  /** Top-left quadrant */
  topLeft: QuadrantDescription
  /** Top-right quadrant */
  topRight: QuadrantDescription
  /** Bottom-left quadrant */
  bottomLeft: QuadrantMetric
  /** Bottom-right quadrant */
  bottomRight: QuadrantMetric
  /** Whether entrance animations should play */
  ready?: boolean
  /** Animated graph-paper background on the left panel */
  showGridBackground?: boolean
}

/* ─── Animated Grid Background ─── */

function AnimatedGridBg() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        className="absolute"
        style={{
          width: '200%',
          height: '200%',
          top: '-50%',
          left: '-50%',
          backgroundImage:
            'linear-gradient(rgba(0,100,176,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,100,176,0.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        animate={{ x: [0, -48], y: [0, -48] }}
        transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
      />
    </motion.div>
  )
}

/* ─── Description Quadrant ─── */

function DescriptionQuadrant({
  data,
  accentColor,
  ready,
  delay,
  reducedMotion,
}: {
  data: QuadrantDescription
  accentColor: string
  ready: boolean
  delay: number
  reducedMotion: boolean | null
}) {
  const isHl = data.isHighlighted
  return (
    <motion.div
      className="relative overflow-hidden flex flex-col p-8 xl:p-12 gap-6"
      style={{
        background: isHl ? '#EBF4FB' : '#F8F9FB',
        borderLeft: `1px solid ${isHl ? `${accentColor}26` : '#E0E4EB'}`,
        borderBottom: `1px solid ${isHl ? `${accentColor}26` : '#E0E4EB'}`,
      }}
      initial={reducedMotion ? false : { opacity: 0, x: 24 }}
      animate={ready ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${isHl ? `${accentColor}12` : '#D4D9E3'} 1px, transparent 1px), linear-gradient(90deg, ${isHl ? `${accentColor}12` : '#D4D9E3'} 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          opacity: isHl ? 1 : 0.45,
        }}
      />
      {isHl && <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ backgroundColor: accentColor }} />}
      <div className="relative z-10 flex flex-col h-full">
        <p
          className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-6"
          style={{ color: isHl ? accentColor : '#9CA3AF' }}
        >
          {data.label}
        </p>
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-[14px] xl:text-[15px] leading-[1.85] font-light" style={{ color: isHl ? '#1A3A5C' : '#4B5563' }}>
            {data.body}
          </p>
        </div>
        {data.badge && (
          <div className="flex items-center gap-2 mt-8">
            <div className="w-[6px] h-[6px] rounded-full" style={{ backgroundColor: isHl ? accentColor : '#D1D5DB' }} />
            <span className="text-[10px] uppercase tracking-[0.25em]" style={{ color: isHl ? accentColor : '#9CA3AF' }}>
              {data.badge}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

/* ─── Metric Quadrant ─── */

function MetricQuadrant({
  data,
  accentColor,
  ready,
  delay,
  reducedMotion,
}: {
  data: QuadrantMetric
  accentColor: string
  ready: boolean
  delay: number
  reducedMotion: boolean | null
}) {
  const isHl = data.isHighlighted
  return (
    <motion.div
      className="relative overflow-hidden flex flex-col p-8 xl:p-12"
      style={{
        background: isHl ? accentColor : '#ECEEF2',
        borderLeft: `1px solid ${isHl ? 'rgba(255,255,255,0.12)' : '#E0E4EB'}`,
      }}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      animate={ready ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Diagonal stripes for highlighted */}
      {isHl && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-stripe" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="32" stroke="rgba(255,255,255,0.07)" strokeWidth="10" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-stripe)" />
        </svg>
      )}

      {/* Ghost number */}
      {isHl && (
        <div
          className="absolute right-6 bottom-4 select-none pointer-events-none leading-none"
          style={{ fontSize: 'clamp(100px,11vw,160px)', color: 'white', opacity: 0.07 }}
          aria-hidden="true"
        >
          {data.value}
        </div>
      )}

      <div className="relative z-10 flex flex-col h-full">
        <p
          className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-6"
          style={{ color: isHl ? 'rgba(255,255,255,0.5)' : '#9CA3AF' }}
        >
          {data.label}
        </p>
        <div className="flex-1 flex flex-col justify-center">
          <p
            className="leading-none tracking-tight"
            style={{
              fontSize: 'clamp(64px,6vw,96px)',
              color: isHl ? 'white' : '#313131',
            }}
          >
            {data.value}
          </p>
          {data.unit && (
            <p
              className="text-[13px] mt-3 uppercase tracking-[0.2em]"
              style={{ color: isHl ? 'rgba(255,255,255,0.5)' : '#9CA3AF' }}
            >
              {data.unit}
            </p>
          )}
        </div>

        {/* Comparison bar */}
        {data.barPercent !== undefined && (
          <div className="mt-8">
            <div
              className="h-[5px] w-full overflow-hidden"
              style={{
                background: isHl ? 'rgba(255,255,255,0.15)' : '#D1D5DB',
                borderRadius: 2,
              }}
            >
              <div
                className="h-full"
                style={{
                  width: `${data.barPercent}%`,
                  background: isHl ? 'rgba(255,255,255,0.65)' : '#B0B7C3',
                  borderRadius: 2,
                }}
              />
            </div>
            {data.barNote && (
              <p
                className="text-[9px] mt-2 uppercase tracking-[0.2em]"
                style={{ color: isHl ? 'rgba(255,255,255,0.35)' : '#B0B7C3' }}
              >
                {data.barNote}
              </p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

/* ─── Main Component ─── */

export default function SplitPanelHero({
  overline,
  headline,
  headlineAccent,
  subtitle,
  accentColor = '#0064B0',
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  ready = true,
  showGridBackground = true,
}: SplitPanelHeroProps) {
  const reduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as const

  return (
    <div className="relative min-h-screen overflow-hidden flex">
      {/* Left panel — headline */}
      <div className="relative w-full lg:w-[48%] flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-20" style={{ background: '#FFFFFF' }}>
        {showGridBackground && <AnimatedGridBg />}

        <div className="relative z-10">
          {overline && (
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1, ease }}
            >
              <div className="w-8 h-px" style={{ backgroundColor: accentColor }} />
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: accentColor }}>
                {overline}
              </span>
            </motion.div>
          )}

          <motion.h1
            className="leading-[0.95] tracking-tight text-[#1A1A1A]"
            style={{ fontSize: 'clamp(40px,5.5vw,80px)' }}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease }}
          >
            {headline}
            {headlineAccent && (
              <>
                <br />
                <span style={{ color: accentColor }}>{headlineAccent}</span>
              </>
            )}
          </motion.h1>

          {subtitle && (
            <motion.p
              className="mt-6 text-[15px] text-[#6B7280] max-w-md leading-relaxed font-light"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>

      {/* Right panel — 2x2 quadrant grid (desktop only) */}
      <div className="hidden lg:grid absolute right-0 bottom-0 w-[52%] grid-cols-2 grid-rows-2" style={{ top: '0' }}>
        <DescriptionQuadrant data={topLeft} accentColor={accentColor} ready={ready} delay={0.8} reducedMotion={reduced} />
        <DescriptionQuadrant data={topRight} accentColor={accentColor} ready={ready} delay={0.95} reducedMotion={reduced} />
        <MetricQuadrant data={bottomLeft} accentColor={accentColor} ready={ready} delay={1.05} reducedMotion={reduced} />
        <MetricQuadrant data={bottomRight} accentColor={accentColor} ready={ready} delay={1.2} reducedMotion={reduced} />
      </div>
    </div>
  )
}
