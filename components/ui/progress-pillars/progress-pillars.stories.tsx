import type { Meta, StoryObj } from '@storybook/react'
import ProgressPillars from './progress-pillars'

const meta: Meta<typeof ProgressPillars> = {
  title: 'UI/ProgressPillars',
  component: ProgressPillars,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#0F0F1A' }] },
  },
  argTypes: {
    segments: { control: { type: 'range', min: 2, max: 10, step: 1 } },
    filled: { control: { type: 'range', min: 0, max: 10, step: 1 } },
    type: { control: 'select', options: ['danger', 'info', 'warning', 'purple'] },
    name: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof ProgressPillars>

export const Default: Story = {
  args: { segments: 6, filled: 4, type: 'info', name: 'Q4 Pipeline' },
}

export const AllTypes: Story = {
  decorators: [
    () => (
      <div className="flex gap-10 p-6">
        <ProgressPillars segments={5} filled={3} type="danger" name="Overdue Tasks" />
        <ProgressPillars segments={6} filled={4} type="info" name="Sprint Progress" />
        <ProgressPillars segments={4} filled={2} type="warning" name="Budget Used" />
        <ProgressPillars segments={8} filled={8} type="purple" name="Onboarding" />
      </div>
    ),
  ],
}
