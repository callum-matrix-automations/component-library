// Dependencies: clsx (via StickyTabs), framer-motion
// Source: cutting-edge-homes
// Requires: ../ui/sticky-tabs (StickyTabs compound component)

"use client"

import React from 'react';
import { motion } from 'framer-motion';
import StickyTabs from '../../ui/sticky-tabs/sticky-tabs';

/* ─── Types ──────────────────────────────────────────────────────────────── */

export interface ProcessStep {
  /** Step number or label (e.g. "1", "A") */
  number: string;
  /** Step title */
  title: string;
  /** Step description paragraph */
  description: string;
  /** Optional bullet-point details */
  details?: Array<{ text: string }> | null;
}

export interface ProcessSectionProps {
  /** Small label above the heading (e.g. "How It Works") */
  label?: string;
  /** Main heading text */
  heading?: string;
  /** Accent-colored portion of the heading */
  headingAccent?: string;
  /** Subheading / description text */
  subheading?: string;
  /** Array of process steps to display */
  steps: ProcessStep[];
  /** Accent color for labels and icons (default: "#c2994e") */
  accentColor?: string;
  /** Height of the site's main navigation, passed to StickyTabs (default: "4rem") */
  mainNavHeight?: string;
  /** Override StickyTabs className props if needed */
  stickyTabsClassNames?: {
    rootClassName?: string;
    navSpacerClassName?: string;
    sectionClassName?: string;
    stickyHeaderContainerClassName?: string;
    headerContentWrapperClassName?: string;
    headerContentLayoutClassName?: string;
    titleClassName?: string;
    contentLayoutClassName?: string;
  };
}

/* ─── Check Icon ─────────────────────────────────────────────────────────── */

function CheckIcon({ color }: { color: string }) {
  return (
    <svg
      className="w-4 h-4 shrink-0 mt-1"
      style={{ color }}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

/* ─── Step Content ───────────────────────────────────────────────────────── */

function StepContent({ step, accentColor }: { step: ProcessStep; accentColor: string }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
      {/* Left — description */}
      <div>
        <p className="text-base sm:text-lg text-white/70 leading-relaxed">
          {step.description}
        </p>
      </div>

      {/* Right — detail bullets */}
      {step.details && step.details.length > 0 && (
        <div>
          <ul className="space-y-4">
            {step.details.map((detail, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckIcon color={accentColor} />
                <span className="text-sm sm:text-base text-white/60 leading-relaxed">
                  {detail.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ─── Section Header ─────────────────────────────────────────────────────── */

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── ProcessSection ─────────────────────────────────────────────────────── */

export default function ProcessSection({
  label = 'How It Works',
  heading = 'From Vision to',
  headingAccent = 'Move-In',
  subheading = 'We guide you through every step.',
  steps,
  accentColor = '#c2994e',
  mainNavHeight = '4rem',
  stickyTabsClassNames = {},
}: ProcessSectionProps) {
  const {
    rootClassName = 'bg-neutral-950 text-white',
    navSpacerClassName = 'border-b border-white/10 bg-neutral-950',
    sectionClassName = 'bg-neutral-900',
    stickyHeaderContainerClassName = 'shadow-[0_4px_24px_rgba(0,0,0,0.4)]',
    headerContentWrapperClassName = 'border-b border-t border-white/10 bg-neutral-950',
    headerContentLayoutClassName = 'mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8',
    titleClassName = 'my-0 text-xl font-semibold leading-none md:text-2xl lg:text-3xl text-white',
    contentLayoutClassName = 'mx-auto max-w-7xl px-4 py-16 sm:py-20 sm:px-6 lg:px-8',
  } = stickyTabsClassNames;

  return (
    <div className="relative">
      {/* Section header */}
      <div className="bg-neutral-950 pt-24 pb-16" style={{ backgroundColor: undefined }}>
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <p
            className="text-sm font-semibold uppercase tracking-[0.2em] mb-3"
            style={{ color: accentColor }}
          >
            {label}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {heading}{' '}
            <span style={{ color: accentColor }}>{headingAccent}</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            {subheading}
          </p>
        </motion.div>
      </div>

      {/* Sticky tabs */}
      <StickyTabs
        mainNavHeight={mainNavHeight}
        rootClassName={rootClassName}
        navSpacerClassName={navSpacerClassName}
        sectionClassName={sectionClassName}
        stickyHeaderContainerClassName={stickyHeaderContainerClassName}
        headerContentWrapperClassName={headerContentWrapperClassName}
        headerContentLayoutClassName={headerContentLayoutClassName}
        titleClassName={titleClassName}
        contentLayoutClassName={contentLayoutClassName}
      >
        {steps.map((step) => (
          <StickyTabs.Item
            key={step.number}
            title={`${step.number}. ${step.title}`}
            id={step.number}
          >
            <StepContent step={step} accentColor={accentColor} />
          </StickyTabs.Item>
        ))}
      </StickyTabs>
    </div>
  );
}
