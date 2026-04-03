import type { Meta, StoryObj } from '@storybook/react';
import MagneticButton from './magnetic-button';

const meta = {
  title: 'UI/MagneticButton',
  component: MagneticButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    className: { control: 'text' },
    type: { control: 'select', options: ['button', 'submit', 'reset'] },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof MagneticButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Get Started',
    className: 'px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors',
    disabled: false,
    type: 'button',
  },
};

export const Outlined: Story = {
  args: {
    children: 'Learn More',
    className: 'px-8 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition-colors',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Unavailable',
    className: 'px-8 py-3 bg-gray-300 text-gray-500 font-semibold rounded-lg cursor-not-allowed',
    disabled: true,
  },
};

export const Accent: Story = {
  args: {
    children: 'Contact Us',
    className: 'px-10 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-500 transition-colors text-lg',
  },
};
