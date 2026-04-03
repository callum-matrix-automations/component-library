// Dependencies: framer-motion
// Source: dirt-to-keys

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ImageWithLoadingProps {
  src: string;
  alt: string;
  className?: string;
  skeletonClassName?: string;
  blurDataURL?: string;
}

export default function ImageWithLoading({
  src,
  alt,
  className = '',
  skeletonClassName = '',
  blurDataURL
}: ImageWithLoadingProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative overflow-hidden">
      {/* Skeleton Loading State */}
      {!isLoaded && !hasError && (
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 ${skeletonClassName}`}
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
      )}

      {/* Blur Placeholder (if provided) */}
      {blurDataURL && !isLoaded && !hasError && (
        <img
          src={blurDataURL}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover blur-md scale-110 ${className}`}
          aria-hidden="true"
        />
      )}

      {/* Actual Image */}
      <motion.img
        src={src}
        alt={alt}
        className={className}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />

      {/* Error State */}
      {hasError && (
        <div className={`absolute inset-0 flex items-center justify-center bg-gray-100 ${skeletonClassName}`}>
          <div className="text-center p-4">
            <svg
              className="w-12 h-12 mx-auto mb-2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm text-gray-500">Image unavailable</p>
          </div>
        </div>
      )}
    </div>
  );
}
