import React, {Component} from 'react';
import { View, AsyncStorage } from 'react-native';

import { Router, Scene } from 'react-native-router-flux';

import Home from './components/home';
import CardList from './components/card_list';
import Share from './components/share';
import MessageThread from './components/message_thread';
import Inbox from './components/inbox';
import Scan from './components/Scan';
import CardData from './cards.json';
import MessageData from './messages.json';

import {connect} from 'react-redux';
import {getCards} from './actions';
import {getMessages} from './actions';

class Main extends Component{
    componentDidMount() {
        var _this = this;
        //Check if any card data exists
        AsyncStorage.getItem('carddata', (err, carddata) => {
            //if it doesn't exist, extract from json file
            //save the initial data in Async
            if (carddata === null){
                AsyncStorage.setItem('carddata', JSON.stringify(CardData.card));
                _this.props.getCards();
            }
        });

        // check if any message data exists
        AsyncStorage.getItem('messagedata', (err, messagedata) => {
            //if it doesn't exist, extract from json file
            //save the initial data in Async
            if (messagedata === null){
                AsyncStorage.setItem('messagedata', JSON.stringify(MessageData.message));
                _this.props.getMessages();
            }
        });
    }

    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key="home" component={Home} title="Home"/>
                    <Scene key="scan" component={Scan} title="Scan"/>
                    <Scene key="rolodex" component={CardList} title="Rolodex"/>
                    <Scene key="wallet" component={CardList} title="Wallet"/>
                    <Scene key="share" component={Share} title="Share"/>
                    <Scene key="message_thread" component={MessageThread} title="MessageThread"/>
                    <Scene key="inbox" component={Inbox} title="Inbox" titleStyle={{alignSelf: 'center'}} onLeft={() => alert('')} leftTitle='Home' onRight={() => alert('')} rightTitle='Message'/>
                </Scene>
            </Router>
        );
    }
};

export default connect(null, {getCards, getMessages})(Main);
