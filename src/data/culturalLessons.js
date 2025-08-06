// Swedish Cultural Lessons Data
export const CULTURAL_CATEGORIES = {
  traditions: {
    name: 'Traditions',
    icon: '🏛️',
    description: 'Swedish customs and traditional practices'
  },
  holidays: {
    name: 'Holidays',
    icon: '🎉',
    description: 'Swedish holidays and celebrations'
  },
  food: {
    name: 'Food & Cuisine',
    icon: '🍽️',
    description: 'Traditional Swedish food and dining customs'
  },
  nature: {
    name: 'Nature & Outdoors',
    icon: '🌲',
    description: 'Swedish nature, outdoor activities, and environmental values'
  },
  society: {
    name: 'Society & Values',
    icon: '🤝',
    description: 'Swedish social values, equality, and modern society'
  },
  history: {
    name: 'History',
    icon: '📚',
    description: 'Important historical events and Swedish heritage'
  }
};

export const CULTURAL_LESSONS = {
  traditions: [
    {
      id: 'midsummer',
      title: 'Midsummer Celebration',
      subtitle: 'Midsommar',
      difficulty: 'intermediate',
      content: {
        overview: 'Midsummer is one of Sweden\'s most important holidays, celebrated around the summer solstice.',
        vocabulary: [
          { swedish: 'midsommar', english: 'midsummer', pronunciation: 'meed-soh-mar' },
          { swedish: 'majstång', english: 'maypole', pronunciation: 'my-stong' },
          { swedish: 'blommor', english: 'flowers', pronunciation: 'bloom-or' },
          { swedish: 'dans', english: 'dance', pronunciation: 'dans' },
          { swedish: 'sill', english: 'herring', pronunciation: 'sill' },
          { swedish: 'potatis', english: 'potato', pronunciation: 'po-tah-tis' },
          { swedish: 'dill', english: 'dill', pronunciation: 'dill' },
          { swedish: 'snaps', english: 'aquavit', pronunciation: 'snaps' }
        ],
        cultural_insights: [
          'Midsummer is celebrated on the Friday closest to June 21st',
          'People gather flowers to make wreaths for their hair',
          'Traditional foods include pickled herring, new potatoes, and strawberries',
          'The maypole (majstång) is decorated with flowers and leaves',
          'Everyone dances around the maypole, including the famous "Små grodorna" dance',
          'It\'s common to drink snaps (aquavit) with traditional songs'
        ],
        traditions: [
          'Wearing flower wreaths in your hair',
          'Dancing around the maypole',
          'Eating traditional Swedish food',
          'Singing drinking songs (snapsvisor)',
          'Spending time outdoors with family and friends'
        ],
        quiz: [
          {
            question: 'What is the Swedish word for midsummer?',
            options: ['midsommar', 'jul', 'påsk', 'valborg'],
            correct: 0,
            explanation: 'Midsommar is the Swedish word for midsummer, celebrated around the summer solstice.'
          },
          {
            question: 'What do Swedes traditionally wear on their heads during midsummer?',
            options: ['Hats', 'Flower wreaths', 'Crowns', 'Nothing'],
            correct: 1,
            explanation: 'Swedes traditionally wear flower wreaths (blomsterkransar) in their hair during midsummer celebrations.'
          },
          {
            question: 'What traditional food is most associated with midsummer?',
            options: ['Meatballs', 'Pickled herring', 'Cinnamon buns', 'Pizza'],
            correct: 1,
            explanation: 'Pickled herring (sill) is a traditional midsummer food, often served with new potatoes and dill.'
          }
        ]
      }
    },
    {
      id: 'fika',
      title: 'Fika - Coffee Break Culture',
      subtitle: 'Fika',
      difficulty: 'beginner',
      content: {
        overview: 'Fika is a Swedish coffee break tradition that\'s more than just drinking coffee - it\'s a social ritual.',
        vocabulary: [
          { swedish: 'fika', english: 'coffee break', pronunciation: 'fee-ka' },
          { swedish: 'kaffe', english: 'coffee', pronunciation: 'kaff-eh' },
          { swedish: 'bulle', english: 'bun', pronunciation: 'bul-leh' },
          { swedish: 'kanelbulle', english: 'cinnamon bun', pronunciation: 'ka-nel-bul-leh' },
          { swedish: 'kaka', english: 'cookie/cake', pronunciation: 'ka-ka' },
          { swedish: 'tårta', english: 'cake', pronunciation: 'tor-ta' },
          { swedish: 'saft', english: 'juice', pronunciation: 'saft' },
          { swedish: 'te', english: 'tea', pronunciation: 'teh' }
        ],
        cultural_insights: [
          'Fika is both a noun and a verb in Swedish',
          'It\'s common to have fika multiple times a day',
          'Fika is often accompanied by sweet pastries or cookies',
          'It\'s a social activity, not just about the coffee',
          'Many workplaces have scheduled fika breaks',
          'Fika can be formal or informal, depending on the context'
        ],
        traditions: [
          'Taking regular coffee breaks throughout the day',
          'Sharing pastries or cookies during fika',
          'Using fika as a way to socialize and network',
          'Having fika dates with friends or colleagues',
          'Making time for fika even when busy'
        ],
        quiz: [
          {
            question: 'What does "fika" mean in Swedish?',
            options: ['Dinner', 'Coffee break', 'Lunch', 'Breakfast'],
            correct: 1,
            explanation: 'Fika refers to a coffee break, but it\'s more than just drinking coffee - it\'s a social ritual.'
          },
          {
            question: 'What is a "kanelbulle"?',
            options: ['A type of coffee', 'A cinnamon bun', 'A cookie', 'A cake'],
            correct: 1,
            explanation: 'Kanelbulle is a cinnamon bun, one of the most popular pastries to have with fika.'
          },
          {
            question: 'How often do Swedes typically have fika?',
            options: ['Once a day', 'Multiple times a day', 'Only on weekends', 'Only at work'],
            correct: 1,
            explanation: 'Swedes often have fika multiple times a day - morning fika, afternoon fika, and sometimes evening fika.'
          }
        ]
      }
    },
    {
      id: 'lagom',
      title: 'Lagom - The Swedish Way',
      subtitle: 'Lagom',
      difficulty: 'intermediate',
      content: {
        overview: 'Lagom is a Swedish concept meaning "just the right amount" - not too much, not too little.',
        vocabulary: [
          { swedish: 'lagom', english: 'just right/adequate', pronunciation: 'la-gom' },
          { swedish: 'lagom mycket', english: 'just the right amount', pronunciation: 'la-gom myk-et' },
          { swedish: 'lagom stor', english: 'just the right size', pronunciation: 'la-gom stor' },
          { swedish: 'lagom varm', english: 'just the right temperature', pronunciation: 'la-gom varm' },
          { swedish: 'lagom tid', english: 'just the right time', pronunciation: 'la-gom teed' },
          { swedish: 'lagom bra', english: 'just good enough', pronunciation: 'la-gom bra' }
        ],
        cultural_insights: [
          'Lagom is considered a core Swedish value',
          'It reflects the Swedish preference for moderation and equality',
          'Lagom can be applied to almost any situation',
          'It\'s often seen as a positive trait in Swedish culture',
          'Lagom is related to the Swedish concept of "Jantelagen"',
          'It promotes sustainability and avoiding excess'
        ],
        traditions: [
          'Practicing moderation in all aspects of life',
          'Avoiding showing off or being too flashy',
          'Finding balance in work and personal life',
          'Being content with "just enough"',
          'Valuing equality and not standing out too much'
        ],
        quiz: [
          {
            question: 'What does "lagom" mean?',
            options: ['Too much', 'Too little', 'Just the right amount', 'Perfect'],
            correct: 2,
            explanation: 'Lagom means "just the right amount" - not too much, not too little.'
          },
          {
            question: 'What Swedish value is lagom most closely related to?',
            options: ['Individualism', 'Moderation and equality', 'Competition', 'Luxury'],
            correct: 1,
            explanation: 'Lagom reflects the Swedish preference for moderation and equality, avoiding excess and standing out.'
          },
          {
            question: 'How is lagom typically viewed in Swedish culture?',
            options: ['As a negative trait', 'As a positive trait', 'As neutral', 'As old-fashioned'],
            correct: 1,
            explanation: 'Lagom is generally viewed as a positive trait in Swedish culture, promoting balance and equality.'
          }
        ]
      }
    }
  ],
  holidays: [
    {
      id: 'christmas',
      title: 'Swedish Christmas Traditions',
      subtitle: 'Jul',
      difficulty: 'intermediate',
      content: {
        overview: 'Swedish Christmas (Jul) is celebrated with unique traditions and customs.',
        vocabulary: [
          { swedish: 'jul', english: 'Christmas', pronunciation: 'yool' },
          { swedish: 'julbord', english: 'Christmas buffet', pronunciation: 'yool-bord' },
          { swedish: 'julklappar', english: 'Christmas presents', pronunciation: 'yool-klap-par' },
          { swedish: 'julgran', english: 'Christmas tree', pronunciation: 'yool-gran' },
          { swedish: 'lutfisk', english: 'dried fish', pronunciation: 'lut-fisk' },
          { swedish: 'risgrynsgröt', english: 'rice pudding', pronunciation: 'ris-gryns-gröt' },
          { swedish: 'pepparkakor', english: 'gingerbread cookies', pronunciation: 'pep-par-ka-kor' },
          { swedish: 'glögg', english: 'mulled wine', pronunciation: 'glögg' }
        ],
        cultural_insights: [
          'Christmas is celebrated on December 24th in Sweden',
          'The main meal is julbord, a traditional buffet',
          'Children receive presents from Jultomten (Santa Claus)',
          'Traditional foods include lutfisk, ham, and various fish',
          'Many families watch Donald Duck cartoons on Christmas Eve',
          'Candles and lights are important decorations'
        ],
        traditions: [
          'Having julbord with family on Christmas Eve',
          'Dancing around the Christmas tree',
          'Watching "Kalle Anka" (Donald Duck) on TV',
          'Eating traditional Christmas foods',
          'Lighting advent candles throughout December'
        ],
        quiz: [
          {
            question: 'When do Swedes celebrate Christmas?',
            options: ['December 25th', 'December 24th', 'December 26th', 'December 23rd'],
            correct: 1,
            explanation: 'Swedes celebrate Christmas on December 24th, not December 25th like many other countries.'
          },
          {
            question: 'What is "julbord"?',
            options: ['Christmas tree', 'Christmas buffet', 'Christmas presents', 'Christmas carols'],
            correct: 1,
            explanation: 'Julbord is the traditional Christmas buffet with various Swedish dishes.'
          },
          {
            question: 'What do Swedes traditionally watch on Christmas Eve?',
            options: ['Movies', 'Donald Duck cartoons', 'News', 'Sports'],
            correct: 1,
            explanation: 'Many Swedish families watch "Kalle Anka" (Donald Duck) cartoons on Christmas Eve.'
          }
        ]
      }
    },
    {
      id: 'easter',
      title: 'Swedish Easter Traditions',
      subtitle: 'Påsk',
      difficulty: 'beginner',
      content: {
        overview: 'Swedish Easter combines Christian traditions with spring celebrations.',
        vocabulary: [
          { swedish: 'påsk', english: 'Easter', pronunciation: 'posk' },
          { swedish: 'påskägg', english: 'Easter egg', pronunciation: 'posk-egg' },
          { swedish: 'påskhare', english: 'Easter bunny', pronunciation: 'posk-ha-re' },
          { swedish: 'påskris', english: 'Easter twigs', pronunciation: 'posk-ris' },
          { swedish: 'påskmust', english: 'Easter soda', pronunciation: 'posk-must' },
          { swedish: 'påskgodis', english: 'Easter candy', pronunciation: 'posk-go-dis' }
        ],
        cultural_insights: [
          'Easter is celebrated with both religious and secular traditions',
          'Children dress up as Easter witches and go door-to-door',
          'Traditional foods include eggs, herring, and lamb',
          'Easter decorations include feathers and colored eggs',
          'Påskmust is a traditional Easter soda',
          'Many families have Easter egg hunts'
        ],
        traditions: [
          'Children dressing up as Easter witches',
          'Decorating with feathers and eggs',
          'Eating traditional Easter foods',
          'Having Easter egg hunts',
          'Spending time outdoors celebrating spring'
        ],
        quiz: [
          {
            question: 'What do Swedish children dress up as during Easter?',
            options: ['Easter bunnies', 'Easter witches', 'Easter eggs', 'Easter flowers'],
            correct: 1,
            explanation: 'Swedish children dress up as Easter witches (påskhäxor) and go door-to-door for candy.'
          },
          {
            question: 'What is "påskmust"?',
            options: ['Easter egg', 'Easter soda', 'Easter candy', 'Easter bread'],
            correct: 1,
            explanation: 'Påskmust is a traditional Swedish Easter soda that\'s only available during Easter.'
          },
          {
            question: 'What do Swedes traditionally decorate with during Easter?',
            options: ['Lights', 'Feathers and eggs', 'Flowers', 'Candles'],
            correct: 1,
            explanation: 'Swedes traditionally decorate with feathers and colored eggs during Easter.'
          }
        ]
      }
    }
  ],
  food: [
    {
      id: 'traditional_food',
      title: 'Traditional Swedish Food',
      subtitle: 'Svensk Mat',
      difficulty: 'beginner',
      content: {
        overview: 'Swedish cuisine features traditional dishes that reflect the country\'s climate and culture.',
        vocabulary: [
          { swedish: 'köttbullar', english: 'meatballs', pronunciation: 'shut-bul-lar' },
          { swedish: 'lingonsylt', english: 'lingonberry jam', pronunciation: 'ling-on-sylt' },
          { swedish: 'potatismos', english: 'mashed potatoes', pronunciation: 'po-tah-tis-mos' },
          { swedish: 'gravad lax', english: 'cured salmon', pronunciation: 'gra-vad laks' },
          { swedish: 'surströmming', english: 'fermented herring', pronunciation: 'sur-ström-ming' },
          { swedish: 'knäckebröd', english: 'crispbread', pronunciation: 'knä-ke-bröd' },
          { swedish: 'ost', english: 'cheese', pronunciation: 'ost' },
          { swedish: 'smörgås', english: 'sandwich', pronunciation: 'smör-gås' }
        ],
        cultural_insights: [
          'Swedish food is often simple and hearty',
          'Fish and seafood are very important',
          'Potatoes are a staple food',
          'Berries and mushrooms are commonly used',
          'Pickled and preserved foods are traditional',
          'Coffee and pastries are central to Swedish food culture'
        ],
        traditions: [
          'Eating meatballs with lingonberry jam',
          'Having fika with coffee and pastries',
          'Eating fish on Thursdays',
          'Making traditional breads and pastries',
          'Preserving food for winter months'
        ],
        quiz: [
          {
            question: 'What is traditionally served with Swedish meatballs?',
            options: ['Ketchup', 'Lingonberry jam', 'Mustard', 'Gravy'],
            correct: 1,
            explanation: 'Swedish meatballs are traditionally served with lingonberry jam (lingonsylt).'
          },
          {
            question: 'What day of the week do Swedes traditionally eat fish?',
            options: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
            correct: 2,
            explanation: 'Swedes traditionally eat fish on Thursdays, a custom that dates back to Catholic fasting traditions.'
          },
          {
            question: 'What is "knäckebröd"?',
            options: ['Soft bread', 'Crispbread', 'Sweet bread', 'Sourdough bread'],
            correct: 1,
            explanation: 'Knäckebröd is Swedish crispbread, a traditional type of bread that\'s very thin and crispy.'
          }
        ]
      }
    }
  ],
  nature: [
    {
      id: 'allemansratten',
      title: 'Allemansrätten - Right of Public Access',
      subtitle: 'Allemansrätten',
      difficulty: 'advanced',
      content: {
        overview: 'Allemansrätten is a unique Swedish right that allows everyone to access nature freely.',
        vocabulary: [
          { swedish: 'allemansrätten', english: 'right of public access', pronunciation: 'al-le-mans-rät-ten' },
          { swedish: 'natur', english: 'nature', pronunciation: 'na-tur' },
          { swedish: 'skog', english: 'forest', pronunciation: 'skog' },
          { swedish: 'sjö', english: 'lake', pronunciation: 'shö' },
          { swedish: 'berg', english: 'mountain', pronunciation: 'berg' },
          { swedish: 'vandring', english: 'hiking', pronunciation: 'van-dring' },
          { swedish: 'plocka bär', english: 'pick berries', pronunciation: 'plok-ka bär' },
          { swedish: 'tälta', english: 'camp', pronunciation: 'täl-ta' }
        ],
        cultural_insights: [
          'Allemansrätten is protected by law',
          'It allows access to private land for recreation',
          'You can camp, hike, and pick berries almost anywhere',
          'There are responsibilities that come with these rights',
          'It reflects Swedish values of nature and equality',
          'The right is balanced with respect for landowners'
        ],
        traditions: [
          'Spending time outdoors year-round',
          'Picking berries and mushrooms',
          'Hiking and camping in nature',
          'Respecting nature and leaving no trace',
          'Teaching children about nature from an early age'
        ],
        quiz: [
          {
            question: 'What does "allemansrätten" allow?',
            options: ['Free access to nature', 'Free public transport', 'Free healthcare', 'Free education'],
            correct: 0,
            explanation: 'Allemansrätten allows free access to nature, including private land for recreation.'
          },
          {
            question: 'What can you do under allemansrätten?',
            options: ['Camp anywhere', 'Pick berries', 'Hike freely', 'All of the above'],
            correct: 3,
            explanation: 'Allemansrätten allows camping, berry picking, hiking, and other outdoor activities on most land.'
          },
          {
            question: 'What comes with allemansrätten rights?',
            options: ['No responsibilities', 'Responsibilities to respect nature', 'Paying fees', 'Getting permits'],
            correct: 1,
            explanation: 'Allemansrätten comes with responsibilities to respect nature and landowners.'
          }
        ]
      }
    }
  ],
  society: [
    {
      id: 'equality',
      title: 'Swedish Equality Values',
      subtitle: 'Jämställdhet',
      difficulty: 'intermediate',
      content: {
        overview: 'Equality is a fundamental value in Swedish society, reflected in many aspects of life.',
        vocabulary: [
          { swedish: 'jämställdhet', english: 'equality', pronunciation: 'yam-ställd-het' },
          { swedish: 'likhet', english: 'similarity/equality', pronunciation: 'lik-het' },
          { swedish: 'demokrati', english: 'democracy', pronunciation: 'de-mo-kra-ti' },
          { swedish: 'solidaritet', english: 'solidarity', pronunciation: 'so-li-da-ri-tet' },
          { swedish: 'rättvisa', english: 'justice', pronunciation: 'rät-vi-sa' },
          { swedish: 'gemenskap', english: 'community', pronunciation: 'ge-menskap' }
        ],
        cultural_insights: [
          'Gender equality is highly valued',
          'Parental leave is shared between parents',
          'Education is free and accessible to all',
          'Healthcare is universal',
          'Income equality is promoted through taxes',
          'Work-life balance is important'
        ],
        traditions: [
          'Sharing parental leave equally',
          'Promoting gender equality in all areas',
          'Valuing work-life balance',
          'Supporting universal welfare',
          'Encouraging democratic participation'
        ],
        quiz: [
          {
            question: 'What is "jämställdhet"?',
            options: ['Democracy', 'Equality', 'Freedom', 'Justice'],
            correct: 1,
            explanation: 'Jämställdhet means equality, particularly gender equality in Swedish society.'
          },
          {
            question: 'How do Swedes typically share parental leave?',
            options: ['Only mothers take it', 'Only fathers take it', 'Equally between parents', 'Grandparents take it'],
            correct: 2,
            explanation: 'Swedish parents typically share parental leave equally, promoting gender equality.'
          },
          {
            question: 'What is highly valued in Swedish society?',
            options: ['Individual success', 'Work-life balance', 'Competition', 'Hierarchy'],
            correct: 1,
            explanation: 'Work-life balance is highly valued in Swedish society, along with equality and community.'
          }
        ]
      }
    }
  ],
  history: [
    {
      id: 'vikings',
      title: 'Viking Heritage',
      subtitle: 'Vikingar',
      difficulty: 'intermediate',
      content: {
        overview: 'Sweden has a rich Viking heritage that influenced its culture and history.',
        vocabulary: [
          { swedish: 'viking', english: 'viking', pronunciation: 'vi-king' },
          { swedish: 'vikingatiden', english: 'viking age', pronunciation: 'vi-king-a-ti-den' },
          { swedish: 'skepp', english: 'ship', pronunciation: 'shepp' },
          { swedish: 'kung', english: 'king', pronunciation: 'kung' },
          { swedish: 'krigare', english: 'warrior', pronunciation: 'kri-ga-re' },
          { swedish: 'handel', english: 'trade', pronunciation: 'han-del' },
          { swedish: 'upptäcktsresor', english: 'exploration voyages', pronunciation: 'up-täkts-re-sor' }
        ],
        cultural_insights: [
          'Vikings were primarily traders and explorers',
          'They established trade routes across Europe',
          'Viking ships were advanced for their time',
          'They had a complex society with laws and governance',
          'Viking influence can be seen in modern Swedish culture',
          'They were skilled craftsmen and farmers'
        ],
        traditions: [
          'Celebrating Viking heritage through festivals',
          'Studying Viking history and archaeology',
          'Visiting Viking museums and sites',
          'Learning about Viking crafts and skills',
          'Appreciating Viking contributions to Swedish culture'
        ],
        quiz: [
          {
            question: 'What were Vikings primarily known for?',
            options: ['Only raiding', 'Only farming', 'Trading and exploring', 'Only fighting'],
            correct: 2,
            explanation: 'Vikings were primarily traders and explorers, though they also raided and fought.'
          },
          {
            question: 'What is "vikingatiden"?',
            options: ['Modern times', 'Viking age', 'Stone age', 'Bronze age'],
            correct: 1,
            explanation: 'Vikingatiden means the Viking age, the historical period when Vikings were active.'
          },
          {
            question: 'How do Swedes typically view their Viking heritage?',
            options: ['With shame', 'With pride', 'With indifference', 'With fear'],
            correct: 1,
            explanation: 'Swedes typically view their Viking heritage with pride, celebrating their history and achievements.'
          }
        ]
      }
    }
  ]
};

// Helper functions
export const getCulturalCategories = () => {
  return Object.keys(CULTURAL_CATEGORIES).map(key => ({
    id: key,
    ...CULTURAL_CATEGORIES[key]
  }));
};

export const getCulturalLessons = (category = null) => {
  if (category) {
    return CULTURAL_LESSONS[category] || [];
  }
  return Object.values(CULTURAL_LESSONS).flat();
};

export const getCulturalLesson = (lessonId) => {
  for (const category of Object.values(CULTURAL_LESSONS)) {
    const lesson = category.find(l => l.id === lessonId);
    if (lesson) return lesson;
  }
  return null;
};

export const getCulturalProgress = (userProgress = {}) => {
  const categories = getCulturalCategories();
  const totalLessons = getCulturalLessons().length;
  const completedLessons = Object.keys(userProgress).length;
  
  return {
    totalLessons,
    completedLessons,
    progress: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
    categories: categories.map(category => {
      const categoryLessons = CULTURAL_LESSONS[category.id] || [];
      const categoryCompleted = categoryLessons.filter(lesson => 
        userProgress[lesson.id]
      ).length;
      
      return {
        ...category,
        totalLessons: categoryLessons.length,
        completedLessons: categoryCompleted,
        progress: categoryLessons.length > 0 ? Math.round((categoryCompleted / categoryLessons.length) * 100) : 0
      };
    })
  };
}; 