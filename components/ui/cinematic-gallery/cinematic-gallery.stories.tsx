import type { Meta, StoryObj } from '@storybook/react';
import CinematicGallery from './cinematic-gallery';

const meta: Meta<typeof CinematicGallery> = {
  title: 'UI/CinematicGallery',
  component: CinematicGallery,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    imageWidth: { control: { type: 'number', min: 200, max: 800 } },
    imageHeight: { control: { type: 'number', min: 200, max: 800 } },
    containerHeight: { control: { type: 'number', min: 300, max: 1000 } },
    autoScrollSpeed: { control: { type: 'number', min: 0.5, max: 5, step: 0.5 } },
  },
};

export default meta;
type Story = StoryObj<typeof CinematicGallery>;

const sampleImages = Array.from({ length: 10 }, (_, i) => ({
  id: `img-${i + 1}`,
  src: `https://picsum.photos/800/600?random=${i + 10}`,
  alt: `Gallery image ${i + 1}`,
}));

export const Default: Story = {
  args: {
    images: sampleImages,
    title: 'Featured Work',
    description: 'A curated selection of our most impactful projects spanning architecture, interiors, and landscape design.',
    imageWidth: 493,
    imageHeight: 550,
    containerHeight: 660,
    autoScrollSpeed: 1,
  },
};

export const CompactCards: Story = {
  args: {
    images: sampleImages,
    title: 'Project Gallery',
    description: 'Browse through our recent completions.',
    imageWidth: 320,
    imageHeight: 400,
    containerHeight: 500,
    autoScrollSpeed: 0.5,
  },
};

export const NoHeader: Story = {
  args: {
    images: sampleImages,
    imageWidth: 493,
    imageHeight: 550,
    containerHeight: 660,
    autoScrollSpeed: 1.5,
  },
};
