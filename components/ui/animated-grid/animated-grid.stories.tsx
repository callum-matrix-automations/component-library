import type { Meta, StoryObj } from '@storybook/react';
import { motion } from 'framer-motion';
import AnimatedGrid, { staggerItemVariants } from './animated-grid';

const meta = {
  title: 'UI/AnimatedGrid',
  component: AnimatedGrid,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    staggerDelay: { control: { type: 'number', min: 0, max: 1, step: 0.05 } },
    childrenDelay: { control: { type: 'number', min: 0, max: 1, step: 0.05 } },
    threshold: { control: { type: 'number', min: 0, max: 1, step: 0.1 } },
    once: { control: 'boolean' },
    className: { control: 'text' },
  },
} satisfies Meta<typeof AnimatedGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const gridItems = [
  { title: 'Strategy', description: 'Define the approach and roadmap for success.' },
  { title: 'Design', description: 'Craft intuitive and visually compelling interfaces.' },
  { title: 'Development', description: 'Build robust, scalable applications with modern tools.' },
  { title: 'Testing', description: 'Ensure quality through comprehensive testing practices.' },
  { title: 'Deployment', description: 'Ship with confidence using automated pipelines.' },
  { title: 'Support', description: 'Provide ongoing maintenance and improvements.' },
];

export const Default: Story = {
  args: {
    staggerDelay: 0.1,
    childrenDelay: 0.2,
    threshold: 0.1,
    once: true,
    className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
    children: null,
  },
  render: (args) => (
    <div style={{ minHeight: '100vh', padding: '4rem', background: '#f9fafb' }}>
      <AnimatedGrid {...args}>
        {gridItems.map((item, i) => (
          <motion.div
            key={i}
            variants={staggerItemVariants}
            className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </AnimatedGrid>
    </div>
  ),
};

export const TwoColumns: Story = {
  args: {
    ...Default.args,
    className: 'grid grid-cols-1 md:grid-cols-2 gap-8',
    staggerDelay: 0.15,
  },
  render: (args) => (
    <div style={{ minHeight: '100vh', padding: '4rem', background: '#f9fafb' }}>
      <AnimatedGrid {...args}>
        {gridItems.slice(0, 4).map((item, i) => (
          <motion.div
            key={i}
            variants={staggerItemVariants}
            className="bg-white rounded-xl p-8 shadow-md border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
            <p className="text-gray-600 leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </AnimatedGrid>
    </div>
  ),
};
