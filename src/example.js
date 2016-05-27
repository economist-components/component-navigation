import 'babel-polyfill';
import Navigation from './';
import React from 'react';
import Icon from '@economist/component-icon';
export default (
  <div>
    <div>
        <Navigation
          sticky
          className="navigation--a"
          logo={
            <a href="http://economist.com" itemProp="url">
              <Icon icon="economist" itemProp="logo" />
            </a>
          }
          menu={
            <ul role="presentation">
              <li><a href="/foo" itemProp="url"><span itemProp="name">Foo</span></a></li>
              <li><a href="/foo" itemProp="url"><span itemProp="name">Bar</span></a></li>
              <li><a href="/foo" itemProp="url"><span itemProp="name">Baz</span></a></li>
            </ul>
          }
        >
          <ul>
            <li><a>Extra children go here.</a></li>
          </ul>
        </Navigation>
        <p style={{ paddingBottom: '400px' }}>
          Scroll down to experience the thrill of sticky header technology
        </p>
    </div>
  </div>
);
