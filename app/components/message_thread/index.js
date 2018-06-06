/**
 * Create Message Thread Page
 * by id.ly Team
 */
'use strict';

//Import Libraries
import React, { Component } from 'react';
import styles from './styles';
import { View, Text, TextInput,
        TouchableOpacity,
        FlatList,
        Clipboard } from 'react-native';
import * as ReduxActions from '../../actions';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat';

/*  # MessageThread component #
    Handles the rendering of a message thread between two identities.
    Uses GiftedChat to handle UI.
    Allows resending messages through longpress.

    # Expected Props #
    title: STRING of label to display at the top
    pair: OBJECT {
          sender: STRING sender id,
          receiver: STRING receiver id,
          senderCard: OBJECT senderCard,
          receiverCard: OBJECT receiverCard
    }
*/
export class MessageThread extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.retrieveMessages = this.retrieveMessages.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.generateID = this.generateID.bind(this);
        this.generateTimestamp = this.generateTimestamp.bind(this);
        this.onLongPress = this.onLongPress.bind(this);
        this.getMessageByID = this.getMessageByID.bind(this);
        this.markAsRead = this.markAsRead.bind(this);
    };

    static navigationOptions = ({ navigation  }) => {

            const {state} = navigation;

            if(state.params != undefined){
                return {
                    headerRight:
                    <TouchableOpacity
                        style={styles.meButton}
                        onPress={() => Actions.card_view({
                            title: state.params.senderCard.name,
                            card: state.params.senderCard,
                            isWallet: true
                        })}
                    >
                    <Text style={styles.meButtonText}>ME</Text>
                    </TouchableOpacity>
                }
            }

    };

    // Calls the function to mark messages as read
    markAsRead() {
        this.props.setMessagesAsRead({
            _1: this.props.pair.sender,
            _2: this.props.pair.receiver
        });
    }

    // Generates a unique ID for a new message
    generateID() {
        let d = new Date().getTime();
        let id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(5);
        });
        return id;
    }

    // Generates a timestamp for new messages
    generateTimestamp() {
        var time = new Date().getTime()/1000
        var time_round = parseInt(time)
        return time_round
    }

    // When component mounts, retrieve the messages and cards
    componentDidMount() {
        // set label of sender button top right
        const {setParams} = this.props.navigation;
        setParams({senderCard: this.props.pair.senderCard});

        this.props.getMessages();
        this.props.getCards();
        this.retrieveMessages();
        this.markAsRead();
    }

    // Retrieves a message by its ID
    getMessageByID(id) {
        for(let i = 0; i < this.props.messages.length; ++i) {
            if(this.props.messages[i].id === id) {
                return this.props.messages[i];
            }
        }
    }

    // Longpress callback passed into the GiftedChat for longpress
    // event handled for each message bubble
    onLongPress(context, message) {
        let msg = this.getMessageByID(message._id);
        setTimeout(function(){
            Actions.lockbox({title:"Resend Message", mode: "encrypt", message: msg, returnTo: "thread"});
        }, 100);
    }

    // Callback function for the send button
    onSend(messages = []) {
        this.setState(previousState => (
            {
                messages: GiftedChat.append(previousState.messages, messages),
            }
        ),
        this.sendMessage)
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
                if(item.from === receiver) {
                    message.user._id = 2;
                    if(this.props.pair.senderCard.image !== null) {
                        message.user.avatar = this.props.pair.receiverCard.image;
                    } else {
                        message.user.avatar = portrait;
                    }
                }
                else
                    message.user._id = 1;
                messageList.push(message);
            }
        });

        // Sort the messages by time
        messageList.sort((a, b) => {
            return a.createdAt.getTime() < b.createdAt.getTime();
        });

        // Update the message list
        this.setState({messages : messageList});
    };

    // Event handler for button.
    sendMessage() {
      let id = this.generateID();
      let unix = this.generateTimestamp();
      let message = {"id": id, "to": this.props.pair.receiver, "from": this.props.pair.sender, "body": this.state.messages[0].text, "time": unix, "read": true};
      // add to senders persistant storage
      this.props.addMessage(message);
      // set same message object but with read set to false for the reciever
      message = {"id": id, "to": this.props.pair.receiver, "from": this.props.pair.sender, "body": this.state.messages[0].text, "time": unix, "read": false};
      setTimeout(function(){
          Actions.lockbox({title:"Encrypt Message", mode: "encrypt", message: message, returnTo: "thread"});
      }, 100);
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
                onLongPress={this.onLongPress}
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
