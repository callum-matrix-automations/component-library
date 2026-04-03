// Dependencies: motion/react
// Source: payload-demo (CaseStudyPage MetricCard + OverviewSection)
// Grid of metric stat cards with staggered scroll-reveal entrance.
// Each card has a large coloured value, label, optional sublabel,
// and a coloured top accent border.

'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useInView } from 'motion/react'

export interface Metric {
  /** Large display value (e.g. "7", "40%") */
  value: string
  /** Primary label (e.g. "Weeks Saved") */
  label: string
  /** Secondary description (e.g. "vs. original programme") */
  sublabel?: string
}

interface MetricStatCardsProps {
  /** Array of metrics to display */
  metrics: Metric[]
  /** Number of grid columns (default: responsive 2-col on mobile, metrics.length on desktop) */
  columns?: number
  /** Accent colour for the value text and top border */
  accentColor?: string
  /** Card background colour */
  cardBackground?: string
  /** Card border colour */
  cardBorder?: string
  /** Gap between cards in Tailwind spacing (default: "gap-4") */
  gapClass?: string
}

function MetricCard({
  metric,
  index,
  accentColor,
  cardBackground,
  cardBorder,
}: {
  metric: Metric
  index: number
  accentColor: string
  cardBackground: string
  cardBorder: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduced = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden p-6"
      style={{
        background: cardBackground,
        border: `1px solid ${cardBorder}`,
        borderTop: `3px solid ${accentColor}`,
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
      }}
      initial={reduced ? false : { opacity: 0, y: 24, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.1 * index,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <p
        className="leading-none mb-2"
        style={{ fontSize: 'clamp(48px,5vw,72px)', color: accentColor }}
      >
        {metric.value}
      </p>
      <p className="text-[11px] uppercase tracking-[0.25em] text-[#1A1A1A] mb-1">
        {metric.label}
      </p>
      {metric.sublabel && (
        <p className="text-[11px]" style={{ color: '#9CA3AF' }}>
          {metric.sublabel}
        </p>
      )}
    </motion.div>
  )
}

export default function MetricStatCards({
  metrics,
  columns,
  accentColor = '#0064B0',
  cardBackground = '#FFFFFF',
  cardBorder = '#DFE3EA',
  gapClass = 'gap-4',
}: MetricStatCardsProps) {
  const cols = columns ?? metrics.length
  const gridCols =
    cols === 2
      ? 'grid-cols-2'
      : cols === 3
        ? 'grid-cols-2 lg:grid-cols-3'
        : 'grid-cols-2 lg:grid-cols-4'

  return (
    <div className={`grid ${gridCols} ${gapClass}`}>
      {metrics.map((metric, i) => (
        <MetricCard
          key={i}
          metric={metric}
          index={i}
          accentColor={accentColor}
          cardBackground={cardBackground}
          cardBorder={cardBorder}
        />
      ))}
    </div>
  )
}
