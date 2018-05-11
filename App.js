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

export const fileDir = RNFetchBlob.fs.dirs.DocumentDir + '/idly/';

console.ignoredYellowBox = ['Warning: componentWill'];

export default class App extends Component {
    constructor() {
        super();
        this.initFiles();
        this.state = {
          loadingFont: false,
        }
    }

    initFiles(){
        RNFetchBlob.fs.mkdir(fileDir)
            .catch((err) => {});
        RNFetchBlob.fs.createFile(
            fileDir + 'cards.dat',
            '',
            'utf8'
        )
            .catch((err) => {});
        RNFetchBlob.fs.createFile(
            fileDir + 'messages.dat',
            '',
            'utf8'
        )
            .catch((err) => {});
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