import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useDSA } from '../../hooks/useDSA';
import { TOAST_MESSAGES } from '../../utils/constants';

/**
 * NotesModal Component
 * Modal for adding/editing notes on questions
 */
function NotesModal() {
  const { editingQuestion, setShowModal, updateNotes } = useDSA();
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (editingQuestion) {
      setNotes(editingQuestion.notes || '');
    }
  }, [editingQuestion]);

  const handleSave = () => {
    if (editingQuestion) {
      updateNotes(editingQuestion.id, notes);
      toast.success(TOAST_MESSAGES.NOTES_SAVED);
      setShowModal((prev) => ({ ...prev, notes: false }));
    }
  };

  const handleClose = () => {
    setShowModal((prev) => ({ ...prev, notes: false }));
  };

  if (!editingQuestion) return null;

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleClose}
    >
      <motion.div
        className="modal-content"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-dark-border">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Notes: {editingQuestion.title}
          </h2>
        </div>

        {/* Content */}
        <div className="p-6">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add your notes, solution approach, or key insights..."
            className="input resize-none h-40 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 dark:border-dark-border flex gap-3 justify-end">
          <motion.button
            onClick={handleClose}
            className="btn btn-secondary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Cancel
          </motion.button>
          <motion.button
            onClick={handleSave}
            className="btn btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Save Notes
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default NotesModal;
