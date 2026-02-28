import React from 'react';
import SwedenMap from './SwedenMap';
import { Stack, Surface, Text } from '../design/components';

function Explore({ skills, progress, onSelectSkill, isDarkMode, currentLanguage }) {
  const heroTitle =
    currentLanguage === 'ku'
      ? 'لەگەڵ ئەسپە ڕووبارەکە فێربە'
      : currentLanguage === 'ku-lat'
        ? 'Lêgel Espê Rûbarê Fêrbê'
        : 'Learn with the River Horse';

  const heroSubtitle =
    currentLanguage === 'ku'
      ? 'پێشکەوتنەکەت لە سوید ببینە'
      : currentLanguage === 'ku-lat'
        ? 'Pêşketinêket le Swêd bibîne'
        : 'Explore your progress across Sweden';

  const summaryTitle =
    currentLanguage === 'ku'
      ? 'کورتەی پێشکەوتنی وانەکان'
      : currentLanguage === 'ku-lat'
        ? 'Kurtay Pêşketinê Wane'
        : 'Lesson Progress Summary';

  return (
    <div style={{ textAlign: 'center', padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <Surface
        elevation="medium"
        bordered
        padding="lg"
        className="relative overflow-hidden"
        style={{
          marginBottom: '2rem',
          borderRadius: '24px',
          background: isDarkMode
            ? 'linear-gradient(180deg, rgba(42,39,34,0.95), rgba(36,33,29,0.95))'
            : 'linear-gradient(180deg, rgba(255,255,255,0.9), rgba(147,191,190,0.08))'
        }}
      >
        <Text
          as="h2"
          variant="display"
          serif
          weight="medium"
          align="center"
          style={{
            margin: 0,
            color: isDarkMode ? '#a8ccff' : 'var(--fd-accent-strong)',
            fontSize: 'clamp(2rem, 5vw, 3rem)'
          }}
        >
          {heroTitle}
        </Text>

        <Text
          as="p"
          variant="bodyLg"
          serif
          color="secondary"
          align="center"
          style={{ marginTop: '0.8rem', fontStyle: 'italic' }}
        >
          {heroSubtitle}
        </Text>

        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '28px',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: '#f1c40f',
            opacity: 0.9
          }}
          aria-hidden="true"
        />
        <div
          style={{
            position: 'absolute',
            bottom: '28px',
            left: '36px',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: '#27ae60',
            opacity: 0.85
          }}
          aria-hidden="true"
        />
      </Surface>

      <Surface
        elevation="medium"
        bordered
        className="overflow-hidden"
        style={{
          width: '100%',
          height: '70vh',
          minHeight: '420px',
          borderRadius: '24px',
          marginBottom: '2rem'
        }}
      >
        <SwedenMap
          isDarkMode={isDarkMode}
          currentLesson={null}
          skills={skills}
          progress={progress}
          onSelectSkill={onSelectSkill}
        />
      </Surface>

      <Surface
        elevation="medium"
        bordered
        padding="lg"
        className="relative overflow-hidden"
        style={{ borderRadius: '24px' }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: '#e91e63',
            opacity: 0.8
          }}
          aria-hidden="true"
        />

        <Text
          as="h3"
          variant="title"
          serif
          weight="medium"
          align="center"
          style={{ marginBottom: '1rem', color: 'var(--fd-accent-strong)' }}
        >
          {summaryTitle}
        </Text>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            marginTop: '1rem'
          }}
        >
          {skills.map((skill, index) => {
            const progressValue = progress[skill.id] || 0;
            const isCompleted = progressValue >= 100;
            const isUnlocked = index === 0 || (progress[skills[index - 1].id] >= 100);

            return (
              <Surface
                key={skill.id}
                elevation="low"
                bordered
                padding="md"
                interactive
                style={{
                  position: 'relative',
                  borderRadius: '18px',
                  textAlign: 'left',
                  borderColor: isCompleted
                    ? '#27ae60'
                    : isUnlocked
                      ? 'var(--fd-accent-strong)'
                      : 'var(--fd-border-default)',
                  opacity: isUnlocked ? 1 : 0.72
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: isCompleted ? '#27ae60' : '#ed9382',
                    top: '8px',
                    left: '8px',
                    opacity: isUnlocked ? 1 : 0.35
                  }}
                  aria-hidden="true"
                />

                <Stack direction="row" align="center" justify="space-between" style={{ marginBottom: '0.75rem', position: 'relative' }}>
                  <Text as="span" variant="bodyLg" serif weight="medium" style={{ paddingLeft: '14px' }}>
                    {skill.name}
                  </Text>
                  <Text as="span" variant="section" style={{ opacity: isUnlocked ? 1 : 0.5 }}>
                    {skill.icon || '📚'}
                  </Text>
                </Stack>

                <div
                  style={{
                    width: '100%',
                    height: '10px',
                    background: 'var(--fd-border-default)',
                    borderRadius: '999px',
                    overflow: 'hidden',
                    marginBottom: '0.75rem'
                  }}
                  aria-hidden="true"
                >
                  <div
                    style={{
                      width: `${progressValue}%`,
                      height: '100%',
                      borderRadius: '999px',
                      background: isCompleted ? '#27ae60' : 'var(--fd-accent-strong)',
                      transition: 'width var(--fd-motion-base) var(--fd-ease-standard)'
                    }}
                  />
                </div>

                <Text as="div" variant="caption" color="secondary" align="center" serif style={{ fontStyle: 'italic' }}>
                  {isCompleted ? '✅ Completed' : `${progressValue}% Complete`}
                </Text>
              </Surface>
            );
          })}
        </div>
      </Surface>
    </div>
  );
}

export default Explore;
