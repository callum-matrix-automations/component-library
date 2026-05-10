import type { Meta, StoryObj } from '@storybook/react'
import CatalogCard from './catalog-card'
import type { CatalogItem } from './catalog-card'

const sampleItems: CatalogItem[] = [
  {
    id: '1',
    name: 'The Oakwood 2400',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    ],
    description:
      'A spacious single-story home with an open-concept living area, chef-style kitchen with island, and a covered outdoor entertaining space. Perfect for families who value indoor-outdoor living.',
    category: 'Single Story',
    specs: {
      Bedrooms: '4',
      Bathrooms: '2.5',
      'Square Feet': '2,400',
      Price: '$285,000',
      Manufacturer: 'Oakwood Homes',
    },
    features: ['Open Floor Plan', 'Kitchen Island', 'Walk-in Pantry', 'Covered Patio', 'Energy Star Rated', 'Smart Home Wiring'],
  },
  {
    id: '2',
    name: 'The Maple 1800',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
    ],
    description:
      'A compact yet functional design ideal for first-time buyers. Features a well-appointed kitchen, spacious master suite, and dedicated home office nook.',
    category: 'Compact',
    specs: {
      Bedrooms: '3',
      Bathrooms: '2',
      'Square Feet': '1,800',
      Price: '$215,000',
      Manufacturer: 'Maple Living',
    },
    features: ['Open Floor Plan', 'Home Office Nook', 'Walk-in Closet', 'Energy Star Rated'],
  },
  {
    id: '3',
    name: 'The Cedar 3200',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7c5a38?w=800&h=600&fit=crop',
    ],
    description:
      'Our flagship two-story design with premium finishes throughout. Features a grand foyer, dual living areas, gourmet kitchen, and a luxurious master retreat on the upper level.',
    category: 'Two Story',
    specs: {
      Bedrooms: '5',
      Bathrooms: '3.5',
      'Square Feet': '3,200',
      Price: '$395,000',
      Manufacturer: 'Cedar Homes',
    },
    features: ['Open Floor Plan', 'Kitchen Island', 'Walk-in Pantry', 'Covered Patio', 'Energy Star Rated', 'Smart Home Wiring', 'Dual Living Areas', 'Grand Foyer', 'Luxury Master'],
  },
]

const meta: Meta<typeof CatalogCard> = {
  title: 'Patterns/CatalogCard',
  component: CatalogCard,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof CatalogCard>

export const Default: Story = {
  args: {
    item: sampleItems[0],
    allItems: sampleItems,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 380 }}>
        <Story />
      </div>
    ),
  ],
}

export const Grid: Story = {
  decorators: [
    () => (
      <div className="mx-auto grid grid-cols-3 gap-6 p-8" style={{ maxWidth: 1280 }}>
        {sampleItems.map((item) => (
          <CatalogCard key={item.id} item={item} allItems={sampleItems} />
        ))}
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
}
