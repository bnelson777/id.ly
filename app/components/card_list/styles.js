import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY, 
        BACKGROUND_COLOR, BORDER_RADIUS, IDLY_BLUE } from './../styles/common';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const buttonHeight = screenWidth * 0.1;
const iconHeight = screenWidth * 0.05;
const listHeight = screenWidth * 0.13;

// Set alternating colors for ID buttons
export const COLORS = ['#FFEF00', '#FF9A00', '#FF4444', '#682CBF', '#128DC9', '#87C735'];

export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FFFFFF'
    },

    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: screenWidth,
        height: listHeight,
        marginTop: screenHeight * 0.015
    },

    imageContainer: {
        width: iconHeight,
        height: iconHeight,
        resizeMode: 'contain'
    },

    button: {
        height: buttonHeight,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: BORDER_RADIUS,
        marginTop: screenHeight * 0.009,
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
    },

    noBotBorder: {
        flexDirection: 'row',
    },

    listContainer: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 0, 
        borderBottomWidth: 0,
        marginTop: 0
    },

    sepLine: {
        height: 1,
        width: "86%",
        backgroundColor: "#CED0CE",
        marginLeft: "14%",
    },

    toleft: {
        paddingLeft: 2,
        justifyContent: 'flex-start'
    },

    emptyTextContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    emptyText: {
        fontSize: screenHeight * 0.0297,
        marginLeft: "10%",
        marginRight: "10%"
    },

    tipText: {
        color: IDLY_BLUE
    },

    roundedImg:{
        borderWidth:1,
        borderColor:'rgba(0,0,0,0)',
        alignItems:'center',
        justifyContent:'center',
        width: buttonHeight,
        height: buttonHeight,
        backgroundColor:'#FFFFFF',
        borderRadius: buttonHeight / 2
    }
});
