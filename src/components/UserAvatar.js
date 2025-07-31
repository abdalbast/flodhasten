import React from 'react';
import { getHomeStyles } from '../styles/homeStyles';

const UserAvatar = React.memo(({ userData, isDarkMode }) => {
  const styles = getHomeStyles(isDarkMode);
  const { level, xp, coins } = userData || { level: 1, xp: 0, coins: 0 };
  
  // Calculate XP progress
  const xpForNextLevel = level * 100;
  const xpProgress = (xp % 100) / 100;

  return (
    <div style={styles.userAvatarSection}>
      <div style={styles.avatar}>
        {level > 10 ? '👑' : level > 5 ? '⭐' : '🌟'}
      </div>
      <div style={styles.progressSection}>
        <div style={{ color: styles.colors.textColor, fontWeight: 'bold' }}>
          Level {level}
        </div>
        <div style={styles.progressBar}>
          <div 
            style={{
              ...styles.progressFill,
              width: `${xpProgress * 100}%`
            }}
          />
        </div>
        <div style={{ color: styles.colors.textColor, fontSize: '12px' }}>
          {xp % 100}/{100} XP
        </div>
        <div style={{ color: styles.colors.moominYellow, fontSize: '12px' }}>
          💰 {coins} coins
        </div>
      </div>
    </div>
  );
});

export default UserAvatar; 