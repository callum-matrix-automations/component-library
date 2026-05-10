import type { Meta, StoryObj } from '@storybook/react'
import ServiceAreaCard from './service-area-card'

const meta: Meta<typeof ServiceAreaCard> = {
  title: 'Patterns/ServiceAreaCard',
  component: ServiceAreaCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    name: { control: 'text' },
    image: { control: 'text' },
    href: { control: 'text' },
    index: { control: 'number' },
  },
}

export default meta
type Story = StoryObj<typeof ServiceAreaCard>

export const Default: Story = {
  args: {
    name: 'Auckland CBD',
    image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=600&h=450&fit=crop',
    href: '#auckland-cbd',
    index: 0,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
}

export const Grid: Story = {
  decorators: [
    () => (
      <div className="mx-auto grid grid-cols-3 gap-6 p-8" style={{ maxWidth: 1200 }}>
        {[
          { name: 'North Shore', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=450&fit=crop' },
          { name: 'West Auckland', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=450&fit=crop' },
          { name: 'South Auckland', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=450&fit=crop' },
          { name: 'East Auckland', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=450&fit=crop' },
          { name: 'Central Suburbs', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=450&fit=crop' },
          { name: 'Rodney District', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=450&fit=crop' },
        ].map((area, i) => (
          <ServiceAreaCard key={area.name} name={area.name} image={area.image} href="#" index={i} />
        ))}
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
}
