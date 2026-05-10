import type { Meta, StoryObj } from '@storybook/react'
import PortfolioGallery from './portfolio-gallery'

const meta: Meta<typeof PortfolioGallery> = {
  title: 'Sections/PortfolioGallery',
  component: PortfolioGallery,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    overline: { control: 'text' },
    headline: { control: 'text' },
    headlineAccent: { control: 'text' },
    description: { control: 'text' },
    accentColor: { control: 'color' },
    galleryHeight: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof PortfolioGallery>

export const Default: Story = {}

export const CustomBranding: Story = {
  args: {
    overline: 'Our Work',
    headline: 'Featured',
    headlineAccent: 'Projects.',
    description: 'A showcase of our finest work across residential, commercial, and mixed-use developments.',
    accentColor: '#7C3AED',
    projects: [
      {
        src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=1000&fit=crop',
        title: 'Coastal Retreat',
        description: '4,200 sq ft beachfront villa with panoramic ocean views',
      },
      {
        src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=1000&fit=crop',
        title: 'Urban Loft Complex',
        description: '12-unit luxury loft conversion in downtown arts district',
      },
      {
        src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=1000&fit=crop',
        title: 'Mountain Estate',
        description: '6,800 sq ft estate with guest house and infinity pool',
      },
      {
        src: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&h=1000&fit=crop',
        title: 'Eco Village',
        description: 'Net-zero community of 24 passive-house townhomes',
      },
      {
        src: 'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&h=1000&fit=crop',
        title: 'Heritage Restoration',
        description: '1920s Art Deco theater converted to mixed-use retail',
      },
    ],
  },
}

export const TallGallery: Story = {
  args: {
    galleryHeight: '600px',
    overline: 'Showcase',
    headline: 'Tall',
    headlineAccent: 'Gallery.',
    description: 'Gallery height can be customized via the galleryHeight prop.',
  },
}
