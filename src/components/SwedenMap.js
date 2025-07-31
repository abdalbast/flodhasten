import React from 'react';

function SwedenMap({ isDarkMode, currentLesson, skills, progress, onSelectSkill }) {
  // Swedish lessons with their positions on the map - top to bottom chronology with more towns
  const lessons = [
    { id: 'lesson1', name: 'Greetings', x: 75, y: 15, city: 'Kiruna', icon: '🤝' },
    { id: 'lesson2', name: 'Introductions', x: 70, y: 20, city: 'Luleå', icon: '👨‍💼' },
    { id: 'lesson3', name: 'Food & Shopping', x: 65, y: 30, city: 'Umeå', icon: '🛍️' },
    { id: 'lesson4', name: 'Travel & Places', x: 60, y: 40, city: 'Östersund', icon: '🗺️' },
    { id: 'lesson5', name: 'Work & Business', x: 55, y: 50, city: 'Falun', icon: '💼' },
    { id: 'lesson6', name: 'Dining Out', x: 50, y: 60, city: 'Karlstad', icon: '🍽️' },
    { id: 'lesson7', name: 'Family & Home', x: 45, y: 70, city: 'Örebro', icon: '🏡' },
    { id: 'lesson8', name: 'Culture & Tourism', x: 40, y: 80, city: 'Västerås', icon: '🏛️' },
    { id: 'lesson9', name: 'Romance & Dating', x: 35, y: 85, city: 'Eskilstuna', icon: '💝' },
    { id: 'lesson10', name: 'Challenges & Help', x: 30, y: 90, city: 'Norrköping', icon: '🆘' },
    { id: 'lesson11', name: 'Holidays & Celebrations', x: 25, y: 92, city: 'Jönköping', icon: '🎊' },
    { id: 'lesson12', name: 'Future Plans', x: 20, y: 95, city: 'Växjö', icon: '🔮' }
  ];

  const mapColor = isDarkMode ? '#f5f5dc' : '#f5f5dc'; // Light beige like the image
  const waterColor = isDarkMode ? '#87ceeb' : '#87ceeb'; // Sky blue for water
  const forestColor = isDarkMode ? '#228b22' : '#228b22'; // Forest green
  const lessonColor = isDarkMode ? '#ff6b35' : '#ff6b35'; // Orange for lessons
  const completedColor = isDarkMode ? '#4caf50' : '#4caf50'; // Green for completed
  const lockedColor = isDarkMode ? '#cccccc' : '#cccccc'; // Grey for locked
  const textColor = isDarkMode ? '#333333' : '#333333';

  const getLessonStatus = (lessonId) => {
    const lessonIndex = lessons.findIndex(l => l.id === lessonId);
    const isUnlocked = lessonIndex === 0 || (progress[lessons[lessonIndex - 1].id] >= 100);
    const isCompleted = progress[lessonId] >= 100;
    const progressValue = progress[lessonId] || 0;
    const isInProgress = progressValue > 0 && progressValue < 100;
    
    return { isUnlocked, isCompleted, progressValue, isInProgress };
  };

  const handleLessonClick = (lessonId) => {
    const { isUnlocked } = getLessonStatus(lessonId);
    if (isUnlocked) {
      onSelectSkill(lessonId);
    }
  };

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      pointerEvents: 'none'
    }}>
      {/* Sweden Map SVG */}
      <svg
        viewBox="0 0 100 100"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >
        {/* Main Sweden outline - more accurate shape */}
        <path
          d="M 15 5 L 85 3 L 88 8 L 90 15 L 88 25 L 85 35 L 82 45 L 78 55 L 75 65 L 70 75 L 65 85 L 60 90 L 55 92 L 50 94 L 45 92 L 40 88 L 35 82 L 30 75 L 25 65 L 22 55 L 20 45 L 18 35 L 20 25 L 22 15 L 20 8 L 18 5 L 15 5 Z"
          fill={mapColor}
          stroke="none"
        />
        
        {/* Gotland Island - more accurate position and shape */}
        <path
          d="M 70 75 L 75 73 L 78 75 L 80 77 L 78 80 L 75 82 L 72 80 L 70 77 Z"
          fill={mapColor}
          stroke="none"
        />
        
        {/* Öland Island */}
        <path
          d="M 65 85 L 70 83 L 72 85 L 73 87 L 72 89 L 70 91 L 68 89 L 67 87 L 65 85 Z"
          fill={mapColor}
          stroke="none"
        />
        
        {/* Major Lakes - more accurate positioning */}
        <ellipse cx="35" cy="65" rx="8" ry="4" fill={waterColor} opacity="0.6" /> {/* Vänern */}
        <ellipse cx="55" cy="50" rx="6" ry="3" fill={waterColor} opacity="0.6" /> {/* Vättern */}
        <ellipse cx="70" cy="30" rx="4" ry="2" fill={waterColor} opacity="0.6" /> {/* Hjälmaren */}
        <ellipse cx="25" cy="45" rx="5" ry="2.5" fill={waterColor} opacity="0.6" /> {/* Storsjön */}
        <ellipse cx="45" cy="35" rx="3" ry="1.5" fill={waterColor} opacity="0.6" /> {/* Siljan */}
        <ellipse cx="60" cy="75" rx="4" ry="2" fill={waterColor} opacity="0.6" /> {/* Mälaren */}
        
        {/* Forest patterns - more realistic distribution */}
        <g transform="translate(20, 25)">
          <circle cx="0" cy="0" r="1.5" fill={forestColor} opacity="0.3" />
          <circle cx="2" cy="1" r="1" fill={forestColor} opacity="0.3" />
          <circle cx="-1" cy="2" r="1.2" fill={forestColor} opacity="0.3" />
        </g>
        <g transform="translate(40, 15)">
          <circle cx="0" cy="0" r="1.5" fill={forestColor} opacity="0.3" />
          <circle cx="2" cy="1" r="1" fill={forestColor} opacity="0.3" />
          <circle cx="-1" cy="2" r="1.2" fill={forestColor} opacity="0.3" />
        </g>
        <g transform="translate(60, 35)">
          <circle cx="0" cy="0" r="1.5" fill={forestColor} opacity="0.3" />
          <circle cx="2" cy="1" r="1" fill={forestColor} opacity="0.3" />
          <circle cx="-1" cy="2" r="1.2" fill={forestColor} opacity="0.3" />
        </g>
        <g transform="translate(30, 55)">
          <circle cx="0" cy="0" r="1.5" fill={forestColor} opacity="0.3" />
          <circle cx="2" cy="1" r="1" fill={forestColor} opacity="0.3" />
          <circle cx="-1" cy="2" r="1.2" fill={forestColor} opacity="0.3" />
        </g>
        <g transform="translate(50, 70)">
          <circle cx="0" cy="0" r="1.5" fill={forestColor} opacity="0.3" />
          <circle cx="2" cy="1" r="1" fill={forestColor} opacity="0.3" />
          <circle cx="-1" cy="2" r="1.2" fill={forestColor} opacity="0.3" />
        </g>
        <g transform="translate(70, 60)">
          <circle cx="0" cy="0" r="1.5" fill={forestColor} opacity="0.3" />
          <circle cx="2" cy="1" r="1" fill={forestColor} opacity="0.3" />
          <circle cx="-1" cy="2" r="1.2" fill={forestColor} opacity="0.3" />
        </g>
        
        {/* Swedish cultural elements - positioned more accurately */}
        
        {/* Viking in north */}
        <g transform="translate(25, 15)">
          <circle cx="0" cy="0" r="2" fill="#8b4513" /> {/* Viking head */}
          <rect x="-0.6" y="1.4" width="1.2" height="2.6" fill="#8b4513" /> {/* Viking body */}
          <rect x="-2" y="2" width="0.6" height="1.4" fill="#8b4513" /> {/* Axe */}
        </g>
        
        {/* Moose */}
        <g transform="translate(30, 20)">
          <ellipse cx="0" cy="0" rx="1.4" ry="2" fill="#8b4513" />
          <ellipse cx="0" cy="-2" rx="0.6" ry="1.4" fill="#8b4513" /> {/* Antlers */}
        </g>
        
        {/* Dala horse */}
        <g transform="translate(45, 40)">
          <ellipse cx="0" cy="0" rx="1.6" ry="1" fill="#ff0000" />
          <ellipse cx="0" cy="-1" rx="0.4" ry="0.6" fill="#ff0000" /> {/* Head */}
          <rect x="-0.1" y="0.6" width="0.2" height="0.6" fill="#ff0000" /> {/* Legs */}
        </g>
        
        {/* Stockholm buildings */}
        <g transform="translate(75, 30)">
          <rect x="-1.2" y="0" width="0.6" height="2.6" fill="#ff0000" />
          <rect x="-0.6" y="0" width="0.6" height="2" fill="#ffff00" />
          <rect x="0" y="0" width="0.6" height="3.2" fill="#ff0000" />
        </g>
        
        {/* Viking ship */}
        <g transform="translate(20, 75)">
          <ellipse cx="0" cy="0" rx="3" ry="0.8" fill="#8b4513" />
          <rect x="-0.1" y="-0.8" width="0.2" height="1.6" fill="#8b4513" /> {/* Mast */}
          <rect x="-0.8" y="-0.4" width="1.6" height="0.16" fill="#8b4513" /> {/* Sail */}
        </g>
        
        {/* Coffee cup */}
        <g transform="translate(35, 85)">
          <ellipse cx="0" cy="0" rx="1.2" ry="1.4" fill="#ff0000" />
          <rect x="-1.2" y="-0.6" width="0.3" height="1.4" fill="#ff0000" /> {/* Handle */}
        </g>
        
        {/* Mittens */}
        <g transform="translate(40, 88)">
          <ellipse cx="0" cy="0" rx="0.6" ry="1" fill="#ff0000" />
          <ellipse cx="1.2" cy="0" rx="0.6" ry="1" fill="#ff0000" />
        </g>
        
        {/* Bicycle */}
        <g transform="translate(45, 90)">
          <circle cx="0" cy="0" r="1.2" fill="#ff0000" />
          <circle cx="2.4" cy="0" r="1.2" fill="#ff0000" />
          <rect x="0" y="-0.8" width="2.4" height="0.16" fill="#ff0000" />
        </g>
        
        {/* Cinnamon bun */}
        <g transform="translate(50, 92)">
          <circle cx="0" cy="0" r="1.2" fill="#ffff00" />
        </g>
        
        {/* Water labels - more accurate positioning */}
        <text x="40" y="95" fontSize="2.2" fill={textColor} textAnchor="middle">BALTIC</text>
        <text x="40" y="97" fontSize="2.2" fill={textColor} textAnchor="middle">SEA</text>
        
        <text x="15" y="50" fontSize="2.2" fill={textColor} textAnchor="middle">NORTH</text>
        <text x="15" y="52" fontSize="2.2" fill={textColor} textAnchor="middle">SEA</text>
        
        {/* Major city labels - more accurate positioning */}
        <text x="75" y="35" fontSize="2" fill={textColor} textAnchor="middle">STOCKHOLM</text>
        <text x="70" y="25" fontSize="2" fill={textColor} textAnchor="middle">Uppsala</text>
        <text x="55" y="55" fontSize="2" fill={textColor} textAnchor="middle">Vättern</text>
        <text x="35" y="70" fontSize="2" fill={textColor} textAnchor="middle">Vänern</text>
        <text x="30" y="75" fontSize="2" fill={textColor} textAnchor="middle">Göteborg</text>
        <text x="40" y="88" fontSize="2" fill={textColor} textAnchor="middle">Malmö</text>
        
        {/* Lesson town labels - positioned to avoid lesson markers */}
        <text x="75" y="8" fontSize="1.5" fill={textColor} textAnchor="middle">Kiruna</text>
        <text x="70" y="13" fontSize="1.5" fill={textColor} textAnchor="middle">Luleå</text>
        <text x="65" y="23" fontSize="1.5" fill={textColor} textAnchor="middle">Umeå</text>
        <text x="60" y="33" fontSize="1.5" fill={textColor} textAnchor="middle">Östersund</text>
        <text x="55" y="43" fontSize="1.5" fill={textColor} textAnchor="middle">Falun</text>
        <text x="50" y="53" fontSize="1.5" fill={textColor} textAnchor="middle">Karlstad</text>
        <text x="45" y="63" fontSize="1.5" fill={textColor} textAnchor="middle">Örebro</text>
        <text x="40" y="73" fontSize="1.5" fill={textColor} textAnchor="middle">Västerås</text>
        <text x="35" y="78" fontSize="1.5" fill={textColor} textAnchor="middle">Eskilstuna</text>
        <text x="30" y="83" fontSize="1.5" fill={textColor} textAnchor="middle">Norrköping</text>
        <text x="25" y="85" fontSize="1.5" fill={textColor} textAnchor="middle">Jönköping</text>
        <text x="20" y="88" fontSize="1.5" fill={textColor} textAnchor="middle">Växjö</text>
        
        {/* Compass rose */}
        <g transform="translate(85, 15)">
          <text x="0" y="-2" fontSize="1.8" fill={textColor} textAnchor="middle">N</text>
          <text x="2" y="0" fontSize="1.8" fill={textColor} textAnchor="middle">E</text>
          <text x="0" y="2" fontSize="1.8" fill={textColor} textAnchor="middle">S</text>
          <text x="-2" y="0" fontSize="1.8" fill={textColor} textAnchor="middle">W</text>
        </g>
        
        {/* Title */}
        <text x="20" y="8" fontSize="3" fill={textColor} textAnchor="start" fontWeight="bold">SWEDEN</text>
        
        {/* Lesson markers - larger and more prominent */}
        {lessons.map((lesson, index) => {
          const { isUnlocked, isCompleted, progressValue, isInProgress } = getLessonStatus(lesson.id);
          const isCurrent = lesson.id === currentLesson;
          
          return (
            <g key={lesson.id} style={{ pointerEvents: 'auto', cursor: isUnlocked ? 'pointer' : 'not-allowed' }}
               onClick={() => handleLessonClick(lesson.id)}>
              
              {/* Lesson circle */}
              <circle
                cx={lesson.x}
                cy={lesson.y}
                r={isCurrent ? "3" : "2.5"}
                fill={isCompleted ? completedColor : isUnlocked ? lessonColor : lockedColor}
                stroke={isDarkMode ? '#fff' : '#000'}
                strokeWidth="0.4"
                opacity={isUnlocked ? 1 : 0.5}
                style={{
                  transition: 'all 0.3s ease',
                  filter: isCurrent ? 'drop-shadow(0 0 8px rgba(255, 107, 53, 0.6))' : 'none'
                }}
              />
              
              {/* Lesson number */}
              <text
                x={lesson.x}
                y={lesson.y + 0.5}
                fontSize="1.4"
                fill={isDarkMode ? '#fff' : '#000'}
                textAnchor="middle"
                fontWeight="bold"
                opacity={isUnlocked ? 1 : 0.5}
              >
                {index + 1}
              </text>
              
              {/* Lesson icon */}
              <text
                x={lesson.x}
                y={lesson.y - 0.5}
                fontSize="1.8"
                textAnchor="middle"
                opacity={isUnlocked ? 1 : 0.5}
              >
                {lesson.icon}
              </text>
              
              {/* Progress indicator for in-progress lessons */}
              {isInProgress && (
                <circle
                  cx={lesson.x}
                  cy={lesson.y}
                  r="1.5"
                  fill="none"
                  stroke={isDarkMode ? '#ff9800' : '#ffa726'}
                  strokeWidth="0.4"
                  strokeDasharray={`${2 * Math.PI * 1.5 * progressValue / 100} ${2 * Math.PI * 1.5}`}
                  transform={`rotate(-90 ${lesson.x} ${lesson.y})`}
                />
              )}
              
              {/* Completion checkmark */}
              {isCompleted && (
                <text
                  x={lesson.x}
                  y={lesson.y + 0.4}
                  fontSize="1.2"
                  fill="#fff"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  ✓
                </text>
              )}
            </g>
          );
        })}
        
        {/* Connection lines between lessons */}
        {lessons.map((lesson, index) => {
          if (index === 0) return null;
          const prevLesson = lessons[index - 1];
          const { isUnlocked: isPrevUnlocked, isCompleted: isPrevCompleted } = getLessonStatus(prevLesson.id);
          const { isUnlocked: isCurrentUnlocked } = getLessonStatus(lesson.id);
          
          if (isPrevCompleted && isCurrentUnlocked) {
            return (
              <line
                key={`line-${index}`}
                x1={prevLesson.x}
                y1={prevLesson.y}
                x2={lesson.x}
                y2={lesson.y}
                stroke={lessonColor}
                strokeWidth="0.5"
                strokeDasharray="1,1"
                opacity="0.8"
                style={{
                  animation: 'flow 2s linear infinite'
                }}
              />
            );
          }
          return null;
        })}
      </svg>
      
      {/* CSS animations */}
      <style>
        {`
          @keyframes flow {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -10; }
          }
        `}
      </style>
    </div>
  );
}

export default SwedenMap; 