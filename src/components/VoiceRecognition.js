import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaMicrophone, FaMicrophoneSlash, FaPlay, FaVolumeUp, FaStar, FaChartLine, FaTrophy } from 'react-icons/fa';
import { 
  analyzePronunciation, 
  getRandomPronunciationWord, 
  getPronunciationStats, 
  PRONUNCIATION_SCORES,
  PRONUNCIATION_LEVELS 
} from '../data/voiceRecognition';

const VoiceRecognition = React.memo(({ userStats, onPronunciationAttempt, isDarkMode }) => {
  const [isListening, setIsListening] = useState(false);
  const [currentWord, setCurrentWord] = useState(null);
  const [spokenText, setSpokenText] = useState('');
  const [pronunciationResult, setPronunciationResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [difficulty, setDifficulty] = useState('all');
  const [recognition, setRecognition] = useState(null);
  const [isSupported, setIsSupported] = useState(false);
  const [stats, setStats] = useState(null);

  const audioRef = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'sv-SE'; // Swedish language
      
      recognitionInstance.onstart = () => {
        setIsListening(true);
      };
      
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSpokenText(transcript);
        
        if (currentWord) {
          const result = analyzePronunciation(transcript, currentWord.word);
          setPronunciationResult(result);
          setShowResult(true);
          
          // Track pronunciation attempt
          if (onPronunciationAttempt) {
            onPronunciationAttempt(result);
          }
        }
      };
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
      setIsSupported(true);
    } else {
      setIsSupported(false);
    }
  }, [currentWord, onPronunciationAttempt]);

  // Load initial word and stats
  useEffect(() => {
    const word = getRandomPronunciationWord(difficulty);
    setCurrentWord(word);
    
    const pronunciationStats = getPronunciationStats(userStats);
    setStats(pronunciationStats);
  }, [difficulty, userStats]);

  // Handle difficulty change
  const handleDifficultyChange = useCallback((newDifficulty) => {
    setDifficulty(newDifficulty);
    const word = getRandomPronunciationWord(newDifficulty);
    setCurrentWord(word);
    setSpokenText('');
    setPronunciationResult(null);
    setShowResult(false);
  }, []);

  // Start listening
  const startListening = useCallback(() => {
    if (recognition && currentWord) {
      setSpokenText('');
      setPronunciationResult(null);
      setShowResult(false);
      recognition.start();
    }
  }, [recognition, currentWord]);

  // Play native pronunciation
  const playNativePronunciation = useCallback(() => {
    if (currentWord) {
      // Get available voices
      const voices = speechSynthesis.getVoices();
      
      // Find Alva (sv-SE) voice specifically
      let selectedVoice = null;
      
      // First priority: Alva (sv-SE)
      selectedVoice = voices.find(voice => 
        voice.name === 'Alva' && voice.lang === 'sv-SE'
      );
      
      // Second priority: Any sv-SE voice (but not Alva)
      if (!selectedVoice) {
        selectedVoice = voices.find(voice => 
          voice.lang === 'sv-SE' && voice.name !== 'Alva'
        );
      }
      
      // Third priority: Nordic voices (sv-FI, sv-NO, da-DK, nb-NO)
      if (!selectedVoice) {
        selectedVoice = voices.find(voice => 
          ['sv-FI', 'sv-NO', 'da-DK', 'nb-NO'].includes(voice.lang)
        );
      }
      
      // Last resort: English voice (but we prefer no audio over wrong language)
      if (!selectedVoice) {
        selectedVoice = voices.find(voice => 
          voice.lang.startsWith('en')
        );
      }
      
      // Only play if we have a Swedish or Nordic voice
      if (selectedVoice && (selectedVoice.lang === 'sv-SE' || selectedVoice.lang.startsWith('sv') || selectedVoice.lang.startsWith('da') || selectedVoice.lang.startsWith('nb'))) {
        const utterance = new SpeechSynthesisUtterance(currentWord.word);
        utterance.voice = selectedVoice;
        utterance.rate = 0.8; // Slightly slower for clarity
        utterance.lang = selectedVoice.lang;
        speechSynthesis.speak(utterance);
      } else {
        // If no suitable Swedish voice is available, don't play anything
        console.log('No suitable Swedish voice available. Alva (sv-SE) not found.');
      }
    }
  }, [currentWord]);

  // Get next word
  const getNextWord = useCallback(() => {
    const word = getRandomPronunciationWord(difficulty);
    setCurrentWord(word);
    setSpokenText('');
    setPronunciationResult(null);
    setShowResult(false);
  }, [difficulty]);

  const textColor = isDarkMode ? '#f5f5f5' : '#2c3e50';
  const cardBackground = isDarkMode ? '#3d3d3d' : '#ffffff';
  const borderColor = isDarkMode ? '#555555' : '#e8f4f8';
  const accentColor = isDarkMode ? '#3498db' : '#3498db';

  if (!isSupported) {
    return (
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        color: textColor
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎤</div>
        <h2 style={{
          margin: '0 0 1rem 0',
          fontFamily: '"Georgia", serif'
        }}>
          Voice Recognition Not Supported
        </h2>
        <p style={{
          margin: '0',
          fontFamily: '"Georgia", serif',
          opacity: 0.8
        }}>
          Your browser doesn't support speech recognition. Try using Chrome or Edge.
        </p>
      </div>
    );
  }

  return (
    <div style={{
      padding: '1rem',
      maxWidth: '800px',
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
          🎤 Voice Recognition
        </h1>
        <p style={{
          fontSize: '1.1rem',
          margin: '0',
          opacity: 0.8,
          fontFamily: '"Georgia", serif'
        }}>
          Practice your Swedish pronunciation with real-time feedback
        </p>
      </div>

      {/* Stats Overview */}
      {stats && (
        <div style={{
          background: cardBackground,
          border: `2px solid ${borderColor}`,
          borderRadius: '20px',
          padding: '1.5rem',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h3 style={{
            margin: '0 0 1rem 0',
            fontFamily: '"Georgia", serif',
            color: accentColor
          }}>
            Your Pronunciation Progress
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <div style={{ fontSize: '2rem' }}>🎯</div>
              <div style={{ fontFamily: '"Georgia", serif', fontSize: '1.2rem' }}>
                {stats.totalAttempts}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Total Attempts</div>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <div style={{ fontSize: '2rem' }}>🌟</div>
              <div style={{ fontFamily: '"Georgia", serif', fontSize: '1.2rem' }}>
                {stats.excellentCount}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Excellent</div>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <div style={{ fontSize: '2rem' }}>📊</div>
              <div style={{ fontFamily: '"Georgia", serif', fontSize: '1.2rem' }}>
                {stats.averageScore}%
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Average Score</div>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <div style={{ fontSize: '2rem' }}>📈</div>
              <div style={{ fontFamily: '"Georgia", serif', fontSize: '1.2rem' }}>
                {stats.progress}%
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Success Rate</div>
            </div>
          </div>
        </div>
      )}

      {/* Difficulty Selector */}
      <div style={{
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          margin: '0 0 1rem 0',
          fontFamily: '"Georgia", serif'
        }}>
          Select Difficulty
        </h3>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          {['all', 'easy', 'medium', 'hard'].map(level => (
            <button
              key={level}
              onClick={() => handleDifficultyChange(level)}
              style={{
                background: difficulty === level ? accentColor : cardBackground,
                color: difficulty === level ? '#fff' : textColor,
                border: `2px solid ${difficulty === level ? accentColor : borderColor}`,
                borderRadius: '25px',
                padding: '0.8rem 1.5rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: '"Georgia", serif',
                fontSize: '0.9rem',
                textTransform: 'capitalize'
              }}
              onMouseEnter={(e) => {
                if (difficulty !== level) {
                  e.target.style.background = isDarkMode ? '#4d4d4d' : '#f0f0f0';
                }
              }}
              onMouseLeave={(e) => {
                if (difficulty !== level) {
                  e.target.style.background = cardBackground;
                }
              }}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Current Word Card */}
      {currentWord && (
        <div style={{
          background: cardBackground,
          border: `2px solid ${borderColor}`,
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h2 style={{
            margin: '0 0 0.5rem 0',
            fontSize: '2.5rem',
            fontFamily: '"Georgia", serif',
            color: accentColor
          }}>
            {currentWord.word}
          </h2>
          <p style={{
            margin: '0 0 1rem 0',
            fontSize: '1.1rem',
            opacity: 0.7,
            fontFamily: '"Georgia", serif'
          }}>
            {currentWord.english}
          </p>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <button
              onClick={playNativePronunciation}
              style={{
                background: accentColor,
                color: '#fff',
                border: 'none',
                borderRadius: '25px',
                padding: '0.8rem 1.5rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: '"Georgia", serif',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
            >
              <FaVolumeUp />
              Listen
            </button>
            
            <button
              onClick={startListening}
              disabled={isListening}
              style={{
                background: isListening ? '#e74c3c' : '#27ae60',
                color: '#fff',
                border: 'none',
                borderRadius: '25px',
                padding: '0.8rem 1.5rem',
                cursor: isListening ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: '"Georgia", serif',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                opacity: isListening ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!isListening) {
                  e.target.style.transform = 'scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
            >
              {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
              {isListening ? 'Listening...' : 'Speak'}
            </button>
          </div>

          {/* Pronunciation Guide */}
          <div style={{
            background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
            borderRadius: '15px',
            padding: '1rem',
            marginTop: '1rem'
          }}>
            <h4 style={{
              margin: '0 0 0.5rem 0',
              fontFamily: '"Georgia", serif',
              color: accentColor
            }}>
              Pronunciation Guide
            </h4>
            <p style={{
              margin: '0 0 0.5rem 0',
              fontFamily: '"Georgia", serif',
              fontSize: '1.1rem'
            }}>
              <strong>Try:</strong> "{currentWord.pronunciation}"
            </p>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.3rem',
              fontSize: '0.9rem',
              opacity: 0.8,
              fontFamily: '"Georgia", serif'
            }}>
              {currentWord.tips.map((tip, index) => (
                <div key={index}>• {tip}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Result Display */}
      {showResult && pronunciationResult && (
        <div style={{
          background: cardBackground,
          border: `3px solid ${PRONUNCIATION_SCORES[pronunciationResult.level].color}`,
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem',
          textAlign: 'center',
          animation: 'resultSlideIn 0.5s ease-out'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '1rem',
            animation: 'resultBounce 0.6s ease-out'
          }}>
            {PRONUNCIATION_SCORES[pronunciationResult.level].emoji}
          </div>
          
          <h3 style={{
            margin: '0 0 0.5rem 0',
            fontSize: '1.5rem',
            fontFamily: '"Georgia", serif',
            color: PRONUNCIATION_SCORES[pronunciationResult.level].color
          }}>
            {pronunciationResult.feedback.message}
          </h3>
          
          <div style={{
            background: PRONUNCIATION_SCORES[pronunciationResult.level].color,
            color: '#fff',
            borderRadius: '15px',
            padding: '0.5rem 1rem',
            display: 'inline-block',
            marginBottom: '1rem',
            fontFamily: '"Georgia", serif',
            fontSize: '1.2rem'
          }}>
            Score: {pronunciationResult.score}%
          </div>
          
          <div style={{
            marginBottom: '1rem',
            fontFamily: '"Georgia", serif'
          }}>
            <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>
              You said: "{spokenText}"
            </p>
            <p style={{ margin: '0', opacity: 0.7 }}>
              Target: "{currentWord.word}"
            </p>
          </div>
          
          {/* Tips */}
          <div style={{
            background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
            borderRadius: '15px',
            padding: '1rem',
            marginBottom: '1rem'
          }}>
            <h4 style={{
              margin: '0 0 0.5rem 0',
              fontFamily: '"Georgia", serif',
              color: accentColor
            }}>
              Tips for Improvement
            </h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.3rem',
              fontSize: '0.9rem',
              fontFamily: '"Georgia", serif'
            }}>
              {pronunciationResult.feedback.tips.map((tip, index) => (
                <div key={index}>• {tip}</div>
              ))}
            </div>
          </div>
          
          {/* Suggestions */}
          {pronunciationResult.suggestions.length > 0 && (
            <div style={{
              background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
              borderRadius: '15px',
              padding: '1rem',
              marginBottom: '1rem'
            }}>
              <h4 style={{
                margin: '0 0 0.5rem 0',
                fontFamily: '"Georgia", serif',
                color: accentColor
              }}>
                Suggestions
              </h4>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.3rem',
                fontSize: '0.9rem',
                fontFamily: '"Georgia", serif'
              }}>
                {pronunciationResult.suggestions.map((suggestion, index) => (
                  <div key={index}>• {suggestion}</div>
                ))}
              </div>
            </div>
          )}
          
          <button
            onClick={getNextWord}
            style={{
              background: accentColor,
              color: '#fff',
              border: 'none',
              borderRadius: '25px',
              padding: '1rem 2rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: '"Georgia", serif',
              fontSize: '1rem'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
            }}
          >
            Next Word
          </button>
        </div>
      )}

      {/* CSS Animations */}
      <style>
        {`
          @keyframes resultSlideIn {
            0% { transform: translateY(20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          
          @keyframes resultBounce {
            0% { transform: scale(0) rotate(-180deg); }
            50% { transform: scale(1.2) rotate(0deg); }
            100% { transform: scale(1) rotate(0deg); }
          }
        `}
      </style>
    </div>
  );
});

export default VoiceRecognition; 