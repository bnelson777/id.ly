import { StyleSheet, Image } from 'react-native';
import { BORDER_WIDTH, FONT_SIZE, IDLY_BLUE,
    BACKGROUND_COLOR, FONT_WEIGHT } from '../styles/common';
    
export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: BACKGROUND_COLOR
    },

    buttonContainer:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        backgroundColor: BACKGROUND_COLOR
    },

    row:{
        borderBottomWidth: BORDER_WIDTH,
        borderColor: "#ccc",
        padding: 10
    },

    header:{
        backgroundColor: '#128DC9',
        fontWeight: 'bold',
        fontSize: FONT_SIZE,
        color: '#FFFFFF',
        paddingLeft: 10
    },

    button:{
        backgroundColor: IDLY_BLUE,
        width: 150,
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5
    },

    name: {
        fontSize: FONT_SIZE,
        fontWeight: FONT_WEIGHT,
        marginTop: 8 * 2
    },

    cardPosition: {
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    imageStyle: {
        width: 180,
        height: 180,
        resizeMode: Image.resizeMode.contain
    }
});