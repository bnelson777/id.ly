import { StyleSheet } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY } from './../styles/common';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },

    image: {
        width: 150,
        height: 150,
    },

    icon: {
        width: 25,
        height: 25,
    },

    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    column: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    
    words: {
        color: '#909090',
        paddingBottom: 20,
    }
});