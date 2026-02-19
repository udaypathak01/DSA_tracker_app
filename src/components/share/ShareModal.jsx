import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import ShareCard from './ShareCard';
import {
  downloadAsImage,
  copyToClipboard,
  generateLinkedInCaption,
  generateLinkedInShareURL,
} from '../../utils/imageGenerator';

/**
 * ShareModal Component
 * Displays achievement card with options to download or share on LinkedIn
 */
function ShareModal({ isOpen, problem, streak, quote, userName, onClose }) {
  const cardRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [editableQuote, setEditableQuote] = useState(quote);
  const [showQuoteEdit, setShowQuoteEdit] = useState(false);
  const [editableUserName, setEditableUserName] = useState(userName);
  const [showNameEdit, setShowNameEdit] = useState(false);

  if (!isOpen || !problem) return null;

  /**
   * Handle download as PNG
   */
  const handleDownloadImage = async () => {
    try {
      setIsDownloading(true);
      
      if (!cardRef.current) {
        toast.error('Card element not found');
        return;
      }

      const filename = `${problem.title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.png`;
      
      console.log('Download initiated for:', filename);
      await downloadAsImage(cardRef.current, filename);
      
      toast.success('Image downloaded successfully! 🎉');
    } catch (error) {
      console.error('Download error:', error);
      toast.error(error.message || 'Failed to download image. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  /**
   * Handle LinkedIn share
   */
  const handleLinkedInShare = async () => {
    try {
      const caption = generateLinkedInCaption({
        title: problem.title,
        difficulty: problem.difficulty,
        streak,
        topic: problem.topic,
        link: problem.link,
      });

      const copied = await copyToClipboard(caption);

      if (copied) {
        toast.success('Caption copied to clipboard! 📋');
        // Open LinkedIn share in new tab
        const linkedInUrl = generateLinkedInShareURL(caption);
        window.open(linkedInUrl, '_blank');
      }
    } catch (error) {
      toast.error('Failed to copy caption');
      console.error('LinkedIn share error:', error);
    }
  };

  /**
   * Handle copy caption
   */
  const handleCopyCaption = async () => {
    try {
      const caption = generateLinkedInCaption({
        title: problem.title,
        difficulty: problem.difficulty,
        streak,
        topic: problem.topic,
        link: problem.link,
      });

      const copied = await copyToClipboard(caption);
      if (copied) {
        toast.success('Caption copied to clipboard! 📋');
      }
    } catch (error) {
      toast.error('Failed to copy caption');
    }
  };

  /**
   * Handle quote update
   */
  const handleUpdateQuote = () => {
    setShowQuoteEdit(false);
    // Quote is now updated in editableQuote state
  };

  // Overlay variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  // Modal variants
  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, type: 'spring', stiffness: 300, damping: 30 },
    },
    exit: { opacity: 0, y: 50, scale: 0.95, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-dark-card rounded-2xl shadow-2xl"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-dark-card border-b border-slate-200 dark:border-dark-border px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2">
          <motion.h2
            className="text-lg sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Share Your Achievement 🎉
          </motion.h2>
          <motion.button
            onClick={onClose}
            className="p-2 flex-shrink-0 hover:bg-slate-100 dark:hover:bg-dark-border rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Close modal"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Card Preview Section */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ShareCard
              ref={cardRef}
              problem={problem}
              streak={streak}
              quote={editableQuote}
              userName={editableUserName}
            />
          </motion.div>

          {/* Name Edit Section */}
          {showNameEdit && (
            <motion.div
              className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-3 sm:p-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Edit Your Name
              </label>
              <input
                type="text"
                value={editableUserName}
                onChange={(e) => setEditableUserName(e.target.value)}
                className="w-full p-2 sm:p-3 bg-white dark:bg-slate-800 border border-purple-300 dark:border-purple-700 rounded-lg text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your name..."
              />
              <button
                onClick={() => setShowNameEdit(false)}
                className="mt-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-purple-700 transition-colors"
              >
                Save Name
              </button>
            </motion.div>
          )}

          {/* Quote Edit Section */}
          {showQuoteEdit && (
            <motion.div
              className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 sm:p-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Edit Motivational Quote
              </label>
              <textarea
                value={editableQuote}
                onChange={(e) => setEditableQuote(e.target.value)}
                className="w-full p-2 sm:p-3 bg-white dark:bg-slate-800 border border-blue-300 dark:border-blue-700 rounded-lg text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="2"
                placeholder="Enter your custom quote..."
              />
              <button
                onClick={handleUpdateQuote}
                className="mt-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Update Quote
              </button>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {/* Download Button */}
            <motion.button
              onClick={handleDownloadImage}
              disabled={isDownloading}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-400 disabled:to-slate-500 text-white rounded-lg font-semibold text-xs sm:text-sm transition-all duration-200 shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isDownloading ? (
                <>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Downloading...</span>
                </>
              ) : (
                <>
                  📥 <span>Download PNG</span>
                </>
              )}
            </motion.button>

            {/* LinkedIn Share Button */}
            <motion.button
              onClick={handleLinkedInShare}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold text-xs sm:text-sm transition-all duration-200 shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              💼 <span>LinkedIn Share</span>
            </motion.button>
          </motion.div>

          {/* Additional Actions */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {/* Copy Caption Button */}
            <motion.button
              onClick={handleCopyCaption}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-100 dark:bg-dark-border hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-semibold text-xs sm:text-sm transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              📋 <span>Copy Caption</span>
            </motion.button>

            {/* Edit Name Button */}
            <motion.button
              onClick={() => setShowNameEdit(!showNameEdit)}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-100 dark:bg-dark-border hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-semibold text-xs sm:text-sm transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              👤 <span>Edit Name</span>
            </motion.button>
          </motion.div>

          {/* Additional Actions - Row 2 */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-1 gap-2 sm:gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {/* Edit Quote Button */}
            <motion.button
              onClick={() => setShowQuoteEdit(!showQuoteEdit)}
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-100 dark:bg-dark-border hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-semibold text-xs sm:text-sm transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              ✏️ <span>Edit Quote</span>
            </motion.button>
          </motion.div>

          {/* Info Message */}
          <motion.div
            className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-200">
              💡 <strong>Tip:</strong> Download the card as PNG to share on Instagram, Twitter, or other platforms!
            </p>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="border-t border-slate-200 dark:border-dark-border px-4 sm:px-6 py-3 sm:py-4 flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <motion.button
            onClick={onClose}
            className="px-4 sm:px-6 py-2 sm:py-2 bg-slate-200 dark:bg-dark-border hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-semibold text-sm transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Close
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default ShareModal;
