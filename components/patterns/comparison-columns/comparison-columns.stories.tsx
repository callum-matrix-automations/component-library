import type { Meta, StoryObj } from '@storybook/react'
import ComparisonColumns from './comparison-columns'

const meta: Meta<typeof ComparisonColumns> = {
  title: 'Patterns/ComparisonColumns',
  component: ComparisonColumns,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    leftTitle: { control: 'text' },
    rightTitle: { control: 'text' },
    accentColor: { control: 'color' },
    closingMessage: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: 1200, padding: 32, margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ComparisonColumns>

export const Default: Story = {
  args: {
    leftTitle: 'The old way',
    rightTitle: 'The better way',
    items: [
      { dont: 'Scattered tools with no unified view of performance', do: 'Single platform with real-time dashboards and unified reporting' },
      { dont: 'Manual data entry eating up hours every week', do: 'Automated workflows that sync data across every system' },
      { dont: 'Decisions based on gut feeling and outdated spreadsheets', do: 'Data-driven insights delivered before you need to ask for them' },
      { dont: 'Siloed teams working with conflicting information', do: 'Shared workspace where every team sees the same numbers' },
      { dont: 'Reactive support that only responds after something breaks', do: 'Proactive monitoring with alerts before issues reach your customers' },
    ],
    closingMessage: 'Stop patching broken workflows. Start with a system designed to scale from day one.',
  },
}

export const WithoutClosing: Story = {
  args: {
    leftTitle: 'Before',
    rightTitle: 'After',
    accentColor: '#10B981',
    rightGradient: 'linear-gradient(135deg, #022C22 0%, #065F46 60%, #047857 100%)',
    items: [
      { dont: 'Manual deployments taking hours', do: 'Automated CI/CD pipeline in under 5 minutes' },
      { dont: 'No monitoring until users report issues', do: 'Proactive alerting catches problems before users notice' },
      { dont: 'Scattered documentation across wikis and Slack', do: 'Single source of truth with automated docs generation' },
    ],
  },
}
