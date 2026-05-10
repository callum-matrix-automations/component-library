import type { Meta, StoryObj } from '@storybook/react'
import StepCard from './step-card'

const meta: Meta<typeof StepCard> = {
  title: 'Patterns/StepCard',
  component: StepCard,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    num: { control: 'text' },
    headline: { control: 'text' },
    body: { control: 'text' },
    callout: { control: 'text' },
    accentColor: { control: 'color' },
    cascadeIndent: { control: 'number' },
    showConnector: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof StepCard>

export const Default: Story = {
  args: {
    num: '01',
    headline: 'Discovery & Assessment',
    body: 'We start by mapping your existing workflows, identifying bottlenecks, and understanding where the biggest efficiency gains are hiding. No assumptions — just data.',
    callout: 'Most teams recover 8-12 hours per week in the first month after implementation.',
    benefits: [
      'Full workflow audit',
      'Stakeholder interviews',
      'Bottleneck identification',
      'ROI projection report',
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 720, padding: 32, margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
}

export const Cascade: Story = {
  decorators: [
    () => {
      const steps = [
        {
          num: '01',
          headline: 'Discovery & Assessment',
          body: 'We map your existing workflows, identify bottlenecks, and understand where the biggest efficiency gains are.',
          callout: 'Most teams recover 8-12 hours per week in the first month.',
          benefits: ['Full workflow audit', 'Stakeholder interviews', 'Bottleneck identification', 'ROI projection'],
        },
        {
          num: '02',
          headline: 'Implementation & Integration',
          body: 'Your systems are connected, data flows are automated, and the team is trained on the new platform — all with zero downtime.',
          callout: 'Average implementation time is 2 weeks, not months.',
          benefits: ['Zero-downtime migration', 'Automated data sync', 'Team training sessions', 'Custom dashboard setup'],
        },
        {
          num: '03',
          headline: 'Optimization & Scale',
          body: 'Once the foundation is in place, we continuously refine. Monthly reviews surface new automation opportunities and ensure the system grows with you.',
          callout: 'Clients see an average 3x improvement in reporting speed within 90 days.',
          benefits: ['Monthly performance reviews', 'Continuous automation', 'Scaling playbook', 'Dedicated support channel'],
        },
      ]

      return (
        <div className="relative px-8 py-20" style={{ background: '#EDF0F6' }}>
          <div className="pointer-events-none absolute inset-0" style={{ opacity: 0.6, backgroundImage: 'radial-gradient(circle, #B8C1CF 0.6px, transparent 0.6px)', backgroundSize: '26px 26px' }} />
          <div className="relative z-10 mx-auto max-w-4xl">
            <div className="mb-16">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8" style={{ background: '#0064B0' }} />
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: '#0064B0' }}>How it works</p>
              </div>
              <p className="max-w-xl font-serif text-gray-900 leading-tight" style={{ fontSize: 'clamp(26px, 3.2vw, 44px)' }}>
                Three steps to operational clarity.
              </p>
            </div>
            <div className="flex flex-col gap-8">
              {steps.map((step, i) => (
                <StepCard key={step.num} {...step} index={i} cascadeIndent={32} showConnector={i < steps.length - 1} />
              ))}
            </div>
          </div>
        </div>
      )
    },
  ],
}

export const CustomAccent: Story = {
  args: {
    num: '01',
    headline: 'Platform Onboarding',
    body: 'New users are guided through a structured onboarding flow that adapts to their role and permissions. Setup takes minutes, not days.',
    callout: '94% of users complete onboarding without contacting support.',
    benefits: ['Role-based setup', 'Interactive walkthrough', 'Progress tracking', 'Slack integration'],
    accentColor: '#7C3AED',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 720, padding: 32, margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
}
