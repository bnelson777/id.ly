/**
 * Create Create Message Page
 * by id.ly Team
 */

//Import Libraries
import KeyboardSpacer from 'react-native-keyboard-spacer';
import React, { Component } from 'react';
import { Alert, StyleSheet, FlatList, Keyboard,
        View, Text, TextInput, Platform,
        TouchableHighlight, TouchableOpacity,
        Image, KeyboardAvoidingView, Dimensions } from 'react-native';
import styles from './styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReduxActions from '../../actions';
import { Actions } from 'react-native-router-flux';
import ActionSheet from 'react-native-actionsheet';

const screenHeight = Dimensions.get('window').height;
const keyboardVerticalOffset = screenHeight * 0.14;

// CREATEMESSAGE
// FUNCTION(S): This component displays a menu to select a message sender and
// recipient and a textinput box to send a message to the selected recipient.
//
// EXPECTED PROP(S): this.props.sender, this.props.recipient
// This component will expect a sender or recipient (a card object) to be used as the
// default selection. If null is passed in instead, no default will be selected.
export class CreateMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          message: "",
          sender: this.props.sender === null ? "" : this.props.sender.keys.n,
          recipient: this.props.recipient === null ? "" : this.props.recipient.keys.n,
          senderLabel: this.props.sender === null ?
            "" : this.props.sender.name + " (" + this.props.sender.label + ")",
          recipientLabel: this.props.recipient === null ?
            "" : this.props.recipient.name + " (" + this.props.recipient.label + ")"
        };
        this.generateID = this.generateID.bind(this);
        this.generateTimestamp = this.generateTimestamp.bind(this);
        this.updateRecipient = this.updateRecipient.bind(this);
        this.updateSender = this.updateSender.bind(this);
    }

    // Generates a unique ID for the new message
    generateID() {
        let d = new Date().getTime();
        let id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(5);
        });
        return id;
    }

    // Generates the current timestamp for the new message
    generateTimestamp() {
        var time = new Date().getTime()/1000
        var time_round = parseInt(time)
        return time_round
    }

    // Retrieve the cards when the component mounts
    componentDidMount() {
        this.props.getCards();
    }

    // Update recipient when selected from dropdown menu
    updateRecipient(index, id, label) {
        if (index !== 0)
            this.setState({recipient: id, recipientLabel: label})
    }

    // Update recipient when selected from dropdown menu
    updateSender(index, id, label) {
        if (index !== 0)
            this.setState({sender: id, senderLabel: label})
    }

    // Callback function for the send button
    pressButton() {
        let id = this.generateID();
        let unix = this.generateTimestamp();
        let message = {"id": id, "to": this.state.recipient, "from": this.state.sender, "body": this.state.message, "time": unix, "read": true};
        // add to senders persistant storage
        this.props.addMessage(message);
        // set same message object but with read set to false for the reciever
        message = {"id": id, "to": this.state.recipient, "from": this.state.sender, "body": this.state.message, "time": unix, "read": false};
        setTimeout(function(){
            Actions.lockbox({title:"Encrypt Message", mode: "encrypt", message: message, returnTo: "inbox"});
        }, 100);
    }

    showFromSheet = () => {
        this.fromSheet.show();
    }

    showToSheet = () => {
        this.toSheet.show();
    }

    render() {
        // Displays Cancel and Inbox buttons at top
        // Displays dropdown menu to select a recipient
        // Displays text input box to type message at bottom and send button
        // Message is stored in this.state.message
        // Recipient is stored in this.state.recipient using the recipient card id field

        const labelsFrom = this.props.cards.filter(function(obj) {return obj.owner == true}).map(card => card.name + " (" + card.label + ")");
        labelsFrom.unshift('Cancel');
        const idFrom = this.props.cards.filter(function(obj) {return obj.owner == true}).map(card => card.keys.n);
        idFrom.unshift('');

        const labelsTo = this.props.cards.filter(function(obj) {return obj.owner == false}).map(card => card.name + " (" + card.label + ")");
        labelsTo.unshift('Cancel');
        const idTo = this.props.cards.filter(function(obj) {return obj.owner == false}).map(card => card.keys.n);
        idTo.unshift('');

        let buttonStyle = (this.state.sender != 0 && this.state.recipient != 0 && this.state.message.length > 0) ?
            styles.imageContainer : [styles.imageContainer, styles.imageDisabled];

        return (
            <KeyboardAvoidingView style={styles.container} behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
                <View style={styles.midContainer}>
                    <Text style={styles.fieldText}>{"Sender: " + this.state.senderLabel}</Text>
                    <TouchableOpacity onPress={this.showFromSheet}>
                        <View style={[styles.button, styles.listButton]}>
                            <Text style={styles.selectButton}>+</Text>
                        </View>
                    </TouchableOpacity>
                <ActionSheet
                    ref={o => {this.fromSheet = o}}
                    title={'Send from which card?'}
                    options={labelsFrom}
                    cancelButtonIndex={0}
                    onPress={(index) => this.updateSender(index, idFrom[index], labelsFrom[index])}
                />
                </View>
                <View style={styles.sepLine}/>
                <View style={styles.midContainer}>
                    <Text style={styles.fieldText}>{"Recipient: " + this.state.recipientLabel}</Text>
                        <TouchableOpacity onPress={this.showToSheet}>
                        <View style={[styles.button, styles.listButton]}>
                            <Text style={styles.selectButton}>+</Text>
                        </View>
                    </TouchableOpacity>
                    <ActionSheet
                        ref={o => {this.toSheet = o}}
                        title={'Send to which card?'}
                        options={labelsTo}
                        cancelButtonIndex={0}
                        onPress={(index) => this.updateRecipient(index, idTo[index], labelsTo[index])}
                    />
                </View>
                <TouchableOpacity
                    style={[styles.itemContainer, styles.bottomContainer]}
                    activeOpacity={1}
                    onPress={Keyboard.dismiss}
                >
                    <View style={styles.messageBox}>
                        <TextInput
                            ref={input => {this.messageInput = input}}
                            style={styles.inputStyle}
                            placeholder=" Enter Text..."
                            onChangeText={(text) => this.setState({message:text})}
                            underlineColorAndroid='transparent'
                            multiline={true}
                        />
                    </View>
                    <View style={[styles.button, styles.imageButton]}>
                        <TouchableOpacity onPress={() => this.pressButton()} disabled={(this.state.sender != 0 && this.state.recipient != 0 && this.state.message.length > 0) ? false : true}>
                            <Image
                                style={buttonStyle}
                                source={require('../../assets/send.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        cards: state.dataReducer.cards
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMessage);