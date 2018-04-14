import { StyleSheet, Dimensions} from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY, BACKGROUND_COLOR, BORDER_RADIUS } from './../styles/common';

const {width} = Dimensions.get('window');
const screenWidth = width;
const buttonHeight = screenWidth * 0.10;

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
    }
});
