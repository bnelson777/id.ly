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
import { GiftedChat } from 'react-native-gifted-chat';

class MessageThread extends Component {
    constructor(props) {
        super(props);
        this.retrieveMessages = this.retrieveMessages.bind(this);
        this.onSend = this.onSend.bind(this);
        this.state = {
            messages: [],
        };
    };

    // When component mounts, retrieve the messages and cards
    componentDidMount() {
        this.props.getMessages();
        this.props.getCards();
        this.retrieveMessages();
    }

    // TODO: Add logic for sending a message
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
    }

    // Retrieve the relevant messages based on sender/receiver key pairing.
    retrieveMessages() {
        let sender = this.props.pair.sender;
        let receiver = this.props.pair.receiver;
        let messageList = [];
        let portrait = require('../../assets/default_avatar.png');

        // If the sender/receiver pairing matches the to/from section of a message, add to our list.
        this.props.messages.forEach((item, index, array) => {
            if((item.from === receiver && item.to === sender) ||
            (item.to === receiver && item.from === sender)) {
                console.log(item.time);
                let message = {
                    _id: item.id,
                    text: item.body,
                    createdAt: new Date(item.time * 1000),
                    user: {
                        _id: 0,
                    },
                };
                // User _id: 1 for application user, 2 for other party
                if(item.from === receiver)
                    message.user._id = 1;
                else
                    message.user._id = 2;
                messageList.push(message);
            }
        });

        // Sort the messages by time
        messageList.sort((a, b) => {
            return a.createdAt.getTime() < b.createdAt.getTime();
        });

        // Update the message list
        this.setState({messages: messageList});
    };

    /*  GiftedChat component current options:
        user: integer to choose the current application user
        onSend: callback for the send message button
        renderAvatar: callback for rendering the avatar. {null} for no avatar.
        isAnimated: boolean to enable sliding animation when input box is tapped.
    */
    render() {
        return(
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user= {{
                    _id: 1,
                }}
                renderAvatar={null}
                isAnimated={true}
            />
        )
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