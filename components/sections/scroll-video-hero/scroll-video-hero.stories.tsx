import type { Meta, StoryObj } from '@storybook/react'
import ScrollVideoHero from './scroll-video-hero'

const meta: Meta<typeof ScrollVideoHero> = {
  title: 'Sections/ScrollVideoHero',
  component: ScrollVideoHero,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <>
        <Story />
        <section className="bg-gray-50 px-6 py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900">Page Content</h2>
            <p className="text-lg leading-relaxed text-gray-600">
              The scroll-driven video hero above uses two videos that play back-to-back as you scroll.
              Three phases unfold: the intro headline, interior stats with animated counters,
              and the explore section with testimonials rising into view.
            </p>
          </div>
        </section>
      </>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ScrollVideoHero>

export const Default: Story = {}
