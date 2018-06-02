import { StyleSheet, Dimensions } from 'react-native';
import { } from './../styles/common';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    container: {
        paddingTop: screenHeight * 0.03,
        alignItems: 'stretch'
    },

    receiverText: {
        color: 'black',
        textAlign: 'left',
        fontSize: screenHeight * 0.0495
    },

    senderText: {
        color: 'white',
        textAlign: 'right',
        fontSize: screenHeight * 0.0495
    },

    sentMessage: {
        backgroundColor: 'skyblue'
    },

    receivedMessage: {
        backgroundColor: 'lightgrey'
    },

    inputBox: {
        height: screenHeight * 0.06,
    },

    inboxButton: {
        paddingRight: screenWidth * 0.32
    }
});
