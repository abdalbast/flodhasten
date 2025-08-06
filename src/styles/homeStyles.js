// Home component styles
export const getHomeStyles = (isDarkMode) => ({
  // Color palette
  colors: {
    textColor: isDarkMode ? '#f5f5f5' : '#2c3e50',
    backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f9fa',
    cardBackground: isDarkMode ? '#3d3d3d' : '#ffffff',
    borderColor: isDarkMode ? '#555555' : '#e8f4f8',
    titleColor: isDarkMode ? '#64b5f6' : '#3498db',
    progressBg: isDarkMode ? '#1e3a5f' : '#e8f4f8',
    wordOfDayBg: isDarkMode ? '#2d2d2d' : '#fff8e1',
    wordOfDayBorder: isDarkMode ? '#555555' : '#ffd54f',
    resetButtonBg: isDarkMode ? '#d32f2f' : '#e74c3c',
    resetButtonHoverBg: isDarkMode ? '#b71c1c' : '#c0392b',
    moominBlue: '#3498db',
    moominGreen: '#27ae60',
    moominYellow: '#f1c40f',
    moominOrange: '#e67e22',
    moominPink: '#e91e63'
  },

  // Container styles
  container: {
    textAlign: 'center',
    padding: '2rem'
  },

  // Title section styles
  titleSection: {
    textAlign: 'center',
    marginBottom: '2rem',
    padding: '2.5rem',
    background: isDarkMode 
      ? 'linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%)' 
      : 'linear-gradient(135deg, #e8f4f8 0%, #f8f9fa 50%, #e8f4f8 100%)',
    borderRadius: '25px',
    boxShadow: isDarkMode 
      ? '0 12px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)' 
      : '0 12px 40px rgba(52, 152, 219, 0.15), inset 0 1px 0 rgba(255,255,255,0.8)',
    border: isDarkMode 
      ? '1px solid rgba(255,255,255,0.1)' 
      : '1px solid rgba(52, 152, 219, 0.2)',
    position: 'relative',
    overflow: 'hidden'
  },

  // Decorative background
  decorativeBg: {
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: isDarkMode 
      ? 'radial-gradient(circle, rgba(52, 152, 219, 0.1) 0%, transparent 70%)' 
      : 'radial-gradient(circle, rgba(52, 152, 219, 0.05) 0%, transparent 70%)',
    animation: 'float 6s ease-in-out infinite'
  },

  // User avatar section
  userAvatarSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '1.5rem',
    padding: '1rem',
    background: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(52, 152, 219, 0.1)',
    borderRadius: '15px',
    border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(52, 152, 219, 0.2)'
  },

  // Avatar styles
  avatar: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: isDarkMode ? '#3498db' : '#3498db',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    color: 'white',
    boxShadow: '0 4px 12px rgba(52, 152, 219, 0.3)',
    animation: 'gentleGlow 3s ease-in-out infinite'
  },

  // Progress section
  progressSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    alignItems: 'flex-start'
  },

  // Progress bar
  progressBar: {
    width: '100px',
    height: '8px',
    background: isDarkMode ? '#555' : '#e0e0e0',
    borderRadius: '4px',
    overflow: 'hidden'
  },

  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #3498db, #27ae60)',
    borderRadius: '4px',
    transition: 'width 0.3s ease'
  },

  // Word of the day section
  wordOfDaySection: {
    margin: '2rem 0',
    padding: '1.5rem',
    background: isDarkMode ? '#2d2d2d' : '#fff8e1',
    borderRadius: '15px',
    border: isDarkMode ? '1px solid #555555' : '1px solid #ffd54f',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },

  // Reset button
  resetButton: {
    background: isDarkMode ? '#d32f2f' : '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'all 0.2s ease',
    ':hover': {
      background: isDarkMode ? '#b71c1c' : '#c0392b'
    }
  }
});

// CSS animations
export const homeAnimations = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(1deg); }
  }
  @keyframes gentleGlow {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; }
  }
`; 