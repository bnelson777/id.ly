/**
 * Create Splash Page
 * by id.ly Team on 4/14/2018
 */

//Import Libraries
import React, {Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ReduxActions from '../../actions';
import {Actions} from 'react-native-router-flux';

class Splash extends Component {

}

function mapStateToProps(state, props) {
    return {
        cards: state.dataReducer.cards
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash);