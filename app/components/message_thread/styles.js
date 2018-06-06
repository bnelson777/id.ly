import { StyleSheet } from 'react-native';
import { IDLY_BLUE } from './../styles/common';

export default StyleSheet.create({
    meButton: {
        right: 0,
        width: 36,
        height: 22,
        backgroundColor: IDLY_BLUE,
        justifyContent: 'center',
        alignItems: 'center'
    },

    meButtonText: {
        fontWeight: '500',
        fontSize: 22,
        color: "white"
    },
});
