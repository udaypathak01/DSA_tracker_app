import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * NotFound Page
 * 404 error page
 */
function NotFound() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.div
        className="text-8xl"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        😕
      </motion.div>

      <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
        Page Not Found
      </h1>

      <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md">
        The page you're looking for doesn't exist. Let's get you back on track!
      </p>

      <Link to="/">
        <motion.button
          className="btn btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back to Dashboard
        </motion.button>
      </Link>
    </motion.div>
  );
}

export default NotFound;
