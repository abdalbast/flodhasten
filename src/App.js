import React, { useState, useEffect, useCallback, useMemo, Suspense } from 'react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import AchievementNotification from './components/AchievementNotification';
import ToastContainer from './components/ToastContainer';
import { getNewlyUnlockedAchievements } from './data/achievements';
import { getDailyChallenges, checkChallengeCompletion } from './data/dailyChallenges';
import { getLessonById } from './data/lessons';
import { sampleLessons, getLessonById as getSampleLessonById } from './data/sampleLessons';

// Lazy load components for code splitting
const WordList = React.lazy(() => import('./components/WordList'));
const Explore = React.lazy(() => import('./components/Explore'));
const IntroAnimation = React.lazy(() => import('./components/IntroAnimation'));
const Onboarding = React.lazy(() => import('./components/Onboarding'));
const Achievements = React.lazy(() => import('./components/Achievements'));
const DailyChallenges = React.lazy(() => import('./components/DailyChallenges'));
const VoiceRecognition = React.lazy(() => import('./components/VoiceRecognition'));
const TestingHub = React.lazy(() => import('./components/TestingHub'));
const CulturalIntegration = React.lazy(() => import('./components/CulturalIntegration'));
const SocialFeatures = React.lazy(() => import('./components/SocialFeatures'));
const AdvancedAnalytics = React.lazy(() => import('./components/AdvancedAnalytics'));
const GamifiedLearning = React.lazy(() => import('./components/GamifiedLearning'));
const LessonView = React.lazy(() => import('./components/LessonView'));

// Version tracking utility
const CACHE_VERSION = '1.0.1-1754482708961';
const checkForUpdates = () => {
  // Track app version for debugging
  const currentVersion = localStorage.getItem('appVersion');
  if (currentVersion !== CACHE_VERSION) {
    localStorage.setItem('appVersion', CACHE_VERSION);
    console.log('App version updated to:', CACHE_VERSION);
  }
};

// Lazy load components for code splitting
const StoryMode = React.lazy(() => import('./components/StoryMode'));
const AvatarShop = React.lazy(() => import('./components/AvatarShop'));
const Dialogue = React.lazy(() => import('./components/Dialogue'));
const GamesMenu = React.lazy(() => import('./games/GamesMenu'));
const Flashcards = React.lazy(() => import('./games/Flashcards'));
const Matching = React.lazy(() => import('./games/Matching'));
const Spelling = React.lazy(() => import('./games/Spelling'));
const MultipleChoice = React.lazy(() => import('./games/MultipleChoice'));
const AudioRecall = React.lazy(() => import('./games/AudioRecall'));
const OddOneOut = React.lazy(() => import('./games/OddOneOut'));

// Debounce utility for localStorage operations
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Create debounced localStorage save function
const debouncedSaveToStorage = debounce((key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}, 1000);

// Grouped Swedish Vocabulary Skills by Language
const SKILLS = {
  en: [
    {
      id: 'lesson1',
      name: 'Greetings & Basics',
      dialogue: {
        title: 'Hej!',
        lines: [
          { speaker: 'A', text: 'Hej!', translation: 'Hello!' },
          { speaker: 'B', text: 'Hej!', translation: 'Hello!' },
          { speaker: 'A', text: 'Tack!', translation: 'Thank you!' },
          { speaker: 'B', text: 'Hej då!', translation: 'Goodbye!' }
        ]
      },
      words: [
        { swedish: 'hej', english: 'hello' },
        { swedish: 'tack', english: 'thank you' },
        { swedish: 'ja', english: 'yes' },
        { swedish: 'nej', english: 'no' },
        { swedish: 'hej då', english: 'goodbye' },
      ],
    },
    {
      id: 'lesson2',
      name: 'People & Pronouns',
      dialogue: {
        title: 'Vi är vänner',
        lines: [
          { speaker: 'A', text: 'Jag är Anna.', translation: 'I am Anna.' },
          { speaker: 'B', text: 'Jag är Erik.', translation: 'I am Erik.' },
          { speaker: 'A', text: 'Du är snäll.', translation: 'You are kind.' },
          { speaker: 'B', text: 'Vi är vänner.', translation: 'We are friends.' }
        ]
      },
      words: [
        { swedish: 'jag', english: 'I' },
        { swedish: 'du', english: 'you (singular)' },
        { swedish: 'han', english: 'he' },
        { swedish: 'hon', english: 'she' },
        { swedish: 'vi', english: 'we' },
      ],
    },
    {
      id: 'lesson3',
      name: 'Food & Drink I',
      dialogue: {
        title: 'Vill du ha kaffe?',
        lines: [
          { speaker: 'A', text: 'Vill du ha kaffe?', translation: 'Do you want coffee?' },
          { speaker: 'B', text: 'Nej tack, jag vill ha te.', translation: 'No thank you, I want tea.' },
          { speaker: 'A', text: 'Okej.', translation: 'Okay.' },
          { speaker: 'B', text: 'Vill du ha bröd?', translation: 'Do you want bread?' }
        ]
      },
      words: [
        { swedish: 'vatten', english: 'water' },
        { swedish: 'bröd', english: 'bread' },
        { swedish: 'mjölk', english: 'milk' },
        { swedish: 'kaffe', english: 'coffee' },
        { swedish: 'te', english: 'tea' },
      ],
    },
    {
      id: 'lesson4',
      name: 'Family',
      dialogue: {
        title: 'Min mamma',
        lines: [
          { speaker: 'A', text: 'Det här är min mamma.', translation: 'This is my mum.' },
          { speaker: 'B', text: 'Hej mamma!', translation: 'Hello mum!' },
          { speaker: 'A', text: 'Min bror heter Leo.', translation: 'My brother is called Leo.' }
        ]
      },
      words: [
        { swedish: 'mamma', english: 'mum' },
        { swedish: 'pappa', english: 'dad' },
        { swedish: 'syster', english: 'sister' },
        { swedish: 'bror', english: 'brother' },
        { swedish: 'barn', english: 'child' },
      ],
    },
    {
      id: 'lesson5',
      name: 'Numbers I',
      dialogue: {
        title: 'Fem barn',
        lines: [
          { speaker: 'A', text: 'Jag har fem barn!', translation: 'I have five children!' },
          { speaker: 'B', text: 'Fem? Jag har tre.', translation: 'Five? I have three.' },
          { speaker: 'A', text: 'Ett, två, tre, fyra, fem!', translation: 'One, two, three, four, five!' }
        ]
      },
      words: [
        { swedish: 'ett', english: 'one' },
        { swedish: 'två', english: 'two' },
        { swedish: 'tre', english: 'three' },
        { swedish: 'fyra', english: 'four' },
        { swedish: 'fem', english: 'five' },
      ],
    },
    {
      id: 'lesson6',
      name: 'Food & Drink II',
      dialogue: {
        title: 'Vill du ha ost?',
        lines: [
          { speaker: 'A', text: 'Vad vill du äta?', translation: 'What do you want to eat?' },
          { speaker: 'B', text: 'Äpple och ost.', translation: 'Apple and cheese.' },
          { speaker: 'A', text: 'Vill du ha fisk?', translation: 'Do you want fish?' },
          { speaker: 'B', text: 'Nej tack.', translation: 'No thank you.' }
        ]
      },
      words: [
        { swedish: 'äpple', english: 'apple' },
        { swedish: 'ost', english: 'cheese' },
        { swedish: 'fisk', english: 'fish' },
        { swedish: 'kött', english: 'meat' },
        { swedish: 'grönsaker', english: 'vegetables' },
      ],
    },
    {
      id: 'lesson7',
      name: 'Colors',
      dialogue: {
        title: 'Vilken färg?',
        lines: [
          { speaker: 'A', text: 'Vilken färg är det?', translation: 'What color is it?' },
          { speaker: 'B', text: 'Det är blått.', translation: 'It is blue.' },
          { speaker: 'A', text: 'Jag gillar rött.', translation: 'I like red.' },
          { speaker: 'B', text: 'Gul är också vackert.', translation: 'Yellow is also beautiful.' }
        ]
      },
      words: [
        { swedish: 'röd', english: 'red' },
        { swedish: 'blå', english: 'blue' },
        { swedish: 'gul', english: 'yellow' },
        { swedish: 'grön', english: 'green' },
        { swedish: 'vit', english: 'white' },
      ],
    },
    {
      id: 'lesson8',
      name: 'Weather',
      dialogue: {
        title: 'Vad är vädret?',
        lines: [
          { speaker: 'A', text: 'Vad är vädret idag?', translation: 'What is the weather today?' },
          { speaker: 'B', text: 'Det är soligt.', translation: 'It is sunny.' },
          { speaker: 'A', text: 'Det regnar inte.', translation: 'It is not raining.' },
          { speaker: 'B', text: 'Det är varmt.', translation: 'It is warm.' }
        ]
      },
      words: [
        { swedish: 'sol', english: 'sun' },
        { swedish: 'regn', english: 'rain' },
        { swedish: 'snö', english: 'snow' },
        { swedish: 'varm', english: 'warm' },
        { swedish: 'kall', english: 'cold' },
      ],
    },
    {
      id: 'lesson9',
      name: 'Time',
      dialogue: {
        title: 'Vad är klockan?',
        lines: [
          { speaker: 'A', text: 'Vad är klockan?', translation: 'What time is it?' },
          { speaker: 'B', text: 'Klockan är tre.', translation: 'It is three o\'clock.' },
          { speaker: 'A', text: 'Tack!', translation: 'Thank you!' },
          { speaker: 'B', text: 'Varsågod!', translation: 'You\'re welcome!' }
        ]
      },
      words: [
        { swedish: 'klockan', english: 'o\'clock' },
        { swedish: 'tid', english: 'time' },
        { swedish: 'morgon', english: 'morning' },
        { swedish: 'kväll', english: 'evening' },
        { swedish: 'natt', english: 'night' },
      ],
    },
    {
      id: 'lesson10',
      name: 'Shopping',
      dialogue: {
        title: 'Vad kostar det?',
        lines: [
          { speaker: 'A', text: 'Vad kostar det?', translation: 'How much does it cost?' },
          { speaker: 'B', text: 'Det kostar tjugo kronor.', translation: 'It costs twenty kronor.' },
          { speaker: 'A', text: 'Det är billigt.', translation: 'That is cheap.' },
          { speaker: 'B', text: 'Ja, det är en bra pris.', translation: 'Yes, it is a good price.' }
        ]
      },
      words: [
        { swedish: 'kronor', english: 'kronor (Swedish currency)' },
        { swedish: 'dyr', english: 'expensive' },
        { swedish: 'billig', english: 'cheap' },
        { swedish: 'pris', english: 'price' },
        { swedish: 'pengar', english: 'money' },
      ],
    },
    {
      id: 'lesson11',
      name: 'Transport',
      dialogue: {
        title: 'Hur tar du dig hit?',
        lines: [
          { speaker: 'A', text: 'Hur tar du dig hit?', translation: 'How do you get here?' },
          { speaker: 'B', text: 'Jag tar bussen.', translation: 'I take the bus.' },
          { speaker: 'A', text: 'Jag går.', translation: 'I walk.' },
          { speaker: 'B', text: 'Det är bra för hälsan.', translation: 'That is good for health.' }
        ]
      },
      words: [
        { swedish: 'buss', english: 'bus' },
        { swedish: 'tåg', english: 'train' },
        { swedish: 'bil', english: 'car' },
        { swedish: 'cykel', english: 'bicycle' },
        { swedish: 'gå', english: 'walk' },
      ],
    },
    {
      id: 'lesson12',
      name: 'Hobbies',
      dialogue: {
        title: 'Vad gillar du att göra?',
        lines: [
          { speaker: 'A', text: 'Vad gillar du att göra?', translation: 'What do you like to do?' },
          { speaker: 'B', text: 'Jag gillar att läsa.', translation: 'I like to read.' },
          { speaker: 'A', text: 'Jag gillar att spela fotboll.', translation: 'I like to play football.' },
          { speaker: 'B', text: 'Det låter kul!', translation: 'That sounds fun!' }
        ]
      },
      words: [
        { swedish: 'läsa', english: 'read' },
        { swedish: 'spela', english: 'play' },
        { swedish: 'fotboll', english: 'football' },
        { swedish: 'musik', english: 'music' },
        { swedish: 'resa', english: 'travel' },
      ],
    }
  ],
  ku: [
    {
      id: 'lesson1',
      name: 'سڵاوکردن',
      dialogue: {
        title: 'سڵاو!',
        lines: [
          { speaker: 'A', text: 'سڵاو!', translation: 'Hello!' },
          { speaker: 'B', text: 'سڵاو!', translation: 'Hello!' },
          { speaker: 'A', text: 'چۆنی؟', translation: 'How are you?' },
          { speaker: 'B', text: 'باشم، سوپاس!', translation: 'Good, thanks!' },
          { speaker: 'A', text: 'سوپاس!', translation: 'Thank you!' },
          { speaker: 'B', text: 'خوات لەگەڵ', translation: 'Goodbye!' }
        ]
      },
      words: [
        { swedish: 'hej', kurdish: 'سڵاو', english: 'hello' },
        { swedish: 'tack', kurdish: 'سوپاس', english: 'thank you' },
        { swedish: 'ja', kurdish: 'بەڵێ', english: 'yes' },
        { swedish: 'nej', kurdish: 'نەخێر', english: 'no' },
        { swedish: 'hej då', kurdish: 'خوات لەگەڵ', english: 'goodbye' },
      ],
    },
    {
      id: 'lesson2',
      name: 'پرسیارەکانی گشتی',
      dialogue: {
        title: 'پرسیارکردن',
        lines: [
          { speaker: 'A', text: 'چی؟', translation: 'What?' },
          { speaker: 'B', text: 'كەی؟', translation: 'Who?' },
          { speaker: 'A', text: 'لەكوێ؟', translation: 'Where?' },
          { speaker: 'B', text: 'كێ؟', translation: 'When?' },
          { speaker: 'A', text: 'چۆنی؟', translation: 'How are you?' },
          { speaker: 'B', text: 'باشم، سوپاس!', translation: 'Good, thanks!' }
        ]
      },
      words: [
        { swedish: 'vad', kurdish: 'چی', english: 'what' },
        { swedish: 'vem', kurdish: 'كەی', english: 'who' },
        { swedish: 'var', kurdish: 'لەكوێ', english: 'where' },
        { swedish: 'när', kurdish: 'كێ', english: 'when' },
        { swedish: 'hur mår du', kurdish: 'چۆنی', english: 'how are you' },
      ],
    }
  ],
  'ku-lat': [
    {
      id: 'lesson1',
      name: 'Silavkirin',
      dialogue: {
        title: 'Silav!',
        lines: [
          { speaker: 'A', text: 'Silav!', translation: 'Hello!' },
          { speaker: 'B', text: 'Silav!', translation: 'Hello!' },
          { speaker: 'A', text: 'Tu çonî?', translation: 'How are you?' },
          { speaker: 'B', text: 'Başim, sipas!', translation: 'Good, thanks!' },
          { speaker: 'A', text: 'Sipas!', translation: 'Thank you!' },
          { speaker: 'B', text: 'Xatirê te', translation: 'Goodbye!' }
        ]
      },
      words: [
        { swedish: 'hej', kurdish: 'silav', english: 'hello' },
        { swedish: 'tack', kurdish: 'sipas', english: 'thank you' },
        { swedish: 'ja', kurdish: 'belê', english: 'yes' },
        { swedish: 'nej', kurdish: 'na', english: 'no' },
        { swedish: 'hej då', kurdish: 'xatirê te', english: 'goodbye' },
      ],
    },
    {
      id: 'lesson2',
      name: 'Pirsên Giştî',
      dialogue: {
        title: 'Pirsîn',
        lines: [
          { speaker: 'A', text: 'Çi?', translation: 'What?' },
          { speaker: 'B', text: 'Kî?', translation: 'Who?' },
          { speaker: 'A', text: 'Li ku?', translation: 'Where?' },
          { speaker: 'B', text: 'Kengî?', translation: 'When?' },
          { speaker: 'A', text: 'Tu çonî?', translation: 'How are you?' },
          { speaker: 'B', text: 'Başim, sipas!', translation: 'Good, thanks!' }
        ]
      },
      words: [
        { swedish: 'vad', kurdish: 'çi', english: 'what' },
        { swedish: 'vem', kurdish: 'kî', english: 'who' },
        { swedish: 'var', kurdish: 'li ku', english: 'where' },
        { swedish: 'när', kurdish: 'kengî', english: 'when' },
        { swedish: 'hur mår du', kurdish: 'tu çonî', english: 'how are you' },
      ],
    }
  ]
};

// Helper: get progress from localStorage or default
const getInitialProgress = () => {
  const saved = localStorage.getItem('progress');
  if (saved) return JSON.parse(saved);
  return { gamesPlayed: 0, streak: 1 };
};

function getInitialSkillProgress() {
  const saved = localStorage.getItem('skillProgress');
  if (saved) return JSON.parse(saved);
  // Only the first skill is unlocked at the start (0% progress)
  return { lesson1: 0 };
}

// Helper: get user data from localStorage or default
function getInitialUserData() {
  const saved = localStorage.getItem('userData');
  if (saved) return JSON.parse(saved);
  return {
    xp: 0,
    level: 1,
    coins: 100,
    currentAvatar: 'moomin',
    ownedAvatars: ['moomin'],
    ownedMerchandise: [],
    completedObjectives: [],
    lastObjectiveReset: null
  };
}

// Helper: calculate level from XP
function calculateLevel(xp) {
  return Math.floor(xp / 100) + 1;
}



function App() {
  const [screen, setScreen] = useState('home');
  const [selectedSkillId, setSelectedSkillId] = useState('lesson1');
  const [skillProgress, setSkillProgress] = useState(getInitialSkillProgress());
  const [game, setGame] = useState(null); // Which game is active
  const [progress, setProgress] = useState(getInitialProgress());
  const [userData, setUserData] = useState(getInitialUserData());

  const [lessonWords, setLessonWords] = useState([]);
  const [customWords, setCustomWords] = useState(() => {
    const saved = localStorage.getItem('customWords');
    return saved ? JSON.parse(saved) : [];
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('isDarkMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    // Detect system dark mode preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    let saved = localStorage.getItem('currentLanguage');
    if (!['sv', 'ku', 'ku-lat'].includes(saved)) {
      saved = 'sv';
      localStorage.setItem('currentLanguage', 'sv');
    }
    return saved;
  });
  const [showIntro, setShowIntro] = useState(() => {
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    return !hasSeenIntro;
  });
  const [showOnboarding, setShowOnboarding] = useState(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    return !hasSeenOnboarding;
  });
  const [showDialogue, setShowDialogue] = useState(false);

  // Achievement system state
  const [userStats, setUserStats] = useState(() => {
    const saved = localStorage.getItem('userStats');
    return saved ? JSON.parse(saved) : {
      lessons_completed: 0,
      words_learned: 0,
      games_played: 0,
      perfect_scores: 0,
      streak_days: 0,
      pronunciations_used: 0,
      custom_words_added: 0,
      dark_mode_used: 0,
      languages_tried: 1,
      pronunciation_attempts: 0,
      excellent_pronunciations: 0,
      good_pronunciations: 0,
      fair_pronunciations: 0,
      needs_improvement_pronunciations: 0,
      cultural_lessons_completed: 0
    };
  });
  const [unlockedAchievements, setUnlockedAchievements] = useState(() => {
    const saved = localStorage.getItem('unlockedAchievements');
    return saved ? JSON.parse(saved) : [];
  });
  const [showAchievementNotification, setShowAchievementNotification] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState(null);

  // Daily Challenges state
  const [dailyChallenges, setDailyChallenges] = useState(() => {
    const saved = localStorage.getItem('dailyChallenges');
    return saved ? JSON.parse(saved) : getDailyChallenges();
  });
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [challengeProgress, setChallengeProgress] = useState({});
  const [showChallengeComplete, setShowChallengeComplete] = useState(false);

  // Cultural Integration state
  const [culturalProgress, setCulturalProgress] = useState(() => {
    const saved = localStorage.getItem('culturalProgress');
    return saved ? JSON.parse(saved) : {};
  });



  // Add lesson state variables after the existing state declarations
  const [currentLesson, setCurrentLesson] = useState(null);
  const [showLesson, setShowLesson] = useState(false);

  // Memoized calculations
  const currentSkills = useMemo(() => SKILLS[currentLanguage] || SKILLS.en, [currentLanguage]);
  const selectedSkill = useMemo(() => currentSkills.find(s => s.id === selectedSkillId), [currentSkills, selectedSkillId]);
  const skillWords = useMemo(() => selectedSkill ? selectedSkill.words.map(w => ({ ...w, stats: { correct: 0, incorrect: 0, lastPracticed: null } })) : [], [selectedSkill]);
  const words = useMemo(() => [...skillWords, ...customWords], [skillWords, customWords]);

  // Check for app updates on mount
  useEffect(() => {
    checkForUpdates();
  }, []);

  // Word of the Day logic (from selected skill) - memoized
  const wordOfTheDay = useMemo(() => {
    if (!words.length) return null;
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const idx = seed % words.length;
    return words[idx];
  }, [words]);



  // Achievement tracking functions
  const updateUserStats = useCallback((updates) => {
    setUserStats(prev => {
      const newStats = { ...prev, ...updates };
      debouncedSaveToStorage('userStats', newStats);
      return newStats;
    });
  }, [debouncedSaveToStorage]);

  const checkAndUnlockAchievements = useCallback((previousStats, currentStats) => {
    const newlyUnlocked = getNewlyUnlockedAchievements(previousStats, currentStats);
    
    if (newlyUnlocked.length > 0) {
      const achievement = newlyUnlocked[0]; // Show first achievement
      setCurrentAchievement(achievement);
      setShowAchievementNotification(true);
      
      // Add rewards
      setUserData(prev => ({
        ...prev,
        xp: prev.xp + achievement.xpReward,
        coins: prev.coins + achievement.coinsReward
      }));
      
      // Update unlocked achievements
      setUnlockedAchievements(prev => {
        const newUnlocked = [...prev, ...newlyUnlocked.map(a => a.id)];
        debouncedSaveToStorage('unlockedAchievements', newUnlocked);
        return newUnlocked;
      });
    }
  }, [debouncedSaveToStorage]);

  // Save states to localStorage - optimized with useMemo
  const saveData = useMemo(() => ({
    userStats,
    unlockedAchievements,
    culturalProgress
  }), [userStats, unlockedAchievements, culturalProgress]);

  useEffect(() => {
    debouncedSaveToStorage('userStats', saveData.userStats);
    debouncedSaveToStorage('unlockedAchievements', saveData.unlockedAchievements);
    debouncedSaveToStorage('culturalProgress', saveData.culturalProgress);
  }, [saveData]);

  // Handle cultural lesson completion
  const handleCulturalLessonComplete = useCallback((lessonId, score) => {
    setCulturalProgress(prev => {
      const newProgress = { ...prev, [lessonId]: { score, completedAt: new Date().toISOString() } };
      debouncedSaveToStorage('culturalProgress', newProgress);
      return newProgress;
    });
    
    // Update user stats for cultural lessons
    updateUserStats({ cultural_lessons_completed: (userStats.cultural_lessons_completed || 0) + 1 });
  }, [userStats.cultural_lessons_completed, updateUserStats, debouncedSaveToStorage]);

  // Save userStats to localStorage whenever it changes
  useEffect(() => {
    debouncedSaveToStorage('userStats', userStats);
  }, [userStats, debouncedSaveToStorage]);

  // Save unlockedAchievements to localStorage whenever it changes
  useEffect(() => {
    debouncedSaveToStorage('unlockedAchievements', unlockedAchievements);
  }, [unlockedAchievements, debouncedSaveToStorage]);

  // Daily Challenges tracking functions
  const updateChallengeProgress = useCallback((updates) => {
    setChallengeProgress(prev => {
      const newProgress = { ...prev, ...updates };
      debouncedSaveToStorage('challengeProgress', newProgress);
      return newProgress;
    });
  }, [debouncedSaveToStorage]);

  const checkAndCompleteChallenges = useCallback(() => {
    const newlyCompleted = [];
    
    dailyChallenges.forEach(challenge => {
      if (!challengeProgress[challenge.id]?.completed && checkChallengeCompletion(challenge, userStats)) {
        newlyCompleted.push(challenge);
        
        // Update challenge progress
        updateChallengeProgress({
          [challenge.id]: { 
            completed: true, 
            completedAt: new Date().toISOString() 
          }
        });
        
        // Add rewards
        setUserData(prev => ({
          ...prev,
          xp: prev.xp + challenge.xpReward,
          coins: prev.coins + challenge.coinsReward
        }));
      }
    });
    
    if (newlyCompleted.length > 0) {
      setCurrentChallenge(newlyCompleted[0]);
      setShowChallengeComplete(true);
      setTimeout(() => setShowChallengeComplete(false), 3000);
    }
  }, [dailyChallenges, challengeProgress, userStats, updateChallengeProgress]);

  // Check for challenge completion whenever userStats changes
  useEffect(() => {
    checkAndCompleteChallenges();
  }, [userStats, checkAndCompleteChallenges]);

  // Save dailyChallenges to localStorage whenever it changes
  useEffect(() => {
    debouncedSaveToStorage('dailyChallenges', dailyChallenges);
  }, [dailyChallenges, debouncedSaveToStorage]);

  // Save challengeProgress to localStorage whenever it changes
  useEffect(() => {
    debouncedSaveToStorage('challengeProgress', challengeProgress);
  }, [challengeProgress, debouncedSaveToStorage]);

  // Generate new daily challenges at midnight
  useEffect(() => {
    const now = new Date();
    const lastChallengeDate = localStorage.getItem('lastChallengeDate');
    const today = now.toDateString();
    
    if (lastChallengeDate !== today) {
      const newChallenges = getDailyChallenges(userData.level || 1);
      setDailyChallenges(newChallenges);
      setChallengeProgress({});
      localStorage.setItem('lastChallengeDate', today);
    }
  }, [userData.level]);
  
  useEffect(() => {
    debouncedSaveToStorage('progress', progress);
  }, [progress, debouncedSaveToStorage]);
  
  useEffect(() => {
    debouncedSaveToStorage('userData', userData);
  }, [userData, debouncedSaveToStorage]);
  
  useEffect(() => {
    debouncedSaveToStorage('customWords', customWords);
  }, [customWords, debouncedSaveToStorage]);
  
  useEffect(() => {
    debouncedSaveToStorage('isDarkMode', isDarkMode);
  }, [isDarkMode, debouncedSaveToStorage]);
  
  useEffect(() => {
    localStorage.setItem('currentLanguage', currentLanguage);
  }, [currentLanguage]);

  // Listen for system dark mode changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e) => {
      const saved = localStorage.getItem('isDarkMode');
      // Only update if user hasn't manually set a preference
      if (saved === null) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  // Add XP to user - memoized
  const addXP = useCallback((amount) => {
    setUserData(prev => {
      const newXP = prev.xp + amount;
      const newLevel = calculateLevel(newXP);
      return {
        ...prev,
        xp: newXP,
        level: newLevel
      };
    });
  }, []);

  // Purchase item with coins - memoized
  const handlePurchase = useCallback((item) => {
    if (userData.coins >= item.price) {
      setUserData(prev => ({
        ...prev,
        coins: prev.coins - item.price,
        ownedMerchandise: [...prev.ownedMerchandise, item.id]
      }));
    }
  }, [userData.coins]);

  // Change avatar - memoized
  const handleAvatarChange = useCallback((avatarId) => {
    setUserData(prev => ({
      ...prev,
      currentAvatar: avatarId
    }));
  }, []);

  // Reset progress - memoized
  const resetProgress = useCallback(() => {
    try {
      setSkillProgress({});
      setProgress({ gamesPlayed: 0, streak: 1 });
      setUserData(prev => ({
        ...prev,
        xp: 0,
        level: 1
      }));
      
      // Show confirmation message
      if (window.showToast) {
        window.showToast.success('Progress reset successfully! Start fresh with your learning journey.', 5000);
      }
    } catch (error) {
      console.error('Error resetting progress:', error);
      if (window.showToast) {
        window.showToast.error('Failed to reset progress. Please try again.', 5000);
      }
    }
  }, []);



  // Handle adding a word - memoized
  const handleAdd = useCallback((word) => {
    try {
      setCustomWords(prev => [...prev, { ...word, stats: { correct: 0, incorrect: 0, lastPracticed: null } }]);
      
      // Track custom word addition for achievements and challenges
      const previousStats = userStats;
      const newStats = { ...userStats, custom_words_added: userStats.custom_words_added + 1 };
      updateUserStats({ custom_words_added: userStats.custom_words_added + 1 });
      checkAndUnlockAchievements(previousStats, newStats);
      
      // Show success message
      if (window.showToast) {
        window.showToast.success(`Added "${word.swedish}" to your word list!`, 3000);
      }
    } catch (error) {
      console.error('Error adding word:', error);
      if (window.showToast) {
        window.showToast.error('Failed to add word. Please try again.', 5000);
      }
    }
  }, [userStats, updateUserStats, checkAndUnlockAchievements]);



  // Track pronunciation attempts for voice recognition
  const handlePronunciationAttempt = useCallback((result) => {
    const previousStats = userStats;
    const newStats = { 
      ...userStats, 
      pronunciation_attempts: userStats.pronunciation_attempts + 1,
      [`${result.level}_pronunciations`]: (userStats[`${result.level}_pronunciations`] || 0) + 1
    };
    updateUserStats(newStats);
    checkAndUnlockAchievements(previousStats, newStats);
    
    // Track for challenges
    if (result.score >= 70) {
      const challengeStats = { ...userStats, pronunciations_used: userStats.pronunciations_used + 1 };
      updateUserStats({ pronunciations_used: userStats.pronunciations_used + 1 });
      checkAndUnlockAchievements(previousStats, challengeStats);
    }
  }, [userStats, updateUserStats, checkAndUnlockAchievements]);

  // Handle deleting a word - memoized
  const handleDelete = useCallback((idx) => {
    try {
      setCustomWords(prev => {
        const wordToDelete = prev[idx];
        const newWords = prev.filter((_, i) => i !== idx);
        
        // Show confirmation message
        if (window.showToast && wordToDelete) {
          window.showToast.info(`Removed "${wordToDelete.swedish}" from your word list.`, 3000);
        }
        
        return newWords;
      });
    } catch (error) {
      console.error('Error deleting word:', error);
      if (window.showToast) {
        window.showToast.error('Failed to delete word. Please try again.', 5000);
      }
    }
  }, []);

  // Handle editing a word - memoized
  const handleEdit = useCallback((idx, newWord) => {
    setCustomWords(prev => prev.map((word, i) => i === idx ? { ...newWord, stats: word.stats } : word));
  }, []);

  // Handle importing words - memoized
  const handleImportWords = useCallback((importedWords) => {
    setCustomWords(prev => [...prev, ...importedWords]);
  }, []);

  // Handle back to games - memoized
  const handleBackToGames = useCallback(() => {
    setGame(null);
  }, []);

  // Handle word stat update - memoized
  const handleWordStatUpdate = useCallback((swedish, english, result) => {
    // Update word statistics
    setCustomWords(prev => prev.map(word => 
      word.swedish === swedish && word.english === english
        ? {
            ...word,
            stats: {
              ...word.stats,
              [result]: word.stats[result] + 1,
              lastPracticed: new Date().toISOString()
            }
          }
        : word
    ));
  }, []);

  // Toggle dark mode - memoized
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
    
    // Track dark mode usage for achievements
    if (!userStats.dark_mode_used) {
      const previousStats = userStats;
      const newStats = { ...userStats, dark_mode_used: 1 };
      updateUserStats({ dark_mode_used: 1 });
      checkAndUnlockAchievements(previousStats, newStats);
    }
  }, [userStats, updateUserStats, checkAndUnlockAchievements]);

  // Toggle language - memoized
  const toggleLanguage = useCallback((languageCode) => {
    setCurrentLanguage(languageCode);
    
    // Track language exploration for achievements
    const previousStats = userStats;
    const newStats = { ...userStats, languages_tried: Math.max(userStats.languages_tried, 2) };
    updateUserStats({ languages_tried: Math.max(userStats.languages_tried, 2) });
    checkAndUnlockAchievements(previousStats, newStats);
  }, [userStats, updateUserStats, checkAndUnlockAchievements]);

  // Handle intro complete - memoized
  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
    localStorage.setItem('hasSeenIntro', 'true');
  }, []);

  // Handle play intro - memoized
  const handlePlayIntro = useCallback(() => {
    setShowIntro(true);
  }, []);

  // Handle onboarding complete - memoized
  const handleOnboardingComplete = useCallback(() => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setShowOnboarding(false);
  }, []);

  // Handle start games - memoized
  const handleStartGames = useCallback(() => {
    setGame('menu');
  }, []);

  // Handle close dialogue - memoized
  const handleCloseDialogue = useCallback(() => {
    setShowDialogue(false);
  }, []);

  // Handle achievement notification close
  const handleAchievementNotificationClose = useCallback(() => {
    setShowAchievementNotification(false);
    setCurrentAchievement(null);
  }, []);

  // Add lesson handlers after the existing handlers
  const handleStartLesson = useCallback((lessonId) => {
    try {
      // Prefer enhanced sample lessons when available
      const lesson = getSampleLessonById(lessonId) || getLessonById(lessonId);
      if (lesson && Array.isArray(lesson.exercises) && lesson.exercises.length > 0) {
        setCurrentLesson(lesson);
        setShowLesson(true);
        if (window.showToast) {
          window.showToast.info(`Starting lesson: ${lesson.name}`, 3000);
        }
      } else {
        console.error('Invalid lesson data:', lesson);
        if (window.showToast) {
          window.showToast.error('Lesson data is invalid. Please try again.', 5000);
        }
      }
    } catch (error) {
      console.error('Error starting lesson:', error);
      if (window.showToast) {
        window.showToast.error('Failed to start lesson. Please try again.', 5000);
      }
    }
  }, []);

  const handleLessonComplete = useCallback((score, total, lives) => {
    try {
      if (lives > 0 && currentLesson) {
        // Calculate progress percentage
        const progress = Math.round((score / total) * 100);
        
        // Update skill progress
        setSkillProgress(prev => ({
          ...prev,
          [currentLesson.id]: Math.max(prev[currentLesson.id] || 0, progress)
        }));
        
        // Award XP
        const xpGained = Math.round((score / total) * (currentLesson.xpReward || 10));
        setUserData(prev => ({
          ...prev,
          xp: prev.xp + xpGained
        }));
        
        // Show success message
        if (window.showToast) {
          const message = score === total 
            ? `Perfect! You completed the lesson with 100% accuracy! +${xpGained} XP`
            : `Great job! You completed the lesson with ${progress}% accuracy! +${xpGained} XP`;
          window.showToast.success(message, 5000);
        }
        
        // Show achievement notification if perfect score
        if (score === total) {
          // Trigger perfect score achievement
        }
      } else {
        // Show failure message
        if (window.showToast) {
          window.showToast.warning('You ran out of lives! Try again to improve your score.', 5000);
        }
      }
    } catch (error) {
      console.error('Error completing lesson:', error);
      if (window.showToast) {
        window.showToast.error('Failed to save lesson progress. Please try again.', 5000);
      }
    } finally {
      setShowLesson(false);
      setCurrentLesson(null);
    }
  }, [currentLesson]);

  const handleLessonExit = useCallback(() => {
    try {
      setShowLesson(false);
      setCurrentLesson(null);
    } catch (error) {
      console.error('Error exiting lesson:', error);
      // Force reset state
      setShowLesson(false);
      setCurrentLesson(null);
    }
  }, []);

  // Render the current screen
  let content;
  if (screen === 'home') content = (
    <Home
      skills={currentSkills}
      skillProgress={skillProgress}
      onSelectSkill={setSelectedSkillId}
      selectedSkill={selectedSkill}
      numWords={words.length}
      progress={progress}
      wordOfTheDay={wordOfTheDay}
      isDarkMode={isDarkMode}
      onResetProgress={resetProgress}
      userData={userData}
      currentLanguage={currentLanguage}
      onStartLesson={() => {
        // Start enhanced lesson content for the selected skill
        if (selectedSkill) {
          const enhancedId = selectedSkill.id.replace('lesson', '');
          const mapping = {
            '1': 'basics-1',
            '2': 'family-1',
            '3': 'food-1',
            '4': 'family-1',
            '5': 'numbers-1',
            '6': 'food-1',
            '7': 'colours-1'
          };
          const targetId = mapping[enhancedId] || 'basics-1';
          const lesson = getSampleLessonById(targetId);
          if (lesson) {
            setCurrentLesson(lesson);
            setShowLesson(true);
            if (window.showToast) {
              window.showToast.info(`Starting lesson: ${lesson.name}`, 3000);
            }
            return;
          }
        }
        // Fallback to original flow if no enhanced lesson
        if (selectedSkill) {
          setLessonWords(selectedSkill.words);
          setShowDialogue(true);
        }
      }}
      onStartDuolingoLesson={handleStartLesson}
    />
  );
  else if (screen === 'list') content = <WordList words={words} skillWords={skillWords} onDelete={handleDelete} onEdit={handleEdit} onImportWords={handleImportWords} onAdd={handleAdd} isDarkMode={isDarkMode} />;
  else if (screen === 'explore') content = <Explore skills={currentSkills} progress={skillProgress} onSelectSkill={setSelectedSkillId} isDarkMode={isDarkMode} currentLanguage={currentLanguage} />;
  else if (screen === 'achievements') content = <Achievements userStats={userStats} unlockedAchievements={unlockedAchievements} isDarkMode={isDarkMode} />;
  else if (screen === 'challenges') content = <DailyChallenges challenges={dailyChallenges} userStats={userStats} onChallengeComplete={checkAndCompleteChallenges} isDarkMode={isDarkMode} />;
  else if (screen === 'voice-recognition') content = <VoiceRecognition userStats={userStats} onPronunciationAttempt={handlePronunciationAttempt} isDarkMode={isDarkMode} />;
  else if (screen === 'testing-hub') content = <TestingHub userStats={userStats} unlockedAchievements={unlockedAchievements} dailyChallenges={dailyChallenges} onChallengeComplete={checkAndCompleteChallenges} onPronunciationAttempt={handlePronunciationAttempt} isDarkMode={isDarkMode} />;
  else if (screen === 'cultural-integration') content = <CulturalIntegration userProgress={culturalProgress} onLessonComplete={handleCulturalLessonComplete} isDarkMode={isDarkMode} />;
  else if (screen === 'social-features') content = <SocialFeatures userStats={userStats} isDarkMode={isDarkMode} />;
  else if (screen === 'advanced-analytics') content = <AdvancedAnalytics userStats={userStats} isDarkMode={isDarkMode} />;
  else if (screen === 'gamified-learning') content = <GamifiedLearning 
    userStats={userStats} 
    isDarkMode={isDarkMode} 
    words={words}
    onWordStatUpdate={handleWordStatUpdate}
    onLessonComplete={() => setScreen('home')}
  />;
  else if (screen === 'story') content = <Suspense fallback={<LoadingSpinner message="Loading Story Mode..." isDarkMode={isDarkMode} />}>
    <StoryMode isDarkMode={isDarkMode} />
  </Suspense>;
  else if (screen === 'avatar-shop') content = <Suspense fallback={<LoadingSpinner message="Loading Avatar Shop..." isDarkMode={isDarkMode} />}>
    <AvatarShop 
      userXP={userData.xp} 
      userLevel={userData.level} 
      userCoins={userData.coins} 
      onPurchase={handlePurchase} 
      onAvatarChange={handleAvatarChange} 
      currentAvatar={userData.currentAvatar} 
      isDarkMode={isDarkMode} 
    />
  </Suspense>;
  else if (screen === 'games') {
    if (!game) {
      content = <Suspense fallback={<LoadingSpinner message="Loading Games Menu..." isDarkMode={isDarkMode} />}>
        <GamesMenu setGame={setGame} isDarkMode={isDarkMode} />
      </Suspense>;
    } else {
      const onLessonComplete = handleBackToGames;
      // Use lessonWords if available, otherwise use default words from all lessons
      const gameWords = lessonWords.length > 0 ? lessonWords : currentSkills.flatMap(skill => skill.words);
      let gameComp;
      if (game === 'flashcards') gameComp = <Suspense fallback={<LoadingSpinner message="Loading Flashcards..." isDarkMode={isDarkMode} />}>
        <Flashcards words={gameWords} onWordStatUpdate={handleWordStatUpdate} onLessonComplete={onLessonComplete} isDarkMode={isDarkMode} />
      </Suspense>;
      else if (game === 'matching') gameComp = <Suspense fallback={<LoadingSpinner message="Loading Matching..." isDarkMode={isDarkMode} />}>
        <Matching words={gameWords} onWordStatUpdate={handleWordStatUpdate} onLessonComplete={onLessonComplete} isDarkMode={isDarkMode} />
      </Suspense>;
      else if (game === 'spelling') gameComp = <Suspense fallback={<LoadingSpinner message="Loading Spelling..." isDarkMode={isDarkMode} />}>
        <Spelling words={gameWords} onWordStatUpdate={handleWordStatUpdate} onLessonComplete={onLessonComplete} isDarkMode={isDarkMode} />
      </Suspense>;
      else if (game === 'multiple') gameComp = <Suspense fallback={<LoadingSpinner message="Loading Multiple Choice..." isDarkMode={isDarkMode} />}>
        <MultipleChoice words={gameWords} onWordStatUpdate={handleWordStatUpdate} onLessonComplete={onLessonComplete} isDarkMode={isDarkMode} />
      </Suspense>;
      else if (game === 'audio') gameComp = <Suspense fallback={<LoadingSpinner message="Loading Audio Recall..." isDarkMode={isDarkMode} />}>
        <AudioRecall words={gameWords} onWordStatUpdate={handleWordStatUpdate} onLessonComplete={onLessonComplete} isDarkMode={isDarkMode} />
      </Suspense>;
      else if (game === 'odd') gameComp = <Suspense fallback={<LoadingSpinner message="Loading Odd One Out..." isDarkMode={isDarkMode} />}>
        <OddOneOut words={gameWords} onWordStatUpdate={handleWordStatUpdate} onLessonComplete={onLessonComplete} isDarkMode={isDarkMode} />
      </Suspense>;
      content = <div><button onClick={handleBackToGames} style={{margin:'1rem',background:'#2193b0',color:'#fff',border:'none',borderRadius:8,padding:'0.5rem 1.2rem',fontWeight:'bold',fontSize:16,cursor:'pointer'}}>← Back to Games</button>{gameComp}</div>;
    }
  }

  return (
    <ErrorBoundary isDarkMode={isDarkMode}>
      <div 
        className="moomin-app-container"
        style={{ 
          minHeight: '100vh',
          background: isDarkMode ? '#1a1a1a' : 'var(--background)',
          color: isDarkMode ? '#f5f5f5' : 'var(--text-primary)',
          fontFamily: 'var(--font-family-primary, Inter, sans-serif)',
          transition: 'all 0.3s ease'
        }}
      >
        <style>{`
          @media (max-width: 600px) {
            body {
              padding-bottom: 80px !important;
            }
          }
        `}</style>
        
        {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} isDarkMode={isDarkMode} />}
        {showIntro && <IntroAnimation onComplete={handleIntroComplete} isDarkMode={isDarkMode} />}
        {showDialogue && selectedSkill && (
          <Suspense fallback={<LoadingSpinner message="Loading Dialogue..." isDarkMode={isDarkMode} />}>
            <Dialogue 
              dialogue={selectedSkill.dialogue}
              onStartGames={handleStartGames}
              onClose={handleCloseDialogue}
              isDarkMode={isDarkMode}
            />
          </Suspense>
        )}
        <Navigation currentScreen={screen} setScreen={s => { setScreen(s); setGame(null); }} isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} onToggleLanguage={toggleLanguage} currentLanguage={currentLanguage} onPlayIntro={handlePlayIntro} />
        <main style={{ paddingTop: '60px' }}>
          {content}
        </main>
        
        {/* Achievement Notification */}
        {showAchievementNotification && currentAchievement && (
          <AchievementNotification
            achievement={currentAchievement}
            onClose={handleAchievementNotificationClose}
            isDarkMode={isDarkMode}
          />
        )}
        
        {/* Challenge Completion Notification */}
        {showChallengeComplete && currentChallenge && (
          <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 10000,
            background: isDarkMode ? '#2c3e50' : '#f8f9fa',
            border: '3px solid #27ae60',
            borderRadius: '20px',
            padding: '1.5rem',
            boxShadow: '0 10px 40px rgba(39, 174, 96, 0.3)',
            maxWidth: '400px',
            animation: 'slideIn 0.5s ease-out'
          }}>
            <div style={{
              textAlign: 'center',
              color: isDarkMode ? '#f5f5f5' : '#2c3e50'
            }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem',
                animation: 'trophyBounce 0.6s ease-out'
              }}>
                🎯
              </div>
              <h3 style={{
                margin: '0 0 0.5rem 0',
                fontSize: '1.3rem',
                fontFamily: '"Georgia", serif',
                color: '#27ae60'
              }}>
                Challenge Complete!
              </h3>
              <h4 style={{
                margin: '0 0 0.5rem 0',
                fontSize: '1.1rem',
                fontFamily: '"Georgia", serif'
              }}>
                {currentChallenge.title}
              </h4>
              <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                marginTop: '1rem',
                fontFamily: '"Georgia", serif'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#f39c12' }}>
                  <span>⭐</span>
                  <span>+{currentChallenge.xpReward} XP</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#f1c40f' }}>
                  <span>🪙</span>
                  <span>+{currentChallenge.coinsReward} Coins</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Lesson View */}
        {showLesson && currentLesson && (
          <ErrorBoundary>
            <LessonView
              lesson={currentLesson}
              onComplete={handleLessonComplete}
              onExit={handleLessonExit}
              isDarkMode={isDarkMode}
            />
          </ErrorBoundary>
        )}
        
        {/* Toast Container for User Feedback */}
        <ToastContainer isDarkMode={isDarkMode} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
