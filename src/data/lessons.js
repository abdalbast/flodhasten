// Enhanced Duolingo-style lesson structure for Swedish from English
export const LESSONS = [
  {
    id: 'lesson1',
    name: 'Greetings & Basics',
    description: 'Master essential Swedish greetings and basic vocabulary',
    difficulty: 'beginner',
    xpReward: 15,
    requiredLevel: 1,
    learningObjectives: [
      'Learn basic Swedish greetings',
      'Understand simple introductions',
      'Practice pronunciation of common words',
      'Build confidence with fundamental vocabulary'
    ],
    culturalNotes: [
      'Swedes often greet with "Hej" (Hello) in informal situations',
      'Swedish pronunciation is generally phonetic',
      'Swedish has three extra letters: å, ä, ö'
    ],
    words: [
      { 
        swedish: 'hej', 
        english: 'hello',
        pronunciation: 'hey',
        difficulty: 1,
        category: 'greetings',
        example: 'Hej! Hur mår du? (Hello! How are you?)',
        grammar: 'Informal greeting, used with friends and family'
      },
      { 
        swedish: 'god morgon', 
        english: 'good morning',
        pronunciation: 'goo mor-ron',
        difficulty: 1,
        category: 'greetings',
        example: 'God morgon! (Good morning!)',
        grammar: 'Formal greeting used in the morning'
      },
      { 
        swedish: 'tack', 
        english: 'thank you',
        pronunciation: 'tahk',
        difficulty: 1,
        category: 'courtesy',
        example: 'Tack så mycket! (Thank you very much!)',
        grammar: 'Can be used alone or with "så mycket" for emphasis'
      },
      { 
        swedish: 'ja', 
        english: 'yes',
        pronunciation: 'yah',
        difficulty: 1,
        category: 'basics',
        example: 'Ja, det är rätt. (Yes, that is correct.)',
        grammar: 'Simple affirmative response'
      },
      { 
        swedish: 'nej', 
        english: 'no',
        pronunciation: 'ney',
        difficulty: 1,
        category: 'basics',
        example: 'Nej, det är fel. (No, that is wrong.)',
        grammar: 'Simple negative response'
      },
      { 
        swedish: 'hej då', 
        english: 'goodbye',
        pronunciation: 'hey doh',
        difficulty: 1,
        category: 'greetings',
        example: 'Hej då! Vi ses! (Goodbye! See you!)',
        grammar: 'Informal farewell, literally "hello then"'
      }
    ],
    // All available options for shuffling
    allOptions: [
      { id: 'hello', label: 'hello', image: '👋', iconColor: '#4CAF50' },
      { id: 'good morning', label: 'good morning', image: '🌅', iconColor: '#FF9800' },
      { id: 'thank you', label: 'thank you', image: '🙏', iconColor: '#9C27B0' },
      { id: 'yes', label: 'yes', image: '✅', iconColor: '#4CAF50' },
      { id: 'no', label: 'no', image: '❌', iconColor: '#F44336' },
      { id: 'goodbye', label: 'goodbye', image: '👋', iconColor: '#2196F3' },
      { id: 'please', label: 'please', image: '🤲', iconColor: '#FFC107' },
      { id: 'excuse me', label: 'excuse me', image: '🙋', iconColor: '#607D8B' }
    ],
    exercises: [
      // Word introduction exercises
      {
        type: 'word_introduction',
        instruction: 'Learn the Swedish word for hello',
        swedishWord: 'hej',
        englishTranslation: 'hello',
        pronunciation: 'hey',
        example: 'Hej! Hur mår du?',
        exampleTranslation: 'Hello! How are you?',
        difficulty: 1
      },
      {
        type: 'image_choice',
        instruction: 'Select the correct image for "hej"',
        swedishWord: 'hej',
        englishHint: 'hello',
        answer: 'hello',
        getOptions: (allOptions) => {
          const correctOption = allOptions.find(opt => opt.id === 'hello');
          const wrongOptions = allOptions.filter(opt => opt.id !== 'hello').sort(() => Math.random() - 0.5).slice(0, 3);
          return [correctOption, ...wrongOptions].sort(() => Math.random() - 0.5);
        }
      },
      {
        type: 'translation_choice',
        instruction: 'What does "hej" mean?',
        swedishWord: 'hej',
        answer: 'hello',
        options: ['hello', 'goodbye', 'thank you', 'please'],
        difficulty: 1
      },
      {
        type: 'word_introduction',
        instruction: 'Learn the Swedish word for good morning',
        swedishWord: 'god morgon',
        englishTranslation: 'good morning',
        pronunciation: 'goo mor-ron',
        example: 'God morgon!',
        exampleTranslation: 'Good morning!',
        difficulty: 1
      },
      {
        type: 'image_choice',
        instruction: 'Select the correct image for "god morgon"',
        swedishWord: 'god morgon',
        englishHint: 'good morning',
        answer: 'good morning',
        getOptions: (allOptions) => {
          const correctOption = allOptions.find(opt => opt.id === 'good morning');
          const wrongOptions = allOptions.filter(opt => opt.id !== 'good morning').sort(() => Math.random() - 0.5).slice(0, 3);
          return [correctOption, ...wrongOptions].sort(() => Math.random() - 0.5);
        }
      },
      {
        type: 'word_introduction',
        instruction: 'Learn the Swedish word for thank you',
        swedishWord: 'tack',
        englishTranslation: 'thank you',
        pronunciation: 'tahk',
        example: 'Tack så mycket!',
        exampleTranslation: 'Thank you very much!',
        difficulty: 1
      },
      {
        type: 'image_choice',
        instruction: 'Select the correct image for "tack"',
        swedishWord: 'tack',
        englishHint: 'thank you',
        answer: 'thank you',
        getOptions: (allOptions) => {
          const correctOption = allOptions.find(opt => opt.id === 'thank you');
          const wrongOptions = allOptions.filter(opt => opt.id !== 'thank you').sort(() => Math.random() - 0.5).slice(0, 3);
          return [correctOption, ...wrongOptions].sort(() => Math.random() - 0.5);
        }
      },
      {
        type: 'translation_choice',
        instruction: 'What does "tack" mean?',
        swedishWord: 'tack',
        answer: 'thank you',
        options: ['hello', 'goodbye', 'thank you', 'please'],
        difficulty: 1
      },
      {
        type: 'word_introduction',
        instruction: 'Learn the Swedish words for yes and no',
        swedishWord: 'ja / nej',
        englishTranslation: 'yes / no',
        pronunciation: 'yah / ney',
        example: 'Ja, det är rätt. Nej, det är fel.',
        exampleTranslation: 'Yes, that is correct. No, that is wrong.',
        difficulty: 1
      },
      {
        type: 'image_choice',
        instruction: 'Select the correct image for "ja"',
        swedishWord: 'ja',
        englishHint: 'yes',
        answer: 'yes',
        getOptions: (allOptions) => {
          const correctOption = allOptions.find(opt => opt.id === 'yes');
          const wrongOptions = allOptions.filter(opt => opt.id !== 'yes').sort(() => Math.random() - 0.5).slice(0, 3);
          return [correctOption, ...wrongOptions].sort(() => Math.random() - 0.5);
        }
      },
      {
        type: 'image_choice',
        instruction: 'Select the correct image for "nej"',
        swedishWord: 'nej',
        englishHint: 'no',
        answer: 'no',
        getOptions: (allOptions) => {
          const correctOption = allOptions.find(opt => opt.id === 'no');
          const wrongOptions = allOptions.filter(opt => opt.id !== 'no').sort(() => Math.random() - 0.5).slice(0, 3);
          return [correctOption, ...wrongOptions].sort(() => Math.random() - 0.5);
        }
      },
      {
        type: 'word_introduction',
        instruction: 'Learn the Swedish word for goodbye',
        swedishWord: 'hej då',
        englishTranslation: 'goodbye',
        pronunciation: 'hey doh',
        example: 'Hej då! Vi ses!',
        exampleTranslation: 'Goodbye! See you!',
        difficulty: 1
      },
      {
        type: 'image_choice',
        instruction: 'Select the correct image for "hej då"',
        swedishWord: 'hej då',
        englishHint: 'goodbye',
        answer: 'goodbye',
        getOptions: (allOptions) => {
          const correctOption = allOptions.find(opt => opt.id === 'goodbye');
          const wrongOptions = allOptions.filter(opt => opt.id !== 'goodbye').sort(() => Math.random() - 0.5).slice(0, 3);
          return [correctOption, ...wrongOptions].sort(() => Math.random() - 0.5);
        }
      },
      // Review exercise
      {
        type: 'mixed_review',
        instruction: 'Review what you learned',
        words: ['hej', 'god morgon', 'tack', 'ja', 'nej', 'hej då'],
        difficulty: 1
      }
    ]
  },
  {
    id: 'lesson2',
    name: 'Basics 2',
    description: 'Learn more basic words',
    difficulty: 'beginner',
    xpReward: 15,
    requiredLevel: 2,
    words: [
      { 
        swedish: 'hej', 
        english: 'hello',
        pronunciation: 'hey',
        difficulty: 1,
        category: 'greetings'
      },
      { 
        swedish: 'tack', 
        english: 'thank you',
        pronunciation: 'tahk',
        difficulty: 1,
        category: 'greetings'
      },
      { 
        swedish: 'ja', 
        english: 'yes',
        pronunciation: 'yah',
        difficulty: 1,
        category: 'common'
      },
      { 
        swedish: 'nej', 
        english: 'no',
        pronunciation: 'ney',
        difficulty: 1,
        category: 'common'
      }
    ],
    exercises: [
      {
        type: 'translate',
        instruction: 'Translate to Swedish',
        question: 'hello',
        answer: 'hej',
        options: ['hej', 'tack', 'ja', 'nej']
      },
      {
        type: 'translate',
        instruction: 'Translate to Swedish',
        question: 'thank you',
        answer: 'tack',
        options: ['hej', 'tack', 'ja', 'nej']
      },
      {
        type: 'translate',
        instruction: 'Translate to Swedish',
        question: 'yes',
        answer: 'ja',
        options: ['hej', 'tack', 'ja', 'nej']
      },
      {
        type: 'translate',
        instruction: 'Translate to Swedish',
        question: 'no',
        answer: 'nej',
        options: ['hej', 'tack', 'ja', 'nej']
      }
    ]
  }
];

// Helper functions
export const getLessonById = (id) => {
  const lesson = LESSONS.find(lesson => lesson.id === id);
  
  // Validate lesson structure
  if (lesson && (!lesson.exercises || !Array.isArray(lesson.exercises))) {
    console.error('Invalid lesson structure:', lesson);
    return null;
  }
  
  return lesson;
};

export const getAllLessons = () => {
  return LESSONS;
};

export const isLessonUnlocked = (lessonId, userLevel) => {
  try {
    const lesson = getLessonById(lessonId);
    return lesson && userLevel >= lesson.requiredLevel;
  } catch (error) {
    console.error('Error checking lesson unlock status:', error);
    return false;
  }
};

export const getNextLesson = (currentLessonId) => {
  const currentIndex = LESSONS.findIndex(lesson => lesson.id === currentLessonId);
  if (currentIndex >= 0 && currentIndex < LESSONS.length - 1) {
    return LESSONS[currentIndex + 1];
  }
  return null;
};