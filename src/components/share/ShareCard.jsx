import { forwardRef } from 'react';
import { motion } from 'framer-motion';

/**
 * ShareCard Component
 * Displays a beautiful achievement card for sharing on social media
 * Instagram friendly: 1080x1080
 */
const ShareCard = forwardRef(({ problem, streak, quote, userName = 'Developer' }, ref) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return { bg: 'from-emerald-600 to-emerald-700', text: 'text-emerald-100' };
      case 'Medium':
        return { bg: 'from-amber-600 to-amber-700', text: 'text-amber-100' };
      case 'Hard':
        return { bg: 'from-red-600 to-red-700', text: 'text-red-100' };
      default:
        return { bg: 'from-blue-600 to-blue-700', text: 'text-blue-100' };
    }
  };

  const getDifficultyEmoji = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return '🟢';
      case 'Medium':
        return '🟡';
      case 'Hard':
        return '🔴';
      default:
        return '🔥';
    }
  };

  const colors = getDifficultyColor(problem.difficulty);
  const today = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <motion.div
      ref={ref}
      className={`w-full sm:w-[320px] md:w-[400px] lg:w-[500px] mx-auto bg-gradient-to-br ${colors.bg} rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl overflow-hidden`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      style={{ margin: 'auto' }}
    >
      {/* Header Section */}
      <div className="px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-8 pb-4 sm:pb-5 md:pb-6">
        <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white">🎉</h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, rotate: -20 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl sm:text-3xl md:text-4xl"
          >
            ✨
          </motion.div>
        </div>

        <motion.h2
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Achievement Unlocked!
        </motion.h2>

        <motion.p
          className="text-xs sm:text-sm md:text-base lg:text-lg text-white/80 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Problem solved successfully 🚀
        </motion.p>
      </div>

      {/* Content Section */}
      <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 bg-white/5 backdrop-blur-sm">
        {/* Problem Info */}
        <motion.div
          className="space-y-3 sm:space-y-4 mb-4 sm:mb-5 md:mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Problem Title */}
          <div>
            <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">
              🧠 Problem
            </p>
            <p className="text-white text-sm sm:text-base md:text-xl lg:text-2xl font-bold line-clamp-2">
              {problem.title}
            </p>
          </div>

          {/* Difficulty & Topic Row */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 pt-2">
            <div>
              <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">
                🔥 Difficulty
              </p>
              <div className="flex items-center gap-2">
                <span className={`inline-block px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg font-bold text-xs sm:text-sm ${colors.text} bg-white/20`}>
                  {getDifficultyEmoji(problem.difficulty)} {problem.difficulty}
                </span>
              </div>
            </div>
            <div>
              <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">
                📚 Topic
              </p>
              <p className="text-white font-bold text-xs sm:text-sm">{problem.topic}</p>
            </div>
          </div>
        </motion.div>

        {/* Streak Section */}
        <motion.div
          className="bg-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-5 md:mb-6 border border-white/20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">
            📈 Current Streak
          </p>
          <p className="text-white text-2xl sm:text-3xl md:text-4xl font-black">
            {streak}
            <span className="text-sm sm:text-base md:text-lg ml-2">🔥</span>
          </p>
          <p className="text-white/70 text-xs sm:text-sm mt-1 font-medium">
            {streak === 1 ? 'day in a row' : 'days in a row'}
          </p>
        </motion.div>

        {/* Quote Section */}
        <motion.div
          className="bg-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">
            💬 Motivation
          </p>
          <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg italic font-medium leading-relaxed">
            "{quote}"
          </p>
        </motion.div>
      </div>

      {/* Footer Section */}
      <motion.div
        className="px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 bg-white/10 backdrop-blur-sm border-t border-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex items-center justify-between gap-2 sm:gap-3 mb-2 sm:mb-3">
          <div className="flex-1">
            <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">
              👤 Solver
            </p>
            <p className="text-white font-bold text-xs sm:text-sm md:text-base truncate">{userName}</p>
          </div>
          <div className="flex-1 text-right">
            <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">
              📅 Date
            </p>
            <p className="text-white font-bold text-xs sm:text-sm md:text-base">{today}</p>
          </div>
        </div>

        {/* Branding */}
        <motion.div
          className="pt-2 sm:pt-3 border-t border-white/20 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span className="text-white/80 font-semibold text-xs sm:text-sm">
            Powered by DSA Tracker Pro
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
});

ShareCard.displayName = 'ShareCard';

export default ShareCard;
