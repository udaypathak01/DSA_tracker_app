import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useLoveBubberDSA from '../../hooks/useLoveBubberDSA';
import { loveBubberProblems } from '../../data/loveBubberSheet';

const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

/**
 * Love Bubber FilterBar Component
 * Filter problems by various criteria
 */
function LoveBubberFilterBar() {
  const { setFilters, filters } = useLoveBubberDSA();
  const [showFilters, setShowFilters] = useState(false);

  // Get unique topics from data
  const topics = [...new Set(loveBubberProblems.map(p => p.topic))].sort();

  const handleTopicChange = (topic, checked) => {
    setFilters({
      ...filters,
      topic: checked
        ? [...filters.topic, topic]
        : filters.topic.filter(t => t !== topic),
    });
  };

  const handleDifficultyChange = (difficulty, checked) => {
    setFilters({
      ...filters,
      difficulty: checked
        ? [...filters.difficulty, difficulty]
        : filters.difficulty.filter(d => d !== difficulty),
    });
  };

  const handleStatusChange = (status, checked) => {
    if (status === 'all') {
      setFilters({ ...filters, completed: 'all' });
    } else if (status === 'completed') {
      setFilters({ ...filters, completed: 'completed' });
    } else if (status === 'notCompleted') {
      setFilters({ ...filters, completed: 'notCompleted' });
    }
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
            className="bg-white dark:bg-dark-card p-4 rounded-lg border border-slate-200 dark:border-dark-border space-y-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {/* Topic Filter */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                Topics
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {topics.map(topic => (
                  <motion.label
                    key={topic}
                    className="flex items-center gap-2 cursor-pointer"
                    whileHover={{ x: 2 }}
                  >
                    <input
                      type="checkbox"
                      checked={filters.topic.includes(topic)}
                      onChange={e => handleTopicChange(topic, e.target.checked)}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">{topic}</span>
                  </motion.label>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                Difficulty
              </h4>
              <div className="flex flex-wrap gap-2">
                {DIFFICULTIES.map(diff => (
                  <motion.label
                    key={diff}
                    className="flex items-center gap-2 cursor-pointer"
                    whileHover={{ x: 2 }}
                  >
                    <input
                      type="checkbox"
                      checked={filters.difficulty.includes(diff)}
                      onChange={e => handleDifficultyChange(diff, e.target.checked)}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">{diff}</span>
                  </motion.label>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                Status
              </h4>
              <div className="flex flex-wrap gap-2">
                {['all', 'completed', 'notCompleted'].map(status => (
                  <motion.label
                    key={status}
                    className="flex items-center gap-2 cursor-pointer"
                    whileHover={{ x: 2 }}
                  >
                    <input
                      type="radio"
                      name="status"
                      checked={filters.completed === status}
                      onChange={() => handleStatusChange(status, true)}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">
                      {status === 'all' ? 'All' : status === 'completed' ? 'Completed' : 'Not Completed'}
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

export default LoveBubberFilterBar;
