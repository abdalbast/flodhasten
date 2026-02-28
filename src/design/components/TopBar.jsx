import React from 'react';
import { cx } from '../utils/cx';
import Text from './Text';
import './primitives.css';

/**
 * @param {{
 *  title?: React.ReactNode,
 *  subtitle?: React.ReactNode,
 *  leading?: React.ReactNode,
 *  actions?: React.ReactNode,
 *  bottom?: React.ReactNode,
 *  sticky?: boolean,
 *  className?: string
 * }} props
 */
function TopBar({
  title,
  subtitle,
  leading,
  actions,
  bottom,
  sticky = true,
  className,
  children,
  ...rest
}) {
  return (
    <header
      className={cx('fd-topbar', !sticky && 'fd-topbar-static', className)}
      {...rest}
    >
      <div className="fd-topbar-inner">
        <div className="fd-topbar-leading">{leading}</div>
        <div className="fd-topbar-titleWrap">
          {typeof title === 'string' ? (
            <Text as="h1" variant="section" serif weight="medium" truncate>
              {title}
            </Text>
          ) : (
            title
          )}
          {subtitle ? (
            typeof subtitle === 'string' ? (
              <Text as="p" variant="caption" color="secondary">
                {subtitle}
              </Text>
            ) : (
              subtitle
            )
          ) : null}
          {children}
        </div>
        <div className="fd-topbar-actions">{actions}</div>
      </div>
      {bottom ? <div className="fd-topbar-bottom">{bottom}</div> : null}
    </header>
  );
}

export default TopBar;
