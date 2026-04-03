// Dependencies: motion/react
// Source: payload-demo (HubThemeB stakeholder cards)
// Animated card rows with left accent bar, stat value, arrow button, and hover effects.
// Each card links to a detail page. Staggered scroll-reveal entrance.

'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

export interface StakeholderCard {
  id: string
  /** Small numbered label (e.g. "01") */
  label: string
  /** Card title */
  title: string
  /** Italic sub-headline */
  headline: string
  /** Description paragraph */
  description: string
  /** Link destination */
  href: string
  /** Stat displayed on the right */
  stat: { value: string; label: string }
}

interface StakeholderCardRowsProps {
  /** Array of stakeholder cards to render */
  cards: StakeholderCard[]
  /** Section overline label */
  overline?: string
  /** Section heading */
  heading?: string
  /** Right-aligned aside text (desktop only) */
  aside?: string
  /** Primary accent colour */
  accentColor?: string
  /** Hover stat colour */
  accentHoverColor?: string
  /** Render function for links — defaults to <a> tag. Use for Next.js <Link>. */
  renderLink?: (props: { href: string; children: React.ReactNode; className: string; onMouseEnter: () => void; onMouseLeave: () => void }) => React.ReactNode
}

export default function StakeholderCardRows({
  cards,
  overline = 'Choose Your Path',
  heading = 'Solutions by project role',
  aside,
  accentColor = '#0064B0',
  accentHoverColor = '#7ACCEE',
  renderLink,
}: StakeholderCardRowsProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const reduced = useReducedMotion()

  const LinkWrapper = renderLink
    ? (props: { href: string; children: React.ReactNode; className: string; card: StakeholderCard }) => (
        <>{renderLink({ href: props.href, children: props.children, className: props.className, onMouseEnter: () => setHoveredCard(props.card.id), onMouseLeave: () => setHoveredCard(null) })}</>
      )
    : null

  return (
    <section className="relative" style={{ background: '#F3F4F6' }}>
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-8 lg:px-16 pt-20 pb-12">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between border-b pb-8"
          style={{ borderColor: 'rgba(0,0,0,0.1)' }}
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] mb-3" style={{ color: accentColor }}>
              {overline}
            </p>
            <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1.1, letterSpacing: '-0.01em', color: '#0B1221' }}>
              {heading}
            </h2>
          </div>
          {aside && (
            <p className="text-sm opacity-40 hidden md:block max-w-[220px] text-right leading-relaxed">
              {aside}
            </p>
          )}
        </motion.div>
      </div>

      {/* Card rows */}
      <div className="max-w-7xl mx-auto px-8 lg:px-16 pb-24 space-y-4">
        {cards.map((card, i) => {
          const inner = (
            <div
              className="relative bg-white border overflow-hidden transition-all duration-500 hover:shadow-[0_4px_40px_rgba(0,100,176,0.06)]"
              style={{
                borderColor: hoveredCard === card.id ? `${accentColor}33` : 'rgba(0,0,0,0.08)',
                borderRadius: '3px',
              }}
            >
              {/* Left accent bar */}
              <div
                className="absolute inset-y-0 left-0 w-1 transition-all duration-500"
                style={{
                  backgroundColor: accentColor,
                  width: hoveredCard === card.id ? '6px' : '4px',
                  borderRadius: '0 2px 2px 0',
                }}
              />

              <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-0 px-8 md:px-12 py-8 md:py-10">
                {/* Number + Title */}
                <div className="md:w-72 flex-shrink-0">
                  <div className="flex items-baseline gap-4 mb-1">
                    <span className="text-xs font-semibold tracking-widest" style={{ color: `${accentColor}80` }}>
                      {card.label}
                    </span>
                    <span style={{ fontSize: 'clamp(28px,3vw,40px)', color: '#0B1221', lineHeight: 1 }}>
                      {card.title}
                    </span>
                  </div>
                  <p className="italic opacity-40 text-lg ml-8" style={{ color: '#0B1221' }}>
                    {card.headline}
                  </p>
                </div>

                {/* Vertical divider */}
                <div className="hidden md:block w-px self-stretch mx-12 flex-shrink-0" style={{ background: 'rgba(0,0,0,0.08)' }} />

                {/* Description */}
                <p className="text-[15px] opacity-55 leading-relaxed flex-1 font-light max-w-md">
                  {card.description}
                </p>

                {/* Stat + Arrow */}
                <div className="flex items-center gap-10 md:ml-12 flex-shrink-0">
                  <div className="hidden lg:block text-right">
                    <p
                      className="text-3xl leading-none transition-colors duration-300"
                      style={{ color: hoveredCard === card.id ? accentHoverColor : accentColor }}
                    >
                      {card.stat.value}
                    </p>
                    <p className="text-[11px] opacity-35 font-medium tracking-wide mt-1">
                      {card.stat.label}
                    </p>
                  </div>

                  {/* Arrow button */}
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-full border transition-all duration-400 flex-shrink-0"
                    style={{
                      borderColor: hoveredCard === card.id ? accentColor : 'rgba(0,0,0,0.12)',
                      backgroundColor: hoveredCard === card.id ? accentColor : 'transparent',
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="transition-all duration-300"
                      style={{
                        color: hoveredCard === card.id ? '#fff' : 'rgba(0,0,0,0.3)',
                        transform: hoveredCard === card.id ? 'translateX(2px)' : 'none',
                      }}
                    >
                      <path
                        d="M3 8H13M13 8L8 3M13 8L8 13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )

          return (
            <motion.div
              key={card.id}
              initial={reduced ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {LinkWrapper ? (
                <LinkWrapper href={card.href} className="group block" card={card}>
                  {inner}
                </LinkWrapper>
              ) : (
                <a
                  href={card.href}
                  className="group block"
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {inner}
                </a>
              )}
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
