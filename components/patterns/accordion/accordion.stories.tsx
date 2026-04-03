import type { Meta, StoryObj } from '@storybook/react'
import Accordion from './accordion'

const meta: Meta<typeof Accordion> = {
  title: 'Patterns/Accordion',
  component: Accordion,
  argTypes: {
    item: { control: 'object' },
    activeColor: { control: 'color' },
    textColor: { control: 'color' },
    answerColor: { control: 'color' },
  },
}

export default meta
type Story = StoryObj<typeof Accordion>

export const Default: Story = {
  args: {
    item: {
      question: 'What is the typical timeline for a residential build?',
      answer: 'Most residential projects take between 9 and 14 months from breaking ground to handover, depending on the size and complexity of the build. We provide a detailed programme at the outset and keep you updated with weekly progress reports throughout construction.',
    },
    activeColor: '#c2994e',
    textColor: '#1a1a1a',
    answerColor: '#6b7280',
  },
}

export const CustomColors: Story = {
  args: {
    item: {
      question: 'Do you handle planning permission applications?',
      answer: 'Yes. We work with our network of architects and planning consultants to prepare and submit applications on your behalf. We have an excellent track record with local authorities and will guide you through the entire process.',
    },
    activeColor: '#0064B0',
    textColor: '#111827',
    answerColor: '#4b5563',
  },
}
