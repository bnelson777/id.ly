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
        alignItems: 'stretch'
    },
    addFieldButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButtonImage: {
        height: 20,
        width: 20
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
    imageDropdown: { 
    },
    imageStyle: {
        width: 140,
        height: 140,
        alignSelf: 'center'
    }
});
