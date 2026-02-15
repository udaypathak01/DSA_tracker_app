import { motion } from 'framer-motion';

/**
 * StreakCounter Component
 * Displays current streak and motivation
 */
function StreakCounter({ streak }) {
  return (
    <motion.div
      className="card p-6"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">
        🔥 Current Streak
      </h3>

      <div className="flex items-end justify-between">
        <div>
          <motion.div
            className="text-5xl font-bold text-orange-600 dark:text-orange-400 mb-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            {streak.count}
          </motion.div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
            {streak.count === 1 ? 'day' : 'days'} in a row
          </p>
        </div>

        {/* Fire Icon */}
        {streak.isActive && streak.count > 0 && (
          <motion.div
            className="text-6xl opacity-75"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            🔥
          </motion.div>
        )}
      </div>

      {/* Status Message */}
      <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3 mt-4">
        <p className="text-xs text-orange-700 dark:text-orange-300 font-medium">
          {streak.message}
        </p>
      </div>

      {/* Motivational Text */}
      {streak.solvedToday && (
        <motion.p
          className="text-xs text-green-600 dark:text-green-400 font-medium mt-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ✓ Problem solved today!
        </motion.p>
      )}
    </motion.div>
  );
}

export default StreakCounter;
