import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { motion } from 'framer-motion'
import { useMagneticEffect } from './use-magnetic-effect'

function MagneticDemo() {
  const { ref, x, y, isHovered } = useMagneticEffect({
    strength: 0.4,
    range: 150,
    stiffness: 200,
    damping: 20,
  })

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        background: '#fafafa',
      }}
    >
      <div style={{ textAlign: 'center', color: '#666' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem', color: '#111' }}>
          useMagneticEffect Demo
        </h2>
        <p>Move your cursor near the button below to see the magnetic pull.</p>
      </div>

      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        style={{
          x,
          y,
          padding: '1rem 2.5rem',
          fontSize: '1.125rem',
          fontWeight: 600,
          color: '#fff',
          background: isHovered ? '#0052a0' : '#0064B0',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
          boxShadow: isHovered
            ? '0 20px 40px rgba(0,100,176,0.35)'
            : '0 4px 12px rgba(0,0,0,0.1)',
          transition: 'background 0.2s, box-shadow 0.3s',
        }}
      >
        Magnetic Button
      </motion.button>

      <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
        Hovered: {isHovered ? 'Yes' : 'No'}
      </p>
    </div>
  )
}

const meta: Meta = {
  title: 'Hooks/useMagneticEffect',
  component: MagneticDemo,
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => <MagneticDemo />,
}
