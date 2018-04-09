'use strict';

import React, { Component } from 'react';

import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

export default class MessageThread extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userIdentity: "Lil Wayne"
        };
    };

    returnToInbox() {
        alert('Oops, something broke! Better luck next time.');
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
                        <View style={{paddingRight: 100}}>
                            <Button
                                title="Inbox"
                                color="blue"
                                accessibilityLabel="Return to the inbox"
                                onPress={this.returnToInbox}
                            />
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

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        alignItems: 'stretch'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'stretch',
        paddingBottom: 50
    },
    messageThread: {
        flexDirection: 'column',
        paddingBottom: 100
    },
    message: {
        flexDirection: 'row',
    },
    inputBox: {
        height: 40,
    },
    identityText: {
        fontSize: 30,
        fontWeight: 'bold'
    },
});