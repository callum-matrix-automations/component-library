// Dependencies: motion
// Source: payload-demo (solutions/owners)

'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

export interface VideoFeatureCardBenefit {
  icon: string
  label: string
}

export interface VideoFeatureCardProps {
  index?: string
  headline: string
  body: string
  stat: { value: string; unit: string }
  videoSrc?: string
  youtubeVideoId?: string
  benefits?: VideoFeatureCardBenefit[]
  accent?: string
  accentLight?: string
  gradientFrom?: string
  gradientTo?: string
}

function BenefitIcon({ name, color }: { name: string; color: string }) {
  const props = { width: 16, height: 16, viewBox: '0 0 16 16', fill: 'none', stroke: color, strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

  switch (name) {
    case 'wrench':
      return <svg {...props}><path d="M10.5 2.5a3 3 0 0 1-3 4.5L3 11.5a1.5 1.5 0 0 0 2 2L9.5 9a3 3 0 0 1 4-3.5" /></svg>
    case 'trending':
      return <svg {...props}><polyline points="1,11 5,7 9,9 13,4" /><polyline points="10,4 13,4 13,7" /></svg>
    case 'refresh':
      return <svg {...props}><path d="M13 2v4h-4" /><path d="M3 14v-4h4" /><path d="M13 6A6 6 0 0 0 4.3 4.3" /><path d="M3 10a6 6 0 0 0 8.7 1.7" /></svg>
    case 'layers':
      return <svg {...props}><polygon points="8,1 15,5 8,9 1,5" /><polyline points="1,9 8,13 15,9" /><polyline points="1,12 8,16 15,12" /></svg>
    case 'grid':
      return <svg {...props}><rect x="1" y="1" width="6" height="6" /><rect x="9" y="1" width="6" height="6" /><rect x="1" y="9" width="6" height="6" /><rect x="9" y="9" width="6" height="6" /></svg>
    case 'zap':
      return <svg {...props}><polygon points="13,2 7,9 11,9 3,14 9,7 5,7" /></svg>
    case 'shield':
      return <svg {...props}><path d="M8 1L2 4v5c0 3.3 2.6 6.4 6 7 3.4-.6 6-3.7 6-7V4L8 1z" /></svg>
    case 'arrow':
      return <svg {...props}><line x1="2" y1="8" x2="14" y2="8" /><polyline points="10,4 14,8 10,12" /></svg>
    case 'wind':
      return <svg {...props}><path d="M9.5 4a2 2 0 0 1 0 4H2" /><path d="M11.5 12a2 2 0 0 0 0-4H2" /><line x1="2" y1="8" x2="8" y2="8" /></svg>
    case 'leaf':
      return <svg {...props}><path d="M2 14s4-8 12-10C14 4 14 14 2 14z" /><line x1="2" y1="14" x2="8" y2="8" /></svg>
    case 'sun':
      return <svg {...props}><circle cx="8" cy="8" r="3" /><line x1="8" y1="1" x2="8" y2="3" /><line x1="8" y1="13" x2="8" y2="15" /><line x1="1" y1="8" x2="3" y2="8" /><line x1="13" y1="8" x2="15" y2="8" /></svg>
    case 'check':
      return <svg {...props}><polyline points="2,8 6,12 14,4" /></svg>
    default:
      return <svg {...props}><circle cx="8" cy="8" r="5" /></svg>
  }
}

export default function VideoFeatureCard({
  index = '01',
  headline,
  body,
  stat,
  videoSrc,
  youtubeVideoId = 'u31qwQUeGuM',
  benefits = [],
  accent = '#0064B0',
  accentLight = '#8ED1FC',
  gradientFrom = '#080E18',
  gradientTo = '#0A1829',
}: VideoFeatureCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '20px',
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Left accent bar */}
      <div
        className="absolute bottom-0 left-0 top-0 w-[3px]"
        style={{ background: accent, borderRadius: '20px 0 0 20px' }}
      />

      {/* Ghost index number */}
      <div
        className="pointer-events-none absolute bottom-4 left-5 select-none font-serif leading-none"
        style={{ fontSize: 'clamp(80px, 10vw, 130px)', color: accent, opacity: 0.07 }}
        aria-hidden="true"
      >
        {index}
      </div>

      {/* Content — two columns on desktop, stacked on mobile */}
      <div className="relative flex h-full flex-col pl-[3px] lg:flex-row">
        {/* Left column */}
        <div className="flex flex-1 flex-col justify-between border-b border-white/[0.06] px-6 py-8 lg:border-b-0 lg:border-r lg:px-10 lg:py-10">
          {/* Stat */}
          <div>
            <p
              className="mb-1 font-serif leading-none tracking-[-0.03em]"
              style={{ fontSize: 'clamp(44px, 6vw, 80px)', color: accentLight }}
            >
              {stat.value}
            </p>
            <p
              className="mb-7 text-[10px] uppercase tracking-[0.3em]"
              style={{ color: `${accentLight}99` }}
            >
              {stat.unit}
            </p>
            <div className="mb-5 h-[2px] w-8" style={{ background: accent }} />
          </div>

          {/* Video panel */}
          <div className="relative mb-5 w-full overflow-hidden rounded-sm lg:mb-0" style={{ height: 'clamp(160px, 25vh, 240px)' }}>
            {videoSrc ? (
              <video
                src={videoSrc}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            ) : youtubeVideoId ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&fs=0`}
                className="pointer-events-none absolute -left-[15%] -top-[15%] h-[130%] w-[130%]"
                style={{ border: 'none' }}
                allow="autoplay; encrypted-media"
                title="Video"
              />
            ) : null}
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: `linear-gradient(to bottom, ${gradientFrom}99 0%, transparent 30%, transparent 70%, ${gradientFrom}CC 100%)` }}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: `linear-gradient(to right, ${gradientFrom}66 0%, transparent 25%, transparent 75%, ${gradientFrom}66 100%)` }}
            />
          </div>

          {/* Headline + body */}
          <div className="flex flex-1 flex-col justify-center pt-5 lg:pt-0">
            <div className="mb-3 flex items-center gap-2.5 lg:mb-4">
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.25em]"
                style={{ color: accent }}
              >
                {index}
              </span>
              <div className="h-px flex-1" style={{ background: `${accent}40` }} />
            </div>
            <h2
              className="mb-3 leading-[1.1] tracking-[-0.02em] text-white lg:mb-4"
              style={{ fontSize: 'clamp(20px, 2vw, 28px)' }}
            >
              {headline}
            </h2>
            <p className="text-[12.5px] font-light leading-[1.75]" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {body}
            </p>
          </div>
        </div>

        {/* Right column — benefits grid */}
        {benefits.length > 0 && (
          <div className="flex w-full flex-col justify-center gap-0 px-6 py-8 lg:w-[42%] lg:px-8">
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              {benefits.map((b, bi) => (
                <div key={bi} className="flex flex-col gap-2">
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm"
                    style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
                  >
                    <BenefitIcon name={b.icon} color={accentLight} />
                  </div>
                  <span
                    className="text-[11.5px] font-light leading-[1.4]"
                    style={{ color: 'rgba(255,255,255,0.65)' }}
                  >
                    {b.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
