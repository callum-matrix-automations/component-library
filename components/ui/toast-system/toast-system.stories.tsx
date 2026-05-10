import type { Meta, StoryObj } from '@storybook/react'
import { ToastProvider, ToastTriggerPanel } from './toast-system'

const meta: Meta<typeof ToastTriggerPanel> = {
  title: 'UI/ToastSystem',
  component: ToastTriggerPanel,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#0F0F1A' }] },
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <div className="p-8">
          <p className="mb-4 text-sm text-white/60">Click a button below to trigger a toast notification in the bottom-right corner.</p>
          <Story />
        </div>
      </ToastProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ToastTriggerPanel>

export const Default: Story = {}
