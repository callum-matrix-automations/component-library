// Dependencies: framer-motion, lucide-react
// Source: dirt-to-keys

import { X, Cookie } from 'lucide-react';
import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CookieConsentProps {
  /** Content for the "Learn more" link — pass an <a> or router Link */
  learnMoreLink?: ReactNode;
  /** Custom consent message */
  message?: string;
  /** Accept button label */
  acceptLabel?: string;
  /** Decline button label */
  declineLabel?: string;
  /** CSS color for the banner background */
  backgroundColor?: string;
  /** CSS color for the accept button */
  accentColor?: string;
  /** localStorage key for persisting consent */
  storageKey?: string;
}

export default function CookieConsent({
  learnMoreLink,
  message = 'We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking "Accept", you consent to our use of cookies.',
  acceptLabel = 'Accept',
  declineLabel = 'Essential Only',
  backgroundColor = '#1a2332',
  accentColor = '#c2994e',
  storageKey = 'cookieConsent',
}: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(storageKey);
    if (!consent) {
      setIsVisible(true);
    }
  }, [storageKey]);

  const handleAccept = () => {
    localStorage.setItem(storageKey, 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(storageKey, 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50"
          style={{ backgroundColor, boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)' }}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3 flex-1 pr-4">
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
                >
                  <Cookie size={24} style={{ color: accentColor }} />
                </motion.div>

                <div>
                  <p className="text-sm leading-relaxed text-white/90">
                    {message}
                    {learnMoreLink && <span className="ml-1">{learnMoreLink}</span>}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDecline}
                  className="px-4 py-2 text-sm font-medium rounded-md transition-all text-white/90 border border-gray-500"
                >
                  {declineLabel}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAccept}
                  className="px-4 py-2 text-sm font-semibold rounded-md transition-all"
                  style={{ backgroundColor: accentColor, color: backgroundColor }}
                  animate={{
                    boxShadow: [
                      `0 0 0px ${accentColor}00`,
                      `0 0 20px ${accentColor}66`,
                      `0 0 0px ${accentColor}00`
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {acceptLabel}
                </motion.button>
                <motion.button
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleDecline}
                  className="p-2 transition-opacity"
                  aria-label="Close cookie banner"
                >
                  <X size={20} className="text-white/90" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
