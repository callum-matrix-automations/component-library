import type { Meta, StoryObj } from '@storybook/react'
import ProcessSection from './process-section'

const meta: Meta<typeof ProcessSection> = {
  title: 'Sections/ProcessSection',
  component: ProcessSection,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    label: { control: 'text' },
    heading: { control: 'text' },
    headingAccent: { control: 'text' },
    subheading: { control: 'text' },
    steps: { control: 'object' },
    accentColor: { control: 'color' },
    mainNavHeight: { control: 'text' },
    stickyTabsClassNames: { control: 'object' },
  },
}

export default meta
type Story = StoryObj<typeof ProcessSection>

export const Default: Story = {
  args: {
    label: 'How It Works',
    heading: 'Our Proven',
    headingAccent: 'Process',
    subheading: 'From initial consultation to final handover, every step is designed for transparency and quality.',
    accentColor: '#c2994e',
    mainNavHeight: '4rem',
    steps: [
      {
        number: '01',
        title: 'Discovery & Consultation',
        description: 'We begin by understanding your vision, goals, and constraints through an in-depth consultation.',
        details: [
          { text: 'Site assessment and feasibility study' },
          { text: 'Budget planning and timeline estimation' },
          { text: 'Regulatory requirements review' },
        ],
      },
      {
        number: '02',
        title: 'Design & Planning',
        description: 'Our team develops detailed plans and 3D visualizations so you can see the result before construction begins.',
        details: [
          { text: 'Architectural drawings and specifications' },
          { text: '3D renderings and virtual walkthroughs' },
          { text: 'Material selection and sourcing' },
        ],
      },
      {
        number: '03',
        title: 'Construction & Build',
        description: 'With plans approved, our experienced crew brings the design to life with precision craftsmanship.',
        details: [
          { text: 'Weekly progress reports with photos' },
          { text: 'Dedicated site manager on every project' },
          { text: 'Quality inspections at each milestone' },
        ],
      },
      {
        number: '04',
        title: 'Handover & Aftercare',
        description: 'We deliver a finished space that exceeds expectations, backed by our comprehensive aftercare program.',
        details: [
          { text: 'Final walkthrough and snagging list' },
          { text: '12-month defects liability period' },
          { text: 'Dedicated aftercare support line' },
        ],
      },
    ],
  },
}
