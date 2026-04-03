// Dependencies: react-countup
// Source: dirt-to-keys

import { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  separator?: string;
}

export default function AnimatedCounter({
  end,
  duration = 2.5,
  prefix = '',
  suffix = '',
  decimals = 0,
  separator = ','
}: AnimatedCounterProps) {
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={counterRef}>
      {isVisible ? (
        <CountUp
          end={end}
          duration={duration}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
          separator={separator}
        />
      ) : (
        <span>{prefix}0{suffix}</span>
      )}
    </div>
  );
}
