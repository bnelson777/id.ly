import { StyleSheet, Dimensions } from 'react-native';
import { BACKGROUND_COLOR, FONT_SIZE, BORDER_WIDTH } from './../styles/common';

const Height = Dimensions.get('window').height;

export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: BACKGROUND_COLOR,
        flexDirection: 'column',
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

    title: {
        fontSize: FONT_SIZE,
        fontWeight: "600",
        marginTop: 8 * 2
    },

    firstRow: {
        height: Height * 0.3,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 30
    },

    secondRow: {
        height: Height * 0.5,
    },

    thirdRow: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 17,
        paddingRight: 5
    }
});
