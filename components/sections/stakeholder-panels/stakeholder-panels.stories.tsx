import type { Meta, StoryObj } from '@storybook/react'
import StakeholderPanels from './stakeholder-panels'
import { TbRulerMeasure, TbCrane, TbBuildingSkyscraper } from 'react-icons/tb'

const meta: Meta<typeof StakeholderPanels> = {
  title: 'Sections/StakeholderPanels',
  component: StakeholderPanels,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    subtitle: { control: 'text' },
    heading: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof StakeholderPanels>

export const Default: Story = {}

export const CustomContent: Story = {
  args: {
    subtitle: 'Choose Your Journey',
    heading: 'Three Paths, One Platform',
    panels: [
      {
        id: 'explore',
        label: 'Explore',
        headline: 'Discover Possibilities',
        description: 'Browse our full catalog of solutions and find the perfect fit for your project requirements.',
        cta: 'Start Exploring',
        href: '#explore',
        accent: '#8B5CF6',
        icon: TbRulerMeasure,
        gradient: 'linear-gradient(135deg, #2D1B69 0%, #5B21B6 60%, #7C3AED 100%)',
      },
      {
        id: 'create',
        label: 'Create',
        headline: 'Build Something New',
        description: 'Use our tools and frameworks to rapidly prototype and deploy your next project.',
        cta: 'Start Building',
        href: '#create',
        accent: '#F59E0B',
        icon: TbCrane,
        gradient: 'linear-gradient(135deg, #451A03 0%, #92400E 60%, #B45309 100%)',
      },
      {
        id: 'scale',
        label: 'Scale',
        headline: 'Grow Without Limits',
        description: 'Enterprise-grade infrastructure that scales with your business needs.',
        cta: 'See Plans',
        href: '#scale',
        accent: '#10B981',
        icon: TbBuildingSkyscraper,
        gradient: 'linear-gradient(135deg, #022C22 0%, #065F46 60%, #047857 100%)',
      },
    ],
  },
}
