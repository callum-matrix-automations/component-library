import type { Meta, StoryObj } from '@storybook/react'
import IssueCard from './issue-card'

const meta: Meta<typeof IssueCard> = {
  title: 'Patterns/IssueCard',
  component: IssueCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    index: { control: 'number' },
    accentColor: { control: 'color' },
  },
}

export default meta
type Story = StoryObj<typeof IssueCard>

export const Default: Story = {
  args: {
    index: 1,
    children: 'Your team spends more time switching between tools than doing meaningful work — and the data still ends up in a spreadsheet.',
    accentColor: '#F19A33',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
}

export const Grid: Story = {
  decorators: [
    () => (
      <div className="mx-auto max-w-5xl space-y-5 p-8">
        <div className="grid grid-cols-3 gap-5">
          {[
            'Your team spends more time switching between tools than doing meaningful work.',
            'Customer data lives in five different places and no one trusts the numbers.',
            'New hires take months to ramp up because onboarding is tribal knowledge, not documented process.',
          ].map((text, i) => (
            <IssueCard key={i} index={i + 1}>{text}</IssueCard>
          ))}
        </div>
        <div className="mx-auto grid w-2/3 grid-cols-2 gap-5">
          {[
            'Leadership decisions are delayed because pulling reports takes days, not minutes.',
            'Your best people are burned out on busywork that should have been automated years ago.',
          ].map((text, i) => (
            <IssueCard key={i} index={i + 4}>{text}</IssueCard>
          ))}
        </div>
      </div>
    ),
  ],
  parameters: { layout: 'fullscreen' },
}
