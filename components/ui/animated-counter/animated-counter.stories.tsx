import type { Meta, StoryObj } from '@storybook/react';
import AnimatedCounter from './animated-counter';

const meta: Meta<typeof AnimatedCounter> = {
  title: 'UI/AnimatedCounter',
  component: AnimatedCounter,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    end: { control: 'number' },
    duration: { control: { type: 'number', min: 0.5, max: 10, step: 0.5 } },
    prefix: { control: 'text' },
    suffix: { control: 'text' },
    decimals: { control: { type: 'number', min: 0, max: 4 } },
    separator: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof AnimatedCounter>;

export const Default: Story = {
  args: {
    end: 1250,
    duration: 2.5,
    prefix: '',
    suffix: '',
    decimals: 0,
    separator: ',',
  },
  render: (args) => (
    <div style={{ minHeight: '150vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
        <p style={{ fontSize: '1.25rem', color: '#6b7280' }}>Scroll down to trigger the counter</p>
      </div>
      <div style={{ padding: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '4rem', fontWeight: 700 }}>
          <AnimatedCounter {...args} />
        </div>
      </div>
    </div>
  ),
};

export const Currency: Story = {
  args: {
    end: 49999.99,
    duration: 3,
    prefix: '$',
    suffix: '',
    decimals: 2,
    separator: ',',
  },
  render: (args) => (
    <div style={{ minHeight: '150vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
        <p style={{ fontSize: '1.25rem', color: '#6b7280' }}>Scroll down to trigger the counter</p>
      </div>
      <div style={{ padding: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '3rem', fontWeight: 700 }}>
          <AnimatedCounter {...args} />
        </div>
      </div>
    </div>
  ),
};

export const Percentage: Story = {
  args: {
    end: 97.5,
    duration: 2,
    prefix: '',
    suffix: '%',
    decimals: 1,
    separator: ',',
  },
  render: (args) => (
    <div style={{ minHeight: '150vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
        <p style={{ fontSize: '1.25rem', color: '#6b7280' }}>Scroll down to trigger the counter</p>
      </div>
      <div style={{ padding: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '4rem', fontWeight: 700 }}>
          <AnimatedCounter {...args} />
        </div>
      </div>
    </div>
  ),
};
