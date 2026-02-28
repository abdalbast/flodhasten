import React from 'react';
import { cx } from '../utils/cx';
import Text from './Text';
import './primitives.css';

/**
 * @param {{
 *  title?: React.ReactNode,
 *  subtitle?: React.ReactNode,
 *  leading?: React.ReactNode,
 *  trailing?: React.ReactNode,
 *  interactive?: boolean,
 *  className?: string
 * }} props
 */
function ListRow({
  title,
  subtitle,
  leading,
  trailing,
  interactive = false,
  className,
  children,
  ...rest
}) {
  return (
    <div className={cx('fd-listRow', interactive && 'fd-listRow-interactive', className)} {...rest}>
      {leading ? <span className="fd-listRow-leading">{leading}</span> : null}
      <div className="fd-listRow-body">
        {title ? (
          typeof title === 'string' ? (
            <Text as="p" variant="body" weight="medium" truncate>{title}</Text>
          ) : (
            title
          )
        ) : null}
        {subtitle ? (
          typeof subtitle === 'string' ? (
            <Text as="p" variant="caption" color="secondary">{subtitle}</Text>
          ) : (
            subtitle
          )
        ) : null}
        {children}
      </div>
      {trailing ? <span className="fd-listRow-trailing">{trailing}</span> : null}
    </div>
  );
}

export default ListRow;
