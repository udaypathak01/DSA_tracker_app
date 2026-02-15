import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDSA } from '../../hooks/useDSA';
import { getTopicStats } from '../../utils/progressCalculator';

/**
 * StatsGrid Component
 * Displays topic-wise completion statistics
 */
function StatsGrid() {
  const navigate = useNavigate();
  const { questions } = useDSA();
  const topicStats = getTopicStats(questions);

  const handleTopicClick = (topic) => {
    navigate('/topics', { state: { selectedTopic: topic } });
  };

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
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
        Topic-wise Progress
      </h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {topicStats.map((stat) => (
          <motion.div
            key={stat.topic}
            className="card p-4 cursor-pointer hover:shadow-lg transition-shadow"
            variants={itemVariants}
            onClick={() => handleTopicClick(stat.topic)}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-semibold text-sm text-slate-900 dark:text-white">
                {stat.topic}
              </h4>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                {stat.progress}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 dark:bg-dark-border rounded-full h-2 mb-3">
              <motion.div
                className="bg-blue-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${stat.progress}%` }}
                transition={{ duration: 0.6, delay: 0.1 }}
              />
            </div>

            {/* Stats */}
            <div className="text-xs text-slate-600 dark:text-slate-400">
              <span className="font-medium">{stat.completed}</span>/<span>{stat.total}</span> questions
            </div>

            {/* Difficulty Breakdown */}
            <div className="mt-2 flex gap-1">
              <div
                className="flex-1 h-1 bg-green-500 rounded-full"
                style={{
                  opacity: stat.difficultyBreakdown.easy / stat.total,
                }}
                title={`Easy: ${stat.difficultyBreakdown.easy}`}
              />
              <div
                className="flex-1 h-1 bg-yellow-500 rounded-full"
                style={{
                  opacity: stat.difficultyBreakdown.medium / stat.total,
                }}
                title={`Medium: ${stat.difficultyBreakdown.medium}`}
              />
              <div
                className="flex-1 h-1 bg-red-500 rounded-full"
                style={{
                  opacity: stat.difficultyBreakdown.hard / stat.total,
                }}
                title={`Hard: ${stat.difficultyBreakdown.hard}`}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default StatsGrid;
