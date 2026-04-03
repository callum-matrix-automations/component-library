import type { Meta, StoryObj } from '@storybook/react';
import MagneticButtonWrapper from './magnetic-button-wrapper';

const meta = {
  title: 'UI/MagneticButtonWrapper',
  component: MagneticButtonWrapper,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    strength: { control: { type: 'number', min: 0, max: 1, step: 0.05 } },
    range: { control: { type: 'number', min: 20, max: 200, step: 10 } },
    className: { control: 'text' },
    asDiv: { control: 'boolean' },
  },
} satisfies Meta<typeof MagneticButtonWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Hover near me',
    strength: 0.3,
    range: 80,
    asDiv: false,
    className: 'px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg cursor-pointer',
  },
};

export const StrongEffect: Story = {
  args: {
    children: 'Strong pull',
    strength: 0.7,
    range: 120,
    asDiv: false,
    className: 'px-8 py-3 bg-indigo-600 text-white font-bold rounded-full cursor-pointer',
  },
};

export const SubtleEffect: Story = {
  args: {
    children: 'Subtle drift',
    strength: 0.1,
    range: 60,
    asDiv: false,
    className: 'px-8 py-3 border-2 border-gray-800 text-gray-800 font-semibold rounded-lg cursor-pointer',
  },
};

export const AsDiv: Story = {
  args: {
    strength: 0.3,
    range: 80,
    asDiv: true,
    className: 'inline-block',
    children: (
      <div className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg cursor-pointer">
        Wrapped in a div
      </div>
    ),
  },
};
