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

class CreateMessage extends Component {
    constructor(props) {
        super(props);

        this.state = {message: "", recipient: ""};
    }

    componentDidMount(){
        this.props.getCards();
    }

    updateRecipient = (recipient) => {
        this.setState({recipient: recipient})
    }

    // Dummy function for button presses
    pressButton(label){
        Alert.alert(label);
        this.messageInput.clear();
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={[styles.itemContainer, styles.topContainer]}>
                    <View style={[styles.button, styles.topButton, styles.cancelButton]}>
                        <TouchableOpacity onPress={() => this.pressButton("Go back")}>
                            <Text style={styles.topButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.button, styles.topButton, styles.inboxButton]}>
                        <TouchableOpacity onPress={() => {Actions.inbox()}}>
                            <Text style={styles.topButtonText}>Inbox</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
                <View style={[styles.itemContainer, styles.bottomContainer]}>
                    <View style={styles.messageBox}>
                        <TextInput
                            ref={input => {this.messageInput = input}}
                            style={styles.inputStyle}
                            placeholder=" Enter Text..."
                            returnKeyLabel={"Done"}
                            onChangeText={(text) => this.setState({message:text})}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                    <View style={[styles.button, styles.imageButton]}>
                        <TouchableOpacity onPress={() => this.pressButton(this.state.recipient.toString())}>
                            <Image
                                style={styles.imageContainer}
                                source={require('../../assets/send.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
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