// Dependencies: framer-motion
// Source: dirt-to-keys

import { Variants } from 'framer-motion';

/**
 * Icon Animation Variants Library
 * Reusable animation presets for icons throughout the application
 */

// Pulse animation - subtle breathing effect
export const pulseVariants: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Bounce animation - playful bounce effect
export const bounceVariants: Variants = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeOut'
    }
  }
};

// Spin animation - continuous rotation
export const spinVariants: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

// Hover scale - grows on hover
export const hoverScaleVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.2,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10
    }
  }
};

// Hover rotate - rotates on hover
export const hoverRotateVariants: Variants = {
  initial: { rotate: 0 },
  hover: {
    rotate: 15,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 15
    }
  }
};

// Wiggle - side to side movement
export const wiggleVariants: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: [-5, 5, -5],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatDelay: 2
    }
  }
};

// Glow pulse - for badges and notifications
export const glowPulseVariants: Variants = {
  initial: {
    boxShadow: '0 0 0px rgba(218, 165, 32, 0)'
  },
  animate: {
    boxShadow: [
      '0 0 0px rgba(218, 165, 32, 0)',
      '0 0 20px rgba(218, 165, 32, 0.6)',
      '0 0 0px rgba(218, 165, 32, 0)'
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Float animation - gentle up/down movement
export const floatVariants: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Shake - attention grabbing shake
export const shakeVariants: Variants = {
  initial: { x: 0 },
  animate: {
    x: [-3, 3, -3, 3, 0],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatDelay: 5
    }
  }
};

// Click animation - tap feedback
export const clickVariants: Variants = {
  initial: { scale: 1 },
  tap: {
    scale: 0.9,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 15
    }
  }
};

// Badge pulse - for notification badges
export const badgePulseVariants: Variants = {
  initial: { scale: 1, opacity: 1 },
  animate: {
    scale: [1, 1.1, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Smooth fade in - for lazy loaded icons
export const fadeInVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }
};

// Color shift - animated color transition (use with CSS classes)
export const colorShiftVariants: Variants = {
  initial: {},
  hover: {
    filter: 'hue-rotate(10deg) brightness(1.1)',
    transition: {
      duration: 0.3
    }
  }
};
