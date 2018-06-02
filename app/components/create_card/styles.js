import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY, FONT_SIZE,
        FONT_WEIGHT, FONT_COLOR, FONT_NORMAL,
        BACKGROUND_COLOR, BORDER_RADIUS, IDLY_BLUE,
        BORDER_WIDTH } from './../styles/common';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    bodyContainer: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR
    },

    ButtonContainer: {
        backgroundColor: IDLY_BLUE,
        width: screenWidth * 0.64,
        height: screenHeight * 0.0675,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5
    },

    screenContainer: {
        flex: 10,
        flexDirection: 'row',
    },

    inputContainer: {
        flex: 1,
        alignSelf: 'center'
    },

    formContainer: {
        flex: 3
    },

    formItemContainer: {
        margin: '1%',
    },

    formTitle: {
    },

    formInput: {
        flex: 1,
    },

    addImageContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    addFieldButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    addAttributeContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        left: 5
    },

    buttonText: {
        padding: '5%',
        color: 'blue'
    },

    cardPosition: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: screenHeight * 0.015
    },

    roundedImg:{
        borderWidth:1,
        borderColor:'rgba(0,0,0,0)',
        alignItems:'center',
        justifyContent:'center',
        width: screenWidth * 0.43,
        height: screenWidth * 0.43,
        backgroundColor:'#FFFFFF',
        borderRadius: 100
    }
});
