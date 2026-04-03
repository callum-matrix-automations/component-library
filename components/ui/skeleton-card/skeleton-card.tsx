// Dependencies: framer-motion
// Source: dirt-to-keys

import { motion } from 'framer-motion';

interface SkeletonCardProps {
  className?: string;
}

export default function SkeletonCard({ className = '' }: SkeletonCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm border overflow-hidden ${className}`}>
      {/* Image Skeleton */}
      <motion.div
        className="h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
        animate={{
          backgroundPosition: ['0% 0%', '100% 0%', '0% 0%']
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear'
        }}
        style={{
          backgroundSize: '200% 100%'
        }}
      />

      {/* Content Skeleton */}
      <div className="p-6 space-y-3">
        {/* Title */}
        <motion.div
          className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded"
          animate={{
            backgroundPosition: ['0% 0%', '100% 0%', '0% 0%']
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
            delay: 0.1
          }}
          style={{
            backgroundSize: '200% 100%',
            width: '75%'
          }}
        />

        {/* Description Lines */}
        <motion.div
          className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded"
          animate={{
            backgroundPosition: ['0% 0%', '100% 0%', '0% 0%']
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
            delay: 0.2
          }}
          style={{
            backgroundSize: '200% 100%',
            width: '100%'
          }}
        />

        <motion.div
          className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded"
          animate={{
            backgroundPosition: ['0% 0%', '100% 0%', '0% 0%']
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
            delay: 0.3
          }}
          style={{
            backgroundSize: '200% 100%',
            width: '90%'
          }}
        />

        {/* Button/Link */}
        <motion.div
          className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mt-4"
          animate={{
            backgroundPosition: ['0% 0%', '100% 0%', '0% 0%']
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
            delay: 0.4
          }}
          style={{
            backgroundSize: '200% 100%',
            width: '40%'
          }}
        />
      </div>
    </div>
  );
}
