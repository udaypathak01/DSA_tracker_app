/**
 * Firestore Security Rules for DSAOrbit
 * 
 * ⚠️ IMPORTANT: This is NOT JavaScript code!
 * These are Firestore Security Rules (a separate language)
 * 
 * HOW TO USE:
 * 1. Go to Firebase Console > Firestore Database > Rules
 * 2. Clear existing rules
 * 3. Copy the rules below (everything between the comment markers)
 * 4. Paste into Firebase Console
 * 5. Click "Publish"
 * 
 * These rules ensure:
 * ✅ Users can only access their own documents
 * ✅ Only authenticated users can read/write
 * ✅ No public access to any documents
 * ✅ Proper data isolation between users
 */

/*

--- COPY RULES BELOW THIS LINE ---

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function to check if user owns the document
    function isOwner(userId) {
      return request.auth != null && request.auth.uid == userId;
    }

    // User Profile Documents
    // Each user can only read/write their own profile
    match /users/{userId} {
      allow read, write: if isOwner(userId);

      // Nested collections within user document (for future scalability)
      match /{anyCollection=**} {
        allow read, write: if isOwner(userId);
      }
    }

    // Activity Logs (optional - for analytics)
    // Users can only see their own activity
    match /activity/{userId} {
      allow read: if isOwner(userId);
      allow write: if false; // Server-side operations only
    }

    // Settings Collection (optional - for user preferences)
    match /settings/{userId} {
      allow read, write: if isOwner(userId);
    }

    // Deny all other access by default
    match /{document=**} {
      allow read, write: if false;
    }
  }
}

--- COPY RULES ABOVE THIS LINE ---

*/ 

/**
 * SECURITY RULE EXPLANATION
 * ==========================
 * 
 * 1. isOwner() Function:
 *    - Checks if request.auth.uid (logged-in user ID) matches the document's userId
 *    - Returns true only if both conditions are met:
 *      a) User is authenticated (request.auth != null)
 *      b) User's UID matches the document owner's UID
 * 
 * 2. /users/{userId} Rules:
 *    - allow read: Users can only read their own document
 *    - allow write: Users can only modify their own document
 *    - This includes create, update, delete operations
 * 
 * 3. Nested Collections:
 *    - /{anyCollection=**} allows future sub-collections with same permissions
 *    - Example: /users/{userId}/problems/{problemId}
 * 
 * 4. Default Deny:
 *    - match /{document=**} with allow read, write: if false;
 *    - This is the security best practice "fail-secure"
 *    - Only explicitly allowed operations work
 * 
 * 5. Why No Public Collections?
 *    - All user progress is private
 *    - Leaderboards could reveal user activity
 *    - Problem-solving patterns are sensitive
 */

/**
 * TESTING RULES
 * =============
 * 
 * Test with Firebase Console > Firestore > Rules Simulator:
 * 
 * Test Case 1: User reads own document
 *   - Path: /users/user123
 *   - Operation: read
 *   - Authentication: { uid: 'user123' }
 *   - Expected: ✅ ALLOW
 * 
 * Test Case 2: User reads another user's document
 *   - Path: /users/user456
 *   - Operation: read
 *   - Authentication: { uid: 'user123' }
 *   - Expected: ❌ DENY
 * 
 * Test Case 3: Unauthenticated user reads any document
 *   - Path: /users/user123
 *   - Operation: read
 *   - Authentication: null
 *   - Expected: ❌ DENY
 * 
 * Test Case 4: User writes to own document
 *   - Path: /users/user123
 *   - Operation: write
 *   - Authentication: { uid: 'user123' }
 *   - Expected: ✅ ALLOW
 */

/**
 * PRODUCTION DEPLOYMENT CHECKLIST
 * ===============================
 * 
 * Before deploying to production:
 * 
 * ✅ Rules restrict access to user's own documents
 * ✅ Rules deny unauthenticated access
 * ✅ Rules tested with Firestore simulator
 * ✅ Default deny rule at bottom (failsafe)
 * ✅ No public collections or documents
 * ✅ Authentication required for all operations
 * ✅ Consider rate limiting (Firebase allows with custom claims)
 * ✅ Monitor security in Firebase Console > Insights
 * 
 * For rate limiting (optional), add to rules:
 *   allow write: if isOwner(userId) && 
 *                request.time < resource.data.throttle_end_time;
 */

// This file is documentation only. Rules are pasted into Firebase Console.
// No errors should appear above - this is the expected format.
