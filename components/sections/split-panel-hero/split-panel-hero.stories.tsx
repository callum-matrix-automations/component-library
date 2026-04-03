import type { Meta, StoryObj } from '@storybook/react'
import SplitPanelHero from './split-panel-hero'

const meta: Meta<typeof SplitPanelHero> = {
  title: 'Sections/SplitPanelHero',
  component: SplitPanelHero,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    overline: { control: 'text' },
    headline: { control: 'text' },
    headlineAccent: { control: 'text' },
    subtitle: { control: 'text' },
    accentColor: { control: 'color' },
    ready: { control: 'boolean' },
    showGridBackground: { control: 'boolean' },
    topLeft: { control: 'object' },
    topRight: { control: 'object' },
    bottomLeft: { control: 'object' },
    bottomRight: { control: 'object' },
  },
}

export default meta
type Story = StoryObj<typeof SplitPanelHero>

export const Default: Story = {
  args: {
    overline: 'Residential Builders',
    headline: 'Building Homes',
    headlineAccent: 'Building Futures',
    subtitle: 'We combine modern construction techniques with timeless craftsmanship to deliver homes that stand the test of time.',
    accentColor: '#0064B0',
    ready: true,
    showGridBackground: true,
    topLeft: {
      label: 'Before',
      body: 'Outdated layouts, poor insulation, rising energy bills, and spaces that no longer fit your family\'s needs.',
      badge: 'Current State',
      isHighlighted: false,
    },
    topRight: {
      label: 'After',
      body: 'Open-plan living, A-rated energy efficiency, smart home integration, and spaces designed around your lifestyle.',
      badge: 'With Us',
      isHighlighted: true,
    },
    bottomLeft: {
      label: 'Industry Average',
      value: '14',
      unit: 'months',
      barPercent: 85,
      barNote: 'Typical build time',
      isHighlighted: false,
    },
    bottomRight: {
      label: 'Our Average',
      value: '9',
      unit: 'months',
      barPercent: 55,
      barNote: '36% faster delivery',
      isHighlighted: true,
    },
  },
}
