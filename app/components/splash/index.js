/**
 * Create Splash Page
 * by id.ly Team
 */

//Import Libraries
import React, { Component } from 'react';
import { Text, View, StyleSheet,
        Animated, Easing, 
        Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReduxActions from '../../actions';
import { Actions } from 'react-native-router-flux';
import styles from './styles';

const DEBUG = true;

class Splash extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super();
        this.fade_in = new Animated.Value(0);
    };
    
    componentDidMount() {
        this.startAnimation();
        setTimeout(() => {
            this.props.navigation.navigate('home');
        }, (DEBUG ? 0 : 4000));
    }

    startAnimation = () => {
        this.fade_in.setValue(0);
        Animated.timing(this.fade_in,{
            toValue: 1,
            duration: 3000,
        }).start();
    }

    render() {
        const opacity = this.fade_in.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        });

        const scale = this.fade_in.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 1]
        });

        const transform = [{scale}];

        return(
            <View style = {styles.container}>
                <Animated.Image style = {[styles.image, {transform,opacity}]}
                    source = {require('../../assets/id_ly.png')} 
                />
            </View>
        );
    }
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