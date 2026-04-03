import type { Meta, StoryObj } from '@storybook/react';
import AnimatedHeading from './animated-heading';

const meta = {
  title: 'UI/AnimatedHeading',
  component: AnimatedHeading,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    delay: { control: { type: 'number', min: 0, max: 2, step: 0.1 } },
    threshold: { control: { type: 'number', min: 0, max: 1, step: 0.1 } },
    once: { control: 'boolean' },
    className: { control: 'text' },
  },
} satisfies Meta<typeof AnimatedHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Building the future, one component at a time',
    as: 'h2',
    delay: 0,
    threshold: 0.3,
    once: true,
    className: 'text-4xl font-bold text-gray-900',
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem' }}>
        <Story />
      </div>
    ),
  ],
};

export const Heading1: Story = {
  args: {
    children: 'Large Hero Heading',
    as: 'h1',
    className: 'text-6xl font-extrabold text-gray-900',
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithDelay: Story = {
  args: {
    children: 'This heading appears after a short delay',
    as: 'h3',
    delay: 0.5,
    className: 'text-3xl font-semibold text-indigo-700',
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem' }}>
        <Story />
      </div>
    ),
  ],
};
