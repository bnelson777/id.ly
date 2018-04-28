/**
 * Create Message Thread Page
 * by id.ly Team
 */
'use strict';

//Import Libraries
import React, { Component } from 'react';
import styles from './styles';
import { View, Text, TextInput,
        Button,
        FlatList } from 'react-native';
import * as ReduxActions from '../../actions';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class MessageThread extends Component {
    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
        this.retrieveMessages = this.retrieveMessages.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.state = {
            messages: [],
        };
    };

    // When component mounts, retrieve the messages and cards
    // TODO: remove cards if required as it is currently unused.
    componentDidMount() {
        this.props.getMessages();
        this.props.getCards();
        this.retrieveMessages();
    }

    // Retrieve the relevant messages based on sender/receiver key pairing.
    retrieveMessages() {
        let sender = this.props.pair.sender;
        let receiver = this.props.pair.receiver;
        let messageList = [];

        // If the sender/receiver pairing matches the to/from section of a message, add to our list.
        this.props.messages.forEach((item, index, array) => {
            if((item.from === receiver && item.to === sender) ||
            (item.to === receiver && item.from === sender)) {
                messageList.push(item);
            }
        });

        // Sort the list by timestamp
        messageList.sort((a, b) => {
            return a.time - b.time;
        });

        // Update the message list
        this.setState({messages : messageList});
    };

    // Event handler for button.
    // TODO: Add logic
    sendMessage() {
        Actions.create_message({thread: true, body: this.state.text, sender: this.props.pair.sender, receiver: this.props.pair.receiver})
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
          // console.log('sender:', this.props.pair.sender)
          // console.log('receiver', this.props.pair.receiver)
            return (
                <View style={styles.container}>
                    {/* The container for our messages. The separator currently does not work.

                        TODO: Create a 'working' separator between each messsage.
                    */}
                    <FlatList
                        itemSeparatorComponent={()=>(
                            <View style={styles.separator}/>
                        )}
                        data={this.state.messages}
                        keyExtractor={item => item.id}
                        renderItem={this.renderItem}
                    />

                    {/* Input box that currently has no logic */}
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

    // renderItem uses iteration of data object indices to retrieve messages.
    // Current data used is the message prop from our state
    renderItem = ({item, index}) => {
        if(item.to === this.props.pair.receiver && item.from === this.props.pair.sender) {
            return (
                <View style={styles.receivedMessage}>
                    <Text style={styles.receiverText}>
                        {item.body}
                    </Text>
                </View>
            )
        } else if (item.from === this.props.pair.receiver && item.to === this.props.pair.sender) {
            return (
                <View style={styles.sentMessage}>
                    <Text style={styles.senderText}>
                        {item.body}
                    </Text>
                </View>
            )
        }
    };
};

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
    return {
        loading: state.dataReducer.loading,
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
