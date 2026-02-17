# 🚀 Firebase Integration Quick Start Checklist

Complete this checklist to get Firebase running with DSAOrbit.

---

## Phase 1: Firebase Project Setup (5 minutes)

- [ ] Go to [Firebase Console](https://console.firebase.google.com)
- [ ] Create new project named "DSAOrbit"
- [ ] Enable Google Analytics (optional)
- [ ] Wait for project creation to complete

---

## Phase 2: Register Web App (3 minutes)

- [ ] Click on Web icon (</>) in Firebase Console
- [ ] Register your app with nickname "DSAOrbit Web"
- [ ] **Copy all 6 credentials:**
  - [ ] API Key
  - [ ] Auth Domain
  - [ ] Project ID
  - [ ] Storage Bucket
  - [ ] Messaging Sender ID
  - [ ] App ID

---

## Phase 3: Configure Authentication (5 minutes)

### Google Sign-In
- [ ] Go to Authentication > Sign-in method
- [ ] Enable **Google**
- [ ] Select project support email
- [ ] Click **Save**

### GitHub Sign-In
- [ ] Go to [GitHub Developer Settings](https://github.com/settings/developers)
- [ ] Create New OAuth App:
  - [ ] Application name: "DSAOrbit"
  - [ ] Homepage URL: `http://localhost:5173` (for dev)
  - [ ] Authorization callback: Leave empty for now
- [ ] Copy **Client ID** and **Client Secret**
- [ ] In Firebase, enable **GitHub** auth
- [ ] Paste Client ID and Client Secret
- [ ] Firebase shows your callback URL
- [ ] Update GitHub OAuth App with callback URL
- [ ] Return to Firebase and click **Save**

### Authorized Domains
- [ ] In Firebase Authentication > Settings
- [ ] Add **localhost** to authorized domains
- [ ] Add your production domain (e.g., example.com)

---

## Phase 4: Create Firestore Database (2 minutes)

- [ ] Go to Firestore Database
- [ ] Click **Create database**
- [ ] Choose location (closest to your users)
- [ ] Select **Production mode**
- [ ] Click **Create**
- [ ] Wait for database to initialize

---

## Phase 5: Configure Environment Variables (2 minutes)

- [ ] Copy `.env.example` to `.env.local`
- [ ] Open `.env.local` in your editor
- [ ] Replace each value with your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=paste_your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

- [ ] Save `.env.local`
- [ ] **IMPORTANT:** Never commit `.env.local` to git
- [ ] Verify `.env.local` is in `.gitignore`

---

## Phase 6: Configure Security Rules (3 minutes)

- [ ] In Firebase Console > Firestore > Rules
- [ ] Clear default rules
- [ ] Copy-paste rules from `FIRESTORE_RULES.js`:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

- [ ] Click **Publish**
- [ ] Wait for rules to publish

---

## Phase 7: Test Locally (5 minutes)

- [ ] Stop dev server if running
- [ ] Terminal: `npm run dev`
- [ ] Browser: `http://localhost:5173`
- [ ] Click on any protected page (e.g., Dashboard)
- [ ] Should redirect to `/login`
- [ ] See login page with:
  - [ ] Google button
  - [ ] GitHub button
  - [ ] Animations & gradient background

### Test Google Login
- [ ] Click "Continue with Google"
- [ ] Popup should open (allow popups if blocked)
- [ ] Sign in with Google account
- [ ] Should redirect to Dashboard
- [ ] Check Firestore Console:
  - [ ] New `users` collection created
  - [ ] Document named with your user ID
  - [ ] Contains displayName, email, photoURL, progress, etc.

### Test GitHub Login (Optional)
- [ ] Logout from user menu
- [ ] Click "Continue with GitHub"
- [ ] Authorize the app
- [ ] Should login successfully
- [ ] User document should update lastLoginAt

### Test Logout
- [ ] Click user profile in navbar (top right)
- [ ] Click "Logout"
- [ ] Should redirect to `/login`
- [ ] Should see login page

---

## Phase 8: Complete Problem & Verify Sync (5 minutes)

- [ ] After successful login, go to Dashboard
- [ ] Go to Topics page
- [ ] Complete one problem
- [ ] Check browser console for sync logs
- [ ] Go to Firestore Console > users collection
- [ ] Open your user document
- [ ] Expand `progress` object
- [ ] Verify `solvedProblems` array updated
- [ ] Verify `streak` increased
- [ ] Verify `recentActivity` shows action

---

## Phase 9: Test Persistence (3 minutes)

- [ ] Hard refresh browser (Ctrl+Shift+R)
- [ ] Should stay logged in
- [ ] Your progress should be loaded
- [ ] Firestore document should have `lastLoginAt` timestamp

---

## Phase 10: Production Preparation (Optional)

- [ ] Update GitHub OAuth App:
  - [ ] Homepage URL: Your production domain
  - [ ] Callback URL: `https://your-domain.firebaseapp.com/__/auth/handler`
- [ ] In Firebase Console > Authentication > Settings:
  - [ ] Add production domain to authorized domains
- [ ] Test on production domain
- [ ] Verify login/logout works
- [ ] Check Firestore syncing
- [ ] Monitor Firebase usage

---

## ✅ Final Verification

- [ ] `.env.local` created with all Firebase credentials
- [ ] `.env.local` is in `.gitignore` ⚠️ CRITICAL
- [ ] Firestore security rules published
- [ ] Google authentication working
- [ ] GitHub authentication working (optional)
- [ ] User document created in Firestore
- [ ] Progress syncs to Firestore
- [ ] Logout works properly
- [ ] Login persists across page reloads
- [ ] Protected routes redirect unauthenticated users

---

## 🐛 Common Issues & Quick Fixes

| Issue | Solution |
|-------|----------|
| "Cannot register web app" | Make sure Firebase project is fully created |
| "Popup blocked" | Allow popups in browser settings for localhost |
| "Firebase config not loading" | Restart dev server after`.env.local` change |
| "Permission denied" error | Check Firestore rules are published correctly |
| User document not created | Check auth is working and rules allow write |
| Progress not syncing | Check browser console for Firestore errors |
| GitHub OAuth not working | Verify callback URL matches in both Firebase & GitHub |

---

## 📞 Need Help?

- Check `FIREBASE_SETUP.md` for detailed guide
- Check `FIRESTORE_RULES.js` for rule explanations
- Check `IMPLEMENTATION_SUMMARY.md` for architecture details
- Review browser Console (F12) for errors
- Check Firebase Console > Logs for server errors

---

## ⏱️ Estimated Total Time: **30-40 minutes**

✅ Setup Complete! Your DSAOrbit app is production-ready.

---

**Keep this checklist for reference during deployment!**
