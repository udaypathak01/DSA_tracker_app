import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from './useAuth';
import { loveBubberProblems, getLoveBubberTopics, getLoveBubberDifficulties } from '../data/loveBubberSheet';
import {
  getLoveBubberProgress,
  subscribeLoveBubberProgress,
  toggleLoveBubberCompletion,
  toggleLoveBubberFavorite,
  incrementLoveBubberRevision,
  updateLoveBubberNotes,
  initializeLoveBubberProblem,
  getLoveBubberAnalytics,
  resetLoveBubberProgress,
  exportLoveBubberProgress,
} from '../utils/loveBubberFirestore';
import { toast } from 'sonner';

/**
 * Custom hook for Love Bubber DSA Sheet management
 * Independent state management from main DSA tracker
 */
export const useLoveBubberDSA = () => {
  const { user } = useAuth();
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    topic: [],
    difficulty: [],
    completed: 'all', // 'all', 'completed', 'notCompleted'
  });
  const [analytics, setAnalytics] = useState({
    totalProblems: 0,
    completedProblems: 0,
    favoriteCount: 0,
    totalRevisions: 0,
    completionPercentage: 0,
    byTopic: {},
    byDifficulty: { Easy: 0, Medium: 0, Hard: 0 },
  });
  const unsubscribeRef = useRef(null);

  /**
   * Initialize Love Bubber problems on first load
   */
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const initializeProblems = async () => {
      try {
        setLoading(true);
        
        // Get existing problems from Firestore
        const existingProblems = await getLoveBubberProgress(user.uid);
        
        // If no problems exist, initialize with default problems ASYNC
        if (existingProblems.length === 0) {
          // Set loading but show default problems immediately
          setProblems([]);
          
          // Initialize all problems in parallel for faster processing
          const initPromises = loveBubberProblems.map(problem =>
            initializeLoveBubberProblem(user.uid, problem).catch(error => {
              console.error(`Failed to initialize ${problem.id}:`, error);
              // Continue with other problems even if one fails
              return null;
            })
          );
          
          // Wait for all initializations
          await Promise.all(initPromises);
          
          // Fetch all initialized problems
          const initializedProblems = await getLoveBubberProgress(user.uid);
          setProblems(initializedProblems);
        } else {
          setProblems(existingProblems);
        }
        
        setLoading(false);
        
        // DEFER: Calculate analytics AFTER rendering (not blocking)
        // This allows page to render immediately with problems
      } catch (error) {
        console.error('Error initializing Love Bubber problems:', error);
        toast.error('Failed to load Love Bubber problems');
        setLoading(false);
      }
    };

    initializeProblems();
  }, [user]);

  /**
   * Calculate analytics separately (deferred, non-blocking)
   */
  useEffect(() => {
    if (!problems.length || !user) return;

    const calculateAnalytics = async () => {
      try {
        const stats = await getLoveBubberAnalytics(user.uid);
        setAnalytics(stats);
      } catch (error) {
        console.error('Error calculating analytics:', error);
      }
    };

    calculateAnalytics();
  }, [problems, user]);

  /**
   * Subscribe to real-time updates
   */
  useEffect(() => {
    if (!user || problems.length === 0) return;

    try {
      unsubscribeRef.current = subscribeLoveBubberProgress(user.uid, async (updatedProblems) => {
        setProblems(updatedProblems);
        
        // Update analytics
        const stats = await getLoveBubberAnalytics(user.uid);
        setAnalytics(stats);
      });

      return () => {
        if (unsubscribeRef.current) {
          unsubscribeRef.current();
        }
      };
    } catch (error) {
      console.error('Error setting up real-time listener:', error);
    }
  }, [user, problems.length]);

  /**
   * Filter problems based on search and filters
   */
  useEffect(() => {
    let filtered = [...problems];

    // Apply topic filter
    if (filters.topic.length > 0) {
      filtered = filtered.filter(p => filters.topic.includes(p.topic));
    }

    // Apply difficulty filter
    if (filters.difficulty.length > 0) {
      filtered = filtered.filter(p => filters.difficulty.includes(p.difficulty));
    }

    // Apply completion filter
    if (filters.completed !== 'all') {
      if (filters.completed === 'completed') {
        filtered = filtered.filter(p => p.completed);
      } else if (filters.completed === 'notCompleted') {
        filtered = filtered.filter(p => !p.completed);
      }
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.topic.toLowerCase().includes(query)
      );
    }

    setFilteredProblems(filtered);
  }, [problems, searchQuery, filters]);

  /**
   * Toggle problem completion
   */
  const toggleCompletion = useCallback(async (problemId) => {
    if (!user) {
      toast.error('Please login to update progress');
      return;
    }

    const problem = problems.find(p => p.id === problemId);
    if (!problem) return;

    // Optimistic update - update UI immediately
    const updatedProblems = problems.map(p =>
      p.id === problemId ? { ...p, completed: !p.completed } : p
    );
    const previousProblems = problems;
    setProblems(updatedProblems);

    try {
      await toggleLoveBubberCompletion(user.uid, problemId, !problem.completed);
      toast.success(problem.completed ? 'Problem unmarked ✓' : 'Problem completed! 🎉');
    } catch (error) {
      console.error('Error toggling completion:', error);
      toast.error('Failed to update problem');
      // Revert optimistic update on error
      setProblems(previousProblems);
    }
  }, [user, problems]);

  /**
   * Toggle problem favorite with optimistic update
   */
  const toggleFavorite = useCallback(async (problemId) => {
    if (!user) {
      toast.error('Please login to update favorites');
      return;
    }

    const problem = problems.find(p => p.id === problemId);
    if (!problem) return;

    // Optimistic update - update UI immediately
    const updatedProblems = problems.map(p =>
      p.id === problemId ? { ...p, favorite: !p.favorite } : p
    );
    const previousProblems = problems;
    setProblems(updatedProblems);

    try {
      await toggleLoveBubberFavorite(user.uid, problemId, !problem.favorite);
      toast.success(problem.favorite ? 'Removed from favorites' : 'Added to favorites ⭐');
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error('Failed to update favorite');
      // Revert optimistic update on error
      setProblems(previousProblems);
    }
  }, [user, problems]);

  /**
   * Add revision for a problem with optimistic update
   */
  const addRevision = useCallback(async (problemId) => {
    if (!user) {
      toast.error('Please login to add revisions');
      return;
    }

    // Optimistic update - update UI immediately
    const updatedProblems = problems.map(p =>
      p.id === problemId ? { ...p, revisionCount: (p.revisionCount || 0) + 1 } : p
    );
    const previousProblems = problems;
    setProblems(updatedProblems);

    try {
      await incrementLoveBubberRevision(user.uid, problemId);
      toast.success('Revision added ✓');
    } catch (error) {
      console.error('Error adding revision:', error);
      toast.error('Failed to add revision');
      // Revert optimistic update on error
      setProblems(previousProblems);
    }
  }, [user, problems]);

  /**
   * Update notes for a problem
   */
  const updateNotes = useCallback(async (problemId, notes) => {
    if (!user) {
      toast.error('Please login to add notes');
      return;
    }

    try {
      await updateLoveBubberNotes(user.uid, problemId, notes);
      toast.success('Notes saved ✓');
    } catch (error) {
      console.error('Error updating notes:', error);
      toast.error('Failed to save notes');
    }
  }, [user]);

  /**
   * Get problem by ID
   */
  const getProblem = useCallback((problemId) => {
    return problems.find(p => p.id === problemId);
  }, [problems]);

  /**
   * Get all topics
   */
  const getTopics = useCallback(() => {
    return getLoveBubberTopics();
  }, []);

  /**
   * Get all difficulties
   */
  const getDifficulties = useCallback(() => {
    return getLoveBubberDifficulties();
  }, []);

  /**
   * Calculate overall progress percentage
   */
  const getOverallProgress = useCallback(() => {
    if (problems.length === 0) return 0;
    const completed = problems.filter(p => p.completed).length;
    return Math.round((completed / problems.length) * 100);
  }, [problems]);

  /**
   * Get problems by difficulty
   */
  const getProblemsByDifficulty = useCallback((difficulty) => {
    return problems.filter(p => p.difficulty === difficulty);
  }, [problems]);

  /**
   * Get problems by topic
   */
  const getProblemsByTopic = useCallback((topic) => {
    return filteredProblems.filter(p => p.topic === topic);
  }, [filteredProblems]);

  /**
   * Get favorite problems
   */
  const getFavoriteProblems = useCallback(() => {
    return problems.filter(p => p.favorite);
  }, [problems]);

  /**
   * Get completed problems
   */
  const getCompletedProblems = useCallback(() => {
    return problems.filter(p => p.completed);
  }, [problems]);

  /**
   * Get remaining problems
   */
  const getRemainingProblems = useCallback(() => {
    return problems.filter(p => !p.completed);
  }, [problems]);

  /**
   * Reset all progress
   */
  const resetProgress = useCallback(async () => {
    if (!user) {
      toast.error('Please login to reset progress');
      return;
    }

    // Optimistic update - reset UI immediately
    const previousProblems = problems;
    const resetProblems = problems.map(p => ({
      ...p,
      completed: false,
      favorite: false,
      revisionCount: 0,
      notes: '',
      completedAt: null,
    }));
    setProblems(resetProblems);

    try {
      await resetLoveBubberProgress(user.uid);
      toast.success('Progress reset successfully ✓');
    } catch (error) {
      console.error('Error resetting progress:', error);
      toast.error('Failed to reset progress');
      // Revert optimistic update on error
      setProblems(previousProblems);
    }
  }, [user, problems]);

  /**
   * Export progress as JSON
   */
  const exportProgress = useCallback(async () => {
    if (!user) {
      toast.error('Please login to export progress');
      return;
    }

    try {
      const jsonData = await exportLoveBubberProgress(user.uid);
      
      // Download JSON file
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonData));
      element.setAttribute('download', `love-bubber-progress-${new Date().toISOString().split('T')[0]}.json`);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      toast.success('Progress exported successfully');
    } catch (error) {
      console.error('Error exporting progress:', error);
      toast.error('Failed to export progress');
    }
  }, [user]);

  return {
    // State
    problems,
    filteredProblems,
    loading,
    analytics,
    searchQuery,
    filters,

    // Search and Filter
    setSearchQuery,
    setFilters,

    // Actions
    toggleCompletion,
    toggleFavorite,
    addRevision,
    updateNotes,
    resetProgress,
    exportProgress,

    // Getters
    getProblem,
    getTopics,
    getDifficulties,
    getOverallProgress,
    getProblemsByDifficulty,
    getProblemsByTopic,
    getFavoriteProblems,
    getCompletedProblems,
    getRemainingProblems,
  };
};

export default useLoveBubberDSA;
