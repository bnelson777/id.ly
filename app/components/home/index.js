/**
 * Create Home Page
 * by id.ly Team
 */

//Import Libraries
import React, { Component } from 'react';
import styles from './styles';
import { Alert, FlatList, View,
        Text, ActivityIndicator, 
        TouchableHighlight, 
        ActionSheetIOS } from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as ReduxActions from '../../actions'; //Import your actions
import { Actions } from 'react-native-router-flux';
import { Avatar } from 'react-native-elements';

export class Home extends Component {
    static navigationOptions = {
        title: "Home",
        headerLeft: (<View/>),
        hearerRight: (<View/>),
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#128DC9',
        }
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    // Dummy function for button presses
    pressButton(label) {
        Alert.alert(label);
    }

    // Displays animation if loading, otherwise displays a popup indicating the
    // TouchableHighlight pressed
    render() {
        if (this.props.loading) {
            return (
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>
            );
        } 
        else {
            return (
                <View style={styles.container}>
                    <View style = {styles.firstRow}>
                        <Avatar 
                            large
                            source = {require('../../assets/wallet.png')}
                            onPress={() => Actions.wallet({title:"Wallet", isWallet: true})}
                            overlayContainerStyle={{backgroundColor: '#FFFFFF'}}
                            activeOpacity={0.5}
                        />
                        <Avatar 
                            large
                            source = {require('../../assets/inbox.png')}
                            onPress={() => Actions.inbox()}
                            overlayContainerStyle={{backgroundColor: '#FFFFFF'}}
                            activeOpacity={0.5}
                        />
                        <Avatar
                            large
                            source = {require('../../assets/rolodex.png')}
                            onPress={() => Actions.rolodex({title:"Rolodex", isWallet: false})}
                            overlayContainerStyle={{backgroundColor: '#FFFFFF'}}
                            activeOpacity={0.5}
                        />
                        <Avatar
                            large
                            source = {require('../../assets/scan.png')}
                            onPress={() => Actions.scan()}
                            overlayContainerStyle={{backgroundColor: '#FFFFFF'}}
                            activeOpacity={0.5}
                        />                
                    </View>
                    <View style={styles.secondRow}>
                        <TouchableHighlight onPress={() => Actions.login()}>
                            <View style={styles.row}>
                                <Text style={styles.title}>
                                    [Dev] Login
                                </Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => Actions.register()}>
                            <View style={styles.row}>
                                <Text style={styles.title}>
                                    [Dev] Register
                                </Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => {this.props.clearAll()}}>
                        <View style={styles.row}>
                            <Text style={styles.title}>
                                    [Dev] Clear All Data
                            </Text>
                        </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => Actions.lockbox({title:"Decrypt Message", mode: "decrypt"})} underlayColor='rgba(0,0,0,.2)'>
                            <View style={styles.row}>
                                <Text style={styles.title}>
                                    [Dev] Decrypt Message
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.thirdRow}>
                        <Avatar 
                            small
                            onPress={() => Actions.about()}
                            source = {require('../../assets/info.png')}
                            overlayContainerStyle={{backgroundColor: '#FFFFFF'}}
                            activeOpacity={0.5}                       
                        />
                    </View>
                </View>
            );
        }
    }
};

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
    return {
        loading: state.dataReducer.loading,
        cards: state.dataReducer.cards
    }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
