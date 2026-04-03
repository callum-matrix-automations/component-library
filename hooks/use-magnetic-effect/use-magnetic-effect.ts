// Dependencies: framer-motion
// Source: dirt-to-keys

import { useRef, useState, useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

interface UseMagneticEffectOptions {
  /** 0-1, how strong the magnetic pull is */
  strength?: number;
  /** pixels, how far the effect extends */
  range?: number;
  stiffness?: number;
  damping?: number;
}

export function useMagneticEffect(options: UseMagneticEffectOptions = {}) {
  const {
    strength = 0.3,
    range = 100,
    stiffness = 200,
    damping = 20
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness, damping };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < range) {
        const pullStrength = (1 - distance / range) * strength;
        const newX = distanceX * pullStrength;
        const newY = distanceY * pullStrength;

        x.set(newX);
        y.set(newY);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      x.set(0);
      y.set(0);
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [x, y, strength, range]);

  return {
    ref,
    x: springX,
    y: springY,
    isHovered
  };
}
