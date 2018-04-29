/**
 * Create Create Message Page
 * by id.ly Team
 */

//Import Libraries
import KeyboardSpacer from 'react-native-keyboard-spacer';
import React, { Component } from 'react';
import { Alert, StyleSheet, FlatList,
        View, Text, TextInput, 
        TouchableHighlight, TouchableOpacity,
        Image, Picker } from 'react-native';
import styles from './styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReduxActions from '../../actions';
import { Actions } from 'react-native-router-flux';

// CREATEMESSAGE
// FUNCTION(S): This component displays a dropdown menu to select a message
// recipient and a textinput box to send a message to the selected recipient.
// If a recipient is passed in as an argument, it will be the default value in
// the picker. Otherwise, the first card in the picker will be the default.
//
// FUTURE FUNCTION(S): The recipient dropdown menu will distinguish
// between wallet cards and rolodex cards to display recipients correctly.
//
// EXPECTED PROP(S): this.props.recipient
// This component will expect a recipient (a card object) to be used as the
// default recipient selection. If an empty string is passed in instead, no
// default recipient will be selected.
class CreateMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          message: "",
          recipient: this.props.recipient,
          sender: ""
        };
        this.generateID = this.generateID.bind(this);
        this.generateTimestamp = this.generateTimestamp.bind(this);
    }

    generateID() {
        let d = new Date().getTime();
        let id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(5);
        });
        return id;
    }

    generateTimestamp() {
        var time = new Date().getTime()/1000
        var time_round = parseInt(time)
        return time_round
    }

    componentDidMount() {
        this.props.getCards();
    }

    // Update recipient when selected from dropdown menu
    updateRecipient = (recipient) => {
        this.setState({recipient: recipient})
    }

    // Update recipient when selected from dropdown menu
    updateSender = (sender) => {
        this.setState({sender: sender})
    }

    // Dummy function for button presses
    pressButton() {
        //Alert.alert(label);
        //this.messageInput.clear();
        let id = this.generateID();
        let unix = this.generateTimestamp();
        let message = {"id": id, "to": this.state.recipient, "from": this.state.sender, "body": this.state.message, "time": unix, "read": false};
        this.props.addMessage(message);
        Actions.lockbox({title:"Encrypt Message", mode: "encrypt", message: message});

    }

    render() {
        // Displays Cancel and Inbox buttons at top
        // Displays dropdown menu to select a recipient
        // Displays text input box to type message at bottom and send button
        // Message is stored in this.state.message
        // Recipient is stored in this.state.recipient using the recipient card id field

        const from = this.props.cards.filter(function(obj) {return obj.owner == true}).map(card => {
            return (
                <Picker.Item key= {card.id} label={card.name + ": " + card.label} value={card.keys.n} />
            )
        })
        from.unshift(<Picker.Item key = "default" value={0} label="Sender" />)

        const to = this.props.cards.filter(function(obj) {return obj.owner == false}).map(card => {
            return (
                <Picker.Item key= {card.id} label={card.name + ": " + card.label} value={card.keys.n} />
            )
        })
        to.unshift(<Picker.Item key = "default" value={0} label="Receiver" />)

        let buttonStyle = (this.state.sender != 0 && this.state.recipient != 0 && this.state.message.length > 0) ?
            styles.imageContainer : [styles.imageContainer, styles.imageDisabled];

        return (
            <View style={styles.container}>
                <View style={styles.midContainer}>
                    <Text style={styles.fieldText}>From: </Text>
                    <Picker selectedValue = {this.state.sender}
                        onValueChange = {this.updateSender}
                        style={styles.picker}
                        mode='dropdown'>
                        {from}
                    </Picker>
                </View>
                <View style={styles.midContainer}>
                    <Text style={styles.fieldText}>To: </Text>
                    <Picker selectedValue = {this.state.recipient}
                        onValueChange = {this.updateRecipient}
                        style={styles.picker}
                        mode='dropdown'>
                        {to}
                    </Picker>
                </View>
                <View style={[styles.itemContainer, styles.bottomContainer]}>
                    <View style={styles.messageBox}>
                        <TextInput
                            ref={input => {this.messageInput = input}}
                            style={styles.inputStyle}
                            placeholder=" Enter Text..."
                            onChangeText={(text) => this.setState({message:text})}
                            underlineColorAndroid='transparent'
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
                </View>
                <KeyboardSpacer/>
            </View>
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
