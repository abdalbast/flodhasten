// Flodhästen Design System
// Consistent design tokens for typography, colors, spacing, and components

export const designTokens = {
  // Typography Scale
  typography: {
    fontFamily: {
      primary: "'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      mono: "'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Source Code Pro', 'Menlo', 'Consolas', 'DejaVu Sans Mono', monospace"
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem'      // 48px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75
    }
  },

  // Color Palette - Moomin-inspired with accessibility in mind
  colors: {
    // Primary Colors
    primary: {
      50: '#e3f2fd',
      100: '#bbdefb',
      200: '#90caf9',
      300: '#64b5f6',
      400: '#42a5f5',
      500: '#2196f3', // Main brand color
      600: '#1e88e5',
      700: '#1976d2',
      800: '#1565c0',
      900: '#0d47a1'
    },
    
    // Secondary Colors
    secondary: {
      50: '#e8f5e8',
      100: '#c8e6c9',
      200: '#a5d6a7',
      300: '#81c784',
      400: '#66bb6a',
      500: '#4caf50', // Success green
      600: '#43a047',
      700: '#388e3c',
      800: '#2e7d32',
      900: '#1b5e20'
    },

    // Accent Colors
    accent: {
      yellow: '#f1c40f',  // Moomin yellow
      orange: '#e67e22',  // Moomin orange
      pink: '#e91e63',    // Moomin pink
      purple: '#9c27b0'   // Moomin purple
    },

    // Neutral Colors
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121'
    },

    // Semantic Colors
    semantic: {
      success: '#4caf50',
      warning: '#ff9800',
      error: '#f44336',
      info: '#2196f3'
    },

    // Dark Mode Colors
    dark: {
      background: '#121212',
      surface: '#1e1e1e',
      primary: '#90caf9',
      text: '#ffffff',
      textSecondary: '#b3b3b3'
    }
  },

  // Spacing Scale
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem'      // 96px
  },

  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    base: '0.25rem',  // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px'
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },

  // Z-Index Scale
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800
  }
};

// Component Styles
export const componentStyles = {
  // Button Styles
  button: {
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      borderRadius: designTokens.borderRadius.lg,
      fontWeight: designTokens.typography.fontWeight.medium,
      fontSize: designTokens.typography.fontSize.base,
      lineHeight: designTokens.typography.lineHeight.normal,
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
      minHeight: '44px', // Accessibility: minimum touch target
      padding: `${designTokens.spacing[3]} ${designTokens.spacing[4]}`,
      textDecoration: 'none',
      userSelect: 'none',
      '&:focus': {
        outline: '2px solid',
        outlineOffset: '2px'
      },
      '&:disabled': {
        opacity: 0.6,
        cursor: 'not-allowed'
      }
    },
    variants: {
      primary: {
        backgroundColor: designTokens.colors.primary[500],
        color: 'white',
        '&:hover': {
          backgroundColor: designTokens.colors.primary[600]
        },
        '&:focus': {
          outlineColor: designTokens.colors.primary[500]
        }
      },
      secondary: {
        backgroundColor: designTokens.colors.neutral[100],
        color: designTokens.colors.neutral[800],
        border: `1px solid ${designTokens.colors.neutral[300]}`,
        '&:hover': {
          backgroundColor: designTokens.colors.neutral[200]
        },
        '&:focus': {
          outlineColor: designTokens.colors.primary[500]
        }
      },
      success: {
        backgroundColor: designTokens.colors.semantic.success,
        color: 'white',
        '&:hover': {
          backgroundColor: designTokens.colors.secondary[600]
        }
      },
      danger: {
        backgroundColor: designTokens.colors.semantic.error,
        color: 'white',
        '&:hover': {
          backgroundColor: '#d32f2f'
        }
      }
    },
    sizes: {
      sm: {
        fontSize: designTokens.typography.fontSize.sm,
        padding: `${designTokens.spacing[2]} ${designTokens.spacing[3]}`,
        minHeight: '36px'
      },
      md: {
        fontSize: designTokens.typography.fontSize.base,
        padding: `${designTokens.spacing[3]} ${designTokens.spacing[4]}`,
        minHeight: '44px'
      },
      lg: {
        fontSize: designTokens.typography.fontSize.lg,
        padding: `${designTokens.spacing[4]} ${designTokens.spacing[6]}`,
        minHeight: '52px'
      }
    }
  },

  // Card Styles
  card: {
    base: {
      backgroundColor: 'white',
      borderRadius: designTokens.borderRadius.xl,
      boxShadow: designTokens.shadows.md,
      padding: designTokens.spacing[6],
      border: `1px solid ${designTokens.colors.neutral[200]}`,
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        boxShadow: designTokens.shadows.lg
      }
    },
    dark: {
      backgroundColor: designTokens.colors.dark.surface,
      borderColor: designTokens.colors.neutral[700],
      color: designTokens.colors.dark.text
    }
  },

  // Input Styles
  input: {
    base: {
      width: '100%',
      padding: `${designTokens.spacing[3]} ${designTokens.spacing[4]}`,
      fontSize: designTokens.typography.fontSize.base,
      lineHeight: designTokens.typography.lineHeight.normal,
      border: `1px solid ${designTokens.colors.neutral[300]}`,
      borderRadius: designTokens.borderRadius.md,
      backgroundColor: 'white',
      transition: 'border-color 0.2s ease-in-out',
      minHeight: '44px', // Accessibility: minimum touch target
      '&:focus': {
        outline: 'none',
        borderColor: designTokens.colors.primary[500],
        boxShadow: `0 0 0 3px ${designTokens.colors.primary[100]}`
      },
      '&:disabled': {
        backgroundColor: designTokens.colors.neutral[100],
        cursor: 'not-allowed'
      }
    }
  },

  // Navigation Styles
  navigation: {
    base: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: `${designTokens.spacing[4]} ${designTokens.spacing[6]}`,
      backgroundColor: 'white',
      borderBottom: `1px solid ${designTokens.colors.neutral[200]}`,
      boxShadow: designTokens.shadows.sm,
      position: 'sticky',
      top: 0,
      zIndex: designTokens.zIndex.sticky
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      padding: `${designTokens.spacing[2]} ${designTokens.spacing[4]}`,
      borderRadius: designTokens.borderRadius.md,
      color: designTokens.colors.neutral[600],
      textDecoration: 'none',
      fontWeight: designTokens.typography.fontWeight.medium,
      transition: 'all 0.2s ease-in-out',
      minHeight: '44px', // Accessibility: minimum touch target
      '&:hover': {
        backgroundColor: designTokens.colors.neutral[100],
        color: designTokens.colors.primary[600]
      },
      '&.active': {
        backgroundColor: designTokens.colors.primary[100],
        color: designTokens.colors.primary[700]
      }
    }
  }
};

// Utility Functions
export const getThemeColors = (isDarkMode) => ({
  background: isDarkMode ? designTokens.colors.dark.background : 'white',
  surface: isDarkMode ? designTokens.colors.dark.surface : 'white',
  text: isDarkMode ? designTokens.colors.dark.text : designTokens.colors.neutral[900],
  textSecondary: isDarkMode ? designTokens.colors.dark.textSecondary : designTokens.colors.neutral[600],
  primary: isDarkMode ? designTokens.colors.dark.primary : designTokens.colors.primary[500]
});

// Accessibility Utilities
export const accessibility = {
  // High contrast text colors
  getTextColor: (background, isDarkMode) => {
    if (isDarkMode) return designTokens.colors.dark.text;
    return designTokens.colors.neutral[900];
  },

  // Focus styles
  focusRing: {
    outline: '2px solid',
    outlineOffset: '2px',
    outlineColor: designTokens.colors.primary[500]
  },

  // Screen reader only text
  srOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: 0
  }
}; 