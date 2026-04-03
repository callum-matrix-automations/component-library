import type { Meta, StoryObj } from '@storybook/react';
import StakeholderCardRows from './stakeholder-card-rows';
import type { StakeholderCard } from './stakeholder-card-rows';

const meta: Meta<typeof StakeholderCardRows> = {
  title: 'UI/StakeholderCardRows',
  component: StakeholderCardRows,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    overline: { control: 'text' },
    heading: { control: 'text' },
    aside: { control: 'text' },
    accentColor: { control: 'color' },
    accentHoverColor: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof StakeholderCardRows>;

const sampleCards: StakeholderCard[] = [
  {
    id: 'owners',
    label: '01',
    title: 'Owners',
    headline: 'Protect your investment',
    description: 'Real-time visibility into project health, risk mitigation strategies, and proactive reporting that keeps your development on track and on budget.',
    href: '#owners',
    stat: { value: '40%', label: 'Faster delivery' },
  },
  {
    id: 'contractors',
    label: '02',
    title: 'Contractors',
    headline: 'Streamline your operations',
    description: 'Integrated scheduling, resource allocation, and subcontractor management tools designed to reduce waste and improve margins on every project.',
    href: '#contractors',
    stat: { value: '£2.4M', label: 'Avg. savings' },
  },
  {
    id: 'consultants',
    label: '03',
    title: 'Consultants',
    headline: 'Elevate your practice',
    description: 'Collaborative design coordination, automated compliance checking, and seamless handover workflows that let you focus on what you do best.',
    href: '#consultants',
    stat: { value: '98%', label: 'Client satisfaction' },
  },
];

export const Default: Story = {
  args: {
    cards: sampleCards,
    overline: 'Choose Your Path',
    heading: 'Solutions by project role',
    aside: 'Tailored experiences for every stakeholder in the built environment.',
    accentColor: '#0064B0',
    accentHoverColor: '#7ACCEE',
  },
};

export const WarmTheme: Story = {
  args: {
    cards: sampleCards,
    overline: 'Our Services',
    heading: 'Built for your team',
    accentColor: '#c2994e',
    accentHoverColor: '#e8c87a',
  },
};

export const TwoCards: Story = {
  args: {
    cards: sampleCards.slice(0, 2),
    overline: 'Dual Focus',
    heading: 'Two sides of the story',
    accentColor: '#059669',
    accentHoverColor: '#6ee7b7',
  },
};
