import React from 'react';
import { MdVolumeUp } from 'react-icons/md';
import { getHomeStyles } from '../styles/homeStyles';
import ttsApi from '../utils/ttsApi';

// Play Swedish word with TTS API
async function playSwedish(word) {
  try {
    await ttsApi.playSwedish(word);
  } catch (error) {
    console.log('TTS API failed, falling back to browser TTS:', error.message);
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const speakWithSwedishVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        let swedishVoice = voices.find(voice => 
          voice.name.toLowerCase().includes('alva') && voice.lang === 'sv-SE'
        );
        
        const utter = new window.SpeechSynthesisUtterance(word);
        utter.lang = 'sv-SE';
        utter.rate = 0.6;
        utter.pitch = 1.0;
        utter.volume = 1.0;
        
        if (swedishVoice) {
          utter.voice = swedishVoice;
          console.log('🎤 Using Alva (sv-SE) voice:', swedishVoice.name, swedishVoice.lang);
        } else {
          console.log('⚠️ Alva (sv-SE) voice not found. Not playing audio.');
          return;
        }
        
        window.speechSynthesis.speak(utter);
      };
      
      if (window.speechSynthesis.getVoices().length > 0) {
        speakWithSwedishVoice();
      } else {
        window.speechSynthesis.onvoiceschanged = speakWithSwedishVoice;
      }
    }
  }
}

const WordOfDay = React.memo(({ wordOfTheDay, currentLanguage, isDarkMode }) => {
  const styles = getHomeStyles(isDarkMode);
  
  if (!wordOfTheDay) return null;

  const handlePlayAudio = React.useCallback(() => {
    playSwedish(wordOfTheDay.swedish);
  }, [wordOfTheDay]);

  return (
    <div style={styles.wordOfDaySection}>
      <h3 style={{ 
        color: styles.colors.titleColor, 
        marginBottom: '1rem',
        fontSize: '1.2rem'
      }}>
        {currentLanguage === 'ku' ? 'وشەی ڕۆژە' : 
         currentLanguage === 'ku-lat' ? 'Wêjey Rojê' : 
         'Word of the Day'}
      </h3>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginBottom: '8px'
      }}>
        <span style={{
          fontSize: '1.5rem',
          color: styles.colors.titleColor,
          fontWeight: 'bold'
        }}>
          {wordOfTheDay.swedish}
        </span>
        <button 
          type="button" 
          aria-label={`Play ${wordOfTheDay.swedish}`} 
          onClick={handlePlayAudio} 
          style={{
            background: 'none',
            border: 'none',
            color: styles.colors.titleColor,
            cursor: 'pointer',
            fontSize: '22px'
          }}
        >
          <MdVolumeUp />
        </button>
      </div>
      <div style={{
        color: styles.colors.textColor,
        fontSize: '1rem',
        fontStyle: 'italic'
      }}>
        {wordOfTheDay[currentLanguage] || wordOfTheDay.english}
      </div>
    </div>
  );
});

export default WordOfDay; 