import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import useKunalBootcamp from '../hooks/useKunalBootcamp';
import LoveBubberAnalytics from '../components/loveBubber/LoveBubberAnalytics';
import LoveBubberTopicAccordion from '../components/loveBubber/LoveBubberTopicAccordion';
import LoveBubberSearchBox from '../components/loveBubber/LoveBubberSearchBox';
import LoveBubberFilterBar from '../components/loveBubber/LoveBubberFilterBar';
import LoveBubberSearchResults from '../components/loveBubber/LoveBubberSearchResults';
import LoveBubberNotesModal from '../components/modals/LoveBubberNotesModal';
import ShareModal from '../components/share/ShareModal';
import { toast } from 'sonner';

/**
 * Kunal Kushwaha's Bootcamp DSA Sheet Main Page
 * Independent DSA bootcamp curriculum with dedicated analytics and tracking
 */
function KunalBootcampSheet() {
  const {
    problems,
    loading,
    analytics,
    filters,
    setFilters,
    toggleCompletion,
    toggleFavorite,
    addRevision,
    updateNotes,
    resetProgress,
    getOverallProgress,
  } = useKunalBootcamp();

  // LOCAL SEARCH STATE - Not stored in global hook
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [notesModal, setNotesModal] = useState({
    isOpen: false,
    problemId: null,
    currentNotes: '',
  });

  const [shareModal, setShareModal] = useState({ isOpen: false, problem: null });
  const [expandedTopic, setExpandedTopic] = useState(null);

  const progress = getOverallProgress();

  // MEMOIZED LOCAL FILTERING - Only based on local search and filters
  const filteredProblems = useMemo(() => {
    return problems.filter(problem => {
      // Search filter - LOCAL ONLY
      const searchLower = localSearchQuery.toLowerCase();
      const matchesSearch = localSearchQuery === '' || 
        problem.title.toLowerCase().includes(searchLower) ||
        problem.topic.toLowerCase().includes(searchLower);

      // Topic filter
      const matchesTopic = filters.topic.length === 0 || 
        filters.topic.includes(problem.topic);

      // Difficulty filter
      const matchesDifficulty = filters.difficulty.length === 0 || 
        filters.difficulty.includes(problem.difficulty);

      // Completion filter
      const matchesCompletion = filters.completed === 'all' || 
        (filters.completed === 'completed' && problem.completed) ||
        (filters.completed === 'notCompleted' && !problem.completed);

      return matchesSearch && matchesTopic && matchesDifficulty && matchesCompletion;
    });
  }, [problems, localSearchQuery, filters]);

  // Group ALL problems by topic for accordion (unaffected by search/filters)
  const problemsByTopicUnfiltered = useMemo(() => {
    const grouped = {};
    problems.forEach(problem => {
      if (!grouped[problem.topic]) {
        grouped[problem.topic] = [];
      }
      grouped[problem.topic].push(problem);
    });
    return grouped;
  }, [problems]);

  // Keep this for backward compatibility if needed
  const problemsByTopic = problemsByTopicUnfiltered;

  const handleOpenNotes = (problemId, currentNotes) => {
    setNotesModal({
      isOpen: true,
      problemId,
      currentNotes,
    });
  };

  const handleSaveNotes = async (notes) => {
    try {
      await updateNotes(notesModal.problemId, notes);
      setNotesModal({ isOpen: false, problemId: null, currentNotes: '' });
    } catch (error) {
      toast.error('Failed to save notes');
    }
  };

  const handleReset = async () => {
    if (window.confirm('Are you sure? This will reset all your bootcamp progress.')) {
      setIsResetting(true);
      try {
        await resetProgress();
      } finally {
        setIsResetting(false);
      }
    }
  };

  const handleOpenShare = (problem) => {
    if (!problem.completed) {
      toast.error('Complete this problem first!');
      return;
    }
    setShareModal({ isOpen: true, problem });
  };

  const handleCloseShare = () => {
    setShareModal({ isOpen: false, problem: null });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  if (loading) {
    return (
      <div className="space-y-4 px-0">
        {/* Skeleton loader */}
        {[1, 2, 3].map(i => (
          <div key={i} className="h-20 bg-slate-200 dark:bg-dark-border rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-4 sm:space-y-6 px-0"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            🎓 Kunal Kushwaha's Bootcamp
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 mt-1">
            Complete DSA Bootcamp Curriculum with Hands-on Problems
          </p>
        </div>
      </motion.div>

      {/* Progress Bar at Top */}
      <motion.div variants={itemVariants}>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-dark-card dark:to-dark-border rounded-lg p-3 sm:p-4 border border-blue-200 dark:border-blue-900">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
              Overall Progress
            </span>
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {progress}%
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-dark-border rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </motion.div>

      {/* Stats Summary Bar - Responsive Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        <div className="bg-white dark:bg-dark-card p-2 sm:p-3 rounded-lg border border-slate-200 dark:border-dark-border">
          <div className="text-xs text-slate-600 dark:text-slate-400 mb-1 line-clamp-1">Total</div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {analytics.totalProblems}
          </div>
        </div>

        <div className="bg-white dark:bg-dark-card p-2 sm:p-3 rounded-lg border border-slate-200 dark:border-dark-border">
          <div className="text-xs text-slate-600 dark:text-slate-400 mb-1 line-clamp-1">Completed</div>
          <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
            {analytics.completedProblems}
          </div>
        </div>

        <div className="bg-white dark:bg-dark-card p-2 sm:p-3 rounded-lg border border-slate-200 dark:border-dark-border">
          <div className="text-xs text-slate-600 dark:text-slate-400 mb-1 line-clamp-1">Remaining</div>
          <div className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {analytics.totalProblems - analytics.completedProblems}
          </div>
        </div>

        <div className="bg-white dark:bg-dark-card p-2 sm:p-3 rounded-lg border border-slate-200 dark:border-dark-border">
          <div className="text-xs text-slate-600 dark:text-slate-400 mb-1 line-clamp-1">Favorites</div>
          <div className="text-xl sm:text-2xl font-bold text-amber-600 dark:text-amber-400">
            {analytics.favoriteCount}
          </div>
        </div>
      </motion.div>

      {/* Analytics Dashboard */}
      <motion.div variants={itemVariants}>
        <LoveBubberAnalytics analytics={analytics} />
      </motion.div>

      {/* Action Buttons - Responsive */}
      <motion.div variants={itemVariants} className="flex gap-2 flex-wrap">
        <button
          onClick={handleReset}
          disabled={isResetting}
          className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-lg transition-colors text-xs sm:text-sm font-medium ${
            isResetting
              ? 'bg-red-400 text-white cursor-not-allowed opacity-75'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
          title={isResetting ? 'Resetting progress...' : 'Reset all progress'}
        >
          {isResetting ? '⏳ Resetting...' : '🔄 Reset'}
        </button>
      </motion.div>

      {/* Search and Filters */}
      <motion.div variants={itemVariants} className="space-y-2 sm:space-y-4">
        <LoveBubberSearchBox onChange={setLocalSearchQuery} />
        <LoveBubberFilterBar />
      </motion.div>

      {/* Search Results Section */}
      <motion.div variants={itemVariants}>
        <LoveBubberSearchResults
          filteredProblems={filteredProblems}
          searchQuery={localSearchQuery}
          filters={filters}
          onToggleCompletion={toggleCompletion}
          onToggleFavorite={toggleFavorite}
          onAddRevision={addRevision}
          onOpenNotes={handleOpenNotes}
          onOpenShare={handleOpenShare}
        />
      </motion.div>

      {/* Problems List - Accordion */}
      <motion.div variants={itemVariants} className="space-y-3">
        {Object.keys(problemsByTopic).length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              No problems match your filters. Try adjusting them!
            </p>
          </div>
        ) : (
          Object.entries(problemsByTopic).map(([topic, topicProblems]) => (
            <LoveBubberTopicAccordion
              key={topic}
              topic={topic}
              problems={topicProblems}
              isExpanded={expandedTopic === topic}
              onToggle={() =>
                setExpandedTopic(expandedTopic === topic ? null : topic)
              }
              onToggleCompletion={toggleCompletion}
              onToggleFavorite={toggleFavorite}
              onAddRevision={addRevision}
              onOpenNotes={handleOpenNotes}
              onOpenShare={handleOpenShare}
            />
          ))
        )}
      </motion.div>

      {/* Notes Modal */}
      <LoveBubberNotesModal
        isOpen={notesModal.isOpen}
        title="Edit Notes"
        initialNotes={notesModal.currentNotes}
        onClose={() => setNotesModal({ isOpen: false, problemId: null, currentNotes: '' })}
        onSave={handleSaveNotes}
      />

      {/* Share Modal */}
      {shareModal.problem && (
        <ShareModal
          isOpen={shareModal.isOpen}
          problem={shareModal.problem}
          streak={analytics.completedProblems}
          onClose={handleCloseShare}
        />
      )}
    </motion.div>
  );
}

export default KunalBootcampSheet;
