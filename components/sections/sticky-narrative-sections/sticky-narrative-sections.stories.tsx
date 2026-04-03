import type { Meta, StoryObj } from '@storybook/react'
import StickyNarrativeSections from './sticky-narrative-sections'

const meta: Meta<typeof StickyNarrativeSections> = {
  title: 'Sections/StickyNarrativeSections',
  component: StickyNarrativeSections,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    sections: { control: 'object' },
    accentColor: { control: 'color' },
    sidebarLabel: { control: 'text' },
    mobileBreakpoint: { control: { type: 'number', min: 480, max: 1280 } },
  },
}

export default meta
type Story = StoryObj<typeof StickyNarrativeSections>

export const Default: Story = {
  args: {
    accentColor: '#0064B0',
    sidebarLabel: 'Project Narrative',
    mobileBreakpoint: 1024,
    sections: [
      {
        id: 'context',
        label: 'Context',
        num: '01',
        headline: 'Setting the Scene',
        body: 'Nestled on a sloping site overlooking the estuary, the original 1960s bungalow had served its owners well for decades. But changing family needs and rising energy costs meant a fresh start was overdue. The brief was clear: create a contemporary, energy-efficient home that embraces its dramatic coastal setting.',
        pullQuote: 'We wanted a home that felt like it had always belonged to this landscape.',
      },
      {
        id: 'challenge',
        label: 'Challenge',
        num: '02',
        headline: 'Navigating Complexity',
        body: 'The sloping topography presented significant engineering challenges. Access was limited to a single-track lane, and the site fell within a designated Area of Outstanding Natural Beauty, requiring sensitive design that would satisfy planning authorities while meeting the client\'s ambitions for modern living.',
        pullQuote: 'Every constraint became a creative opportunity to do something better.',
      },
      {
        id: 'solution',
        label: 'Solution',
        num: '03',
        headline: 'Design-Led Construction',
        body: 'Working closely with the architect, we developed a split-level design that steps down with the natural terrain. The upper floor houses living spaces with floor-to-ceiling glazing framing panoramic sea views, while the lower level contains bedrooms tucked into the hillside for natural insulation and privacy.',
      },
      {
        id: 'outcome',
        label: 'Outcome',
        num: '04',
        headline: 'A Home Transformed',
        body: 'Completed on time and within budget, the finished home achieved an A2 energy rating and won a regional architecture award. The clients describe it as their forever home — a space that balances openness and intimacy, connects them to the landscape, and will serve their family for generations to come.',
        pullQuote: 'It exceeded every expectation. Walking in for the first time was genuinely emotional.',
      },
    ],
  },
}
