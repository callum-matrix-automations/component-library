import type { Meta, StoryObj } from '@storybook/react'
import { HoverRevealCard, RevealRow, RevealBar } from './hover-reveal-card'
import { Building2, Users, Heart, TrendingUp, Star } from 'lucide-react'

const meta: Meta<typeof HoverRevealCard> = {
  title: 'Patterns/HoverRevealCard',
  component: HoverRevealCard,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#0F0F1A' }] },
  },
  argTypes: {
    accentColor: { control: 'color' },
  },
}

export default meta
type Story = StoryObj<typeof HoverRevealCard>

export const Default: Story = {
  decorators: [
    () => (
      <div style={{ width: 320, padding: 16 }}>
        <HoverRevealCard
          accentColor="#22c55e"
          footerIcon={<Building2 size={11} />}
          footerLabel="Enterprise Client"
          footerActionLabel="View Account"
          summary={
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ border: '2px solid #22c55e', background: '#0f0f1a' }}>
                <span className="text-xs font-bold" style={{ color: '#22c55e' }}>A</span>
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-medium text-white">Acme Corporation</span>
                <span className="block text-[0.55rem]" style={{ color: '#22c55e' }}>Enterprise</span>
              </div>
              <div className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: '#22c55e', boxShadow: '0 0 6px rgba(34,197,94,0.4)' }} />
            </div>
          }
          details={
            <>
              <RevealBar label="Health Score" value="85%" icon={<Heart size={10} style={{ color: '#22c55e' }} />} color="#22c55e" />
              <RevealBar label="Revenue YTD" value="72%" icon={<TrendingUp size={10} style={{ color: '#60a5fa' }} />} color="#60a5fa" />
              <RevealRow>
                <p className="text-[0.6rem] leading-relaxed" style={{ color: '#94a3b8' }}>
                  Key account with 3-year contract. Primary contact: Sarah Chen, VP Engineering.
                </p>
              </RevealRow>
            </>
          }
        />
      </div>
    ),
  ],
}

export const ContactList: Story = {
  decorators: [
    () => {
      const contacts = [
        { name: 'Sarah Chen', role: 'VP Engineering', company: 'Acme Corp', color: '#22c55e', score: '92%', revenue: '$480K' },
        { name: 'James Park', role: 'CTO', company: 'TechFlow', color: '#60a5fa', score: '78%', revenue: '$320K' },
        { name: 'Maria Lopez', role: 'Head of Product', company: 'DataVault', color: '#a78bfa', score: '64%', revenue: '$180K' },
      ]
      return (
        <div className="flex flex-col gap-2 p-4" style={{ width: 340 }}>
          {contacts.map((c) => (
            <HoverRevealCard
              key={c.name}
              accentColor={c.color}
              footerIcon={<Users size={11} />}
              footerLabel={c.company}
              footerActionLabel="View Profile"
              summary={
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ border: `2px solid ${c.color}`, background: '#0f0f1a', color: c.color }}>{c.name[0]}</div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-medium text-white">{c.name}</span>
                    <span className="block text-[0.55rem]" style={{ color: c.color }}>{c.role}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={10} style={{ color: '#f59e0b' }} />
                    <span className="text-[0.55rem] font-medium" style={{ color: '#f59e0b' }}>{c.score}</span>
                  </div>
                </div>
              }
              details={
                <>
                  <RevealBar label="Engagement" value={c.score} color={c.color} />
                  <RevealRow>
                    <div className="flex items-center justify-between text-[0.6rem]">
                      <span style={{ color: '#64748b' }}>Revenue</span>
                      <span className="font-semibold text-white">{c.revenue}</span>
                    </div>
                  </RevealRow>
                </>
              }
            />
          ))}
        </div>
      )
    },
  ],
}
