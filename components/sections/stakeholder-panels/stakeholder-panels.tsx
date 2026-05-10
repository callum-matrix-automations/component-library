// Dependencies: motion, react-icons
// Source: overcast-website

'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { TbArrowNarrowRight, TbRulerMeasure, TbCrane, TbBuildingSkyscraper } from 'react-icons/tb'
import { useIntersectionObserver } from '../../../hooks/use-intersection-observer'
import type { IconType } from 'react-icons'

export interface StakeholderPanel {
  id: string
  label: string
  headline: string
  description: string
  cta: string
  href: string
  accent: string
  icon: IconType
  gradient: string
}

export interface StakeholderPanelsProps {
  subtitle?: string
  heading?: string
  panels?: StakeholderPanel[]
}

const defaultPanels: StakeholderPanel[] = [
  {
    id: 'design',
    label: 'Design',
    headline: 'Specify with Confidence',
    description:
      'Integration-ready ceiling assemblies with full architectural documentation, system diagrams, and detailed case studies that make it easy to include Overcast as basis of design.',
    cta: 'Explore Architect Resources',
    href: '#products',
    accent: '#0064B0',
    icon: TbRulerMeasure,
    gradient: 'linear-gradient(135deg, #002E52 0%, #0064B0 60%, #0078D4 100%)',
  },
  {
    id: 'build',
    label: 'Build',
    headline: 'Faster, Simpler Delivery',
    description:
      'Plug-and-play assemblies that eliminate 6+ trade interfaces. Step-by-step guidance on bidding, planning, and installing — with proof of efficiency gains from real builds.',
    cta: 'Get Implementation Details',
    href: '#process',
    accent: '#FF6D1F',
    icon: TbCrane,
    gradient: 'linear-gradient(135deg, #4A1A00 0%, #8B3A0F 60%, #CC5500 100%)',
  },
  {
    id: 'own',
    label: 'Own',
    headline: 'Lower Cost, Higher Value',
    description:
      'Clear cost comparisons, ROI data, and real-world project results that demonstrate lower construction costs and reduced long-term maintenance.',
    cta: 'See the Business Case',
    href: '#case-study',
    accent: '#6FFFE9',
    icon: TbBuildingSkyscraper,
    gradient: 'linear-gradient(135deg, #003D3D 0%, #0A5A52 60%, #0F7A6E 100%)',
  },
]

export default function StakeholderPanels({
  subtitle = 'Your Role, Your Path',
  heading = 'Built for How You Work',
  panels = defaultPanels,
}: StakeholderPanelsProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const reduced = useReducedMotion()
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 })

  return (
    <section
      ref={ref}
      className="relative bg-white"
      style={{ paddingTop: 48, paddingBottom: 0 }}
    >
      {/* Section Header */}
      <div className="mx-auto max-w-[1280px] px-6 pb-8 text-center lg:px-8">
        <motion.span
          className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.3em] text-blue-600"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {subtitle}
        </motion.span>
        <motion.h2
          className="text-gray-900"
          style={{
            fontSize: 'clamp(32px, 5vw, 52px)',
            lineHeight: 1.1,
            fontWeight: 700,
          }}
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {heading}
        </motion.h2>
      </div>

      {/* Three Portals — Desktop */}
      <div className="hidden lg:flex" style={{ minHeight: '85vh' }}>
        {panels.map((panel, i) => {
          const isHovered = hoveredId === panel.id
          const hasHover = hoveredId !== null
          const Icon = panel.icon

          return (
            <motion.div
              key={panel.id}
              className="group relative cursor-pointer overflow-hidden"
              style={{
                flex: isHovered ? '1 1 50%' : hasHover ? '1 1 25%' : '1 1 33.33%',
                transition: 'flex 500ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={() => setHoveredId(panel.id)}
              onMouseLeave={() => setHoveredId(null)}
              initial={reduced ? false : { opacity: 0, y: 60 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Background gradient */}
              <div
                className="absolute inset-0 transition-transform duration-700 ease-out"
                style={{
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                  background: panel.gradient,
                }}
              />

              {/* Diagonal stripes texture */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.5) 10px, rgba(255,255,255,0.5) 11px)',
                }}
              />

              {/* Architectural grid */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                  backgroundSize: '60px 60px',
                }}
              />

              {/* Dark overlay */}
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{ backgroundColor: isHovered ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.35)' }}
              />

              {/* Left accent stripe */}
              <div
                className="absolute top-0 bottom-0 left-0 z-10 w-[4px]"
                style={{ backgroundColor: panel.accent }}
              />

              {/* Content */}
              <div className="relative z-10 flex h-full flex-col justify-end p-8 lg:p-10">
                {/* Icon */}
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg transition-all duration-300"
                  style={{
                    backgroundColor: `${panel.accent}18`,
                    border: `1px solid ${panel.accent}30`,
                  }}
                >
                  <Icon size={22} color={panel.accent} />
                </div>

                {/* Label */}
                <span
                  className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.3em] transition-all duration-300"
                  style={{ color: panel.accent }}
                >
                  {panel.label}
                </span>

                {/* Headline */}
                <h3
                  className="mb-3 text-white transition-all duration-300"
                  style={{
                    fontSize: isHovered ? 'clamp(28px, 2.5vw, 36px)' : 'clamp(24px, 2vw, 30px)',
                    lineHeight: 1.15,
                    fontWeight: 700,
                  }}
                >
                  {panel.headline}
                </h3>

                {/* Description — reveals on hover */}
                <div
                  className="overflow-hidden transition-all duration-500 ease-out"
                  style={{
                    maxHeight: isHovered ? '200px' : '0px',
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
                  }}
                >
                  <p className="mb-6 max-w-md text-[14px] leading-[1.7] text-white/60">
                    {panel.description}
                  </p>
                </div>

                {/* CTA */}
                <a
                  href={panel.href}
                  className="inline-flex items-center gap-2 rounded border px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition-all duration-300"
                  style={{ borderColor: `${panel.accent}40` }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = panel.accent
                    e.currentTarget.style.backgroundColor = `${panel.accent}15`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${panel.accent}40`
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  {panel.cta}
                  <TbArrowNarrowRight size={14} color={panel.accent} />
                </a>
              </div>

              {/* Ghost number */}
              <span
                className="pointer-events-none absolute right-6 bottom-8 select-none text-[120px] font-bold leading-none text-white/[0.03]"
              >
                0{i + 1}
              </span>
            </motion.div>
          )
        })}
      </div>

      {/* Three Portals — Mobile */}
      <div className="flex flex-col lg:hidden">
        {panels.map((panel, i) => {
          const Icon = panel.icon
          return (
            <motion.div
              key={panel.id}
              className="relative overflow-hidden"
              style={{ minHeight: '70vh' }}
              initial={reduced ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Background gradient */}
              <div className="absolute inset-0" style={{ background: panel.gradient }} />

              {/* Diagonal stripes texture */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.5) 10px, rgba(255,255,255,0.5) 11px)',
                }}
              />

              {/* Architectural grid */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                  backgroundSize: '60px 60px',
                }}
              />

              <div className="absolute inset-0 bg-black/25" />

              {/* Left accent stripe */}
              <div
                className="absolute top-0 bottom-0 left-0 z-10 w-[4px]"
                style={{ backgroundColor: panel.accent }}
              />

              {/* Content */}
              <div className="relative z-10 flex h-full flex-col justify-end p-6 pb-10">
                <div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: `${panel.accent}18`,
                    border: `1px solid ${panel.accent}30`,
                  }}
                >
                  <Icon size={20} color={panel.accent} />
                </div>

                <span
                  className="mb-2 text-[11px] font-semibold uppercase tracking-[0.3em]"
                  style={{ color: panel.accent }}
                >
                  {panel.label}
                </span>

                <h3
                  className="mb-3 text-[28px] font-bold leading-[1.15] text-white"
                >
                  {panel.headline}
                </h3>

                <p className="mb-6 max-w-md text-[14px] leading-[1.7] text-white/55">
                  {panel.description}
                </p>

                <a
                  href={panel.href}
                  className="inline-flex w-fit items-center gap-2 rounded border px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white"
                  style={{ borderColor: `${panel.accent}40` }}
                >
                  {panel.cta}
                  <TbArrowNarrowRight size={14} color={panel.accent} />
                </a>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
