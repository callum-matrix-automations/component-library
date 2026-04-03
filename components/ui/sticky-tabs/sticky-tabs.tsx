// Dependencies: clsx
// Source: cutting-edge-homes

"use client"

import React, { Children, isValidElement } from 'react';
import clsx from 'clsx';

/* ─── StickyTabItem (declarative child) ──────────────────────────────────── */

interface StickyTabItemProps {
  /** Heading text rendered in the sticky header */
  title: string;
  /** Unique identifier for this tab section */
  id: string | number;
  children: React.ReactNode;
}

const StickyTabItem: React.FC<StickyTabItemProps> = () => {
  return null; // Rendering is handled by the parent StickyTabs
};

/* ─── StickyTabs (compound component) ────────────────────────────────────── */

interface StickyTabsProps {
  children: React.ReactNode;
  /** Height of the site's main navigation bar, used to offset sticky positioning (default: "6em") */
  mainNavHeight?: string;
  /** Class for the outer wrapper (default: "bg-black text-white") */
  rootClassName?: string;
  /** Class for the spacer that accounts for the main nav (default: "border-b border-white/15 bg-black") */
  navSpacerClassName?: string;
  /** Class for each section container (default: "bg-[#131313]") */
  sectionClassName?: string;
  /** Class for the sticky header outer container (default: "shadow-lg") */
  stickyHeaderContainerClassName?: string;
  /** Class for the sticky header inner wrapper (default: "border-b border-t border-white/15 bg-black") */
  headerContentWrapperClassName?: string;
  /** Class for the sticky header layout container (default: "mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8") */
  headerContentLayoutClassName?: string;
  /** Class for the section title in the sticky header (default: "my-0 text-2xl font-medium leading-none md:text-3xl lg:text-4xl") */
  titleClassName?: string;
  /** Class for the section content layout container (default: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8") */
  contentLayoutClassName?: string;
}

const StickyTabs: React.FC<StickyTabsProps> & { Item: React.FC<StickyTabItemProps> } = ({
  children,
  mainNavHeight = '6em',
  rootClassName = "bg-black text-white",
  navSpacerClassName = "border-b border-white/15 bg-black",
  sectionClassName = "bg-[#131313]",
  stickyHeaderContainerClassName = "shadow-lg",
  headerContentWrapperClassName = "border-b border-t border-white/15 bg-black",
  headerContentLayoutClassName = "mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8",
  titleClassName = "my-0 text-2xl font-medium leading-none md:text-3xl lg:text-4xl",
  contentLayoutClassName = "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8",
}) => {
  const stickyTopValue = `calc(${mainNavHeight} - 1px)`;
  const navHeightStyle = { height: mainNavHeight };
  const stickyHeaderStyle = { top: stickyTopValue };

  return (
    <div className={clsx("overflow-clip", rootClassName)}>
      {/* Spacer matching the main nav height so sticky headers clear it */}
      <div
        className={clsx("sticky left-0 top-0 z-20 w-full", navSpacerClassName)}
        style={navHeightStyle}
        aria-hidden="true"
      />

      {Children.map(children, (child) => {
        if (!isValidElement(child) || child.type !== StickyTabItem) {
          if (process.env.NODE_ENV === 'development' && child != null) {
            console.warn('StickyTabs expects <StickyTabs.Item> components as direct children.');
          }
          return null;
        }

        const itemElement = child as React.ReactElement<StickyTabItemProps>;
        const { title, id, children: itemContent } = itemElement.props;

        return (
          <section
            key={id}
            className={clsx("relative overflow-clip", sectionClassName)}
          >
            {/* Sticky header */}
            <div
              className={clsx("sticky z-10 -mt-px flex flex-col", stickyHeaderContainerClassName)}
              style={stickyHeaderStyle}
            >
              <div className={clsx(headerContentWrapperClassName)}>
                <div className={clsx(headerContentLayoutClassName)}>
                  <div className="flex items-center justify-between">
                    <h2 className={clsx(titleClassName)}>{title}</h2>
                  </div>
                </div>
              </div>
            </div>

            {/* Section content */}
            <div className={clsx(contentLayoutClassName)}>
              {itemContent}
            </div>
          </section>
        );
      })}
    </div>
  );
};

StickyTabs.Item = StickyTabItem;

export default StickyTabs;
