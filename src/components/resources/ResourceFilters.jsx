import { motion } from 'framer-motion';
import { getAllTopics, getResourceTypes } from '../../data/resources';

/**
 * ResourceFilters Component
 * Filter options for resources
 */
function ResourceFilters({ filters, onFiltersChange, onClearFilters, hasActiveFilters }) {
  const topics = getAllTopics();
  const types = getResourceTypes();
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const handleTopicToggle = (topic) => {
    const newTopics = filters.topic.includes(topic)
      ? filters.topic.filter((t) => t !== topic)
      : [...filters.topic, topic];
    onFiltersChange({ ...filters, topic: newTopics });
  };

  const handleTypeToggle = (type) => {
    const newTypes = filters.type.includes(type)
      ? filters.type.filter((t) => t !== type)
      : [...filters.type, type];
    onFiltersChange({ ...filters, type: newTypes });
  };

  const handleLevelToggle = (level) => {
    const newLevels = filters.level.includes(level)
      ? filters.level.filter((l) => l !== level)
      : [...filters.level, level];
    onFiltersChange({ ...filters, level: newLevels });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-2 sm:space-y-4"
    >
      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <motion.button
          variants={itemVariants}
          onClick={onClearFilters}
          className="w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-lg font-medium text-xs sm:text-sm transition-colors border border-amber-200 dark:border-amber-800"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          ✕ Clear All Filters
        </motion.button>
      )}

      {/* Difficulty Level Filter */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-dark-card p-3 sm:p-4 rounded-lg border border-slate-200 dark:border-dark-border">
        <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 flex items-center gap-2">
          📊 Level
        </h3>
        <div className="space-y-1.5 sm:space-y-2">
          {levels.map((level) => (
            <label key={level} className="flex items-center gap-2.5 sm:gap-3 cursor-pointer p-1 rounded hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <input
                type="checkbox"
                checked={filters.level.includes(level)}
                onChange={() => handleLevelToggle(level)}
                className="w-4 h-4 sm:w-5 sm:h-5 rounded accent-blue-600 cursor-pointer"
              />
              <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {level === 'Beginner' && '🟢'}
                {level === 'Intermediate' && '🟡'}
                {level === 'Advanced' && '🔴'} {level}
              </span>
            </label>
          ))}
        </div>
      </motion.div>

      {/* Type Filter */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-dark-card p-3 sm:p-4 rounded-lg border border-slate-200 dark:border-dark-border">
        <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 flex items-center gap-2">
          🏷️ Type
        </h3>
        <div className="space-y-1.5 sm:space-y-2 max-h-40 sm:max-h-48 overflow-y-auto">
          {types.map((type) => (
            <label key={type} className="flex items-center gap-2.5 sm:gap-3 cursor-pointer p-1 rounded hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <input
                type="checkbox"
                checked={filters.type.includes(type)}
                onChange={() => handleTypeToggle(type)}
                className="w-4 h-4 sm:w-5 sm:h-5 rounded accent-blue-600 cursor-pointer"
              />
              <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">{type}</span>
            </label>
          ))}
        </div>
      </motion.div>

      {/* Topic Filter */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-dark-card p-3 sm:p-4 rounded-lg border border-slate-200 dark:border-dark-border">
        <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 flex items-center gap-2">
          🎯 Topic
        </h3>
        <div className="space-y-1.5 sm:space-y-2 max-h-48 sm:max-h-64 overflow-y-auto">
          {topics.map((topic) => (
            <label key={topic} className="flex items-center gap-2.5 sm:gap-3 cursor-pointer p-1 rounded hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <input
                type="checkbox"
                checked={filters.topic.includes(topic)}
                onChange={() => handleTopicToggle(topic)}
                className="w-4 h-4 sm:w-5 sm:h-5 rounded accent-blue-600 cursor-pointer"
              />
              <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">{topic}</span>
            </label>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ResourceFilters;
