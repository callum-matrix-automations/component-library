import type { Meta, StoryObj } from '@storybook/react';
import BrandedIntroLoader from './branded-intro-loader';

const meta: Meta<typeof BrandedIntroLoader> = {
  title: 'UI/BrandedIntroLoader',
  component: BrandedIntroLoader,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    wordmark: { control: 'text' },
    tagline: { control: 'text' },
    cornerLabel: { control: 'text' },
    backgroundColor: { control: 'color' },
    exitDelay: { control: { type: 'number', min: 500, max: 5000, step: 100 } },
    sessionKey: { control: 'text' },
    doneEventName: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof BrandedIntroLoader>;

export const Default: Story = {
  args: {
    wordmark: 'Callum Studios',
    tagline: 'Crafting digital experiences',
    cornerLabel: 'Est. 2024',
    backgroundColor: '#0064B0',
    exitDelay: 3000,
    sessionKey: `storybook-default-${Date.now()}`,
    doneEventName: 'loaderDone',
  },
};

export const DarkBrand: Story = {
  args: {
    wordmark: 'Noir Architects',
    tagline: 'Where shadow meets structure',
    cornerLabel: 'London / New York',
    backgroundColor: '#111111',
    exitDelay: 3000,
    sessionKey: `storybook-dark-${Date.now()}`,
    doneEventName: 'loaderDone',
  },
};

export const WarmBrand: Story = {
  args: {
    wordmark: 'Terra Design Co',
    tagline: 'Grounded in good design',
    backgroundColor: '#8B4513',
    exitDelay: 3000,
    sessionKey: `storybook-warm-${Date.now()}`,
    doneEventName: 'loaderDone',
  },
};

export const MinimalNoTagline: Story = {
  args: {
    wordmark: 'MNML',
    backgroundColor: '#1a1a1a',
    exitDelay: 2500,
    sessionKey: `storybook-minimal-${Date.now()}`,
    doneEventName: 'loaderDone',
  },
};
