// Dependencies: @headlessui/react, @heroicons/react
// Source: dirt-to-keys

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface ImageLightboxProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  alt: string;
}

export default function ImageLightbox({ images, initialIndex, isOpen, onClose, alt }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setScale(1);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setScale(1);
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.5, 1));
  };

  const handleClose = () => {
    setScale(1);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[60]" onClose={handleClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/90" />
        </Transition.Child>

        {/* Lightbox Container */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full h-full max-w-7xl transform transition-all">
                {/* Controls Bar */}
                <div className="flex items-center justify-between mb-4">
                  {/* Image Counter */}
                  <div className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
                    {currentIndex + 1} / {images.length}
                  </div>

                  {/* Zoom Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleZoomOut}
                      disabled={scale <= 1}
                      className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      Zoom Out
                    </button>
                    <span className="text-white bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                      {Math.round(scale * 100)}%
                    </span>
                    <button
                      onClick={handleZoomIn}
                      disabled={scale >= 3}
                      className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      Zoom In
                    </button>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={handleClose}
                    className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-2 rounded-lg transition"
                    aria-label="Close lightbox"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>

                {/* Image Container */}
                <div className="relative h-[calc(100vh-120px)] flex items-center justify-center overflow-hidden">
                  {/* Navigation Arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevious}
                        className="absolute left-4 p-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full transition z-10"
                        aria-label="Previous image"
                      >
                        <ChevronLeftIcon className="w-8 h-8" />
                      </button>

                      <button
                        onClick={handleNext}
                        className="absolute right-4 p-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full transition z-10"
                        aria-label="Next image"
                      >
                        <ChevronRightIcon className="w-8 h-8" />
                      </button>
                    </>
                  )}

                  {/* Image with zoom */}
                  <div
                    className="relative w-full h-full cursor-move flex items-center justify-center"
                    style={{
                      transform: `scale(${scale})`,
                      transition: 'transform 0.2s ease-out',
                    }}
                  >
                    <img
                      src={images[currentIndex]}
                      alt={`${alt} ${currentIndex + 1}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>

                {/* Help Text */}
                <div className="text-center mt-4 text-white/60 text-sm">
                  Use arrow keys to navigate &bull; Pinch to zoom on mobile &bull; Click and drag to pan when zoomed
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
