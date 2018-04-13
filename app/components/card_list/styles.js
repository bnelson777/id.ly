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

    homeButton: {
        width: screenWidth * 0.3,
        marginLeft: screenWidth * 0.05,
        marginRight: screenWidth * 0.15
    },

    addButton: {
        width: screenWidth * 0.3,
        marginLeft: screenWidth * 0.15,
        marginRight: screenWidth * 0.05
    },

    imageButtonWallet: {
        width: buttonHeight,
        marginLeft: screenWidth * 0.05,
        backgroundColor: BACKGROUND_COLOR
    },

    imageButtonRolodex: {
        width: buttonHeight,
        marginLeft: screenWidth * 0.01,
        backgroundColor: BACKGROUND_COLOR
    },

    gotoButtonWallet: {
        width: buttonHeight,
        marginRight: screenWidth * 0.05,
        backgroundColor: BACKGROUND_COLOR
    },

    gotoButtonRolodex: {
        width: buttonHeight,
        marginLeft: screenWidth * 0.01,
        marginRight: screenWidth * 0.01,
        backgroundColor: BACKGROUND_COLOR
    },

    cardButtonWallet: {
        width: screenWidth * 0.6,
        marginLeft: screenWidth * 0.05,
        marginRight: screenWidth * 0.05
    },

    cardButtonRolodex: {
        width: screenWidth * 0.6,
        marginLeft: screenWidth * 0.03,
        marginRight: screenWidth * 0.01
    },

    imageContainer: {
        width: buttonHeight,
        height: buttonHeight,
        resizeMode: 'contain'
    }
});
