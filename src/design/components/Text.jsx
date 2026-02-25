import React from 'react';
import { cx } from '../utils/cx';
import './primitives.css';

const VARIANT_CLASS = {
  display: 'fd-text-display',
  title: 'fd-text-title',
  section: 'fd-text-section',
  bodyLg: 'fd-text-bodyLg',
  body: 'fd-text-body',
  caption: 'fd-text-caption',
  micro: 'fd-text-micro'
};

const WEIGHT_CLASS = {
  regular: 'fd-text-regular',
  medium: 'fd-text-medium',
  semibold: 'fd-text-semibold'
};

const COLOR_CLASS = {
  primary: 'fd-text-primary',
  secondary: 'fd-text-secondary',
  muted: 'fd-text-muted',
  accent: 'fd-text-accent',
  success: 'fd-text-success',
  danger: 'fd-text-danger',
  warning: 'fd-text-warning'
};

/**
 * @param {{
 *  as?: keyof JSX.IntrinsicElements,
 *  variant?: keyof typeof VARIANT_CLASS,
 *  weight?: keyof typeof WEIGHT_CLASS,
 *  color?: keyof typeof COLOR_CLASS,
 *  align?: 'left' | 'center' | 'right',
 *  serif?: boolean,
 *  truncate?: boolean,
 *  className?: string,
 *  children?: React.ReactNode
 * }} props
 */
function Text({
  as: Component = 'p',
  variant = 'body',
  weight = 'regular',
  color = 'primary',
  align = 'left',
  serif = false,
  truncate = false,
  className,
  children,
  ...rest
}) {
  return (
    <Component
      className={cx(
        'fd-text',
        VARIANT_CLASS[variant] || VARIANT_CLASS.body,
        WEIGHT_CLASS[weight] || WEIGHT_CLASS.regular,
        COLOR_CLASS[color] || COLOR_CLASS.primary,
        serif ? 'fd-text-serif' : 'fd-text-sans',
        align === 'center' && 'fd-text-center',
        truncate && 'fd-text-truncate',
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}

export default Text;
