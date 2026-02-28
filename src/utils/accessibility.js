/* eslint-disable default-case */
// Accessibility utilities for Flodhästen

/**
 * Check if two colors have sufficient contrast ratio
 * @param {string} color1 - First color (hex, rgb, or hsl)
 * @param {string} color2 - Second color (hex, rgb, or hsl)
 * @param {number} ratio - Minimum contrast ratio (default: 4.5 for normal text)
 * @returns {boolean} - Whether the contrast is sufficient
 */
export function hasSufficientContrast(color1, color2, ratio = 4.5) {
  const luminance1 = getLuminance(color1);
  const luminance2 = getLuminance(color2);
  
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  
  const contrastRatio = (lighter + 0.05) / (darker + 0.05);
  
  return contrastRatio >= ratio;
}

/**
 * Calculate relative luminance of a color
 * @param {string} color - Color in hex, rgb, or hsl format
 * @returns {number} - Relative luminance (0-1)
 */
function getLuminance(color) {
  const rgb = parseColor(color);
  const [r, g, b] = rgb.map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Parse color string to RGB values
 * @param {string} color - Color string
 * @returns {number[]} - RGB values [r, g, b]
 */
function parseColor(color) {
  // Remove whitespace and convert to lowercase
  color = color.trim().toLowerCase();
  
  // Handle hex colors
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return [r, g, b];
  }
  
  // Handle rgb() colors
  if (color.startsWith('rgb(')) {
    const values = color.match(/\d+/g);
    return values.map(v => parseInt(v));
  }
  
  // Handle rgba() colors
  if (color.startsWith('rgba(')) {
    const values = color.match(/[\d.]+/g);
    return values.slice(0, 3).map(v => parseInt(v));
  }
  
  // Handle hsl() colors
  if (color.startsWith('hsl(')) {
    return hslToRgb(color);
  }
  
  // Handle hsla() colors
  if (color.startsWith('hsla(')) {
    return hslToRgb(color);
  }
  
  // Default fallback
  return [0, 0, 0];
}

/**
 * Convert HSL to RGB
 * @param {string} hsl - HSL color string
 * @returns {number[]} - RGB values [r, g, b]
 */
function hslToRgb(hsl) {
  const values = hsl.match(/[\d.]+/g);
  const h = parseInt(values[0]) / 360;
  const s = parseInt(values[1]) / 100;
  const l = parseInt(values[2]) / 100;
  
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  
  if (s === 0) {
    const rgb = Math.round(l * 255);
    return [rgb, rgb, rgb];
  }
  
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  
  const r = Math.round(hue2rgb(p, q, h + 1/3) * 255);
  const g = Math.round(hue2rgb(p, q, h) * 255);
  const b = Math.round(hue2rgb(p, q, h - 1/3) * 255);
  
  return [r, g, b];
}

/**
 * Focus management utilities
 */
export const focusManager = {
  /**
   * Trap focus within a container
   * @param {HTMLElement} container - Container element
   * @param {HTMLElement} firstFocusable - First focusable element
   * @param {HTMLElement} lastFocusable - Last focusable element
   */
  trapFocus(container, firstFocusable, lastFocusable) {
    const handleTabKey = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }
    };
    
    container.addEventListener('keydown', handleTabKey);
    
    // Return cleanup function
    return () => container.removeEventListener('keydown', handleTabKey);
  },
  
  /**
   * Focus first focusable element in a container
   * @param {HTMLElement} container - Container element
   */
  focusFirstFocusable(container) {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  },
  
  /**
   * Focus last focusable element in a container
   * @param {HTMLElement} container - Container element
   */
  focusLastFocusable(container) {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length > 0) {
      focusableElements[focusableElements.length - 1].focus();
    }
  }
};

/**
 * Screen reader utilities
 */
export const screenReader = {
  /**
   * Announce a message to screen readers
   * @param {string} message - Message to announce
   * @param {string} priority - Priority level ('polite' or 'assertive')
   */
  announce(message, priority = 'polite') {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },
  
  /**
   * Announce page title change
   * @param {string} title - New page title
   */
  announcePageChange(title) {
    document.title = `Flodhästen - ${title}`;
    this.announce(`Navigated to ${title}`, 'assertive');
  }
};

/**
 * Keyboard navigation utilities
 */
export const keyboardNavigation = {
  /**
   * Handle arrow key navigation in a list
   * @param {KeyboardEvent} event - Keyboard event
   * @param {number} currentIndex - Current selected index
   * @param {number} maxIndex - Maximum index
   * @param {Function} onSelect - Callback when item is selected
   * @returns {number} - New selected index
   */
  handleArrowKeys(event, currentIndex, maxIndex, onSelect) {
    let newIndex = currentIndex;
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        newIndex = Math.min(currentIndex + 1, maxIndex);
        break;
      case 'ArrowUp':
        event.preventDefault();
        newIndex = Math.max(currentIndex - 1, 0);
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = maxIndex;
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (onSelect) onSelect(currentIndex);
        break;
    }
    
    return newIndex;
  },
  
  /**
   * Handle number key navigation
   * @param {KeyboardEvent} event - Keyboard event
   * @param {number} maxNumber - Maximum number
   * @param {Function} onSelect - Callback when number is selected
   */
  handleNumberKeys(event, maxNumber, onSelect) {
    const key = event.key;
    const number = parseInt(key);
    
    if (number >= 1 && number <= maxNumber) {
      event.preventDefault();
      if (onSelect) onSelect(number - 1);
    }
  }
};

/**
 * Color scheme utilities
 */
export const colorScheme = {
  /**
   * Get accessible text color for a background
   * @param {string} backgroundColor - Background color
   * @returns {string} - Accessible text color
   */
  getAccessibleTextColor(backgroundColor) {
    const white = '#ffffff';
    const black = '#000000';
    
    const whiteContrast = hasSufficientContrast(backgroundColor, white, 4.5);
    const blackContrast = hasSufficientContrast(backgroundColor, black, 4.5);
    
    if (whiteContrast && !blackContrast) {
      return white;
    } else if (blackContrast && !whiteContrast) {
      return black;
    } else {
      // If both work, prefer the one with higher contrast
      const whiteRatio = this.getContrastRatio(backgroundColor, white);
      const blackRatio = this.getContrastRatio(backgroundColor, black);
      return whiteRatio > blackRatio ? white : black;
    }
  },
  
  /**
   * Get contrast ratio between two colors
   * @param {string} color1 - First color
   * @param {string} color2 - Second color
   * @returns {number} - Contrast ratio
   */
  getContrastRatio(color1, color2) {
    const luminance1 = getLuminance(color1);
    const luminance2 = getLuminance(color2);
    
    const lighter = Math.max(luminance1, luminance2);
    const darker = Math.min(luminance1, luminance2);
    
    return (lighter + 0.05) / (darker + 0.05);
  }
};

/**
 * Form accessibility utilities
 */
export const formAccessibility = {
  /**
   * Validate form field accessibility
   * @param {HTMLElement} field - Form field element
   * @returns {Object} - Validation results
   */
  validateField(field) {
    const results = {
      hasLabel: false,
      hasDescription: false,
      hasError: false,
      isValid: true
    };
    
    // Check for label
    const label = field.querySelector('label');
    const ariaLabel = field.getAttribute('aria-label');
    const ariaLabelledBy = field.getAttribute('aria-labelledby');
    
    results.hasLabel = !!(label || ariaLabel || ariaLabelledBy);
    
    // Check for description
    const ariaDescribedBy = field.getAttribute('aria-describedby');
    results.hasDescription = !!ariaDescribedBy;
    
    // Check for error state
    const ariaInvalid = field.getAttribute('aria-invalid');
    results.hasError = ariaInvalid === 'true';
    
    results.isValid = results.hasLabel && !results.hasError;
    
    return results;
  },
  
  /**
   * Add error message to form field
   * @param {HTMLElement} field - Form field element
   * @param {string} message - Error message
   */
  addErrorMessage(field, message) {
    const errorId = `${field.id || 'field'}-error`;
    const errorElement = document.createElement('div');
    errorElement.id = errorId;
    errorElement.className = 'error-message';
    errorElement.setAttribute('role', 'alert');
    errorElement.textContent = message;
    
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', errorId);
    
    field.parentNode.insertBefore(errorElement, field.nextSibling);
  },
  
  /**
   * Remove error message from form field
   * @param {HTMLElement} field - Form field element
   */
  removeErrorMessage(field) {
    const errorId = field.getAttribute('aria-describedby');
    if (errorId) {
      const errorElement = document.getElementById(errorId);
      if (errorElement) {
        errorElement.remove();
      }
      field.removeAttribute('aria-invalid');
      field.removeAttribute('aria-describedby');
    }
  }
};

// Export all utilities
const accessibilityUtils = {
  hasSufficientContrast,
  focusManager,
  screenReader,
  keyboardNavigation,
  colorScheme,
  formAccessibility
};

export default accessibilityUtils;
