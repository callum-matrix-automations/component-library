import type { Meta, StoryObj } from '@storybook/react';
import TabbedInterface from './tabbed-interface';

const meta = {
  title: 'UI/TabbedInterface',
  component: TabbedInterface,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    defaultTab: { control: 'text' },
    activeColor: { control: 'color' },
    inactiveColor: { control: 'color' },
    indicatorColor: { control: 'color' },
    borderColor: { control: 'color' },
  },
} satisfies Meta<typeof TabbedInterface>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleTabs = [
  {
    id: 'overview',
    label: 'Overview',
    content: (
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">Project Overview</h3>
        <p className="text-gray-600 leading-relaxed mb-4">
          This project is a modern web application built with React, TypeScript, and Tailwind CSS. It features a component-driven architecture with a focus on reusability and performance.
        </p>
        <p className="text-gray-600 leading-relaxed">
          The design system includes a comprehensive set of UI primitives, layout components, and composite patterns that can be composed to build complex interfaces.
        </p>
      </div>
    ),
  },
  {
    id: 'features',
    label: 'Features',
    content: (
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">Key Features</h3>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-start gap-2"><span className="text-green-500 font-bold">-</span> Fully responsive design system</li>
          <li className="flex items-start gap-2"><span className="text-green-500 font-bold">-</span> Smooth animations with Framer Motion</li>
          <li className="flex items-start gap-2"><span className="text-green-500 font-bold">-</span> Accessible components following WAI-ARIA</li>
          <li className="flex items-start gap-2"><span className="text-green-500 font-bold">-</span> Dark mode support out of the box</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'specs',
    label: 'Specifications',
    content: (
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">Technical Specifications</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-50 rounded-lg p-4">
            <span className="font-semibold text-gray-700">Framework</span>
            <p className="text-gray-500 mt-1">Next.js 14</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <span className="font-semibold text-gray-700">Language</span>
            <p className="text-gray-500 mt-1">TypeScript 5.3</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <span className="font-semibold text-gray-700">Styling</span>
            <p className="text-gray-500 mt-1">Tailwind CSS 3.4</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <span className="font-semibold text-gray-700">Animation</span>
            <p className="text-gray-500 mt-1">Framer Motion 11</p>
          </div>
        </div>
      </div>
    ),
  },
];

export const Default: Story = {
  args: {
    tabs: sampleTabs,
    defaultTab: 'overview',
    indicatorColor: '#c2994e',
    inactiveColor: '#9ca3af',
    borderColor: '#e5e7eb',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
};

export const CustomColors: Story = {
  args: {
    tabs: sampleTabs,
    defaultTab: 'features',
    activeColor: '#4f46e5',
    inactiveColor: '#a5b4fc',
    indicatorColor: '#4f46e5',
    borderColor: '#e0e7ff',
  },
  decorators: Default.decorators,
};
