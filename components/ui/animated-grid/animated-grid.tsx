// Dependencies: framer-motion
// Source: dirt-to-keys

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { staggerContainerVariants, staggerItemVariants } from '../../../utils/animation-variants';

interface AnimatedGridProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  childrenDelay?: number;
  threshold?: number;
  once?: boolean;
}

export default function AnimatedGrid({
  children,
  className = '',
  staggerDelay = 0.1,
  childrenDelay = 0.2,
  threshold = 0.1,
  once = true,
}: AnimatedGridProps) {
  const containerVariants = {
    hidden: staggerContainerVariants.hidden,
    visible: {
      ...staggerContainerVariants.visible,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: childrenDelay,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}

export { staggerItemVariants };
