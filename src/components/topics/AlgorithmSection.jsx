import { motion } from 'framer-motion';
import { useDSA } from '../../hooks/useDSA';
import QuestionCard from './QuestionCard';

/**
 * AlgorithmSection Component
 * Displays questions for a specific algorithm
 */
function AlgorithmSection({ topic, algorithm, questions }) {
  const { getAlgorithmProgress } = useDSA();
  const progress = getAlgorithmProgress(topic, algorithm);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  };

  return (
    <div className="bg-slate-50 dark:bg-dark-border/30 rounded-lg p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold text-slate-900 dark:text-white">
          {algorithm} ({questions.length})
        </h4>
        <div className="flex items-center gap-2">
          <div className="w-12 bg-slate-200 dark:bg-dark-border rounded-full h-1.5">
            <motion.div
              className="bg-green-600 h-1.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="text-xs font-bold text-green-600 dark:text-green-400 w-6">
            {progress}%
          </span>
        </div>
      </div>

      {/* Questions */}
      <motion.div
        className="space-y-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {questions.map((question) => (
          <motion.div key={question.id} variants={itemVariants}>
            <QuestionCard question={question} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default AlgorithmSection;
