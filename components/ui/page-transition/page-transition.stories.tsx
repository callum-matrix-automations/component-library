import type { Meta, StoryObj } from '@storybook/react';
import PageTransition from './page-transition';

const meta = {
  title: 'UI/PageTransition',
  component: PageTransition,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PageTransition>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ maxWidth: '600px', padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: '#111' }}>
          Page Content
        </h1>
        <p style={{ color: '#555', lineHeight: 1.7, marginBottom: '1rem' }}>
          This content is wrapped in a PageTransition component. It fades in on mount and fades out on exit using Framer Motion AnimatePresence.
        </p>
        <p style={{ color: '#555', lineHeight: 1.7 }}>
          Use this component to wrap page-level content in your router for smooth page transitions.
        </p>
      </div>
    ),
  },
};
