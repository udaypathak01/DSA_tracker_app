import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDSA } from '../../hooks/useDSA';
import { PLATFORMS, DIFFICULTIES } from '../../utils/constants';

/**
 * FilterBar Component
 * Filter questions by various criteria
 */
function FilterBar() {
  const { updateFilters, getTopics, filters } = useDSA();
  const [showFilters, setShowFilters] = useState(false);
  const topics = getTopics();

  const handleTopicChange = (topic, checked) => {
    updateFilters({
      topic: checked
        ? [...filters.topic, topic]
        : filters.topic.filter(t => t !== topic),
    });
  };

  const handleDifficultyChange = (difficulty, checked) => {
    updateFilters({
      difficulty: checked
        ? [...filters.difficulty, difficulty]
        : filters.difficulty.filter(d => d !== difficulty),
    });
  };

  const handlePlatformChange = (platform, checked) => {
    updateFilters({
      platform: checked
        ? [...filters.platform, platform]
        : filters.platform.filter(p => p !== platform),
    });
  };

  return (
    <motion.div className="space-y-3">
      {/* Filter Toggle */}
      <motion.button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-dark-border hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-medium"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>🔽</span>
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </motion.button>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            className="card p-4 space-y-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {/* Difficulty Filter */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                Difficulty
              </h4>
              <div className="flex flex-wrap gap-2">
                {DIFFICULTIES.map((diff) => (
                  <motion.label
                    key={diff}
                    className="flex items-center gap-2 cursor-pointer"
                    whileHover={{ x: 2 }}
                  >
                    <input
                      type="checkbox"
                      checked={filters.difficulty.includes(diff)}
                      onChange={(e) => handleDifficultyChange(diff, e.target.checked)}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">{diff}</span>
                  </motion.label>
                ))}
              </div>
            </div>

            {/* Platform Filter */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                Platform
              </h4>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map((platform) => (
                  <motion.label
                    key={platform}
                    className="flex items-center gap-2 cursor-pointer"
                    whileHover={{ x: 2 }}
                  >
                    <input
                      type="checkbox"
                      checked={filters.platform.includes(platform)}
                      onChange={(e) => handlePlatformChange(platform, e.target.checked)}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">
                      {platform}
                    </span>
                  </motion.label>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default FilterBar;
