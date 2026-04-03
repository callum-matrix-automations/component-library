// Dependencies: motion/react
// Source: payload-demo (SiteLoader)
// Full-screen branded intro loader with animated wordmark, extending line, tagline,
// and architectural grid texture. Shows once per session, respects reduced motion.
// Dispatches a custom "loaderDone" event when exit completes.

'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

interface BrandedIntroLoaderProps {
  /** Primary text displayed in the centre (e.g. brand name) */
  wordmark: string
  /** Italic tagline shown below the extending line */
  tagline?: string
  /** Small label in the bottom-right corner */
  cornerLabel?: string
  /** Background colour of the loader overlay */
  backgroundColor?: string
  /** Milliseconds before the exit animation starts (default: 1900) */
  exitDelay?: number
  /** SessionStorage key used to show the loader only once per session */
  sessionKey?: string
  /** Custom event name dispatched when the loader finishes (default: "loaderDone") */
  doneEventName?: string
}

export default function BrandedIntroLoader({
  wordmark,
  tagline,
  cornerLabel,
  backgroundColor = '#0064B0',
  exitDelay = 1900,
  sessionKey = 'intro-loader-seen',
  doneEventName = 'loaderDone',
}: BrandedIntroLoaderProps) {
  const reduced = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const [lineAnimating, setLineAnimating] = useState(false)

  useEffect(() => {
    if (reduced) {
      window.dispatchEvent(new Event(doneEventName))
      return
    }

    const alreadySeen = sessionStorage.getItem(sessionKey)
    if (alreadySeen) {
      window.dispatchEvent(new Event(doneEventName))
      return
    }

    sessionStorage.setItem(sessionKey, '1')
    setVisible(true)

    const lineTimer = setTimeout(() => setLineAnimating(true), 700)
    const exitTimer = setTimeout(() => setVisible(false), exitDelay)

    return () => {
      clearTimeout(lineTimer)
      clearTimeout(exitTimer)
    }
  }, [reduced, sessionKey, exitDelay, doneEventName])

  function handleExitComplete() {
    window.dispatchEvent(new Event(doneEventName))
  }

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          key="branded-intro-loader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor }}
          exit={{
            y: '-100%',
            transition: {
              duration: 0.9,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
        >
          {/* Architectural grid texture */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            aria-hidden="true"
            style={{
              backgroundImage:
                'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          {/* Centre content */}
          <div className="relative flex flex-col items-center">
            {/* Wordmark — clips upward into view */}
            <div className="overflow-hidden">
              <motion.p
                className="text-white text-[13px] font-semibold uppercase tracking-[0.35em]"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                {wordmark}
              </motion.p>
            </div>

            {/* Extending line beneath wordmark */}
            <div className="mt-4 w-[180px] h-px bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-white/50"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: lineAnimating ? 1 : 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: 'left' }}
              />
            </div>

            {/* Tagline beneath line */}
            {tagline && (
              <div className="overflow-hidden mt-5">
                <motion.p
                  className="italic text-white/45 text-[14px] tracking-wide"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.55, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                >
                  {tagline}
                </motion.p>
              </div>
            )}
          </div>

          {/* Corner — architectural detail */}
          {cornerLabel && (
            <div className="absolute bottom-8 right-8 text-right" aria-hidden="true">
              <motion.p
                className="text-white/20 text-[10px] uppercase tracking-[0.25em]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.4 }}
              >
                {cornerLabel}
              </motion.p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
