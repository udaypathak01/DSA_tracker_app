import { motion } from 'framer-motion';
import useLoveBubberDSA from '../../hooks/useLoveBubberDSA';

/**
 * Love Bubber Filters Component
 * Search and filtering for Love Bubber problems
 */
function LoveBubberFilters({ searchQuery, filters, onSearchChange, onFiltersChange }) {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Search Bar */}
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

      {/* Filter Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Topic Filter */}
        <div className="bg-white dark:bg-dark-card p-4 rounded-lg border border-slate-200 dark:border-dark-border">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">📚 Topics</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {topics.map(topic => (
              <label key={topic} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.topic.includes(topic)}
                  onChange={() => handleTopicChange(topic)}
                  className="w-4 h-4 rounded accent-blue-600 flex-shrink-0"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300 truncate">{topic}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Difficulty Filter */}
        <div className="bg-white dark:bg-dark-card p-4 rounded-lg border border-slate-200 dark:border-dark-border">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">🎯 Difficulty</h3>
          <div className="space-y-2">
            {difficulties.map(difficulty => (
              <label key={difficulty} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.difficulty.includes(difficulty)}
                  onChange={() => handleDifficultyChange(difficulty)}
                  className="w-4 h-4 rounded accent-blue-600 flex-shrink-0"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">{difficulty}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Completion Filter */}
        <div className="bg-white dark:bg-dark-card p-4 rounded-lg border border-slate-200 dark:border-dark-border">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">✅ Status</h3>
          <div className="space-y-2">
            {[
              { value: 'all', label: 'All Problems' },
              { value: 'completed', label: 'Completed' },
              { value: 'notCompleted', label: 'Not Completed' },
            ].map(option => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="completion"
                  value={option.value}
                  checked={filters.completed === option.value}
                  onChange={() => handleCompletionChange(option.value)}
                  className="w-4 h-4 accent-blue-600 flex-shrink-0"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Reset Button */}
      {(searchQuery || filters.topic.length > 0 || filters.difficulty.length > 0 || filters.completed !== 'all') && (
        <button
          onClick={handleResetFilters}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          Clear all filters
        </button>
      )}
    </motion.div>
  );
}

export default LoveBubberFilters;
