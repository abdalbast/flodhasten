import React from 'react';
import { componentStyles, getThemeColors } from '../../styles/designSystem';

const Card = React.memo(({ 
  children, 
  isDarkMode = false, 
  className = '', 
  onClick,
  role = 'article',
  'aria-label': ariaLabel,
  ...props 
}) => {
  const themeColors = getThemeColors(isDarkMode);
  const baseStyle = componentStyles.card.base;
  const darkStyle = isDarkMode ? componentStyles.card.dark : {};

  const cardStyle = {
    ...baseStyle,
    ...darkStyle,
    ...(onClick && { cursor: 'pointer' })
  };

  return (
    <div
      style={cardStyle}
      className={className}
      onClick={onClick}
      role={role}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </div>
  );
});

export default Card; 