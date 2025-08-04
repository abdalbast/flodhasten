import React, { useState, useEffect } from 'react';
import { MdVolumeUp } from 'react-icons/md';
import ttsApi from '../utils/ttsApi';

const STORIES = [
  {
    id: 'lesson1',
    title: 'Hej!',
    level: 'beginner',
    description: 'Learn basic greetings and polite expressions',
    story: [
      {
        text: 'Kvinnan läser en tidning.',
        translation: 'Hello!',
        vocabulary: ['hej'],
        image: '👋'
      },
      {
        text: 'Hej!',
        translation: 'Hello!',
        vocabulary: ['hej'],
        image: '👋'
      },
      {
        text: 'Tack!',
        translation: 'Thank you!',
        vocabulary: ['tack'],
        image: '🙏'
      },
      {
        text: 'Hej då!',
        translation: 'Goodbye!',
        vocabulary: ['hej då'],
        image: '👋'
      }
    ]
  },
  {
    id: 'lesson2',
    title: 'Vi är vänner',
    level: 'beginner',
    description: 'Learn about people and pronouns',
    story: [
      {
        text: 'Jag är Anna.',
        translation: 'I am Anna.',
        vocabulary: ['jag', 'är'],
        image: '👩'
      },
      {
        text: 'Jag är Erik.',
        translation: 'I am Erik.',
        vocabulary: ['jag', 'är'],
        image: '👨'
      },
      {
        text: 'Du är snäll.',
        translation: 'You are kind.',
        vocabulary: ['du', 'är', 'snäll'],
        image: '😊'
      },
      {
        text: 'Vi är vänner.',
        translation: 'We are friends.',
        vocabulary: ['vi', 'är', 'vänner'],
        image: '👥'
      }
    ]
  },
  {
    id: 'lesson3',
    title: 'Vill du ha kaffe?',
    level: 'beginner',
    description: 'Learn about food and drinks',
    story: [
      {
        text: 'Vill du ha kaffe?',
        translation: 'Do you want coffee?',
        vocabulary: ['vill', 'du', 'ha', 'kaffe'],
        image: '☕'
      },
      {
        text: 'Nej tack, jag vill ha te.',
        translation: 'No thank you, I want tea.',
        vocabulary: ['nej', 'tack', 'jag', 'vill', 'ha', 'te'],
        image: '🫖'
      },
      {
        text: 'Okej.',
        translation: 'Okay.',
        vocabulary: ['okej'],
        image: '👍'
      },
      {
        text: 'Vill du ha bröd?',
        translation: 'Do you want bread?',
        vocabulary: ['vill', 'du', 'ha', 'bröd'],
        image: '🍞'
      }
    ]
  },
  {
    id: 'lesson4',
    title: 'Min mamma',
    level: 'beginner',
    description: 'Learn about family members',
    story: [
      {
        text: 'Det här är min mamma.',
        translation: 'This is my mum.',
        vocabulary: ['det', 'här', 'är', 'min', 'mamma'],
        image: '👩'
      },
      {
        text: 'Hej mamma!',
        translation: 'Hello mum!',
        vocabulary: ['hej', 'mamma'],
        image: '👋'
      },
      {
        text: 'Min bror heter Leo.',
        translation: 'My brother is called Leo.',
        vocabulary: ['min', 'bror', 'heter'],
        image: '👦'
      }
    ]
  },
  {
    id: 'lesson5',
    title: 'Fem barn',
    level: 'beginner',
    description: 'Learn numbers and counting',
    story: [
      {
        text: 'Jag har fem barn!',
        translation: 'I have five children!',
        vocabulary: ['jag', 'har', 'fem', 'barn'],
        image: '👨‍👩‍👧‍👦'
      },
      {
        text: 'Fem? Jag har tre.',
        translation: 'Five? I have three.',
        vocabulary: ['fem', 'jag', 'har', 'tre'],
        image: '👨‍👩‍👦'
      },
      {
        text: 'Ett, två, tre, fyra, fem!',
        translation: 'One, two, three, four, five!',
        vocabulary: ['ett', 'två', 'tre', 'fyra', 'fem'],
        image: '12345'
      }
    ]
  },
  {
    id: 'lesson6',
    title: 'Vill du ha ost?',
    level: 'beginner',
    description: 'Learn more food vocabulary',
    story: [
      {
        text: 'Vad vill du äta?',
        translation: 'What do you want to eat?',
        vocabulary: ['vad', 'vill', 'du', 'äta'],
        image: '🍽️'
      },
      {
        text: 'Äpple och ost.',
        translation: 'Apple and cheese.',
        vocabulary: ['äpple', 'och', 'ost'],
        image: '🍎🧀'
      },
      {
        text: 'Vill du ha fisk?',
        translation: 'Do you want fish?',
        vocabulary: ['vill', 'du', 'ha', 'fisk'],
        image: '🐟'
      },
      {
        text: 'Nej tack.',
        translation: 'No thank you.',
        vocabulary: ['nej', 'tack'],
        image: '🙅‍♂️'
      }
    ]
  },
  {
    id: 'lesson7',
    title: 'När då?',
    level: 'beginner',
    description: 'Learn about time and days',
    story: [
      {
        text: 'Vi ses idag!',
        translation: 'See you today!',
        vocabulary: ['vi', 'ses', 'idag'],
        image: '📅'
      },
      {
        text: 'Nej, imorgon.',
        translation: 'No, tomorrow.',
        vocabulary: ['nej', 'imorgon'],
        image: '📅'
      },
      {
        text: 'Inte nu?',
        translation: 'Not now?',
        vocabulary: ['inte', 'nu'],
        image: '⏰'
      },
      {
        text: 'Nej, sen.',
        translation: 'No, later.',
        vocabulary: ['nej', 'sen'],
        image: '⏰'
      }
    ]
  },
  {
    id: 'lesson8',
    title: 'Jag går till skolan',
    level: 'beginner',
    description: 'Learn about places and locations',
    story: [
      {
        text: 'Vart går du?',
        translation: 'Where are you going?',
        vocabulary: ['vart', 'går', 'du'],
        image: '🚶‍♂️'
      },
      {
        text: 'Till skolan.',
        translation: 'To school.',
        vocabulary: ['till', 'skolan'],
        image: '🏫'
      },
      {
        text: 'Jag går hem.',
        translation: 'I am going home.',
        vocabulary: ['jag', 'går', 'hem'],
        image: '🏠'
      },
      {
        text: 'Vi ses i parken!',
        translation: 'See you in the park!',
        vocabulary: ['vi', 'ses', 'i', 'parken'],
        image: '🌳'
      }
    ]
  },
  {
    id: 'lesson9',
    title: 'Pratar du?',
    level: 'beginner',
    description: 'Learn basic verbs and actions',
    story: [
      {
        text: 'Jag pratar med mamma.',
        translation: 'I am talking with mum.',
        vocabulary: ['jag', 'pratar', 'med', 'mamma'],
        image: '💬'
      },
      {
        text: 'Jag hör dig inte.',
        translation: 'I cannot hear you.',
        vocabulary: ['jag', 'hör', 'dig', 'inte'],
        image: '👂'
      },
      {
        text: 'Kom!',
        translation: 'Come!',
        vocabulary: ['kom'],
        image: '👋'
      },
      {
        text: 'Okej, jag går.',
        translation: 'Okay, I am going.',
        vocabulary: ['okej', 'jag', 'går'],
        image: '🚶‍♂️'
      }
    ]
  },
  {
    id: 'lesson10',
    title: 'Hur mår du?',
    level: 'beginner',
    description: 'Learn about emotions and feelings',
    story: [
      {
        text: 'Hur mår du idag?',
        translation: 'How are you today?',
        vocabulary: ['hur', 'mår', 'du', 'idag'],
        image: '😊'
      },
      {
        text: 'Jag är trött och lite ledsen.',
        translation: 'I am tired and a little sad.',
        vocabulary: ['jag', 'är', 'trött', 'och', 'lite', 'ledsen'],
        image: '😴😢'
      },
      {
        text: 'Jag är glad men också lite rädd.',
        translation: 'I am happy but also a little scared.',
        vocabulary: ['jag', 'är', 'glad', 'men', 'också', 'lite', 'rädd'],
        image: '😊😨'
      },
      {
        text: 'Varför?',
        translation: 'Why?',
        vocabulary: ['varför'],
        image: '❓'
      },
      {
        text: 'Mamma är arg…',
        translation: 'Mum is angry…',
        vocabulary: ['mamma', 'är', 'arg'],
        image: '😠'
      }
    ]
  },
  {
    id: 'lesson11',
    title: 'Vilken färg?',
    level: 'beginner',
    description: 'Learn about colours and descriptions',
    story: [
      {
        text: 'Vilken färg är din bil?',
        translation: 'What colour is your car?',
        vocabulary: ['vilken', 'färg', 'är', 'din', 'bil'],
        image: '🚗'
      },
      {
        text: 'Den är blå. Och din?',
        translation: 'It is blue. And yours?',
        vocabulary: ['den', 'är', 'blå', 'och', 'din'],
        image: '🔵'
      },
      {
        text: 'Min är röd.',
        translation: 'Mine is red.',
        vocabulary: ['min', 'är', 'röd'],
        image: '🔴'
      },
      {
        text: 'Jag gillar svart och vitt också.',
        translation: 'I like black and white too.',
        vocabulary: ['jag', 'gillar', 'svart', 'och', 'vitt', 'också'],
        image: '⚫⚪'
      },
      {
        text: 'Jag gillar grön.',
        translation: 'I like green.',
        vocabulary: ['jag', 'gillar', 'grön'],
        image: '🟢'
      }
    ]
  },
  {
    id: 'lesson12',
    title: 'Det snöar!',
    level: 'beginner',
    description: 'Learn about weather and nature',
    story: [
      {
        text: 'Hur är vädret idag?',
        translation: 'How is the weather today?',
        vocabulary: ['hur', 'är', 'vädret', 'idag'],
        image: '🌤️'
      },
      {
        text: 'Det snöar och blåser!',
        translation: 'It is snowing and windy!',
        vocabulary: ['det', 'snöar', 'och', 'blåser'],
        image: '❄️💨'
      },
      {
        text: 'Igår var det sol och regn.',
        translation: 'Yesterday it was sunny and rain.',
        vocabulary: ['igår', 'var', 'det', 'sol', 'och', 'regn'],
        image: '☀️🌧️'
      },
      {
        text: 'Svenskt väder är galet!',
        translation: 'Swedish weather is crazy!',
        vocabulary: ['svenskt', 'väder', 'är', 'galet'],
        image: '😵'
      },
      {
        text: 'Haha, ja.',
        translation: 'Haha, yes.',
        vocabulary: ['haha', 'ja'],
        image: '😄'
      }
    ]
  }
];

function StoryMode({ isDarkMode }) {
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedStories, setCompletedStories] = useState(() => {
    const saved = localStorage.getItem('completedStories');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('completedStories', JSON.stringify(completedStories));
  }, [completedStories]);

  const handleStoryComplete = (storyId) => {
    if (!completedStories.includes(storyId)) {
      setCompletedStories(prev => [...prev, storyId]);
    }
  };

  const resetStory = () => {
    setSelectedStory(null);
    setCurrentPage(0);
    setShowTranslation(false);
    setIsPlaying(false);
  };

  const nextPage = () => {
    if (currentPage < selectedStory.story.length - 1) {
      setCurrentPage(currentPage + 1);
      setShowTranslation(false);
      setIsPlaying(false);
    } else {
      handleStoryComplete(selectedStory.id);
      resetStory();
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setShowTranslation(false);
      setIsPlaying(false);
    }
  };

  const playSwedishText = async (text) => {
    try {
      setIsPlaying(true);
      await ttsApi.playSwedish(text);
    } catch (error) {
      console.error('Failed to play Swedish text:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  if (selectedStory) {
    const currentStoryPage = selectedStory.story[currentPage];
    const isLastPage = currentPage === selectedStory.story.length - 1;

    return (
      <div style={{
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        {/* Story Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem',
          padding: '1rem',
          background: isDarkMode ? '#2d2d2d' : '#f5f5f5',
          borderRadius: '12px',
          border: isDarkMode ? '1px solid #444' : '1px solid #ddd'
        }}>
          <h2 style={{
            color: isDarkMode ? '#fff' : '#333',
            marginBottom: '0.5rem',
            fontSize: '1.8rem'
          }}>
            {selectedStory.title}
          </h2>
          <p style={{
            color: isDarkMode ? '#ccc' : '#666',
            fontSize: '0.9rem'
          }}>
            Page {currentPage + 1} of {selectedStory.story.length}
          </p>
        </div>

        {/* Story Content */}
        <div style={{
          background: isDarkMode ? '#1a1a1a' : '#fff',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: isDarkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.1)',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          {/* Story Image */}
          <div style={{
            fontSize: '4rem',
            marginBottom: '1.5rem'
          }}>
            {currentStoryPage.image}
          </div>

          {/* Swedish Text with Play Button */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: isDarkMode ? '#fff' : '#333',
              lineHeight: '1.4'
            }}>
              {currentStoryPage.text}
            </div>
            
            {/* Play Button */}
            <button
              onClick={() => playSwedishText(currentStoryPage.text)}
              disabled={isPlaying}
              style={{
                background: isPlaying 
                  ? (isDarkMode ? '#666' : '#ccc')
                  : (isDarkMode ? '#2193b0' : '#4CAF50'),
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: isPlaying ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: isDarkMode 
                  ? '0 2px 8px rgba(0,0,0,0.3)' 
                  : '0 2px 8px rgba(0,0,0,0.2)'
              }}
              onMouseEnter={(e) => {
                if (!isPlaying) {
                  e.target.style.transform = 'scale(1.1)';
                  e.target.style.boxShadow = isDarkMode 
                    ? '0 4px 12px rgba(0,0,0,0.4)' 
                    : '0 4px 12px rgba(0,0,0,0.3)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = isDarkMode 
                  ? '0 2px 8px rgba(0,0,0,0.3)' 
                  : '0 2px 8px rgba(0,0,0,0.2)';
              }}
            >
              <MdVolumeUp style={{ 
                fontSize: '24px',
                animation: isPlaying ? 'pulse 1s infinite' : 'none'
              }} />
            </button>
          </div>

          {/* Translation Toggle */}
          <button
            onClick={() => setShowTranslation(!showTranslation)}
            style={{
              background: isDarkMode ? '#2193b0' : '#4CAF50',
              color: '#fff',
              border: 'none',
              padding: '0.8rem 1.5rem',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
              marginBottom: '1rem',
              fontWeight: 'bold'
            }}
          >
            {showTranslation ? 'Hide Translation' : 'Show Translation'}
          </button>

          {/* English Translation */}
          {showTranslation && (
            <div style={{
              fontSize: '1.2rem',
              color: isDarkMode ? '#ccc' : '#666',
              marginBottom: '1.5rem',
              fontStyle: 'italic'
            }}>
              {currentStoryPage.translation}
            </div>
          )}

          {/* Vocabulary */}
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: isDarkMode ? '#2d2d2d' : '#f9f9f9',
            borderRadius: '8px'
          }}>
            <h4 style={{
              color: isDarkMode ? '#fff' : '#333',
              marginBottom: '0.5rem',
              fontSize: '1rem'
            }}>
              Key Vocabulary:
            </h4>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              justifyContent: 'center'
            }}>
              {currentStoryPage.vocabulary.map((word, index) => (
                <span
                  key={index}
                  style={{
                    background: isDarkMode ? '#2193b0' : '#e3f2fd',
                    color: isDarkMode ? '#fff' : '#1976d2',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold'
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1rem'
        }}>
          <button
            onClick={resetStory}
            style={{
              background: isDarkMode ? '#666' : '#f0f0f0',
              color: isDarkMode ? '#fff' : '#333',
              border: 'none',
              padding: '0.8rem 1.5rem',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            ← Back to Stories
          </button>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {currentPage > 0 && (
              <button
                onClick={previousPage}
                style={{
                  background: isDarkMode ? '#555' : '#e0e0e0',
                  color: isDarkMode ? '#fff' : '#333',
                  border: 'none',
                  padding: '0.8rem 1.5rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                ← Previous
              </button>
            )}
            
            <button
              onClick={nextPage}
              style={{
                background: isDarkMode ? '#4CAF50' : '#4CAF50',
                color: '#fff',
                border: 'none',
                padding: '0.8rem 1.5rem',
                borderRadius: '8px',
                fontSize: '1rem',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              {isLastPage ? 'Complete Story' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h1 style={{
          color: isDarkMode ? '#fff' : '#333',
          fontSize: '2.5rem',
          marginBottom: '1rem'
        }}>
          📚 Story Mode
        </h1>
        <p style={{
          color: isDarkMode ? '#ccc' : '#666',
          fontSize: '1.1rem',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Learn Swedish through interactive stories. Each story introduces new vocabulary in context, making learning more engaging and memorable.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2rem',
        marginTop: '2rem'
      }}>
        {STORIES.map((story) => (
          <div
            key={story.id}
            style={{
              background: isDarkMode ? '#1a1a1a' : '#fff',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: isDarkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.1)',
              border: completedStories.includes(story.id) 
                ? (isDarkMode ? '2px solid #4CAF50' : '2px solid #4CAF50')
                : (isDarkMode ? '1px solid #444' : '1px solid #ddd'),
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              position: 'relative'
            }}
            onClick={() => setSelectedStory(story)}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-4px)';
              e.target.style.boxShadow = isDarkMode 
                ? '0 8px 30px rgba(0,0,0,0.4)' 
                : '0 8px 30px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = isDarkMode 
                ? '0 4px 20px rgba(0,0,0,0.3)' 
                : '0 4px 20px rgba(0,0,0,0.1)';
            }}
          >
            {completedStories.includes(story.id) && (
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: '#4CAF50',
                color: '#fff',
                padding: '0.3rem 0.8rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>
                ✓ Completed
              </div>
            )}

            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              {story.id === 'breakfast' ? '🍳' : story.id === 'park' ? '🌳' : '🍽️'}
            </div>

            <h3 style={{
              color: isDarkMode ? '#fff' : '#333',
              fontSize: '1.5rem',
              marginBottom: '0.5rem',
              textAlign: 'center'
            }}>
              {story.title}
            </h3>

            <p style={{
              color: isDarkMode ? '#ccc' : '#666',
              fontSize: '0.9rem',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              {story.description}
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '1rem'
            }}>
              <span style={{
                background: isDarkMode ? '#2193b0' : '#e3f2fd',
                color: isDarkMode ? '#fff' : '#1976d2',
                padding: '0.3rem 0.8rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>
                {story.level}
              </span>

              <span style={{
                color: isDarkMode ? '#ccc' : '#666',
                fontSize: '0.9rem'
              }}>
                {story.story.length} pages
              </span>
            </div>
          </div>
        ))}
      </div>

      {completedStories.length > 0 && (
        <div style={{
          textAlign: 'center',
          marginTop: '3rem',
          padding: '1.5rem',
          background: isDarkMode ? '#2d2d2d' : '#f5f5f5',
          borderRadius: '12px'
        }}>
          <h3 style={{
            color: isDarkMode ? '#fff' : '#333',
            marginBottom: '0.5rem'
          }}>
            Your Progress
          </h3>
          <p style={{
            color: isDarkMode ? '#ccc' : '#666',
            fontSize: '1.1rem'
          }}>
            You've completed {completedStories.length} of {STORIES.length} stories!
          </p>
        </div>
      )}
    </div>

    {/* CSS Animations */}
    <style>
      {`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}
    </style>
  </div>
  );
}

export default StoryMode; 