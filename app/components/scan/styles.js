import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY } from './../styles/common';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },

    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },

    rectangle: {
        height: screenWidth * 0.64,
        width: screenWidth * 0.64,
        borderWidth: 1,
        borderColor: '#128DC9',
        backgroundColor: 'transparent'
    },

    rectangleText: {
        flex: 0,
        color: '#fff',
        marginTop: screenHeight * 0.015
    },
    
    border: {
        flex: 0,
        width: screenWidth * 0.64,
        height: 2,
        backgroundColor: '#128DC9',
    }
});
