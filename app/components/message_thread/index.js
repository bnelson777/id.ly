'use strict';

import React, { Component } from 'react';
import styles from './styles';

import { View, Text, TextInput, Button } from 'react-native';
import {Actions} from 'react-native-router-flux'

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as ReduxActions from '../../actions';

class MessageThread extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userIdentity: "Lil Wayne"
        };
    };

    sendMessage() {
        alert('Message sent!');
    };

    render() {
        // If loading, display the loading animation.
        if(this.props.loading) {
            return (
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>
            );
        }
        // Otherwise, render the view.
        else {
            return (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.inboxButton}>
                            <Button
                                title="Inbox"
                                onPress= {() => Actions.inbox()}/>
                        </View>
                        <Text style={styles.identityText}>
                            {this.state.userIdentity}
                        </Text>
                    </View>
                    <View style={styles.messageThread}>
                        <Text>
                            {"Hello team D"}
                        </Text>
                    </View>
                    <View style={styles.messageInput}>
                        <TextInput
                            style={styles.inputBox}
                            placeholder="Type Message"
                            onChangeText= {(text) => this.setState({text})}
                        />
                        <Button
                            title="Send"
                            color="blue"
                            accessibilityLabel="Send the message to recipient"
                            onPress={this.sendMessage}
                        />
                    </View>
                </View>
            );
        }
    }
};

function mapStateToProps(state, props) {
    return {
        messages: state.dataReducer.messages,
        cards: state.dataReducer.cards
    }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(MessageThread);