import type { Meta, StoryObj } from '@storybook/react'
import { TestimonialCard, TestimonialCarousel, VideoTestimonialCard } from './testimonial-card'

const sampleTestimonials = [
  {
    headline: 'The onboarding experience was seamless from day one.',
    body: "We were up and running within a week. The team walked us through every step, configured our workspace, and made sure everyone on the team knew exactly how to use the platform.\n\nThe level of support during those first few weeks was exceptional — every question answered within hours, not days.",
    name: 'Rachel Adams',
    role: 'Head of Operations',
    company: 'Meridian Logistics',
  },
  {
    headline: 'Our reporting went from a two-day process to a two-minute one.',
    body: "Before, pulling monthly reports meant exporting data from three different tools and manually reconciling everything in a spreadsheet.\n\nNow everything lives in one place. The dashboards update in real time and the automated reports land in our inbox every Monday morning. It has genuinely changed how we make decisions.",
    name: 'David Okafor',
    role: 'Finance Director',
    company: 'Northpoint Capital',
  },
  {
    headline: 'We finally have visibility across every department.',
    body: "The biggest win was breaking down silos. Sales, marketing, and customer success were all operating with different numbers.\n\nNow there is a single source of truth. Alignment meetings that used to take an hour are done in fifteen minutes because everyone is looking at the same data.",
    name: 'Elena Marchetti',
    role: 'VP of Strategy',
    company: 'Apex Ventures',
  },
  {
    headline: 'The ROI was clear within the first quarter.',
    body: "We tracked a 40% reduction in manual data entry and a measurable improvement in lead response time. Those are real hours given back to the team every week.\n\nThe platform paid for itself before the trial period was even over.",
    name: 'Marcus Webb',
    role: 'CEO',
    company: 'Brightpath Solutions',
  },
]

const cardMeta: Meta<typeof TestimonialCard> = {
  title: 'Patterns/TestimonialCard',
  component: TestimonialCard,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#0F172A' }] },
  },
  argTypes: {
    accentColor: { control: 'color' },
    backgroundColor: { control: 'color' },
  },
}

export default cardMeta
type Story = StoryObj<typeof TestimonialCard>

export const Default: Story = {
  args: {
    testimonial: sampleTestimonials[0],
    index: 0,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 480, padding: 32 }}>
        <Story />
      </div>
    ),
  ],
}

export const Carousel: Story = {
  decorators: [
    () => (
      <div className="p-8" style={{ background: '#0F172A' }}>
        <TestimonialCarousel testimonials={sampleTestimonials} />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
}

export const Video: Story = {
  decorators: [
    () => (
      <div style={{ maxWidth: 320, padding: 32 }}>
        <VideoTestimonialCard
          youtubeVideoId="u31qwQUeGuM"
          name="Rachel Adams"
          company="Meridian Logistics"
        />
      </div>
    ),
  ],
  parameters: {
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#0F172A' }] },
  },
}
