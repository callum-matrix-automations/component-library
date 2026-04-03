import type { Meta, StoryObj } from '@storybook/react';
import ParallaxHero from './parallax-hero';

const meta: Meta<typeof ParallaxHero> = {
  title: 'UI/ParallaxHero',
  component: ParallaxHero,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    overline: { control: 'text' },
    subtitle: { control: 'text' },
    scrollCueText: { control: 'text' },
    cornerLabelTop: { control: 'text' },
    cornerLabelBottom: { control: 'text' },
    accentColor: { control: 'color' },
    accentBlockColor: { control: 'color' },
    ready: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof ParallaxHero>;

const Spacer = () => (
  <div style={{ background: '#f5f5f5', padding: '4rem 2rem' }}>
    {Array.from({ length: 8 }, (_, i) => (
      <p key={i} style={{ maxWidth: '720px', margin: '0 auto 2rem', color: '#666', lineHeight: 1.8 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    ))}
  </div>
);

export const Default: Story = {
  args: {
    overline: 'Precision Builders — Solutions',
    headlineLines: [
      { text: 'Building' },
      { text: 'Tomorrow\'s', italic: true, accentColor: '#0064B0' },
      { text: 'Infrastructure' },
    ],
    subtitle: 'We deliver complex construction projects with precision engineering and unwavering commitment to quality.',
    scrollCueText: 'Scroll to explore',
    cornerLabelTop: 'Featured Project',
    cornerLabelBottom: 'Skyline Tower',
    accentColor: '#0064B0',
    ready: true,
  },
  render: (args) => (
    <>
      <ParallaxHero {...args} />
      <Spacer />
    </>
  ),
};

export const WarmAccent: Story = {
  args: {
    overline: 'Terra Design Co — Architecture',
    headlineLines: [
      { text: 'Designing' },
      { text: 'Spaces That', italic: true, accentColor: '#c2994e' },
      { text: 'Inspire' },
    ],
    subtitle: 'Award-winning residential and commercial architecture rooted in sustainability and human experience.',
    scrollCueText: 'Explore our work',
    accentColor: '#c2994e',
    accentBlockColor: '#b8860b',
    ready: true,
  },
  render: (args) => (
    <>
      <ParallaxHero {...args} />
      <Spacer />
    </>
  ),
};

export const NotReady: Story = {
  args: {
    overline: 'Delayed Entrance',
    headlineLines: [
      { text: 'Waiting For' },
      { text: 'The Signal', italic: true },
    ],
    subtitle: 'Toggle the "ready" control to true to trigger entrance animations.',
    accentColor: '#6366f1',
    ready: false,
  },
  render: (args) => (
    <>
      <ParallaxHero {...args} />
      <Spacer />
    </>
  ),
};
