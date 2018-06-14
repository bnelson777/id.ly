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

    buttonContainer:{
        flex:0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: screenHeight * 0.015,
        backgroundColor: BACKGROUND_COLOR
    },

    row:{
        borderBottomWidth: BORDER_WIDTH,
        borderColor: "#ccc",
        padding: screenHeight * 0.015
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
        width: screenWidth * 0.43,
        height: screenWidth * 0.43,
        backgroundColor:'#FFFFFF',
        borderRadius: screenWidth * 0.215
    }
});