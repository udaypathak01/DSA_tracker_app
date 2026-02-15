import { motion } from 'framer-motion';

/**
 * ResourceSearch Component
 * Search bar for filtering resources by title, creator, or topic
 */
function ResourceSearch({ searchQuery, onSearchChange, resultsCount }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="relative">
        <input
          type="text"
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-3 sm:px-5 py-2.5 sm:py-4 pl-9 sm:pl-12 bg-white dark:bg-dark-card border-2 border-slate-200 dark:border-dark-border rounded-lg sm:rounded-2xl text-xs sm:text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
        />
        <span className="absolute left-2.5 sm:left-5 top-1/2 transform -translate-y-1/2 text-base sm:text-xl">
          🔍
        </span>

        {/* Results count */}
        {searchQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-xs text-slate-500 dark:text-slate-400 font-medium"
          >
            {resultsCount}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default ResourceSearch;
