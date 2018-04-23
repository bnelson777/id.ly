'use strict';

import React, { Component } from 'react';
import styles from './styles';

import { 
    View,
    Text,
    TextInput,
    Button 
} from 'react-native';

import * as ReduxActions from '../../actions';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class MessageThread extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userIdentity: "",
            sender: "5c18585e73bf993099a060dc0c9d69c98f9d2e7817288e9b5d70987de37fb68f90918ecf4eda43460c83eb2426ea661cc5adb2b0b0e478f22a42bd7f5209344ac00c77fa891c9b6f8a1acd1435ce27112997af02dcd08cfe8f81e06012b1f0af76d5a47b747db0eedc4a26c177518e962ee5660edaf912cd47bf09452655b0e9",
            receiver: "acf5c12879f83dc60fb4bfb31fd11b398a96977289d8ef98c525121ee419d86b8858caa1544ade99a43a0ddc8742f630cb2a3ef669e0c46406df593207a6fd811185314c558dcfa85fdee6dfcf3c6ec5e06bfc8c3ba95d06bed62b62217812dabe467773297fb2e7498e78d22f2a7a3d6e216d52773f9885f01cddfa33c3d679",
        };
    };

    componentDidMount() {
        this.props.getMessages();
        this.props.getCards();
    }

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

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
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