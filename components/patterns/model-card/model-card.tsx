// Dependencies: (none)
// Source: cutting-edge-homes-landing-page (alternate-hero branch)

'use client'

import { useRef, useEffect, useState, useCallback, type TouchEvent as ReactTouchEvent } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ModelItem {
  id: string
  name: string
  images: string[]
  price: string
  specs: { label: string; value: string | number }[]
  description: string
  features?: string[]
  floorPlans?: string[]
}

export interface ModelCardProps {
  item: ModelItem
  accentColor?: string
}

// ─── Icons ───────────────────────────────────────────────────────────────────

function ChevronLeft() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
  )
}

function ChevronRight() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
  )
}

function CloseIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
  )
}

function CheckIcon({ color }: { color: string }) {
  return (
    <svg className="mt-0.5 h-4 w-4 shrink-0" style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
  )
}

// ─── Image Carousel ──────────────────────────────────────────────────────────

function ImageCarousel({ images, name, className = '' }: { images: string[]; name: string; className?: string }) {
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef(0)
  const touchDeltaX = useRef(0)
  const swiping = useRef(false)
  const total = images.length

  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total])
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total])

  const onTouchStart = (e: ReactTouchEvent) => { touchStartX.current = e.touches[0].clientX; touchDeltaX.current = 0; swiping.current = true }
  const onTouchMove = (e: ReactTouchEvent) => { if (swiping.current) touchDeltaX.current = e.touches[0].clientX - touchStartX.current }
  const onTouchEnd = () => { if (!swiping.current) return; swiping.current = false; if (touchDeltaX.current < -40) next(); else if (touchDeltaX.current > 40) prev() }

  return (
    <div className={`group relative overflow-hidden ${className}`} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} style={{ touchAction: 'pan-y' }}>
      {images.map((src, i) => (
        <img key={src} src={src} alt={`${name} - image ${i + 1}`} className="absolute inset-0 h-full w-full object-cover" style={{ opacity: i === current ? 1 : 0, transform: i === current ? 'scale(1)' : 'scale(1.04)', transition: 'opacity 0.4s ease-out, transform 0.6s ease-out' }} loading={i === 0 ? 'eager' : 'lazy'} />
      ))}

      {total > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); prev() }} className="absolute left-2 top-1/2 -translate-y-1/2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white/80 opacity-0 backdrop-blur-sm transition-all hover:bg-black/60 hover:text-white group-hover:opacity-100" aria-label="Previous image"><ChevronLeft /></button>
          <button onClick={(e) => { e.stopPropagation(); next() }} className="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white/80 opacity-0 backdrop-blur-sm transition-all hover:bg-black/60 hover:text-white group-hover:opacity-100" aria-label="Next image"><ChevronRight /></button>
          <div className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
            {images.map((_, i) => (
              <button key={i} onClick={(e) => { e.stopPropagation(); setCurrent(i) }} className="flex h-6 w-6 cursor-pointer items-center justify-center" aria-label={`Image ${i + 1}`}>
                <span className={`block rounded-full transition-all ${i === current ? 'h-2 w-2 bg-white' : 'h-1.5 w-1.5 bg-white/40 hover:bg-white/60'}`} />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// ─── Floor Plan Carousel ─────────────────────────────────────────────────────

function FloorPlanCarousel({ plans, name }: { plans: string[]; name: string }) {
  const [current, setCurrent] = useState(0)
  const total = plans.length

  return (
    <div className="px-8 pb-8">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Floor Plan{total > 1 ? 's' : ''}</h4>
        {total > 1 && <span className="text-xs text-white/40">{current + 1} of {total}</span>}
      </div>
      <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white">
        <div className="flex transition-transform duration-400 ease-out" style={{ transform: `translateX(-${current * 100}%)` }}>
          {plans.map((fp, i) => (<img key={fp} src={fp} alt={`${name} floor plan ${i + 1}`} className="w-full shrink-0 object-contain" loading="lazy" />))}
        </div>
        {total > 1 && (
          <>
            <button onClick={() => setCurrent((c) => (c - 1 + total) % total)} className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white/80 opacity-0 transition-all hover:bg-black/70 hover:text-white group-hover:opacity-100" aria-label="Previous plan"><ChevronLeft /></button>
            <button onClick={() => setCurrent((c) => (c + 1) % total)} className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white/80 opacity-0 transition-all hover:bg-black/70 hover:text-white group-hover:opacity-100" aria-label="Next plan"><ChevronRight /></button>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Detail Modal ────────────────────────────────────────────────────────────

function ModelModal({ item, onClose, accentColor }: { item: ModelItem; onClose: () => void; accentColor: string }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setIsOpen(true)))
    document.body.style.overflow = 'hidden'
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', handleKey)
    return () => { document.removeEventListener('keydown', handleKey); document.body.style.overflow = '' }
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(false)
    setTimeout(() => onClose(), 350)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={`${item.name} details`}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} style={{ opacity: isOpen ? 1 : 0, transition: 'opacity 0.35s ease' }} />

      <div
        className="relative w-full max-w-[960px] max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10 bg-gray-900 shadow-2xl"
        style={{ transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(20px)', opacity: isOpen ? 1 : 0, transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease' }}
      >
        <button onClick={handleClose} className="absolute right-4 top-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/5 text-white/60 transition-colors hover:bg-white/10 hover:text-white" aria-label="Close modal"><CloseIcon /></button>

        <ImageCarousel images={item.images} name={item.name} className="aspect-[16/10] w-full bg-gray-950" />

        {/* Header */}
        <div className="p-8 pb-0">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-white sm:text-3xl">{item.name}</h3>
              <div className="mt-2 flex items-center gap-4 text-sm text-white/60">
                {item.specs.map((s) => (<span key={s.label} className="flex items-center gap-1.5">{s.label}: {s.value}</span>))}
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-wider text-white/40">Starting at</p>
              <p className="text-2xl font-bold" style={{ color: accentColor }}>{item.price}</p>
            </div>
          </div>
        </div>

        <div className="mx-8 my-6 h-px bg-white/10" />

        <div className="px-8">
          <p className="text-sm leading-relaxed text-white/70">{item.description}</p>
        </div>

        {item.features && item.features.length > 0 && (
          <div className="px-8 pb-8 pt-6">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Features</h4>
            <ul className="space-y-2.5">
              {item.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-white/60">
                  <CheckIcon color={accentColor} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {item.floorPlans && item.floorPlans.length > 0 && (
          <FloorPlanCarousel plans={item.floorPlans} name={item.name} />
        )}

        {(!item.floorPlans || item.floorPlans.length === 0) && <div className="pb-8" />}
      </div>
    </div>
  )
}

// ─── Card Component ──────────────────────────────────────────────────────────

export default function ModelCard({ item, accentColor = '#C8A44E' }: ModelCardProps) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-lg" style={{ borderColor: undefined }}>
        <div onClick={() => setModalOpen(true)} className="cursor-pointer" role="button" tabIndex={0} aria-label={`View ${item.name} details`} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setModalOpen(true) } }}>
          <ImageCarousel images={item.images} name={item.name} className="h-52" />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="mb-2 text-xl font-bold text-gray-900">{item.name}</h3>

          <div className="mb-4 flex items-center gap-4 text-sm text-gray-500">
            {item.specs.map((s) => (<span key={s.label} className="flex items-center gap-1.5">{s.value} {s.label}</span>))}
          </div>

          <div className="mb-5">
            <p className="text-xs uppercase tracking-wider text-gray-400">Starting at</p>
            <p className="text-xl font-bold" style={{ color: accentColor }}>{item.price}</p>
          </div>

          <div className="flex-1" />

          <button
            onClick={() => setModalOpen(true)}
            className="w-full cursor-pointer rounded-lg border-2 py-3 text-sm font-semibold transition-colors duration-200"
            style={{ borderColor: accentColor, color: accentColor }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = accentColor; e.currentTarget.style.color = 'white' }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = accentColor }}
          >
            See More
          </button>
        </div>
      </div>

      {modalOpen && <ModelModal item={item} onClose={() => setModalOpen(false)} accentColor={accentColor} />}
    </>
  )
}
