import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

/**
 * Firebase Configuration
 * Uses environment variables for sensitive credentials
 * Never hardcode Firebase keys in the source code
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

/**
 * Validate that all required Firebase environment variables are set
 */
const validateFirebaseConfig = () => {
  const requiredKeys = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID',
  ];

  const missingKeys = requiredKeys.filter(
    key => !import.meta.env[key]
  );

  if (missingKeys.length > 0) {
    console.warn(
      `Missing Firebase configuration: ${missingKeys.join(', ')}. ` +
      'Authentication and Firestore features will not work. ' +
      'Please add these variables to your .env file.'
    );
  }
};

validateFirebaseConfig();

/**
 * Initialize Firebase
 * This creates a singleton instance that is reused throughout the app
 */
const app = initializeApp(firebaseConfig);

/**
 * Initialize Firebase Authentication
 * Used for user login/logout and session management
 */
export const auth = getAuth(app);

/**
 * Initialize Google Auth Provider
 * Configured for popup signin with scopes for email and profile
 */
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');

/**
 * Initialize GitHub Auth Provider
 * Configured for popup signin
 */
export const githubProvider = new GithubAuthProvider();
githubProvider.addScope('user:email');
githubProvider.addScope('read:user');

/**
 * Initialize Firestore Database
 * Used for storing user progress data
 */
export const db = getFirestore(app);

export default app;
