
import { StyleSheet } from 'react-native';
import { BACKGROUND_COLOR, FONT_SIZE, BORDER_WIDTH } from './../styles/common';

export default StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BACKGROUND_COLOR
    },

    inputBox: {
        width: '75%',
        borderRadius: 1,
        borderWidth: 0.5,
        borderColor: 'black',
        fontSize: FONT_SIZE,
        fontWeight: 'bold',
        marginBottom: 20,
    },

    button: {
        marginTop: 20
    },
});
