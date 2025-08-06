# Flodhästen - Swedish Learning App Structure

## 📁 Project Overview

**Flodhästen** (The River Horse) is a comprehensive Swedish language learning application built with React. The app features gamification, voice recognition, daily challenges, and achievement systems to create an engaging learning experience.

## 🏗️ Architecture

### **Core Technologies**
- **Frontend**: React 18 with Hooks
- **Styling**: CSS-in-JS with responsive design
- **State Management**: React useState, useCallback, useMemo
- **Performance**: React.memo, code splitting, lazy loading
- **Deployment**: GitHub Pages
- **Voice Recognition**: Web Speech API
- **Text-to-Speech**: Browser SpeechSynthesis API

### **Key Features**
- ✅ Achievement System with Gamification
- ✅ Daily Challenges with Progress Tracking
- ✅ Voice Recognition with Pronunciation Scoring
- ✅ Responsive Design (Mobile-First)
- ✅ Dark/Light Mode Support
- ✅ Multi-language Support (English, Kurdish)
- ✅ Performance Optimizations
- ✅ Error Boundaries & Loading States

## 📂 File Structure

```
Flodhasten/
├── public/
│   ├── animated_hippo.gif
│   ├── intro-video.mp4
│   ├── kurdish_flag.png
│   ├── united_kingdom_flag.png
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── App.js                    # Main application component
│   │   ├── Navigation.js             # Navigation bar component
│   │   ├── Home.js                   # Landing page component
│   │   ├── WordList.js               # Word management component
│   │   ├── Explore.js                # Explore section component
│   │   ├── Onboarding.js             # First-time user experience
│   │   ├── IntroAnimation.js         # Intro video component
│   │   ├── Achievements.js           # Achievement system UI
│   │   ├── AchievementNotification.js # Achievement popup
│   │   ├── DailyChallenges.js        # Daily challenges UI
│   │   ├── VoiceRecognition.js       # Voice recognition component
│   │   ├── LoadingSpinner.js         # Loading state component
│   │   ├── ErrorBoundary.js          # Error handling component
│   │   ├── Home.css                  # Home component styles
│   │   └── Navigation.css            # Navigation styles
│   ├── data/
│   │   ├── achievements.js           # Achievement definitions
│   │   ├── dailyChallenges.js        # Challenge templates
│   │   └── voiceRecognition.js       # Pronunciation data
│   ├── games/
│   │   ├── MultipleChoice.js         # Multiple choice game
│   │   ├── Flashcards.js             # Flashcard game
│   │   ├── Matching.js               # Matching game
│   │   ├── Spelling.js               # Spelling game
│   │   ├── AudioRecall.js            # Audio recall game
│   │   └── OddOneOut.js              # Odd one out game
│   ├── utils/
│   │   └── ttsApi.js                 # Text-to-speech API
│   └── index.js                      # Application entry point
└── Docs/
    └── Structure.md                   # This documentation
```

## 🎯 Core Components

### **App.js** - Main Application Component
**Purpose**: Central state management and routing
**Key Features**:
- Global state management (user progress, dark mode, language)
- Achievement and challenge tracking
- Performance optimizations (useCallback, useMemo, debouncing)
- Error boundary integration
- System dark mode detection

**State Management**:
```javascript
// User Progress
const [userData, setUserData] = useState({ xp: 0, coins: 0, level: 1 })
const [skillProgress, setSkillProgress] = useState({})
const [customWords, setCustomWords] = useState([])

// Achievement System
const [userStats, setUserStats] = useState({})
const [unlockedAchievements, setUnlockedAchievements] = useState([])

// Daily Challenges
const [dailyChallenges, setDailyChallenges] = useState([])
const [challengeProgress, setChallengeProgress] = useState({})

// UI State
const [isDarkMode, setIsDarkMode] = useState(false)
const [currentLanguage, setCurrentLanguage] = useState('en')
const [screen, setScreen] = useState('home')
```

### **Navigation.js** - Navigation Bar Component
**Purpose**: App navigation and settings
**Features**:




**Navigation Items**:
- Home
- Word List
- Games
- Explore
- Stories
- Achievements
- Daily Challenges
- Voice Recognition
- Avatar Shop

### **Home.js** - Landing Page Component
**Purpose**: Main dashboard and lesson selection
**Features**:
- Skill circles with progress indicators
- Word of the day display
- Progress statistics
- Reset/Erase functionality
- Responsive design with CSS classes

### **Achievements.js** - Achievement System UI
**Purpose**: Display and track user achievements
**Features**:
- Category filtering (Learning, Vocabulary, Games, etc.)
- Progress bars for each achievement
- Reward display (XP & Coins)
- Completion animations
- Statistics overview

**Achievement Categories**:
- Learning Progress (lessons completed)
- Vocabulary (words learned)
- Games (games played, perfect scores)
- Streaks (learning streaks)
- Pronunciation (TTS usage)
- Special (custom words, dark mode, etc.)

### **DailyChallenges.js** - Daily Challenges UI
**Purpose**: Daily challenge system with rewards
**Features**:
- 3 daily challenges with 24-hour expiry
- Difficulty scaling based on user level
- Progress tracking and statistics
- Bonus rewards for completion
- Real-time challenge completion

**Challenge Types**:
- Vocabulary challenges
- Grammar challenges
- Pronunciation challenges
- Game challenges
- Streak challenges
- Exploration challenges

### **VoiceRecognition.js** - Voice Recognition Component
**Purpose**: Pronunciation practice with real-time feedback
**Features**:
- Swedish speech recognition (sv-SE)
- Pronunciation scoring (0-100%)
- Real-time feedback and suggestions
- Difficulty selection (Easy, Medium, Hard)
- Progress statistics
- Native pronunciation playback

**Pronunciation Levels**:
- Excellent (90-100%) - 🌟
- Good (70-89%) - 👍
- Fair (50-69%) - 😐
- Needs Improvement (0-49%) - 😕

## 🎮 Game Components

### **MultipleChoice.js**
- Multiple choice vocabulary game
- Score tracking and feedback
- Achievement integration
- Challenge progress tracking

### **Flashcards.js**
- Flashcard learning system
- Word memorization
- Progress tracking

### **Matching.js**
- Word matching game
- Drag and drop interface
- Score calculation

### **Spelling.js**
- Spelling practice game
- Audio pronunciation
- Score tracking

### **AudioRecall.js**
- Audio-based word recall
- Memory training
- Pronunciation practice

### **OddOneOut.js**
- Word categorization game
- Logical thinking
- Vocabulary building

## 📊 Data Management

### **achievements.js** - Achievement System
**Purpose**: Define achievement categories and requirements
**Structure**:
```javascript
export const ACHIEVEMENTS = {
  learning: { /* lesson completion achievements */ },
  vocabulary: { /* word learning achievements */ },
  games: { /* game performance achievements */ },
  streaks: { /* streak achievements */ },
  pronunciation: { /* TTS usage achievements */ },
  special: { /* special achievements */ }
}
```

### **dailyChallenges.js** - Challenge System
**Purpose**: Define daily challenge templates
**Features**:
- Difficulty-based challenge generation
- 24-hour expiry system
- Reward calculation
- Progress tracking

### **voiceRecognition.js** - Voice Recognition Data
**Purpose**: Swedish pronunciation patterns and word database
**Features**:
- Swedish pronunciation patterns
- Common word database with pronunciation guides
- Analysis algorithms
- Feedback generation

## 🎨 UI/UX Design

### **Design Principles**
- **Mobile-First**: Responsive design starting from mobile
- **Dark Mode**: Full dark/light mode support
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance**: Optimized rendering and loading
- **Gamification**: Engaging visual feedback and rewards

### **Color Scheme**
- **Primary**: #3498db (Blue)
- **Success**: #27ae60 (Green)
- **Warning**: #f39c12 (Orange)
- **Error**: #e74c3c (Red)
- **Dark Mode**: #2c3e50 (Dark Blue)
- **Light Mode**: #f8f9fa (Light Gray)

### **Typography**
- **Primary Font**: "Georgia", serif
- **Secondary**: System fonts
- **Responsive Sizing**: clamp() CSS function

## 🚀 Performance Optimizations

### **React Optimizations**
- **React.memo**: Prevents unnecessary re-renders
- **useCallback**: Memoizes event handlers
- **useMemo**: Memoizes expensive calculations
- **Code Splitting**: React.lazy for component loading
- **Suspense**: Loading states for lazy components

### **Storage Optimizations**
- **Debounced localStorage**: Reduces synchronous writes
- **Persistent State**: User progress and settings
- **Error Boundaries**: Graceful error handling
- **Loading Spinners**: Visual feedback during loading

### **Asset Optimizations**
- **Image Optimization**: Compressed assets
- **Lazy Loading**: Components loaded on demand
- **CSS Extraction**: Separate CSS files for performance
- **Bundle Splitting**: Smaller initial bundle size

## 🔧 Technical Features

### **Voice Recognition**
- **Web Speech API**: Browser-native speech recognition
- **Swedish Language**: sv-SE language support
- **Real-time Analysis**: Instant pronunciation feedback
- **Error Handling**: Graceful fallbacks for unsupported browsers

### **Text-to-Speech**
- **Browser TTS**: SpeechSynthesis API
- **Swedish Voice**: Alva (sv-SE) voice preference only
- **Custom API**: Fallback TTS service
- **Rate Control**: Adjustable speech speed

### **State Management**
- **Local Storage**: Persistent user data
- **Session Management**: User progress tracking
- **Achievement Tracking**: Real-time achievement unlocking
- **Challenge System**: Daily challenge management

### **Responsive Design**
- **Breakpoints**: 600px, 872px mobile/desktop
- **Mobile Navigation**: Bottom navigation bar
- **Touch-Friendly**: Optimized for mobile interaction
- **Flexible Layout**: Grid and flexbox layouts

## 📱 Mobile Experience

### **Navigation**
- **Bottom Navigation**: Duolingo-style mobile nav
- **Icon-Only**: Space-efficient mobile design
- **Settings Dropdown**: Collapsible mobile menu
- **Touch Targets**: Adequate button sizes

### **Responsive Features**
- **Dynamic Typography**: Responsive font sizes
- **Flexible Grids**: Adaptive layouts
- **Touch Interactions**: Mobile-optimized interactions
- **Performance**: Optimized for mobile devices

## 🎯 Achievement System

### **Categories**
1. **Learning Progress**: Lesson completion milestones
2. **Vocabulary**: Word learning achievements
3. **Games**: Game performance and perfect scores
4. **Streaks**: Learning streak maintenance
5. **Pronunciation**: TTS usage achievements
6. **Special**: Unique achievements (dark mode, etc.)

### **Rewards**
- **XP Points**: Experience points for progression
- **Coins**: Virtual currency for avatar shop
- **Badges**: Visual achievement indicators
- **Notifications**: Real-time achievement alerts

## 🎯 Daily Challenges

### **System Features**
- **Daily Generation**: New challenges every 24 hours
- **Difficulty Scaling**: Based on user level
- **Progress Tracking**: Real-time completion status
- **Bonus Rewards**: Extra rewards for full completion

### **Challenge Types**
- **Vocabulary**: Word learning challenges
- **Grammar**: Grammar-focused challenges
- **Pronunciation**: TTS usage challenges
- **Games**: Game playing challenges
- **Streaks**: Streak maintenance challenges
- **Exploration**: Feature discovery challenges

## 🎤 Voice Recognition

### **Features**
- **Real-time Recognition**: Instant speech processing
- **Pronunciation Scoring**: 0-100% accuracy scoring
- **Feedback System**: Detailed improvement tips
- **Progress Tracking**: Pronunciation statistics
- **Difficulty Levels**: Easy, Medium, Hard word selection

### **Technical Implementation**
- **Speech Recognition**: Web Speech API
- **Language Support**: Swedish (sv-SE)
- **Analysis Algorithm**: Character-by-character comparison
- **Feedback Generation**: Personalized improvement tips

## 🔄 Development Workflow

### **Git Management**
- **Feature Branches**: Organized development
- **Commit Messages**: Descriptive commit history
- **Deployment**: Automated GitHub Pages deployment
- **Version Control**: Proper change tracking

### **Performance Monitoring**
- **Lighthouse Audits**: Performance metrics
- **Bundle Analysis**: Bundle size optimization
- **Error Tracking**: Error boundary implementation
- **User Analytics**: Usage pattern tracking

## 🚀 Deployment

### **Platform**: GitHub Pages
- **Automatic Deployment**: On push to main branch
- **Custom Domain**: flodhasten.github.io
- **HTTPS**: Secure connection
- **CDN**: Global content delivery

### **Build Process**
- **Production Build**: Optimized for deployment
- **Asset Optimization**: Compressed static assets
- **Error Handling**: Graceful error management
- **Performance**: Optimized loading times

## 📈 Future Enhancements

### **Planned Features**
1. **Cultural Integration**: Swedish culture lessons
2. **Social Features**: Study groups and leaderboards
3. **Advanced Analytics**: Detailed learning insights
4. **Gamified Learning**: More interactive games
5. **Offline Support**: PWA capabilities
6. **Multi-platform**: iOS/Android apps

### **Technical Improvements**
1. **Service Workers**: Offline functionality
2. **PWA Features**: App-like experience
3. **Advanced TTS**: Better pronunciation models
4. **Machine Learning**: Personalized learning paths
5. **Real-time Collaboration**: Multi-user features

---

**Last Updated**: January 2025
**Version**: 1.0.0
**Status**: Production Ready ✅
