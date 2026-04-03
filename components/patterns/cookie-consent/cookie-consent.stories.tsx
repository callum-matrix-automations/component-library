import type { Meta, StoryObj } from '@storybook/react'
import CookieConsent from './cookie-consent'

const meta: Meta<typeof CookieConsent> = {
  title: 'Patterns/CookieConsent',
  component: CookieConsent,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    message: { control: 'text' },
    acceptLabel: { control: 'text' },
    declineLabel: { control: 'text' },
    backgroundColor: { control: 'color' },
    accentColor: { control: 'color' },
    storageKey: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof CookieConsent>

export const Default: Story = {
  args: {
    message: 'We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking "Accept", you consent to our use of cookies.',
    acceptLabel: 'Accept',
    declineLabel: 'Essential Only',
    backgroundColor: '#1a2332',
    accentColor: '#c2994e',
    storageKey: 'storybook-cookie-consent-default',
  },
  decorators: [
    (Story) => {
      // Clear the storage key so the banner always shows in Storybook
      localStorage.removeItem('storybook-cookie-consent-default')
      return (
        <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '2rem' }}>
          <p style={{ color: '#666', textAlign: 'center', marginTop: '40vh' }}>
            Page content goes here. The cookie banner appears at the bottom.
          </p>
          <Story />
        </div>
      )
    },
  ],
}

export const CustomBranding: Story = {
  args: {
    message: 'This site uses cookies to improve your experience. Please accept to continue.',
    acceptLabel: 'Got it!',
    declineLabel: 'No thanks',
    backgroundColor: '#0a1628',
    accentColor: '#0064B0',
    storageKey: 'storybook-cookie-consent-custom',
  },
  decorators: [
    (Story) => {
      localStorage.removeItem('storybook-cookie-consent-custom')
      return (
        <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '2rem' }}>
          <p style={{ color: '#666', textAlign: 'center', marginTop: '40vh' }}>
            Page content goes here. The cookie banner appears at the bottom.
          </p>
          <Story />
        </div>
      )
    },
  ],
}
