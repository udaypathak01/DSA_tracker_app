import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

/**
 * Firestore utilities for syncing DSA progress
 * Provides functions to read, write, and update user progress data
 */

/**
 * Get user's progress from Firestore
 * @param {string} userId - Firebase user ID
 * @returns {Promise<Object>} User progress data
 */
export const getUserProgress = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data().progress || getDefaultProgress();
    }
    return getDefaultProgress();
  } catch (error) {
    console.error('Error getting user progress:', error);
    throw error;
  }
};

/**
 * Get default empty progress structure
 * @returns {Object} Default progress object
 */
export const getDefaultProgress = () => ({
  solvedProblems: [],
  streak: 0,
  lastSolvedDate: null,
  topicProgress: {},
  totalSolved: 0,
  lastActivityDate: null,
  recentActivity: [],
});

/**
 * Update questions list in Firestore
 * Called whenever user marks a problem complete/incomplete
 * @param {string} userId - Firebase user ID
 * @param {Array} questions - All questions with updated completion status
 */
export const updateQuestionsInFirestore = async (userId, questions) => {
  try {
    const userRef = doc(db, 'users', userId);

    // Calculate solved problems and topics
    const solvedProblems = questions
      .filter(q => q.completed)
      .map(q => ({
        id: q.id,
        title: q.title,
        completedDate: q.completedDate,
        difficulty: q.difficulty,
        topic: q.topic,
      }));

    // Calculate topic progress
    const topicProgress = {};
    questions.forEach(q => {
      if (!topicProgress[q.topic]) {
        topicProgress[q.topic] = { completed: 0, total: 0 };
      }
      topicProgress[q.topic].total += 1;
      if (q.completed) {
        topicProgress[q.topic].completed += 1;
      }
    });

    await updateDoc(userRef, {
      'progress.solvedProblems': solvedProblems,
      'progress.totalSolved': solvedProblems.length,
      'progress.topicProgress': topicProgress,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating questions in Firestore:', error);
    throw error;
  }
};

/**
 * Update streak and last activity date
 * Called when user solves a problem
 * @param {string} userId - Firebase user ID
 * @param {number} streak - Current streak count
 * @param {string} lastSolvedDate - ISO date string of last solved problem
 */
export const updateStreakInFirestore = async (
  userId,
  streak,
  lastSolvedDate
) => {
  try {
    const userRef = doc(db, 'users', userId);

    await updateDoc(userRef, {
      'progress.streak': streak,
      'progress.lastSolvedDate': lastSolvedDate,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating streak in Firestore:', error);
    throw error;
  }
};

/**
 * Update recent activity list
 * Called when user performs any action (solve, favorite, add notes, etc.)
 * @param {string} userId - Firebase user ID
 * @param {Array} recentActivity - Array of recent activity objects
 */
export const updateRecentActivityInFirestore = async (
  userId,
  recentActivity
) => {
  try {
    const userRef = doc(db, 'users', userId);

    await updateDoc(userRef, {
      'progress.recentActivity': recentActivity,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating recent activity in Firestore:', error);
    throw error;
  }
};

/**
 * Update notes for a specific problem
 * @param {string} userId - Firebase user ID
 * @param {Object} questionWithNotes - Question with updated notes
 */
export const updateQuestionNotesInFirestore = async (
  userId,
  questionWithNotes
) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const solvedProblems = userSnap.data().progress.solvedProblems || [];

      // Update notes in solved problems if it's completed
      const updatedSolvedProblems = solvedProblems.map(p =>
        p.id === questionWithNotes.id
          ? { ...p, notes: questionWithNotes.notes }
          : p
      );

      await updateDoc(userRef, {
        'progress.solvedProblems': updatedSolvedProblems,
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error('Error updating question notes in Firestore:', error);
    throw error;
  }
};

/**
 * Reset all progress for user (careful operation)
 * @param {string} userId - Firebase user ID
 */
export const resetProgressInFirestore = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);

    await updateDoc(userRef, {
      progress: getDefaultProgress(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error resetting progress in Firestore:', error);
    throw error;
  }
};

/**
 * Batch update user progress (used when making multiple changes)
 * More efficient than multiple individual update calls
 * @param {string} userId - Firebase user ID
 * @param {Object} updates - Object containing progress updates
 */
export const batchUpdateProgressInFirestore = async (userId, updates) => {
  try {
    const userRef = doc(db, 'users', userId);

    await updateDoc(userRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error batch updating progress in Firestore:', error);
    throw error;
  }
};
