import { useState } from 'react';
import { motion } from 'framer-motion';
import { MOTIVATION_QUOTES } from '../../utils/constants';

/**
 * MotivationQuote Component
 * Displays motivational quotes for users
 */
function MotivationQuote() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  const quote = MOTIVATION_QUOTES[quoteIndex];

  const handleRefresh = () => {
    setQuoteIndex((Math.random() * MOTIVATION_QUOTES.length) | 0);
  };

  return (
    <motion.div
      className="card p-4 sm:p-6 flex flex-col justify-between"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Quote */}
      <motion.div key={quoteIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <p className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-2 sm:mb-3">
          💡 {quote.text}
        </p>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 italic">
          — {quote.author}
        </p>
      </motion.div>

      {/* Refresh Button */}
      <motion.button
        onClick={handleRefresh}
        className="mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ↻ Get Another
      </motion.button>
    </motion.div>
  );
}

export default MotivationQuote;
