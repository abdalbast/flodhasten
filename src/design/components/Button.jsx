import React from 'react';
import { cx } from '../utils/cx';
import Text from './Text';
import './primitives.css';

/**
 * @param {{
 *  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive',
 *  loading?: boolean,
 *  disabled?: boolean,
 *  fullWidth?: boolean,
 *  leftIcon?: React.ReactNode,
 *  rightIcon?: React.ReactNode,
 *  children?: React.ReactNode,
 *  className?: string,
 *  'aria-label'?: string
 * } & React.ButtonHTMLAttributes<HTMLButtonElement>} props
 */
function Button({
  variant = 'primary',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  className,
  type = 'button',
  ...rest
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      className={cx(
        'fd-button',
        `fd-button-${variant}`,
        fullWidth && 'fd-button-fullWidth',
        isDisabled && 'fd-button-disabled',
        className
      )}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <span className="fd-button-spinner" aria-hidden="true" />
      ) : leftIcon ? (
        <span aria-hidden="true">{leftIcon}</span>
      ) : null}

      <Text as="span" variant="body" weight="medium" className="fd-button-label">
        {children}
      </Text>

      {!loading && rightIcon ? <span aria-hidden="true">{rightIcon}</span> : null}
    </button>
  );
}

export default Button;
