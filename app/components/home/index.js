import React, { Component } from 'react';
import styles from './styles';
import {
    Alert,
    FlatList,
    View,
    Text,
    ActivityIndicator, TouchableHighlight, ActionSheetIOS
} from 'react-native';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as ReduxActions from '../../actions'; //Import your actions

import {Actions} from 'react-native-router-flux'

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    // Dummy function for button presses
    pressButton(label){
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
        } else {
            return (
                <View style={styles.container}>
                    <TouchableHighlight onPress={() => Actions.inbox()}>
                        <View style={styles.row}>
                            <Text style={styles.title}>
                                Inbox
                            </Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => Actions.wallet({title:"Wallet", isWallet: true})}>
                        <View style={styles.row}>
                            <Text style={styles.title}>
                                Wallet
                            </Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => Actions.rolodex({title:"Rolodex", isWallet: false})}>
                        <View style={styles.row}>
                            <Text style={styles.title}>
                                Rolodex
                            </Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => {this.pressButton("Share")}}>
                        <View style={styles.row}>
                            <Text style={styles.title}>
                                Share
                            </Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => Actions.scan()}>
                        <View style={styles.row}>
                            <Text style={styles.title}>
                                Scan
                            </Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => {this.pressButton("About")}}>
                        <View style={styles.row}>
                            <Text style={styles.title}>
                                About
                            </Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => Actions.message_thread()}>
                        <View style={styles.row}>
                            <Text style={styles.title}>
                                Message Thread
                            </Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => {this.props.clearAll()}}>
                      <View style={styles.row}>
                          <Text style={styles.title}>
                              [dev] Clear All Data
                          </Text>
                      </View>
                  </TouchableHighlight>
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
