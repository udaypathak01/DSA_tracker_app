import { memo } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useDSA } from '../../hooks/useDSA';
import { DIFFICULTY_COLORS, PLATFORM_COLORS, TOAST_MESSAGES } from '../../utils/constants';
import { hasVideoSolution, getVideoSolution } from '../../data/videoSolutions';

/**
 * QuestionCard Component
 * Individual question card with actions
 */
const QuestionCard = memo(function QuestionCard({ question }) {
  const { toggleComplete, toggleFavorite, updateNotes, setShowModal, setEditingQuestion, openShareModal } =
    useDSA();

  const handleComplete = () => {
    toggleComplete(question.id);
    const action = !question.completed ? 'completed' : 'uncompleted';
    if (action === 'completed') {
      toast.success(TOAST_MESSAGES.QUESTION_COMPLETED);
    }
  };

  const handleFavorite = () => {
    toggleFavorite(question.id);
    const action = !question.favorite ? 'added to' : 'removed from';
    toast.success(
      !question.favorite
        ? TOAST_MESSAGES.FAVORITE_ADDED
        : TOAST_MESSAGES.FAVORITE_REMOVED
    );
  };

  const handleNotes = () => {
    setEditingQuestion(question);
    setShowModal((prev) => ({ ...prev, notes: true }));
  };

  const handleShare = () => {
    if (question.completed) {
      openShareModal(question.id);
    } else {
      toast.error('Mark problem as completed first! ✓');
    }
  };

  const handleVideoSolution = () => {
    const videoUrl = getVideoSolution(question.id);
    if (videoUrl) {
      window.open(videoUrl, '_blank');
      toast.success('Opening video solution...');
    } else {
      toast.error('No video solution available for this question');
    }
  };

  return (
    <motion.div
      className="bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-lg p-1 sm:p-2 md:p-4 flex items-center gap-1 sm:gap-2 md:gap-3 hover:shadow-md transition-shadow"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Checkbox */}
      <motion.input
        type="checkbox"
        checked={question.completed}
        onChange={handleComplete}
        className="w-3 sm:w-4 h-3 sm:h-4 rounded cursor-pointer flex-shrink-0"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-0 sm:gap-0.5 md:gap-1 flex-wrap">
          <a
            href={question.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-medium text-xs sm:text-xs md:text-sm truncate hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
              question.completed
                ? 'text-slate-600 dark:text-slate-400 line-through'
                : 'text-slate-900 dark:text-white'
            }`}
          >
            {question.title}
          </a>

          {/* Badges */}
          <div className="flex items-center gap-0.5 flex-wrap">
            <span className={`inline-flex items-center px-1 sm:px-1.5 py-0.5 rounded text-xs sm:text-xs font-medium ${DIFFICULTY_COLORS[question.difficulty]}`}>
              {question.difficulty}
            </span>
            <span className={`inline-flex items-center px-1 sm:px-1.5 py-0.5 rounded text-xs sm:text-xs font-medium ${PLATFORM_COLORS[question.platform]}`}>
              {question.platform}
            </span>
          </div>
        </div>

        {/* Company Tags */}
        {/* {question.companies && question.companies.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap mt-2">
            {question.companies.slice(0, 3).map((company, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                title={company}
              >
                🏢 {company}
              </span>
            ))}
            {question.companies.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                +{question.companies.length - 3} more
              </span>
            )}
          </div>
      )}

        {/* Notes Preview */}
        {question.notes && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
            📝 {question.notes}
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
          title="Add notes"
        >
          📝
        </motion.button>

        {/* Favorite Button */}
        <motion.button
          onClick={handleFavorite}
          className="p-1 sm:p-1.5 md:p-2 rounded hover:bg-slate-100 dark:hover:bg-dark-border transition-colors text-xs sm:text-sm md:text-base"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {question.favorite ? '⭐' : '☆'}
        </motion.button>

        {/* Video Solution Button (if available) */}
        {hasVideoSolution(question.id) && (
          <motion.div
            className="relative group"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.button
              onClick={handleVideoSolution}
              className="p-1 sm:p-1.5 md:p-2 rounded hover:bg-gradient-to-r hover:from-blue-100 hover:to-cyan-100 dark:hover:from-blue-900 dark:hover:to-cyan-900 transition-all text-xs sm:text-sm md:text-base"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              title="Watch video solution"
            >
              📺
            </motion.button>
            {/* Solution Available Badge */}
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse"></span>
          </motion.div>
        )}

        {/* Share Button (only show if completed) */}
        {question.completed && (
          <motion.button
            onClick={handleShare}
            className="p-1 sm:p-1.5 md:p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors text-xs sm:text-sm md:text-base"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Share achievement"
          >
            🎉
          </motion.button>
        )}

        {/* Link Button */}
        <motion.a
          href={question.link}
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

QuestionCard.propTypes = {
  question: Object,
};

export default QuestionCard;
