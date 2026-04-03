import type { Meta, StoryObj } from '@storybook/react'
import HorizontalCardScroll from './horizontal-card-scroll'
import type { CardData } from './horizontal-card-scroll'

const meta: Meta<typeof HorizontalCardScroll> = {
  title: 'Sections/HorizontalCardScroll',
  component: HorizontalCardScroll,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    cards: { control: 'object' },
    sectionLabel: { control: 'text' },
    cardWidth: { control: { type: 'number', min: 30, max: 80 } },
    cardGap: { control: { type: 'number', min: 0, max: 10 } },
    cardHeight: { control: { type: 'number', min: 40, max: 90 } },
    mobileBreakpoint: { control: { type: 'number', min: 480, max: 1024 } },
  },
}

export default meta
type Story = StoryObj<typeof HorizontalCardScroll>

const sampleCards: CardData[] = [
  {
    id: 'card-1',
    index: '01',
    headline: 'Structural Engineering',
    body: 'Advanced structural analysis and design for residential and commercial projects, ensuring safety and longevity.',
    stat: { value: '500+', unit: 'projects' },
    accent: '#0064B0',
    accentLight: '#3d8fd4',
    gradientFrom: '#0a1628',
    gradientTo: '#0f2440',
    benefits: [
      { icon: '🏗️', label: 'Load-bearing analysis' },
      { icon: '📐', label: 'CAD modelling' },
      { icon: '🔬', label: 'Material testing' },
      { icon: '✅', label: 'Code compliance' },
    ],
  },
  {
    id: 'card-2',
    index: '02',
    headline: 'Interior Design',
    body: 'Bespoke interior solutions that blend aesthetics with functionality, tailored to your lifestyle and brand.',
    stat: { value: '98%', unit: 'satisfaction' },
    accent: '#c2994e',
    accentLight: '#d4b478',
    gradientFrom: '#1a1408',
    gradientTo: '#2a2010',
    benefits: [
      { icon: '🎨', label: 'Custom palettes' },
      { icon: '🪑', label: 'Furniture sourcing' },
      { icon: '💡', label: 'Lighting design' },
      { icon: '🏠', label: 'Space planning' },
    ],
  },
  {
    id: 'card-3',
    index: '03',
    headline: 'Project Management',
    body: 'End-to-end project oversight from planning through handover, keeping timelines and budgets on track.',
    stat: { value: '12', unit: 'years avg.' },
    accent: '#2d8a4e',
    accentLight: '#5aad76',
    gradientFrom: '#081a0e',
    gradientTo: '#0f2a18',
    benefits: [
      { icon: '📊', label: 'Progress tracking' },
      { icon: '💰', label: 'Cost control' },
      { icon: '🤝', label: 'Stakeholder comms' },
      { icon: '📅', label: 'Schedule mgmt' },
    ],
  },
]

export const Default: Story = {
  args: {
    cards: sampleCards,
    sectionLabel: 'What We Do',
    cardWidth: 50,
    cardGap: 2,
    cardHeight: 68,
    mobileBreakpoint: 768,
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '400vh' }}>
        <Story />
      </div>
    ),
  ],
}
