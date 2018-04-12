import { StyleSheet } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY } from './../styles/common';

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
    message: {
        flexDirection: 'row',
    },
    inputBox: {
        height: 40,
    },
    identityText: {
        fontSize: 30,
        fontWeight: 'bold'
    },
});
