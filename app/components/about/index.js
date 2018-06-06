/**
 * Create About Page
 * by id.ly Team
 */

//Import Libraries
import React, { Component } from 'react';
import { Text, View, TouchableHighlight,
        Image, Linking } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReduxActions from '../../actions';
import { Actions } from 'react-native-router-flux';
import styles from './styles';

/** 
 * About Page is going to render our application's logo,
 * and two connecting icons(contact and github), and print
 * out the reserved words.
 * Line 34 - the directory of the application's logo
 * Line 39 - the link of the contact icon
 * Line 41 - the directory of the contact icon
 * Line 47 - the link of the github icon
 * Line 49 - the directory of the github icon
 * Line 55 - the reserved words
*/
export class About extends Component {
    render() {
        return(
            <View style = {styles.container}>
                <View style = {styles.column}/>
                <View>
                    <Image style = {styles.image}
                         source = {require('../../assets/id_ly.png')}/>
                </View>
                <View style = {styles.row}>
                    <View style={styles.icon}>
                        <TouchableHighlight
                            onPress={()=>{ Linking.openURL('https://www.pdx.edu')}}>
                            <Image style={styles.icon} 
                                source={require('../../assets/contact.png')} />
                        </TouchableHighlight>
                    </View>
                    <View style={styles.icon}/>
                    <View style={styles.icon}>
                        <TouchableHighlight
                            onPress={()=>{ Linking.openURL('https://github.com/bnelson777/id.ly')}}>
                            <Image style={styles.icon} 
                                source={require('../../assets/GitHub.png')} />
                        </TouchableHighlight>
                    </View>
                </View>
                <View>
                    <Text style = {styles.words}>
                        Powered by id.ly team, MIT license.
                    </Text>
                </View>
                <View>
                    <Text style={styles.words}
                          onPress={() => Linking.openURL('http://underdark.io')}
                    >
                        Bluetooth and Wifi React Native Module by:{"\n"}http://underdark.io
                    </Text>
                </View>
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
// Just by doing this, we will have access to the actions defined in out actions file (action/about.js)
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(About);