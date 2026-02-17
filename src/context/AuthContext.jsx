import React, { createContext, useState, useEffect, useCallback } from 'react';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, googleProvider, githubProvider, db } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'sonner';

/**
 * Auth Context for managing user authentication state
 * Provides user data, loading states, and auth methods
 */
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  /**
   * Listen for auth state changes and initialize user persistence
   * This runs once on mount and handles:
   * - User login/logout
   * - Session persistence across page reloads
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // User is logged in - create or update user document in Firestore
          await initializeUserDocument(firebaseUser);
          setUser(firebaseUser);
        } else {
          // User is logged out
          setUser(null);
        }
      } catch (error) {
        console.error('Error in auth state change:', error);
        setAuthError(error.message);
      } finally {
        setLoading(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  /**
   * Initialize user document in Firestore on first login
   * Creates a new document if it doesn't exist, otherwise updates lastLoginAt
   * @param {Object} firebaseUser - Firebase user object from auth
   */
  const initializeUserDocument = async (firebaseUser) => {
    try {
      const userRef = doc(db, 'users', firebaseUser.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // First time login - create user document
        const newUserData = {
          displayName: firebaseUser.displayName || 'User',
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL || null,
          createdAt: serverTimestamp(),
          lastLoginAt: serverTimestamp(),
          progress: {
            solvedProblems: [],
            streak: 0,
            lastSolvedDate: null,
            topicProgress: {},
          },
        };
        await setDoc(userRef, newUserData);
        console.log('User document created in Firestore');
      } else {
        // Existing user - update last login timestamp
        await setDoc(
          userRef,
          { lastLoginAt: serverTimestamp() },
          { merge: true }
        );
      }
    } catch (error) {
      console.error('Error initializing user document:', error);
      throw error;
    }
  };

  /**
   * Sign in with Google using popup
   * Handles errors and shows toast notifications
   */
  const loginWithGoogle = useCallback(async () => {
    try {
      setAuthError(null);
      const result = await signInWithPopup(auth, googleProvider);
      toast.success(`Welcome back, ${result.user.displayName}!`);
      return result.user;
    } catch (error) {
      const errorMessage = handleAuthError(error);
      setAuthError(errorMessage);
      toast.error(errorMessage);
      throw error;
    }
  }, []);

  /**
   * Sign in with GitHub using popup
   * Handles errors and shows toast notifications
   */
  const loginWithGithub = useCallback(async () => {
    try {
      setAuthError(null);
      const result = await signInWithPopup(auth, githubProvider);
      toast.success(`Welcome back, ${result.user.displayName}!`);
      return result.user;
    } catch (error) {
      const errorMessage = handleAuthError(error);
      setAuthError(errorMessage);
      toast.error(errorMessage);
      throw error;
    }
  }, []);

  /**
   * Sign out the current user
   * Clears all local user data
   */
  const logout = useCallback(async () => {
    try {
      setAuthError(null);
      await signOut(auth);
      setUser(null);
      toast.success('Logged out successfully');
    } catch (error) {
      const errorMessage = handleAuthError(error);
      setAuthError(errorMessage);
      toast.error('Failed to logout: ' + errorMessage);
      throw error;
    }
  }, []);

  /**
   * Handle Firebase auth errors with user-friendly messages
   * Maps Firebase error codes to readable error messages
   * @param {Error} error - Firebase error object
   * @returns {String} User-friendly error message
   */
  const handleAuthError = (error) => {
    const errorCode = error.code;
    const errorMessages = {
      'auth/popup-closed-by-user': 'Login popup was closed. Please try again.',
      'auth/popup-blocked': 'Login popup was blocked. Please allow popups and try again.',
      'auth/operation-not-allowed': 'This login method is not enabled.',
      'auth/user-cancelled': 'You cancelled the login process.',
      'auth/account-exists-with-different-credential':
        'An account already exists with a different login method.',
      'auth/network-request-failed': 'Network error. Please check your connection.',
      'auth/too-many-requests': 'Too many failed login attempts. Please try again later.',
    };

    return errorMessages[errorCode] || error.message || 'An authentication error occurred';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authError,
        loginWithGoogle,
        loginWithGithub,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
