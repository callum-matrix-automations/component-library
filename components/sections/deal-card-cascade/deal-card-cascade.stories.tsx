import type { Meta, StoryObj } from '@storybook/react'
import DealCardCascade from './deal-card-cascade'

const meta: Meta<typeof DealCardCascade> = {
  title: 'Sections/DealCardCascade',
  component: DealCardCascade,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    sections: { control: 'object' },
    sectionLabel: { control: 'text' },
    countLabel: { control: 'text' },
    accentColor: { control: 'color' },
    cta: { control: 'object' },
    mobileBreakpoint: { control: { type: 'number', min: 480, max: 1024 } },
  },
}

export default meta
type Story = StoryObj<typeof DealCardCascade>

export const Default: Story = {
  args: {
    sectionLabel: 'Our Packages',
    countLabel: '3 specification sheets',
    accentColor: '#0064B0',
    mobileBreakpoint: 768,
    sections: [
      {
        id: 'spec-1',
        refCode: 'A-01',
        headline: 'Foundation & Groundworks',
        body: 'Complete ground preparation, excavation, and foundation construction to certified structural standards.',
        benefits: [
          'Site survey and soil analysis',
          'Reinforced concrete foundations',
          'Damp-proof membrane installation',
          'Underground drainage systems',
          'Certified structural warranty',
        ],
      },
      {
        id: 'spec-2',
        refCode: 'A-02',
        headline: 'Superstructure & Envelope',
        body: 'Full structural build including walls, roof, windows, and external cladding to achieve A-rated energy performance.',
        benefits: [
          'Timber frame or block construction',
          'High-performance insulation package',
          'Triple-glazed window systems',
          'Breathable membrane roof build-up',
          'External render or brick finish',
        ],
      },
      {
        id: 'spec-3',
        refCode: 'A-03',
        headline: 'Fit-Out & Finishing',
        body: 'Interior fit-out from first fix to final snag, delivering a move-in-ready home to your exact specification.',
        benefits: [
          'Electrical and plumbing first fix',
          'Underfloor heating throughout',
          'Kitchen and bathroom installation',
          'Decorating and flooring',
          'Smart home pre-wiring',
        ],
      },
    ],
    cta: {
      overline: 'Ready to Start?',
      headline: 'Let\'s Build',
      headlineAccent: 'Together',
      description: 'Get a free consultation and detailed quote for your project.',
      buttonLabel: 'Book a Consultation',
      onButtonClick: () => alert('CTA clicked'),
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '400vh' }}>
        <Story />
      </div>
    ),
  ],
}
