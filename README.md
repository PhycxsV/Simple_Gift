# 💌 Digital Love Diary - Mobile App

A beautiful, romantic mobile application built with **Ionic React** for sending love letters to your special someone.

## 🌟 Features

- 📱 **Mobile-First Design** - Optimized for phones and tablets
- 💕 **Beautiful UI** - Romantic design with heart animations
- 🔐 **Secure Authentication** - Firebase Auth with email/password
- 📧 **Email-Based Routing** - Send letters to specific email addresses
- ⚡ **Real-Time Updates** - Letters appear instantly
- 💾 **Cloud Storage** - All letters permanently saved in Firebase
- 📖 **Letter Categories** - Daily thoughts, memories, future dreams, etc.
- 👀 **Read/Unread Status** - Know when letters are read
- 🔄 **Offline Support** - Works even without internet (with caching)

## 🚀 Tech Stack

- **Frontend**: Ionic React + TypeScript
- **Backend**: Firebase (Auth + Firestore)
- **Mobile**: Capacitor for native app features
- **Styling**: Ionic CSS + Custom themes
- **Icons**: Ionicons

## 📱 Mobile App Features

- **Native Feel** - iOS-style interface with smooth animations
- **Touch Optimized** - Perfect for mobile interactions
- **Push Notifications** - Get notified of new letters (ready for implementation)
- **Haptic Feedback** - Touch vibrations for better UX
- **Status Bar** - Custom status bar styling
- **Splash Screen** - Beautiful loading screen

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 16+ (recommended: 18+)
- npm or yarn
- Firebase account

### 1. Install Dependencies
```bash
npm install
```

### 2. Firebase Setup
1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication (Email/Password)
3. Create Firestore Database
4. Copy your Firebase config to `src/services/firebase.ts`

### 3. Run the App
```bash
# Development server
npm start

# Build for production
npm run build

# Run on device (after adding platform)
npx cap run ios
npx cap run android
```

## 📱 Building for Mobile

### iOS
```bash
npx cap add ios
npx cap run ios
```

### Android
```bash
npx cap add android
npx cap run android
```

### PWA (Progressive Web App)
```bash
npm run build
# Deploy the 'build' folder to any web server
```

## 🔥 Firebase Configuration

Replace the placeholder config in `src/services/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

## 🔒 Security Rules

Set up Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
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

## 💡 Usage

1. **Create Account** - Sign up with your email
2. **Login** - Access your love diary
3. **Write Letters** - Compose beautiful love letters
4. **Send to Email** - Letters are routed by email address
5. **Real-Time Updates** - Letters appear instantly
6. **Read & Reply** - View letters and compose responses

## 🎨 Customization

### Colors
Edit `src/theme/variables.css` to customize the app colors:

```css
:root {
  --ion-color-primary: #667eea;
  --ion-color-secondary: #ff6b9d;
  --ion-color-tertiary: #764ba2;
}
```

### Categories
Add new letter categories in `src/pages/Compose.tsx`:

```typescript
const categories = [
  { value: 'daily', label: 'Daily Thoughts', icon: '💭' },
  { value: 'memory', label: 'Special Memory', icon: '💝' },
  // Add more categories here
];
```

## 📦 Deployment

### Web (PWA)
```bash
npm run build
# Deploy 'build' folder to Firebase Hosting, Vercel, or Netlify
```

### Mobile App Stores
1. Build the app: `npm run build`
2. Sync with Capacitor: `npx cap sync`
3. Open in Xcode/Android Studio: `npx cap open ios/android`
4. Follow platform-specific deployment guides

## 🔮 Future Features

- 📸 Photo attachments in letters
- 🎵 Voice messages
- 📅 Anniversary reminders
- 💌 Letter templates
- 🌍 Multiple languages
- 📊 Love statistics
- 🎨 Custom themes

## 💕 Perfect Gift Features

- **Romantic Design** - Beautiful heart animations and gradients
- **Mobile Optimized** - Perfect for phones and tablets
- **Private & Secure** - Only you two can access
- **Permanent Storage** - Letters never get lost
- **Real-Time** - Instant delivery and notifications
- **Easy to Use** - Intuitive, touch-friendly interface

## 🤝 Contributing

This is a personal project, but feel free to fork and customize for your own love story!

## 📄 License

MIT License - Feel free to use this for your own romantic projects! 💕

---

**Made with 💕 for your special someone**
