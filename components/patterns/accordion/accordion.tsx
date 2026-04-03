// Dependencies: framer-motion, lucide-react
// Source: dirt-to-keys

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  item: AccordionItem;
  /** CSS color for active/hover state (default: #c2994e) */
  activeColor?: string;
  /** CSS color for text (default: #1a1a1a) */
  textColor?: string;
  /** CSS color for answer text (default: #6b7280) */
  answerColor?: string;
}

export default function Accordion({
  item,
  activeColor = '#c2994e',
  textColor = '#1a1a1a',
  answerColor = '#6b7280',
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border-b border-gray-200"
      initial={false}
      animate={{
        backgroundColor: isOpen ? `${activeColor}08` : 'transparent'
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left group"
        aria-expanded={isOpen}
        whileHover={{ x: 4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <h3
          className="text-lg font-semibold pr-4"
          style={{ color: textColor, fontWeight: 600, fontSize: '17px' }}
        >
          <motion.span
            className="inline-block"
            animate={{ color: isOpen ? activeColor : textColor }}
            whileHover={{ color: activeColor }}
            transition={{ duration: 0.2 }}
          >
            {item.question}
          </motion.span>
        </h3>
        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
            scale: isOpen ? 1.1 : 1,
            color: isOpen ? activeColor : textColor
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="flex-shrink-0"
        >
          <ChevronDown size={22} />
        </motion.div>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: {
                height: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] },
                opacity: { duration: 0.25, delay: 0.1 }
              }
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] },
                opacity: { duration: 0.2 }
              }
            }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              exit={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="pb-6 pt-2 leading-relaxed whitespace-pre-line"
              style={{ color: answerColor, fontSize: '16px', lineHeight: '1.6' }}
            >
              {item.answer}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
