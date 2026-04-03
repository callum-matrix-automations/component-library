// Dependencies: framer-motion
// Source: dirt-to-keys

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';
import {
  fadeInUpVariants,
  fadeInDownVariants,
  fadeInLeftVariants,
  fadeInRightVariants,
  scaleInVariants,
} from '../../../utils/animation-variants';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  delay?: number;
  threshold?: number;
  once?: boolean;
}

export default function AnimatedSection({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  threshold = 0.2,
  once = true,
}: AnimatedSectionProps) {
  const getVariants = (): Variants => {
    switch (direction) {
      case 'down':
        return fadeInDownVariants;
      case 'left':
        return fadeInLeftVariants;
      case 'right':
        return fadeInRightVariants;
      case 'scale':
        return scaleInVariants;
      case 'up':
      default:
        return fadeInUpVariants;
    }
  };

  const variants = getVariants();

  const variantsWithDelay: Variants = {
    hidden: variants.hidden,
    visible: {
      ...variants.visible,
      transition: {
        ...(variants.visible as any).transition,
        delay,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={variantsWithDelay}
    >
      {children}
    </motion.div>
  );
}
