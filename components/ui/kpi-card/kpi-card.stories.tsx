import type { Meta, StoryObj } from '@storybook/react'
import KpiCard from './kpi-card'
import { DollarSign, Users, ShoppingCart, TrendingUp, BarChart3, Target } from 'lucide-react'

const meta: Meta<typeof KpiCard> = {
  title: 'UI/KpiCard',
  component: KpiCard,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#0F0F1A' }] },
  },
  argTypes: {
    tone: { control: 'select', options: ['default', 'gold', 'success', 'warning', 'danger', 'blue', 'purple', 'pink'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    trend: { control: 'radio', options: ['up', 'down', 'flat'] },
    accentColor: { control: 'color' },
  },
}

export default meta
type Story = StoryObj<typeof KpiCard>

export const Default: Story = {
  args: {
    label: 'Monthly Revenue',
    value: '$48,250',
    delta: 12.5,
    trend: 'up',
    caption: 'vs last month',
    tone: 'success',
    size: 'md',
  },
  decorators: [(Story) => <div style={{ width: 220 }}><Story /></div>],
}

export const Dashboard: Story = {
  decorators: [
    () => (
      <div className="grid grid-cols-2 gap-3 p-6 lg:grid-cols-3" style={{ maxWidth: 720 }}>
        <KpiCard label="Revenue" value="$48,250" delta={12.5} trend="up" caption="vs last month" tone="success" icon={<DollarSign size={14} />} />
        <KpiCard label="Active Users" value="2,847" delta={-3.2} trend="down" caption="vs last week" tone="blue" icon={<Users size={14} />} />
        <KpiCard label="Orders" value={156} delta={8} trend="up" caption="this week" tone="gold" icon={<ShoppingCart size={14} />} />
        <KpiCard label="Conversion" value="3.2%" delta={0.4} trend="up" tone="purple" icon={<Target size={14} />} />
        <KpiCard label="Avg Order Value" value="$312" delta={-5} trend="down" tone="warning" icon={<BarChart3 size={14} />} />
        <KpiCard label="Growth Rate" value="18%" delta={2.1} trend="up" tone="pink" icon={<TrendingUp size={14} />} />
      </div>
    ),
  ],
  parameters: { layout: 'fullscreen' },
}
