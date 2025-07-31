# Flodhästen: Swedish Language Learning App

A simple, colorful, and mobile-friendly web app to help you learn Swedish vocabulary through interactive games and quizzes. Inspired by Memrise and Quizlet, but focused on simplicity and manual word entry.

## Features
- **Home Screen**: Quick access to all activities.
- **Add New Words**: Manually input Swedish words and their English meanings.
- **Word List**: View, edit, and delete your saved vocabulary.
- **Games & Activities**:
  - Flashcards
  - Matching
  - Spelling Challenge
  - Multiple Choice
  - Audio Recall (with TTS)
  - Odd-One-Out

## Tech Stack
- React (with functional components)
- Plain CSS (mobile-first, colorful, accessible)
- No backend: all data stored in browser (localStorage)

## Getting Started
1. Install dependencies:
   ```
   npm install
   ```
2. Start the development server:
   ```
   npm start
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization
- Add your own Swedish words via the app UI.
- Placeholder data is included for testing.

## File Structure
- `src/` - Main source code
  - `components/` - UI components
  - `games/` - Game/activity screens
  - `App.js` - Main app logic
  - `index.js` - Entry point
  - `styles/` - CSS files

## License
MIT 