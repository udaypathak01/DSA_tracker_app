import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Reusable Notes Modal Component
 * Can be used by both main DSA and Love Bubber modules
 */
function NotesModal({ isOpen, title, initialNotes, onClose, onSave }) {
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (isOpen) {
      setNotes(initialNotes || '');
    }
  }, [isOpen, initialNotes]);

  const handleSave = () => {
    onSave(notes);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-dark-card rounded-lg shadow-xl max-w-md w-full"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-dark-border">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {title || '📝 Edit Notes'}
              </h3>
              <button
                onClick={onClose}
                className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                title="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Add your notes, solutions, tips, or insights..."
                className="w-full h-32 p-3 rounded-lg border border-slate-200 dark:border-dark-border bg-white dark:bg-dark-bg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 resize-none"
              />
            </div>

            {/* Footer */}
            <div className="flex gap-2 p-4 border-t border-slate-200 dark:border-dark-border">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 rounded-lg border border-slate-200 dark:border-dark-border text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-border transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors font-medium"
              >
                Save Notes
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default NotesModal;
