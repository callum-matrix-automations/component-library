// Dependencies: motion/react
// Source: payload-demo (OwnersThemeA — horizontal card scroll)
// Scroll-driven horizontal card carousel: cards translate left as the user scrolls
// vertically through a tall container. Each card has a gradient background, stat hero,
// video panel, headline, body text, and a 2x2 benefit grid. Includes mobile fallback
// with vertical stacking. The last card is a CTA card.

'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, useInView } from 'motion/react'

/* ─── Types ─── */

export interface BenefitItem {
  icon: React.ReactNode
  label: string
}

export interface CardData {
  id: string
  index: string
  headline: string
  body: string
  stat: { value: string; unit: string }
  accent: string
  accentLight: string
  gradientFrom: string
  gradientTo: string
  benefits: BenefitItem[]
  /** Optional video or image URL for the media panel */
  mediaSrc?: string
  /** "video" or "image" — defaults to "image" */
  mediaType?: 'video' | 'image'
}

interface HorizontalCardScrollProps {
  /** Content cards to display */
  cards: CardData[]
  /** Section label (top-left on desktop) */
  sectionLabel?: string
  /** Card width in vw units (default: 50) */
  cardWidth?: number
  /** Gap between cards in vw units (default: 2) */
  cardGap?: number
  /** Card height in vh units (default: 68) */
  cardHeight?: number
  /** Breakpoint below which mobile layout is used (default: 768) */
  mobileBreakpoint?: number
}

/* ─── Desktop Card ─── */

function DesktopCard({
  card,
  index,
  cardW,
  cardH,
  scrollYProgress,
  totalCards,
}: {
  card: CardData
  index: number
  cardW: number
  cardH: number
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
  totalCards: number
}) {
  const reduced = useReducedMotion()
  const seg = 1 / (totalCards + 1)
  const entryStart = index * seg
  const entryEnd = entryStart + seg * 0.4

  const cardOpacity = useTransform(scrollYProgress, [entryStart, entryEnd], [0, 1])
  const cardScale = useTransform(scrollYProgress, [entryStart, entryEnd], [0.96, 1])

  return (
    <motion.div
      className="flex-shrink-0 overflow-hidden relative"
      style={{
        width: `${cardW}vw`,
        height: `${cardH}vh`,
        background: `linear-gradient(135deg, ${card.gradientFrom} 0%, ${card.gradientTo} 100%)`,
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '20px',
        ...(reduced ? {} : { opacity: cardOpacity, scale: cardScale }),
      }}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{ background: card.accent, borderRadius: '20px 0 0 20px' }}
      />

      {/* Ghost index */}
      <div
        className="absolute left-5 bottom-4 select-none pointer-events-none leading-none"
        style={{ fontSize: 'clamp(80px, 10vw, 130px)', color: card.accent, opacity: 0.07 }}
        aria-hidden="true"
      >
        {card.index}
      </div>

      {/* Two-column layout */}
      <div className="relative h-full flex flex-row pl-[3px]">
        {/* Left column */}
        <div className="flex-1 flex flex-col justify-between px-8 lg:px-10 py-8 lg:py-10 border-r border-white/[0.06]">
          {/* Stat */}
          <div>
            <p className="leading-none tracking-tight mb-1" style={{ fontSize: 'clamp(52px, 6vw, 80px)', color: card.accentLight }}>
              {card.stat.value}
            </p>
            <p className="text-[10px] uppercase tracking-[0.3em] mb-7" style={{ color: `${card.accentLight}99` }}>
              {card.stat.unit}
            </p>
            <div className="w-8 h-[2px] mb-5" style={{ background: card.accent }} />
          </div>

          {/* Media panel */}
          {card.mediaSrc && (
            <div className="relative w-full overflow-hidden rounded-sm flex-shrink-0" style={{ height: '38%' }}>
              {card.mediaType === 'video' ? (
                <video src={card.mediaSrc} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover object-center" />
              ) : (
                <img src={card.mediaSrc} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
              )}
              <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(to bottom, ${card.gradientFrom}99 0%, transparent 30%, transparent 70%, ${card.gradientFrom}CC 100%)` }} />
            </div>
          )}

          {/* Headline + body */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em]" style={{ color: card.accent }}>
                {card.index}
              </span>
              <div className="h-px flex-1" style={{ background: `${card.accent}40` }} />
            </div>
            <h2 className="text-white mb-4" style={{ fontSize: 'clamp(20px, 2vw, 28px)', lineHeight: 1.1 }}>
              {card.headline}
            </h2>
            <p className="text-[12.5px] leading-[1.75] font-light" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {card.body}
            </p>
          </div>
        </div>

        {/* Right column — benefits */}
        <div className="w-[42%] flex flex-col justify-center px-7 lg:px-8 py-8">
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            {card.benefits.map((b, bi) => (
              <div key={bi} className="flex flex-col gap-2">
                <div
                  className="w-8 h-8 flex items-center justify-center rounded-sm flex-shrink-0"
                  style={{ background: `${card.accent}18`, border: `1px solid ${card.accent}30` }}
                >
                  {b.icon}
                </div>
                <span className="text-[11.5px] leading-[1.4] font-light" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Mobile Card ─── */

function MobileCard({ card }: { card: CardData }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${card.gradientFrom} 0%, ${card.gradientTo} 100%)`,
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '16px',
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: card.accent, borderRadius: '16px 0 0 16px' }} />

      <div className="absolute right-4 bottom-3 leading-none select-none pointer-events-none" style={{ fontSize: '72px', color: card.accent, opacity: 0.07 }} aria-hidden="true">
        {card.index}
      </div>

      <div className="relative p-6 pl-5">
        <p className="leading-none tracking-tight mb-1" style={{ fontSize: '44px', color: card.accentLight }}>
          {card.stat.value}
        </p>
        <p className="text-[10px] uppercase tracking-[0.3em] mb-5" style={{ color: `${card.accentLight}99` }}>
          {card.stat.unit}
        </p>

        <div className="w-8 h-[2px] mb-5" style={{ background: card.accent }} />

        {card.mediaSrc && (
          <div className="relative w-full overflow-hidden rounded-sm mb-5" style={{ height: '160px' }}>
            {card.mediaType === 'video' ? (
              <video src={card.mediaSrc} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <img src={card.mediaSrc} alt="" className="absolute inset-0 w-full h-full object-cover" />
            )}
          </div>
        )}

        <div className="flex items-center gap-2.5 mb-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em]" style={{ color: card.accent }}>
            {card.index}
          </span>
          <div className="h-px flex-1" style={{ background: `${card.accent}40` }} />
        </div>
        <h2 className="text-white mb-3" style={{ fontSize: '22px', lineHeight: 1.1 }}>
          {card.headline}
        </h2>
        <p className="text-[12.5px] leading-[1.75] font-light mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
          {card.body}
        </p>

        <div className="grid grid-cols-2 gap-x-4 gap-y-4">
          {card.benefits.map((b, bi) => (
            <div key={bi} className="flex flex-col gap-1.5">
              <div className="w-7 h-7 flex items-center justify-center rounded-sm" style={{ background: `${card.accent}18`, border: `1px solid ${card.accent}30` }}>
                {b.icon}
              </div>
              <span className="text-[11px] leading-[1.4] font-light" style={{ color: 'rgba(255,255,255,0.65)' }}>
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Main Component ─── */

export default function HorizontalCardScroll({
  cards,
  sectionLabel,
  cardWidth = 50,
  cardGap = 2,
  cardHeight = 68,
  mobileBreakpoint = 768,
}: HorizontalCardScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  // Simple mobile detection via matchMedia
  const isMobile = typeof window !== 'undefined' && window.matchMedia(`(max-width: ${mobileBreakpoint}px)`).matches

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  })

  const totalCards = cards.length
  const lastCardNaturalLeft = 3 + totalCards * (cardWidth + cardGap) - (cardWidth + cardGap)
  const lastCardTargetLeft = 50 - cardWidth / 2
  const endX = lastCardNaturalLeft - lastCardTargetLeft

  const trackX = useTransform(scrollYProgress, [0, 1], ['100vw', `-${endX}vw`])

  if (isMobile) {
    return (
      <div className="relative py-16 px-5" style={{ background: 'linear-gradient(180deg, #0B0D0F 0%, #0C1018 15%, #0a1520 60%, #0C1018 85%, #0B0D0F 100%)' }}>
        {sectionLabel && (
          <div className="mb-8">
            <p className="text-[9px] uppercase tracking-[0.35em] text-white/20">{sectionLabel}</p>
          </div>
        )}
        <div className="flex flex-col gap-6">
          {cards.map((card) => (
            <MobileCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{
        height: `${totalCards * 100}vh`,
        background: 'linear-gradient(180deg, #0B0D0F 0%, #0C1018 15%, #0a1520 60%, #0C1018 85%, #0B0D0F 100%)',
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {sectionLabel && (
          <div className="absolute top-8 left-8 z-20">
            <p className="text-[9px] uppercase tracking-[0.35em] text-white/20">{sectionLabel}</p>
          </div>
        )}

        <motion.div
          className="flex items-center"
          style={{
            gap: `${cardGap}vw`,
            paddingLeft: '3vw',
            paddingRight: '3vw',
            ...(reduced ? {} : { x: trackX }),
          }}
        >
          {cards.map((card, i) => (
            <DesktopCard
              key={card.id}
              card={card}
              index={i}
              cardW={cardWidth}
              cardH={cardHeight}
              scrollYProgress={scrollYProgress}
              totalCards={cards.length}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}
