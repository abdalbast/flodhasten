import React from 'react';
import { cx } from '../utils/cx';
import './primitives.css';

/**
 * @param {{
 *  selected?: boolean,
 *  tone?: 'default' | 'success' | 'warning' | 'danger',
 *  className?: string
 * } & React.HTMLAttributes<HTMLSpanElement>} props
 */
function Chip({ selected = false, tone = 'default', className, children, ...rest }) {
  return (
    <span
      className={cx(
        'fd-chip',
        selected && 'fd-chip-selected',
        tone !== 'default' && `fd-chip-${tone}`,
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

export default Chip;
