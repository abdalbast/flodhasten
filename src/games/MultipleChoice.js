import React, { useState, useCallback, useMemo } from 'react';
import { MdVolumeUp } from 'react-icons/md';
import ttsApi from '../utils/ttsApi';

// Helper: shuffle array
function shuffle(arr) {
  return arr.map(v => [Math.random(), v]).sort().map(a => a[1]);
}

// Play Swedish word with TTS API
async function playSwedish(word) {
  try {
    // First try the API
    await ttsApi.playSwedish(word);
  } catch (error) {
    console.log('TTS API failed, falling back to browser TTS:', error.message);
    
    // Fallback to browser TTS
    if ('speechSynthesis' in window) {
      // Stop any current speech
      window.speechSynthesis.cancel();
      
      // Wait for voices to load
      const speakWithSwedishVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        console.log('Available voices:', voices.map(v => `${v.name} (${v.lang})`));
        
        // Only use Alva (sv-SE) voice
        let swedishVoice = voices.find(voice => 
          voice.name.toLowerCase().includes('alva') && voice.lang === 'sv-SE'
        );
        
        const utter = new window.SpeechSynthesisUtterance(word);
        utter.lang = 'sv-SE';
        utter.rate = 0.6; // Slower for better pronunciation
        utter.pitch = 1.0;
        utter.volume = 1.0;
        
        if (swedishVoice) {
          utter.voice = swedishVoice;
          console.log('🎤 Using Alva (sv-SE) voice:', swedishVoice.name, swedishVoice.lang);
        } else {
          console.log('⚠️ Alva (sv-SE) voice not found. Not playing audio.');
          console.log('📋 Available voices:', voices.map(v => `${v.name} (${v.lang})`));
          return; // Don't play audio if Alva is not available
        }
        
        window.speechSynthesis.speak(utter);
      };
      
      // If voices are already loaded
      if (window.speechSynthesis.getVoices().length > 0) {
        speakWithSwedishVoice();
      } else {
        // Wait for voices to load
        window.speechSynthesis.onvoiceschanged = speakWithSwedishVoice;
      }
    } else {
      console.log('Speech synthesis not supported in this browser');
    }
  }
}

// Memoized option button component
const OptionButton = React.memo(({ option, isCorrect, isSelected, isRevealed, onClick, disabled }) => {
  const getButtonStyle = useMemo(() => {
    let bg = '#fff', color = '#1976d2';
    if (isRevealed) {
      if (isCorrect) {
        bg = '#388e3c'; color = '#fff';
      } else if (isSelected) {
        bg = '#d32f2f'; color = '#fff';
      }
    } else if (isSelected) {
      bg = (isCorrect ? '#388e3c' : '#d32f2f');
      color = '#fff';
    }
    return { background: bg, color };
  }, [isCorrect, isSelected, isRevealed]);

  return (
    <button 
      onClick={onClick} 
      disabled={disabled} 
      style={{
        ...getButtonStyle,
        border: 'none',
        borderRadius: 8,
        padding: '0.7rem',
        fontWeight: 'bold',
        fontSize: 16,
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: '0 1px 4px #90caf9'
      }}
    >
      {option}
    </button>
  );
});

// Memoized continue button component
const ContinueButton = React.memo(({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = useMemo(() => ({
    background: '#1976d2',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '0.8rem 1.5rem',
    fontWeight: 'bold',
    fontSize: 16,
    cursor: 'pointer',
    marginTop: 12,
    boxShadow: isHovered ? '0 4px 12px rgba(25, 118, 210, 0.3)' : '0 2px 6px rgba(0,0,0,0.1)',
    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
    transition: 'all 0.2s ease'
  }), [isHovered]);

  return (
    <button 
      onClick={onClick}
      style={buttonStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Continue →
    </button>
  );
});

// Memoized confetti component
const Confetti = React.memo(() => (
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    fontSize: 48,
    animation: 'pop 1.5s'
  }}>
    <span role="img" aria-label="confetti">🎉🎊✨🎉🎊✨</span>
  </div>
));

// Multiple Choice game: pick correct English meaning for Swedish word
function MultipleChoice({ words, onWordStatUpdate, onLessonComplete, isDarkMode, onGamePlayed, onPerfectScore }) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [answerReveal, setAnswerReveal] = useState(false);
  const [options, setOptions] = useState([]);
  const [showContinue, setShowContinue] = useState(false);
  
  // Memoize current word to prevent unnecessary re-renders
  const currentWord = useMemo(() => words[idx] || null, [words, idx]);
  
  // Generate options only when word index changes
  React.useEffect(() => {
    if (words.length > 0 && currentWord) {
      const newOptions = shuffle([
        currentWord.english,
        ...shuffle(words.filter(w => w !== currentWord)).slice(0, 3).map(w => w.english)
      ]);
      setOptions(newOptions);
      setSelected(null);
      setFeedback('');
      setAnswerReveal(false);
      setShowContinue(false);
    }
  }, [idx, words, currentWord]);

  // Memoize handlers to prevent unnecessary re-renders
  const handleOptionClick = useCallback((option) => {
    if (selected !== null) return; // Already answered
    
    setSelected(option);
    const isCorrect = option === currentWord.english;
    
    // Update word stats
    if (onWordStatUpdate) {
      onWordStatUpdate(currentWord.swedish, currentWord.english, isCorrect ? 'correct' : 'incorrect');
    }
    
    // Check if this was the last word
    if (idx === words.length - 1) {
      // Calculate score
      const correctAnswers = words.filter((_, i) => {
        const word = words[i];
        return word.english === selected;
      }).length;
      
      const score = Math.round((correctAnswers / words.length) * 100);
      
      // Track game completion for achievements
      if (onGamePlayed) {
        onGamePlayed();
      }
      
      // Track perfect score for achievements
      if (score === 100 && onPerfectScore) {
        onPerfectScore();
      }
      
      // Show completion message
      setTimeout(() => {
        alert(`Game completed! Score: ${score}%`);
        if (onLessonComplete) {
          onLessonComplete();
        }
      }, 1000);
    } else {
      // Move to next word after a short delay
      setTimeout(() => {
        setIdx(prev => prev + 1);
        setSelected(null);
      }, 1500);
    }
  }, [idx, selected, currentWord, words, onWordStatUpdate, onLessonComplete, onGamePlayed, onPerfectScore]);

  const handleContinue = useCallback(() => {
    setSelected(null);
    setFeedback('');
    setAnswerReveal(false);
    setShowContinue(false);
    setIdx((idx + 1) % words.length);
    if ((idx + 1) % words.length === 0) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        if (typeof onLessonComplete === 'function') onLessonComplete();
      }, 1500);
    }
  }, [idx, words.length, onLessonComplete]);

  const handlePlayAudio = useCallback(() => {
    if (currentWord) {
      playSwedish(currentWord.swedish);
    }
  }, [currentWord]);

  if (!words.length) return <div style={{textAlign:'center',marginTop:'2rem'}}>No words to practice!</div>;
  if (!currentWord) return null;

  return (
    <div style={{
      maxWidth: 350,
      margin: '2rem auto',
      background: '#e3f2fd',
      padding: '1.5rem',
      borderRadius: 16,
      boxShadow: '0 2px 8px #90caf9',
      position: 'relative'
    }}>
      <h2 style={{color:'#1976d2'}}>Multiple Choice</h2>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 8,
        marginBottom: 8
      }}>
        <span style={{fontSize:'1.5rem',color:'#1976d2'}}>{currentWord.swedish}</span>
        <button 
          type="button" 
          aria-label={`Play ${currentWord.swedish}`} 
          onClick={handlePlayAudio} 
          style={{
            background: 'none',
            border: 'none',
            color: '#1976d2',
            cursor: 'pointer',
            fontSize: 22
          }}
        >
          <MdVolumeUp />
        </button>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        {options.map((opt, i) => (
          <OptionButton
            key={`${idx}-${i}`}
            option={opt}
            isCorrect={opt === currentWord.english}
            isSelected={selected === opt}
            isRevealed={answerReveal}
            onClick={() => handleOptionClick(opt)}
            disabled={answerReveal}
          />
        ))}
      </div>
      {feedback && (
        <div style={{
          marginTop: 12,
          fontWeight: 'bold',
          color: feedback.includes('Correct') ? '#388e3c' : '#d32f2f'
        }}>
          {feedback}
        </div>
      )}
      {showContinue && <ContinueButton onClick={handleContinue} />}
      <div style={{marginTop:10,color:'#888'}}>Word {idx+1} of {words.length}</div>
      {showConfetti && <Confetti />}
      <style>{`@keyframes pop { 0%{opacity:0;transform:scale(0.7);} 20%{opacity:1;transform:scale(1.1);} 80%{opacity:1;} 100%{opacity:0;transform:scale(1);} }`}</style>
    </div>
  );
}

export default React.memo(MultipleChoice); 