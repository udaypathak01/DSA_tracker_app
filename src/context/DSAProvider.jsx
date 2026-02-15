import React, { useState, useCallback, useEffect } from 'react';
import DSAContext from './DSAContext';
import { loadFromLocalStorage, saveToLocalStorage, removeFromLocalStorage } from '../utils/localStorage';
import { sampleQuestions } from '../data/sampleQuestions';
import { calculateStreak, isToday } from '../utils/dateUtils';
import { getRandomQuote } from '../utils/quotes';

export const DSAProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [theme, setTheme] = useState('dark');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    topic: [],
    difficulty: [],
    completed: 'all', // 'all', 'completed', 'notCompleted'
    platform: [],
  });
  const [currentStreak, setCurrentStreak] = useState(0);
  const [lastActivityDate, setLastActivityDate] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [showModal, setShowModal] = useState({
    notes: false,
    addQuestion: false,
    editQuestion: false,
    delete: false,
    settings: false,
    share: false,
  });
  const [completedProblem, setCompletedProblem] = useState(null);
  const [shareQuote, setShareQuote] = useState('');
  const [userName, setUserName] = useState(loadFromLocalStorage('user-name') || 'Developer');

  // Initialize from localStorage or use sample data
  useEffect(() => {
    const saved = loadFromLocalStorage('dsa-tracker-data');
    const savedTheme = loadFromLocalStorage('dsa-theme');

    if (saved) {
      setQuestions(saved.questions);
      setCurrentStreak(saved.currentStreak || 0);
      setLastActivityDate(saved.lastActivityDate);
      setRecentActivity(saved.recentActivity || []);
    } else {
      setQuestions(sampleQuestions);
      saveToLocalStorage('dsa-tracker-data', {
        questions: sampleQuestions,
        currentStreak: 0,
        lastActivityDate: null,
        recentActivity: [],
      });
    }

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  // Save questions and activity to localStorage
  const saveData = useCallback((updatedQuestions, activity = null) => {
    setQuestions(updatedQuestions);
    const { streak, lastDate } = calculateStreak(updatedQuestions, lastActivityDate);
    setCurrentStreak(streak);
    setLastActivityDate(lastDate);

    const newActivity = activity
      ? [activity, ...recentActivity.slice(0, 4)]
      : recentActivity;
    setRecentActivity(newActivity);

    saveToLocalStorage('dsa-tracker-data', {
      questions: updatedQuestions,
      currentStreak: streak,
      lastActivityDate: lastDate,
      recentActivity: newActivity,
    });
  }, [lastActivityDate, recentActivity]);

  // Toggle question completion
  const toggleComplete = useCallback((questionId) => {
    const updated = questions.map(q => {
      if (q.id === questionId) {
        const newCompleted = !q.completed;
        return {
          ...q,
          completed: newCompleted,
          completedDate: newCompleted ? new Date().toISOString() : null,
          updatedAt: new Date().toISOString(),
        };
      }
      return q;
    });

    const question = questions.find(q => q.id === questionId);
    const newCompleted = !question.completed;
    const activity = {
      id: Date.now().toString(),
      action: newCompleted ? 'completed' : 'uncompleted',
      questionTitle: question.title,
      timestamp: new Date().toISOString(),
    };

    saveData(updated, activity);
  }, [questions, saveData]);

  // Open share modal for a specific problem
  const openShareModal = useCallback((problemId) => {
    const problem = questions.find(q => q.id === problemId);
    if (problem && problem.completed) {
      const quote = getRandomQuote();
      setShareQuote(quote);
      setCompletedProblem(problem);
      setShowModal(prev => ({ ...prev, share: true }));
    }
  }, [questions]);

  // Toggle favorite
  const toggleFavorite = useCallback((questionId) => {
    const updated = questions.map(q =>
      q.id === questionId ? { ...q, favorite: !q.favorite } : q
    );
    saveData(updated);
  }, [questions, saveData]);

  // Update notes
  const updateNotes = useCallback((questionId, notes) => {
    const updated = questions.map(q =>
      q.id === questionId
        ? { ...q, notes, updatedAt: new Date().toISOString() }
        : q
    );
    saveData(updated);
  }, [questions, saveData]);

  // Add new question
  const addQuestion = useCallback((newQuestion) => {
    const question = {
      ...newQuestion,
      id: `custom-${Date.now()}`,
      completed: false,
      favorite: false,
      notes: '',
      completedDate: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveData([...questions, question], {
      id: Date.now().toString(),
      action: 'added',
      questionTitle: newQuestion.title,
      timestamp: new Date().toISOString(),
    });
    return question;
  }, [questions, saveData]);

  // Edit question
  const editQuestion = useCallback((questionId, updates) => {
    const updated = questions.map(q =>
      q.id === questionId
        ? { ...q, ...updates, updatedAt: new Date().toISOString() }
        : q
    );
    saveData(updated);
  }, [questions, saveData]);

  // Delete question
  const deleteQuestion = useCallback((questionId) => {
    const updated = questions.filter(q => q.id !== questionId);
    saveData(updated, {
      id: Date.now().toString(),
      action: 'deleted',
      questionTitle: questions.find(q => q.id === questionId).title,
      timestamp: new Date().toISOString(),
    });
  }, [questions, saveData]);

  // Update theme
  const updateTheme = useCallback((newTheme) => {
    setTheme(newTheme);
    saveToLocalStorage('dsa-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  }, []);

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Reset all progress
  const resetAllProgress = useCallback(() => {
    // Delete dsa-tracker-data from localStorage
    removeFromLocalStorage('dsa-tracker-data');
    
    // Reset state to initial values
    setQuestions(sampleQuestions);
    setCurrentStreak(0);
    setLastActivityDate(null);
    setRecentActivity([]);
    setFilters({
      topic: [],
      difficulty: [],
      completed: 'all',
      platform: [],
    });
    setSearchQuery('');
  }, []);

  // Export data
  const exportData = useCallback(() => {
    const data = {
      questions,
      currentStreak,
      lastActivityDate,
      recentActivity,
      exportedAt: new Date().toISOString(),
    };
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dsa-tracker-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [questions, currentStreak, lastActivityDate, recentActivity]);

  // Import data
  const importData = useCallback((json, merge = false) => {
    try {
      const data = JSON.parse(json);
      let newQuestions = data.questions;

      if (merge) {
        // Merge: keep existing custom questions, update imported ones
        const importedIds = new Set(data.questions.map(q => q.id));
        const customQuestions = questions.filter(q => !importedIds.has(q.id));
        newQuestions = [...newQuestions, ...customQuestions];
      }

      saveData(newQuestions);
      setCurrentStreak(data.currentStreak || 0);
      setLastActivityDate(data.lastActivityDate || null);
      setRecentActivity(data.recentActivity || []);
      return true;
    } catch (error) {
      console.error('Import failed:', error);
      return false;
    }
  }, [questions, saveData]);

  // Get filtered questions
  const getFilteredQuestions = useCallback(() => {
    return questions.filter(q => {
      // Search filter
      if (
        searchQuery &&
        !q.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Topic filter
      if (filters.topic.length > 0 && !filters.topic.includes(q.topic)) {
        return false;
      }

      // Difficulty filter
      if (filters.difficulty.length > 0 && !filters.difficulty.includes(q.difficulty)) {
        return false;
      }

      // Completion filter
      if (filters.completed === 'completed' && !q.completed) return false;
      if (filters.completed === 'notCompleted' && q.completed) return false;

      // Platform filter
      if (filters.platform.length > 0 && !filters.platform.includes(q.platform)) {
        return false;
      }

      return true;
    });
  }, [questions, searchQuery, filters]);

  const value = {
    // State
    questions,
    theme,
    searchQuery,
    filters,
    currentStreak,
    lastActivityDate,
    recentActivity,
    editingQuestion,
    showModal,
    completedProblem,
    shareQuote,
    userName,

    // Actions
    toggleComplete,
    toggleFavorite,
    updateNotes,
    addQuestion,
    editQuestion,
    deleteQuestion,
    updateTheme,
    updateFilters,
    setSearchQuery,
    setEditingQuestion,
    setShowModal,
    setUserName,
    setCompletedProblem,
    setShareQuote,
    openShareModal,
    resetAllProgress,
    exportData,
    importData,
    getFilteredQuestions,

    // Utilities
    getQuestionById: (id) => questions.find(q => q.id === id),
    getTopicProgress: (topic) => {
      const topicQuestions = questions.filter(q => q.topic === topic);
      if (topicQuestions.length === 0) return 0;
      return Math.round(
        (topicQuestions.filter(q => q.completed).length / topicQuestions.length) * 100
      );
    },
    getAlgorithmProgress: (topic, algorithm) => {
      const algoQuestions = questions.filter(
        q => q.topic === topic && q.algorithm === algorithm
      );
      if (algoQuestions.length === 0) return 0;
      return Math.round(
        (algoQuestions.filter(q => q.completed).length / algoQuestions.length) * 100
      );
    },
    getOverallProgress: () => {
      if (questions.length === 0) return 0;
      return Math.round(
        (questions.filter(q => q.completed).length / questions.length) * 100
      );
    },
    getTotalCompleted: () => questions.filter(q => q.completed).length,
    getTotalQuestions: () => questions.length,
    getTopics: () => [...new Set(questions.map(q => q.topic))],
    getAlgorithmsByTopic: (topic) => [
      ...new Set(questions.filter(q => q.topic === topic).map(q => q.algorithm)),
    ],
  };

  return (
    <DSAContext.Provider value={value}>
      {children}
    </DSAContext.Provider>
  );
};

export default DSAProvider;