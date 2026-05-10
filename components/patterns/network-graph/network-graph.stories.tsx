import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import NetworkGraph from './network-graph'
import type { NetworkNode, NetworkLink } from './network-graph'

const nodes: NetworkNode[] = [
  { id: 'you', name: 'Your Company', group: 'Internal', groupColor: '#60a5fa', description: 'Your organization — the hub of this network.', strength: 100 },
  { id: 'acme', name: 'Acme Corp', group: 'Enterprise', groupColor: '#22c55e', description: 'Key enterprise account. 3-year contract, $480K ARR.', portrait: null, strength: 92 },
  { id: 'techflow', name: 'TechFlow', group: 'Enterprise', groupColor: '#22c55e', description: 'Mid-market SaaS client. Growing account with expansion potential.', strength: 78 },
  { id: 'datavault', name: 'DataVault', group: 'Enterprise', groupColor: '#22c55e', description: 'Data infrastructure partner. Referred by Acme.', strength: 65 },
  { id: 'sarah', name: 'Sarah Chen', group: 'Contacts', groupColor: '#a78bfa', description: 'VP Engineering at Acme. Primary technical decision maker.', strength: 88 },
  { id: 'james', name: 'James Park', group: 'Contacts', groupColor: '#a78bfa', description: 'CTO at TechFlow. Introduced us to their engineering team.', strength: 72 },
  { id: 'maria', name: 'Maria Lopez', group: 'Contacts', groupColor: '#a78bfa', description: 'Head of Product at DataVault. Evaluating our enterprise tier.', strength: 55 },
  { id: 'investor1', name: 'Sequoia Capital', group: 'Investors', groupColor: '#f59e0b', description: 'Lead investor, Series B. Board observer.', strength: 85 },
  { id: 'partner1', name: 'AWS', group: 'Partners', groupColor: '#ef4444', description: 'Cloud infrastructure partner. Co-selling arrangement.', strength: 70 },
]

const links: NetworkLink[] = [
  { source: 'you', target: 'acme', type: 'Client' },
  { source: 'you', target: 'techflow', type: 'Client' },
  { source: 'you', target: 'datavault', type: 'Client' },
  { source: 'you', target: 'investor1', type: 'Investor' },
  { source: 'you', target: 'partner1', type: 'Partner' },
  { source: 'acme', target: 'sarah', type: 'Employee' },
  { source: 'techflow', target: 'james', type: 'Employee' },
  { source: 'datavault', target: 'maria', type: 'Employee' },
  { source: 'acme', target: 'datavault', type: 'Referral' },
  { source: 'sarah', target: 'james', type: 'Knows' },
]

const meta: Meta<typeof NetworkGraph> = {
  title: 'Patterns/NetworkGraph',
  component: NetworkGraph,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#0A0A14' }] },
  },
}

export default meta
type Story = StoryObj<typeof NetworkGraph>

function GraphDemo() {
  const [open, setOpen] = useState(true)
  return (
    <div className="flex h-screen items-center justify-center" style={{ background: '#0a0a14' }}>
      {!open && (
        <button onClick={() => setOpen(true)} className="cursor-pointer rounded-lg px-6 py-3 text-sm font-semibold text-white" style={{ background: '#C8A44E' }}>
          Open Network Graph
        </button>
      )}
      {open && <NetworkGraph nodes={nodes} links={links} title="Business Network" onClose={() => setOpen(false)} />}
    </div>
  )
}

export const Default: Story = {
  render: () => <GraphDemo />,
}
