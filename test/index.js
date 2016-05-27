import 'babel-polyfill';
import React from 'react';
import Navigation from '../src';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
chai.use(chaiEnzyme()).should();
describe('Navigation', () => {

  it('renders a React element', () => {
    React.isValidElement(<Navigation />).should.equal(true);
  });

  describe('Rendering', () => {
    let rendered = null;
    let navigation = null;
    beforeEach(() => {
      rendered = mount(<Navigation />);
      navigation = rendered.find('.navigation');
    });

    it('has role=banner', () => {
      navigation.should.have.attr('role', 'banner');
    });

    // skipped for now, when https://github.com/producthunt/chai-enzyme/issues/47
    // is fixed we can remove the `.skip` flag.
    it.skip('has itemScope', () => {
      navigation.should.have.attr('itemscope', '');
    });

    it('has itemType=WPHeader', () => {
      navigation.should.have.attr('itemType', 'http://schema.org/WPHeader');
    });


    it('accepts className prop to append to class attr', () => {
      mount(<Navigation className="foobar" />).find('.navigation')
        .should.have.attr('class', 'navigation foobar');
    });

    it('has div.navigation__extra child when given children', () => {
      mount(<Navigation><div></div></Navigation>).find('.navigation__extra').should.be.present();
    });

    it('appends children to .navigation__extra', () => {
      mount(<Navigation><div className="child" /></Navigation>).find('.navigation').find('.navigation__extra')
        .should.have.exactly(1).descendants('.child');
    });

    describe('with logo prop', () => {
      let logo = null;
      beforeEach(() => {
        rendered = mount(<Navigation logo={<div className="child" />} />);
        navigation = rendered.find('.navigation');
        logo = navigation.find('.navigation__logo');
      });

      // skipped for now, when https://github.com/producthunt/chai-enzyme/issues/47
      // is fixed we can remove the `.skip` flag.
      it.skip('has itemScope attr', () => {
        logo.should.have.attr('itemscope');
      });

      it('has itemType=Organization', () => {
        logo.should.have.attr('itemtype', 'http://schema.org/Organization');
      });

      it('appends `logo` elements as children', () => {
        logo.should.have.exactly(1).descendants('.child');
      });

    });

    describe('with menu prop', () => {
      let menu = null;
      beforeEach(() => {
        rendered = mount(<Navigation menu={<div className="child" />} />);
        navigation = rendered.find('.navigation');
        menu = navigation.find('.navigation__menu');
      });

      it('renders nav element', () => {
        menu.should.have.tagName('nav');
      });

      it('has role=navigation', () => {
        menu.should.have.attr('role', 'navigation');
      });

      // skipped for now, when https://github.com/producthunt/chai-enzyme/issues/47
      // is fixed we can remove the `.skip` flag.
      it.skip('has itemScope attr', () => {
        menu.should.have.attr('itemscope');
      });

      it('has itemType=SiteNavigationElement', () => {
        menu.should.have.attr('itemtype', 'http://schema.org/SiteNavigationElement');
      });

      it('appends `menu` elements as children', () => {
        menu.should.have.exactly(1).descendants('.child');
      });

    });

  });

});
