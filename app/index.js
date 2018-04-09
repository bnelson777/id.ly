import React, {Component} from 'react';
import { View, AsyncStorage } from 'react-native';

import { Router, Scene } from 'react-native-router-flux';

import Rolodex from './components/rolodex'

import Contacts from './contact.json'

import {connect} from 'react-redux';
import { getContact } from './actions'

class Main extends Component {

    componentDidMount() {
        var _this = this;
        //Check if any data exist
        AsyncStorage.getItem('contactdata', (err, contactdata) => {
            //if it doesn't exist, extract from json file
            //save the initial data in Async
            if (contactdata === null){
                AsyncStorage.setItem('contactdata', JSON.stringify(Contacts.contact));
                _this.props.getContact();
            }
        });
    }

    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key="rolodex" component={Rolodex} title="Rolodex"/>
                </Scene>
            </Router>
        );
    }
}

//Connect everything
export default connect(null, { getContact })(Main);