import type { Meta, StoryObj } from '@storybook/react';
import MetricStatCards from './metric-stat-cards';

const meta: Meta<typeof MetricStatCards> = {
  title: 'UI/MetricStatCards',
  component: MetricStatCards,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    columns: { control: { type: 'number', min: 2, max: 6 } },
    accentColor: { control: 'color' },
    cardBackground: { control: 'color' },
    cardBorder: { control: 'color' },
    gapClass: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof MetricStatCards>;

export const Default: Story = {
  args: {
    metrics: [
      { value: '7', label: 'Weeks Saved', sublabel: 'vs. original programme' },
      { value: '40%', label: 'Cost Reduction', sublabel: 'through value engineering' },
      { value: '98%', label: 'Client Satisfaction', sublabel: 'post-project surveys' },
      { value: '£2.4M', label: 'Budget Recovered', sublabel: 'via change management' },
    ],
    columns: 4,
    accentColor: '#0064B0',
    cardBackground: '#FFFFFF',
    cardBorder: '#DFE3EA',
    gapClass: 'gap-4',
  },
  render: (args) => (
    <div style={{ padding: '3rem', background: '#F3F4F6' }}>
      <MetricStatCards {...args} />
    </div>
  ),
};

export const ThreeColumns: Story = {
  args: {
    metrics: [
      { value: '150+', label: 'Projects Delivered' },
      { value: '12', label: 'Countries' },
      { value: '25yr', label: 'Experience' },
    ],
    columns: 3,
    accentColor: '#059669',
    cardBackground: '#FFFFFF',
    cardBorder: '#D1FAE5',
    gapClass: 'gap-6',
  },
  render: (args) => (
    <div style={{ padding: '3rem', background: '#ECFDF5' }}>
      <MetricStatCards {...args} />
    </div>
  ),
};

export const DarkCards: Story = {
  args: {
    metrics: [
      { value: '99.9%', label: 'Uptime', sublabel: 'SLA guaranteed' },
      { value: '<1s', label: 'Response Time', sublabel: 'p95 latency' },
      { value: '10M+', label: 'Requests/day', sublabel: 'peak throughput' },
      { value: '24/7', label: 'Support', sublabel: 'dedicated team' },
    ],
    columns: 4,
    accentColor: '#8B5CF6',
    cardBackground: '#1F2937',
    cardBorder: '#374151',
    gapClass: 'gap-4',
  },
  render: (args) => (
    <div style={{ padding: '3rem', background: '#111827' }}>
      <MetricStatCards {...args} />
    </div>
  ),
};

export const TwoColumnWide: Story = {
  args: {
    metrics: [
      { value: '£8.7M', label: 'Annual Revenue', sublabel: 'FY 2025' },
      { value: '340%', label: 'Growth Rate', sublabel: 'year over year' },
    ],
    columns: 2,
    accentColor: '#c2994e',
    cardBackground: '#FFFBEB',
    cardBorder: '#FDE68A',
    gapClass: 'gap-6',
  },
  render: (args) => (
    <div style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto', background: '#FEF3C7' }}>
      <MetricStatCards {...args} />
    </div>
  ),
};
