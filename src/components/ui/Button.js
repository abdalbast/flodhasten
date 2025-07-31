import React from 'react';
import { componentStyles, designTokens } from '../../styles/designSystem';

const Button = React.memo(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  onClick, 
  type = 'button',
  className = '',
  'aria-label': ariaLabel,
  ...props 
}) => {
  const baseStyle = componentStyles.button.base;
  const variantStyle = componentStyles.button.variants[variant] || componentStyles.button.variants.primary;
  const sizeStyle = componentStyles.button.sizes[size] || componentStyles.button.sizes.md;

  const buttonStyle = {
    ...baseStyle,
    ...variantStyle,
    ...sizeStyle,
    ...(disabled && { opacity: 0.6, cursor: 'not-allowed' })
  };

  return (
    <button
      type={type}
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
      className={className}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button; 