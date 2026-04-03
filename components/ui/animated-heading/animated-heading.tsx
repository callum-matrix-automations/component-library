// Dependencies: framer-motion
// Source: dirt-to-keys

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { headingVariants } from '../../../utils/animation-variants';

interface AnimatedHeadingProps {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  threshold?: number;
  once?: boolean;
}

export default function AnimatedHeading({
  children,
  as: Tag = 'h2',
  className = '',
  style,
  delay = 0,
  threshold = 0.3,
  once = true,
}: AnimatedHeadingProps) {
  const variantsWithDelay = {
    hidden: headingVariants.hidden,
    visible: {
      ...headingVariants.visible,
      transition: {
        ...(headingVariants.visible as any).transition,
        delay,
      },
    },
  };

  const MotionTag = motion[Tag] as typeof motion.h2;

  return (
    <MotionTag
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={variantsWithDelay}
    >
      {children}
    </MotionTag>
  );
}
