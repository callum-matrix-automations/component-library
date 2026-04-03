import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { useIntersectionObserver } from './use-intersection-observer'

function IntersectionDemo() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.3, triggerOnce: false })

  return (
    <div style={{ minHeight: '200vh', padding: '2rem' }}>
      <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem', color: '#111' }}>
          useIntersectionObserver Demo
        </h2>
        <p>Scroll down to see the box change when it enters the viewport.</p>
      </div>

      <div style={{ height: '80vh' }} />

      <div
        ref={ref}
        style={{
          width: '300px',
          height: '200px',
          margin: '0 auto',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.25rem',
          fontWeight: 600,
          transition: 'all 0.5s ease',
          background: isVisible ? '#0064B0' : '#e5e7eb',
          color: isVisible ? '#fff' : '#9ca3af',
          transform: isVisible ? 'scale(1)' : 'scale(0.9)',
          boxShadow: isVisible ? '0 20px 40px rgba(0,100,176,0.3)' : 'none',
        }}
      >
        {isVisible ? 'Visible!' : 'Not visible'}
      </div>

      <div style={{ height: '60vh' }} />
    </div>
  )
}

const meta: Meta = {
  title: 'Hooks/useIntersectionObserver',
  component: IntersectionDemo,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => <IntersectionDemo />,
}
