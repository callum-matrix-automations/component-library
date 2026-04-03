// Dependencies: framer-motion
// Source: cutting-edge-homes

"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

/* ─── Types ──────────────────────────────────────────────────────────────── */

export interface CaseStudySectionBlock {
  /** Section heading */
  title: string;
  /** Image URL for the section */
  image: string;
  /** Freeform paragraph text (mutually exclusive with items) */
  text?: string;
  /** Bullet-point list (mutually exclusive with text) */
  items?: string[];
  /** Icon style for bullet items: "check" (green tick) or "warning" (triangle) */
  bulletIcon?: 'check' | 'warning';
}

export interface CaseStudyTestimonial {
  name: string;
  role?: string;
  image: string;
  quote: string;
}

export interface CaseStudy {
  /** URL-safe identifier */
  slug: string;
  /** Card & modal title */
  title: string;
  /** Location label (e.g. "San Francisco, CA") */
  location: string;
  /** Duration label (e.g. "June 2023 - Dec 2023") */
  duration: string;
  /** Subtitle metadata rendered below the title */
  subtitle?: string;
  /** Hero/cover image URL */
  heroImage: string;
  /** Ordered content sections rendered in the modal body */
  sections: CaseStudySectionBlock[];
  /** Optional testimonial block */
  testimonial?: CaseStudyTestimonial;
  /** Gallery image URLs */
  gallery?: string[];
}

export interface CaseStudySectionProps {
  /** Array of case studies to display */
  studies: CaseStudy[];
  /** Section label above the heading */
  label?: string;
  /** Main heading text */
  heading?: string;
  /** Accent-colored portion of the heading */
  headingAccent?: string;
  /** Subheading / description */
  subheading?: string;
  /** Accent color for labels, links, and highlights (default: "#c2994e") */
  accentColor?: string;
  /** Background color for the section (default: "#0a0a0a") */
  backgroundColor?: string;
  /** Background color for cards and modal surfaces (default: "#141414") */
  surfaceColor?: string;
}

/* ─── SVG Icons ──────────────────────────────────────────────────────────── */

function LocationIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

function QuoteIcon({ color }: { color: string }) {
  return (
    <svg className="w-10 h-10 opacity-30" style={{ color }} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
    </svg>
  );
}

/* ─── Internal Sub-components ────────────────────────────────────────────── */

function ModalSectionWithImage({
  title,
  image,
  children,
  imageLeft = false,
}: {
  title: string;
  image: string;
  children: React.ReactNode;
  imageLeft?: boolean;
}) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start ${imageLeft ? '' : 'lg:[&>*:first-child]:order-2'}`}>
      <div>
        <img
          src={image}
          alt={title}
          className="w-full rounded-xl object-cover aspect-4/3"
          loading="lazy"
        />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-white mb-5">{title}</h3>
        {children}
      </div>
    </div>
  );
}

function BulletList({ items, icon }: { items: string[]; icon: 'check' | 'warning' }) {
  const Icon = icon === 'warning' ? WarningIcon : CheckIcon;
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-white/65 leading-relaxed">
          <Icon />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ─── Card ───────────────────────────────────────────────────────────────── */

function CaseStudyCard({
  study,
  index,
  onOpen,
  accentColor,
  surfaceColor,
}: {
  study: CaseStudy;
  index: number;
  onOpen: () => void;
  accentColor: string;
  surfaceColor: string;
}) {
  return (
    <motion.div
      className="group relative rounded-2xl overflow-hidden border border-white/10 cursor-pointer hover:border-white/20 transition-all duration-300"
      style={{ backgroundColor: surfaceColor }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.15 } },
      }}
      onClick={onOpen}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(); } }}
      role="button"
      tabIndex={0}
      aria-label={`View case study: ${study.title}`}
    >
      {/* Hero image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={study.heroImage}
          alt={study.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Duration badge */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs text-white/80">
          <CalendarIcon />
          {study.duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 transition-colors" style={{ ['--hover-color' as string]: accentColor }}>
          <span className="group-hover:text-[var(--hover-color)] transition-colors">{study.title}</span>
        </h3>

        <div className="flex items-center gap-1.5 text-sm text-white/50 mb-4">
          <LocationIcon />
          {study.location}
        </div>

        {study.sections[0]?.text && (
          <p className="text-sm text-white/60 leading-relaxed line-clamp-3 mb-5">
            {study.sections[0].text}
          </p>
        )}

        <div className="flex items-center gap-2 text-sm font-medium transition-colors" style={{ color: accentColor }}>
          View Full Case Study
          <ArrowIcon />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Modal ──────────────────────────────────────────────────────────────── */

function CaseStudyModal({
  study,
  onClose,
  accentColor,
  backgroundColor,
  surfaceColor,
}: {
  study: CaseStudy;
  onClose: () => void;
  accentColor: string;
  backgroundColor: string;
  surfaceColor: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsOpen(true));
    });
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={`${study.title} case study`}
    >
      {/* Scrim */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: isOpen ? 1 : 0 }}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="relative w-full h-full max-w-6xl max-h-[92vh] mx-4 my-4 rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col"
        style={{
          backgroundColor,
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.98)',
          transition: 'opacity 0.3s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white/70 hover:text-white transition-colors cursor-pointer"
          aria-label="Close case study"
        >
          <CloseIcon />
        </button>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          {/* Hero */}
          <div className="relative h-72 sm:h-96">
            <img src={study.heroImage} alt={study.title} className="w-full h-full object-cover" />
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(to top, ${backgroundColor}, rgba(0,0,0,0.4), transparent)` }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
              <div className="flex items-center gap-4 text-sm text-white/60 mb-3">
                <span className="flex items-center gap-1.5"><LocationIcon /> {study.location}</span>
                <span className="flex items-center gap-1.5"><CalendarIcon /> {study.duration}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                {study.title}
              </h2>
              {study.subtitle && (
                <p className="mt-2 text-sm text-white/50">{study.subtitle}</p>
              )}
            </div>
          </div>

          {/* Sections */}
          <div className="px-8 sm:px-10 py-10 space-y-16">
            {study.sections.map((section, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className="h-px bg-white/[0.08]" />}
                <ModalSectionWithImage
                  title={section.title}
                  image={section.image}
                  imageLeft={i % 2 === 0}
                >
                  {section.text && (
                    <p className="text-sm text-white/65 leading-relaxed">{section.text}</p>
                  )}
                  {section.items && (
                    <BulletList items={section.items} icon={section.bulletIcon || 'check'} />
                  )}
                </ModalSectionWithImage>
              </React.Fragment>
            ))}

            {/* Testimonial */}
            {study.testimonial && (
              <>
                <div className="h-px bg-white/[0.08]" />
                <div
                  className="rounded-2xl p-8 sm:p-10 border border-white/5"
                  style={{ backgroundColor: surfaceColor }}
                >
                  <QuoteIcon color={accentColor} />
                  <blockquote className="mt-4 text-sm sm:text-base text-white/70 leading-relaxed whitespace-pre-line">
                    {study.testimonial.quote}
                  </blockquote>
                  <div className="flex items-center gap-4 mt-6">
                    <img
                      src={study.testimonial.image}
                      alt={study.testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div>
                      <p className="text-sm font-semibold text-white">{study.testimonial.name}</p>
                      {study.testimonial.role && (
                        <p className="text-xs text-white/40">{study.testimonial.role}</p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Gallery */}
            {study.gallery && study.gallery.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Project Gallery</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {study.gallery.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`${study.title} — photo ${i + 1}`}
                      className="w-full aspect-4/3 object-cover rounded-lg hover:opacity-80 transition-opacity"
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Section Export ──────────────────────────────────────────────────────── */

export default function CaseStudySection({
  studies,
  label = 'Real Projects',
  heading = 'Our Work in',
  headingAccent = 'Action',
  subheading = 'See how we deliver results through real-world projects.',
  accentColor = '#c2994e',
  backgroundColor = '#0a0a0a',
  surfaceColor = '#141414',
}: CaseStudySectionProps) {
  const [activeStudy, setActiveStudy] = useState<CaseStudy | null>(null);

  return (
    <>
      <section className="py-20 sm:py-28" style={{ backgroundColor }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-sm font-semibold uppercase tracking-[0.2em] mb-3"
              style={{ color: accentColor }}
            >
              {label}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {heading} <span style={{ color: accentColor }}>{headingAccent}</span>
            </h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              {subheading}
            </p>
          </motion.div>

          {/* Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {studies.map((study, i) => (
              <CaseStudyCard
                key={study.slug}
                study={study}
                index={i}
                accentColor={accentColor}
                surfaceColor={surfaceColor}
                onOpen={() => setActiveStudy(study)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      {activeStudy && (
        <CaseStudyModal
          study={activeStudy}
          onClose={() => setActiveStudy(null)}
          accentColor={accentColor}
          backgroundColor={backgroundColor}
          surfaceColor={surfaceColor}
        />
      )}
    </>
  );
}
