import type { Meta, StoryObj } from '@storybook/react'
import { AvatarChip, ChipRow } from './avatar-chip'
import { Users, Building2, Mail, Star, Shield } from 'lucide-react'

const meta: Meta<typeof AvatarChip> = {
  title: 'UI/AvatarChip',
  component: AvatarChip,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#0F0F1A' }] },
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'success', 'danger', 'warning', 'info', 'purple', 'custom'] },
    size: { control: 'radio', options: ['xs', 'sm', 'md'] },
    customColor: { control: 'color' },
  },
}

export default meta
type Story = StoryObj<typeof AvatarChip>

export const Default: Story = {
  args: {
    label: 'Sarah Chen',
    portrait: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face',
    variant: 'default',
    size: 'sm',
  },
}

export const AllVariants: Story = {
  decorators: [
    () => (
      <ChipRow className="p-4">
        <AvatarChip label="Active" variant="success" icon={<Shield size={10} />} />
        <AvatarChip label="At Risk" variant="danger" icon={<Star size={10} />} />
        <AvatarChip label="Pending" variant="warning" icon={<Mail size={10} />} />
        <AvatarChip label="New Lead" variant="info" icon={<Users size={10} />} />
        <AvatarChip label="Enterprise" variant="purple" icon={<Building2 size={10} />} />
        <AvatarChip label="Custom" variant="custom" customColor="#0097A7" />
      </ChipRow>
    ),
  ],
}

export const TeamRow: Story = {
  decorators: [
    () => (
      <ChipRow className="p-4">
        <AvatarChip label="Sarah Chen" portrait="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face" variant="success" size="md" />
        <AvatarChip label="James Park" portrait="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" variant="info" size="md" />
        <AvatarChip label="Maria Lopez" portrait="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" variant="purple" size="md" />
        <AvatarChip label="Tom Wright" variant="default" size="md" />
      </ChipRow>
    ),
  ],
}

export const Sizes: Story = {
  decorators: [
    () => (
      <div className="flex flex-col gap-3 p-4">
        <ChipRow><AvatarChip label="Extra Small" size="xs" variant="info" /><AvatarChip label="Small" size="sm" variant="info" /><AvatarChip label="Medium" size="md" variant="info" /></ChipRow>
      </div>
    ),
  ],
}
