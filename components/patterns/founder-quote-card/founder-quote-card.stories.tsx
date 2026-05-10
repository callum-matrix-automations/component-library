import type { Meta, StoryObj } from '@storybook/react'
import FounderQuoteCard from './founder-quote-card'

const meta: Meta<typeof FounderQuoteCard> = {
  title: 'Patterns/FounderQuoteCard',
  component: FounderQuoteCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    quote: { control: 'text' },
    attribution: { control: 'text' },
    gradient: { control: 'text' },
    accentColor: { control: 'color' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 500 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FounderQuoteCard>

export const Default: Story = {
  args: {
    quote: 'We started this company because we saw too many teams drowning in tools that were supposed to make them faster. The answer was never more software — it was better systems.',
    attribution: 'Alex Rivera, Founder & CEO',
  },
}

export const CustomTheme: Story = {
  args: {
    quote: 'The best code is the code you never have to write. We focus on solving the right problems, not writing the most lines.',
    attribution: 'Sarah Chen, CTO',
    gradient: 'linear-gradient(135deg, #1E1B4B 0%, #3730A3 60%, #4F46E5 100%)',
    accentColor: '#A78BFA',
  },
}
