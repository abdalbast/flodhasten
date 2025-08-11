// Duolingo-style lesson structure for Swedish from English
export const LESSONS = [
  {
    id: 'lesson1',
    name: 'Basics 1',
    description: 'Learn your first Swedish words',
    iconSet: 'sketch',
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
    iconSet: 'clean',
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
  },
  {
    id: 'lesson3',
    name: 'Family',
    description: 'Learn family words',
    iconSet: 'feather',
    difficulty: 'beginner',
    xpReward: 20,
    requiredLevel: 3,
    words: [
      { 
        swedish: 'mamma', 
        english: 'mother',
        pronunciation: 'mah-mah',
        difficulty: 1,
        category: 'family'
      },
      { 
        swedish: 'pappa', 
        english: 'father',
        pronunciation: 'pah-pah',
        difficulty: 1,
        category: 'family'
      },
      { 
        swedish: 'barn', 
        english: 'child',
        pronunciation: 'barn',
        difficulty: 1,
        category: 'family'
      },
      { 
        swedish: 'flicka', 
        english: 'girl',
        pronunciation: 'flee-kah',
        difficulty: 1,
        category: 'family'
      },
      { 
        swedish: 'pojke', 
        english: 'boy',
        pronunciation: 'poy-keh',
        difficulty: 1,
        category: 'family'
      }
    ]
  },
  {
    id: 'lesson4',
    name: 'Numbers',
    description: 'Learn to count',
    iconSet: 'mono',
    difficulty: 'beginner',
    xpReward: 25,
    requiredLevel: 4,
    words: [
      { 
        swedish: 'ett', 
        english: 'one',
        pronunciation: 'et',
        difficulty: 1,
        category: 'numbers'
      },
      { 
        swedish: 'två', 
        english: 'two',
        pronunciation: 'tvoh',
        difficulty: 1,
        category: 'numbers'
      },
      { 
        swedish: 'tre', 
        english: 'three',
        pronunciation: 'treh',
        difficulty: 1,
        category: 'numbers'
      },
      { 
        swedish: 'fyra', 
        english: 'four',
        pronunciation: 'fee-rah',
        difficulty: 1,
        category: 'numbers'
      },
      { 
        swedish: 'fem', 
        english: 'five',
        pronunciation: 'fem',
        difficulty: 1,
        category: 'numbers'
      }
    ]
  },
  {
    id: 'lesson5',
    name: 'Animals',
    description: 'Learn animal names',
    iconSet: 'flat',
    difficulty: 'beginner',
    xpReward: 30,
    requiredLevel: 5,
    words: [
      { 
        swedish: 'hund', 
        english: 'dog',
        pronunciation: 'hund',
        difficulty: 1,
        category: 'animals'
      },
      { 
        swedish: 'katt', 
        english: 'cat',
        pronunciation: 'kaht',
        difficulty: 1,
        category: 'animals'
      },
      { 
        swedish: 'fågel', 
        english: 'bird',
        pronunciation: 'foh-gel',
        difficulty: 1,
        category: 'animals'
      },
      { 
        swedish: 'fisk', 
        english: 'fish',
        pronunciation: 'fisk',
        difficulty: 1,
        category: 'animals'
      },
      { 
        swedish: 'häst', 
        english: 'horse',
        pronunciation: 'hest',
        difficulty: 1,
        category: 'animals'
      }
    ]
  },
  {
    id: 'lesson6',
    name: 'Colours',
    description: 'Learn basic colours',
    iconSet: 'duotone',
    difficulty: 'beginner',
    xpReward: 35,
    requiredLevel: 6,
    words: [
      { 
        swedish: 'röd', 
        english: 'red',
        pronunciation: 'rud',
        difficulty: 1,
        category: 'colours'
      },
      { 
        swedish: 'blå', 
        english: 'blue',
        pronunciation: 'bloh',
        difficulty: 1,
        category: 'colours'
      },
      { 
        swedish: 'gul', 
        english: 'yellow',
        pronunciation: 'gool',
        difficulty: 1,
        category: 'colours'
      },
      { 
        swedish: 'grön', 
        english: 'green',
        pronunciation: 'grun',
        difficulty: 1,
        category: 'colours'
      },
      { 
        swedish: 'vit', 
        english: 'white',
        pronunciation: 'veet',
        difficulty: 1,
        category: 'colours'
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