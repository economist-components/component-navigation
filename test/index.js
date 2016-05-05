import 'babel-polyfill';
import Navigation from '../src';
import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import links from './links';
import moreBalloonData from './more-balloon-data';
import { mount } from 'enzyme';
import sectionsCardData from '@economist/component-sections-card/lib/context';
chai.use(chaiEnzyme()).should();
describe('Navigation', () => {
  let props = null;
  let registered = null;
  let testNumber = 0;
  beforeEach(() => {
    testNumber++;
    props = {
      googleSearchDivIDPrefix: `test-${ testNumber }-`,
      moreBalloonData,
      sectionsCardData,
      links: registered,
      accordionData: [
        {
          title: 'Topics',
          href: '/sections',
          children: context.sections,
        },
        {
          title: 'Blogs',
          href: '/blogs',
          children: context.blogs,
        },
        {
          title: 'Print Edition',
          href: '/printedition',
        },
        {
          title: 'More',
          href: '/digital',
        },
        {
          title: 'Subscribe',
          href: 'https://subscriptions.economist.com/',
          target: '_blank',
          unstyled: false,
          i13nModel: { // eslint-disable-line id-match
            action: 'click',
            element: 'subscribe',
          },
        },
      ],
      sharedMenu: {
        topic: {
          title: 'Topics',
          href: '/sections',
        },
        more: {
          title: 'More',
          href: '/digital',
        },
        subscribe: {
          title: 'Subscribe',
          href: 'https://subscriptions.economist.com/',
        },
      },
    };
    registered = [ links.subscribe, links.myeconomist, links.logout ];
  });

  it('renders a React element', () => {
    React.isValidElement(<Navigation {...props} />).should.equal(true);
  });

  describe('Rendering', () => {
    let rendered = null;
    let navigation = null;
    it('renders a top level div.navigation', () => {
      rendered = mount(<Navigation {...props} className="navigation" />);
      navigation = rendered.find('.navigation');
      navigation.should.have.tagName('div');
      navigation.should.have.className('navigation');
    });

    it('renders link to /user/login?destination={this.props.currentUrl} when `userLoggedIn` is not set', () => {
      rendered = mount(<Navigation {...props} className="navigation" currentUrl="/foo/bar" />);
      rendered.find('.navigation__user-menu-log-in-button')
        .should.have.attr('href', '/user/login?destination=%2Ffoo%2Fbar');
    });

    it('renders link to /logout?destination={this.props.currentUrl} when `userLoggedIn` is set', () => {
      rendered = mount(<Navigation {...props} userLoggedIn currentUrl="/foo/bar" />);
      rendered.find('.navigation__user-menu-linklist-link--cta')
        .should.have.attr('href', '/logout?destination=%2Ffoo%2Fbar');
    });

    it('renders subscribe button when `userIsSubscriber` is not set', () => {
      rendered = mount(<Navigation {...props} />);
      rendered.find('.navigation__main-navigation-link-subscribe').should.be.present();
    });

    it('does not render subscribe button when `userIsSubscriber` is set', () => {
      rendered = mount(<Navigation {...props} userIsSubscriber />);
      rendered.find('.navigation__main-navigation-link-subscribe').should.not.be.present();
    });

    it('renders links in mobile menu with `isSubscriberLink: true` when `userIsSubscriber` not set', () => {
      rendered = mount(<Navigation {...props} />);
      const mobileMenu = rendered.find('.navigation__primary-inner').find('.accordion');
      mobileMenu.should.have.exactly(5).descendants('.list__item');
      mobileMenu.childAt(4).find('.link-button')
        .should.have.text('Subscribe');
    });

    it('does not render links in mobile menu with `isSubscriberLink: true` when `userIsSubscriber` is set', () => {
      props.accordionData[4].isSubscriberLink = true;
      rendered = mount(<Navigation {...props} userIsSubscriber />);
      const mobileMenu = rendered.find('.navigation__primary-inner').find('.accordion');
      mobileMenu.should.have.exactly(4).descendants('.list__item');
      mobileMenu.childAt(0).find('.link-button').should.not.have.text('Subscribe');
      mobileMenu.childAt(1).find('.link-button').should.not.have.text('Subscribe');
      mobileMenu.childAt(2).find('.link-button').should.not.have.text('Subscribe');
      mobileMenu.childAt(3).find('.link-button').should.not.have.text('Subscribe');
    });

    it('can accept a sub brand', () => {
      const subBranding = (
        <img
          src="/assets/logo-world-if.svg"
          className="sub-branding__logo"
          height="64"
          width="192"
        />
      );
      const propsWithSubBrand = {
        subBranding,
        ...props,
      };
      rendered = mount(<Navigation {...propsWithSubBrand} userIsSubscriber />);
      const subBrandNav = rendered.find('.navigation__sub-branding');
      subBrandNav.find('img').should.be.present();
    });
  });
});
