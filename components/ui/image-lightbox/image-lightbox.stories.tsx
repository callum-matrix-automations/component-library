import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ImageLightbox from './image-lightbox';

const meta: Meta<typeof ImageLightbox> = {
  title: 'UI/ImageLightbox',
  component: ImageLightbox,
  argTypes: {
    initialIndex: { control: { type: 'number', min: 0 } },
    isOpen: { control: 'boolean' },
    alt: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ImageLightbox>;

const sampleImages = [
  'https://picsum.photos/1200/800?random=20',
  'https://picsum.photos/1200/800?random=21',
  'https://picsum.photos/1200/800?random=22',
  'https://picsum.photos/1200/800?random=23',
  'https://picsum.photos/1200/800?random=24',
];

export const Default: Story = {
  args: {
    images: sampleImages,
    initialIndex: 0,
    isOpen: true,
    alt: 'Gallery image',
  },
  render: function Render(args) {
    const [isOpen, setIsOpen] = useState(args.isOpen);

    return (
      <div style={{ padding: '2rem' }}>
        <button
          onClick={() => setIsOpen(true)}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#111827',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
          }}
        >
          Open Lightbox
        </button>

        <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem' }}>
          {sampleImages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Thumbnail ${i + 1}`}
              style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '0.25rem', cursor: 'pointer' }}
              onClick={() => setIsOpen(true)}
            />
          ))}
        </div>

        <ImageLightbox
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    );
  },
};

export const SingleImage: Story = {
  args: {
    images: ['https://picsum.photos/1200/800?random=30'],
    initialIndex: 0,
    isOpen: true,
    alt: 'Single photo',
  },
  render: function Render(args) {
    const [isOpen, setIsOpen] = useState(args.isOpen);

    return (
      <div style={{ padding: '2rem' }}>
        <button
          onClick={() => setIsOpen(true)}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#111827',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
          }}
        >
          Open Single Image
        </button>

        <ImageLightbox
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    );
  },
};
