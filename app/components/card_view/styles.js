import { StyleSheet } from 'react-native';
import { FONT_SIZE, FONT_WEIGHT } from '../styles/common';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: BACKGROUND_COLOR
    },

    activityIndicatorContainer:{
        backgroundColor: BACKGROUND_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    row:{
        borderBottomWidth: BORDER_WIDTH,
        borderColor: "#ccc",
        padding: 10
    },

    name: {
        fontSize: FONT_SIZE,
        fontWeight: FONT_WEIGHT,
        marginTop: 8 * 2
    },

    info: {
        marginTop: 5,
        fontSize: FONT_SIZE,
    },
    imageStyle: {
        width: 180,
        height: 180,
        resizeMode: Image.resizeMode.contain
    }
});