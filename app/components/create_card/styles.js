import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY, FONT_SIZE, FONT_WEIGHT, FONT_COLOR, FONT_NORMAL, BACKGROUND_COLOR, BORDER_RADIUS, BORDER_WIDTH } from './../styles/common';
        
const SCREEN_WIDTH = Dimensions.get('window').width;

export default StyleSheet.create({
    bodyContainer: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR
    },
    topButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    screenContainer: {
        flex: 10,
        flexDirection: 'row',
    },
    inputContainer: {
        flex: 1
    },
    formContainer: {
        flex: 3,
    },
    formItemContainer: {
        margin: '1%'
    },
    formTitle: {
    },
    formInput: {
        borderRadius: BORDER_RADIUS,
        margin: '5%'
    },
    addImageContainer: {
        flex: 2,
        alignItems: 'center'
    },
    addFieldButton: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        padding: '5%',
        fontSize: 20,
        color: 'blue'
    },
});