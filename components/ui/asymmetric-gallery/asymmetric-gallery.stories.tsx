import type { Meta, StoryObj } from '@storybook/react';
import AsymmetricGallery from './asymmetric-gallery';

const meta: Meta<typeof AsymmetricGallery> = {
  title: 'UI/AsymmetricGallery',
  component: AsymmetricGallery,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    sectionLabel: { control: 'text' },
    accentColor: { control: 'color' },
    backgroundColor: { control: 'color' },
    rowHeight: { control: { type: 'number', min: 150, max: 500 } },
    mobileBreakpoint: { control: { type: 'number', min: 480, max: 1024 } },
  },
};

export default meta;
type Story = StoryObj<typeof AsymmetricGallery>;

export const Default: Story = {
  args: {
    images: [
      { url: 'https://picsum.photos/900/1200?random=50', caption: 'Main entrance — east elevation at golden hour' },
      { url: 'https://picsum.photos/800/600?random=51', caption: 'Interior atrium with natural skylighting' },
      { url: 'https://picsum.photos/800/600?random=52', caption: 'Landscaped courtyard — phase 2 completion' },
    ],
    sectionLabel: 'Project Gallery',
    accentColor: '#0064B0',
    backgroundColor: '#EDF0F6',
    rowHeight: 280,
  },
};

export const WarmTones: Story = {
  args: {
    images: [
      { url: 'https://picsum.photos/900/1200?random=53', caption: 'Reclaimed timber facade detail' },
      { url: 'https://picsum.photos/800/600?random=54', caption: 'Open-plan living area' },
      { url: 'https://picsum.photos/800/600?random=55' },
    ],
    sectionLabel: 'Residential Collection',
    accentColor: '#c2994e',
    backgroundColor: '#FAF5EE',
    rowHeight: 300,
  },
};

export const TallRows: Story = {
  args: {
    images: [
      { url: 'https://picsum.photos/900/1200?random=56' },
      { url: 'https://picsum.photos/800/600?random=57', caption: 'Aerial view — completed structure' },
      { url: 'https://picsum.photos/800/600?random=58', caption: 'Steel framework during construction' },
    ],
    sectionLabel: 'Construction Progress',
    accentColor: '#059669',
    backgroundColor: '#F0FDF4',
    rowHeight: 400,
  },
};
