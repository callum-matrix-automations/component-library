// Dependencies: motion
// Source: 4ccs-demo

'use client'

import { motion, useReducedMotion } from 'motion/react'
import { useIntersectionObserver } from '../../../hooks/use-intersection-observer'

export interface PortfolioProject {
  src: string
  title: string
  description: string
}

export interface PortfolioGalleryProps {
  overline?: string
  headline?: string
  headlineAccent?: string
  description?: string
  projects?: PortfolioProject[]
  accentColor?: string
  galleryHeight?: string
}

const defaultProjects: PortfolioProject[] = [
  {
    src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=1000&fit=crop',
    title: 'Altadena #1 — Rebuild Program',
    description: '2,522 sq ft Single Family Home with 516 sq ft ADU',
  },
  {
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=1000&fit=crop',
    title: 'Escondido, CA',
    description: '1,894 sq ft Single Family Home',
  },
  {
    src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=1000&fit=crop',
    title: 'Borrego Springs, CA',
    description: '1,090 sq ft Single Family Home',
  },
  {
    src: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=1000&fit=crop',
    title: 'Modern Revival',
    description: 'Spanish Revival Style — 2,522 sq ft Single Family Home',
  },
  {
    src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=1000&fit=crop',
    title: 'Miami, FL',
    description: '8 units development — 6 x 3 Bed/2Bath with 2 x 2B/2B',
  },
  {
    src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=1000&fit=crop',
    title: 'Los Angeles, CA',
    description: '2,900 sq ft 3 Beds | 3 Baths Single Family Home',
  },
]

export default function PortfolioGallery({
  overline = 'Portfolio',
  headline = 'See it',
  headlineAccent = 'in Action.',
  description = 'From single-family homes to multi-unit developments — delivering across every project type.',
  projects = defaultProjects,
  accentColor = '#0097A7',
  galleryHeight = '480px',
}: PortfolioGalleryProps) {
  const reduced = useReducedMotion()
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section ref={ref} className="relative bg-white py-28 sm:py-36">
      <div
        className="absolute top-0 left-0 h-px w-full"
        style={{ background: `linear-gradient(to right, transparent, ${accentColor}26, transparent)` }}
      />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3">
                <div className="h-px w-8" style={{ backgroundColor: accentColor }} />
                <span
                  className="text-[0.7rem] font-semibold uppercase tracking-[0.25em]"
                  style={{ color: accentColor }}
                >
                  {overline}
                </span>
              </div>
            </motion.div>
            <motion.h2
              className="mt-6 text-[clamp(2rem,4.5vw,3.5rem)] font-[800] tracking-tight text-gray-900"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {headline} <span style={{ color: accentColor }}>{headlineAccent}</span>
            </motion.h2>
          </div>
          <motion.p
            className="max-w-sm text-[0.95rem] leading-relaxed text-gray-500"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {description}
          </motion.p>
        </div>

        {/* Expandable gallery — Desktop */}
        <motion.div
          className="mt-16 hidden sm:block"
          initial={reduced ? false : { opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex w-full items-stretch gap-2" style={{ height: galleryHeight }}>
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="group relative flex-[1] cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 hover:flex-[3]"
              >
                <img
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  src={project.src}
                  alt={project.title}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(26,26,46,0.85)_0%,rgba(26,26,46,0.2)_40%,transparent_100%)] transition-opacity duration-500" />

                {/* Text — reveals on hover */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p
                    className="text-[0.65rem] font-semibold uppercase tracking-[0.2em]"
                    style={{ color: accentColor }}
                  >
                    {project.title}
                  </p>
                  <p className="mt-1.5 text-[0.85rem] font-medium leading-snug text-white/80">
                    {project.description}
                  </p>
                </div>

                {/* Collapsed state — vertical title */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transition-opacity duration-300 group-hover:opacity-0">
                  <p
                    className="whitespace-nowrap text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-white/60"
                    style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                  >
                    {project.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mobile fallback — stacked cards */}
        <div className="mt-16 grid gap-4 sm:hidden">
          {projects.map((project, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-2xl">
              <img className="h-56 w-full object-cover" src={project.src} alt={project.title} />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(26,26,46,0.9)_0%,transparent_60%)]" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p
                  className="text-[0.65rem] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: accentColor }}
                >
                  {project.title}
                </p>
                <p className="mt-1 text-sm font-medium text-white/80">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
