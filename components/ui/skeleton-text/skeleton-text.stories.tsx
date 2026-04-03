import type { Meta, StoryObj } from '@storybook/react';
import SkeletonText from './skeleton-text';

const meta = {
  title: 'UI/SkeletonText',
  component: SkeletonText,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    lines: { control: { type: 'number', min: 1, max: 10, step: 1 } },
    className: { control: 'text' },
  },
} satisfies Meta<typeof SkeletonText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThreeLines: Story = {
  args: {
    lines: 3,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const FiveLines: Story = {
  args: {
    lines: 5,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const SingleLine: Story = {
  args: {
    lines: 1,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};
