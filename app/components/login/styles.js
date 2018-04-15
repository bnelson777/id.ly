import { StyleSheet } from 'react-native';
import { BACKGROUND_COLOR, FONT_SIZE, BORDER_WIDTH } from './../styles/common';

export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: BACKGROUND_COLOR
    },

    title: {
        fontSize: FONT_SIZE,
        fontWeight: "600",
        marginTop: 8 * 2
    }
});
