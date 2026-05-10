import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import SidebarNav from './sidebar-nav'
import { LayoutDashboard, Users, ShoppingCart, BarChart3, Settings, Bell, FileText, HelpCircle, CreditCard, Mail } from 'lucide-react'

const navItems = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, group: 'Main' },
  { id: 'analytics', name: 'Analytics', icon: BarChart3, group: 'Main' },
  { id: 'orders', name: 'Orders', icon: ShoppingCart, group: 'Main' },
  { id: 'customers', name: 'Customers', icon: Users, group: 'Main' },
  { id: 'invoices', name: 'Invoices', icon: CreditCard, group: 'Finance' },
  { id: 'reports', name: 'Reports', icon: FileText, group: 'Finance' },
  { id: 'messages', name: 'Messages', icon: Mail, group: 'Communication' },
  { id: 'notifications', name: 'Notifications', icon: Bell, group: 'Communication' },
  { id: 'settings', name: 'Settings', icon: Settings, group: 'System' },
  { id: 'help', name: 'Help & Support', icon: HelpCircle, group: 'System' },
]

const meta: Meta<typeof SidebarNav> = {
  title: 'Layout/SidebarNav',
  component: SidebarNav,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#0A0A14' }] },
  },
  argTypes: {
    side: { control: 'radio', options: ['left', 'right'] },
    accentColor: { control: 'color' },
  },
}

export default meta
type Story = StoryObj<typeof SidebarNav>

function SidebarDemo({ side = 'left', accentColor = '#C8A44E' }: { side?: 'left' | 'right'; accentColor?: string }) {
  const [active, setActive] = useState('dashboard')
  const [expanded, setExpanded] = useState(true)

  return (
    <div className="flex h-screen" style={{ flexDirection: side === 'right' ? 'row-reverse' : 'row' }}>
      <SidebarNav
        items={navItems}
        activeItem={active}
        expanded={expanded}
        onItemClick={setActive}
        onToggleExpand={() => setExpanded((e) => !e)}
        side={side}
        accentColor={accentColor}
      />
      <div className="flex flex-1 items-center justify-center" style={{ background: '#06060e' }}>
        <div className="text-center">
          <p className="text-sm font-medium text-white/60">Active Panel</p>
          <p className="mt-1 text-2xl font-bold text-white capitalize">{active}</p>
        </div>
      </div>
    </div>
  )
}

export const Default: Story = {
  render: () => <SidebarDemo />,
}

export const RightSide: Story = {
  render: () => <SidebarDemo side="right" />,
}

export const BlueAccent: Story = {
  render: () => <SidebarDemo accentColor="#60a5fa" />,
}
