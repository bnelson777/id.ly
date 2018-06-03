/**
 * Create About Page
 * by id.ly Team
 */

//Import Libraries
import React, { Component } from 'react';
import { Text, View, Button, TouchableHighlight,
        StyleSheet, Image, AppState, Linking } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReduxActions from '../../actions';
import { Actions } from 'react-native-router-flux';
import styles from './styles';


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
                        Powered by id.ly team.  All right reserved.
                    </Text>
                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);