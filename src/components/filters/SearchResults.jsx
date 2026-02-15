import { motion, AnimatePresence } from 'framer-motion';
import { useDSA } from '../../hooks/useDSA';

/**
 * SearchResults Component
 * Display search and filter results
 */
function SearchResults() {
  const { getFilteredQuestions, searchQuery, filters } = useDSA();
  const filteredQuestions = getFilteredQuestions();

  const hasActiveFilters =
    searchQuery ||
    filters.difficulty.length > 0 ||
    filters.platform.length > 0 ||
    filters.topic.length > 0 ||
    filters.completed !== 'all';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  if (!hasActiveFilters) {
    return null;
  }

  return (
    <motion.div
      className="space-y-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Results Header */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Search Results
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Found <span className="font-semibold text-blue-600 dark:text-blue-400">{filteredQuestions.length}</span> question{filteredQuestions.length !== 1 ? 's' : ''}
          {searchQuery && ` matching "${searchQuery}"`}
        </p>

        {/* Active Filters Display */}
        {(filters.difficulty.length > 0 || filters.platform.length > 0 || filters.topic.length > 0) && (
          <div className="flex flex-wrap gap-2 mt-3">
            {filters.difficulty.map(diff => (
              <span key={diff} className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                {diff}
              </span>
            ))}
            {filters.platform.map(platform => (
              <span key={platform} className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                {platform}
              </span>
            ))}
            {filters.topic.map(topic => (
              <span key={topic} className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                {topic}
              </span>
            ))}
          </div>
        )}
      </motion.div>

      {/* Results List */}
      <AnimatePresence>
        {filteredQuestions.length > 0 ? (
          <motion.div
            className="space-y-2"
            variants={containerVariants}
          >
            {filteredQuestions.map((question) => (
              <motion.div
                key={question.id}
                variants={itemVariants}
                layout
              >
                <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-lg p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                        {question.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                          {question.topic}
                        </span>
                        <span className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                          {question.difficulty}
                        </span>
                        <span className="px-2 py-1 rounded bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                          {question.platform}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {question.completed && (
                        <span className="text-green-600 dark:text-green-400">✓</span>
                      )}
                      {question.favorite && (
                        <span className="text-yellow-500">★</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={itemVariants}
            className="text-center py-12 card"
          >
            <svg className="mx-auto w-12 h-12 text-slate-300 dark:text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-slate-600 dark:text-slate-400 font-medium mb-2">
              No questions match your search
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500">
              Try adjusting your filters or search term
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default SearchResults;
