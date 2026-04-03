import type { Meta, StoryObj } from '@storybook/react'
import CaseStudyHero from './case-study-hero'

const meta: Meta<typeof CaseStudyHero> = {
  title: 'Sections/CaseStudyHero',
  component: CaseStudyHero,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    heroImage: { control: 'text' },
    projectName: { control: 'text' },
    overline: { control: 'text' },
    locationLabel: { control: 'text' },
    tagline: { control: 'text' },
    ready: { control: 'boolean' },
    accentColor: { control: 'color' },
  },
}

export default meta
type Story = StoryObj<typeof CaseStudyHero>

export const Default: Story = {
  args: {
    heroImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80',
    projectName: 'Riverside Quarter',
    overline: 'Commercial Office — Specialist Subcontractor',
    locationLabel: 'London, UK — 2024',
    tagline: 'Transforming workspaces into destinations',
    ready: true,
    accentColor: '#0064B0',
  },
}
