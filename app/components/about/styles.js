import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY } from './../styles/common';


const Height = Dimensions.get('window').height;

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },

    image: {
        width: 236,
        height: 136,
    },

    icon: {
        width: 30,
        height: 30,
    },

    row: {
        paddingTop: Height * 0.02,
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
        textAlign: 'center'
    }
});