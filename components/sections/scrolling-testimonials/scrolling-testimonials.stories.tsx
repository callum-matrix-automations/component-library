import type { Meta, StoryObj } from '@storybook/react'
import ScrollingTestimonials from './scrolling-testimonials'

const meta: Meta<typeof ScrollingTestimonials> = {
  title: 'Sections/ScrollingTestimonials',
  component: ScrollingTestimonials,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    speed: { control: { type: 'range', min: 10, max: 100, step: 5 } },
    pauseOnHover: { control: 'boolean' },
    accentColor: { control: 'color' },
    backgroundColor: { control: 'color' },
    cardBackgroundColor: { control: 'color' },
    gradientColor: { control: 'color' },
  },
}

export default meta
type Story = StoryObj<typeof ScrollingTestimonials>

export const Default: Story = {}

export const GoldOnDark: Story = {
  args: {
    accentColor: '#C8A44E',
    backgroundColor: '#0F0F0F',
    cardBackgroundColor: '#1A1A1A',
    gradientColor: '#0F0F0F',
    speed: 30,
  },
}

export const BlueOnNavy: Story = {
  args: {
    accentColor: '#0064B0',
    backgroundColor: '#0A1628',
    cardBackgroundColor: '#0F1F36',
    gradientColor: '#0A1628',
    speed: 40,
    reviews: [
      { name: 'Sarah M.', location: 'Auckland, NZ', quote: 'The build quality exceeded our expectations. Every detail was thoughtfully considered and expertly executed.' },
      { name: 'James K.', location: 'Wellington, NZ', quote: 'From initial consultation to handover, the process was seamless. Truly a world-class building experience.' },
      { name: 'Lisa T.', location: 'Christchurch, NZ', quote: 'We were kept informed at every stage. The transparency and communication set them apart from anyone else we considered.' },
      { name: 'Mark R.', location: 'Hamilton, NZ', quote: 'Our home was delivered on time and on budget. The energy efficiency has already saved us significantly on power bills.' },
      { name: 'Rachel P.', location: 'Tauranga, NZ', quote: 'The design flexibility was incredible. They accommodated every change we requested without any fuss.' },
    ],
  },
}

export const Fast: Story = {
  args: {
    speed: 80,
    accentColor: '#F59E0B',
    backgroundColor: '#18181B',
    cardBackgroundColor: '#27272A',
    gradientColor: '#18181B',
  },
}
