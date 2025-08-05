// Voice Recognition System for Flodhästen
export const PRONUNCIATION_LEVELS = {
  EXCELLENT: 'excellent',
  GOOD: 'good',
  FAIR: 'fair',
  NEEDS_IMPROVEMENT: 'needs_improvement'
};

export const PRONUNCIATION_SCORES = {
  [PRONUNCIATION_LEVELS.EXCELLENT]: { min: 90, max: 100, color: '#27ae60', emoji: '🌟' },
  [PRONUNCIATION_LEVELS.GOOD]: { min: 70, max: 89, color: '#f39c12', emoji: '👍' },
  [PRONUNCIATION_LEVELS.FAIR]: { min: 50, max: 69, color: '#e67e22', emoji: '😐' },
  [PRONUNCIATION_LEVELS.NEEDS_IMPROVEMENT]: { min: 0, max: 49, color: '#e74c3c', emoji: '😕' }
};

// Swedish pronunciation patterns and common mistakes
export const SWEDISH_PRONUNCIATION_PATTERNS = {
  vowels: {
    'a': { correct: 'ah', common_mistakes: ['ay', 'uh'], difficulty: 'easy' },
    'e': { correct: 'eh', common_mistakes: ['ee', 'ay'], difficulty: 'medium' },
    'i': { correct: 'ee', common_mistakes: ['ay', 'ih'], difficulty: 'easy' },
    'o': { correct: 'oo', common_mistakes: ['oh', 'aw'], difficulty: 'medium' },
    'u': { correct: 'oo', common_mistakes: ['you', 'uh'], difficulty: 'hard' },
    'å': { correct: 'aw', common_mistakes: ['oh', 'ah'], difficulty: 'hard' },
    'ä': { correct: 'eh', common_mistakes: ['ay', 'ah'], difficulty: 'medium' },
    'ö': { correct: 'uh', common_mistakes: ['oh', 'oo'], difficulty: 'hard' }
  },
  consonants: {
    'j': { correct: 'y', common_mistakes: ['j', 'h'], difficulty: 'medium' },
    'g': { correct: 'g', common_mistakes: ['j', 'h'], difficulty: 'medium' },
    'k': { correct: 'k', common_mistakes: ['sh', 'ch'], difficulty: 'easy' },
    'sk': { correct: 'sh', common_mistakes: ['sk', 's'], difficulty: 'hard' },
    'sj': { correct: 'sh', common_mistakes: ['sj', 's'], difficulty: 'hard' },
    'tj': { correct: 'ch', common_mistakes: ['tj', 't'], difficulty: 'hard' },
    'rs': { correct: 'sh', common_mistakes: ['rs', 'r'], difficulty: 'hard' },
    'rt': { correct: 't', common_mistakes: ['rt', 'r'], difficulty: 'medium' },
    'rd': { correct: 'd', common_mistakes: ['rd', 'r'], difficulty: 'medium' }
  },
  stress_patterns: {
    'first_syllable': { pattern: 'STRESS-weak-weak', examples: ['hej', 'tack', 'bra'] },
    'second_syllable': { pattern: 'weak-STRESS-weak', examples: ['hej då', 'tack så mycket'] },
    'compound_words': { pattern: 'STRESS-weak-STRESS-weak', examples: ['god morgon', 'god natt'] }
  }
};

// Common Swedish words with pronunciation guides
export const PRONUNCIATION_WORDS = [
  {
    word: 'hej',
    english: 'hello',
    pronunciation: 'hey',
    difficulty: 'easy',
    stress: 'first_syllable',
    tips: ['Pronounce like English "hey"', 'Keep it short and crisp'],
    common_mistakes: ['hay', 'haj', 'he']
  },
  {
    word: 'tack',
    english: 'thank you',
    pronunciation: 'tahk',
    difficulty: 'easy',
    stress: 'first_syllable',
    tips: ['Short "a" sound like in "father"', 'Hard "k" at the end'],
    common_mistakes: ['tack', 'tak', 'tahk']
  },
  {
    word: 'hej då',
    english: 'goodbye',
    pronunciation: 'hey daw',
    difficulty: 'medium',
    stress: 'second_syllable',
    tips: ['"hej" like hello', '"då" rhymes with "saw"'],
    common_mistakes: ['hey doh', 'hej do', 'hey do']
  },
  {
    word: 'god morgon',
    english: 'good morning',
    pronunciation: 'goo mor-gon',
    difficulty: 'medium',
    stress: 'compound_words',
    tips: ['"god" like "good"', '"morgon" stress on first syllable'],
    common_mistakes: ['good morning', 'god morning', 'goo mor-gun']
  },
  {
    word: 'välkommen',
    english: 'welcome',
    pronunciation: 'vel-kom-men',
    difficulty: 'hard',
    stress: 'first_syllable',
    tips: ['"väl" like "well"', 'Soft "k" sound', 'Clear "en" ending'],
    common_mistakes: ['welcome', 'vel-kom-en', 'vel-kom-men']
  },
  {
    word: 'ursäkta',
    english: 'excuse me',
    pronunciation: 'ur-sek-ta',
    difficulty: 'hard',
    stress: 'second_syllable',
    tips: ['"ur" like "ur" in "urban"', 'Soft "k" in middle', 'Clear "ta" ending'],
    common_mistakes: ['excuse me', 'ur-sek-ta', 'ur-sek-ta']
  },
  {
    word: 'förlåt',
    english: 'sorry',
    pronunciation: 'fur-lot',
    difficulty: 'medium',
    stress: 'second_syllable',
    tips: ['"för" like "fur"', '"låt" like "lot"'],
    common_mistakes: ['sorry', 'for-lot', 'fur-lat']
  },
  {
    word: 'ja',
    english: 'yes',
    pronunciation: 'yah',
    difficulty: 'easy',
    stress: 'first_syllable',
    tips: ['Like "ya" in "yacht"', 'Short and clear'],
    common_mistakes: ['yes', 'ja', 'yah']
  },
  {
    word: 'nej',
    english: 'no',
    pronunciation: 'nay',
    difficulty: 'easy',
    stress: 'first_syllable',
    tips: ['Like "nay" in English', 'Clear "j" sound'],
    common_mistakes: ['no', 'nei', 'nay']
  },
  {
    word: 'bra',
    english: 'good',
    pronunciation: 'brah',
    difficulty: 'easy',
    stress: 'first_syllable',
    tips: ['Like "bra" in English', 'Short "a" sound'],
    common_mistakes: ['good', 'bra', 'brah']
  }
];

// Helper functions for voice recognition
export const analyzePronunciation = (spokenText, targetWord) => {
  const target = targetWord.toLowerCase();
  const spoken = spokenText.toLowerCase();
  
  // Basic similarity scoring
  let score = 0;
  const maxScore = 100;
  
  // Exact match
  if (spoken === target) {
    score = 100;
  } else {
    // Character-by-character comparison
    const targetChars = target.split('');
    const spokenChars = spoken.split('');
    
    let correctChars = 0;
    let totalChars = Math.max(targetChars.length, spokenChars.length);
    
    for (let i = 0; i < Math.min(targetChars.length, spokenChars.length); i++) {
      if (targetChars[i] === spokenChars[i]) {
        correctChars++;
      }
    }
    
    score = Math.round((correctChars / totalChars) * 100);
    
    // Bonus for close matches
    if (spoken.includes(target) || target.includes(spoken)) {
      score = Math.min(score + 10, 100);
    }
    
    // Penalty for length differences
    const lengthDiff = Math.abs(targetChars.length - spokenChars.length);
    score = Math.max(score - (lengthDiff * 5), 0);
  }
  
  return {
    score,
    level: getPronunciationLevel(score),
    feedback: generateFeedback(spoken, target, score),
    suggestions: generateSuggestions(spoken, target)
  };
};

export const getPronunciationLevel = (score) => {
  if (score >= 90) return PRONUNCIATION_LEVELS.EXCELLENT;
  if (score >= 70) return PRONUNCIATION_LEVELS.GOOD;
  if (score >= 50) return PRONUNCIATION_LEVELS.FAIR;
  return PRONUNCIATION_LEVELS.NEEDS_IMPROVEMENT;
};

export const generateFeedback = (spoken, target, score) => {
  const level = getPronunciationLevel(score);
  const levelInfo = PRONUNCIATION_SCORES[level];
  
  if (score === 100) {
    return {
      message: 'Perfect pronunciation! 🎉',
      tips: ['Excellent work!', 'Keep practicing to maintain this level.'],
      encouragement: 'You\'re a natural!'
    };
  } else if (score >= 80) {
    return {
      message: 'Great pronunciation! 👍',
      tips: ['Very close to perfect!', 'Try to focus on the subtle differences.'],
      encouragement: 'You\'re almost there!'
    };
  } else if (score >= 60) {
    return {
      message: 'Good effort! 📝',
      tips: ['You\'re on the right track!', 'Listen to the native pronunciation again.'],
      encouragement: 'Keep practicing!'
    };
  } else {
    return {
      message: 'Keep practicing! 💪',
      tips: ['Try listening to the pronunciation again.', 'Break down the word into syllables.'],
      encouragement: 'Every attempt makes you better!'
    };
  }
};

export const generateSuggestions = (spoken, target) => {
  const suggestions = [];
  
  // Find the word in our pronunciation database
  const wordData = PRONUNCIATION_WORDS.find(w => w.word.toLowerCase() === target.toLowerCase());
  
  if (wordData) {
    suggestions.push(`Try: "${wordData.pronunciation}"`);
    suggestions.push(...wordData.tips);
    
    // Check for common mistakes
    if (wordData.common_mistakes.includes(spoken)) {
      suggestions.push('This is a common mistake. Listen carefully to the correct pronunciation.');
    }
  }
  
  return suggestions;
};

export const getRandomPronunciationWord = (difficulty = 'all') => {
  let words = PRONUNCIATION_WORDS;
  
  if (difficulty !== 'all') {
    words = PRONUNCIATION_WORDS.filter(w => w.difficulty === difficulty);
  }
  
  if (words.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
};

export const getPronunciationStats = (userStats) => {
  const totalAttempts = userStats.pronunciation_attempts || 0;
  const excellentCount = userStats.excellent_pronunciations || 0;
  const goodCount = userStats.good_pronunciations || 0;
  const fairCount = userStats.fair_pronunciations || 0;
  const needsImprovementCount = userStats.needs_improvement_pronunciations || 0;
  
  const averageScore = totalAttempts > 0 
    ? Math.round((excellentCount * 95 + goodCount * 80 + fairCount * 60 + needsImprovementCount * 25) / totalAttempts)
    : 0;
  
  return {
    totalAttempts,
    excellentCount,
    goodCount,
    fairCount,
    needsImprovementCount,
    averageScore,
    progress: totalAttempts > 0 ? Math.round((excellentCount + goodCount) / totalAttempts * 100) : 0
  };
}; 