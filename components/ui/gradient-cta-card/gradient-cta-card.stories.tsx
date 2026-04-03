import type { Meta, StoryObj } from '@storybook/react';
import GradientCtaCard from './gradient-cta-card';

const meta: Meta<typeof GradientCtaCard> = {
  title: 'UI/GradientCtaCard',
  component: GradientCtaCard,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    overline: { control: 'text' },
    headline: { control: 'text' },
    headlineAccent: { control: 'text' },
    description: { control: 'text' },
    buttonLabel: { control: 'text' },
    imageSrc: { control: 'text' },
    gradientFrom: { control: 'color' },
    gradientVia: { control: 'color' },
    gradientTo: { control: 'color' },
    accentColor: { control: 'color' },
    borderRadius: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof GradientCtaCard>;

export const Default: Story = {
  args: {
    overline: 'Next Step',
    headline: 'Ready to transform your project?',
    headlineAccent: 'Let\'s build together.',
    description: 'Schedule a consultation with our team to discuss your requirements and discover how we can deliver exceptional results.',
    buttonLabel: 'Get Started',
    onButtonClick: () => alert('CTA clicked!'),
    imageSrc: 'https://picsum.photos/800/900?random=40',
    gradientFrom: '#003D6B',
    gradientVia: '#0064B0',
    gradientTo: '#0078D4',
    accentColor: '#8ED1FC',
    stats: [
      { value: '250+', label: 'Projects completed' },
      { value: '98%', label: 'Client retention' },
      { value: '15yr', label: 'Experience' },
    ],
    borderRadius: '20px',
  },
  render: (args) => (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <GradientCtaCard {...args} />
    </div>
  ),
};

export const NoImage: Story = {
  args: {
    overline: 'Contact Us',
    headline: 'Have a project in mind?',
    headlineAccent: 'We\'d love to hear from you.',
    description: 'Our team is ready to help you navigate your next construction challenge with confidence.',
    buttonLabel: 'Schedule a Call',
    onButtonClick: () => alert('CTA clicked!'),
    gradientFrom: '#1a1a2e',
    gradientVia: '#16213e',
    gradientTo: '#0f3460',
    accentColor: '#e94560',
    stats: [
      { value: '24hr', label: 'Response time' },
      { value: '100%', label: 'Satisfaction' },
    ],
    borderRadius: '16px',
  },
  render: (args) => (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <GradientCtaCard {...args} />
    </div>
  ),
};

export const WarmGradient: Story = {
  args: {
    overline: 'Premium Service',
    headline: 'Elevate your standards',
    headlineAccent: 'with precision craftsmanship.',
    description: 'From initial concept through final handover, experience a level of quality and attention to detail that sets a new benchmark.',
    buttonLabel: 'Learn More',
    onButtonClick: () => alert('CTA clicked!'),
    imageSrc: 'https://picsum.photos/800/900?random=41',
    gradientFrom: '#44200D',
    gradientVia: '#8B4513',
    gradientTo: '#c2994e',
    accentColor: '#fcd34d',
    stats: [
      { value: '£1.2B', label: 'Portfolio value' },
      { value: '45', label: 'Active sites' },
    ],
    borderRadius: '12px',
  },
  render: (args) => (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <GradientCtaCard {...args} />
    </div>
  ),
};
