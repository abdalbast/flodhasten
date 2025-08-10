// Sample lessons with enhanced content quality and new exercise types
export const sampleLessons = [
  {
    id: 'basics-1',
    name: 'Basic Greetings',
    description: 'Learn essential Swedish greetings and introductions',
    iconSet: 'duotone',
    difficulty: 'beginner',
    estimatedTime: '5-8 minutes',
    exercises: [
      {
        type: 'image_choice',
        instruction: 'What does "hej" mean?',
        swedishWord: 'hej',
        englishHint: 'A friendly greeting',
        answer: 'hello',
        explanation: '"Hej" is the most common way to say hello in Swedish. It\'s used in both formal and informal situations.',
        options: [
          { id: 'hello', label: 'Hello', image: '👋', iconColor: '#3498db' },
          { id: 'goodbye', label: 'Goodbye', image: '👋', iconColor: '#e74c3c' },
          { id: 'thank_you', label: 'Thank you', image: '🙏', iconColor: '#27ae60' },
          { id: 'please', label: 'Please', image: '🤲', iconColor: '#f39c12' }
        ]
      },
      {
        type: 'translate',
        instruction: 'Translate "tack" to English',
        question: 'tack',
        answer: 'thank you',
        explanation: '"Tack" means "thank you" in Swedish. It\'s pronounced like "tahk" with a short "a" sound.',
        timed: true,
        timeLimit: 20
      },
      {
        type: 'spelling',
        instruction: 'Listen and spell the word',
        audioWord: 'ja',
        answer: 'ja',
        explanation: '"Ja" means "yes" in Swedish. It\'s pronounced like "yah" with a short "a" sound.',
        letters: ['j', 'a', 'n', 'e', 't', 'k', 'h', 'e', 'j'],
        englishHint: 'The opposite of "nej"',
        timed: true,
        timeLimit: 25
      },
      {
        type: 'listening',
        instruction: 'Listen to the audio and choose the correct meaning',
        audioText: 'hej då',
        question: 'What does this phrase mean?',
        answer: 'goodbye',
        explanation: '"Hej då" is a casual way to say goodbye in Swedish. It literally means "hello then".',
        options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
        timed: true,
        timeLimit: 30
      },
      {
        type: 'match',
        instruction: 'Match the Swedish words with their English meanings',
        pairs: [
          { swedish: 'hej', english: 'hello' },
          { swedish: 'tack', english: 'thank you' },
          { swedish: 'ja', english: 'yes' },
          { swedish: 'nej', english: 'no' }
        ]
      }
    ]
  },
  {
    id: 'family-1',
    name: 'Family Members',
    description: 'Learn Swedish words for family members',
    iconSet: 'duotone',
    difficulty: 'beginner',
    estimatedTime: '6-10 minutes',
    exercises: [
      {
        type: 'image_choice',
        instruction: 'What is "mamma" in English?',
        swedishWord: 'mamma',
        englishHint: 'Your female parent',
        answer: 'mother',
        explanation: '"Mamma" is the Swedish word for mother. It\'s pronounced like "mah-mah".',
        options: [
          { id: 'mother', label: 'Mother', image: '👩', iconColor: '#e91e63' },
          { id: 'father', label: 'Father', image: '👨', iconColor: '#2196f3' },
          { id: 'sister', label: 'Sister', image: '👧', iconColor: '#ff9800' },
          { id: 'brother', label: 'Brother', image: '👦', iconColor: '#4caf50' }
        ]
      },
      {
        type: 'translate',
        instruction: 'Translate "pappa" to English',
        question: 'pappa',
        answer: 'father',
        explanation: '"Pappa" means "father" in Swedish. It\'s pronounced like "pah-pah".',
        timed: true,
        timeLimit: 20
      },
      {
        type: 'spelling',
        instruction: 'Listen and spell the word for sister',
        audioWord: 'syster',
        answer: 'syster',
        explanation: '"Syster" means "sister" in Swedish. Note the "y" sound which is unique to Swedish.',
        letters: ['s', 'y', 's', 't', 'e', 'r', 'b', 'r', 'o', 'd', 'e', 'r'],
        englishHint: 'A female sibling',
        timed: true,
        timeLimit: 30
      },
      {
        type: 'listening',
        instruction: 'Listen and choose the correct family member',
        audioText: 'bror',
        question: 'Which family member is this?',
        answer: 'brother',
        explanation: '"Bror" means "brother" in Swedish. It\'s pronounced like "broor".',
        options: ['Sister', 'Brother', 'Mother', 'Father'],
        timed: true,
        timeLimit: 25
      },
      {
        type: 'match',
        instruction: 'Match the Swedish family words with their English meanings',
        pairs: [
          { swedish: 'mamma', english: 'mother' },
          { swedish: 'pappa', english: 'father' },
          { swedish: 'syster', english: 'sister' },
          { swedish: 'bror', english: 'brother' },
          { swedish: 'barn', english: 'child' }
        ]
      }
    ]
  },
  {
    id: 'food-1',
    name: 'Basic Foods',
    description: 'Learn Swedish words for common foods and drinks',
    iconSet: 'duotone',
    difficulty: 'beginner',
    estimatedTime: '7-12 minutes',
    exercises: [
      {
        type: 'image_choice',
        instruction: 'What is "vatten" in English?',
        swedishWord: 'vatten',
        englishHint: 'Essential for life, clear liquid',
        answer: 'water',
        explanation: '"Vatten" means "water" in Swedish. It\'s pronounced like "vah-ten".',
        options: [
          { id: 'water', label: 'Water', image: '💧', iconColor: '#3498db' },
          { id: 'milk', label: 'Milk', image: '🥛', iconColor: '#ffffff' },
          { id: 'coffee', label: 'Coffee', image: '☕', iconColor: '#8b4513' },
          { id: 'bread', label: 'Bread', image: '🍞', iconColor: '#d4a574' }
        ]
      },
      {
        type: 'translate',
        instruction: 'Translate "bröd" to English',
        question: 'bröd',
        answer: 'bread',
        explanation: '"Bröd" means "bread" in Swedish. The "ö" is pronounced like the "u" in "burn".',
        timed: true,
        timeLimit: 20
      },
      {
        type: 'spelling',
        instruction: 'Listen and spell the word for milk',
        audioWord: 'mjölk',
        answer: 'mjölk',
        explanation: '"Mjölk" means "milk" in Swedish. The "mj" combination is pronounced like "my".',
        letters: ['m', 'j', 'ö', 'l', 'k', 'v', 'a', 't', 't', 'e', 'n', 'b'],
        englishHint: 'White liquid from cows',
        timed: true,
        timeLimit: 30
      },
      {
        type: 'listening',
        instruction: 'Listen and choose the correct drink',
        audioText: 'kaffe',
        question: 'Which drink is this?',
        answer: 'coffee',
        explanation: '"Kaffe" means "coffee" in Swedish. It\'s pronounced like "kah-feh".',
        options: ['Tea', 'Coffee', 'Milk', 'Water'],
        timed: true,
        timeLimit: 25
      },
      {
        type: 'match',
        instruction: 'Match the Swedish food words with their English meanings',
        pairs: [
          { swedish: 'vatten', english: 'water' },
          { swedish: 'bröd', english: 'bread' },
          { swedish: 'mjölk', english: 'milk' },
          { swedish: 'kaffe', english: 'coffee' },
          { swedish: 'te', english: 'tea' }
        ]
      }
    ]
  },
  {
    id: 'numbers-1',
    name: 'Numbers 1-10',
    description: 'Learn to count from 1 to 10 in Swedish',
    iconSet: 'duotone',
    difficulty: 'beginner',
    estimatedTime: '8-15 minutes',
    exercises: [
      {
        type: 'image_choice',
        instruction: 'What number is "ett"?',
        swedishWord: 'ett',
        englishHint: 'The first number',
        answer: 'one',
        explanation: '"Ett" means "one" in Swedish. It\'s pronounced like "et".',
        options: [
          { id: 'one', label: 'One', image: '1️⃣', iconColor: '#e74c3c' },
          { id: 'two', label: 'Two', image: '2️⃣', iconColor: '#3498db' },
          { id: 'three', label: 'Three', image: '3️⃣', iconColor: '#27ae60' },
          { id: 'four', label: 'Four', image: '4️⃣', iconColor: '#f39c12' }
        ]
      },
      {
        type: 'translate',
        instruction: 'Translate "två" to English',
        question: 'två',
        answer: 'two',
        explanation: '"Två" means "two" in Swedish. The "å" is pronounced like the "o" in "more".',
        timed: true,
        timeLimit: 20
      },
      {
        type: 'spelling',
        instruction: 'Listen and spell the number three',
        audioWord: 'tre',
        answer: 'tre',
        explanation: '"Tre" means "three" in Swedish. It\'s pronounced like "treh".',
        letters: ['t', 'r', 'e', 'e', 't', 't', 'v', 'å', 'f', 'y', 'r', 'a'],
        englishHint: 'One more than two',
        timed: true,
        timeLimit: 25
      },
      {
        type: 'listening',
        instruction: 'Listen and choose the correct number',
        audioText: 'fyra',
        question: 'Which number is this?',
        answer: 'four',
        explanation: '"Fyra" means "four" in Swedish. It\'s pronounced like "fee-rah".',
        options: ['Three', 'Four', 'Five', 'Six'],
        timed: true,
        timeLimit: 25
      },
      {
        type: 'match',
        instruction: 'Match the Swedish numbers with their English meanings',
        pairs: [
          { swedish: 'ett', english: 'one' },
          { swedish: 'två', english: 'two' },
          { swedish: 'tre', english: 'three' },
          { swedish: 'fyra', english: 'four' },
          { swedish: 'fem', english: 'five' }
        ]
      }
    ]
  },
  {
    id: 'colours-1',
    name: 'Basic Colours',
    description: 'Learn Swedish words for basic colours',
    iconSet: 'duotone',
    difficulty: 'beginner',
    estimatedTime: '6-10 minutes',
    exercises: [
      {
        type: 'image_choice',
        instruction: 'What colour is "röd"?',
        swedishWord: 'röd',
        englishHint: 'The colour of blood',
        answer: 'red',
        explanation: '"Röd" means "red" in Swedish. The "ö" is pronounced like the "u" in "burn".',
        options: [
          { id: 'red', label: 'Red', image: '🔴', iconColor: '#e74c3c' },
          { id: 'blue', label: 'Blue', image: '🔵', iconColor: '#3498db' },
          { id: 'green', label: 'Green', image: '🟢', iconColor: '#27ae60' },
          { id: 'yellow', label: 'Yellow', image: '🟡', iconColor: '#f39c12' }
        ]
      },
      {
        type: 'translate',
        instruction: 'Translate "blå" to English',
        question: 'blå',
        answer: 'blue',
        explanation: '"Blå" means "blue" in Swedish. The "å" is pronounced like the "o" in "more".',
        timed: true,
        timeLimit: 20
      },
      {
        type: 'spelling',
        instruction: 'Listen and spell the word for green',
        audioWord: 'grön',
        answer: 'grön',
        explanation: '"Grön" means "green" in Swedish. The "ö" is pronounced like the "u" in "burn".',
        letters: ['g', 'r', 'ö', 'n', 'r', 'ö', 'd', 'b', 'l', 'å', 'g', 'u'],
        englishHint: 'The colour of grass',
        timed: true,
        timeLimit: 30
      },
      {
        type: 'listening',
        instruction: 'Listen and choose the correct colour',
        audioText: 'gul',
        question: 'Which colour is this?',
        answer: 'yellow',
        explanation: '"Gul" means "yellow" in Swedish. It\'s pronounced like "gool".',
        options: ['Red', 'Blue', 'Green', 'Yellow'],
        timed: true,
        timeLimit: 25
      },
      {
        type: 'match',
        instruction: 'Match the Swedish colour words with their English meanings',
        pairs: [
          { swedish: 'röd', english: 'red' },
          { swedish: 'blå', english: 'blue' },
          { swedish: 'grön', english: 'green' },
          { swedish: 'gul', english: 'yellow' },
          { swedish: 'vit', english: 'white' }
        ]
      }
    ]
  }
];

// Helper function to get lesson by ID
export const getLessonById = (id) => {
  return sampleLessons.find(lesson => lesson.id === id);
};

// Helper function to get lessons by difficulty
export const getLessonsByDifficulty = (difficulty) => {
  return sampleLessons.filter(lesson => lesson.difficulty === difficulty);
};

// Helper function to get all lesson IDs
export const getAllLessonIds = () => {
  return sampleLessons.map(lesson => lesson.id);
};

// Helper function to get lesson statistics
export const getLessonStats = () => {
  return {
    totalLessons: sampleLessons.length,
    beginnerLessons: sampleLessons.filter(l => l.difficulty === 'beginner').length,
    totalExercises: sampleLessons.reduce((sum, lesson) => sum + lesson.exercises.length, 0),
    averageTime: Math.round(sampleLessons.reduce((sum, lesson) => {
      const timeRange = lesson.estimatedTime.match(/(\d+)-(\d+)/);
      if (timeRange) {
        return sum + (parseInt(timeRange[1]) + parseInt(timeRange[2])) / 2;
      }
      return sum + 8; // default average
    }, 0) / sampleLessons.length)
  };
};
