'use strict';

import React, { Component } from 'react';
import styles from './styles';

import { 
    View,
    Text,
    TextInput,
    Button,
    FlatList 
} from 'react-native';

import * as ReduxActions from '../../actions';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class MessageThread extends Component {
    constructor(props) {
        super(props);

        this.renderItem = this.renderItem.bind(this);
        this.retrieveMessages = this.retrieveMessages.bind(this);

        this.state = {
            messages: [],
        };
    };

    // When component mounts, retrieve the messages and cards
    // TODO: remove cards if required as it is currently unused.
    componentDidMount() {
        this.props.getMessages();
        this.props.getCards();
    }

    retrieveMessages() {
        let messages = this.props.messages;
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
          console.log('receiver', this.props.pair.receiver)
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

                    {/* The container for our messages. The separator currently does not work.

                        TODO: Create a 'working' separator between each messsage.
                    */}
                    <FlatList
                        itemSeparatorComponent={()=>(
                            <View style={styles.separator}/>
                        )}
                        data={this.props.messages}
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
                            onPress={this.retrieveMessages}
                        />
                    </View>
                </View>
            );
        }
    }

    // renderItem uses iteration of data object indices to retrieve messages.
    // Current data used is the message prop from our state
    renderItem = ({item, index}) => {
        console.log(item.body);
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