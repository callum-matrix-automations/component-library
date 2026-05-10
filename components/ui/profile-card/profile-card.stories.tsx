import type { Meta, StoryObj } from '@storybook/react'
import { ProfileCard, GlassCard, GlassHighlight, GlassLinkRow } from './profile-card'
import { Mail, Phone, Building2, BarChart3 } from 'lucide-react'

const meta: Meta<typeof ProfileCard> = {
  title: 'UI/ProfileCard',
  component: ProfileCard,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#0F0F1A' }] },
  },
  argTypes: {
    accentColor: { control: 'color' },
    fullBody: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof ProfileCard>

export const Avatar: Story = {
  args: {
    name: 'Sarah Chen',
    subtitle: 'VP of Engineering',
    description: 'Leading the platform team at Acme Corp. 12 years experience in distributed systems and team leadership.',
    portrait: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    accentColor: '#60a5fa',
  },
  decorators: [(Story) => <div style={{ width: 300 }}><Story /></div>],
}

export const FullBody: Story = {
  args: {
    name: 'James Park',
    subtitle: 'Chief Technology Officer',
    description: 'Architecting the next generation of cloud infrastructure. Previously at Google and AWS.',
    portrait: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=533&fit=crop&crop=face',
    accentColor: '#22c55e',
    fullBody: true,
  },
  decorators: [(Story) => <div style={{ width: 300 }}><Story /></div>],
}

export const DetailView: Story = {
  decorators: [
    () => (
      <div style={{ width: 700 }}>
        <GlassCard className="p-6">
          <div className="grid gap-6" style={{ gridTemplateColumns: '280px 1fr' }}>
            <ProfileCard
              name="Maria Lopez"
              subtitle="Head of Product"
              portrait="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=533&fit=crop&crop=face"
              accentColor="#a78bfa"
              fullBody
            />
            <div className="space-y-3">
              <GlassHighlight title="Contact Information">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs"><Mail size={12} style={{ color: '#a78bfa' }} /> maria@datavault.com</div>
                  <div className="flex items-center gap-2 text-xs"><Phone size={12} style={{ color: '#a78bfa' }} /> +1 (555) 234-5678</div>
                </div>
              </GlassHighlight>
              <GlassHighlight title="Performance" accentColor="#22c55e">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs"><span>Revenue Influenced</span><span className="font-semibold text-white">$2.4M</span></div>
                  <div className="flex justify-between text-xs"><span>Deals Closed</span><span className="font-semibold text-white">18</span></div>
                  <div className="flex justify-between text-xs"><span>Win Rate</span><span className="font-semibold text-white">72%</span></div>
                </div>
              </GlassHighlight>
              <GlassLinkRow icon={<Building2 size={14} />} label="DataVault Inc." detail="Enterprise Account" accentColor="#a78bfa" />
              <GlassLinkRow icon={<BarChart3 size={14} />} label="View Analytics" detail="Q4 Performance Report" accentColor="#60a5fa" />
            </div>
          </div>
        </GlassCard>
      </div>
    ),
  ],
}
