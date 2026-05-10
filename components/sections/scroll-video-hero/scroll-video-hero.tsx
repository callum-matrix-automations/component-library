// Dependencies: (none)
// Source: cutting-edge-homes-landing-page (alternate-hero branch)
// Videos: /hero-door-transition.mp4, /hero-models-transition.mp4

'use client'

import { useRef, useEffect, useState, useCallback } from 'react'

const ACCENT = '#C8A44E'
const ACCENT_LIGHT = '#E8D5A0'

function easeScrollProgress(t: number): number {
  if (t < 0.15) return t * 0.8
  if (t < 0.25) return 0.12 + (t - 0.15) * 1.6
  if (t < 0.35) return 0.28 + (t - 0.25) * 0.8
  if (t < 0.50) return 0.36 + (t - 0.35) * 1.6
  if (t < 0.60) return 0.60 + (t - 0.50) * 0.8
  if (t < 0.70) return 0.68 + (t - 0.60) * 1.6
  if (t < 0.80) return 0.84 + (t - 0.70) * 0.8
  return 0.92 + (t - 0.80) * 0.4
}

function StatIcon({ icon }: { icon?: string }) {
  const props = { className: 'h-8 w-8', style: { color: ACCENT }, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 1.5 }
  if (icon === 'heart') return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
  if (icon === 'pin') return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
  return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
}

const STATS = [
  { icon: 'clock', value: 20, suffix: '+', label: 'Years Experience' },
  { icon: 'heart', value: 300, suffix: '+', label: 'Happy Homeowners' },
  { icon: 'pin', value: 50, suffix: '+', label: 'Cities Across California' },
]

const TESTIMONIALS = [
  { name: 'Claire H.', location: 'Los Angeles, CA', quote: 'The entire team has been helpful, timely, and truly gone above and beyond.' },
  { name: 'Valerie W.', location: 'Carlsbad, CA', quote: "They walked us through every step of the way. Our plans were accepted on the first go!" },
  { name: 'William S.', location: 'Descanso, CA', quote: 'Without exception, honest and fair in their dealings with us. Excellent communication.' },
]

const BADGES = ['Licensed & Insured', 'BBB Accredited', '5-Star Rated']

export default function ScrollVideoHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const video1Ref = useRef<HTMLVideoElement>(null)
  const video2Ref = useRef<HTMLVideoElement>(null)
  const progressRef = useRef(0)
  const scrollPxRef = useRef(0)
  const rafRef = useRef<number>(0)

  const [v1Ready, setV1Ready] = useState(false)
  const [v2Ready, setV2Ready] = useState(false)
  const [, setRenderTick] = useState(0)

  const [introPhase, setIntroPhase] = useState<'loading' | 'revealing' | 'done'>('loading')
  const [contentReady, setContentReady] = useState(false)

  const crossover = 0.5

  // Intro sequence
  useEffect(() => {
    if (!v1Ready || !v2Ready) return
    setIntroPhase('revealing')
    const contentTimer = setTimeout(() => setContentReady(true), 800)
    const doneTimer = setTimeout(() => setIntroPhase('done'), 2500)
    return () => { clearTimeout(contentTimer); clearTimeout(doneTimer) }
  }, [v1Ready, v2Ready])

  // Scroll → video sync
  const updateVisuals = useCallback(() => {
    const container = containerRef.current
    const v1 = video1Ref.current
    const v2 = video2Ref.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const scrollableHeight = container.offsetHeight - window.innerHeight
    const scrolled = -rect.top
    const linearPct = Math.max(0, Math.min(1, scrolled / scrollableHeight))
    const pct = easeScrollProgress(linearPct)
    progressRef.current = pct
    scrollPxRef.current = Math.max(0, scrolled)

    if (v1 && v1.duration) {
      const v1Pct = Math.max(0, Math.min(1, pct / crossover))
      const targetTime = v1Pct * v1.duration
      if (Math.abs(v1.currentTime - targetTime) > 0.05) v1.currentTime = targetTime
    }

    if (v2 && v2.duration) {
      const v2Pct = Math.max(0, Math.min(1, (pct - crossover) / (1 - crossover)))
      const targetTime = v2Pct * v2.duration
      if (Math.abs(v2.currentTime - targetTime) > 0.05) v2.currentTime = targetTime
    }

    setRenderTick((t) => t + 1)
  }, [])

  const handleScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(updateVisuals)
  }, [updateVisuals])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    updateVisuals()
    return () => { window.removeEventListener('scroll', handleScroll); cancelAnimationFrame(rafRef.current) }
  }, [handleScroll, updateVisuals])

  // Video loading
  useEffect(() => {
    const v1 = video1Ref.current
    const v2 = video2Ref.current
    if (!v1 || !v2) return

    let v1Loaded = false, v2Loaded = false
    const events = ['loadeddata', 'loadedmetadata', 'canplay'] as const

    const markV1 = () => { if (v1Loaded) return; v1Loaded = true; v1.currentTime = 0; setV1Ready(true); events.forEach(e => v1.removeEventListener(e, markV1)) }
    const markV2 = () => { if (v2Loaded) return; v2Loaded = true; v2.currentTime = 0; setV2Ready(true); events.forEach(e => v2.removeEventListener(e, markV2)) }

    if (v1.readyState >= 2) markV1()
    if (v2.readyState >= 2) markV2()
    events.forEach(e => { if (!v1Loaded) v1.addEventListener(e, markV1); if (!v2Loaded) v2.addEventListener(e, markV2) })
    if (!v1Loaded) v1.load()
    if (!v2Loaded) v2.load()

    const fallback = setTimeout(() => {
      if (!v1Loaded && v1.readyState < 2) v1.play().then(() => { v1.pause(); markV1() }).catch(() => {})
      if (!v2Loaded && v2.readyState < 2) v2.play().then(() => { v2.pause(); markV2() }).catch(() => {})
    }, 2000)

    return () => { clearTimeout(fallback); events.forEach(e => { v1.removeEventListener(e, markV1); v2.removeEventListener(e, markV2) }) }
  }, [])

  // Derived values
  const progress = progressRef.current
  const isVideo1Active = progress < crossover + 0.02
  const isVideo2Active = progress >= crossover - 0.02

  // Interior stats: fade in 28–32%, heading shifts 35–42%, stats stagger 40–48%, scroll out 62–68%
  const intBlockOpacity = progress < 0.28 ? 0 : progress < 0.32 ? (progress - 0.28) / 0.04 : progress < 0.62 ? 1 : progress < 0.68 ? Math.max(0, 1 - (progress - 0.62) / 0.06) : 0
  const intBlockScrollUp = progress < 0.62 ? 0 : progress < 0.68 ? ((progress - 0.62) / 0.06) * 120 : 120
  const headingShift = progress < 0.35 ? 0 : progress < 0.42 ? (progress - 0.35) / 0.07 : 1
  const headingTranslateY = -headingShift * 12
  const statsOpacity = Math.min(1, (progress < 0.40 ? 0 : (progress - 0.40) / 0.08) * 1.5)

  const stat1P = progress < 0.40 ? 0 : Math.min(1, (progress - 0.40) / 0.05)
  const stat2P = progress < 0.42 ? 0 : Math.min(1, (progress - 0.42) / 0.05)
  const stat3P = progress < 0.44 ? 0 : Math.min(1, (progress - 0.44) / 0.05)
  const counter1 = Math.round(stat1P * STATS[0].value)
  const counter2 = Math.round(stat2P * STATS[1].value)
  const counter3 = Math.round(stat3P * STATS[2].value)

  // Explore section
  const v2HeadOpacity = progress < 0.78 ? 0 : Math.min(1, (progress - 0.78) / 0.05)
  const v2CtaOpacity = progress < 0.82 ? 0 : Math.min(1, (progress - 0.82) / 0.05)
  const v2TestProgress = progress < 0.87 ? 0 : Math.min(1, (progress - 0.87) / 0.10)
  const v2TestTranslateY = (1 - v2TestProgress) * 200
  const v2TrustOpacity = progress < 0.93 ? 0 : Math.min(1, (progress - 0.93) / 0.05)

  const v2T1P = progress < 0.87 ? 0 : Math.min(1, (progress - 0.87) / 0.08)
  const v2T2P = progress < 0.89 ? 0 : Math.min(1, (progress - 0.89) / 0.08)
  const v2T3P = progress < 0.91 ? 0 : Math.min(1, (progress - 0.91) / 0.08)
  const testProgresses = [v2T1P, v2T2P, v2T3P]

  const scrollIndicatorOpacity = contentReady ? Math.max(0, 1 - progress * 8) : 0

  return (
    <>
      {/* Load screen */}
      <div
        className="pointer-events-none fixed inset-0 z-[100] flex flex-col items-center justify-center"
        style={{ background: '#0A0A0A', opacity: introPhase === 'loading' ? 1 : 0, transition: 'opacity 0.6s ease-out', display: introPhase === 'done' ? 'none' : undefined }}
        aria-hidden={introPhase === 'done'}
      >
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em]" style={{ color: ACCENT }}>Loading Experience</p>
        <div className="h-0.5 w-32 overflow-hidden rounded-full bg-white/10">
          <div className="h-full animate-pulse rounded-full" style={{ width: '60%', backgroundColor: ACCENT }} />
        </div>
      </div>

      {/* Scroll container */}
      <div ref={containerRef} className="relative" style={{ height: '700vh' }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ background: '#0A0A0A' }}>
          {/* Video 1 */}
          <video ref={video1Ref} src="/hero-door-transition.mp4" muted playsInline preload="auto" className="absolute left-0 top-0 object-cover" style={{ width: '106%', height: '106%', opacity: v1Ready && isVideo1Active ? 1 : 0, zIndex: isVideo1Active ? 2 : 1, transition: 'opacity 0.1s ease' }} />

          {/* Video 2 */}
          <video ref={video2Ref} src="/hero-models-transition.mp4" muted playsInline preload="auto" className="absolute left-0 top-0 object-cover" style={{ width: '106%', height: '106%', opacity: v2Ready && isVideo2Active ? 1 : 0, zIndex: isVideo2Active ? 2 : 1, transition: 'opacity 0.1s ease' }} />

          {/* Dark overlay */}
          <div className="pointer-events-none absolute inset-0" style={{ zIndex: 10, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.7) 100%)' }} />

          {/* Content overlays */}
          <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6">

            {/* Intro */}
            <div className="absolute max-w-4xl text-center" style={{ transform: `translateY(${-scrollPxRef.current}px)`, visibility: scrollPxRef.current > 1200 ? 'hidden' : 'visible' }}>
              <div className="mx-auto mb-8 h-px" style={{ backgroundColor: ACCENT, width: contentReady ? '80px' : '0px', transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }} />
              <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl" style={{ opacity: contentReady ? 1 : 0, transform: contentReady ? 'translateY(0)' : 'translateY(28px)', transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                Your Dream Home,<br /><span style={{ color: ACCENT_LIGHT }}>Built to Precision.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-200 sm:text-xl" style={{ opacity: contentReady ? 1 : 0, transform: contentReady ? 'translateY(0)' : 'translateY(28px)', transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.15s' }}>
                Custom modular homes designed around your land, your lifestyle, and your vision.
              </p>
              <div className="pointer-events-auto" style={{ opacity: contentReady ? 1 : 0, transform: contentReady ? 'translateY(0)' : 'translateY(28px)', transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s' }}>
                <button className="mt-10 inline-block cursor-pointer rounded-lg px-10 py-4 text-lg font-semibold tracking-wide text-gray-900" style={{ backgroundColor: ACCENT }}>I&apos;m Interested</button>
              </div>
            </div>

            {/* Interior stats */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6" style={{ opacity: intBlockOpacity, transform: `translateY(-${intBlockScrollUp}vh)`, visibility: intBlockOpacity === 0 ? 'hidden' : 'visible' }}>
              <div className="max-w-4xl text-center" style={{ transform: `translateY(${headingTranslateY}vh)` }}>
                <h2 className="text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
                  Step Inside<br /><span style={{ color: ACCENT_LIGHT }}>Your Future.</span>
                </h2>
                <div className="mx-auto mt-8 h-px" style={{ backgroundColor: `${ACCENT}66`, width: statsOpacity > 0 ? '80px' : '0px', transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }} />
              </div>

              <div className="mt-10 grid w-full max-w-4xl grid-cols-3 gap-6 sm:gap-20" style={{ opacity: statsOpacity, transform: `translateY(${headingTranslateY}vh) translateY(${(1 - statsOpacity) * 24}px)` }}>
                {[
                  { p: stat1P, counter: counter1, stat: STATS[0] },
                  { p: stat2P, counter: counter2, stat: STATS[1] },
                  { p: stat3P, counter: counter3, stat: STATS[2] },
                ].map(({ p, counter, stat }, i) => (
                  <div key={i} className="text-center" style={{ opacity: p, transform: `translateY(${(1 - p) * 16}px)` }}>
                    <div className="mb-3 flex justify-center"><StatIcon icon={stat.icon} /></div>
                    <div className="text-4xl font-bold tabular-nums leading-none text-white sm:text-5xl lg:text-6xl">{counter}{stat.suffix}</div>
                    <div className="mt-2 text-xs uppercase tracking-wider text-gray-400 sm:text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Explore + testimonials */}
            <div className="absolute inset-0 flex flex-col items-center justify-start px-6 pt-[15vh] sm:pt-[18vh]" style={{ visibility: (v2HeadOpacity === 0 && v2TestProgress === 0) ? 'hidden' : 'visible' }}>
              <div className="max-w-4xl shrink-0 text-center" style={{ opacity: v2HeadOpacity, transform: `translateY(${(1 - v2HeadOpacity) * 30}px)` }}>
                <h2 className="text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
                  Explore Our<br /><span style={{ color: ACCENT_LIGHT }}>Home Models.</span>
                </h2>
              </div>

              <div className="pointer-events-auto mt-6 shrink-0" style={{ opacity: v2CtaOpacity, transform: `translateY(${(1 - v2CtaOpacity) * 16}px)` }}>
                <button className="inline-block cursor-pointer rounded-lg px-10 py-4 text-lg font-semibold tracking-wide shadow-lg text-gray-900" style={{ backgroundColor: ACCENT, textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>Explore Our Homes</button>
              </div>

              <div className="mt-10 grid w-full max-w-6xl shrink-0 grid-cols-1 items-stretch gap-4 sm:mt-14 sm:grid-cols-3" style={{ opacity: v2TestProgress, transform: `translateY(${v2TestTranslateY}px)` }}>
                {TESTIMONIALS.map((t, idx) => (
                  <div key={idx} className="flex h-full flex-col rounded-xl border border-white/10 bg-black/30 p-5 backdrop-blur-xl" style={{ transform: `translateY(${(1 - testProgresses[idx]) * 30}px)` }}>
                    <div style={{ opacity: testProgresses[idx] }}>
                      <div className="mb-3 flex gap-0.5">
                        {[0,1,2,3,4].map(i => (<svg key={i} className="h-3.5 w-3.5" style={{ color: ACCENT }} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>))}
                      </div>
                      <blockquote className="flex-1 text-sm leading-relaxed text-white/85">&ldquo;{t.quote}&rdquo;</blockquote>
                      <div className="mt-4 flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold" style={{ backgroundColor: `${ACCENT}26`, color: ACCENT }}>{t.name[0]}</div>
                        <div>
                          <div className="text-xs font-semibold text-white/85">{t.name}</div>
                          <div className="text-[10px] text-white/40">{t.location}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex shrink-0 items-center justify-center" style={{ opacity: v2TrustOpacity, transform: `translateY(${(1 - v2TrustOpacity) * 12 + v2TestTranslateY}px)` }}>
                <div className="flex items-center gap-5 rounded-full border border-white/10 bg-black/30 px-6 py-2.5 backdrop-blur-lg">
                  {BADGES.map((badge, idx) => (
                    <span key={idx} className="flex items-center gap-2">
                      {idx > 0 && <span className="h-4 w-px bg-white/15" />}
                      <svg className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
                      <span className="text-xs uppercase tracking-wider text-white/60">{badge}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2" style={{ opacity: scrollIndicatorOpacity, transform: contentReady ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 0.5s ease 0.6s, transform 0.5s ease 0.6s' }}>
            <span className="text-xs uppercase tracking-[0.2em] text-white/70">Scroll to explore</span>
            <div className="flex h-8 w-5 items-start justify-center rounded-full border-2 border-white/40 p-1">
              <div className="h-2 w-1 animate-bounce rounded-full bg-white/70" />
            </div>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 z-20 h-0.5" style={{ width: `${progress * 100}%`, backgroundColor: ACCENT }} />
        </div>
      </div>
    </>
  )
}
