import type { Meta, StoryObj } from '@storybook/react'
import { Timeline } from './timeline'
import React from 'react'

const meta: Meta<typeof Timeline> = {
  title: 'Patterns/Timeline',
  component: Timeline,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    data: { control: 'object' },
    activeColor: { control: 'color' },
    inactiveColor: { control: 'color' },
    lineGradient: { control: 'object' },
  },
}

export default meta
type Story = StoryObj<typeof Timeline>

export const Default: Story = {
  args: {
    activeColor: '#c2994e',
    inactiveColor: '#6b7280',
    lineGradient: ['#b45309', '#c2994e', '#6b8a6b'],
    data: [
      {
        title: '2018 — Founded',
        content: React.createElement('div', null,
          React.createElement('p', { className: 'text-gray-600 mb-2' }, 'Started as a two-person operation working on small residential renovations in the local area. Our founding principle was simple: treat every project as if it were our own home.'),
          React.createElement('p', { className: 'text-gray-500 text-sm' }, 'First year: 6 completed projects'),
        ),
      },
      {
        title: '2020 — First Major Contract',
        content: React.createElement('div', null,
          React.createElement('p', { className: 'text-gray-600 mb-2' }, 'Secured our first commercial contract — a full office renovation for a tech startup. This project proved we could deliver at scale without compromising on quality.'),
          React.createElement('p', { className: 'text-gray-500 text-sm' }, 'Team grew to 12 full-time staff'),
        ),
      },
      {
        title: '2022 — Award-Winning Year',
        content: React.createElement('div', null,
          React.createElement('p', { className: 'text-gray-600 mb-2' }, 'Won "Best Residential Build" at the regional construction awards for the Greenfield Residence project. Also achieved ISO 9001 certification for our quality management systems.'),
          React.createElement('p', { className: 'text-gray-500 text-sm' }, '3 awards, 28 completed projects that year'),
        ),
      },
      {
        title: '2024 — Expanding Horizons',
        content: React.createElement('div', null,
          React.createElement('p', { className: 'text-gray-600 mb-2' }, 'Opened our second office, launched a dedicated sustainability division, and broke ground on our largest project to date — a 40-unit residential development.'),
          React.createElement('p', { className: 'text-gray-500 text-sm' }, 'Now 45+ staff across two locations'),
        ),
      },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '200vh', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
}
