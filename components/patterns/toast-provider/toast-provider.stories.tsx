import type { Meta, StoryObj } from '@storybook/react'
import ToastProvider from './toast-provider'
import toast from 'react-hot-toast'
import React from 'react'

const meta: Meta<typeof ToastProvider> = {
  title: 'Patterns/ToastProvider',
  component: ToastProvider,
  argTypes: {
    position: {
      control: 'select',
      options: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'],
    },
    duration: { control: { type: 'number', min: 1000, max: 10000, step: 500 } },
    successColor: { control: 'color' },
    errorColor: { control: 'color' },
    loadingColor: { control: 'color' },
  },
}

export default meta
type Story = StoryObj<typeof ToastProvider>

const ToastDemo = (args: React.ComponentProps<typeof ToastProvider>) => (
  <div style={{ padding: '2rem' }}>
    <ToastProvider {...args} />
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '320px' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>Toast Triggers</h3>
      <button
        onClick={() => toast.success('Project saved successfully!')}
        style={{
          padding: '0.625rem 1.25rem',
          background: '#6b8a6b',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 500,
        }}
      >
        Success Toast
      </button>
      <button
        onClick={() => toast.error('Something went wrong. Please try again.')}
        style={{
          padding: '0.625rem 1.25rem',
          background: '#ef4444',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 500,
        }}
      >
        Error Toast
      </button>
      <button
        onClick={() => toast.loading('Uploading files...')}
        style={{
          padding: '0.625rem 1.25rem',
          background: '#c2994e',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 500,
        }}
      >
        Loading Toast
      </button>
      <button
        onClick={() => toast('Hello! This is a default notification.')}
        style={{
          padding: '0.625rem 1.25rem',
          background: '#374151',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 500,
        }}
      >
        Default Toast
      </button>
    </div>
  </div>
)

export const Default: Story = {
  args: {
    position: 'top-right',
    duration: 4000,
    successColor: '#6b8a6b',
    errorColor: '#ef4444',
    loadingColor: '#c2994e',
  },
  render: (args) => <ToastDemo {...args} />,
}
