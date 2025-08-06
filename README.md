# Flodhästen - Swedish Language Learning App

A comprehensive Swedish language learning application built with React, featuring gamification, voice recognition, daily challenges, and achievement systems.

## 🚀 Features

- **Interactive Learning**: Multiple game modes (Flashcards, Matching, Spelling, etc.)
- **Voice Recognition**: Swedish pronunciation practice with real-time feedback
- **Daily Challenges**: New challenges every 24 hours with rewards
- **Achievement System**: Gamified progress tracking
- **Responsive Design**: Mobile-first design with dark/light mode
- **Multi-language Support**: English and Kurdish interfaces
- **Cultural Integration**: Swedish culture lessons and exploration

## 🏗️ Project Structure

```
Flodhasten/
├── public/                 # Static assets and HTML template
├── components/             # React components
│   ├── Navigation.js      # Main navigation bar
│   ├── Home.js           # Landing page
│   ├── Achievements.js   # Achievement system
│   ├── DailyChallenges.js # Daily challenges
│   ├── VoiceRecognition.js # Voice recognition
│   └── ...               # Other components
├── games/                 # Game components
│   ├── Flashcards.js
│   ├── Matching.js
│   ├── Spelling.js
│   └── ...               # Other games
├── data/                  # Data files
│   ├── achievements.js   # Achievement definitions
│   ├── dailyChallenges.js # Challenge templates
│   └── voiceRecognition.js # Pronunciation data
├── utils/                 # Utility functions
├── api/                   # API-related files
├── Kurdish resources/     # Kurdish language resources
├── Docs/                  # Documentation
├── App.js                 # Main application component
├── index.js              # Application entry point
└── package.json          # Dependencies and scripts
```

## 🛠️ Tech Stack

- **Frontend**: React 18 with Hooks
- **Styling**: CSS-in-JS with responsive design
- **State Management**: React useState, useCallback, useMemo
- **Voice Recognition**: Web Speech API
- **Text-to-Speech**: Browser SpeechSynthesis API
- **Deployment**: GitHub Pages
- **Performance**: React.memo, code splitting, lazy loading

## 🚀 Getting Started

### Prerequisites
- Node.js >= 16.0.0
- npm >= 8.0.0

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/abdalbast/flodhasten.git
   cd flodhasten
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run deploy` - Deploy to GitHub Pages
- `npm test` - Run tests
- `npm run lighthouse` - Run performance audit

## 🎯 Key Components

### Navigation System
- One row of tabs for main navigation
- Dropdown menu for additional features
- Mobile-responsive bottom navigation
- Dark/light mode toggle

### Achievement System
- Learning progress tracking
- Vocabulary milestones
- Game performance achievements
- Streak maintenance rewards

### Daily Challenges
- 3 daily challenges with 24-hour expiry
- Difficulty scaling based on user level
- Bonus rewards for completion
- Real-time progress tracking

### Voice Recognition
- Swedish speech recognition (sv-SE)
- Pronunciation scoring (0-100%)
- Real-time feedback and suggestions
- Native pronunciation playback

## 🎨 Design System

Based on the Moomin design system with:
- **Primary Color**: #002f6c (Deep Blue)
- **Secondary**: #ffffff (White)
- **Accent**: #f4e1d2 (Warm Beige)
- **Typography**: Inter (primary), Georgia (display)
- **Responsive**: Mobile-first design

## 🌐 Deployment

The app is deployed on GitHub Pages at:
**https://abdalbast.github.io/flodhasten/**

## 📱 Mobile Experience

- Duolingo-style bottom navigation
- Touch-optimized interactions
- Responsive typography and layouts
- PWA capabilities for offline use

## 🔧 Development

### File Organization
- Components are organized by feature
- CSS follows BEM methodology
- State management uses React hooks
- Performance optimizations with React.memo

### Code Quality
- ESLint configuration for code consistency
- Responsive design best practices
- Accessibility features (ARIA labels)
- Error boundaries for graceful error handling

## 📈 Performance

- Code splitting with React.lazy
- Optimized bundle sizes
- Service worker for caching
- Lighthouse performance scores > 90

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

---

**Flodhästen** - Learn Swedish with the River Horse 🦛 