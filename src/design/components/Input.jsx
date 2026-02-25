import React, { useId } from 'react';
import { cx } from '../utils/cx';
import Text from './Text';
import './primitives.css';

function SearchAdornment() {
  return (
    <span className="fd-inputAdornment" aria-hidden="true">
      <span className="fd-inputSearchIcon" />
    </span>
  );
}

/**
 * @param {{
 *  label?: React.ReactNode,
 *  helperText?: React.ReactNode,
 *  error?: React.ReactNode,
 *  success?: React.ReactNode,
 *  multiline?: boolean,
 *  rows?: number,
 *  clearable?: boolean,
 *  onClear?: () => void,
 *  startAdornment?: React.ReactNode,
 *  endAdornment?: React.ReactNode,
 *  variant?: 'default' | 'search',
 *  className?: string,
 *  inputClassName?: string
 * } & React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>} props
 */
function Input({
  id,
  label,
  helperText,
  error,
  success,
  multiline = false,
  rows = 4,
  clearable = false,
  onClear,
  startAdornment,
  endAdornment,
  variant = 'default',
  className,
  inputClassName,
  type = 'text',
  value,
  disabled,
  ...rest
}) {
  const generatedId = useId();
  const inputId = id || `fd-input-${generatedId}`;
  const messageId = `${inputId}-message`;
  const tone = error ? 'error' : success ? 'success' : 'default';
  const hasValue = value !== undefined && value !== null && String(value).length > 0;
  const searchMode = variant === 'search' || type === 'search';
  const message = error || success || helperText;

  const commonProps = {
    id: inputId,
    className: cx(
      'fd-inputControl',
      multiline && 'fd-inputControlTextarea',
      inputClassName
    ),
    'aria-invalid': !!error || undefined,
    'aria-describedby': message ? messageId : undefined,
    disabled,
    value,
    ...rest
  };

  const clearButtonVisible = clearable && hasValue && !disabled;

  return (
    <div className={cx('fd-inputField', className)}>
      {label ? (
        <div className="fd-inputLabelRow">
          <label className="fd-inputLabel" htmlFor={inputId}>
            {label}
          </label>
        </div>
      ) : null}

      <div
        className="fd-inputShell"
        data-tone={tone}
        data-variant={searchMode ? 'search' : 'default'}
        data-disabled={disabled ? 'true' : 'false'}
      >
        {searchMode ? <SearchAdornment /> : null}
        {startAdornment ? <span className="fd-inputAdornment">{startAdornment}</span> : null}

        {multiline ? (
          <textarea rows={rows} {...commonProps} />
        ) : (
          <input type={searchMode ? 'search' : type} {...commonProps} />
        )}

        {clearButtonVisible ? (
          <button
            type="button"
            className="fd-inputClear"
            onClick={onClear}
            aria-label="Clear input"
          >
            ×
          </button>
        ) : null}
        {endAdornment ? <span className="fd-inputAdornment">{endAdornment}</span> : null}
      </div>

      {message ? (
        <Text
          as="p"
          id={messageId}
          variant="caption"
          className="fd-inputMessage"
          data-tone={tone}
          color={tone === 'error' ? 'danger' : tone === 'success' ? 'success' : 'muted'}
        >
          {message}
        </Text>
      ) : null}
    </div>
  );
}

export default Input;
