import type { Meta, StoryObj } from '@storybook/react';
import AnimatedSection from './animated-section';

const meta = {
  title: 'UI/AnimatedSection',
  component: AnimatedSection,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['up', 'down', 'left', 'right', 'scale'],
    },
    delay: { control: { type: 'number', min: 0, max: 2, step: 0.1 } },
    threshold: { control: { type: 'number', min: 0, max: 1, step: 0.1 } },
    once: { control: 'boolean' },
    className: { control: 'text' },
  },
} satisfies Meta<typeof AnimatedSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleCard = () => (
  <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', maxWidth: '480px' }}>
    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem', color: '#111' }}>Animated Card</h3>
    <p style={{ color: '#555', lineHeight: 1.6 }}>
      This card is wrapped in an AnimatedSection component. It fades and slides into view when it enters the viewport.
    </p>
  </div>
);

export const Default: Story = {
  args: {
    direction: 'up',
    delay: 0,
    threshold: 0.2,
    once: true,
    children: <SampleCard />,
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem', background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
};

export const FromLeft: Story = {
  args: {
    direction: 'left',
    children: <SampleCard />,
  },
  decorators: Default.decorators,
};

export const FromRight: Story = {
  args: {
    direction: 'right',
    children: <SampleCard />,
  },
  decorators: Default.decorators,
};

export const ScaleIn: Story = {
  args: {
    direction: 'scale',
    children: <SampleCard />,
  },
  decorators: Default.decorators,
};

export const AllDirections: Story = {
  args: {
    direction: 'up',
    children: <SampleCard />,
  },
  render: () => (
    <div style={{ minHeight: '200vh', padding: '4rem', background: '#f5f5f5', display: 'flex', flexDirection: 'column', gap: '4rem', alignItems: 'center' }}>
      {(['up', 'down', 'left', 'right', 'scale'] as const).map((dir) => (
        <AnimatedSection key={dir} direction={dir}>
          <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', maxWidth: '480px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: '#111' }}>
              Direction: {dir}
            </h3>
            <p style={{ color: '#555' }}>This section animates from the {dir} direction.</p>
          </div>
        </AnimatedSection>
      ))}
    </div>
  ),
};
