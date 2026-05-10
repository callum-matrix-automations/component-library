import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import AvatarStack from './avatar-stack'
import type { AvatarStackMember } from './avatar-stack'

const teamMembers: AvatarStackMember[] = [
  { id: '1', name: 'Sarah Chen', portrait: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face', color: '#22c55e', status: 'active' },
  { id: '2', name: 'James Park', portrait: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face', color: '#60a5fa', status: 'active' },
  { id: '3', name: 'Maria Lopez', portrait: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face', color: '#a78bfa', status: 'away' },
  { id: '4', name: 'Tom Wright', portrait: null, color: '#f59e0b', status: 'offline' },
  { id: '5', name: 'Emma Davis', portrait: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face', color: '#ef4444', status: 'active' },
  { id: '6', name: 'Alex Kim', portrait: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face', color: '#0ea5e9', status: 'active' },
]

const meta: Meta<typeof AvatarStack> = {
  title: 'UI/AvatarStack',
  component: AvatarStack,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#0F0F1A' }] },
  },
  argTypes: {
    size: { control: { type: 'range', min: 24, max: 64, step: 4 } },
    maxVisible: { control: { type: 'range', min: 3, max: 10, step: 1 } },
  },
}

export default meta
type Story = StoryObj<typeof AvatarStack>

function InteractiveDemo() {
  const [selected, setSelected] = useState('1')
  return (
    <div className="p-4">
      <AvatarStack members={teamMembers} selectedId={selected} onSelect={setSelected} size={44} />
      <p className="mt-4 text-center text-xs text-white/60">Selected: {teamMembers.find(m => m.id === selected)?.name}</p>
    </div>
  )
}

export const Default: Story = {
  render: () => <InteractiveDemo />,
}

export const Overflow: Story = {
  render: () => {
    const many = [...teamMembers, ...teamMembers.map((m, i) => ({ ...m, id: `extra-${i}`, name: `Extra ${i + 1}` }))]
    return <AvatarStack members={many} maxVisible={5} size={40} />
  },
}

export const Large: Story = {
  args: {
    members: teamMembers.slice(0, 4),
    size: 56,
    selectedId: '2',
  },
}
