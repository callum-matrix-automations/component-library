// Dependencies: (none — pure React + Tailwind)
// Source: dirt-to-keys

import { useState, ReactNode } from 'react';

export interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabbedInterfaceProps {
  tabs: Tab[];
  defaultTab?: string;
  /** CSS color for the active tab text (default: inherit) */
  activeColor?: string;
  /** CSS color for inactive tab text */
  inactiveColor?: string;
  /** CSS color for the active underline indicator */
  indicatorColor?: string;
  /** CSS color for the tab bar border */
  borderColor?: string;
}

export default function TabbedInterface({
  tabs,
  defaultTab,
  activeColor,
  inactiveColor = '#9ca3af',
  indicatorColor = '#c2994e',
  borderColor = '#e5e7eb',
}: TabbedInterfaceProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 mb-8 border-b-2" style={{ borderColor }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-semibold transition-all duration-300 relative ${
              activeTab === tab.id
                ? ''
                : 'hover:opacity-80'
            }`}
            style={{
              color: activeTab === tab.id ? activeColor : inactiveColor
            }}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div
                className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-300"
                style={{ backgroundColor: indicatorColor }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        {activeTabContent}
      </div>
    </div>
  );
}
