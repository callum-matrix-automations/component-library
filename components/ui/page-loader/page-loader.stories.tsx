import type { Meta, StoryObj } from '@storybook/react';
import PageLoader from './page-loader';

const meta: Meta<typeof PageLoader> = {
  title: 'UI/PageLoader',
  component: PageLoader,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    text: { control: 'text' },
    spinnerColor: { control: 'color' },
    backgroundColor: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof PageLoader>;

export const Default: Story = {
  args: {
    text: 'Loading...',
    spinnerColor: '#c2994e',
    backgroundColor: '#faf9f6',
  },
};

export const DarkTheme: Story = {
  args: {
    text: 'Preparing your experience...',
    spinnerColor: '#60a5fa',
    backgroundColor: '#111827',
  },
};

export const BrandColored: Story = {
  args: {
    text: 'Just a moment...',
    spinnerColor: '#10b981',
    backgroundColor: '#ecfdf5',
  },
};
