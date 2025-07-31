import React from 'react';

// Logo component for Flodhästen (River Horse)
function Logo({ size = 40, color = '#2193b0', isDarkMode = false }) {
  const logoColor = isDarkMode ? '#64b5f6' : color;
  const secondaryColor = isDarkMode ? '#1976d2' : '#1976d2';
  
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: size * 0.4,
      fontWeight: 'bold',
      color: logoColor,
      fontFamily: '"Georgia", serif'
    }}>
      {/* River Horse Icon */}
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
      >
        {/* Background circle */}
        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          fill={isDarkMode ? '#2d2d2d' : '#e3f2fd'} 
          stroke={logoColor} 
          strokeWidth="2"
        />
        
        {/* River waves */}
        <path 
          d="M20 65 Q30 60 40 65 Q50 70 60 65 Q70 60 80 65" 
          stroke={secondaryColor} 
          strokeWidth="3" 
          fill="none" 
          opacity="0.8"
        />
        <path 
          d="M25 70 Q35 65 45 70 Q55 75 65 70 Q75 65 85 70" 
          stroke={secondaryColor} 
          strokeWidth="2" 
          fill="none" 
          opacity="0.6"
        />
        
        {/* Horse head */}
        <ellipse 
          cx="50" 
          cy="35" 
          rx="15" 
          ry="12" 
          fill={logoColor} 
          opacity="0.9"
        />
        
        {/* Horse ears */}
        <path 
          d="M40 25 Q38 20 42 18 Q45 20 43 25" 
          fill={logoColor} 
          opacity="0.9"
        />
        <path 
          d="M60 25 Q62 20 58 18 Q55 20 57 25" 
          fill={logoColor} 
          opacity="0.9"
        />
        
        {/* Horse eyes */}
        <circle cx="45" cy="32" r="2" fill="white" />
        <circle cx="55" cy="32" r="2" fill="white" />
        <circle cx="45" cy="32" r="1" fill="black" />
        <circle cx="55" cy="32" r="1" fill="black" />
        
        {/* Horse nose */}
        <ellipse cx="50" cy="40" rx="3" ry="2" fill="#ff6b6b" />
        
        {/* Horse mane */}
        <path 
          d="M35 30 Q40 25 45 30 Q50 35 55 30 Q60 25 65 30" 
          stroke={logoColor} 
          strokeWidth="2" 
          fill="none" 
          opacity="0.8"
        />
        
        {/* Learning elements - small book */}
        <rect x="70" y="25" width="8" height="6" fill="#ffd93d" stroke="#f39c12" strokeWidth="0.5" />
        <line x1="72" y1="28" x2="76" y2="28" stroke="#f39c12" strokeWidth="0.5" />
        <line x1="72" y1="30" x2="76" y2="30" stroke="#f39c12" strokeWidth="0.5" />
        
        {/* Swedish flag colors hint */}
        <rect x="75" y="35" width="3" height="2" fill="#006aa7" />
        <rect x="78" y="35" width="3" height="2" fill="#fecc00" />
      </svg>
      
      {/* Text */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <span style={{ fontSize: '1em', lineHeight: '1' }}>Flodhästen</span>
        <span style={{ 
          fontSize: '0.6em', 
          opacity: 0.7, 
          fontWeight: 'normal',
          fontFamily: 'Arial, sans-serif'
        }}>
          Learn Swedish
        </span>
      </div>
    </div>
  );
}

export default Logo; 