import React, {Component} from 'react';
import { View, AsyncStorage } from 'react-native';

import { Router, Scene } from 'react-native-router-flux';

import Wallet from './components/wallet';
import Scan from './components/scan';

import CardData from './cards.json';

import {connect} from 'react-redux';
import {getCards} from './actions';

class Main extends Component{
    componentDidMount() {
        var _this = this;
        //Check if any card data exists
        AsyncStorage.getItem('carddata', (err, carddata) => {
            //if it doesn't exist, extract from json file
            //save the initial data in Async
            if (carddata === null){
                AsyncStorage.setItem('carddata', JSON.stringify(CardData.cards));
                _this.props.getCards();
            }
        });
    }

    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key="scan" component={Scan} title="Scan"/>
                    <Scene key="wallet" component={Wallet} title="Wallet"/>
                </Scene>
            </Router>
        );
    }
};

export default connect(null, {getCards})(Main);
