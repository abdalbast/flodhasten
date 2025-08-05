import React, { useState, useMemo, useCallback } from 'react';
import { FaPlay, FaVolumeUp, FaBook, FaStar, FaTrophy, FaCheck, FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { 
  CULTURAL_CATEGORIES, 
  CULTURAL_LESSONS, 
  getCulturalCategories, 
  getCulturalLessons, 
  getCulturalLesson,
  getCulturalProgress 
} from '../data/culturalLessons';

const CulturalIntegration = React.memo(({ userProgress = {}, onLessonComplete, isDarkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [currentVocabularyIndex, setCurrentVocabularyIndex] = useState(0);
  const [showPronunciation, setShowPronunciation] = useState({});

  const categories = useMemo(() => getCulturalCategories(), []);
  const lessons = useMemo(() => getCulturalLessons(selectedCategory === 'all' ? null : selectedCategory), [selectedCategory]);
  const progress = useMemo(() => getCulturalProgress(userProgress), [userProgress]);

  const textColor = isDarkMode ? '#f5f5f5' : '#2c3e50';
  const cardBackground = isDarkMode ? '#3d3d3d' : '#ffffff';
  const borderColor = isDarkMode ? '#555555' : '#e8f4f8';
  const accentColor = isDarkMode ? '#3498db' : '#3498db';
  const successColor = isDarkMode ? '#27ae60' : '#27ae60';
  const warningColor = isDarkMode ? '#f39c12' : '#f39c12';

  // Play Swedish pronunciation
  const playSwedishPronunciation = useCallback((text) => {
    if ('speechSynthesis' in window) {
      const voices = speechSynthesis.getVoices();
      
      // Find Alva (sv-SE) voice specifically
      let selectedVoice = voices.find(voice => 
        voice.name === 'Alva' && voice.lang === 'sv-SE'
      );
      
      // Second priority: Any sv-SE voice (but not Alva)
      if (!selectedVoice) {
        selectedVoice = voices.find(voice => 
          voice.lang === 'sv-SE' && voice.name !== 'Alva'
        );
      }
      
      // Third priority: Nordic voices
      if (!selectedVoice) {
        selectedVoice = voices.find(voice => 
          ['sv-FI', 'sv-NO', 'da-DK', 'nb-NO'].includes(voice.lang)
        );
      }
      
      // Only play if we have a Swedish or Nordic voice
      if (selectedVoice && (selectedVoice.lang === 'sv-SE' || selectedVoice.lang.startsWith('sv') || selectedVoice.lang.startsWith('da') || selectedVoice.lang.startsWith('nb'))) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = selectedVoice;
        utterance.rate = 0.8;
        utterance.lang = selectedVoice.lang;
        speechSynthesis.speak(utterance);
      } else {
        console.log('No suitable Swedish voice available. Alva (sv-SE) not found.');
      }
    }
  }, []);

  // Handle quiz answer selection
  const handleQuizAnswer = useCallback((answerIndex) => {
    setQuizAnswers(prev => ({
      ...prev,
      [currentQuizIndex]: answerIndex
    }));
  }, [currentQuizIndex]);

  // Submit quiz
  const handleSubmitQuiz = useCallback(() => {
    if (selectedLesson) {
      const quiz = selectedLesson.content.quiz;
      const correctAnswers = quiz.filter((q, index) => 
        quizAnswers[index] === q.correct
      ).length;
      
      const score = Math.round((correctAnswers / quiz.length) * 100);
      
      // Mark lesson as completed if score is good enough
      if (score >= 70 && onLessonComplete) {
        onLessonComplete(selectedLesson.id, score);
      }
      
      setShowQuizResults(true);
    }
  }, [selectedLesson, quizAnswers, onLessonComplete]);

  // Reset lesson
  const handleResetLesson = useCallback(() => {
    setSelectedLesson(null);
    setCurrentQuizIndex(0);
    setQuizAnswers({});
    setShowQuizResults(false);
    setCurrentVocabularyIndex(0);
    setShowPronunciation({});
  }, []);

  // Get quiz results
  const getQuizResults = useMemo(() => {
    if (!selectedLesson) return null;
    
    const quiz = selectedLesson.content.quiz;
    const correctAnswers = quiz.filter((q, index) => 
      quizAnswers[index] === q.correct
    ).length;
    
    return {
      total: quiz.length,
      correct: correctAnswers,
      score: Math.round((correctAnswers / quiz.length) * 100),
      isPassed: (correctAnswers / quiz.length) >= 0.7
    };
  }, [selectedLesson, quizAnswers]);

  if (selectedLesson) {
    const lesson = selectedLesson;
    const quiz = lesson.content.quiz;
    const vocabulary = lesson.content.vocabulary;
    const results = getQuizResults;

    return (
      <div style={{
        padding: '1rem',
        maxWidth: '1000px',
        margin: '0 auto',
        color: textColor
      }}>
        {/* Lesson Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <button
            onClick={handleResetLesson}
            style={{
              background: 'none',
              border: 'none',
              color: accentColor,
              cursor: 'pointer',
              fontSize: '1.5rem',
              padding: '0.5rem'
            }}
          >
            <FaArrowLeft />
          </button>
          <div>
            <h1 style={{
              margin: '0',
              fontFamily: '"Georgia", serif',
              color: accentColor
            }}>
              {lesson.title}
            </h1>
            <p style={{
              margin: '0',
              opacity: 0.8,
              fontFamily: '"Georgia", serif'
            }}>
              {lesson.subtitle} • {lesson.difficulty}
            </p>
          </div>
        </div>

        {/* Lesson Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Overview */}
          <div style={{
            background: cardBackground,
            border: `2px solid ${borderColor}`,
            borderRadius: '15px',
            padding: '1.5rem'
          }}>
            <h2 style={{
              margin: '0 0 1rem 0',
              fontFamily: '"Georgia", serif',
              color: accentColor
            }}>
              📖 Overview
            </h2>
            <p style={{
              margin: '0',
              fontFamily: '"Georgia", serif',
              lineHeight: '1.6'
            }}>
              {lesson.content.overview}
            </p>
          </div>

          {/* Cultural Insights */}
          <div style={{
            background: cardBackground,
            border: `2px solid ${borderColor}`,
            borderRadius: '15px',
            padding: '1.5rem'
          }}>
            <h2 style={{
              margin: '0 0 1rem 0',
              fontFamily: '"Georgia", serif',
              color: accentColor
            }}>
              🎯 Cultural Insights
            </h2>
            <ul style={{
              margin: '0',
              paddingLeft: '1.5rem',
              fontFamily: '"Georgia", serif'
            }}>
              {lesson.content.cultural_insights.map((insight, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>
                  {insight}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Vocabulary Section */}
        <div style={{
          background: cardBackground,
          border: `2px solid ${borderColor}`,
          borderRadius: '15px',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            margin: '0 0 1rem 0',
            fontFamily: '"Georgia", serif',
            color: accentColor
          }}>
            📚 Vocabulary
          </h2>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <button
              onClick={() => setCurrentVocabularyIndex(prev => Math.max(0, prev - 1))}
              disabled={currentVocabularyIndex === 0}
              style={{
                background: 'none',
                border: 'none',
                color: accentColor,
                cursor: 'pointer',
                fontSize: '1.2rem',
                opacity: currentVocabularyIndex === 0 ? 0.5 : 1
              }}
            >
              <FaArrowLeft />
            </button>
            
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                fontFamily: '"Georgia", serif'
              }}>
                {vocabulary[currentVocabularyIndex]?.swedish}
              </div>
              <div style={{
                fontSize: '1.1rem',
                opacity: 0.8,
                marginBottom: '0.5rem',
                fontFamily: '"Georgia", serif'
              }}>
                {vocabulary[currentVocabularyIndex]?.english}
              </div>
              <div style={{
                fontSize: '0.9rem',
                opacity: 0.6,
                fontFamily: '"Georgia", serif'
              }}>
                {vocabulary[currentVocabularyIndex]?.pronunciation}
              </div>
            </div>
            
            <button
              onClick={() => playSwedishPronunciation(vocabulary[currentVocabularyIndex]?.swedish)}
              style={{
                background: accentColor,
                border: 'none',
                color: '#fff',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FaVolumeUp />
            </button>
            
            <button
              onClick={() => setCurrentVocabularyIndex(prev => Math.min(vocabulary.length - 1, prev + 1))}
              disabled={currentVocabularyIndex === vocabulary.length - 1}
              style={{
                background: 'none',
                border: 'none',
                color: accentColor,
                cursor: 'pointer',
                fontSize: '1.2rem',
                opacity: currentVocabularyIndex === vocabulary.length - 1 ? 0.5 : 1
              }}
            >
              <FaArrowRight />
            </button>
          </div>
          
          <div style={{
            textAlign: 'center',
            fontSize: '0.9rem',
            opacity: 0.7,
            fontFamily: '"Georgia", serif'
          }}>
            {currentVocabularyIndex + 1} of {vocabulary.length}
          </div>
        </div>

        {/* Traditions Section */}
        <div style={{
          background: cardBackground,
          border: `2px solid ${borderColor}`,
          borderRadius: '15px',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            margin: '0 0 1rem 0',
            fontFamily: '"Georgia", serif',
            color: accentColor
          }}>
            🎭 Traditions
          </h2>
          <ul style={{
            margin: '0',
            paddingLeft: '1.5rem',
            fontFamily: '"Georgia", serif'
          }}>
            {lesson.content.traditions.map((tradition, index) => (
              <li key={index} style={{ marginBottom: '0.5rem' }}>
                {tradition}
              </li>
            ))}
          </ul>
        </div>

        {/* Quiz Section */}
        {!showQuizResults ? (
          <div style={{
            background: cardBackground,
            border: `2px solid ${borderColor}`,
            borderRadius: '15px',
            padding: '1.5rem'
          }}>
            <h2 style={{
              margin: '0 0 1rem 0',
              fontFamily: '"Georgia", serif',
              color: accentColor
            }}>
              🧠 Quiz: {currentQuizIndex + 1} of {quiz.length}
            </h2>
            
            <div style={{
              marginBottom: '1.5rem'
            }}>
              <h3 style={{
                margin: '0 0 1rem 0',
                fontFamily: '"Georgia", serif'
              }}>
                {quiz[currentQuizIndex]?.question}
              </h3>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                {quiz[currentQuizIndex]?.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuizAnswer(index)}
                    style={{
                      background: quizAnswers[currentQuizIndex] === index ? accentColor : 'transparent',
                      color: quizAnswers[currentQuizIndex] === index ? '#fff' : textColor,
                      border: `2px solid ${quizAnswers[currentQuizIndex] === index ? accentColor : borderColor}`,
                      borderRadius: '10px',
                      padding: '1rem',
                      cursor: 'pointer',
                      fontFamily: '"Georgia", serif',
                      textAlign: 'left',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{
                fontSize: '0.9rem',
                opacity: 0.7,
                fontFamily: '"Georgia", serif'
              }}>
                {Object.keys(quizAnswers).length} of {quiz.length} answered
              </div>
              
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(quizAnswers).length < quiz.length}
                style={{
                  background: Object.keys(quizAnswers).length < quiz.length ? borderColor : successColor,
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '0.8rem 1.5rem',
                  cursor: Object.keys(quizAnswers).length < quiz.length ? 'not-allowed' : 'pointer',
                  fontFamily: '"Georgia", serif',
                  fontSize: '0.9rem'
                }}
              >
                Submit Quiz
              </button>
            </div>
          </div>
        ) : (
          /* Quiz Results */
          <div style={{
            background: cardBackground,
            border: `2px solid ${results?.isPassed ? successColor : warningColor}`,
            borderRadius: '15px',
            padding: '1.5rem'
          }}>
            <h2 style={{
              margin: '0 0 1rem 0',
              fontFamily: '"Georgia", serif',
              color: results?.isPassed ? successColor : warningColor
            }}>
              {results?.isPassed ? '🎉 Congratulations!' : '📚 Keep Learning!'}
            </h2>
            
            <div style={{
              textAlign: 'center',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>
                {results?.score}%
              </div>
              <div style={{
                fontFamily: '"Georgia", serif',
                marginBottom: '1rem'
              }}>
                You got {results?.correct} out of {results?.total} questions correct
              </div>
              {results?.isPassed ? (
                <div style={{
                  color: successColor,
                  fontFamily: '"Georgia", serif',
                  fontWeight: 'bold'
                }}>
                  Lesson completed! 🏆
                </div>
              ) : (
                <div style={{
                  color: warningColor,
                  fontFamily: '"Georgia", serif'
                }}>
                  Try again to complete the lesson
                </div>
              )}
            </div>
            
            <button
              onClick={handleResetLesson}
              style={{
                background: accentColor,
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                padding: '0.8rem 1.5rem',
                cursor: 'pointer',
                fontFamily: '"Georgia", serif',
                fontSize: '0.9rem'
              }}
            >
              Back to Cultural Lessons
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{
      padding: '1rem',
      maxWidth: '1200px',
      margin: '0 auto',
      color: textColor
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          margin: '0 0 0.5rem 0',
          fontFamily: '"Georgia", serif',
          color: accentColor
        }}>
          🌍 Cultural Integration
        </h1>
        <p style={{
          fontSize: '1.1rem',
          margin: '0',
          opacity: 0.8,
          fontFamily: '"Georgia", serif'
        }}>
          Learn about Swedish culture, traditions, and values
        </p>
      </div>

      {/* Progress Overview */}
      <div style={{
        background: cardBackground,
        border: `2px solid ${borderColor}`,
        borderRadius: '15px',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{
          margin: '0 0 1rem 0',
          fontFamily: '"Georgia", serif',
          color: accentColor
        }}>
          📊 Your Progress
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', color: accentColor }}>
              {progress.completedLessons}/{progress.totalLessons}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Lessons Completed</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', color: successColor }}>
              {progress.progress}%
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Overall Progress</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', color: warningColor }}>
              {categories.length}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Categories</div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div style={{
        marginBottom: '2rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setSelectedCategory('all')}
            style={{
              background: selectedCategory === 'all' ? accentColor : cardBackground,
              color: selectedCategory === 'all' ? '#fff' : textColor,
              border: `2px solid ${selectedCategory === 'all' ? accentColor : borderColor}`,
              borderRadius: '25px',
              padding: '0.8rem 1.5rem',
              cursor: 'pointer',
              fontFamily: '"Georgia", serif',
              fontSize: '0.9rem'
            }}
          >
            All Categories
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              style={{
                background: selectedCategory === category.id ? accentColor : cardBackground,
                color: selectedCategory === category.id ? '#fff' : textColor,
                border: `2px solid ${selectedCategory === category.id ? accentColor : borderColor}`,
                borderRadius: '25px',
                padding: '0.8rem 1.5rem',
                cursor: 'pointer',
                fontFamily: '"Georgia", serif',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Category Progress */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {categories.map(category => {
          const categoryProgress = progress.categories.find(c => c.id === category.id);
          return (
            <div
              key={category.id}
              style={{
                background: cardBackground,
                border: `2px solid ${borderColor}`,
                borderRadius: '15px',
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => setSelectedCategory(category.id)}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{ fontSize: '2rem' }}>
                  {category.icon}
                </div>
                <div>
                  <h3 style={{
                    margin: '0',
                    fontFamily: '"Georgia", serif'
                  }}>
                    {category.name}
                  </h3>
                  <p style={{
                    margin: '0',
                    fontSize: '0.9rem',
                    opacity: 0.7,
                    fontFamily: '"Georgia", serif'
                  }}>
                    {category.description}
                  </p>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <div style={{
                  fontSize: '0.9rem',
                  opacity: 0.7,
                  fontFamily: '"Georgia", serif'
                }}>
                  {categoryProgress?.completedLessons}/{categoryProgress?.totalLessons} lessons
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: accentColor,
                  fontFamily: '"Georgia", serif'
                }}>
                  {categoryProgress?.progress}%
                </div>
              </div>
              
              <div style={{
                background: borderColor,
                borderRadius: '10px',
                height: '8px',
                overflow: 'hidden'
              }}>
                <div style={{
                  background: accentColor,
                  height: '100%',
                  width: `${categoryProgress?.progress || 0}%`,
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Lessons Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '1.5rem'
      }}>
        {lessons.map(lesson => {
          const isCompleted = userProgress[lesson.id];
          return (
            <div
              key={lesson.id}
              style={{
                background: cardBackground,
                border: `2px solid ${isCompleted ? successColor : borderColor}`,
                borderRadius: '15px',
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              onClick={() => setSelectedLesson(lesson)}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              {isCompleted && (
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  color: successColor,
                  fontSize: '1.5rem'
                }}>
                  <FaCheck />
                </div>
              )}
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  background: isCompleted ? successColor : accentColor,
                  color: '#fff',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem'
                }}>
                  {isCompleted ? <FaCheck /> : <FaBook />}
                </div>
                <div>
                  <h3 style={{
                    margin: '0',
                    fontFamily: '"Georgia", serif'
                  }}>
                    {lesson.title}
                  </h3>
                  <p style={{
                    margin: '0',
                    fontSize: '0.9rem',
                    opacity: 0.7,
                    fontFamily: '"Georgia", serif'
                  }}>
                    {lesson.subtitle} • {lesson.difficulty}
                  </p>
                </div>
              </div>
              
              <p style={{
                margin: '0',
                fontSize: '0.9rem',
                lineHeight: '1.5',
                fontFamily: '"Georgia", serif'
              }}>
                {lesson.content.overview.substring(0, 100)}...
              </p>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '1rem'
              }}>
                <div style={{
                  fontSize: '0.8rem',
                  opacity: 0.7,
                  fontFamily: '"Georgia", serif'
                }}>
                  {lesson.content.vocabulary.length} words • {lesson.content.quiz.length} questions
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: isCompleted ? successColor : accentColor,
                  fontFamily: '"Georgia", serif'
                }}>
                  {isCompleted ? 'Completed' : 'Start Lesson'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default CulturalIntegration; 