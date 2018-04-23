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
            userIdentity: "",
            sender: "5c18585e73bf993099a060dc0c9d69c98f9d2e7817288e9b5d70987de37fb68f90918ecf4eda43460c83eb2426ea661cc5adb2b0b0e478f22a42bd7f5209344ac00c77fa891c9b6f8a1acd1435ce27112997af02dcd08cfe8f81e06012b1f0af76d5a47b747db0eedc4a26c177518e962ee5660edaf912cd47bf09452655b0e9",
            receiver: "acf5c12879f83dc60fb4bfb31fd11b398a96977289d8ef98c525121ee419d86b8858caa1544ade99a43a0ddc8742f630cb2a3ef669e0c46406df593207a6fd811185314c558dcfa85fdee6dfcf3c6ec5e06bfc8c3ba95d06bed62b62217812dabe467773297fb2e7498e78d22f2a7a3d6e216d52773f9885f01cddfa33c3d679",
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
        const messages = this.props.messages;
        console.log(messages);
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
        // NOTE:
        // Currently retrieves from the state.

        // TODO:
        // Update to use the props instead when routes from the inbox pass props
        if(item.to === this.state.receiver && item.from === this.state.sender) {
            return (
                <View style={styles.receivedMessage}>
                    <Text style={styles.receiverText}>
                        {item.body}
                    </Text>
                </View>
            )
        } else if (item.from === this.state.receiver && item.to === this.state.sender) {
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