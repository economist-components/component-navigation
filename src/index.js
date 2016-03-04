import Accordion from '@economist/component-accordion';
import Balloon from '@economist/component-balloon';
import Button from '@economist/component-link-button';
import GoogleSearch from '@economist/component-google-search';
import Icon from '@economist/component-icon';
import MenuMore from './parts/menu-more';
import MenuTopic from './parts/menu-topic';
import React from 'react';
import SectionsCard from '@economist/component-sections-card';
import StickyPosition from 'react-sticky-position';

export default class Navigation extends React.Component {

  static propTypes = {
    className: React.PropTypes.string,
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.element),
      React.PropTypes.element,
    ]),
    links: React.PropTypes.arrayOf(React.PropTypes.object),
    penName: React.PropTypes.string,
    svgUri: React.PropTypes.string,
    userLoggedIn: React.PropTypes.bool,
    userIsSubscriber: React.PropTypes.bool,
    currentUrl: React.PropTypes.string,
    sharedMenu: React.PropTypes.shape({
      topic: React.PropTypes.shape({
        title: React.PropTypes.string,
        href: React.PropTypes.string,
      }),
      more: React.PropTypes.shape({
        title: React.PropTypes.string,
        href: React.PropTypes.string,
      }),
      subscribe: React.PropTypes.shape({
        title: React.PropTypes.string,
        href: React.PropTypes.string,
      }),
    }).isRequired,
    sectionsCardData: SectionsCard.propTypes.data,
    accordionData: Accordion.propTypes.list,
    moreBalloonData: SectionsCard.propTypes.data,
  }

  static defaultProps = {
    penName: 'guest-olejses',
  }

  constructor(props) {
    super(props);
    this.closeSearchBar = this.closeSearchBar.bind(this);
    this.openSearchBar = this.openSearchBar.bind(this);
    this.state = {
      searching: false,
    };
  }

  renderLoginLogout() {
    const { currentUrl, userLoggedIn, userIsSubscriber, penName } = this.props;
    const destinationParameter = currentUrl ? `?destination=${ encodeURIComponent(currentUrl) }` : '';
    const loginLogoutUrl = userLoggedIn ? `/logout${ destinationParameter }` : `/user/login${ destinationParameter }`;
    const buttonClassSuffix = userLoggedIn ? 'login' : 'logout';
    const buttonText = userLoggedIn ? 'My Account' : 'Log in';
    const registerUrl = `/user/register${ destinationParameter }`;
    const userMenuBalloonTrigger = (
      <Button
        href={loginLogoutUrl}
        className={`navigation__user-menu-link navigation__link navigation__user-menu-link--${ buttonClassSuffix }`}
        icon={{ icon: 'user', color: 'thimphu', useBackground: true }}
        unstyled
      ><span className="navigation__user-menu-link-label">{buttonText}</span></Button>
    );
    if (userLoggedIn && userIsSubscriber) {
      return (
        <Balloon showOnHover trigger={userMenuBalloonTrigger} className="navigation__user-menu-popup--subscriber">
          <ul className="navigation__user-menu-linklist">
            <li className="navigation__user-menu-linklist-item">
              <a className="navigation__user-menu-linklist-link" href="/user">
                My account
              </a>
            </li>
            <li className="navigation__user-menu-linklist-item">
              <a className="navigation__user-menu-linklist-link" href="https://subscriptions.economist.com">
                Manage my subscription
              </a>
            </li>
            <li className="navigation__user-menu-linklist-item">
              <a className="navigation__user-menu-linklist-link" href="/subscriptions/renew">
                Renew my subscription
              </a>
            </li>
            <li className="navigation__user-menu-linklist-item">
              <a className="navigation__user-menu-linklist-link" href="https://subscriptions.economist.com">
                Buy a gift subscription
              </a>
            </li>
            <li className="navigation__user-menu-linklist-item">
              <a className="navigation__user-menu-linklist-link" href={`/users/${ penName }/newsletters`}>
                Newsletters
              </a>
            </li>
            <li className="navigation__user-menu-linklist-item">
              <a className="navigation__user-menu-linklist-link" href={`/users/${ penName }/comments`}>
                My comments
              </a>
            </li>
            <li className="navigation__user-menu-linklist-item">
              <a
                className="navigation__user-menu-linklist-link--cta"
                href={loginLogoutUrl}
              >
                Log out
              </a>
            </li>
          </ul>
        </Balloon>
      );
    }
    if (userLoggedIn) {
      return (
        <Balloon showOnHover trigger={userMenuBalloonTrigger} className="navigation__user-menu-popup--registered">
          <ul className="navigation__user-menu-linklist">
            <li className="navigation__user-menu-linklist-item">
              <a className="navigation__user-menu-linklist-link" href="/user">
                My account
              </a>
            </li>
            <li className="navigation__user-menu-linklist-item">
              <a className="navigation__user-menu-linklist-link" href="https://subscriptions.economist.com">
                Subscribe to The Economist
              </a>
            </li>
            <li className="navigation__user-menu-linklist-item">
              <a className="navigation__user-menu-linklist-link" href="/subscriptions/activation">
                Activate my digital subscription
              </a>
            </li>
            <li className="navigation__user-menu-linklist-item">
              <a className="navigation__user-menu-linklist-link" href="https://subscriptions.economist.com">
                Buy a gift subscription
              </a>
            </li>
            <li className="navigation__user-menu-linklist-item">
              <a className="navigation__user-menu-linklist-link" href={`/users/${ penName }/newsletters`}>
                Newsletters
              </a>
            </li>
            <li className="navigation__user-menu-linklist-item">
              <a className="navigation__user-menu-linklist-link" href={`/users/${ penName }/comments`}>
                My comments
              </a>
            </li>
            <li className="navigation__user-menu-linklist-item">
              <a
                className="navigation__user-menu-linklist-link--cta"
                href={loginLogoutUrl}
              >
                Log out
              </a>
            </li>
          </ul>
        </Balloon>
      );
    }
    return (
      <Balloon showOnHover trigger={userMenuBalloonTrigger} className="navigation__user-menu-popup--anonymous">
        <Button href={loginLogoutUrl} className="navigation__user-menu-log-in-button">
          Log in to <span className="navigation__user-menu-the-economist-name">The Economist</span>
        </Button>
        <ul className="navigation__user-menu-linklist">
          <li className="navigation__user-menu-linklist-item">
            New to <span className="navigation__user-menu-the-economist-name">The Economist</span>?&nbsp;
            <a className="navigation__user-menu-linklist-link--cta" href={registerUrl}>
              Register now
            </a>
          </li>
          <li className="navigation__user-menu-linklist-item">
            <a className="navigation__user-menu-linklist-link--cta" href="/user">
              Manage my subscription
            </a>
          </li>
        </ul>
      </Balloon>
    );
  }

  renderSearch(searching) {
    /* eslint-disable react/jsx-handler-names */
    if (searching) {
      return (
        <div className="navigation__search--open">
          <div className="navigation__search-magnifier">
            <Icon icon="magnifier" size="28px" />
          </div>
          <GoogleSearch />
          <div className="navigation__search-close-button-wrapper">
            <Button
              unstyled
              className="navigation__link navigation__search-close-button"
              icon={{ icon: 'close', color: 'thimphu', useBackground: true }}
              onClick={this.closeSearchBar}
            />
          </div>
        </div>
      );
    }
    return (
      <div className="navigation__search--closed">
        <div className="navigation__show-field-group">
          <Button
            unstyled
            icon={{ icon: 'magnifier', size: '28px' }}
            className="navigation__link navigation__collapsed-magnifier"
            href="http://www.economist.com/search/"
            onClick={this.openSearchBar}
          />
          <Button
            unstyled
            icon={{ icon: 'magnifier', color: 'thimphu', useBackground: true }}
            className="navigation__link navigation__search-open-button"
            href="http://www.economist.com/search/"
            onClick={this.openSearchBar}
          >
            Search
          </Button>
        </div>
      </div>
    );
    /* eslint-enable react/jsx-handler-names */
  }

  closeSearchBar() {
    this.setState({ searching: false });
  }

  openSearchBar(event) {
    event.stopPropagation();
    event.preventDefault();
    this.setState({ searching: true });
    return false;
  }

  render() {
    const { searching } = this.state;
    const svgUri = { uri: this.props.svgUri } || {};

    const menuAccordionTrigger = (
      <a href="/Sections" className="navigation__sections-link navigation--tappable-icon">
        <Icon icon="hamburger" size="28px" color="white" />
        <Icon icon="close" size="28px" color="white" />
      </a>
    );
    const children = [ (
      <div className="navigation__primary" key="primary-navigation">
        <div className="navigation__primary-inner">
          <a href="http://www.economist.com" className="navigation__link-logo">
            <Icon icon="economist" size="64px" {...svgUri} />
          </a>
          <Balloon
            className="navigation__main-navigation-link navigation__mobile-accordion"
            trigger={menuAccordionTrigger}
          >
            <Accordion list={this.props.accordionData} />
          </Balloon>
          <MenuTopic
            href={this.props.sharedMenu.topic.href}
            sectionsCardData={this.props.sectionsCardData}
            title={this.props.sharedMenu.topic.title}
          />
          <a href="/printedition" className="navigation__main-navigation-link navigation__link">
            Print edition
          </a>
          <MenuMore
            moreBalloonData={this.props.moreBalloonData}
            href={this.props.sharedMenu.more.href}
            title={this.props.sharedMenu.more.title}
          />
          <div className="navigation__primary-expander" />
          <Button href={this.props.sharedMenu.subscribe.href}
            className="navigation__main-navigation-link navigation__link navigation__main-navigation-link-subscribe"
            target="_blank"
            i13nModel={{
              action: 'click',
              element: 'subscribe',
            }}
            unstyled
          >
            {this.props.sharedMenu.subscribe.title}
          </Button>
          <div className="navigation__user-menu">
            {this.renderLoginLogout()}
          </div>
          <div className="navigation__search">
            {this.renderSearch(searching)}
          </div>
        </div>
      </div>
    ) ];
    if (this.props.children) {
      children.push(
        <div className="navigation__secondary" key="secondary">
          {this.props.children}
        </div>
      );
    }
    return (
      <StickyPosition className={this.props.className}>
        {children}
      </StickyPosition>
    );
  }
}
