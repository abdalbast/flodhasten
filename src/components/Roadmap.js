import React, { useState, useEffect } from 'react';
import SwedenMap from './SwedenMap';

function Roadmap({ skills, progress, onSelectSkill, isDarkMode }) {
  const [selectedSkillId, setSelectedSkillId] = useState(null);
  const [hoveredSkillId, setHoveredSkillId] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [completedSkills, setCompletedSkills] = useState(new Set());
  const [selectedSkillPosition, setSelectedSkillPosition] = useState({ x: 0, y: 0 });
  const [currentLesson, setCurrentLesson] = useState('lesson1');
  
  const textColor = isDarkMode ? '#ffffff' : '#000000';
  const unlockedBg = isDarkMode ? '#2d2d2d' : '#fffde7';
  const lockedBg = isDarkMode ? '#555555' : '#eee';
  const completedBg = '#81c784';
  const unlockedBorder = isDarkMode ? '#fbc02d' : '#fbc02d';
  const lockedBorder = isDarkMode ? '#888888' : '#bbb';
  const completedBorder = '#388e3c';
  const unlockedShadow = isDarkMode ? '0 2px 8px rgba(251, 192, 45, 0.3)' : '0 2px 8px #ffe082';

  // Track completed skills for animations
  useEffect(() => {
    const completed = new Set();
    skills.forEach(skill => {
      if (progress[skill.id] >= 100) {
        completed.add(skill.id);
      }
    });
    setCompletedSkills(completed);
  }, [progress, skills]);

  const handleSkillClick = (skillId, event) => {
    const skill = skills.find(s => s.id === skillId);
    if (!skill) return;

    const isCompleted = progress[skillId] >= 100;
    if (isCompleted) {
      setSelectedSkillId(skillId);
      setCurrentLesson(skillId);
      
      // Get the position of the circle element using the data attribute
      const circleElement = event.target.closest('[data-skill-circle]') || event.currentTarget.querySelector('[data-skill-circle]');
      const rect = circleElement.getBoundingClientRect();
      const containerRect = circleElement.closest('[data-roadmap-container]').getBoundingClientRect();
      
      // Calculate position relative to the container
      const relativeX = rect.left - containerRect.left + rect.width / 2;
      const relativeY = rect.bottom - containerRect.top + 20; // 20px gap below the skill
      
      console.log('Skill clicked:', skillId);
      console.log('Circle rect:', rect);
      console.log('Container rect:', containerRect);
      console.log('Calculated position:', { x: relativeX, y: relativeY });
      
      setSelectedSkillPosition({
        x: relativeX,
        y: relativeY
      });
    }
  };

  const handleStartLesson = () => {
    if (selectedSkillId) {
      onSelectSkill(selectedSkillId);
      setSelectedSkillId(null);
    }
  };

  const handleSkillHover = (skillId, event) => {
    setHoveredSkillId(skillId);
    setShowTooltip(true);
    setCurrentLesson(skillId);
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  };

  const handleSkillLeave = () => {
    setHoveredSkillId(null);
    setShowTooltip(false);
  };

  const getSkillStatus = (skill, index) => {
    const isUnlocked = index === 0 || (progress[skills[index - 1].id] >= 100);
    const isCompleted = progress[skill.id] >= 100;
    const progressValue = progress[skill.id] || 0;
    const isInProgress = progressValue > 0 && progressValue < 100;
    
    return { isUnlocked, isCompleted, progressValue, isInProgress };
  };

  const getSkillAnimation = (skillId, isCompleted) => {
    if (isCompleted && completedSkills.has(skillId)) {
      return {
        animation: 'skillCompletePop 0.6s ease-out',
        transform: 'scale(1.1)',
        transition: 'all 0.3s ease'
      };
    }
    return {};
  };

  const getGrammarTip = (skillId) => {
    const grammarTips = {
      'lesson1': 'In Swedish, "hej" is the most common greeting. It can be used at any time of day, unlike English where we have different greetings for morning, afternoon, and evening.',
      'lesson2': 'Swedish doesn\'t use articles like "a" or "an" before nouns. Instead, the article is built into the noun itself. For example, "en hund" means "a dog".',
      'lesson3': 'Swedish verbs don\'t change form based on the subject like in English. "Jag är" (I am), "du är" (you are), "han är" (he is) all use the same verb form.',
      'lesson4': 'In Swedish, the adjective usually comes before the noun, just like in English. However, the adjective must agree with the noun in gender and number.',
      'lesson5': 'Swedish has two grammatical genders: common (en) and neuter (ett). Most nouns are common gender, but you need to learn which gender each noun has.',
      'lesson6': 'Swedish word order is generally Subject-Verb-Object (SVO), just like English. However, in questions, the verb often comes before the subject.',
      'lesson7': 'Swedish has a unique sound called "sj" that doesn\'t exist in English. It\'s pronounced like a soft "sh" sound, as in "sjö" (lake).',
      'lesson8': 'In Swedish, you can often omit the subject pronoun when it\'s clear from context. For example, "är trött" can mean "I am tired" if the context is clear.',
      'lesson9': 'Swedish has compound words, where two or more words are joined together. For example, "hundmat" means "dog food" (hund + mat).',
      'lesson10': 'Swedish uses the same word for "yes" and "yeah" - "ja". There\'s no distinction between formal and informal like in some other languages.',
      'lesson11': 'Swedish has a unique letter "å" which is pronounced like the "o" in "more". It\'s one of the three extra letters in the Swedish alphabet.',
      'lesson12': 'Swedish has a musical quality with its pitch accent. Some words that are spelled the same have different meanings based on the pitch pattern.'
    };
    return grammarTips[skillId] || 'Learn essential grammar concepts to build a strong foundation in Swedish.';
  };

  const getStoryTeaser = (skillId) => {
    const storyTeasers = {
      'lesson1': 'Join Anna and Erik as they meet for the first time at a cozy café in Stockholm. Learn how to greet people and make a great first impression!',
      'lesson2': 'Follow Anna as she explores her new neighbourhood and meets her friendly neighbours. Discover how to introduce yourself and ask simple questions.',
      'lesson3': 'Anna visits a local market to buy groceries for dinner. Learn essential vocabulary for food and shopping while helping her navigate the bustling market.',
      'lesson4': 'Anna and Erik plan a weekend trip to the countryside. Practice describing places and making plans while they explore beautiful Swedish nature.',
      'lesson5': 'Anna starts her new job at a Swedish company. Learn workplace vocabulary and cultural norms as she adapts to her new professional environment.',
      'lesson6': 'Anna and her colleagues go out for lunch together. Experience Swedish dining culture and learn how to order food and make conversation at restaurants.',
      'lesson7': 'Anna visits a Swedish family for dinner. Discover family vocabulary and cultural traditions while experiencing authentic Swedish hospitality.',
      'lesson8': 'Anna explores Stockholm\'s famous museums and landmarks. Learn vocabulary for tourism and culture while discovering Sweden\'s rich history.',
      'lesson9': 'Anna and Erik go on a romantic date in the city. Practice romantic vocabulary and expressions while they enjoy a perfect evening together.',
      'lesson10': 'Anna faces some challenges with her Swedish studies. Learn how to express difficulties and ask for help in Swedish.',
      'lesson11': 'Anna celebrates her first Swedish holiday with friends. Experience Swedish celebrations and learn seasonal vocabulary and traditions.',
      'lesson12': 'Anna reflects on her journey learning Swedish and plans her future in Sweden. Practice advanced expressions and look forward to new adventures!'
    };
    return storyTeasers[skillId] || 'Immerse yourself in authentic Swedish conversations and cultural experiences through our interactive story scenes.';
  };

  return (
    <div style={{ 
      padding: '20px',
      maxWidth: '1000px',
      margin: '0 auto',
      color: textColor
    }}>
      <style>
        {`
          @keyframes flow {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -10; }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.8; }
          }
          
          @keyframes skillCompletePop {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1.1); }
          }
        `}
      </style>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '30px',
        fontSize: '2rem',
        fontWeight: 'bold',
        background: isDarkMode 
          ? 'linear-gradient(135deg, #64b5f6, #2196f3)'
          : 'linear-gradient(135deg, #1976d2, #42a5f5)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        Learn with the River Horse
      </h2>
      
      <div 
        data-roadmap-container
        style={{ 
          position: 'relative',
          margin: '2rem 0',
          minHeight: '600px'
        }}
      >
        {/* Sweden Map Background */}
        <SwedenMap 
          isDarkMode={isDarkMode} 
          currentLesson={currentLesson}
          skills={skills}
          progress={progress}
          onSelectSkill={onSelectSkill}
        />
        
        {/* Lesson Progress Summary */}
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: isDarkMode ? 'rgba(45, 45, 45, 0.9)' : 'rgba(255, 255, 255, 0.9)',
          padding: '15px',
          borderRadius: '10px',
          border: `2px solid ${isDarkMode ? '#64b5f6' : '#2196f3'}`,
          zIndex: 10,
          minWidth: '200px'
        }}>
          <h3 style={{
            margin: '0 0 10px 0',
            fontSize: '1.1rem',
            color: isDarkMode ? '#64b5f6' : '#2196f3',
            textAlign: 'center'
          }}>
            📚 Lesson Progress
          </h3>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '5px',
            fontSize: '0.9rem'
          }}>
            <span>Completed:</span>
            <span style={{ color: '#4caf50', fontWeight: 'bold' }}>
              {skills.filter(skill => progress[skill.id] >= 100).length}/{skills.length}
            </span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.9rem'
          }}>
            <span>Current:</span>
            <span style={{ color: '#ff9800', fontWeight: 'bold' }}>
              {skills.findIndex(skill => progress[skill.id] > 0 && progress[skill.id] < 100) + 1 || 'None'}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Tooltip */}
      {showTooltip && hoveredSkillId && (
        <div style={{
          position: 'fixed',
          left: tooltipPosition.x,
          top: tooltipPosition.y,
          transform: 'translateX(-50%) translateY(-100%)',
          background: isDarkMode ? '#2d2d2d' : '#ffffff',
          border: `2px solid ${isDarkMode ? '#64b5f6' : '#2196f3'}`,
          borderRadius: '8px',
          padding: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          zIndex: 1000,
          maxWidth: '250px',
          pointerEvents: 'none'
        }}>
          <div style={{
            fontWeight: 'bold',
            color: isDarkMode ? '#64b5f6' : '#2196f3',
            marginBottom: '8px',
            textAlign: 'center'
          }}>
            {skills.find(s => s.id === hoveredSkillId)?.name}
          </div>
          <div style={{
            fontSize: '0.9rem',
            color: isDarkMode ? '#ccc' : '#666',
            textAlign: 'center'
          }}>
            {skills.find(s => s.id === hoveredSkillId)?.words?.length || 0} words to learn
          </div>
          <div style={{
            fontSize: '0.8rem',
            color: isDarkMode ? '#888' : '#999',
            textAlign: 'center',
            marginTop: '4px'
          }}>
            Click to start lesson
          </div>
        </div>
      )}

      {selectedSkillId && (
        <div style={{
          position: 'absolute',
          left: selectedSkillPosition.x,
          top: selectedSkillPosition.y,
          transform: 'translateX(-50%)',
          background: isDarkMode ? '#2d2d2d' : '#f5f5f5',
          padding: '20px',
          borderRadius: '10px',
          border: `2px solid ${isDarkMode ? '#64b5f6' : '#2196f3'}`,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          zIndex: 10,
          minWidth: '300px',
          maxWidth: '400px',
          pointerEvents: 'auto'
        }}
        >
          {/* Debug info - remove after testing */}
          <div style={{ fontSize: '10px', color: '#666', marginBottom: '10px' }}>
            Position: {selectedSkillPosition.x}, {selectedSkillPosition.y}
          </div>
          <h3 style={{
            marginBottom: '20px',
            color: isDarkMode ? '#64b5f6' : '#2196f3',
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}>
            📚 {skills.find(s => s.id === selectedSkillId)?.name}
          </h3>
          
          {/* Grammar Tip Section */}
          <div style={{
            background: isDarkMode ? '#1a1a1a' : '#ffffff',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '20px',
            border: `1px solid ${isDarkMode ? '#444' : '#ddd'}`,
            borderLeft: `4px solid ${isDarkMode ? '#ff9800' : '#ffa726'}`
          }}>
            <h4 style={{
              marginBottom: '10px',
              color: isDarkMode ? '#ff9800' : '#ffa726',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              💡 Grammar Tip
            </h4>
            <div style={{
              color: isDarkMode ? '#ccc' : '#666',
              fontSize: '0.95rem',
              lineHeight: '1.4'
            }}>
              {getGrammarTip(selectedSkillId)}
            </div>
          </div>
          
          {/* Highlighted Vocabulary Section */}
          <div style={{
            background: isDarkMode ? '#1a1a1a' : '#ffffff',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '20px',
            border: `1px solid ${isDarkMode ? '#444' : '#ddd'}`,
            borderLeft: `4px solid ${isDarkMode ? '#4caf50' : '#66bb6a'}`
          }}>
            <h4 style={{
              marginBottom: '15px',
              color: isDarkMode ? '#4caf50' : '#66bb6a',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              🎯 Key Vocabulary
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '12px'
            }}>
              {skills.find(s => s.id === selectedSkillId)?.words.map((word, index) => (
                <div key={index} style={{
                  background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
                  padding: '12px',
                  borderRadius: '6px',
                  border: `2px solid ${isDarkMode ? '#4caf50' : '#66bb6a'}`,
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
                >
                  <div style={{ 
                    fontWeight: 'bold', 
                    marginBottom: '5px',
                    fontSize: '1.1rem',
                    color: isDarkMode ? '#4caf50' : '#66bb6a'
                  }}>
                    {word.swedish}
                  </div>
                  <div style={{ 
                    fontSize: '0.9rem', 
                    color: isDarkMode ? '#ccc' : '#666',
                    fontStyle: 'italic'
                  }}>
                    {word.english}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Story Scene Teaser */}
          <div style={{
            background: isDarkMode ? '#1a1a1a' : '#ffffff',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '20px',
            border: `1px solid ${isDarkMode ? '#444' : '#ddd'}`,
            borderLeft: `4px solid ${isDarkMode ? '#9c27b0' : '#ab47bc'}`
          }}>
            <h4 style={{
              marginBottom: '10px',
              color: isDarkMode ? '#9c27b0' : '#ab47bc',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              📖 Story Scene Teaser
            </h4>
            <div style={{
              color: isDarkMode ? '#ccc' : '#666',
              fontSize: '0.95rem',
              lineHeight: '1.4',
              fontStyle: 'italic'
            }}>
              {getStoryTeaser(selectedSkillId)}
            </div>
          </div>
          
          {/* Dialogue Introduction */}
          {skills.find(s => s.id === selectedSkillId)?.dialogue && (
            <div style={{
              background: isDarkMode ? '#1a1a1a' : '#ffffff',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px',
              border: `1px solid ${isDarkMode ? '#444' : '#ddd'}`,
              borderLeft: `4px solid ${isDarkMode ? '#2196f3' : '#42a5f5'}`
            }}>
              <h4 style={{
                marginBottom: '10px',
                color: isDarkMode ? '#2196f3' : '#42a5f5',
                textAlign: 'center',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}>
                💬 {skills.find(s => s.id === selectedSkillId)?.dialogue.title}
              </h4>
              <div style={{ textAlign: 'center' }}>
                {skills.find(s => s.id === selectedSkillId)?.dialogue.lines.map((line, index) => (
                  <div key={index} style={{
                    marginBottom: '8px',
                    padding: '10px',
                    background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
                    borderRadius: '6px',
                    borderLeft: `3px solid ${isDarkMode ? '#2196f3' : '#42a5f5'}`,
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateX(4px)';
                    e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateX(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                  >
                    <span style={{
                      fontWeight: 'bold',
                      color: isDarkMode ? '#2196f3' : '#42a5f5',
                      marginRight: '10px'
                    }}>
                      {line.speaker}:
                    </span>
                    <span>{line.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <button
            onClick={handleStartLesson}
            style={{
              width: '100%',
              padding: '15px',
              background: isDarkMode ? '#4caf50' : '#66bb6a',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              transform: 'translateY(0)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }}
            onMouseDown={(e) => {
              e.target.style.transform = 'translateY(0)';
            }}
            onMouseUp={(e) => {
              e.target.style.transform = 'translateY(-2px)';
            }}
          >
            🚀 Start Lesson
          </button>
          
          {/* Close button */}
          <button
            onClick={() => setSelectedSkillId(null)}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'none',
              border: 'none',
              color: isDarkMode ? '#ccc' : '#666',
              fontSize: '1.2rem',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = isDarkMode ? '#444' : '#eee';
              e.target.style.color = isDarkMode ? '#fff' : '#000';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'none';
              e.target.style.color = isDarkMode ? '#ccc' : '#666';
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

export default Roadmap; 