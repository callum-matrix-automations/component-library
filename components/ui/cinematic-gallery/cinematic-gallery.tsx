// Dependencies: framer-motion
// Source: dirt-to-keys

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export interface CinematicGalleryImage {
  id: string;
  src: string;
  alt: string;
}

interface CinematicGalleryProps {
  images: CinematicGalleryImage[];
  title?: string;
  description?: string;
  /** Width of each image card in px (default: 493) */
  imageWidth?: number;
  /** Height of each image card in px (default: 550) */
  imageHeight?: number;
  /** Total container height in px (default: 660) */
  containerHeight?: number;
  /** Auto-scroll speed in px per frame (default: 1) */
  autoScrollSpeed?: number;
}

const CinematicGallery: React.FC<CinematicGalleryProps> = ({
  images,
  title,
  description,
  imageWidth = 493,
  imageHeight = 550,
  containerHeight = 660,
  autoScrollSpeed = 1,
}) => {
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isAnimatingJump, setIsAnimatingJump] = useState<boolean>(false);
  const [targetScrollPosition, setTargetScrollPosition] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const scrollPositionRef = useRef<number>(0);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const animationStartRef = useRef<number>(0);
  const animationDurationRef = useRef<number>(0);

  const jumpAnimationDuration = 600;
  const inactivityTimeout = 3000;
  const imageMargin = 16;
  const imagesToJump = 4;

  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  };

  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = setTimeout(() => {
      setIsPaused(false);
      setIsAnimatingJump(false);
      setTargetScrollPosition(null);
    }, inactivityTimeout);
  };

  const handleScrollButtonClick = (direction: 'left' | 'right') => {
    if (isAnimatingJump) return;

    setIsPaused(true);
    setIsAnimatingJump(true);

    const jumpDistance = (imageWidth + imageMargin * 2) * imagesToJump;

    animationStartRef.current = performance.now();
    animationDurationRef.current = jumpAnimationDuration;

    if (direction === 'right') {
      setTargetScrollPosition(scrollPositionRef.current + jumpDistance);
    } else {
      setTargetScrollPosition(scrollPositionRef.current - jumpDistance);
    }

    resetInactivityTimer();
  };

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let startPosition = scrollPositionRef.current;

    const animate = (timestamp: number) => {
      if (scrollContainerRef.current) {
        if (isAnimatingJump && targetScrollPosition !== null) {
          const elapsed = timestamp - animationStartRef.current;
          const progress = Math.min(elapsed / animationDurationRef.current, 1);
          const easedProgress = easeOutCubic(progress);

          const totalDistance = targetScrollPosition - startPosition;
          scrollPositionRef.current = startPosition + (totalDistance * easedProgress);

          if (progress >= 1) {
            scrollPositionRef.current = targetScrollPosition;
            setIsAnimatingJump(false);
            setTargetScrollPosition(null);
          }
        } else if (!isPaused) {
          scrollPositionRef.current += autoScrollSpeed;
        }

        const scrollContent = scrollContainerRef.current.firstChild as HTMLElement;
        if (scrollContent) {
          const contentWidth = scrollContent.offsetWidth / 2;

          if (scrollPositionRef.current >= contentWidth) {
            const offset = scrollPositionRef.current - contentWidth;
            scrollPositionRef.current = offset;
            startPosition = startPosition - contentWidth;
            if (targetScrollPosition !== null) {
              setTargetScrollPosition(targetScrollPosition - contentWidth);
            }
          }
          if (scrollPositionRef.current < 0) {
            const offset = scrollPositionRef.current + contentWidth;
            scrollPositionRef.current = offset;
            startPosition = startPosition + contentWidth;
            if (targetScrollPosition !== null) {
              setTargetScrollPosition(targetScrollPosition + contentWidth);
            }
          }

          scrollContent.style.transform = `translateX(-${scrollPositionRef.current}px)`;
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    if (isAnimatingJump) {
      startPosition = scrollPositionRef.current;
    }

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPaused, isAnimatingJump, targetScrollPosition, autoScrollSpeed]);

  return (
    <section className="cinematic-gallery-section w-full py-12 overflow-y-hidden">
      {(title || description) && (
        <div className="container mx-auto px-4 mb-8">
          {title && (
            <h2 className="text-4xl font-bold mb-4">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-lg text-gray-500 max-w-3xl">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="relative w-full overflow-x-hidden overflow-y-hidden group">
        <div
          className="absolute inset-0"
          style={{
            height: `${containerHeight}px`,
            background: '#2a2a2a'
          }}
        />

        {/* Left Scroll Button */}
        <motion.button
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-4 shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
          onClick={() => handleScrollButtonClick('left')}
          aria-label="Scroll left"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          style={{ pointerEvents: 'auto' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </motion.button>

        {/* Right Scroll Button */}
        <motion.button
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-4 shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
          onClick={() => handleScrollButtonClick('right')}
          aria-label="Scroll right"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          style={{ pointerEvents: 'auto' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </motion.button>

        {/* Custom Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="relative flex items-center overflow-hidden"
          style={{ height: `${containerHeight}px` }}
        >
          <motion.div
            className="flex items-center"
            style={{
              willChange: 'transform',
              pointerEvents: isAnimatingJump ? 'none' : 'auto'
            }}
            animate={{ scale: isAnimatingJump ? 0.98 : 1 }}
            transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
          >
            {[...images, ...images].map((image, index) => (
              <div
                key={`${image.id}-${index}`}
                className="mx-4 overflow-hidden flex items-center justify-center flex-shrink-0"
                style={{ height: `${imageHeight}px` }}
              >
                <div
                  className="flex-shrink-0 relative rounded-xl overflow-hidden"
                  style={{
                    width: `${imageWidth}px`,
                    height: `${imageHeight}px`,
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        .cinematic-gallery-section .overflow-y-hidden {
          overflow-y: hidden !important;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .cinematic-gallery-section .overflow-y-hidden::-webkit-scrollbar {
          display: none;
        }
        .cinematic-gallery-section .overflow-x-hidden {
          overflow-x: hidden !important;
        }
        .cinematic-gallery-section {
          overflow-x: hidden !important;
        }
      `}</style>
    </section>
  );
};

export default CinematicGallery;
