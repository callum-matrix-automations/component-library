import type { Meta, StoryObj } from '@storybook/react'
import VideoFeatureCard from './video-feature-card'

const YOUTUBE_ID = 'u31qwQUeGuM'

const meta: Meta<typeof VideoFeatureCard> = {
  title: 'Patterns/VideoFeatureCard',
  component: VideoFeatureCard,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#060A10' }] },
  },
  argTypes: {
    index: { control: 'text' },
    headline: { control: 'text' },
    body: { control: 'text' },
    accent: { control: 'color' },
    accentLight: { control: 'color' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 1100, padding: 32, margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof VideoFeatureCard>

export const Default: Story = {
  args: {
    index: '01',
    headline: 'Automated Workflow Engine',
    body: 'Replace manual handoffs with intelligent automation. Every task flows through the right team at the right time — no more dropped balls or missed deadlines.',
    stat: { value: '30%', unit: 'Reduction in manual work' },
    youtubeVideoId: YOUTUBE_ID,
    accent: '#0064B0',
    accentLight: '#8ED1FC',
    gradientFrom: '#080E18',
    gradientTo: '#0A1829',
    benefits: [
      { icon: 'wrench', label: 'Drag-and-drop workflow builder' },
      { icon: 'trending', label: 'Real-time performance tracking' },
      { icon: 'refresh', label: 'Automatic retry and error handling' },
      { icon: 'layers', label: 'Multi-step approval chains' },
    ],
  },
}

export const GoldAccent: Story = {
  args: {
    index: '03',
    headline: 'Predictive Analytics',
    body: 'Surface trends before they become problems. Machine learning models trained on your data deliver forecasts that get more accurate every week.',
    stat: { value: '15%', unit: 'Revenue lift from forecasting' },
    youtubeVideoId: YOUTUBE_ID,
    accent: '#C8A96E',
    accentLight: '#E8CC9A',
    gradientFrom: '#100C05',
    gradientTo: '#1A1408',
    benefits: [
      { icon: 'wind', label: 'Demand forecasting' },
      { icon: 'leaf', label: 'Churn risk detection' },
      { icon: 'sun', label: 'Revenue projection models' },
      { icon: 'check', label: 'Weekly accuracy reports' },
    ],
  },
}

export const TealAccent: Story = {
  args: {
    index: '02',
    headline: 'Unified Data Layer',
    body: 'Connect every data source into a single, queryable platform. No more exporting CSVs or reconciling spreadsheets across departments.',
    stat: { value: '2x', unit: 'Faster decision making' },
    youtubeVideoId: YOUTUBE_ID,
    accent: '#7ACCEE',
    accentLight: '#B8E8F8',
    gradientFrom: '#071018',
    gradientTo: '#0A1E2A',
    benefits: [
      { icon: 'grid', label: 'One-click integrations' },
      { icon: 'zap', label: 'Real-time data sync' },
      { icon: 'shield', label: 'Enterprise-grade security' },
      { icon: 'arrow', label: 'API-first architecture' },
    ],
  },
}

export const Stack: Story = {
  decorators: [
    () => (
      <div className="flex flex-col gap-6 p-8" style={{ maxWidth: 1100, margin: '0 auto' }}>
        <VideoFeatureCard
          index="01"
          headline="Automated Workflow Engine"
          body="Replace manual handoffs with intelligent automation that routes work through the right team."
          stat={{ value: '30%', unit: 'Reduction in manual work' }}
          youtubeVideoId={YOUTUBE_ID}
          accent="#0064B0"
          accentLight="#8ED1FC"
          gradientFrom="#080E18"
          gradientTo="#0A1829"
          benefits={[
            { icon: 'wrench', label: 'Drag-and-drop builder' },
            { icon: 'trending', label: 'Performance tracking' },
            { icon: 'refresh', label: 'Error handling' },
            { icon: 'layers', label: 'Approval chains' },
          ]}
        />
        <VideoFeatureCard
          index="02"
          headline="Unified Data Layer"
          body="Connect every data source into a single, queryable platform with real-time sync."
          stat={{ value: '2x', unit: 'Faster decisions' }}
          youtubeVideoId={YOUTUBE_ID}
          accent="#7ACCEE"
          accentLight="#B8E8F8"
          gradientFrom="#071018"
          gradientTo="#0A1E2A"
          benefits={[
            { icon: 'grid', label: 'One-click integrations' },
            { icon: 'zap', label: 'Real-time sync' },
            { icon: 'shield', label: 'Enterprise security' },
            { icon: 'arrow', label: 'API-first' },
          ]}
        />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
}
