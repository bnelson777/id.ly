import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY, IDLY_BLUE,
        BACKGROUND_COLOR, BORDER_RADIUS } from './components/styles/common';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// Used for navigation bar components such as icon parameters and colors.
// These styles are are a companion file to the main index.js for the app.


export default StyleSheet.create({
    subtitle: {
        fontWeight: '500',
        fontSize: 22,
    },

    rightButton: {
        right: 0
    },

    rightButtonIcon: {
        right: 0,
        width: screenWidth * 0.0896,
        height: screenWidth * 0.0896
    },

    idlyColor: {
        backgroundColor: IDLY_BLUE
    },

    textColor: {
        fontWeight: '500',
        fontSize: 22,
        textAlign: 'center',
        alignSelf: 'center'
    },
});
