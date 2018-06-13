import { StyleSheet, Dimensions } from 'react-native';
import { BACKGROUND_COLOR, BORDER_COLOR, BORDER_RADIUS, BORDER_WIDTH, FONT_SIZE } from './../styles/common';

const screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        height: screenHeight * 0.06,
        borderColor: BORDER_COLOR,
        borderWidth: BORDER_WIDTH,
        margin: 10,
        borderRadius: BORDER_RADIUS,
        padding: 5,
    },
    title: {
        fontSize: FONT_SIZE,
        fontWeight: "600",
        marginTop: screenHeight * 0.024,
        marginBottom: screenHeight * 0.075
    }
});