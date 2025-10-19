# 💕 Romantic Diary - Mobile App

A beautiful React Native mobile application for couples to share their love story through private letters and messages.

## 🌟 Features

### Core Features
- **User Authentication** - Secure signup and login
- **Room System** - Create or join private rooms with unique codes
- **Letter Exchange** - Send and receive heartfelt letters
- **Real-time Updates** - Instant notifications for new letters
- **Photo Sharing** - Attach photos to your letters
- **Voice Messages** - Record and send voice notes
- **Categories** - Organize letters by type (Love, Daily, Memory, Special)

### UI/UX Features
- **Beautiful Design** - Modern, romantic interface
- **Dark Mode** - Toggle between light and dark themes
- **Responsive Layout** - Optimized for all screen sizes
- **Smooth Animations** - Delightful user interactions
- **Offline Support** - Read letters even without internet

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd romantic-diary
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install iOS dependencies** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Run the app**
   ```bash
   # For Android
   npm run android
   
   # For iOS
   npm run ios
   ```

## 📱 App Structure

### Screens
- **Welcome Screen** - App introduction and navigation
- **Authentication** - Login and signup screens
- **Room Selection** - Create or join rooms
- **Room Dashboard** - Main room interface
- **Inbox** - View all received letters
- **Compose** - Write and send letters
- **Letter Detail** - Read individual letters
- **Profile** - User settings and account management

### Components
- **CustomButton** - Styled button component with variants
- **CustomInput** - Form input with validation
- **LoadingSpinner** - Loading indicator
- **Navigation** - Stack navigation setup

## 🎨 Design System

### Colors
- **Primary**: #6B46C1 (Purple)
- **Secondary**: #EC4899 (Pink)
- **Background**: #F8FAFC (Light Gray)
- **Surface**: #FFFFFF (White)
- **Text**: #1F2937 (Dark Gray)

### Typography
- **Headings**: Bold, 24-32px
- **Body**: Regular, 16px
- **Captions**: Medium, 12-14px

## 🔧 Development

### Project Structure
```
src/
├── components/
│   └── common/          # Reusable UI components
├── screens/             # App screens
├── theme/              # Colors and styling
└── navigation/         # Navigation setup
```

### Key Dependencies
- **React Native** - Mobile app framework
- **React Navigation** - Screen navigation
- **React Native Paper** - Material Design components
- **React Native Vector Icons** - Icon library
- **React Native Linear Gradient** - Gradient backgrounds

## 📦 Building for Production

### Android APK
```bash
# Generate release APK
cd android
./gradlew assembleRelease

# Generate signed bundle
./gradlew bundleRelease
```

### iOS IPA
```bash
# Open in Xcode
open ios/RomanticDiary.xcworkspace

# Archive and distribute through Xcode
```

## 🔮 Future Features

### Planned Enhancements
- **Firebase Integration** - Real-time database and authentication
- **Push Notifications** - Instant letter notifications
- **Photo Gallery** - Shared photo albums
- **Anniversary Reminders** - Special date notifications
- **Love Languages** - Relationship insights
- **Backup & Sync** - Cloud data synchronization
- **Voice Messages** - Audio letter attachments
- **Themes** - Customizable app themes

### Technical Improvements
- **Offline Support** - Full offline functionality
- **Performance Optimization** - Faster loading times
- **Security** - End-to-end encryption
- **Analytics** - Usage insights
- **Testing** - Comprehensive test coverage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💝 Support

For support, email support@romanticdiary.app or join our Discord community.

---

Made with 💕 for couples who want to share their love story.
