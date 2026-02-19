import { motion, AnimatePresence } from 'framer-motion';
import useLoveBubberDSA from '../../hooks/useLoveBubberDSA';

/**
 * Love Bubber Filters Modal Component
 * Mobile-friendly filters in a modal overlay
 */
function LoveBubberFiltersModal({
  isOpen,
  searchQuery,
  filters,
  onSearchChange,
  onFiltersChange,
  onClose,
}) {
  const { getTopics, getDifficulties } = useLoveBubberDSA();
  const topics = getTopics();
  const difficulties = getDifficulties();

  const handleTopicChange = (topic) => {
    const updated = filters.topic.includes(topic)
      ? filters.topic.filter(t => t !== topic)
      : [...filters.topic, topic];
    onFiltersChange({ ...filters, topic: updated });
  };

  const handleDifficultyChange = (difficulty) => {
    const updated = filters.difficulty.includes(difficulty)
      ? filters.difficulty.filter(d => d !== difficulty)
      : [...filters.difficulty, difficulty];
    onFiltersChange({ ...filters, difficulty: updated });
  };

  const handleCompletionChange = (value) => {
    onFiltersChange({ ...filters, completed: value });
  };

  const handleResetFilters = () => {
    onFiltersChange({
      topic: [],
      difficulty: [],
      completed: 'all',
    });
    onSearchChange('');
  };

  const hasActiveFilters =
    searchQuery || filters.topic.length > 0 || filters.difficulty.length > 0 || filters.completed !== 'all';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-dark-card rounded-t-lg md:rounded-lg shadow-xl w-full md:max-w-2xl max-h-[90vh] overflow-y-auto"
            initial={{ y: 500, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 500, opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between p-4 md:p-6 border-b border-slate-200 dark:border-dark-border bg-white dark:bg-dark-card">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                🎯 Filters
              </h2>
              <button
                onClick={onClose}
                className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                title="Close filters"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-4 md:p-6 space-y-6">
              {/* Search Bar */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  🔍 Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search problems by title or topic..."
                    value={searchQuery}
                    onChange={e => onSearchChange(e.target.value)}
                    className="w-full px-4 py-2 pl-10 rounded-lg border border-slate-200 dark:border-dark-border bg-white dark:bg-dark-card text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                  />
                  <svg
                    className="absolute left-3 top-2.5 w-5 h-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Topics Filter */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">📚 Topics</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {topics.map(topic => (
                    <label
                      key={topic}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-border cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={filters.topic.includes(topic)}
                        onChange={() => handleTopicChange(topic)}
                        className="w-4 h-4 rounded accent-blue-600"
                      />
                      <span className="text-sm text-slate-700 dark:text-slate-300 truncate">{topic}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Difficulty Filter */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">🎯 Difficulty</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {difficulties.map(difficulty => (
                    <label
                      key={difficulty}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-border cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={filters.difficulty.includes(difficulty)}
                        onChange={() => handleDifficultyChange(difficulty)}
                        className="w-4 h-4 rounded accent-blue-600"
                      />
                      <span className="text-sm text-slate-700 dark:text-slate-300">{difficulty}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Completion Status Filter */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">✅ Status</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { value: 'all', label: 'All Problems' },
                    { value: 'completed', label: 'Completed' },
                    { value: 'notCompleted', label: 'Not Completed' },
                  ].map(option => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-dark-border cursor-pointer transition-colors"
                    >
                      <input
                        type="radio"
                        name="completion"
                        value={option.value}
                        checked={filters.completed === option.value}
                        onChange={() => handleCompletionChange(option.value)}
                        className="w-4 h-4 accent-blue-600"
                      />
                      <span className="text-sm text-slate-700 dark:text-slate-300">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 flex gap-2 p-4 md:p-6 border-t border-slate-200 dark:border-dark-border bg-white dark:bg-dark-card">
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="flex-1 px-4 py-2 rounded-lg border border-slate-200 dark:border-dark-border text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-border transition-colors font-medium text-sm"
                >
                  🔄 Reset Filters
                </button>
              )}
              <button
                onClick={onClose}
                className={`flex-1 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors font-medium text-sm ${
                  hasActiveFilters ? '' : 'md:col-span-2'
                }`}
              >
                Done
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoveBubberFiltersModal;
