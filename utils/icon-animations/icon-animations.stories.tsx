import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { motion } from 'framer-motion'
import {
  pulseVariants,
  bounceVariants,
  spinVariants,
  hoverScaleVariants,
  hoverRotateVariants,
  wiggleVariants,
  glowPulseVariants,
  floatVariants,
  shakeVariants,
  clickVariants,
  badgePulseVariants,
  fadeInVariants,
  colorShiftVariants,
} from './icon-animations'

const iconVariants = [
  { name: 'pulse', variants: pulseVariants, emoji: '💎', auto: true },
  { name: 'bounce', variants: bounceVariants, emoji: '🚀', auto: true },
  { name: 'spin', variants: spinVariants, emoji: '⚙️', auto: true },
  { name: 'hoverScale', variants: hoverScaleVariants, emoji: '🔍', auto: false },
  { name: 'hoverRotate', variants: hoverRotateVariants, emoji: '🔄', auto: false },
  { name: 'wiggle', variants: wiggleVariants, emoji: '🔔', auto: true },
  { name: 'glowPulse', variants: glowPulseVariants, emoji: '✨', auto: true },
  { name: 'float', variants: floatVariants, emoji: '🎈', auto: true },
  { name: 'shake', variants: shakeVariants, emoji: '📳', auto: true },
  { name: 'click', variants: clickVariants, emoji: '👆', auto: false },
  { name: 'badgePulse', variants: badgePulseVariants, emoji: '🏷️', auto: true },
  { name: 'fadeIn', variants: fadeInVariants, emoji: '👁️', auto: true },
  { name: 'colorShift', variants: colorShiftVariants, emoji: '🎨', auto: true },
]

function IconAnimationsDemo() {
  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111', marginBottom: '0.25rem' }}>
        Icon Animation Variants
      </h2>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
        Hover-based variants require mouse interaction. Auto-play variants animate continuously.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '1rem',
        }}
      >
        {iconVariants.map(({ name, variants, emoji, auto }) => (
          <motion.div
            key={name}
            variants={variants}
            initial="initial"
            animate={auto ? 'animate' : undefined}
            whileHover={!auto ? 'animate' : undefined}
            whileTap={name === 'click' ? 'animate' : undefined}
            style={{
              background: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              cursor: auto ? 'default' : 'pointer',
              minHeight: '120px',
            }}
          >
            <span style={{ fontSize: '2rem' }}>{emoji}</span>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#374151',
                textAlign: 'center',
              }}
            >
              {name}
            </span>
            <span
              style={{
                fontSize: '0.625rem',
                color: '#9ca3af',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {auto ? 'auto' : 'hover/tap'}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const meta: Meta = {
  title: 'Utils/IconAnimations',
  component: IconAnimationsDemo,
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => <IconAnimationsDemo />,
}
