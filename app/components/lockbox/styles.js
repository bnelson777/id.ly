import { StyleSheet, Dimensions } from 'react-native';
import { BACKGROUND_COLOR, BORDER_COLOR, BORDER_RADIUS, BORDER_WIDTH } from './../styles/common';
const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
    },

    row: {
        flex:1,
        paddingLeft:10,
        paddingRight:10
    },

    saveBtn:{
        width: windowWidth,
        height: 44,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor:"#6B9EFA"
    },

    buttonText:{
        fontWeight: "500",
    },

    quote: {
        fontSize: 12,
        lineHeight: 12,
        color: "#333333",
        padding: 16,
        paddingLeft:0,
        flex:1,
        height: 150,
        marginBottom:50,
        borderTopWidth: 1,
        borderColor: "rgba(212,211,211, 0.3)",
    },
});
