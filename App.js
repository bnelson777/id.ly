/**
 * Create App Page
 * by id.ly Team
 */

//Import Libraries
import React, { Component } from 'react';
import { Platform, AppRegistry, YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import RNFetchBlob from 'react-native-fetch-blob';
import store from './app/store';
import Main from './app/index';

console.ignoredYellowBox = ['Warning: componentWill'];

export default class App extends Component {
    constructor() {
        super();
        this.state = {
          loadingFont: false,
        }
    }

    async componentDidMount() {
        this.setState({loadingFont: true});
    }

    render() {
        return (
            <Provider store={store}>
                <Main />
            </Provider>
        );
    }
};

AppRegistry.registerComponent("id.ly", () => App);