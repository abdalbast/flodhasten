import React, { useState } from 'react';
import { MdPlayArrow, MdClose } from 'react-icons/md';

function Dialogue({ dialogue, onStartGames, onClose, isDarkMode }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  const handleNext = () => {
    if (currentLine < dialogue.lines.length - 1) {
      setCurrentLine(currentLine + 1);
      setShowTranslation(false);
    } else {
      onStartGames();
    }
  };

  const handleSkip = () => {
    onStartGames();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: isDarkMode 
        ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)' 
        : 'linear-gradient(135deg, #e3f2fd 0%, #f5f5f5 50%, #e3f2fd 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '2rem'
    }}>
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          background: 'none',
          border: 'none',
          color: isDarkMode ? '#ffffff' : '#000000',
          fontSize: '2rem',
          cursor: 'pointer',
          padding: '0.5rem',
          borderRadius: '50%',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'none';
        }}
      >
        <MdClose />
      </button>

      {/* Dialogue container */}
      <div style={{
        maxWidth: '600px',
        width: '100%',
        background: isDarkMode ? '#1a1a1a' : '#ffffff',
        borderRadius: '20px',
        padding: '3rem',
        boxShadow: isDarkMode 
          ? '0 8px 32px rgba(0,0,0,0.4)' 
          : '0 8px 32px rgba(0,0,0,0.1)',
        border: isDarkMode 
          ? '1px solid rgba(255,255,255,0.1)' 
          : '1px solid rgba(0,0,0,0.1)',
        textAlign: 'center',
        position: 'relative'
      }}>
        {/* Lesson title */}
        <h2 style={{
          color: isDarkMode ? '#64b5f6' : '#2196f3',
          fontSize: '2rem',
          marginBottom: '2rem',
          fontWeight: 'bold'
        }}>
          💬 {dialogue.title}
        </h2>

        {/* Progress indicator */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          marginBottom: '2rem'
        }}>
          {dialogue.lines.map((_, index) => (
            <div
              key={index}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: index <= currentLine 
                  ? (isDarkMode ? '#64b5f6' : '#2196f3')
                  : (isDarkMode ? '#444' : '#ddd'),
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>

        {/* Current dialogue line */}
        <div style={{
          marginBottom: '2rem',
          minHeight: '120px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: isDarkMode ? '#ffffff' : '#333333',
            marginBottom: '1rem',
            lineHeight: '1.4'
          }}>
            {dialogue.lines[currentLine].text}
          </div>
          
          {showTranslation && (
            <div style={{
              fontSize: '1.2rem',
              color: isDarkMode ? '#b0bec5' : '#666666',
              fontStyle: 'italic',
              marginTop: '1rem',
              padding: '1rem',
              background: isDarkMode ? '#2d2d2d' : '#f5f5f5',
              borderRadius: '10px',
              border: `1px solid ${isDarkMode ? '#444' : '#ddd'}`
            }}>
              {dialogue.lines[currentLine].translation}
            </div>
          )}
        </div>

        {/* Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <button
            onClick={() => setShowTranslation(!showTranslation)}
            style={{
              background: isDarkMode ? '#2193b0' : '#4CAF50',
              color: '#ffffff',
              border: 'none',
              padding: '0.8rem 1.5rem',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.2s ease',
              transform: 'translateY(0)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
            }}
            onMouseDown={(e) => {
              e.target.style.transform = 'translateY(0)';
            }}
            onMouseUp={(e) => {
              e.target.style.transform = 'translateY(-2px)';
            }}
          >
            {showTranslation ? 'Hide Translation' : 'Show Translation'}
          </button>
        </div>

        {/* Navigation buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            onClick={handleSkip}
            style={{
              background: isDarkMode ? '#666' : '#f0f0f0',
              color: isDarkMode ? '#ffffff' : '#333333',
              border: 'none',
              padding: '0.8rem 1.5rem',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.2s ease',
              transform: 'translateY(0)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
            }}
            onMouseDown={(e) => {
              e.target.style.transform = 'translateY(0)';
            }}
            onMouseUp={(e) => {
              e.target.style.transform = 'translateY(-2px)';
            }}
          >
            Skip to Games
          </button>

          <button
            onClick={handleNext}
            style={{
              background: isDarkMode ? '#4CAF50' : '#4CAF50',
              color: '#ffffff',
              border: 'none',
              padding: '0.8rem 1.5rem',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.2s ease',
              transform: 'translateY(0)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
            }}
            onMouseDown={(e) => {
              e.target.style.transform = 'translateY(0)';
            }}
            onMouseUp={(e) => {
              e.target.style.transform = 'translateY(-2px)';
            }}
          >
            {currentLine < dialogue.lines.length - 1 ? 'Next Line' : 'Start Games'}
            <MdPlayArrow />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dialogue; 