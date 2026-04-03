// Dependencies: framer-motion
// Source: dirt-to-keys
// Internal: hooks/use-magnetic-effect

import { motion } from 'framer-motion';
import { useMagneticEffect } from '../../../hooks/use-magnetic-effect';
import { ReactNode, ButtonHTMLAttributes } from 'react';

interface MagneticButtonWrapperProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  strength?: number;
  range?: number;
  className?: string;
  asDiv?: boolean;
}

export default function MagneticButtonWrapper({
  children,
  strength = 0.3,
  range = 80,
  className = '',
  asDiv = false,
  ...props
}: MagneticButtonWrapperProps) {
  const { ref, x, y } = useMagneticEffect({ strength, range });

  if (asDiv) {
    return (
      <motion.div
        ref={ref as any}
        style={{ x, y }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.button
      ref={ref as any}
      style={{ x, y }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}
