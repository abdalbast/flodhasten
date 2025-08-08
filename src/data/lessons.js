// Duolingo-style lesson structure for Swedish from English
export const LESSONS = [
  {
    id: 'lesson1',
    name: 'Basics 1',
    description: 'Learn your first Swedish words',
    iconSet: 'phosphor',
    difficulty: 'beginner',
    xpReward: 10,
    requiredLevel: 1,
    words: [
      { 
        swedish: 'vatten', 
        english: 'water',
        pronunciation: 'vah-ten',
        difficulty: 1,
        category: 'food-drink'
      },
      { 
        swedish: 'mjölk', 
        english: 'milk',
        pronunciation: 'myelk',
        difficulty: 1,
        category: 'food-drink'
      },
      { 
        swedish: 'kaffe', 
        english: 'coffee',
        pronunciation: 'kah-feh',
        difficulty: 1,
        category: 'food-drink'
      },
      { 
        swedish: 'bröd', 
        english: 'bread',
        pronunciation: 'brud',
        difficulty: 1,
        category: 'food-drink'
      }
    ],
    // All available options for shuffling
    allOptions: [
      { id: 'water', label: 'water' },
      { id: 'milk', label: 'milk' },
      { id: 'coffee', label: 'coffee' },
      { id: 'bread', label: 'bread' }
    ],
    exercises: [
      {
        type: 'image_choice',
        instruction: 'Select the correct image',
        swedishWord: 'vatten',
        englishHint: 'water',
        answer: 'water',
        getOptions: (allOptions) => {
          // Get the correct answer
          const correctOption = allOptions.find(opt => opt.id === 'water');
          // Get 3 random wrong options
          const wrongOptions = allOptions.filter(opt => opt.id !== 'water').sort(() => Math.random() - 0.5).slice(0, 3);
          // Combine and shuffle
          return [correctOption, ...wrongOptions].sort(() => Math.random() - 0.5);
        }
      },
      {
        type: 'image_choice',
        instruction: 'Select the correct image',
        swedishWord: 'mjölk',
        englishHint: 'milk',
        answer: 'milk',
        getOptions: (allOptions) => {
          const correctOption = allOptions.find(opt => opt.id === 'milk');
          const wrongOptions = allOptions.filter(opt => opt.id !== 'milk').sort(() => Math.random() - 0.5).slice(0, 3);
          return [correctOption, ...wrongOptions].sort(() => Math.random() - 0.5);
        }
      },
      {
        type: 'image_choice',
        instruction: 'Select the correct image',
        swedishWord: 'kaffe',
        englishHint: 'coffee',
        answer: 'coffee',
        getOptions: (allOptions) => {
          const correctOption = allOptions.find(opt => opt.id === 'coffee');
          const wrongOptions = allOptions.filter(opt => opt.id !== 'coffee').sort(() => Math.random() - 0.5).slice(0, 3);
          return [correctOption, ...wrongOptions].sort(() => Math.random() - 0.5);
        }
      },
      {
        type: 'image_choice',
        instruction: 'Select the correct image',
        swedishWord: 'bröd',
        englishHint: 'bread',
        answer: 'bread',
        getOptions: (allOptions) => {
          const correctOption = allOptions.find(opt => opt.id === 'bread');
          const wrongOptions = allOptions.filter(opt => opt.id !== 'bread').sort(() => Math.random() - 0.5).slice(0, 3);
          return [correctOption, ...wrongOptions].sort(() => Math.random() - 0.5);
        }
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