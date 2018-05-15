import React, { Component } from 'react';
import { CardList } from '../card_list/index';
import * as enzyme from 'enzyme';
import { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import configureStore from "redux-mock-store";

//Sets up adapter for use with enzyme
(enzyme).configure({ adapter: new Adapter() });

var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { document } = (new JSDOM('')).window;
global.document = document;

test('Renders correctly', () => {

  //Captures a snapshot and exports as JSON
  let wrapper = mount(<CardList />).dive();
  const tree = renderer.create(wrapper).toJSON();
  expect(tree).toMatchSnapshot();
  })