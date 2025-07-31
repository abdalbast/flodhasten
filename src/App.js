import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import AddWord from './components/AddWord';
import WordList from './components/WordList';
import Explore from './components/Explore';
import StoryMode from './components/StoryMode';
import ExperimentMap from './components/ExperimentMap';
import AvatarShop from './components/AvatarShop';
import IntroAnimation from './components/IntroAnimation';
import Dialogue from './components/Dialogue';
import GamesMenu from './games/GamesMenu';
import Flashcards from './games/Flashcards';
import Matching from './games/Matching';
import Spelling from './games/Spelling';
import MultipleChoice from './games/MultipleChoice';
import AudioRecall from './games/AudioRecall';
import OddOneOut from './games/OddOneOut';
import { register as registerServiceWorker, requestNotificationPermission } from './serviceWorkerRegistration';
import Layout from './components/ui/Layout';
import { SkipLink, LiveRegion } from './components/ui/Accessibility';
import ProgressTracker from './components/ui/ProgressTracker';
import Achievements, { ACHIEVEMENTS } from './components/ui/Achievements';
import Personalization, { AdaptiveLearning } from './components/ui/Personalization';
import { designTokens } from './styles/designSystem';

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
    lastObjectiveReset: null,
    streak: 0,
    lastLoginDate: new Date().toISOString().split('T')[0],
    dailyGoal: 1,
    completedLessons: 0,
    preferredTopics: [],
    difficulty: 'normal',
    unlockedAchievements: [],
    perfectScores: 0,
    gamesPlayed: 0,
    earlyBirdCount: 0,
    nightOwlCount: 0,
    wordStats: {}
  };
}

// Helper: calculate level from XP
function calculateLevel(xp) {
  return Math.floor(xp / 100) + 1;
}

// Helper: pick a random game type
const GAME_TYPES = ['flashcards', 'matching', 'spelling', 'multiple', 'audio', 'odd'];
function getRandomGameType() {
  return GAME_TYPES[Math.floor(Math.random() * GAME_TYPES.length)];
}

function App() {
  const [screen, setScreen] = useState('home');
  const [selectedSkillId, setSelectedSkillId] = useState('lesson1');
  const [skillProgress, setSkillProgress] = useState(getInitialSkillProgress());
  const [game, setGame] = useState(null); // Which game is active
  const [progress, setProgress] = useState(getInitialProgress());
  const [userData, setUserData] = useState(getInitialUserData());
  const [showSkillComplete, setShowSkillComplete] = useState(false);
  const [lessonWords, setLessonWords] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('isDarkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const saved = localStorage.getItem('currentLanguage');
    return saved ? saved : 'en'; // 'en' for English, 'ku' for Kurdish, 'ku-lat' for Kurdish Latin
  });
  const [showIntro, setShowIntro] = useState(() => {
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    return !hasSeenIntro;
  });
  const [showDialogue, setShowDialogue] = useState(false);

  // Register service worker for PWA features
  useEffect(() => {
    registerServiceWorker();
    requestNotificationPermission();
  }, []);

  // Get the selected skill and its words based on current language
  const currentSkills = SKILLS[currentLanguage] || SKILLS.en;
  const selectedSkill = currentSkills.find(s => s.id === selectedSkillId);
  const words = selectedSkill ? selectedSkill.words.map(w => ({ ...w, stats: { correct: 0, incorrect: 0, lastPracticed: null } })) : [];

  // Word of the Day logic (from selected skill)
  const getWordOfTheDay = () => {
    if (!words.length) return null;
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const idx = seed % words.length;
    return words[idx];
  };
  const wordOfTheDay = getWordOfTheDay();

  // Save skill progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('skillProgress', JSON.stringify(skillProgress));
  }, [skillProgress]);
  useEffect(() => {
    localStorage.setItem('progress', JSON.stringify(progress));
  }, [progress]);
  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);
  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);
  useEffect(() => {
    localStorage.setItem('currentLanguage', currentLanguage);
  }, [currentLanguage]);

  // Add XP to user
  const addXP = (amount) => {
    setUserData(prev => {
      const newXP = prev.xp + amount;
      const newLevel = calculateLevel(newXP);
      return {
        ...prev,
        xp: newXP,
        level: newLevel
      };
    });
  };

  // Purchase item with coins
  const handlePurchase = (item) => {
    if (userData.coins >= item.price) {
      setUserData(prev => ({
        ...prev,
        coins: prev.coins - item.price,
        ownedMerchandise: [...prev.ownedMerchandise, item.id]
      }));
    }
  };

  // Change avatar
  const handleAvatarChange = (avatarId) => {
    setUserData(prev => ({
      ...prev,
      currentAvatar: avatarId
    }));
  };

  // Reset all progress
  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress? This will unlock all skills and reset your game statistics.')) {
      setSkillProgress({});
      setProgress({ gamesPlayed: 0, streak: 1 });
      setUserData(getInitialUserData());
      setSelectedSkillId('lesson1');
      localStorage.removeItem('skillProgress');
      localStorage.removeItem('progress');
      localStorage.removeItem('userData');
      alert('Progress reset successfully!');
    }
  };

  // Mark a skill as completed and unlock the next one
  const completeSkill = (skillId) => {
    setSkillProgress(prev => {
      const idx = currentSkills.findIndex(s => s.id === skillId);
      const nextSkill = currentSkills[idx + 1];
      return {
        ...prev,
        [skillId]: 100,
        ...(nextSkill && { [nextSkill.id]: 0 })
      };
    });
    
    // Add XP for completing a lesson
    addXP(50);
    
    // Add coins for completing a lesson
    setUserData(prev => ({
      ...prev,
      coins: prev.coins + 25,
      completedLessons: prev.completedLessons + 1,
      gamesPlayed: prev.gamesPlayed + 1
    }));
    
    // Check for time-based achievements
    checkTimeBasedAchievements();
    
    setShowSkillComplete(true);
  };

  // Hide the Skill Complete message after 2.5 seconds
  useEffect(() => {
    if (showSkillComplete) {
      const timer = setTimeout(() => setShowSkillComplete(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [showSkillComplete]);

  // Hide the message if user navigates away
  useEffect(() => {
    setShowSkillComplete(false);
  }, [screen, selectedSkillId]);

  // Add/edit/delete/import handlers (per skill)
  const handleAdd = (word) => {
    // Not implemented: add word to skill (could be added if needed)
    setScreen('list');
  };
  const handleDelete = (idx) => {
    // Not implemented: delete word from skill (could be added if needed)
  };
  const handleEdit = (idx, newWord) => {
    // Not implemented: edit word in skill (could be added if needed)
  };
  const handleImportWords = (importedWords) => {
    // Not implemented: import words to skill (could be added if needed)
  };

  // When a game is completed (user returns to GamesMenu), mark skill as complete
  const handleBackToGames = () => {
    setGame(null);
    setScreen('home');
    setProgress(p => ({ ...p, gamesPlayed: p.gamesPlayed + 1 }));
    completeSkill(selectedSkillId);
  };

  // Update stats for a word (by Swedish+English)
  const handleWordStatUpdate = (swedish, english, result) => {
    // Update word statistics for adaptive learning
    setUserData(prev => {
      const wordStats = prev.wordStats || {};
      const currentStats = wordStats[swedish] || { correct: 0, incorrect: 0, lastPracticed: null };
      
      const updatedStats = {
        ...currentStats,
        [result]: currentStats[result] + 1,
        lastPracticed: new Date().toISOString()
      };
      
      return {
        ...prev,
        wordStats: {
          ...wordStats,
          [swedish]: updatedStats
        }
      };
    });
  };

  // Handle achievement unlocks
  const handleAchievementUnlock = (achievement) => {
    setUserData(prev => ({
      ...prev,
      xp: prev.xp + achievement.xpReward,
      unlockedAchievements: [...(prev.unlockedAchievements || []), achievement.id]
    }));
    
    // Show achievement notification
    alert(`🎉 Achievement Unlocked: ${achievement.title}! +${achievement.xpReward} XP`);
  };

  // Handle daily goal updates
  const handleGoalUpdate = (newGoal) => {
    setUserData(prev => ({
      ...prev,
      dailyGoal: newGoal
    }));
  };

  // Handle preference updates
  const handlePreferenceUpdate = (preferences) => {
    setUserData(prev => ({
      ...prev,
      ...preferences
    }));
  };

  // Handle streak updates
  const updateStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    const lastLogin = userData.lastLoginDate;
    
    if (lastLogin !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      if (lastLogin === yesterdayStr) {
        // Consecutive day
        setUserData(prev => ({
          ...prev,
          streak: prev.streak + 1,
          lastLoginDate: today
        }));
      } else {
        // Streak broken
        setUserData(prev => ({
          ...prev,
          streak: 1,
          lastLoginDate: today
        }));
      }
    }
  };

  // Update streak on component mount
  useEffect(() => {
    updateStreak();
  }, []);

  // Check for special achievements (early bird, night owl)
  const checkTimeBasedAchievements = () => {
    const hour = new Date().getHours();
    if (hour < 9) {
      setUserData(prev => ({
        ...prev,
        earlyBirdCount: prev.earlyBirdCount + 1
      }));
    } else if (hour >= 22) {
      setUserData(prev => ({
        ...prev,
        nightOwlCount: prev.nightOwlCount + 1
      }));
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const toggleLanguage = (languageCode) => {
    setCurrentLanguage(languageCode);
  };

  // Handle intro animation completion
  const handleIntroComplete = () => {
    setShowIntro(false);
    localStorage.setItem('hasSeenIntro', 'true');
  };

  // Handle replay intro animation
  const handlePlayIntro = () => {
    setShowIntro(true);
  };

  // Handle dialogue completion and start games
  const handleStartGames = () => {
    setShowDialogue(false);
    setScreen('games');
    setGame(getRandomGameType());
  };

  // Handle dialogue close
  const handleCloseDialogue = () => {
    setShowDialogue(false);
  };

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
        // Show dialogue first, then proceed to games
        if (selectedSkill) {
          setLessonWords(selectedSkill.words);
          setShowDialogue(true);
        }
      }}
    />
  );
  else if (screen === 'add') content = <AddWord onAdd={handleAdd} isDarkMode={isDarkMode} />;
  else if (screen === 'list') content = <WordList words={words} onDelete={handleDelete} onEdit={handleEdit} onImportWords={handleImportWords} isDarkMode={isDarkMode} />;
  else if (screen === 'explore') content = <Explore isDarkMode={isDarkMode} />;
  else if (screen === 'story') content = <StoryMode isDarkMode={isDarkMode} />;
  else if (screen === 'experiment-map') content = <ExperimentMap skills={currentSkills} progress={skillProgress} onSelectSkill={setSelectedSkillId} isDarkMode={isDarkMode} currentLanguage={currentLanguage} />;
  else if (screen === 'avatar-shop') content = <AvatarShop 
    userXP={userData.xp} 
    userLevel={userData.level} 
    userCoins={userData.coins} 
    onPurchase={handlePurchase} 
    onAvatarChange={handleAvatarChange} 
    currentAvatar={userData.currentAvatar} 
    isDarkMode={isDarkMode} 
  />;
  else if (screen === 'progress') content = (
    <div style={{ padding: designTokens.spacing[6] }}>
      <ProgressTracker 
        userData={userData}
        skillProgress={skillProgress}
        isDarkMode={isDarkMode}
        onGoalUpdate={handleGoalUpdate}
      />
      <Achievements 
        userData={userData}
        isDarkMode={isDarkMode}
        onAchievementUnlock={handleAchievementUnlock}
      />
      <Personalization 
        userData={userData}
        isDarkMode={isDarkMode}
        onGoalUpdate={handleGoalUpdate}
        onPreferenceUpdate={handlePreferenceUpdate}
      />
      <AdaptiveLearning 
        userData={userData}
        wordStats={userData.wordStats}
        isDarkMode={isDarkMode}
        onReviewWords={(words) => {
          setLessonWords(words.map(word => ({ swedish: word, english: 'Review word' })));
          setScreen('games');
          setGame('multiple');
        }}
      />
    </div>
  );
  else if (screen === 'games') {
    if (!game) {
      content = <GamesMenu setGame={setGame} isDarkMode={isDarkMode} />;
    } else {
      const onLessonComplete = handleBackToGames;
      // Use lessonWords if available, otherwise use default words from all lessons
      const gameWords = lessonWords.length > 0 ? lessonWords : currentSkills.flatMap(skill => skill.words);
      let gameComp;
      if (game === 'flashcards') gameComp = <Flashcards words={gameWords} onWordStatUpdate={handleWordStatUpdate} onLessonComplete={onLessonComplete} isDarkMode={isDarkMode} />;
      else if (game === 'matching') gameComp = <Matching words={gameWords} onWordStatUpdate={handleWordStatUpdate} onLessonComplete={onLessonComplete} isDarkMode={isDarkMode} />;
      else if (game === 'spelling') gameComp = <Spelling words={gameWords} onWordStatUpdate={handleWordStatUpdate} onLessonComplete={onLessonComplete} isDarkMode={isDarkMode} />;
      else if (game === 'multiple') gameComp = <MultipleChoice words={gameWords} onWordStatUpdate={handleWordStatUpdate} onLessonComplete={onLessonComplete} isDarkMode={isDarkMode} />;
      else if (game === 'audio') gameComp = <AudioRecall words={gameWords} onWordStatUpdate={handleWordStatUpdate} onLessonComplete={onLessonComplete} isDarkMode={isDarkMode} />;
      else if (game === 'odd') gameComp = <OddOneOut words={gameWords} onWordStatUpdate={handleWordStatUpdate} onLessonComplete={onLessonComplete} isDarkMode={isDarkMode} />;
      content = <div><button onClick={handleBackToGames} style={{margin:'1rem',background:'#2193b0',color:'#fff',border:'none',borderRadius:8,padding:'0.5rem 1.2rem',fontWeight:'bold',fontSize:16,cursor:'pointer'}}>← Back to Games</button>{gameComp}</div>;
    }
  }

  return (
    <Layout isDarkMode={isDarkMode}>
      <SkipLink targetId="main-content" />
      <LiveRegion aria-live="polite" />
      
      {/* Subtle river-themed background elements */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '30%',
        background: isDarkMode 
          ? 'linear-gradient(180deg, transparent 0%, rgba(33, 147, 176, 0.05) 50%, rgba(33, 147, 176, 0.02) 100%)' 
          : 'linear-gradient(180deg, transparent 0%, rgba(33, 147, 176, 0.03) 50%, rgba(33, 147, 176, 0.01) 100%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <div style={{
        position: 'fixed',
        bottom: '5%',
        left: '10%',
        width: '40px',
        height: '40px',
        background: isDarkMode ? 'rgba(33, 147, 176, 0.1)' : 'rgba(33, 147, 176, 0.05)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <div style={{
        position: 'fixed',
        bottom: '15%',
        right: '20%',
        width: '25px',
        height: '25px',
        background: isDarkMode ? 'rgba(33, 147, 176, 0.08)' : 'rgba(33, 147, 176, 0.04)',
        borderRadius: '50%',
        animation: 'float 10s ease-in-out infinite 2s',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(1deg); }
        }
      `}</style>
      
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} isDarkMode={isDarkMode} />}
      {showDialogue && selectedSkill && (
        <Dialogue 
          dialogue={selectedSkill.dialogue}
          onStartGames={handleStartGames}
          onClose={handleCloseDialogue}
          isDarkMode={isDarkMode}
        />
      )}
      
      <Navigation 
        currentScreen={screen} 
        setScreen={s => { setScreen(s); setGame(null); }} 
        isDarkMode={isDarkMode} 
        onToggleDarkMode={toggleDarkMode} 
        onToggleLanguage={toggleLanguage} 
        currentLanguage={currentLanguage} 
        onPlayIntro={handlePlayIntro} 
      />
      
      <main id="main-content" role="main">
        {content}
      </main>
              {showSkillComplete && (
          <>
            <style>{`
              @keyframes skillCompletePop {
                0% { opacity: 0; transform: scale(0.7); }
                20% { opacity: 1; transform: scale(1.1); }
                60% { opacity: 1; transform: scale(1); }
                100% { opacity: 0; transform: scale(0.9); }
              }
            `}</style>
            <div style={{position:'fixed',top:0,left:0,right:0,zIndex:1000,display:'flex',justifyContent:'center',alignItems:'flex-start',pointerEvents:'none'}}>
              <div style={{
                marginTop:60,
                padding:'1.2rem 2.5rem',
                background:'#81c784',
                color:'#fff',
                borderRadius:16,
                boxShadow:'0 4px 16px #388e3c88',
                fontSize:28,
                fontWeight:'bold',
                letterSpacing:1.5,
                animation:'skillCompletePop 2.5s cubic-bezier(.23,1.12,.62,.99)'
              }}>
                🎉 Skill Complete!
              </div>
            </div>
          </>
        )}
      </Layout>
    );
}

export default App;
