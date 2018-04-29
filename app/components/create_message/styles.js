import { StyleSheet, Dimensions} from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY, 
        BACKGROUND_COLOR, BORDER_RADIUS } from './../styles/common';

const {height, width} = Dimensions.get('window');
const screenWidth = width;
const screenHeight = height;
const buttonHeight = screenWidth * 0.10;
const boxBorderWidth = 1;
const boxWidth = screenWidth * 0.6;
const boxHeight = screenHeight * 0.075;

export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: BACKGROUND_COLOR
    },

    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: screenWidth,
    },

    topContainer: {
        flex: 0.1
    },

    midContainer: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center'
    },

    bottomContainer: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },

    button: {
        height: buttonHeight,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: BORDER_RADIUS
    },

    topButtonText: {
        color: '#6666EE'
    },

    topButton: {
        width: screenWidth * 0.3,
    },

    cancelButton: {
        marginLeft: screenWidth * 0.05,
        marginRight: screenWidth * 0.15,
        marginTop: 6
    },

    inboxButton: {
        marginLeft: screenWidth * 0.15,
        marginRight: screenWidth * 0.05,
        marginTop: 6
    },

    messageBox: {
        width: boxWidth,
        maxHeight: boxHeight,
        marginTop: screenHeight * 0.3,
        marginBottom: screenHeight * 0.15,
        marginRight: screenWidth * 0.05,
        marginLeft: screenWidth * 0.1,
        borderLeftWidth: boxBorderWidth,
        borderRightWidth: boxBorderWidth,
        borderTopWidth: boxBorderWidth,
        borderBottomWidth: boxBorderWidth,
        alignItems: 'center',
        justifyContent: 'center'
    },

    inputStyle: {
        width: boxWidth,
        height: boxHeight,
        fontSize: 18,
        fontStyle: 'italic'
    },

    imageButton: {
        width: buttonHeight,
        backgroundColor: BACKGROUND_COLOR,
        marginLeft: screenWidth * 0.05,
        marginRight: screenWidth * 0.1,
        marginTop: screenHeight * 0.2,
        marginBottom: screenHeight * 0.05
    },

    imageContainer: {
        width: buttonHeight,
        height: buttonHeight,
        resizeMode: 'contain'
    },

    fieldText: {
        fontSize: 16,
        fontStyle: 'italic',
        marginLeft: screenWidth * 0.05,
        marginBottom: screenHeight * 0.05,
        marginTop: screenHeight * 0.05
    }
});
