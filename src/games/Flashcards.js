import React, { useState, useEffect } from 'react';
import { MdVolumeUp } from 'react-icons/md';

// Play Swedish word with TTS
function playSwedish(word) {
  if ('speechSynthesis' in window) {
    // Stop any current speech
    window.speechSynthesis.cancel();
    
    // Wait for voices to load
    const speakWithSwedishVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      console.log('Available voices:', voices.map(v => `${v.name} (${v.lang})`));
      
      // Find the best Swedish voice - prioritize native Swedish voices
      let swedishVoice = voices.find(voice => 
        voice.lang === 'sv-SE' || 
        voice.lang === 'sv' ||
        voice.name.toLowerCase().includes('swedish') ||
        voice.name.toLowerCase().includes('sverige') ||
        voice.name.toLowerCase().includes('anna') || // Common Swedish voice name
        voice.name.toLowerCase().includes('alva')   // Another common Swedish voice
      );
      
      // If no Swedish voice, try any voice with 'sv' in the language code
      if (!swedishVoice) {
        swedishVoice = voices.find(voice => voice.lang.includes('sv'));
      }
      
      // If still no Swedish voice, try to find a Nordic/Scandinavian voice
      if (!swedishVoice) {
        swedishVoice = voices.find(voice => 
          voice.name.toLowerCase().includes('nordic') ||
          voice.name.toLowerCase().includes('scandinavian') ||
          voice.name.toLowerCase().includes('norwegian') ||
          voice.name.toLowerCase().includes('danish')
        );
      }
      
      // If still no Swedish voice, try to find any European voice
      if (!swedishVoice) {
        swedishVoice = voices.find(voice => 
          voice.lang.startsWith('en') || // English might work better than other languages
          voice.lang.startsWith('de') || // German
          voice.lang.startsWith('fr')    // French
        );
      }
      
      const utter = new window.SpeechSynthesisUtterance(word);
      utter.lang = 'sv-SE';
      utter.rate = 0.6; // Slower for better pronunciation
      utter.pitch = 1.0;
      utter.volume = 1.0;
      
      if (swedishVoice) {
        utter.voice = swedishVoice;
        console.log('Using Swedish voice:', swedishVoice.name, swedishVoice.lang);
      } else {
        console.log('No Swedish voice found. Using default voice.');
        console.log('Available voices:', voices.map(v => `${v.name} (${v.lang})`));
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

// Flashcards game: flip to see English meaning, navigate words
function Flashcards({ words, onWordStatUpdate, onLessonComplete, isDarkMode }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [flippedOnce, setFlippedOnce] = useState(false);
  const [showContinue, setShowContinue] = useState(false);

  if (!words.length) return <div style={{textAlign:'center',marginTop:'2rem', color: isDarkMode ? '#ffffff' : '#000000'}}>No words to practice!</div>;
  const word = words[idx];

  // Dark mode colors
  const cardBg = isDarkMode ? '#2d2d2d' : '#e0f7fa';
  const cardShadow = isDarkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px #b2ebf2';
  const textColor = isDarkMode ? '#ffffff' : '#2193b0';
  const buttonBg = isDarkMode ? '#1e3a5f' : '#2193b0';
  const buttonColor = '#ffffff';
  const infoColor = isDarkMode ? '#cccccc' : '#888888';

  // Go to next/previous word
  const next = () => {
    setFlipped(false);
    setFlippedOnce(false);
    setShowContinue(false);
    if (idx + 1 === words.length) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        if (typeof onLessonComplete === 'function') onLessonComplete();
      }, 1500);
      setIdx(0);
    } else {
      setIdx(idx+1);
    }
  };
  const prev = () => { setFlipped(false); setFlippedOnce(false); setShowContinue(false); setIdx((idx-1+words.length)%words.length); };

  // Handle flip
  const handleFlip = () => {
    setFlipped(f => {
      if (!f && !flippedOnce) {
        setFlippedOnce(true);
        if (onWordStatUpdate) onWordStatUpdate(word.swedish, word.english, 'correct');
        setShowContinue(true);
      }
      return !f;
    });
  };

  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginTop:'2rem',position:'relative'}}>
      <h2 style={{color: textColor}}>Flashcards</h2>
      <div onClick={handleFlip} style={{
        width:260,
        height:140,
        background: cardBg,
        borderRadius:18,
        boxShadow: cardShadow,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        fontSize:'2rem',
        color: textColor,
        margin:'1.5rem 0',
        cursor:'pointer',
        transition:'0.2s',
        userSelect:'none',
        position:'relative',
        border: isDarkMode ? '1px solid #555555' : 'none'
      }}>
        {!flipped && (
          <button type="button" aria-label={`Play ${word.swedish}`} onClick={e => {e.stopPropagation();playSwedish(word.swedish);}} style={{
            position:'absolute',
            top:8,
            right:12,
            background:'none',
            border:'none',
            color: textColor,
            cursor:'pointer',
            fontSize:24
          }}><MdVolumeUp /></button>
        )}
        {flipped ? word.english : word.swedish}
      </div>
      <div style={{display:'flex',gap:16}}>
        <button onClick={prev} style={{
          background: buttonBg,
          color: buttonColor,
          border:'none',
          borderRadius:8,
          padding:'0.5rem 1.2rem',
          fontWeight:'bold',
          fontSize:18,
          cursor:'pointer'
        }}>Prev</button>
        {showContinue && (
          <button onClick={next} style={{
            background: buttonBg,
            color: buttonColor,
            border:'none',
            borderRadius:8,
            padding:'0.8rem 1.5rem',
            fontWeight:'bold',
            fontSize:16,
            cursor:'pointer',
            boxShadow:'0 2px 6px rgba(0,0,0,0.1)',
            transition:'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 12px rgba(33, 147, 176, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
          }}
          >Continue →</button>
        )}
        {!showContinue && (
          <button onClick={next} style={{
            background: buttonBg,
            color: buttonColor,
            border:'none',
            borderRadius:8,
            padding:'0.5rem 1.2rem',
            fontWeight:'bold',
            fontSize:18,
            cursor:'pointer'
          }}>Next</button>
        )}
      </div>
      <div style={{marginTop:10,color: infoColor}}>Card {idx+1} of {words.length}</div>
      <div style={{marginTop:8,fontSize:13,color: infoColor}}>(Tap card to flip)</div>
      {showConfetti && <div style={{position:'absolute',top:0,left:0,right:0,fontSize:48,animation:'pop 1.5s'}}>
        <span role="img" aria-label="confetti">🎉🎊✨🎉🎊✨</span>
      </div>}
      <style>{`@keyframes pop { 0%{opacity:0;transform:scale(0.7);} 20%{opacity:1;transform:scale(1.1);} 80%{opacity:1;} 100%{opacity:0;transform:scale(1);} }`}</style>
    </div>
  );
}

export default Flashcards; 