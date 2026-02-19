import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

/**
 * Love Bubber SearchBox Component
 * Search problems by title
 */
function LoveBubberSearchBox({ onChange }) {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onChange(value);
  };

  const handleClear = () => {
    setSearchValue('');
    onChange('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <motion.div
      className="relative z-20"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="relative group">
        <motion.svg
          className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 z-10 ${
            isFocused
              ? 'text-blue-500 dark:text-blue-400'
              : 'text-slate-400 dark:text-slate-500'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ scale: isFocused ? 1.1 : 1 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </motion.svg>

        <motion.input
          ref={inputRef}
          type="text"
          placeholder="Search problems by title..."
          value={searchValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoComplete="off"
          className="w-full pl-12 pr-10 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none transition-all duration-200 text-sm relative z-10"
          whileFocus={{
            boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
            borderColor: 'rgb(59, 130, 246)',
          }}
        />

        {/* Clear button - shown when focused and has text */}
        {isFocused && searchValue && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors z-10"
            onClick={handleClear}
            title="Clear search"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

export default LoveBubberSearchBox;
