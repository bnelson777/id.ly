import KeyboardSpacer from 'react-native-keyboard-spacer';
import React, {Component} from 'react';
import {
    Alert,
    StyleSheet,
    FlatList,
    View,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    Picker
} from 'react-native';
import styles from './styles';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as ReduxActions from '../../actions';

import {Actions} from 'react-native-router-flux';

// CREATEMESSAGE
// FUNCTION(S): This component displays a dropdown menu to select a message
// recipient and a textinput box to send a message to the selected recipient.
//
// FUTURE FUNCTION(S): A default card will be selected as the recipient if
// it is passed in as a prop. The recipient dropdown menu will distinguish
// between wallet cards and rolodex cards to display recipients correctly.
//
// EXPECTED PROP(S): this.props.recipient
// This component will expect a recipient (a card object) to be used as the
// default recipient selection. If an empty string is passed in instead, no
// default recipient will be selected.
class CreateMessage extends Component {
    constructor(props) {
        super(props);

        this.state = {message: "", recipient: "", sender: ""};
    }

    componentDidMount(){
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
    pressButton(label){
        Alert.alert(label);
        this.messageInput.clear();
    }

    render(){
        // Displays Cancel and Inbox buttons at top
        // Displays dropdown menu to select a recipient
        // Displays text input box to type message at bottom and send button
        // Message is stored in this.state.message
        // Recipient is stored in this.state.recipient using the recipient card id field
        return (
            <View style={styles.container}>
                <View style={styles.midContainer}>
                    <Text style={styles.fieldText}>To: </Text>
                    <Picker selectedValue = {this.state.recipient}
                        onValueChange = {this.updateRecipient}
                        style={styles.picker}
                        mode='dropdown'>
                        {this.props.cards.map((card, index) => {
                            return <Picker.Item label={card.name + ": " + card.label} value={card.id} key={index}/>
                        })}
                    </Picker>
                </View>
                <View style={styles.midContainer}>
                    <Text style={styles.fieldText}>From: </Text>
                    <Picker selectedValue = {this.state.sender}
                        onValueChange = {this.updateSender}
                        style={styles.picker}
                        mode='dropdown'>
                        {this.props.cards.map((card, index) => {
                            return <Picker.Item label={card.name + ": " + card.label} value={card.id} key={index}/>
                        })}
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
                        <TouchableOpacity onPress={() => this.pressButton("Sending to card " + this.state.recipient.toString())}>
                            <Image
                                style={styles.imageContainer}
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