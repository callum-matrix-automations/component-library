import type { Meta, StoryObj } from '@storybook/react'
import NextStepCard from './next-step-card'

const meta: Meta<typeof NextStepCard> = {
  title: 'Patterns/NextStepCard',
  component: NextStepCard,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#0A0F18' }] },
  },
  argTypes: {
    layout: { control: 'radio', options: ['horizontal', 'vertical'] },
    overline: { control: 'text' },
    headline: { control: 'text' },
    headlineAccent: { control: 'text' },
    description: { control: 'text' },
    ctaLabel: { control: 'text' },
    gradient: { control: 'text' },
    accentColor: { control: 'color' },
    accentLight: { control: 'color' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: 1200, padding: 32 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof NextStepCard>

export const Horizontal: Story = {
  args: {
    layout: 'horizontal',
    overline: 'Next Step',
    headline: 'Ready to discuss',
    headlineAccent: 'your project?',
    description: 'Tell us about your goals and we will put together a tailored plan to get you there — no obligation, no pressure.',
    ctaLabel: 'Discuss Your Project',
    imageSrc: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=1000&fit=crop',
    imageAlt: 'Construction process',
    stats: [
      { value: '30%', label: 'Cost reduction' },
      { value: '2x', label: 'Faster upgrades' },
      { value: '15%', label: 'Energy saved' },
    ],
  },
}

export const Vertical: Story = {
  args: {
    layout: 'vertical',
    overline: 'Next Step',
    headline: 'Ready to discuss',
    headlineAccent: 'your project?',
    description: 'Tell us about your goals and we will put together a tailored plan to get you there — no obligation, no pressure.',
    ctaLabel: 'Discuss Your Project',
    imageSrc: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop',
    imageAlt: 'Construction process',
    stats: [
      { value: '30%', label: 'Cost reduction' },
      { value: '2x', label: 'Faster upgrades' },
      { value: '15%', label: 'Energy saved' },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 500, padding: 32 }}>
        <Story />
      </div>
    ),
  ],
}

export const CustomGradient: Story = {
  args: {
    layout: 'horizontal',
    overline: 'Get Started',
    headline: 'Transform your',
    headlineAccent: 'digital presence.',
    description: 'Book a discovery call to discuss how we can build a growth system tailored to your business.',
    ctaLabel: 'Book Discovery Call',
    imageSrc: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=1000&fit=crop',
    imageAlt: 'Digital workspace',
    gradient: 'linear-gradient(135deg, #1E1B4B 0%, #4338CA 60%, #6366F1 100%)',
    accentColor: '#6366F1',
    accentLight: '#C7D2FE',
    stats: [
      { value: '3x', label: 'Pipeline growth' },
      { value: '45%', label: 'Close rate' },
    ],
  },
}

export const NoStats: Story = {
  args: {
    layout: 'horizontal',
    overline: 'Take Action',
    headline: 'Start something',
    headlineAccent: 'something great.',
    description: 'Our team is ready to help you bring your vision to life with precision and care.',
    ctaLabel: 'Contact Us',
    imageSrc: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=1000&fit=crop',
    imageAlt: 'Modern workspace',
  },
}
