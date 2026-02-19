import { motion } from 'framer-motion';
import { useMemo } from 'react';

/**
 * Love Bubber Analytics Component
 * Displays comprehensive analytics for Love Bubber DSA Sheet
 */
function LoveBubberAnalytics({ analytics }) {
  // Prepare topic data for chart
  const topicData = useMemo(() => {
    return Object.entries(analytics.byTopic || {}).map(([topic, stats]) => ({
      name: topic,
      completed: stats.completed,
      total: stats.total,
      percentage: stats.percentage,
    }));
  }, [analytics]);

  // Prepare difficulty data
  const difficultyData = useMemo(() => {
    return [
      { name: 'Easy', value: analytics.byDifficulty?.Easy || 0 },
      { name: 'Medium', value: analytics.byDifficulty?.Medium || 0 },
      { name: 'Hard', value: analytics.byDifficulty?.Hard || 0 },
    ];
  }, [analytics]);

  const totalDifficulty = difficultyData.reduce((sum, d) => sum + d.value, 0);

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {/* Total Problems */}
        <div className="bg-white dark:bg-dark-card p-4 rounded-lg border border-slate-200 dark:border-dark-border">
          <div className="text-xs text-slate-600 dark:text-slate-400 mb-2">Total Problems</div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">
            {analytics.totalProblems}
          </div>
        </div>

        {/* Completed Problems */}
        <div className="bg-white dark:bg-dark-card p-4 rounded-lg border border-slate-200 dark:border-dark-border">
          <div className="text-xs text-slate-600 dark:text-slate-400 mb-2">✅ Completed</div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
            {analytics.completedProblems}
          </div>
        </div>

        {/* Completion % */}
        <div className="bg-white dark:bg-dark-card p-4 rounded-lg border border-slate-200 dark:border-dark-border">
          <div className="text-xs text-slate-600 dark:text-slate-400 mb-2">Completion %</div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {analytics.completionPercentage}%
          </div>
        </div>

        {/* Total Revisions */}
        <div className="bg-white dark:bg-dark-card p-4 rounded-lg border border-slate-200 dark:border-dark-border">
          <div className="text-xs text-slate-600 dark:text-slate-400 mb-2">🔄 Revisions</div>
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {analytics.totalRevisions}
          </div>
        </div>

        {/* Favorites */}
        <div className="bg-white dark:bg-dark-card p-4 rounded-lg border border-slate-200 dark:border-dark-border">
          <div className="text-xs text-slate-600 dark:text-slate-400 mb-2">⭐ Favorites</div>
          <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
            {analytics.favoriteCount}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Topic-wise Completion */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-dark-card p-6 rounded-lg border border-slate-200 dark:border-dark-border"
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            📊 Topic-wise Completion
          </h3>
          <div className="space-y-3">
            {topicData.map(topic => (
              <div key={topic.name}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {topic.name}
                  </span>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                    {topic.completed}/{topic.total} ({topic.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-dark-border rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${topic.percentage}%` }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Difficulty Distribution */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-dark-card p-6 rounded-lg border border-slate-200 dark:border-dark-border"
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            🎯 Difficulty Distribution
          </h3>
          <div className="space-y-4">
            {difficultyData.map(difficulty => {
              const percentage = totalDifficulty > 0 ? (difficulty.value / totalDifficulty) * 100 : 0;
              return (
                <div key={difficulty.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {difficulty.name}
                    </span>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                      {difficulty.value} ({Math.round(percentage)}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-dark-border rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${
                        difficulty.name === 'Easy'
                          ? 'bg-green-500'
                          : difficulty.name === 'Medium'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default LoveBubberAnalytics;
