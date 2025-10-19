# 🔥 Firebase Setup Guide for Digital Love Diary

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `digital-love-diary` (or any name you prefer)
4. Enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project, click "Authentication" in the left sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider
5. Click "Save"

## Step 3: Create Firestore Database

1. Click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for now)
4. Select a location close to you
5. Click "Done"

## Step 4: Get Firebase Configuration

1. Click the gear icon ⚙️ next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon `</>`
5. Enter app nickname: `love-diary-web`
6. Click "Register app"
7. Copy the `firebaseConfig` object

## Step 5: Update Your Code

Replace the placeholder config in `script.js` with your actual Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-actual-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "your-actual-sender-id",
    appId: "your-actual-app-id"
};
```

## Step 6: Set Up Firestore Security Rules

1. Go to "Firestore Database" → "Rules" tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can read letters sent to them and write letters
    match /letters/{letterId} {
      allow read: if request.auth != null && 
        (resource.data.recipientId == request.auth.uid || 
         resource.data.senderId == request.auth.uid);
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.senderId;
    }
  }
}
```

3. Click "Publish"

## Step 7: Test Your App

1. Open `index.html` in your browser
2. Create two test accounts with different email addresses
3. Send a love letter from one account to the other
4. Check if the letter appears in the recipient's inbox

## 🎉 You're Done!

Your Digital Love Diary is now ready! You can:

- **Deploy to the web** using Firebase Hosting (free)
- **Share the link** with your girlfriend
- **Send love letters** to each other from anywhere
- **All letters are permanently stored** in the cloud

## 💡 Pro Tips

- **Firebase Hosting**: Deploy your app for free at `your-project.web.app`
- **Custom Domain**: Add your own domain name
- **Mobile App**: Convert to PWA for app-like experience
- **Backup**: All data is automatically backed up by Firebase

## 🔒 Security Notes

- The security rules ensure only you two can access your letters
- All data is encrypted in transit and at rest
- Firebase handles all security updates automatically

Enjoy your romantic digital love diary! 💕
