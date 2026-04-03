import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  fadeInUpVariants,
  fadeInDownVariants,
  fadeInLeftVariants,
  fadeInRightVariants,
  scaleInVariants,
  staggerContainerVariants,
  staggerItemVariants,
  headingVariants,
  blurFadeVariants,
  slideInRightVariants,
  slideInLeftVariants,
} from './animation-variants'

const variantEntries = [
  { name: 'fadeInUp', variants: fadeInUpVariants, color: '#0064B0' },
  { name: 'fadeInDown', variants: fadeInDownVariants, color: '#7c3aed' },
  { name: 'fadeInLeft', variants: fadeInLeftVariants, color: '#059669' },
  { name: 'fadeInRight', variants: fadeInRightVariants, color: '#dc2626' },
  { name: 'scaleIn', variants: scaleInVariants, color: '#d97706' },
  { name: 'heading', variants: headingVariants, color: '#0891b2' },
  { name: 'blurFade', variants: blurFadeVariants, color: '#7c3aed' },
  { name: 'slideInRight', variants: slideInRightVariants, color: '#be185d' },
  { name: 'slideInLeft', variants: slideInLeftVariants, color: '#4338ca' },
]

function AnimationVariantsDemo() {
  const [key, setKey] = useState(0)

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111' }}>Animation Variants</h2>
          <p style={{ color: '#6b7280', marginTop: '0.25rem' }}>Each box demonstrates a different variant. Click replay to re-trigger.</p>
        </div>
        <button
          onClick={() => setKey((k) => k + 1)}
          style={{
            padding: '0.5rem 1.25rem',
            background: '#111',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          Replay All
        </button>
      </div>

      <div
        key={key}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {variantEntries.map(({ name, variants, color }) => (
          <motion.div
            key={name}
            variants={variants}
            initial="hidden"
            animate="visible"
            style={{
              background: color,
              borderRadius: '12px',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '120px',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.875rem',
              textAlign: 'center',
            }}
          >
            {name}
          </motion.div>
        ))}
      </div>

      {/* Stagger demo */}
      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginTop: '3rem', marginBottom: '1rem', color: '#111' }}>
        Stagger Container + Items
      </h3>
      <motion.div
        key={`stagger-${key}`}
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '0.75rem',
        }}
      >
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div
            key={i}
            variants={staggerItemVariants}
            style={{
              background: '#374151',
              borderRadius: '8px',
              padding: '1rem',
              color: '#fff',
              fontWeight: 500,
              textAlign: 'center',
              fontSize: '0.8125rem',
            }}
          >
            Item {i + 1}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

const meta: Meta = {
  title: 'Utils/AnimationVariants',
  component: AnimationVariantsDemo,
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => <AnimationVariantsDemo />,
}
