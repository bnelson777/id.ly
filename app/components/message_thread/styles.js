import { StyleSheet } from 'react-native';
import { } from './../styles/common';

export default StyleSheet.create({
    container: {
        paddingTop: 20,
        alignItems: 'stretch'
    },

    receiverText: {
        color: 'black',
        textAlign: 'left',
        fontSize: 30
    },

    senderText: {
        color: 'white',
        textAlign: 'right',
        fontSize: 30
    },

    sentMessage: {
        backgroundColor: 'skyblue'
    },

    receivedMessage: {
        backgroundColor: 'lightgrey'
    },

    inputBox: {
        height: 40,
    },
    
    inboxButton: {
        paddingRight: 100
    }
});
