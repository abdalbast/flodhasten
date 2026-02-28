import React from 'react';
import { cx } from '../utils/cx';
import './primitives.css';

/**
 * @param {{ orientation?: 'horizontal' | 'vertical', className?: string }} props
 */
function Divider({ orientation = 'horizontal', className, style, ...rest }) {
  return (
    <hr
      aria-orientation={orientation}
      className={cx('fd-divider', `fd-divider-${orientation}`, className)}
      style={style}
      {...rest}
    />
  );
}

export default Divider;
