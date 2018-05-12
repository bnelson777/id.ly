import { StyleSheet, Dimensions} from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY, 
        BACKGROUND_COLOR, BORDER_RADIUS } from './../styles/common';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const buttonHeight = screenWidth * 0.10;
const boxBorderWidth = 1;
const boxWidth = screenWidth * 0.8;
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

    midContainer: {
        height: screenHeight*0.1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    bottomContainer: {
        height: screenHeight*0.78,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingTop: screenHeight*0.78*0.4
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
        marginRight: screenWidth * 0.01,
        marginLeft: screenWidth * 0.1,
        borderLeftWidth: boxBorderWidth,
        borderRightWidth: boxBorderWidth,
        borderTopWidth: boxBorderWidth,
        borderBottomWidth: boxBorderWidth,
        alignItems: 'center',
        justifyContent: 'center',
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
        marginLeft: screenWidth * 0.02,
        marginRight: screenWidth * 0.03,
        marginTop: screenHeight * 0.2,
        marginBottom: screenHeight * 0.05,
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

    sepLine: {
        height: 1,
        width: "96%",
        backgroundColor: "#CED0CE",
        marginLeft: "2%",
    },
});
