import { StyleSheet, Dimensions} from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY, BACKGROUND_COLOR, BORDER_RADIUS } from './../styles/common';

const {width} = Dimensions.get('window');
const screenWidth = width;
const buttonHeight = screenWidth * 0.10;

// Set alternating colors for ID buttons
export const COLORS = ['#FF0000', '#00FF00', '#0000FF'];

export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: BACKGROUND_COLOR
    },

    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: screenWidth,
    },

    headContainer: {
        flex: 0.1
    },

    bodyContainer: {
        flex: 0.9
    },

    imageContainer: {
        width: buttonHeight,
        height: buttonHeight,
        resizeMode: 'contain'
    },

    button: {
        height: buttonHeight,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: BORDER_RADIUS,
        marginTop: 6,
    },

    topButtonText: {
        color: '#6666EE'
    },

    topButton: {
        width: screenWidth * 0.3,
    },

    homeButton: {
        marginLeft: screenWidth * 0.05,
        marginRight: screenWidth * 0.15
    },

    addButton: {
        marginLeft: screenWidth * 0.15,
        marginRight: screenWidth * 0.05
    },

    imageButton: {
        width: buttonHeight,
        backgroundColor: BACKGROUND_COLOR
    },

    imageButtonWallet: {
        marginLeft: screenWidth * 0.05,
    },

    imageButtonRolodex: {
        marginLeft: screenWidth * 0.01,
    },

    gotoButton: {
        width: buttonHeight,
        backgroundColor: BACKGROUND_COLOR
    },

    gotoButtonWallet: {
        marginRight: screenWidth * 0.05,
    },

    gotoButtonRolodex: {
        marginLeft: screenWidth * 0.01,
        marginRight: screenWidth * 0.01,
    },

    cardButton: {
        width: screenWidth * 0.6,
    },

    cardButtonWallet: {
        marginLeft: screenWidth * 0.05,
        marginRight: screenWidth * 0.05
    },

    cardButtonRolodex: {
        marginLeft: screenWidth * 0.03,
        marginRight: screenWidth * 0.01
    }
});
