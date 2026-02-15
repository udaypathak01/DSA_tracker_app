import { motion } from 'framer-motion';
import { useDSA } from '../hooks/useDSA';
import useStreak from '../hooks/useStreak';
import ProgressCard from '../components/dashboard/ProgressCard';
import StatsGrid from '../components/dashboard/StatsGrid';
import StreakCounter from '../components/dashboard/StreakCounter';
import RecentActivityPanel from '../components/dashboard/RecentActivityPanel';
import MotivationQuote from '../components/dashboard/MotivationQuote';

/**
 * Dashboard Page
 * Main dashboard showing overall progress and statistics
 */
function Dashboard() {
  const { getOverallProgress, getTotalCompleted, getTotalQuestions, recentActivity } = useDSA();
  const streak = useStreak();

  const progress = getOverallProgress();
  const completed = getTotalCompleted();
  const total = getTotalQuestions();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      className="space-y-4 sm:space-y-6 md:space-y-8 px-4 sm:px-6 md:px-0"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-1 sm:mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400">
          Keep pushing your DSA learning journey forward
        </p>
      </motion.div>

      {/* Main Stats Row */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {/* Overall Progress Card */}
        <ProgressCard
          title="Overall Progress"
          progress={progress}
          subtitle={`${completed} of ${total} questions completed`}
          color="from-blue-500 to-blue-600"
        />

        {/* Streak Card */}
        <StreakCounter streak={streak} />

        {/* Quick Stats */}
        <motion.div className="card p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-slate-900 dark:text-white">
            Quick Stats
          </h3>
          <div className="space-y-2 sm:space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Total Questions</span>
              <span className="font-bold text-base sm:text-lg text-blue-600 dark:text-blue-400">{total}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Completed</span>
              <span className="font-bold text-base sm:text-lg text-green-600 dark:text-green-400">{completed}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Remaining</span>
              <span className="font-bold text-base sm:text-lg text-orange-600 dark:text-orange-400">
                {total - completed}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Topic Stats Grid */}
      <motion.div variants={itemVariants}>
        <StatsGrid />
      </motion.div>

      {/* Recent Activity and Motivation */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2">
          <RecentActivityPanel activities={recentActivity} />
        </div>
        <MotivationQuote />
      </motion.div>
    </motion.div>
  );
}

export default Dashboard;
