import type { Meta, StoryObj } from '@storybook/react';
import FeatureBadge from './feature-badge';

const meta = {
  title: 'UI/FeatureBadge',
  component: FeatureBadge,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    text: { control: 'text' },
    variant: { control: 'select', options: ['default', 'popular', 'new'] },
  },
} satisfies Meta<typeof FeatureBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Standard',
    variant: 'default',
  },
};

export const Popular: Story = {
  args: {
    text: 'Most Popular',
    variant: 'popular',
  },
};

export const New: Story = {
  args: {
    text: 'New Feature',
    variant: 'new',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <FeatureBadge text="Standard" variant="default" />
      <FeatureBadge text="Most Popular" variant="popular" />
      <FeatureBadge text="New Feature" variant="new" />
    </div>
  ),
};
