import type { Meta, StoryObj } from '@storybook/react';
import ImageWithLoading from './image-with-loading';

const meta: Meta<typeof ImageWithLoading> = {
  title: 'UI/ImageWithLoading',
  component: ImageWithLoading,
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    className: { control: 'text' },
    skeletonClassName: { control: 'text' },
    blurDataURL: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ImageWithLoading>;

export const Default: Story = {
  args: {
    src: 'https://picsum.photos/800/600',
    alt: 'A random landscape photograph',
    className: 'w-full h-auto rounded-lg',
  },
  render: (args) => (
    <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <ImageWithLoading {...args} />
    </div>
  ),
};

export const WithBlurPlaceholder: Story = {
  args: {
    src: 'https://picsum.photos/800/600?random=2',
    alt: 'Photo with blur placeholder',
    className: 'w-full h-auto rounded-lg',
    blurDataURL: 'https://picsum.photos/80/60?blur=10',
  },
  render: (args) => (
    <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <ImageWithLoading {...args} />
    </div>
  ),
};

export const BrokenImage: Story = {
  args: {
    src: 'https://invalid-url.example/does-not-exist.jpg',
    alt: 'This image will fail to load',
    className: 'w-full h-64',
    skeletonClassName: 'rounded-lg',
  },
  render: (args) => (
    <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <ImageWithLoading {...args} />
    </div>
  ),
};

export const SmallThumbnail: Story = {
  args: {
    src: 'https://picsum.photos/200/200',
    alt: 'A small thumbnail image',
    className: 'w-48 h-48 rounded-full object-cover',
  },
  render: (args) => (
    <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
      <ImageWithLoading {...args} />
    </div>
  ),
};
