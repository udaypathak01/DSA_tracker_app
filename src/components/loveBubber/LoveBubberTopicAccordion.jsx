import { motion, AnimatePresence } from 'framer-motion';
import LoveBubberProblemCard from './LoveBubberProblemCard';

/**
 * Love Bubber Topic Accordion Component
 * Collapsible topic section with problems
 */
function LoveBubberTopicAccordion({
  topic,
  problems,
  isExpanded,
  onToggle,
  onToggleCompletion,
  onToggleFavorite,
  onAddRevision,
  onOpenNotes,
  onOpenShare,
}) {
  const completedCount = problems.filter(p => p.completed).length;
  const progress = Math.round((completedCount / problems.length) * 100);

  return (
    <motion.div className="overflow-hidden border border-slate-200 dark:border-dark-border rounded-lg bg-white dark:bg-dark-card">
      {/* Header */}
      <motion.button
        onClick={onToggle}
        className="w-full px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-dark-border/50 transition-colors"
        whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
      >
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 text-left min-w-0">
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-slate-600 dark:text-slate-400 flex-shrink-0 text-base sm:text-lg"
          >
            ▶
          </motion.div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base truncate">
              {topic}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {completedCount} of {problems.length} completed
            </p>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <div className="w-10 sm:w-12 md:w-16 bg-slate-200 dark:bg-dark-border rounded-full h-1.5 sm:h-2">
              <motion.div
                className="bg-green-600 h-1.5 sm:h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-xs sm:text-sm font-bold text-green-600 dark:text-green-400 w-8 text-right">
              {progress}%
            </span>
          </div>
        </div>
      </motion.button>

      {/* Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="border-t border-slate-200 dark:border-dark-border"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-2 sm:p-3 md:p-4 space-y-2 sm:space-y-3">
              {problems.map(problem => (
                <LoveBubberProblemCard
                  key={problem.id}
                  problem={problem}
                  onToggleCompletion={onToggleCompletion}
                  onToggleFavorite={onToggleFavorite}
                  onAddRevision={onAddRevision}
                  onOpenNotes={onOpenNotes}
                  onOpenShare={onOpenShare}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default LoveBubberTopicAccordion;
