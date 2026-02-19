import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  query,
  collection,
  where,
  getDocs,
  onSnapshot,
  deleteDoc,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

/**
 * Love Bubber DSA Firestore Utilities
 * Provides functions to manage Love Bubber's DSA progress independently
 */

/**
 * Initialize Love Bubber Progress for a user
 * @param {string} userId - Firebase user ID
 * @param {string} prefix - Collection prefix ('loveBubberProgress' or 'bootcamp')
 */
export const initializeLoveBubberProgress = async (userId, prefix = 'loveBubberProgress') => {
  try {
    const collectionName = prefix === 'bootcamp' ? 'kunalBootcampProgress' : 'loveBubberProgress';
    const userRef = doc(db, 'users', userId, collectionName, 'metadata');
    const docSnap = await getDoc(userRef);
    
    if (!docSnap.exists()) {
      await setDoc(userRef, {
        totalProblems: 0,
        completedProblems: 0,
        favoriteCount: 0,
        totalRevisions: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error('Error initializing Love Bubber progress:', error);
    throw error;
  }
};

/**
 * Get all Love Bubber problems for a user
 * @param {string} userId - Firebase user ID
 * @param {string} prefix - Collection prefix ('loveBubberProgress' or 'bootcamp')
 * @returns {Promise<Array>} Array of Love Bubber problems with progress
 */
export const getLoveBubberProgress = async (userId, prefix = 'loveBubberProgress') => {
  try {
    const collectionName = prefix === 'bootcamp' ? 'kunalBootcampProgress' : 'loveBubberProgress';
    const collectionRef = collection(db, 'users', userId, collectionName);
    const q = query(collectionRef, where('__name__', '!=', 'metadata'));
    const querySnapshot = await getDocs(q);
    
    const problems = [];
    querySnapshot.forEach((doc) => {
      problems.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    
    return problems;
  } catch (error) {
    console.error('Error getting Love Bubber progress:', error);
    throw error;
  }
};

/**
 * Subscribe to real-time Love Bubber progress updates
 * @param {string} userId - Firebase user ID
 * @param {Function} callback - Called with updated problems array
 * @param {string} prefix - Collection prefix ('loveBubberProgress' or 'bootcamp')
 * @returns {Function} Unsubscribe function
 */
export const subscribeLoveBubberProgress = (userId, callback, prefix = 'loveBubberProgress') => {
  try {
    const collectionName = prefix === 'bootcamp' ? 'kunalBootcampProgress' : 'loveBubberProgress';
    const collectionRef = collection(db, 'users', userId, collectionName);
    const q = query(collectionRef, where('__name__', '!=', 'metadata'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const problems = [];
      querySnapshot.forEach((doc) => {
        problems.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      callback(problems);
    });
    
    return unsubscribe;
  } catch (error) {
    console.error('Error subscribing to Love Bubber progress:', error);
    throw error;
  }
};

/**
 * Update individual Love Bubber problem
 * @param {string} userId - Firebase user ID
 * @param {string} problemId - Problem ID
 * @param {Object} data - Data to update
 */
export const updateLoveBubberProblem = async (userId, problemId, data) => {
  try {
    const problemRef = doc(db, 'users', userId, 'loveBubberProgress', problemId);
    
    const updateData = {
      ...data,
      updatedAt: serverTimestamp(),
    };
    
    // If marking completed, add completedAt timestamp
    if (data.completed === true && !data.completedAt) {
      updateData.completedAt = serverTimestamp();
    }
    
    await updateDoc(problemRef, updateData);
  } catch (error) {
    console.error('Error updating Love Bubber problem:', error);
    throw error;
  }
};

/**
 * Toggle completion status of a problem
 * @param {string} userId - Firebase user ID
 * @param {string} problemId - Problem ID
 * @param {string} prefix - Collection prefix ('loveBubberProgress' or 'bootcamp')
 */
export const toggleLoveBubberCompletion = async (userId, problemId, prefix = 'loveBubberProgress') => {
  try {
    const collectionName = prefix === 'bootcamp' ? 'kunalBootcampProgress' : 'loveBubberProgress';
    const problemRef = doc(db, 'users', userId, collectionName, problemId);
    const docSnap = await getDoc(problemRef);
    const completed = !docSnap.data().completed;
    
    const updateData = {
      completed,
      updatedAt: serverTimestamp(),
    };
    
    if (completed) {
      updateData.completedAt = serverTimestamp();
    } else {
      updateData.completedAt = null;
    }
    
    await updateDoc(problemRef, updateData);
  } catch (error) {
    console.error('Error toggling Love Bubber completion:', error);
    throw error;
  }
};

/**
 * Toggle favorite status of a problem
 * @param {string} userId - Firebase user ID
 * @param {string} problemId - Problem ID
 * @param {string} prefix - Collection prefix ('loveBubberProgress' or 'bootcamp')
 */
export const toggleLoveBubberFavorite = async (userId, problemId, prefix = 'loveBubberProgress') => {
  try {
    const collectionName = prefix === 'bootcamp' ? 'kunalBootcampProgress' : 'loveBubberProgress';
    const problemRef = doc(db, 'users', userId, collectionName, problemId);
    const docSnap = await getDoc(problemRef);
    const favorite = !docSnap.data().favorite;
    
    await updateDoc(problemRef, {
      favorite,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error toggling Love Bubber favorite:', error);
    throw error;
  }
};

/**
 * Increment revision count for a problem
 * @param {string} userId - Firebase user ID
 * @param {string} problemId - Problem ID
 * @param {string} prefix - Collection prefix ('loveBubberProgress' or 'bootcamp')
 */
export const incrementLoveBubberRevision = async (userId, problemId, prefix = 'loveBubberProgress') => {
  try {
    const collectionName = prefix === 'bootcamp' ? 'kunalBootcampProgress' : 'loveBubberProgress';
    const problemRef = doc(db, 'users', userId, collectionName, problemId);
    const docSnap = await getDoc(problemRef);
    
    const currentRevisions = docSnap.exists() ? docSnap.data().revisionCount || 0 : 0;
    
    await updateDoc(problemRef, {
      revisionCount: currentRevisions + 1,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error incrementing Love Bubber revision:', error);
    throw error;
  }
};

/**
 * Add or update notes for a problem
 * @param {string} userId - Firebase user ID
 * @param {string} problemId - Problem ID
 * @param {string} notes - Notes content
 * @param {string} prefix - Collection prefix ('loveBubberProgress' or 'bootcamp')
 */
export const updateLoveBubberNotes = async (userId, problemId, notes, prefix = 'loveBubberProgress') => {
  try {
    const collectionName = prefix === 'bootcamp' ? 'kunalBootcampProgress' : 'loveBubberProgress';
    const problemRef = doc(db, 'users', userId, collectionName, problemId);
    
    await updateDoc(problemRef, {
      notes,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating Love Bubber notes:', error);
    throw error;
  }
};

/**
 * Initialize a new problem in Love Bubber Progress
 * @param {string} userId - Firebase user ID
 * @param {Object} problem - Problem object from loveBubberProblems
 * @param {string} prefix - Collection prefix ('loveBubberProgress' or 'bootcamp')
 */
export const initializeLoveBubberProblem = async (userId, problem, prefix = 'loveBubberProgress') => {
  try {
    const collectionName = prefix === 'bootcamp' ? 'kunalBootcampProgress' : 'loveBubberProgress';
    const problemRef = doc(db, 'users', userId, collectionName, problem.id);
    
    await setDoc(problemRef, {
      topic: problem.topic,
      title: problem.title,
      difficulty: problem.difficulty,
      platform: problem.platform,
      link: problem.link,
      completed: false,
      favorite: false,
      revisionCount: 0,
      notes: '',
      completedAt: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error initializing Love Bubber problem:', error);
    throw error;
  }
};

/**
 * Get analytics statistics for Love Bubber
 * @param {string} userId - Firebase user ID
 * @param {string} prefix - Collection prefix ('loveBubberProgress' or 'bootcamp')
 * @returns {Promise<Object>} Analytics data
 */
export const getLoveBubberAnalytics = async (userId, prefix = 'loveBubberProgress') => {
  try {
    const problems = await getLoveBubberProgress(userId, prefix);
    
    const stats = {
      totalProblems: problems.length,
      completedProblems: problems.filter(p => p.completed).length,
      favoriteCount: problems.filter(p => p.favorite).length,
      totalRevisions: problems.reduce((sum, p) => sum + (p.revisionCount || 0), 0),
      completionPercentage: problems.length > 0 
        ? Math.round((problems.filter(p => p.completed).length / problems.length) * 100)
        : 0,
      byTopic: {},
      byDifficulty: {
        Easy: 0,
        Medium: 0,
        Hard: 0,
      },
    };
    
    // Calculate by topic
    problems.forEach(p => {
      if (!stats.byTopic[p.topic]) {
        stats.byTopic[p.topic] = {
          total: 0,
          completed: 0,
          percentage: 0,
        };
      }
      stats.byTopic[p.topic].total += 1;
      if (p.completed) {
        stats.byTopic[p.topic].completed += 1;
      }
      stats.byTopic[p.topic].percentage = Math.round(
        (stats.byTopic[p.topic].completed / stats.byTopic[p.topic].total) * 100
      );
    });
    
    // Calculate by difficulty
    problems.forEach(p => {
      if (p.difficulty && stats.byDifficulty.hasOwnProperty(p.difficulty)) {
        stats.byDifficulty[p.difficulty] += 1;
      }
    });
    
    return stats;
  } catch (error) {
    console.error('Error getting Love Bubber analytics:', error);
    throw error;
  }
};

/**
 * Reset all Love Bubber progress for a user (keeps problems, just resets progress)
 * @param {string} userId - Firebase user ID
 * @param {string} prefix - Collection prefix ('loveBubberProgress' or 'bootcamp')
 */
export const resetLoveBubberProgress = async (userId, prefix = 'loveBubberProgress') => {
  try {
    const collectionName = prefix === 'bootcamp' ? 'kunalBootcampProgress' : 'loveBubberProgress';
    const collectionRef = collection(db, 'users', userId, collectionName);
    
    // Get all problem documents (excluding metadata)
    const q = query(collectionRef, where('__name__', '!=', 'metadata'));
    const querySnapshot = await getDocs(q);
    
    // Use batch write to reset all problems efficiently
    const batch = writeBatch(db);
    
    querySnapshot.docs.forEach(doc => {
      batch.update(doc.ref, {
        completed: false,
        favorite: false,
        revisionCount: 0,
        notes: '',
        completedAt: null,
        updatedAt: serverTimestamp(),
      });
    });
    
    await batch.commit();
  } catch (error) {
    console.error('Error resetting Love Bubber progress:', error);
    throw error;
  }
};

/**
 * Export Love Bubber progress as JSON
 * @param {string} userId - Firebase user ID
 * @param {string} prefix - Collection prefix ('loveBubberProgress' or 'bootcamp')
 * @returns {Promise<string>} JSON string of progress
 */
export const exportLoveBubberProgress = async (userId, prefix = 'loveBubberProgress') => {
  try {
    const problems = await getLoveBubberProgress(userId, prefix);
    const stats = await getLoveBubberAnalytics(userId, prefix);
    
    const exportData = {
      exportDate: new Date().toISOString(),
      user: userId,
      statistics: stats,
      problems: problems,
    };
    
    return JSON.stringify(exportData, null, 2);
  } catch (error) {
    console.error('Error exporting Love Bubber progress:', error);
    throw error;
  }
};
