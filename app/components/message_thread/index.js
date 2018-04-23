'use strict';

import React, { Component } from 'react';
import styles from './styles';

import { View, Text, TextInput, Button } from 'react-native';
import {Actions} from 'react-native-router-flux'

export default class MessageThread extends Component {
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
          // props passed from inbox
          console.log('sender:', this.props.pair.sender)
          console.log('reciever', this.props.pair.reciever)
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
