import { motion, AnimatePresence } from 'framer-motion';
import { useDSA } from '../../hooks/useDSA';
import AlgorithmSection from './AlgorithmSection';

/**
 * TopicAccordion Component
 * Collapsible topic section with algorithms and questions
 */
function TopicAccordion({ topic, questions, isExpanded, onToggle }) {
  const { getTopicProgress } = useDSA();
  const progress = getTopicProgress(topic);

  // Group questions by algorithm
  const algorithms = [...new Set(questions.map(q => q.algorithm))];
  const questionsByAlgorithm = algorithms.reduce((acc, algo) => {
    acc[algo] = questions.filter(q => q.algorithm === algo);
    return acc;
  }, {});

  return (
    <motion.div className="card overflow-hidden">
      {/* Header */}
      <motion.button
        onClick={onToggle}
        className="w-full px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-dark-border/50 transition-colors text-sm sm:text-base"
        whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
      >
        <div className="flex items-center gap-2 sm:gap-4 flex-1 text-left min-w-0">
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-slate-600 dark:text-slate-400 flex-shrink-0"
          >
            ▶
          </motion.div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base truncate">{topic}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {questions.length} questions
            </p>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <div className="w-12 sm:w-16 bg-slate-200 dark:bg-dark-border rounded-full h-1.5 sm:h-2">
              <motion.div
                className="bg-blue-600 h-1.5 sm:h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 w-8 text-right">
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
          >
            <div className="p-4 space-y-4">
              {algorithms.map((algo) => (
                <AlgorithmSection
                  key={algo}
                  topic={topic}
                  algorithm={algo}
                  questions={questionsByAlgorithm[algo]}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default TopicAccordion;
