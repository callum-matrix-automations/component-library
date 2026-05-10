import type { Meta, StoryObj } from '@storybook/react'
import CostOfInactionCard from './cost-of-inaction-card'

const meta: Meta<typeof CostOfInactionCard> = {
  title: 'Patterns/CostOfInactionCard',
  component: CostOfInactionCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    gradient: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: 900, padding: 32, margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof CostOfInactionCard>

export const Default: Story = {
  args: {
    title: 'The Cost of Inaction',
    description:
      'Every month without a unified system means more duplicated effort, more missed handoffs, and more revenue slipping through the cracks. The longer you wait, the harder the migration becomes — and the wider the gap grows.',
  },
}

export const CustomGradient: Story = {
  args: {
    title: 'Warning: Breaking Change',
    description:
      'Delaying this migration past Q3 will result in compatibility issues with upstream dependencies and potential security vulnerabilities in production.',
    gradient: 'linear-gradient(135deg, #4A1A00 0%, #92400E 50%, #B45309 100%)',
  },
}
