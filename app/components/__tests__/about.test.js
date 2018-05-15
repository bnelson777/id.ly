import React, { Component } from 'react';
import { About } from '../about/index';
import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import configureStore from "redux-mock-store";

(enzyme).configure({ adapter: new Adapter() });
test('renders correctly', () => {
  const initialState = {};

  const mockStore = configureStore();
  let store = mockStore(initialState);
  let wrapper = shallow(<About store = {store} />).dive();
  const tree = renderer.create(wrapper).toJSON();
  expect(tree).toMatchSnapshot();
  })