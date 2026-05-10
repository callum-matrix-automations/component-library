import type { Meta, StoryObj } from '@storybook/react'
import VideoHero from './video-hero'

const meta: Meta<typeof VideoHero> = {
  title: 'Sections/VideoHero',
  component: VideoHero,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    youtubeVideoId: { control: 'text' },
    headline: { control: 'text' },
    headlineAccent: { control: 'text' },
    subtitle: { control: 'text' },
    overline: { control: 'text' },
    ctaLabel: { control: 'text' },
    accentColor: { control: 'color' },
    cutoffSeconds: { control: 'number' },
    revealedHeadline: { control: 'text' },
    revealedHeadlineAccent: { control: 'text' },
    revealedSubtitle: { control: 'text' },
    revealedCtaLabel: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <>
        <Story />
        {/* Content below the hero so you can scroll and see the parallax effect */}
        <section className="bg-white px-6 py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900">Next Section</h2>
            <p className="text-lg leading-relaxed text-gray-600">
              Scroll up to see the video hero parallax effect. As you scroll down, the video shrinks and
              reveals the content behind it. This section exists to give you enough scroll distance to
              see the full effect in action.
            </p>
          </div>
        </section>
        <section className="bg-gray-100 px-6 py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900">More Content</h2>
            <p className="text-lg leading-relaxed text-gray-600">
              This additional section demonstrates that the page continues naturally after the hero.
              The sticky parallax effect is contained within the hero's 200vh height.
            </p>
          </div>
        </section>
      </>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof VideoHero>

export const Default: Story = {
  args: {
    youtubeVideoId: 'u31qwQUeGuM',
    headline: 'Build Better.',
    headlineAccent: 'Stay SAFE.',
    subtitle:
      'High-performance building systems that install fast, perform exceptionally, and fit seamlessly into traditional construction.',
    overline: 'Video Hero Section',
    ctaLabel: 'Get Started',
    accentColor: '#0097A7',
    revealedHeadline: 'Build Better.',
    revealedHeadlineAccent: 'Stay SAFE.',
    revealedSubtitle:
      'High-performance building systems that install fast, perform exceptionally, and fit seamlessly into traditional construction.',
    revealedCtaLabel: 'Get Started',
  },
}

export const WithCutoff: Story = {
  args: {
    youtubeVideoId: 'u31qwQUeGuM',
    headline: 'Watch Our Story.',
    headlineAccent: 'Then Act.',
    subtitle: 'A short introduction to what we do and why it matters.',
    overline: 'Our Story',
    ctaLabel: 'Contact Us',
    accentColor: '#7C3AED',
    cutoffSeconds: 15,
    revealedHeadline: 'Inspired?',
    revealedHeadlineAccent: 'Let\'s Talk.',
    revealedSubtitle: 'We\'d love to hear about your project and how we can help bring it to life.',
    revealedCtaLabel: 'Contact Us',
  },
}

export const CustomBranding: Story = {
  args: {
    youtubeVideoId: 'u31qwQUeGuM',
    headline: 'Dream Big.',
    headlineAccent: 'Build Bigger.',
    subtitle: 'From concept to completion, we bring ambitious visions to life with precision engineering.',
    overline: 'Premium Homes',
    ctaLabel: 'Explore Projects',
    accentColor: '#F59E0B',
    revealedHeadline: 'Ready to Start?',
    revealedHeadlineAccent: 'We Are.',
    revealedSubtitle: 'Our team is ready to turn your vision into reality. Let\'s discuss your next project.',
    revealedCtaLabel: 'Explore Projects',
  },
}
