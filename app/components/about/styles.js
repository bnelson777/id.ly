import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY } from './../styles/common';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },

    image: {
        width: screenWidth * 0.48,
        height: screenWidth * 0.48,
    },

    icon: {
        width: screenWidth * 0.08,
        height: screenWidth * 0.08,
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
        paddingBottom: screenHeight * 0.03
    }
});