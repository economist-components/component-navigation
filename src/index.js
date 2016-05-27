import React from 'react';
import classNames from 'classnames';

export default function Navigation({ className, logo, menu, children }) {
  return (
    <header
      className={classNames('navigation', className)}
      role="banner"
      itemScope
      itemType="http://schema.org/WPHeader"
    >
      <div className="navigation__wrapper">
        {logo && (
          <div className="navigation__logo" itemScope itemType="http://schema.org/Organization">
            {logo}
          </div>
        )}
        {menu && (
          <nav
            className="navigation__menu"
            role="navigation"
            itemScope
            itemType="http://schema.org/SiteNavigationElement"
          >
            {menu}
          </nav>
        )}
        {children && (
          <div className="navigation__extra">
            {children}
          </div>
        )}
      </div>
    </header>
  );
}

if (process.env.NODE_ENV !== 'production') {
  Navigation.propTypes = {
    className: React.PropTypes.string,
    logo: React.PropTypes.node,
    menu: React.PropTypes.node,
    children: React.PropTypes.node,
  };
}
