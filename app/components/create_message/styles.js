import { StyleSheet, Dimensions, Platform } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY, 
        BACKGROUND_COLOR, BORDER_RADIUS } from './../styles/common';

const {height, width} = Dimensions.get('window');
const screenWidth = width;
const screenHeight = height;
const buttonHeight = screenWidth * 0.10;
const boxBorderWidth = 1;
const boxWidth = screenWidth * 0.6;
const boxHeight = screenHeight * 0.075;
const IsIOS = Platform.OS == 'ios';
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

    midContainer: {
        flex: 0.2,
        flexDirection: 'row',
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

    imageDisabled: {
        tintColor: 'lightgrey'
    },

    fieldText: {
        flex: 1,
        fontSize: 20,
        marginLeft: screenWidth * 0.02
    },

    listButton: {
        width: buttonHeight,
        flex: 1,
        marginRight: screenWidth * 0.02
    },

    selectButton: {
        fontSize: 32,
        marginBottom: screenHeight * 0.005
    },

    textInputContainer: {
        flexDirection: 'row',
        paddingLeft: 8,
        paddingRight: 8
    },

    textInput: {
        paddingLeft: 10,
        fontSize: 17,
        flex: 1,
        backgroundColor: 'white',
        borderWidth: 0,
        borderRadius: IsIOS ? 4 : 0,
    }
});
