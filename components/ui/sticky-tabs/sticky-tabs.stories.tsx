import type { Meta, StoryObj } from '@storybook/react';
import StickyTabs from './sticky-tabs';

const meta: Meta<typeof StickyTabs> = {
  title: 'UI/StickyTabs',
  component: StickyTabs,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    mainNavHeight: { control: 'text' },
    rootClassName: { control: 'text' },
    navSpacerClassName: { control: 'text' },
    sectionClassName: { control: 'text' },
    stickyHeaderContainerClassName: { control: 'text' },
    headerContentWrapperClassName: { control: 'text' },
    headerContentLayoutClassName: { control: 'text' },
    titleClassName: { control: 'text' },
    contentLayoutClassName: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof StickyTabs>;

const SampleContent = ({ title }: { title: string }) => (
  <div>
    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{title}</h3>
    {Array.from({ length: 6 }, (_, i) => (
      <p key={i} style={{ marginBottom: '1.5rem', lineHeight: 1.7, opacity: 0.7 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis
        in faucibus orci luctus et ultrices posuere cubilia curae. Praesent commodo cursus magna,
        vel scelerisque nisl consectetur et. Nullam quis risus eget urna mollis ornare vel eu leo.
      </p>
    ))}
  </div>
);

export const Default: Story = {
  args: {
    mainNavHeight: '0px',
    rootClassName: 'bg-black text-white',
    sectionClassName: 'bg-[#131313]',
  },
  render: (args) => (
    <StickyTabs {...args}>
      <StickyTabs.Item title="Design Philosophy" id="design">
        <SampleContent title="Our approach to design combines form and function." />
      </StickyTabs.Item>
      <StickyTabs.Item title="Build Process" id="build">
        <SampleContent title="From concept to completion, every step is intentional." />
      </StickyTabs.Item>
      <StickyTabs.Item title="Project Delivery" id="delivery">
        <SampleContent title="We deliver on time, on budget, and beyond expectations." />
      </StickyTabs.Item>
    </StickyTabs>
  ),
};

export const WithNavOffset: Story = {
  args: {
    mainNavHeight: '4rem',
    rootClassName: 'bg-black text-white',
    sectionClassName: 'bg-[#131313]',
  },
  render: (args) => (
    <>
      {/* Simulated nav bar */}
      <div style={{ height: '4rem', background: '#1a1a2e', display: 'flex', alignItems: 'center', padding: '0 2rem', position: 'sticky', top: 0, zIndex: 50 }}>
        <span style={{ color: 'white', fontWeight: 600 }}>Brand Logo</span>
      </div>
      <StickyTabs {...args}>
        <StickyTabs.Item title="Services" id="services">
          <SampleContent title="What we offer to our clients." />
        </StickyTabs.Item>
        <StickyTabs.Item title="Portfolio" id="portfolio">
          <SampleContent title="Selected works from our archive." />
        </StickyTabs.Item>
        <StickyTabs.Item title="Contact" id="contact">
          <SampleContent title="Get in touch with our team." />
        </StickyTabs.Item>
      </StickyTabs>
    </>
  ),
};
