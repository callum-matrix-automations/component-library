// Dependencies: framer-motion
// Source: dirt-to-keys

import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
  /** CSS color for active dot/title (default: #c2994e) */
  activeColor?: string;
  /** CSS color for inactive title text (default: #6b7280) */
  inactiveColor?: string;
  /** Gradient colors for the progress line [start, middle, end] */
  lineGradient?: [string, string, string];
}

export const Timeline = ({
  data,
  activeColor = '#c2994e',
  inactiveColor = '#6b7280',
  lineGradient = ['#b45309', '#c2994e', '#6b8a6b'],
}: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set());
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  useEffect(() => {
    const handleScroll = () => {
      const newActiveIndices = new Set<number>();

      itemRefs.current.forEach((itemRef, index) => {
        if (itemRef) {
          const rect = itemRef.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.6) {
            newActiveIndices.add(index);
            setVisibleIndices(prev => new Set(prev).add(index));
          }
        }
      });

      setActiveIndices(newActiveIndices);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full font-sans" ref={containerRef}>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => {
          const isActive = activeIndices.has(index);
          const isVisible = visibleIndices.has(index);
          return (
            <motion.div
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              className="flex justify-start pt-[2.875rem] md:pt-[11.5rem] md:gap-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                <motion.div className="h-10 absolute left-3 md:left-3 w-10 rounded-full flex items-center justify-center bg-white">
                  <motion.div
                    className="h-4 w-4 rounded-full border-2 p-2"
                    animate={{
                      backgroundColor: isActive ? activeColor : 'white',
                      scale: isActive ? [1, 1.3, 1] : 1,
                    }}
                    transition={{
                      backgroundColor: { duration: 0.5 },
                      scale: { duration: 0.5, ease: "easeOut" }
                    }}
                    style={{ borderColor: activeColor }}
                  />
                </motion.div>
                <motion.h4
                  className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold"
                  animate={{
                    color: isActive ? activeColor : inactiveColor,
                    opacity: isActive ? 1 : 0.3,
                    scale: isActive ? [1, 1.05, 1] : 1
                  }}
                  transition={{
                    duration: 0.5,
                    scale: { duration: 0.5, ease: "easeOut" }
                  }}
                >
                  {item.title}
                </motion.h4>
              </div>

              <div className="relative pl-20 pr-4 md:pl-4 w-full text-[115%]">
                <motion.h4
                  className="md:hidden block text-2xl mb-4 text-left font-bold"
                  animate={{
                    color: isActive ? activeColor : inactiveColor,
                    opacity: isActive ? 1 : 0.3,
                    scale: isActive ? [1, 1.05, 1] : 1
                  }}
                  transition={{
                    duration: 0.5,
                    scale: { duration: 0.5, ease: "easeOut" }
                  }}
                >
                  {item.title}
                </motion.h4>
                {item.content}
              </div>
            </motion.div>
          );
        })}
        <div
          style={{ height: height + "px" }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px]"
        >
          <div className="absolute inset-0 w-[2px] bg-gray-200" />
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
              background: `linear-gradient(to bottom, ${lineGradient[0]} 0%, ${lineGradient[1]} 50%, ${lineGradient[2]} 100%)`
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
