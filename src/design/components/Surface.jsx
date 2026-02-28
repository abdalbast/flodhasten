import React from 'react';
import { cx } from '../utils/cx';
import './primitives.css';

/**
 * @param {{
 *  as?: keyof JSX.IntrinsicElements,
 *  elevation?: 'none' | 'low' | 'medium' | 'high',
 *  padding?: 'none' | 'sm' | 'md' | 'lg',
 *  bordered?: boolean,
 *  interactive?: boolean,
 *  tone?: 'default' | 'paper' | 'tint' | 'success' | 'danger' | 'warning',
 *  radius?: number | string,
 *  className?: string,
 *  children?: React.ReactNode
 * }} props
 */
function Surface({
  as: Component = 'div',
  elevation = 'none',
  padding = 'none',
  bordered = false,
  interactive = false,
  tone = 'default',
  radius,
  className,
  style,
  children,
  ...rest
}) {
  return (
    <Component
      className={cx(
        'fd-surface',
        `fd-surface-elevation-${elevation}`,
        padding !== 'none' && `fd-surface-padded-${padding}`,
        bordered && 'fd-surface-bordered',
        interactive && 'fd-surface-interactive',
        tone !== 'default' && `fd-surface-${tone}`,
        className
      )}
      style={{
        ...(radius ? { borderRadius: radius } : null),
        ...style
      }}
      {...rest}
    >
      {children}
    </Component>
  );
}

export default Surface;
