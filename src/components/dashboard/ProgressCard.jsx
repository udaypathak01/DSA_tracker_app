import { motion } from 'framer-motion';

/**
 * ProgressCard Component
 * Displays progress with circular indicator
 */
function ProgressCard({ title, progress, subtitle, color = 'from-blue-500 to-blue-600' }) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      className="card p-6 flex flex-col items-center justify-center"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="text-lg font-semibold mb-6 text-slate-900 dark:text-white">{title}</h3>

      {/* Circular Progress */}
      <div className="relative w-32 h-32 mb-6">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-slate-200 dark:text-dark-border"
          />

          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="3"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            strokeLinecap="round"
          />

          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              className="text-3xl font-bold text-blue-600 dark:text-blue-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {progress}%
            </motion.div>
          </div>
        </div>
      </div>

      {/* Subtitle */}
      <p className="text-sm text-slate-600 dark:text-slate-400 text-center">{subtitle}</p>
    </motion.div>
  );
}

export default ProgressCard;
