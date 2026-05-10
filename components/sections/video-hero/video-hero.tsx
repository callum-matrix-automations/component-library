// Dependencies: motion, lucide-react
// Source: 4ccs-demo

'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react'
import { Play, Pause, Volume2, Volume1, VolumeX } from 'lucide-react'

const formatTime = (s: number) => {
  const m = Math.floor(s / 60)
  const r = Math.floor(s % 60)
  return `${m}:${r.toString().padStart(2, '0')}`
}

function Slider({ value, onChange, className }: { value: number; onChange: (v: number) => void; className?: string }) {
  return (
    <div
      className={`relative h-1 w-full cursor-pointer rounded-full bg-white/20 ${className || ''}`}
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const pct = ((e.clientX - rect.left) / rect.width) * 100
        onChange(Math.min(Math.max(pct, 0), 100))
      }}
    >
      <motion.div
        className="absolute left-0 top-0 h-full rounded-full bg-white"
        style={{ width: `${value}%` }}
        animate={{ width: `${value}%` }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
    </div>
  )
}

interface YTPlayer {
  playVideo: () => void
  pauseVideo: () => void
  seekTo: (seconds: number, allowSeekAhead: boolean) => void
  setVolume: (volume: number) => void
  getVolume: () => number
  mute: () => void
  unMute: () => void
  isMuted: () => boolean
  setPlaybackRate: (rate: number) => void
  getPlaybackRate: () => number
  getCurrentTime: () => number
  getDuration: () => number
  getPlayerState: () => number
  destroy: () => void
}

interface YTPlayerEvent {
  target: YTPlayer
  data: number
}

export interface VideoHeroProps {
  youtubeVideoId?: string
  headline?: string
  headlineAccent?: string
  subtitle?: string
  overline?: string
  ctaLabel?: string
  onCtaClick?: () => void
  accentColor?: string
  cutoffSeconds?: number
  revealedHeadline?: string
  revealedHeadlineAccent?: string
  revealedSubtitle?: string
  revealedCtaLabel?: string
}

export default function VideoHero({
  youtubeVideoId = 'u31qwQUeGuM',
  headline = 'Build Better.',
  headlineAccent = 'Stay SAFE.',
  subtitle = 'High-performance building systems that install fast, perform exceptionally, and fit seamlessly into traditional construction.',
  overline = 'Video Hero Section',
  ctaLabel = 'Get Started',
  onCtaClick,
  accentColor = '#0097A7',
  cutoffSeconds,
  revealedHeadline = 'Build Better.',
  revealedHeadlineAccent = 'Stay SAFE.',
  revealedSubtitle = 'High-performance building systems that install fast, perform exceptionally, and fit seamlessly into traditional construction.',
  revealedCtaLabel = 'Get Started',
}: VideoHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<YTPlayer | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const playerContainerId = useRef(`yt-player-${Math.random().toString(36).slice(2, 9)}`).current

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const videoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.72])
  const videoBorderRadius = useTransform(scrollYProgress, [0, 0.5], [0, 24])
  const videoY = useTransform(scrollYProgress, [0, 0.5], [0, 40])
  const revealedOpacity = useTransform(scrollYProgress, [0.15, 0.45], [0, 1])
  const revealedY = useTransform(scrollYProgress, [0.15, 0.45], [60, 0])

  const [ready, setReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [showControls, setShowControls] = useState(false)
  const [videoCutoff, setVideoCutoff] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    function createPlayer() {
      // @ts-expect-error YouTube API global
      playerRef.current = new window.YT.Player(playerContainerId, {
        videoId: youtubeVideoId,
        playerVars: {
          start: 0,
          controls: 0,
          showinfo: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          fs: 0,
          iv_load_policy: 3,
          disablekb: 1,
        },
        events: {
          onReady: (e: YTPlayerEvent) => {
            e.target.setVolume(80)
            setDuration(e.target.getDuration())
            setReady(true)
          },
          onStateChange: (e: YTPlayerEvent) => {
            setIsPlaying(e.data === 1)
            if (e.data === 1) setHasStarted(true)
          },
        },
      })
    }

    // @ts-expect-error YouTube API global
    if (window.YT && window.YT.Player) {
      createPlayer()
    } else {
      // @ts-expect-error YouTube API callback
      const existingCallback = window.onYouTubeIframeAPIReady
      // @ts-expect-error YouTube API callback
      window.onYouTubeIframeAPIReady = () => {
        if (existingCallback) existingCallback()
        createPlayer()
      }

      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        document.head.appendChild(tag)
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [youtubeVideoId, playerContainerId])

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        const p = playerRef.current
        if (!p) return
        const ct = p.getCurrentTime()
        const dur = p.getDuration()
        setCurrentTime(ct)
        setDuration(dur)
        setProgress(dur > 0 ? (ct / dur) * 100 : 0)

        if (cutoffSeconds && ct >= cutoffSeconds) {
          p.pauseVideo()
          setVideoCutoff(true)
        }
      }, 250)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPlaying, cutoffSeconds])

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      if (v > 0.4 && isPlaying && playerRef.current) {
        playerRef.current.pauseVideo()
      }
    })
  }, [scrollYProgress, isPlaying])

  const togglePlay = useCallback(() => {
    const p = playerRef.current
    if (!p) return
    if (isPlaying) p.pauseVideo()
    else p.playVideo()
  }, [isPlaying])

  const handleSeek = useCallback((pct: number) => {
    const p = playerRef.current
    if (!p) return
    const dur = p.getDuration()
    if (dur > 0) {
      p.seekTo((pct / 100) * dur, true)
      setProgress(pct)
    }
  }, [])

  const handleVolume = useCallback((pct: number) => {
    const p = playerRef.current
    if (!p) return
    p.setVolume(pct)
    setVolume(pct)
    if (pct === 0) { p.mute(); setIsMuted(true) }
    else { p.unMute(); setIsMuted(false) }
  }, [])

  const toggleMute = useCallback(() => {
    const p = playerRef.current
    if (!p) return
    if (isMuted) { p.unMute(); p.setVolume(80); setVolume(80); setIsMuted(false) }
    else { p.mute(); setVolume(0); setIsMuted(true) }
  }, [isMuted])

  const changeSpeed = useCallback((s: number) => {
    const p = playerRef.current
    if (!p) return
    p.setPlaybackRate(s)
    setSpeed(s)
  }, [])

  return (
    <section ref={sectionRef} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden bg-gray-950">
        {/* Revealed content BEHIND the video — visible as video shrinks on scroll */}
        <motion.div
          className="absolute inset-0 z-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: revealedOpacity, y: revealedY }}
        >
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-8" style={{ backgroundColor: accentColor }} />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em]" style={{ color: accentColor }}>
              {overline}
            </span>
            <div className="h-px w-8" style={{ backgroundColor: accentColor }} />
          </div>
          <h2 className="text-[clamp(2.2rem,5.5vw,4.5rem)] font-[800] leading-[1.05] tracking-tight text-white">
            {revealedHeadline} <span style={{ color: accentColor }}>{revealedHeadlineAccent}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[clamp(0.95rem,1.5vw,1.15rem)] leading-relaxed text-white/50">
            {revealedSubtitle}
          </p>
          {revealedCtaLabel && (
            <div className="mt-10">
              <button
                onClick={onCtaClick}
                className="group relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-9 py-4 text-[0.85rem] font-semibold uppercase tracking-wider text-white transition-all duration-300"
                style={{ backgroundColor: accentColor, boxShadow: `0 4px 24px ${accentColor}50` }}
              >
                <span className="relative z-10">{revealedCtaLabel}</span>
                <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />
              </button>
            </div>
          )}
        </motion.div>

        {/* Video layer — shrinks and reveals content behind on scroll */}
        <motion.div
          className="relative z-10 h-full w-full origin-center overflow-hidden"
          style={{ scale: videoScale, borderRadius: videoBorderRadius, y: videoY }}
          onMouseEnter={() => hasStarted && setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          {/* YouTube player — oversized to hide black bars */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute"
              style={{ width: '130%', height: '130%', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              <div id={playerContainerId} className="h-full w-full" />
            </div>
          </div>

          {/* Gradient overlays */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(3,7,18,0.3)_0%,transparent_25%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(3,7,18,0.15)_0%,transparent_10%)]" />

          {/* Initial overlay with play button */}
          <AnimatePresence>
            {!hasStarted && (
              <motion.div
                className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-gray-950/60 px-6 text-center backdrop-blur-[2px]"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-px w-8" style={{ backgroundColor: accentColor }} />
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em]" style={{ color: accentColor }}>
                    {overline}
                  </span>
                  <div className="h-px w-8" style={{ backgroundColor: accentColor }} />
                </div>

                <h1 className="text-[clamp(2.2rem,5.5vw,4.5rem)] font-[800] leading-[1.05] tracking-tight text-white">
                  {headline} <span style={{ color: accentColor }}>{headlineAccent}</span>
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-[clamp(0.95rem,1.5vw,1.15rem)] leading-relaxed text-white/55">
                  {subtitle}
                </p>

                <motion.button
                  onClick={togglePlay}
                  disabled={!ready}
                  className="group mt-12 flex cursor-pointer items-center gap-4 rounded-full border border-white/20 bg-white/5 px-8 py-4 backdrop-blur-md transition-all duration-300 hover:bg-white/10 disabled:opacity-40"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-full shadow-lg"
                    style={{ backgroundColor: accentColor, boxShadow: `0 0 24px ${accentColor}60` }}
                  >
                    <Play className="ml-0.5 h-5 w-5 text-white" />
                  </span>
                  <span className="text-[0.85rem] font-semibold uppercase tracking-wider text-white/80">
                    Play Video
                  </span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Video controls — appear on hover after video starts */}
          <AnimatePresence>
            {showControls && hasStarted && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 z-30 m-3 mx-auto max-w-xl rounded-2xl bg-black/60 p-4 backdrop-blur-md"
                initial={{ y: 20, opacity: 0, filter: 'blur(10px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: 20, opacity: 0, filter: 'blur(10px)' }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-sm text-white">{formatTime(currentTime)}</span>
                  <Slider value={progress} onChange={handleSeek} className="flex-1" />
                  <span className="text-sm text-white">{formatTime(duration)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.button
                      onClick={togglePlay}
                      className="rounded-lg p-2 text-white transition-colors hover:bg-white/10"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </motion.button>

                    <div className="flex items-center gap-1">
                      <motion.button
                        onClick={toggleMute}
                        className="rounded-lg p-2 text-white transition-colors hover:bg-white/10"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {isMuted ? <VolumeX className="h-5 w-5" /> : volume > 50 ? <Volume2 className="h-5 w-5" /> : <Volume1 className="h-5 w-5" />}
                      </motion.button>
                      <div className="w-20">
                        <Slider value={volume} onChange={handleVolume} />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {[0.5, 1, 1.5, 2].map((s) => (
                      <motion.button
                        key={s}
                        onClick={() => changeSpeed(s)}
                        className={`rounded-lg px-2 py-1 text-xs text-white transition-colors hover:bg-white/10 ${speed === s ? 'bg-white/15' : ''}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {s}x
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cutoff CTA overlay */}
          <AnimatePresence>
            {videoCutoff && (
              <motion.div
                className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-gray-950/80 px-6 text-center backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="mb-6 flex items-center justify-center gap-3">
                    <div className="h-px w-8" style={{ backgroundColor: accentColor }} />
                    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em]" style={{ color: accentColor }}>
                      Interested?
                    </span>
                    <div className="h-px w-8" style={{ backgroundColor: accentColor }} />
                  </div>

                  <h2 className="text-[clamp(1.8rem,4vw,3.2rem)] font-[800] leading-[1.1] tracking-tight text-white">
                    Let&apos;s Build <span style={{ color: accentColor }}>Together.</span>
                  </h2>

                  <p className="mx-auto mt-4 max-w-md text-[1rem] leading-relaxed text-white/45">
                    Ready to see more? Get in touch or replay the video.
                  </p>

                  <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <button
                      onClick={onCtaClick}
                      className="group relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-9 py-4 text-[0.85rem] font-semibold uppercase tracking-wider text-white transition-all duration-300"
                      style={{ backgroundColor: accentColor, boxShadow: `0 4px 24px ${accentColor}50` }}
                    >
                      <span className="relative z-10">{ctaLabel}</span>
                      <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />
                    </button>
                    <button
                      onClick={() => {
                        setVideoCutoff(false)
                        if (playerRef.current) {
                          playerRef.current.seekTo(0, true)
                          playerRef.current.playVideo()
                        }
                      }}
                      className="cursor-pointer rounded-full border border-white/15 px-7 py-4 text-[0.8rem] font-medium uppercase tracking-wider text-white/50 transition-all duration-300 hover:border-white/30 hover:text-white/80"
                    >
                      Replay
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
