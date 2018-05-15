import React, { Component } from 'react';
import { CreateMessage } from '../create_message/index';
import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import configureStore from "redux-mock-store";

//Sets up adapter for use with enzyme
(enzyme).configure({ adapter: new Adapter() });

test('Renders correctly', () => {

  //Sets up a mock store to capture the wrapper
  const initialState = {};
  const mockStore = configureStore();
  let store = mockStore(initialState);

  //Captures a snapshot and exports as JSON
  let wrapper = shallow(<CreateMessage store = {store} />).dive();
  const tree = renderer.create(wrapper).toJSON();
  expect(tree).toMatchSnapshot();
  })