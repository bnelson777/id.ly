import { StyleSheet, Image, Dimensions } from 'react-native';
import { BORDER_WIDTH, FONT_SIZE, IDLY_BLUE,
    BACKGROUND_COLOR, FONT_WEIGHT } from '../styles/common';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: BACKGROUND_COLOR
    },

    topContainer:{
        flex:2
    },

    buttonContainer:{
        flex:0.1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: screenHeight * 0.01,
        backgroundColor: BACKGROUND_COLOR,
        paddingBottom: screenHeight * 0.01
    },

    row:{
        borderBottomWidth: BORDER_WIDTH,
        borderColor: "#ccc",
        padding: screenWidth * 0.032
    },

    header:{
        backgroundColor: '#128DC9',
        fontWeight: 'bold',
        fontSize: FONT_SIZE,
        color: '#FFFFFF',
        paddingLeft: screenWidth * 0.032
    },

    button:{
        backgroundColor: IDLY_BLUE,
        width: screenWidth*0.3,
        height: screenHeight * 0.067,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5
    },

    walletButton:{
        backgroundColor: IDLY_BLUE,
        justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth*0.28,
        height: screenHeight * 0.067,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5
    },

    name: {
        fontSize: FONT_SIZE,
        fontWeight: FONT_WEIGHT,
        marginTop: screenHeight * 0.024
    },

    cardPosition: {
        paddingTop: screenHeight * 0.015,
        justifyContent: 'center',
        alignItems: 'center'
    },

    roundedImg:{
        borderWidth:1,
        borderColor:'rgba(0,0,0,0)',
        alignItems:'center',
        justifyContent:'center',
        width: screenWidth * 0.5,
        height: screenWidth * 0.5,
        backgroundColor:'#FFFFFF',
        borderRadius: 100
    }
});