import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import ProductModal from './product-modal'
import type { ProductItem } from './product-modal'

const sampleProduct: ProductItem = {
  id: '1',
  name: 'Ergonomic Standing Desk Pro',
  image: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=600&h=450&fit=crop',
  tier: 'professional',
  category: 'Office Furniture',
  price: '$899',
  description: 'Height-adjustable standing desk with memory presets, cable management system, and bamboo desktop. Built for all-day productivity.',
  highlights: [
    'Dual motor lift system — adjusts in 4 seconds',
    'Anti-collision technology with 3 memory presets',
    'Integrated wireless charging pad',
  ],
  specs: { Width: '60"', Depth: '30"', Weight: '45 kg', Capacity: '150 kg' },
  inStock: true,
}

const meta: Meta<typeof ProductModal> = {
  title: 'Patterns/ProductModal',
  component: ProductModal,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#0F0F1A' }] },
  },
}

export default meta
type Story = StoryObj<typeof ProductModal>

function ModalDemo({ product }: { product: ProductItem }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="p-8">
      {!open && (
        <button onClick={() => setOpen(true)} className="cursor-pointer rounded-lg px-6 py-3 text-sm font-semibold text-white" style={{ background: '#60a5fa' }}>
          Open Product Modal
        </button>
      )}
      {open && <ProductModal product={product} onClose={() => setOpen(false)} onAddToCart={(id) => console.log('Add to cart:', id)} />}
    </div>
  )
}

export const Default: Story = {
  render: () => <ModalDemo product={sampleProduct} />,
}

export const ExclusiveTier: Story = {
  render: () => (
    <ModalDemo
      product={{
        id: '2',
        name: 'Limited Edition Mechanical Keyboard',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=450&fit=crop',
        tier: 'exclusive',
        category: 'Peripherals',
        price: '$349',
        description: 'Hand-assembled mechanical keyboard with custom Cherry MX switches, PBT keycaps, and CNC aluminum case. Only 500 units produced.',
        highlights: ['Cherry MX Brown switches', 'Hot-swappable PCB', 'USB-C with coiled cable'],
        specs: { Layout: '75%', Switches: 'Cherry MX', Keycaps: 'PBT', Case: 'Aluminum' },
        inStock: true,
        quantity: 3,
      }}
    />
  ),
}
