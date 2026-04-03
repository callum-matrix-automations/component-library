import type { Meta, StoryObj } from '@storybook/react';
import ScrollProgress from './scroll-progress';

const meta: Meta<typeof ScrollProgress> = {
  title: 'UI/ScrollProgress',
  component: ScrollProgress,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    color: { control: 'color' },
    height: { control: { type: 'number', min: 1, max: 20 } },
    position: { control: 'radio', options: ['top', 'bottom'] },
  },
};

export default meta;
type Story = StoryObj<typeof ScrollProgress>;

const ScrollableContent = () => (
  <div style={{ padding: '2rem' }}>
    {Array.from({ length: 20 }, (_, i) => (
      <div key={i} style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Section {i + 1}</h2>
        <p style={{ color: '#666', lineHeight: 1.7 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
    ))}
  </div>
);

export const Default: Story = {
  args: {
    color: '#c2994e',
    height: 5,
    position: 'bottom',
  },
  render: (args) => (
    <>
      <ScrollProgress {...args} />
      <ScrollableContent />
    </>
  ),
};

export const TopPosition: Story = {
  args: {
    color: '#3b82f6',
    height: 4,
    position: 'top',
  },
  render: (args) => (
    <>
      <ScrollProgress {...args} />
      <ScrollableContent />
    </>
  ),
};

export const ThickBar: Story = {
  args: {
    color: '#ef4444',
    height: 10,
    position: 'bottom',
  },
  render: (args) => (
    <>
      <ScrollProgress {...args} />
      <ScrollableContent />
    </>
  ),
};
