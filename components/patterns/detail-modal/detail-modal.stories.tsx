import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import DetailModal from './detail-modal'

const meta: Meta<typeof DetailModal> = {
  title: 'Patterns/DetailModal',
  component: DetailModal,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#0F0F1A' }] },
  },
}

export default meta
type Story = StoryObj<typeof DetailModal>

function ModalDemo() {
  const [open, setOpen] = useState(true)
  return (
    <div className="p-8">
      {!open && (
        <button onClick={() => setOpen(true)} className="cursor-pointer rounded-lg px-6 py-3 text-sm font-semibold text-white" style={{ background: '#60a5fa' }}>
          Open Detail Modal
        </button>
      )}
      {open && (
        <DetailModal
          name="Sarah Chen"
          subtitle="VP of Engineering"
          portrait="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=533&fit=crop&crop=face"
          summary="Senior engineering leader with 12 years of experience in distributed systems, platform architecture, and team scaling. Currently driving the cloud migration initiative at Acme Corp."
          accentColor="#60a5fa"
          badge="Top Performer"
          stats={[
            { label: 'Engagement Score', value: 92, color: '#22c55e' },
            { label: 'Deals Influenced', value: 18, max: 25, color: '#60a5fa' },
            { label: 'Response Rate', value: 78, color: '#f59e0b' },
          ]}
          categories={[
            {
              title: 'Contact Information',
              fields: [
                { label: 'Email', value: 'sarah.chen@acmecorp.com' },
                { label: 'Phone', value: '+1 (555) 234-5678' },
                { label: 'Location', value: 'San Francisco, CA' },
                { label: 'Timezone', value: 'Pacific (UTC-8)' },
              ],
            },
            {
              title: 'Professional Background',
              fields: [
                { label: 'Company', value: 'Acme Corporation' },
                { label: 'Department', value: 'Engineering' },
                { label: 'Team Size', value: '45 direct reports across 6 teams' },
                { label: 'Tenure', value: '3 years, 4 months' },
              ],
            },
            {
              title: 'Account Details',
              fields: [
                { label: 'Contract Value', value: '$480,000 ARR' },
                { label: 'Renewal Date', value: 'March 15, 2026' },
                { label: 'Plan', value: 'Enterprise — Unlimited seats' },
                { label: 'Last Activity', value: '2 days ago — Feature request submitted' },
              ],
            },
            {
              title: 'Communication Preferences',
              fields: [
                { label: 'Preferred', value: 'Email for async, Slack for urgent' },
                { label: 'Meeting Style', value: 'Prefers 25-min focused sessions' },
                { label: 'Best Time', value: 'Tuesday/Thursday mornings PT' },
              ],
            },
          ]}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  )
}

export const Default: Story = {
  render: () => <ModalDemo />,
}
