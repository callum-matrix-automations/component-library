import type { Meta, StoryObj } from '@storybook/react'
import CaseStudySection from './case-study-modal'

const meta: Meta<typeof CaseStudySection> = {
  title: 'Sections/CaseStudySection',
  component: CaseStudySection,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    studies: { control: 'object' },
    label: { control: 'text' },
    heading: { control: 'text' },
    headingAccent: { control: 'text' },
    subheading: { control: 'text' },
    accentColor: { control: 'color' },
    backgroundColor: { control: 'color' },
    surfaceColor: { control: 'color' },
  },
}

export default meta
type Story = StoryObj<typeof CaseStudySection>

export const Default: Story = {
  args: {
    label: 'Real Projects',
    heading: 'Our Work in',
    headingAccent: 'Action',
    subheading: 'See how we deliver results through real-world projects.',
    accentColor: '#c2994e',
    backgroundColor: '#0a0a0a',
    surfaceColor: '#141414',
    studies: [
      {
        slug: 'riverside-quarter',
        title: 'Riverside Quarter',
        location: 'London, UK',
        duration: 'March 2023 — November 2023',
        subtitle: 'Full interior fit-out of a 12,000 sq ft commercial office',
        heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
        sections: [
          {
            title: 'The Challenge',
            image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
            text: 'The client needed a modern, collaborative workspace that could accommodate 150 staff across three floors while maintaining a cohesive brand identity throughout.',
          },
          {
            title: 'Our Approach',
            image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&q=80',
            items: [
              'Conducted staff surveys to understand workflow needs',
              'Designed flexible zones for focus, collaboration, and social interaction',
              'Sourced sustainable materials with low embodied carbon',
              'Managed all trades on an accelerated 8-month programme',
            ],
            bulletIcon: 'check',
          },
        ],
        testimonial: {
          name: 'Sarah Mitchell',
          role: 'Facilities Director',
          image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
          quote: 'The team delivered beyond our expectations. The space has transformed how our people work and collaborate.',
        },
        gallery: [
          'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
          'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=600&q=80',
        ],
      },
      {
        slug: 'greenfield-residence',
        title: 'Greenfield Residence',
        location: 'Bath, UK',
        duration: 'June 2023 — February 2024',
        heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
        sections: [
          {
            title: 'Project Overview',
            image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
            text: 'A bespoke new-build family home designed to Passivhaus standards, set in the Cotswolds countryside with panoramic views.',
          },
          {
            title: 'Key Features',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
            items: [
              'Triple-glazed timber windows throughout',
              'Air source heat pump with underfloor heating',
              'Green roof and rainwater harvesting system',
              'Locally quarried stone exterior cladding',
            ],
            bulletIcon: 'check',
          },
        ],
      },
    ],
  },
}
