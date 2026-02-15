import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useDSA } from '../hooks/useDSA';
import { TOAST_MESSAGES } from '../utils/constants';

/**
 * Settings Page
 * User settings, data management, and app configuration
 */
function Settings() {
  const { resetAllProgress, exportData, importData } = useDSA();
  const [importing, setImporting] = useState(false);
  const [mergeData, setMergeData] = useState(false);

  const handleReset = () => {
    if (window.confirm('Are you sure? This will mark all questions as incomplete.')) {
      resetAllProgress();
      toast.success(TOAST_MESSAGES.PROGRESS_RESET);
    }
  };

  const handleExport = () => {
    try {
      exportData();
      toast.success(TOAST_MESSAGES.DATA_EXPORTED);
    } catch (error) {
      toast.error(TOAST_MESSAGES.ERROR_GENERIC);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = event.target?.result;
        const success = importData(json, mergeData);
        if (success) {
          toast.success(TOAST_MESSAGES.DATA_IMPORTED);
          setImporting(false);
        } else {
          toast.error('Invalid file format');
        }
      } catch (error) {
        toast.error(TOAST_MESSAGES.ERROR_GENERIC);
      }
    };
    reader.readAsText(file);
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
      className="space-y-6 max-w-2xl"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
          ⚙️ Settings
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage your data and application preferences
        </p>
      </motion.div>

      {/* Data Management Section */}
      <motion.div variants={itemVariants} className="card p-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          📊 Data Management
        </h2>

        <div className="space-y-4">
          {/* Export */}
          <motion.button
            onClick={handleExport}
            className="w-full btn btn-secondary justify-start"
            whileHover={{ x: 4 }}
          >
            <span className="text-lg">📥</span>
            <div className="text-left">
              <p className="font-medium">Export Progress</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Download your data as JSON
              </p>
            </div>
          </motion.button>

          {/* Import */}
          <div className="relative">
            <input
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
              id="import-file"
            />
            <label
              htmlFor="import-file"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-slate-300 dark:border-dark-border cursor-pointer hover:bg-slate-50 dark:hover:bg-dark-border transition-colors"
            >
              <span className="text-lg">📤</span>
              <div className="text-left">
                <p className=" font-medium">Import Progress</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Upload a previously exported JSON file
                </p>
              </div>
            </label>
          </div>

          {/* Merge Option */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={mergeData}
              onChange={(e) => setMergeData(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-slate-700 dark:text-slate-300">
              Merge with existing data (instead of replacing)
            </span>
          </label>
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div variants={itemVariants} className="card p-6 border-red-200 dark:border-red-800">
        <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">
          ⚠️ Danger Zone
        </h2>

        <motion.button
          onClick={handleReset}
          className="w-full px-4 py-3 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 rounded-lg font-medium transition-colors flex items-center gap-3"
          whileHover={{ x: 4 }}
        >
          <span className="text-lg">🔄</span>
          <div className="text-left">
            <p className="font-medium">Reset All Progress</p>
            <p className="text-xs opacity-75">Mark all questions as incomplete</p>
          </div>
        </motion.button>
      </motion.div>

      {/* About */}
      <motion.div variants={itemVariants} className="card p-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          ℹ️ About
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
          <strong>DSA Tracker Pro</strong> v1.0
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          A comprehensive tool to help students track their DSA learning journey for placement preparation.
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-500">
          Made with ❤️ for aspiring software engineers by <a href="https://www.linkedin.com/in/uday-pathak-b88215324?utm_source=share_via&utm_content=profile&utm_medium=member_android">Uday Pathak</a>
        </p>
      </motion.div>
    </motion.div>
  );
}

export default Settings;
