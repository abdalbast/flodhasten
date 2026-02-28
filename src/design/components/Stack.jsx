import React from 'react';
import { cx } from '../utils/cx';
import './primitives.css';

/**
 * @param {{
 *  as?: keyof JSX.IntrinsicElements,
 *  direction?: 'row' | 'column',
 *  gap?: number | string,
 *  align?: string,
 *  justify?: string,
 *  wrap?: boolean,
 *  className?: string,
 *  children?: React.ReactNode
 * }} props
 */
function Stack({
  as: Component = 'div',
  direction = 'column',
  gap,
  align,
  justify,
  wrap = false,
  className,
  style,
  children,
  ...rest
}) {
  return (
    <Component
      className={cx('fd-stack', `fd-stack-dir-${direction}`, className)}
      style={{
        ...(gap !== undefined ? { gap } : null),
        ...(align ? { alignItems: align } : null),
        ...(justify ? { justifyContent: justify } : null),
        ...(wrap ? { flexWrap: 'wrap' } : null),
        ...style
      }}
      {...rest}
    >
      {children}
    </Component>
  );
}

export default Stack;
