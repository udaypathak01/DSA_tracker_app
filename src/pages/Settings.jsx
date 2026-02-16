import { motion } from "framer-motion";
import { toast } from "sonner";
import { useDSA } from "../hooks/useDSA";
import { TOAST_MESSAGES } from "../utils/constants";

/**
 * Settings Page
 * User settings, data management, and app configuration
 */
function Settings() {
  const { resetAllProgress } = useDSA();

  const handleReset = () => {
    if (
      window.confirm(
        "Are you sure? This will mark all questions as incomplete.",
      )
    ) {
      resetAllProgress();
      toast.success(TOAST_MESSAGES.PROGRESS_RESET);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="space-y-4 sm:space-y-6 max-w-2xl px-0"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-1 sm:mb-2">
          ⚙️ Settings
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400">
          Manage your data and application preferences
        </p>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        variants={itemVariants}
        className="card p-4 sm:p-6 border-red-200 dark:border-red-800"
      >
        <h2 className="text-lg sm:text-xl font-bold text-red-600 dark:text-red-400 mb-3 sm:mb-4">
          ⚠️ Danger Zone
        </h2>

        <motion.button
          onClick={handleReset}
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 sm:gap-3"
          whileHover={{ x: 4 }}
        >
          <span className="text-lg flex-shrink-0">🔄</span>
          <div className="text-left">
            <p className="font-medium text-xs sm:text-sm">Reset All Progress</p>
            <p className="text-xs opacity-75">
              Mark all questions as incomplete
            </p>
          </div>
        </motion.button>
      </motion.div>

      {/* About */}
      <motion.div variants={itemVariants} className="card p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-4">
          ℹ️ About DSAOrbit
        </h2>

        <div className="space-y-3 sm:space-y-4">
          <div>
            <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
              📌 Your DSA Mastery Companion
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <strong>DSAOrbit</strong> is your ultimate Data Structures and
              Algorithms (DSA) tracker designed to help you excel in coding
              interviews and placement preparation. Master algorithm practice,
              build consistent coding habits, and achieve your dream placements.
            </p>
          </div>

          <div>
            <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
              ✨ Key Features
            </p>
            <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-1">
              <li>
                • 📊 Advanced Progress Analytics – Track solved, pending &
                topic-wise completion with clarity
              </li>
              <li>
                • 🔥 Smart Streak System – Build unstoppable daily coding
                consistency
              </li>
              <li>
                • 📈 Performance Insights – Monitor success rate & identify weak
                areas
              </li>
              <li>
                • 🎯 Structured Topic Roadmap – Organized learning from Arrays
                to Dynamic Programming
              </li>
              <li>
                • 📝 Personal Notes System – Save key patterns, tricks &
                revision points
              </li>
              <li>
                • ⭐ Mark Favorites – Quickly revisit important interview
                problems
              </li>
              <li>
                • 🌙 Dark Mode – Eye-friendly interface for long coding sessions
              </li>
              <li>
                • 📱 Fully Responsive – Optimized for mobile, tablet & desktop
              </li>
              <li>
                • ⚡ Fast & Lightweight – Built with modern React performance
                standards
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
              🎯 Perfect For
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              College students preparing for placements, competitive
              programmers, candidates preparing for FAANG interviews, and anyone
              serious about improving their algorithmic problem-solving skills.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-dark-border">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
              Made with ❤️ for aspiring software engineers
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500">
              Created by{" "}
              <a
                href="https://www.linkedin.com/in/uday-pathak-b88215324?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Uday Pathak
              </a>
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
              <strong>DSAOrbit</strong> v1.0
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Settings;
