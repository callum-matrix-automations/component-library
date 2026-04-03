// Dependencies: framer-motion
// Source: dirt-to-keys

import { motion, useScroll, useSpring } from 'framer-motion';

interface ScrollProgressProps {
  /** CSS color for the progress bar (default: currentColor) */
  color?: string;
  /** Height in pixels (default: 5) */
  height?: number;
  /** Position: top or bottom of viewport */
  position?: 'top' | 'bottom';
}

export default function ScrollProgress({
  color = '#c2994e',
  height = 5,
  position = 'bottom',
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: '0%',
        position: 'fixed',
        [position]: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: `${height}px`,
        backgroundColor: color,
        zIndex: 999999,
        pointerEvents: 'none',
      }}
    />
  );
}
