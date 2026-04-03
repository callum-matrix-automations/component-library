// Dependencies: motion/react
// Source: payload-demo (CaseStudyPage NarrativeBody)
// Sticky sidebar navigation with scroll-tracked narrative sections.
// Each section has a ghost watermark number, animated headline, body text,
// and optional pull quote with accent border. The sidebar highlights
// the active section as the user scrolls.

'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useReducedMotion, useInView } from 'motion/react'

/* ─── Types ─── */

export interface NarrativeSectionData {
  /** Unique section ID (used for scroll anchoring) */
  id: string
  /** Display label in the sidebar nav */
  label: string
  /** Section number displayed as ghost watermark (e.g. "01") */
  num: string
  /** Section headline */
  headline: string
  /** Section body text */
  body: string
  /** Optional pull quote with accent border */
  pullQuote?: string
}

interface StickyNarrativeSectionsProps {
  /** Array of narrative sections */
  sections: NarrativeSectionData[]
  /** Accent colour for active nav dot, pull quote border */
  accentColor?: string
  /** Sidebar label above the nav (desktop only) */
  sidebarLabel?: string
  /** Breakpoint below which sidebar is hidden (default: 1024) */
  mobileBreakpoint?: number
}

/* ─── Single Narrative Section ─── */

function NarrativeSection({
  section,
  accentColor,
  onEnterView,
}: {
  section: NarrativeSectionData
  accentColor: string
  onEnterView: (id: string) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, margin: '-40% 0px -40% 0px' })
  const animRef = useRef<HTMLDivElement>(null)
  const animInView = useInView(animRef, { once: true, margin: '-8% 0px' })
  const reduced = useReducedMotion()

  useEffect(() => {
    if (inView) {
      onEnterView(section.id)
    }
  }, [inView, section.id, onEnterView])

  return (
    <div id={section.id} ref={ref} className="relative py-16 sm:py-20">
      {/* Ghost section number */}
      <div
        className="absolute top-8 right-0 select-none pointer-events-none leading-none"
        style={{
          fontSize: 'clamp(100px,14vw,180px)',
          color: accentColor,
          opacity: 0.08,
        }}
        aria-hidden="true"
      >
        {section.num}
      </div>

      <div ref={animRef} className="relative z-10">
        <motion.h2
          className="text-[#1A1A1A] leading-tight mb-6"
          style={{ fontSize: 'clamp(28px,3vw,44px)' }}
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={animInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          {section.headline}
        </motion.h2>

        <motion.p
          className="text-[15px] text-[#4B5563]"
          style={{ lineHeight: 1.9 }}
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={animInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {section.body}
        </motion.p>

        {section.pullQuote && (
          <motion.blockquote
            className="mt-8 text-[14px] italic text-[#374151]"
            style={{
              borderLeft: `3px solid ${accentColor}`,
              background: `${accentColor}0A`,
              padding: '14px 20px',
              lineHeight: 1.7,
            }}
            initial={reduced ? false : { opacity: 0, x: -12 }}
            animate={animInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {section.pullQuote}
          </motion.blockquote>
        )}
      </div>

      {/* Section separator */}
      <div className="mt-16 h-px" style={{ background: '#E5E7EB' }} />
    </div>
  )
}

/* ─── Main Component ─── */

export default function StickyNarrativeSections({
  sections,
  accentColor = '#0064B0',
  sidebarLabel = 'Sections',
  mobileBreakpoint = 1024,
}: StickyNarrativeSectionsProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? '')
  const isMobile = typeof window !== 'undefined' && window.matchMedia(`(max-width: ${mobileBreakpoint}px)`).matches

  const handleEnterView = useCallback((id: string) => {
    setActiveSection(id)
  }, [])

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="bg-white px-5 sm:px-8 lg:px-16 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-16 lg:gap-24 items-start">
          {/* Sticky sidebar — desktop only */}
          {!isMobile && (
            <div
              className="hidden lg:block flex-shrink-0 w-44"
              style={{ position: 'sticky', top: '6rem', alignSelf: 'flex-start' }}
            >
              <p className="text-[9px] uppercase tracking-[0.35em] mb-6" style={{ color: '#9CA3AF' }}>
                {sidebarLabel}
              </p>
              <nav className="flex flex-col gap-1">
                {sections.map((s) => {
                  const isActive = activeSection === s.id
                  return (
                    <button
                      key={s.id}
                      onClick={() => handleNavClick(s.id)}
                      className="group flex items-center gap-3 text-left py-2 transition-colors"
                    >
                      <div
                        className="flex-shrink-0 w-[6px] h-[6px] rounded-full transition-all duration-300"
                        style={{
                          background: isActive ? accentColor : '#D1D5DB',
                          transform: isActive ? 'scale(1.4)' : 'scale(1)',
                        }}
                      />
                      <span
                        className="text-[12px] transition-colors duration-200"
                        style={{
                          color: isActive ? accentColor : '#9CA3AF',
                          fontWeight: isActive ? 600 : 400,
                        }}
                      >
                        {s.label}
                      </span>
                    </button>
                  )
                })}
              </nav>
            </div>
          )}

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {sections.map((s) => (
              <NarrativeSection
                key={s.id}
                section={s}
                accentColor={accentColor}
                onEnterView={handleEnterView}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
