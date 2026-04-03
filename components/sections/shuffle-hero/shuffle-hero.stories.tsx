import type { Meta, StoryObj } from '@storybook/react'
import ShuffleHero from './shuffle-hero'

const meta: Meta<typeof ShuffleHero> = {
  title: 'Sections/ShuffleHero',
  component: ShuffleHero,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    foregroundImage: { control: 'text' },
    backgroundImage: { control: 'text' },
    overline: { control: 'text' },
    headline: { control: 'text' },
    headlineAccent: { control: 'text' },
    statementText: { control: 'text' },
    statementAccent: { control: 'text' },
    accentColor: { control: 'color' },
    overlayColor: { control: 'text' },
    scrollHeight: { control: 'text' },
    ready: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof ShuffleHero>

export const Default: Story = {
  args: {
    foregroundImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80',
    backgroundImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80',
    overline: 'Award-Winning Studio',
    headline: 'We Build Spaces',
    headlineAccent: 'That Inspire',
    statementText: 'Every project begins with a conversation and ends with something',
    statementAccent: 'extraordinary',
    accentColor: '#0064B0',
    overlayColor: 'rgba(10,20,40,0.55)',
    scrollHeight: '240vh',
    ready: true,
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '300vh' }}>
        <Story />
        <div style={{ height: '100vh', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: '#666', fontSize: '1.25rem' }}>Scroll up to see the shuffle effect</p>
        </div>
      </div>
    ),
  ],
}
