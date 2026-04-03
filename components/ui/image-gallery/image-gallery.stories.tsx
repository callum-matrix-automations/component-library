import type { Meta, StoryObj } from '@storybook/react';
import ImageGallery from './image-gallery';

const meta: Meta<typeof ImageGallery> = {
  title: 'UI/ImageGallery',
  component: ImageGallery,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    columns: { control: 'radio', options: [2, 3] },
  },
};

export default meta;
type Story = StoryObj<typeof ImageGallery>;

const sampleImages = [
  { src: 'https://picsum.photos/800/600?random=1', alt: 'Mountain landscape at sunrise', caption: 'Dawn breaking over the Sierra Nevada' },
  { src: 'https://picsum.photos/800/600?random=2', alt: 'Ocean waves crashing on rocks', caption: 'Pacific coastline near Big Sur' },
  { src: 'https://picsum.photos/800/600?random=3', alt: 'Dense forest with morning fog', caption: 'Redwood forest, Northern California' },
  { src: 'https://picsum.photos/800/600?random=4', alt: 'Desert sand dunes at sunset', caption: 'Death Valley golden hour' },
  { src: 'https://picsum.photos/800/600?random=5', alt: 'City skyline at night', caption: 'San Francisco from Twin Peaks' },
  { src: 'https://picsum.photos/800/600?random=6', alt: 'Wildflower meadow in spring', caption: 'Antelope Valley poppy bloom' },
];

export const ThreeColumns: Story = {
  args: {
    images: sampleImages,
    columns: 3,
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <ImageGallery {...args} />
    </div>
  ),
};

export const TwoColumns: Story = {
  args: {
    images: sampleImages,
    columns: 2,
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <ImageGallery {...args} />
    </div>
  ),
};

export const NoCaptions: Story = {
  args: {
    images: sampleImages.map(({ src, alt }) => ({ src, alt })),
    columns: 3,
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <ImageGallery {...args} />
    </div>
  ),
};
