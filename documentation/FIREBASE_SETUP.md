# Firebase Setup Guide for DSAOrbit

Complete guide to set up Firebase Authentication and Firestore for the DSAOrbit application.

## Table of Contents
1. [Firebase Project Creation](#firebase-project-creation)
2. [Enable Authentication](#enable-authentication)
3. [Configure OAuth Providers](#configure-oauth-providers)
4. [Create Firestore Database](#create-firestore-database)
5. [Environment Variables](#environment-variables)
6. [Security Rules](#security-rules)
7. [Testing](#testing)

---

## Firebase Project Creation

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter a project name (e.g., "DSAOrbit")
4. Choose your preferred options:
   - Enable Google Analytics (optional, but recommended)
   - Select or create a Google Cloud project
5. Click **"Create project"** and wait for setup to complete

### Step 2: Register Your Web App

1. In Firebase Console, click the **Web icon** (</> ) in the "Get started" section
2. Register your app with a nickname (e.g., "DSAOrbit Web")
3. Firebase will generate your configuration. **Copy these values**:
   ```
   apiKey
   authDomain
   projectId
   storageBucket
   messagingSenderId
   appId
   ```

---

## Enable Authentication

### Step 1: Enable Google Sign-In

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Click on **Google**
3. Toggle **Enable** to ON
4. Select a project support email
5. Click **Save**

### Step 2: Enable GitHub Sign-In

1. In **Authentication** > **Sign-in method**
2. Click on **GitHub**
3. You need to create a GitHub OAuth App first:

#### Create GitHub OAuth Application:

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Fill in the form:
   - **Application name**: DSAOrbit
   - **Homepage URL**: `http://localhost:5173` (for local dev)
   - **Authorization callback URL**: `https://<YOUR_FIREBASE_PROJECT_ID>.firebaseapp.com/__/auth/handler`
4. GitHub will provide:
   - **Client ID**
   - **Client Secret**

5. Back in Firebase Console > GitHub provider:
   - Paste your **Client ID**
   - Paste your **Client Secret**
   - Click **Save**

---

## Configure OAuth Providers

### For Production (Important!)

Update your GitHub OAuth App callback URL to:
```
https://<YOUR_FIREBASE_PROJECT>.firebaseapp.com/__/auth/handler
```

And update authorized JavaScript origins in database rules to include your deployed domain.

### Authorized Domains

In Firebase Authentication > Settings:
1. Go to the **Authorized domains** section
2. Add your domains:
   - `localhost` (development)
   - `example.com` (production)

---

## Create Firestore Database

### Step 1: Create Database

1. In Firebase Console, go to **Firestore Database**
2. Click **Create database**
3. Choose location (closest to your users)
4. Start with **Production mode** (we'll set rules)
5. Click **Create**

### Step 2: Verify Collection Structure

Firestore will automatically create the structure as users sign up. Expected structure:

```
Firestore Root
└── users (collection)
    └── {userId} (document)
        ├── displayName: string
        ├── email: string
        ├── photoURL: string
        ├── createdAt: timestamp
        ├── lastLoginAt: timestamp
        ├── progress: object
        │   ├── solvedProblems: array
        │   ├── streak: number
        │   ├── lastSolvedDate: string
        │   ├── topicProgress: object
        │   ├── totalSolved: number
        │   ├── recentActivity: array
        │   └── lastActivityDate: string
        └── updatedAt: timestamp
```

---

## Environment Variables

### Step 1: Copy Configuration

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

### Step 2: Important Security Notes

⚠️ **IMPORTANT**:
- Never commit `.env.local` to version control
- Never hardcode Firebase credentials in code
- Use environment variables only
- Add `.env.local` to `.gitignore`

---

## Security Rules

### Firestore Security Rules

1. In Firebase Console, go to **Firestore Database** > **Rules**
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Deny all other access by default
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

3. Click **Publish**

### What These Rules Do:
- ✅ Users can only access their own document
- ✅ Users can read and write their own progress
- ✅ Unauthenticated users cannot access Firestore
- ❌ No public access to any documents

---

## Testing

### Local Testing

1. Make sure you have `firebase` package installed:
   ```bash
   npm install firebase
   ```

2. Verify environment variables are loaded:
   - Start dev server: `npm run dev`
   - Open browser console (F12)
   - Check that Firebase initializes without errors

3. Test authentication:
   - Navigate to `/login`
   - Click "Continue with Google" or "Continue with GitHub"
   - Authorize the app
   - Should redirect to dashboard
   - Check Firestore: New user document should appear in `users` collection

### Production Testing

1. Deploy to your hosting (Vercel, Firebase Hosting, etc.)
2. Test OAuth callbacks work with production URLs
3. Verify Firestore rules work with production auth
4. Test all CRUD operations (create, read, update, delete)

---

## Troubleshooting

### Common Issues

#### "Auth popup blocked"
- Popup might be blocked by browser
- Check browser popup settings
- Users might need to allow popups

#### "GitHub OAuth error"
- Verify Client ID and Client Secret are correct
- Check authorized callback URL matches Firebase
- Ensure GitHub OAuth app is approved

#### "Firestore permission denied"
- Check security rules are published correctly
- Verify `request.auth.uid == userId`
- Check user is logged in before accessing Firestore

#### "Firebase config not loading"
- Verify `.env.local` file exists and has correct keys
- Check environment variable names match `VITE_*` prefix
- Environment variables only work in Vite with `VITE_` prefix
- Restart dev server after changing .env file

### Debug Mode

The Firebase library logs to console. Check browser dev tools for:
- Authentication state changes
- Firestore query results
- Error messages with error codes

---

## Architecture

### Data Flow

```
User Login → Firebase Auth
    ↓
Create/Update User Document in Firestore
    ↓
Load User Progress into Application State
    ↓
User Makes Changes (solves problem, updates notes, etc.)
    ↓
DSAProvider syncs changes to Firestore
    ↓
Cross-device sync enabled (user's progress updates everywhere)
```

### Offline Support

Current implementation:
- Works online: Syncs to Firestore in real-time
- Works offline: Uses localStorage as cache
- When online again: Re-syncs cached changes

For better offline support, consider Firebase Offline Persistence (enable in firebase.js):
```javascript
import { enableIndexedDbPersistence } from 'firebase/firestore';
enableIndexedDbPersistence(db);
```

---

## Next Steps

1. ✅ Set up Firebase project
2. ✅ Configure authentication providers
3. ✅ Create Firestore database
4. ✅ Set security rules
5. ✅ Add environment variables
6. Start the app: `npm run dev`
7. Test login functionality
8. Monitor Firestore for data creation

---

## Support

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [GitHub OAuth Docs](https://docs.github.com/en/developers/apps/building-oauth-apps)

---

Created for DSAOrbit • Data Structures & Algorithms Tracking Application
