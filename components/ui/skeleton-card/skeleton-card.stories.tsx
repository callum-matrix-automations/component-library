import type { Meta, StoryObj } from '@storybook/react';
import SkeletonCard from './skeleton-card';

const meta = {
  title: 'UI/SkeletonCard',
  component: SkeletonCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    className: { control: 'text' },
  },
} satisfies Meta<typeof SkeletonCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: '',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '360px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Grid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', maxWidth: '1080px', padding: '2rem' }}>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  ),
};
