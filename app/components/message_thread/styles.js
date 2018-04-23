import { StyleSheet } from 'react-native';
import { } from './../styles/common';

export default StyleSheet.create({
    container: {
        paddingTop: 20,
        alignItems: 'stretch'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'stretch',
        paddingBottom: 50
    },
    messageThread: {
        flexDirection: 'column',
        paddingBottom: 100
    },
    receiverText: {
        color: 'black',
        textAlign: 'right',
        fontSize: 30
    },
    senderText: {
        color: 'white',
        textAlign: 'left',
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
    identityText: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    inboxButton: {
        paddingRight: 100
    }
});
