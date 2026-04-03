import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

function RecaptchaInfo() {
  return (
    <div
      style={{
        maxWidth: '560px',
        margin: '4rem auto',
        padding: '2rem',
        borderRadius: '12px',
        background: '#fff',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#111' }}>
        useRecaptcha
      </h2>
      <p style={{ color: '#6b7280', marginBottom: '1.5rem', lineHeight: 1.6 }}>
        A hook for Google reCAPTCHA v3 integration. Requires a valid site key to function, so this
        story shows the API reference rather than a live demo.
      </p>

      <div style={{ background: '#f9fafb', borderRadius: '8px', padding: '1.25rem', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Usage
        </h3>
        <pre
          style={{
            background: '#1a1a2e',
            color: '#e2e8f0',
            padding: '1rem',
            borderRadius: '6px',
            fontSize: '0.8125rem',
            lineHeight: 1.7,
            overflow: 'auto',
          }}
        >
{`import { useRecaptcha } from './use-recaptcha'

const { executeRecaptcha, isLoaded } = useRecaptcha('your-site-key')

// In a form submit handler:
const token = await executeRecaptcha('form_submit')
// Send token to your backend for verification`}
        </pre>
      </div>

      <div style={{ background: '#f9fafb', borderRadius: '8px', padding: '1.25rem' }}>
        <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Returns
        </h3>
        <table style={{ width: '100%', fontSize: '0.875rem', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ textAlign: 'left', padding: '0.5rem 0', color: '#374151' }}>Property</th>
              <th style={{ textAlign: 'left', padding: '0.5rem 0', color: '#374151' }}>Type</th>
              <th style={{ textAlign: 'left', padding: '0.5rem 0', color: '#374151' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '0.5rem 0' }}><code style={{ background: '#e5e7eb', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8125rem' }}>executeRecaptcha</code></td>
              <td style={{ padding: '0.5rem 0', color: '#6b7280' }}>(action: string) =&gt; Promise&lt;string | null&gt;</td>
              <td style={{ padding: '0.5rem 0', color: '#6b7280' }}>Execute reCAPTCHA and get token</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem 0' }}><code style={{ background: '#e5e7eb', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8125rem' }}>isLoaded</code></td>
              <td style={{ padding: '0.5rem 0', color: '#6b7280' }}>boolean</td>
              <td style={{ padding: '0.5rem 0', color: '#6b7280' }}>Whether the reCAPTCHA script is ready</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

const meta: Meta = {
  title: 'Hooks/useRecaptcha',
  component: RecaptchaInfo,
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => <RecaptchaInfo />,
}
