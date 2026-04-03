// Dependencies: motion/react
// Source: payload-demo (CaseStudyPage GallerySection)
// Asymmetric image gallery with scroll-reveal entrance animations.
// Desktop: 2-column grid with the first image spanning 2 rows (tall left panel).
// Mobile: simple vertical stack. Each image has an optional caption overlay.
// Includes a section header with accent-coloured overline.

'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useInView } from 'motion/react'

/* ─── Types ─── */

export interface GalleryImage {
  url: string
  caption?: string
}

interface AsymmetricGalleryProps {
  /** Exactly 3 images: [tall-left, top-right, bottom-right] */
  images: [GalleryImage, GalleryImage, GalleryImage]
  /** Section overline label */
  sectionLabel?: string
  /** Accent colour for the overline */
  accentColor?: string
  /** Background colour of the section */
  backgroundColor?: string
  /** Row height in px for desktop grid (default: 280) */
  rowHeight?: number
  /** Breakpoint below which mobile layout is used (default: 768) */
  mobileBreakpoint?: number
}

/* ─── Single Gallery Image ─── */

function GalleryImageCard({
  image,
  delay,
  style,
}: {
  image: GalleryImage
  delay: number
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })
  const reduced = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden"
      style={{ borderRadius: '4px', ...style }}
      initial={reduced ? false : { opacity: 0, scale: 0.97, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <img
        src={image.url}
        alt={image.caption || ''}
        className="w-full h-full object-cover"
      />
      {image.caption && (
        <div
          className="absolute bottom-0 left-0 right-0 px-4 py-3"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
          }}
        >
          <p className="text-[10px] text-white">{image.caption}</p>
        </div>
      )}
    </motion.div>
  )
}

/* ─── Main Component ─── */

export default function AsymmetricGallery({
  images,
  sectionLabel = 'Project Gallery',
  accentColor = '#0064B0',
  backgroundColor = '#EDF0F6',
  rowHeight = 280,
  mobileBreakpoint = 768,
}: AsymmetricGalleryProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-5% 0px' })
  const reduced = useReducedMotion()
  const isMobile = typeof window !== 'undefined' && window.matchMedia(`(max-width: ${mobileBreakpoint}px)`).matches

  return (
    <div
      className="relative px-5 sm:px-8 lg:px-16 py-20 sm:py-28"
      style={{ background: backgroundColor }}
    >
      {/* Dot texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.6,
          backgroundImage: 'radial-gradient(circle, #B8C1CF 0.6px, transparent 0.6px)',
          backgroundSize: '26px 26px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={ref}
          className="flex items-center gap-3 mb-10"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-8 h-px" style={{ background: accentColor }} />
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.3em]"
            style={{ color: accentColor }}
          >
            {sectionLabel}
          </p>
        </motion.div>

        {isMobile ? (
          /* Mobile: stacked */
          <div className="flex flex-col gap-4">
            {images.map((img, i) => (
              <GalleryImageCard
                key={i}
                image={img}
                delay={0.1 * i}
                style={{ height: '240px' }}
              />
            ))}
          </div>
        ) : (
          /* Desktop: asymmetric grid */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 1fr',
              gridTemplateRows: `${rowHeight}px ${rowHeight}px`,
              gap: '12px',
            }}
          >
            {/* Image 1: spans 2 rows on left (tall) */}
            <GalleryImageCard
              image={images[0]}
              delay={0}
              style={{ gridRow: 'span 2', height: '100%' }}
            />
            {/* Image 2: top-right */}
            <GalleryImageCard
              image={images[1]}
              delay={0.15}
              style={{ height: '100%' }}
            />
            {/* Image 3: bottom-right */}
            <GalleryImageCard
              image={images[2]}
              delay={0.25}
              style={{ height: '100%' }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
