import { motion, AnimatePresence } from 'framer-motion';
import useLoveBubberDSA from '../../hooks/useLoveBubberDSA';
import LoveBubberProblemCard from './LoveBubberProblemCard';

/**
 * Love Bubber SearchResults Component
 * Display search and filter results with problem cards
 */
function LoveBubberSearchResults({
  filteredProblems,
  searchQuery,
  filters,
  onToggleCompletion,
  onToggleFavorite,
  onAddRevision,
  onOpenNotes,
  onOpenShare,
}) {
  const { searchQuery: hookSearchQuery, filters: hookFilters } = useLoveBubberDSA();

  // Use props if provided, otherwise fall back to hook
  const displaySearchQuery = searchQuery !== undefined ? searchQuery : hookSearchQuery;
  const displayFilters = filters !== undefined ? filters : hookFilters;
  const displayProblems = filteredProblems !== undefined ? filteredProblems : [];

  const hasActiveFilters =
    displaySearchQuery ||
    displayFilters.difficulty.length > 0 ||
    displayFilters.topic.length > 0 ||
    displayFilters.completed !== 'all';

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
      <motion.div variants={itemVariants} className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Search Results
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Found <span className="font-semibold text-blue-600 dark:text-blue-400">{displayProblems.length}</span> problem{displayProblems.length !== 1 ? 's' : ''}
          {displaySearchQuery && ` matching "${displaySearchQuery}"`}
        </p>

        {/* Active Filters Display */}
        {(displayFilters.difficulty.length > 0 || displayFilters.topic.length > 0) && (
          <div className="flex flex-wrap gap-2 mt-3">
            {displayFilters.difficulty.map(diff => (
              <span key={diff} className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                {diff}
              </span>
            ))}
            {displayFilters.topic.map(topic => (
              <span key={topic} className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                {topic}
              </span>
            ))}
            {displayFilters.completed !== 'all' && (
              <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                {displayFilters.completed === 'completed' ? 'Completed' : 'Not Completed'}
              </span>
            )}
          </div>
        )}
      </motion.div>

      {/* Results List */}
      <AnimatePresence>
        {displayProblems.length > 0 ? (
          <motion.div
            className="space-y-3"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {displayProblems.map(problem => (
              <motion.div key={problem.id} variants={itemVariants}>
                <LoveBubberProblemCard
                  problem={problem}
                  onToggleCompletion={onToggleCompletion}
                  onToggleFavorite={onToggleFavorite}
                  onAddRevision={onAddRevision}
                  onOpenNotes={onOpenNotes}
                  onOpenShare={onOpenShare}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={itemVariants}
            className="p-6 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center"
          >
            <p className="text-slate-600 dark:text-slate-400">
              No problems match your search. Try adjusting your filters.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default LoveBubberSearchResults;
