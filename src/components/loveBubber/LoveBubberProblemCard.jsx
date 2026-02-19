import { memo } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

/**
 * Love Bubber Problem Card Component
 * Matches Topics QuestionCard style with Love Bubber specific features
 */
const LoveBubberProblemCard = memo(function LoveBubberProblemCard({
  problem,
  onToggleCompletion,
  onToggleFavorite,
  onAddRevision,
  onOpenNotes,
  onOpenShare,
}) {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'Medium':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      case 'Hard':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200';
    }
  };

  const handleComplete = () => {
    onToggleCompletion(problem.id);
    const action = !problem.completed ? 'completed' : 'uncompleted';
    if (action === 'completed') {
      toast.success('Problem completed! 🎉');
    }
  };

  const handleFavorite = () => {
    onToggleFavorite(problem.id);
    const action = !problem.favorite ? 'added to' : 'removed from';
    toast.success(
      !problem.favorite
        ? 'Added to favorites! ⭐'
        : 'Removed from favorites'
    );
  };

  const handleNotes = () => {
    onOpenNotes(problem.id, problem.notes);
    if (!problem.notes) {
      toast.success('Add your notes here! 📝');
    }
  };

  const handleRevision = () => {
    onAddRevision(problem.id);
    toast.success('Revision added! 🔄');
  };

  const handleShare = () => {
    onOpenShare(problem);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-lg p-1 sm:p-2 md:p-4 flex items-center gap-1 sm:gap-2 md:gap-3 hover:shadow-md transition-shadow"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Checkbox */}
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <input
          type="checkbox"
          checked={problem.completed}
          onChange={handleComplete}
          className="w-3 sm:w-4 h-3 sm:h-4 rounded cursor-pointer flex-shrink-0 accent-blue-600"
        />
      </motion.div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-0 sm:gap-0.5 md:gap-1 flex-wrap">
          {/* Title Link */}
          <a
            href={problem.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-medium text-xs sm:text-xs md:text-sm truncate hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
              problem.completed
                ? 'text-slate-600 dark:text-slate-400 line-through'
                : 'text-slate-900 dark:text-white'
            }`}
          >
            {problem.title}
          </a>

          {/* Badges */}
          <div className="flex items-center gap-0.5 flex-wrap">
            <span className={`inline-flex items-center px-1 sm:px-1.5 py-0.5 rounded text-xs sm:text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
              {problem.difficulty}
            </span>
            <span className="inline-flex items-center px-1 sm:px-1.5 py-0.5 rounded text-xs sm:text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {problem.platform}
            </span>
            {problem.revisionCount > 0 && (
              <span className="inline-flex items-center px-1 sm:px-1.5 py-0.5 rounded text-xs sm:text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                🔄 {problem.revisionCount}
              </span>
            )}
          </div>
        </div>

        {/* Notes Preview */}
        {problem.notes && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
            📝 {problem.notes}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-0.5 ml-auto flex-shrink-0">
        {/* Notes Button */}
        <motion.button
          onClick={handleNotes}
          className="p-1 sm:p-1.5 md:p-2 rounded hover:bg-slate-100 dark:hover:bg-dark-border transition-colors text-xs sm:text-sm md:text-base"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Edit notes"
        >
          📝
        </motion.button>

        {/* Favorite Button */}
        <motion.button
          onClick={handleFavorite}
          className="p-1 sm:p-1.5 md:p-2 rounded hover:bg-slate-100 dark:hover:bg-dark-border transition-colors text-xs sm:text-sm md:text-base"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title={problem.favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {problem.favorite ? '⭐' : '☆'}
        </motion.button>

        {/* Revision Button */}
        <motion.button
          onClick={handleRevision}
          className="p-1 sm:p-1.5 md:p-2 rounded hover:bg-slate-100 dark:hover:bg-dark-border transition-colors text-xs sm:text-sm md:text-base"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Add revision"
        >
          🔄
        </motion.button>

        {/* Share Button - Only if Completed */}
        {problem.completed && (
          <motion.button
            onClick={handleShare}
            className="p-1 sm:p-1.5 md:p-2 rounded hover:bg-slate-100 dark:hover:bg-dark-border transition-colors text-xs sm:text-sm md:text-base"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Share achievement"
          >
            🎉
          </motion.button>
        )}

        {/* Link Button */}
        <motion.a
          href={problem.link}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1 sm:p-1.5 md:p-2 rounded hover:bg-slate-100 dark:hover:bg-dark-border transition-colors text-xs sm:text-sm md:text-base"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Open in new tab"
        >
          🔗
        </motion.a>
      </div>
    </motion.div>
  );
});

export default LoveBubberProblemCard;
