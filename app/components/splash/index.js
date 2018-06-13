/**
 * Create Splash Page
 * by id.ly Team
 */

//Import Libraries
import React, { Component } from 'react';
import { View, Animated, Image,
        Platform, Linking } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReduxActions from '../../actions';
import { Actions } from 'react-native-router-flux';
import styles from './styles';

/**
 * The toggle of Debug Mode
 * True: no Splash page pop up
 * False: pop up Splash page
 */
const DEBUG = true;

export class Splash extends Component {
    // Hide the header
    static navigationOptions = {
        header: null
    }

    // Initialized variables
    constructor(props) {
        super();
        this.fade_in = new Animated.Value(0);
        this.state = {}
    };
    
    // Automatic transfer to Home page
    componentDidMount() {
        if (Platform.OS === 'android') {
            Linking.getInitialURL().then(url => {
            this.navigate(url);});
        }
        else{
            this.startAnimation();
            setTimeout(() => {
                this.props.navigation.navigate('home');
            }, (DEBUG ? 0 : 4000));
        }
    }

    navigate = (url) => {
        //if there is no deep link on android the display splash screen
        if(!url){
            this.startAnimation();
            setTimeout(() => {
                this.props.navigation.navigate('home');
            }, (DEBUG ? 0 : 4000));
        }
        const route = url.replace(/.*?:\/\//g, '');
        let id = 'empty';
        id = route.match(/\/([^\/]+)\/?$/)[1];
        const routeName = route.split('/')[0];
        if (routeName === 'lockbox') {
            Actions.lockbox({title:"Decrypt Message", mode: "decrypt", message: id})
        }
    }

    // Fade in the loge
    startAnimation = () => {
        this.fade_in.setValue(0);
        Animated.timing(this.fade_in,{
            toValue: 1,
            duration: 3000,
        }).start();
    }

    render() {
        // make the logo opacity based on current axis
        const opacity = this.fade_in.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        });

        // scale the loge based on current axis
        const scale = this.fade_in.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 1]
        });

        // run the scale
        const transform = [{scale}];

        return(
            <View style = {styles.container}>
                <Animated.Image style = {[styles.image, {transform,opacity}]}
                    // the directory of the application
                    source = {require('../../assets/id_ly.png')} 
                />
            </View>
        );
    }
}

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
    return {
        cards: state.dataReducer.cards
    }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/splash.js)
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash);