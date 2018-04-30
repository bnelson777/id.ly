import { StyleSheet } from 'react-native';
import { BACKGROUND_COLOR, BORDER_COLOR, BORDER_RADIUS, BORDER_WIDTH, FONT_SIZE } from './../styles/common';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        height: 40,
        borderColor: BORDER_COLOR,
        borderWidth: BORDER_WIDTH,
        margin: 10,
        borderRadius: BORDER_RADIUS,
        padding: 5,
    },
    title: {
        fontSize: FONT_SIZE,
        fontWeight: "600",
        marginTop: 8 * 2,
        marginBottom: 50
    }
});