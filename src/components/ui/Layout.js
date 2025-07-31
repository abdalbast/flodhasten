import React from 'react';
import { designTokens, getThemeColors } from '../../styles/designSystem';

const Layout = React.memo(({ 
  children, 
  isDarkMode = false, 
  maxWidth = '1200px',
  padding = designTokens.spacing[6],
  className = '',
  ...props 
}) => {
  const themeColors = getThemeColors(isDarkMode);

  const containerStyle = {
    maxWidth,
    margin: '0 auto',
    padding: `0 ${padding}`,
    minHeight: '100vh',
    backgroundColor: themeColors.background,
    color: themeColors.text
  };

  return (
    <div style={containerStyle} className={className} {...props}>
      {children}
    </div>
  );
});

// Grid Layout Component
const Grid = React.memo(({ 
  children, 
  columns = 1, 
  gap = designTokens.spacing[4],
  className = '',
  ...props 
}) => {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap,
    width: '100%'
  };

  return (
    <div style={gridStyle} className={className} {...props}>
      {children}
    </div>
  );
});

// Section Component
const Section = React.memo(({ 
  children, 
  title,
  subtitle,
  isDarkMode = false,
  className = '',
  ...props 
}) => {
  const themeColors = getThemeColors(isDarkMode);

  const sectionStyle = {
    marginBottom: designTokens.spacing[8]
  };

  const titleStyle = {
    fontSize: designTokens.typography.fontSize['2xl'],
    fontWeight: designTokens.typography.fontWeight.bold,
    color: themeColors.text,
    marginBottom: designTokens.spacing[2]
  };

  const subtitleStyle = {
    fontSize: designTokens.typography.fontSize.lg,
    color: themeColors.textSecondary,
    marginBottom: designTokens.spacing[6]
  };

  return (
    <section style={sectionStyle} className={className} {...props}>
      {title && <h2 style={titleStyle}>{title}</h2>}
      {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
      {children}
    </section>
  );
});

// Container Component
const Container = React.memo(({ 
  children, 
  isDarkMode = false,
  className = '',
  ...props 
}) => {
  const themeColors = getThemeColors(isDarkMode);

  const containerStyle = {
    backgroundColor: themeColors.surface,
    borderRadius: designTokens.borderRadius.xl,
    padding: designTokens.spacing[6],
    boxShadow: designTokens.shadows.sm,
    border: `1px solid ${isDarkMode ? designTokens.colors.neutral[700] : designTokens.colors.neutral[200]}`
  };

  return (
    <div style={containerStyle} className={className} {...props}>
      {children}
    </div>
  );
});

export { Layout, Grid, Section, Container };
export default Layout; 