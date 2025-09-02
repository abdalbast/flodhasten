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
- **Translation**: Azure Cognitive Services Translator API
- **Deployment**: GitHub Pages
- **Performance**: React.memo, code splitting, lazy loading

## 🔐 Environment Variables

The application requires the following environment variables for full functionality:

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `AZURE_TRANSLATION_KEY` | Azure Cognitive Services Translator API key | Yes (for translation features) | - |
| `AZURE_TRANSLATION_REGION` | Azure region for Translator service | No | `westeurope` |
| `PORT` | Server port for translation proxy | No | `4000` |
| `NODE_ENV` | Environment mode | No | `development` |
| `TRANSLATE_SECRET` | Server-side HMAC secret for API security | Yes (for secure translations) | - |
| `REACT_APP_TRANSLATE_SECRET` | Client-side HMAC secret for signing requests | Yes (for secure translations) | - |

### 🔒 Security Requirements

- **Never commit `.env` files to version control**
- **Keep API keys secure and private**
- **Rotate keys regularly**
- **Use different keys for development and production**
- **The `.env.example` file is provided as a template only**

### 🚨 Secret Management

This repository has been audited for secrets and follows security best practices:
- ✅ `.env` files are ignored by git
- ✅ No real secrets are tracked in version control
- ✅ Environment variables are properly documented
- ✅ Placeholder values are used in examples
- ✅ HMAC-based API security implemented
- ✅ CORS protection for API endpoints

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

3. Set up environment variables (for translation features):
   ```bash
   # Option 1: Use the setup script (recommended)
   npm run setup-env
   
   # Option 2: Manual setup
   cp .env.example .env
   
   # Edit .env and add your Azure Translation API key
   # Get your key from: https://portal.azure.com/
   # 1. Create a Translator resource
   # 2. Go to Keys and Endpoint section
   # 3. Copy Key 1 or Key 2
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment Guide

### Staging Deployment (GitHub Pages)
```bash
# Deploy to staging
npm run deploy:staging
```

### Production Deployment (Vercel)
```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Deploy to production
npm run deploy:production
```

**Note**: Production deployment requires Vercel account setup and environment variables configuration in Vercel dashboard.

## 📦 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run deploy:staging` - Deploy to GitHub Pages (staging)
- `npm run deploy:production` - Deploy to Vercel (production)
- `npm test` - Run tests
- `npm run lighthouse` - Run performance audit
- `npm run setup-env` - Set up environment variables

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

### Production (Vercel)
The app is deployed on Vercel with enhanced security headers:
**https://flodhasten.vercel.app/**

### Staging (GitHub Pages)
The staging version is deployed on GitHub Pages at:
**https://abdalbast.github.io/flodhasten/**

### Security Headers
Production deployment includes comprehensive security headers:
- **Content Security Policy**: Restricts resource loading to trusted sources
- **Permissions Policy**: Controls microphone access, blocks geolocation/camera
- **Strict Transport Security**: Enforces HTTPS with preloading
- **X-Frame-Options**: Prevents clickjacking attacks
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **X-XSS-Protection**: Additional XSS protection layer

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