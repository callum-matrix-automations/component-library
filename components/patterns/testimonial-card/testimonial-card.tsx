// Dependencies: motion, lucide-react
// Source: boxbuild-landing-page

'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Play, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

export interface VideoTestimonial {
  src: string
  name: string
  company: string
}

export interface WrittenTestimonial {
  headline: string
  body: string
  name: string
  role: string
  company: string
  logo?: string
}

export interface TestimonialCardProps {
  testimonial: WrittenTestimonial
  index?: number
  accentColor?: string
  backgroundColor?: string
}

export interface TestimonialCarouselProps {
  testimonials: WrittenTestimonial[]
  accentColor?: string
  backgroundColor?: string
  autoRotateMs?: number
}

export interface VideoTestimonialCardProps {
  src?: string
  youtubeVideoId?: string
  name: string
  company: string
  accentColor?: string
}

function DiagonalPattern({ id }: { id: string }) {
  return (
    <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id={id}
          x="0"
          y="0"
          width="32"
          height="32"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="32" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

// ─── Written Testimonial Card ────────────────────────────────────────────────

export function TestimonialCard({
  testimonial,
  index = 0,
  accentColor = '#F19A33',
  backgroundColor = '#00405f',
}: TestimonialCardProps) {
  return (
    <div
      className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 p-6 md:p-8"
      style={{ backgroundColor }}
    >
      <DiagonalPattern id={`test-diag-${index}`} />

      <div className="relative z-10 flex h-full flex-col">
        <Quote className="mb-3 h-7 w-7 opacity-30" style={{ color: accentColor }} />

        <h4 className="mb-3 text-base font-bold leading-snug md:text-lg" style={{ color: accentColor }}>
          &ldquo;{testimonial.headline}&rdquo;
        </h4>

        <div className="mb-4 grow">
          {testimonial.body.split('\n\n').map((paragraph, i) => (
            <p key={i} className="mb-2 text-sm leading-relaxed text-white/65 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/10 pt-3">
          <div>
            <p className="text-sm font-semibold text-white">{testimonial.name}</p>
            <p className="text-xs text-white/40">
              {testimonial.role}, {testimonial.company}
            </p>
          </div>
          {testimonial.logo && (
            <img
              src={testimonial.logo}
              alt={testimonial.company}
              className="h-10 max-w-[120px] object-contain opacity-60"
            />
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Video Testimonial Card ──────────────────────────────────────────────────

export function VideoTestimonialCard({
  src,
  youtubeVideoId,
  name,
  company,
  accentColor = '#F19A33',
}: VideoTestimonialCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause()
      else videoRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#00405f] shadow-xl">
      <div className="relative aspect-[9/16] cursor-pointer" onClick={!youtubeVideoId ? togglePlay : undefined}>
        {youtubeVideoId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeVideoId}?autoplay=0&controls=1&modestbranding=1&rel=0`}
            className="h-full w-full"
            style={{ border: 'none' }}
            allow="autoplay; encrypted-media"
            title={`${name} testimonial`}
          />
        ) : (
          <>
            <video
              ref={videoRef}
              src={src}
              className="h-full w-full object-cover"
              playsInline
              onEnded={() => setIsPlaying(false)}
            />
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${accentColor}E6` }}
                >
                  <Play className="ml-1 h-7 w-7 text-white" />
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="px-6 py-4">
        <p className="text-sm font-semibold text-white">{name}</p>
        <p className="text-xs text-white/50">{company}</p>
      </div>
    </div>
  )
}

// ─── Testimonial Carousel ────────────────────────────────────────────────────

export function TestimonialCarousel({
  testimonials,
  accentColor = '#F19A33',
  backgroundColor = '#00405f',
  autoRotateMs = 30000,
}: TestimonialCarouselProps) {
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(2)

  useEffect(() => {
    const update = () => {
      const newPerPage = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 2
      setPerPage(newPerPage)
      setPage((p) => Math.min(p, Math.ceil(testimonials.length / newPerPage) - 1))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [testimonials.length])

  const totalPages = Math.ceil(testimonials.length / perPage)
  const next = useCallback(() => setPage((p) => (p + 1) % totalPages), [totalPages])
  const prev = useCallback(() => setPage((p) => (p - 1 + totalPages) % totalPages), [totalPages])

  useEffect(() => {
    if (autoRotateMs <= 0) return
    const timer = setInterval(next, autoRotateMs)
    return () => clearInterval(timer)
  }, [next, autoRotateMs])

  const start = page * perPage
  const currentTestimonials = testimonials.slice(start, start + perPage)

  return (
    <div>
      {/* Header + nav */}
      {totalPages > 1 && (
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <div className="mb-6 h-[2px] w-12 bg-white/20" />
            <h3 className="text-2xl font-semibold text-white md:text-3xl">
              See What Others Are Saying
            </h3>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors"
              style={{ backgroundColor: accentColor }}
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors"
              style={{ backgroundColor: accentColor }}
              aria-label="Next testimonials"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Cards */}
      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {currentTestimonials.map((testimonial, i) => (
              <TestimonialCard
                key={`${page}-${i}`}
                testimonial={testimonial}
                index={page * perPage + i}
                accentColor={accentColor}
                backgroundColor={backgroundColor}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === page ? 24 : 8,
                backgroundColor: i === page ? accentColor : 'rgba(255,255,255,0.2)',
              }}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default TestimonialCard
