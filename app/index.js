import React, {Component} from 'react';
import { View, AsyncStorage } from 'react-native';

import { Router, Scene } from 'react-native-router-flux';

import Home from './components/home';
import Wallet from './components/wallet';
import Share from './components/share';
import MessageThread from './components/message_thread';
import Rolodex from './components/rolodex'
import Scan from './components/Scan';
import CardData from './cards.json';
import ContactData from './contact.json';

import {connect} from 'react-redux';
import {getCards} from './actions';
import { getContact} from './actions'

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
        AsyncStorage.getItem('contactdata', (err, contactdata) => {
            //if it doesn't exist, extract from json file
            //save the initial data in Async
            if (contactdata === null){
                AsyncStorage.setItem('contactdata', JSON.stringify(ContactData.contact));
                _this.props.getContact();
            }
        });
    }

    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key="scan" component={Scan} title="Scan"/>
                    <Scene key="rolodex" component={Rolodex} title="Rolodex"/>
                    <Scene key="home" component={Home} title="Home"/>
                    <Scene key="wallet" component={Wallet} title="Wallet"/>
                    <Scene key="share" component={Share} title="Share"/>
                    <Scene key="message_thread" component={MessageThread} title="MessageThread"/>
                </Scene>
            </Router>
        );
    }
};

export default connect(null, {getCards, getContact})(Main);
