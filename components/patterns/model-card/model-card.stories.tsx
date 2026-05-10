import type { Meta, StoryObj } from '@storybook/react'
import ModelCard from './model-card'
import type { ModelItem } from './model-card'

const sampleItems: ModelItem[] = [
  {
    id: '1',
    name: 'The Oakwood 2400',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop',
    ],
    price: '$285,000',
    specs: [
      { label: 'Beds', value: 4 },
      { label: 'Baths', value: '2.5' },
      { label: 'sq ft', value: '2,400' },
    ],
    description: 'A spacious single-story home with an open-concept living area, chef-style kitchen with island, and a covered outdoor entertaining space. Perfect for families who value indoor-outdoor living.',
    features: ['Open Floor Plan', 'Kitchen Island', 'Walk-in Pantry', 'Covered Patio', 'Energy Star Rated', 'Smart Home Wiring'],
  },
  {
    id: '2',
    name: 'The Maple 1800',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=500&fit=crop',
    ],
    price: '$215,000',
    specs: [
      { label: 'Beds', value: 3 },
      { label: 'Baths', value: 2 },
      { label: 'sq ft', value: '1,800' },
    ],
    description: 'A compact yet functional design ideal for first-time buyers. Features a well-appointed kitchen, spacious master suite, and dedicated home office nook.',
    features: ['Open Floor Plan', 'Home Office Nook', 'Walk-in Closet', 'Energy Star Rated'],
  },
  {
    id: '3',
    name: 'The Cedar 3200',
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7c5a38?w=800&h=500&fit=crop',
    ],
    price: '$395,000',
    specs: [
      { label: 'Beds', value: 5 },
      { label: 'Baths', value: '3.5' },
      { label: 'sq ft', value: '3,200' },
    ],
    description: 'Our flagship two-story design with premium finishes throughout. Features a grand foyer, dual living areas, gourmet kitchen, and a luxurious master retreat on the upper level.',
    features: ['Open Floor Plan', 'Kitchen Island', 'Walk-in Pantry', 'Covered Patio', 'Energy Star Rated', 'Smart Home Wiring', 'Dual Living Areas', 'Grand Foyer', 'Luxury Master'],
  },
]

const meta: Meta<typeof ModelCard> = {
  title: 'Patterns/ModelCard',
  component: ModelCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    accentColor: { control: 'color' },
  },
}

export default meta
type Story = StoryObj<typeof ModelCard>

export const Default: Story = {
  args: {
    item: sampleItems[0],
    accentColor: '#C8A44E',
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
      <div className="mx-auto grid grid-cols-3 gap-8 p-8" style={{ maxWidth: 1280 }}>
        {sampleItems.map((item) => (
          <ModelCard key={item.id} item={item} accentColor="#C8A44E" />
        ))}
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
}

export const BlueAccent: Story = {
  args: {
    item: sampleItems[1],
    accentColor: '#0064B0',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 380 }}>
        <Story />
      </div>
    ),
  ],
}
