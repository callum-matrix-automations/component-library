// Dependencies: framer-motion
// Source: dirt-to-keys

import { motion } from 'framer-motion';

interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

export default function SkeletonText({ lines = 3, className = '' }: SkeletonTextProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <motion.div
          key={index}
          className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded"
          animate={{
            backgroundPosition: ['0% 0%', '100% 0%', '0% 0%']
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
            delay: index * 0.1
          }}
          style={{
            backgroundSize: '200% 100%',
            width: index === lines - 1 ? '75%' : '100%'
          }}
        />
      ))}
    </div>
  );
}
