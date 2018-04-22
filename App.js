import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import { Font } from 'expo';
import store from './app/store';
import Main from './app/index';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
          loadingFont: false,
        }
    }
    
    async componentDidMount() {
        if (Platform.OS === 'ios') {
          await Font.loadAsync({
            'sans-serif': require('./app/assets/fonts/sansserif.ttf'),
          });
        }
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