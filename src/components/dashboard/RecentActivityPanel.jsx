import { motion } from 'framer-motion';
import { formatDate } from '../../utils/dateUtils';

/**
 * RecentActivityPanel Component
 * Shows recent actions by the user
 */
function RecentActivityPanel({ activities }) {
  return (
    <motion.div className="card p-4 sm:p-6" whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
      <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-slate-900 dark:text-white">
        Recent Activity
      </h3>

      {activities && activities.length > 0 ? (
        <div className="space-y-2 sm:space-y-3">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              className="flex items-start gap-2 sm:gap-3 pb-2 sm:pb-3 border-b border-slate-200 dark:border-dark-border last:border-b-0"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {/* Icon */}
              <div className="text-lg mt-0.5 sm:mt-1 flex-shrink-0">
                {activity.action === 'completed' ? '✅' : activity.action === 'added' ? '➕' : '🗑️'}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-white">
                  {activity.action === 'completed'
                    ? 'Completed'
                    : activity.action === 'added'
                    ? 'Added'
                    : 'Deleted'}{' '}
                  <span className="text-blue-600 dark:text-blue-400 truncate">
                    {activity.questionTitle}
                  </span>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {formatDate(activity.timestamp)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          className="text-center py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            No recent activity. Start solving problems! 🚀
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

export default RecentActivityPanel;
