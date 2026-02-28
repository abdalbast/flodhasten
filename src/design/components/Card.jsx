import React from 'react';
import { cx } from '../utils/cx';
import Surface from './Surface';
import Text from './Text';
import './primitives.css';

/**
 * @param {{
 *  title?: React.ReactNode,
 *  subtitle?: React.ReactNode,
 *  leading?: React.ReactNode,
 *  trailing?: React.ReactNode,
 *  className?: string
 * } & React.ComponentProps<typeof Surface>} props
 */
function Card({ title, subtitle, leading, trailing, className, children, ...rest }) {
  return (
    <Surface className={cx('fd-card', className)} bordered elevation="low" padding="md" {...rest}>
      {(title || subtitle || leading || trailing) ? (
        <div className="fd-card-titleRow">
          {leading ? <span aria-hidden="true">{leading}</span> : null}
          <div style={{ minWidth: 0, flex: 1 }}>
            {typeof title === 'string' ? (
              <Text as="h3" variant="section" serif weight="medium" truncate>{title}</Text>
            ) : (
              title
            )}
            {subtitle ? (
              typeof subtitle === 'string' ? (
                <Text as="p" variant="caption" color="secondary">{subtitle}</Text>
              ) : (
                subtitle
              )
            ) : null}
          </div>
          {trailing}
        </div>
      ) : null}
      {children}
    </Surface>
  );
}

export default Card;
