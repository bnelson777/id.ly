import { StyleSheet, Dimensions } from 'react-native';
import { BACKGROUND_COLOR, FONT_SIZE,
        BORDER_WIDTH, IDLY_BLUE } from './../styles/common';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export const iconSize = screenHeight * 0.2;

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
        padding: screenWidth * 0.032
    },

    title: {
        fontSize: FONT_SIZE,
        fontWeight: "600",
        marginTop: screenHeight * 0.024
    },

    firstRow: {
        height: screenHeight * 0.2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: screenHeight * 0.03
    },

    secondRow: {
        height: screenHeight * 0.446,
        backgroundColor: '#F2F2F2'
    },

    thirdRow: {
        flex: 2,
        justifyContent: 'center'
    },

    forthRow: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: screenHeight * 0.051 < 34 ? 0 : screenHeight * 0.035,
        paddingRight: screenWidth * 0.016,
    },

    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: screenHeight * 0.458 * 0.025,
        borderRightWidth: screenHeight * 0.458 * 0.025,
        borderBottomWidth: screenHeight * 0.458 * 0.05,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center'
    },

    upSideDown: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: screenHeight * 0.458 * 0.025,
        borderRightWidth: screenHeight * 0.458 * 0.025,
        borderTopWidth: screenHeight * 0.458 * 0.05,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center'
    },

    cardContainer: {
        height: screenHeight * 0.4,
        borderRadius: 5,
        borderWidth: 0,
        marginTop: 0
    },

    button:{
        backgroundColor: IDLY_BLUE,
        justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth * 0.38,
        height: screenHeight * 0.0675,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 10
    },

    sepLine: {
        height: 2,
        width: "98%",
        backgroundColor: "#CED0CE",
        marginLeft: "1%",
    },

    nocard:{
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: screenHeight * 0.15,
    },

    CardInner: {
        height: screenHeight * 0.25,
        flexDirection: 'row',
    },

    CardInfo: {
        height: screenHeight * 0.25,
        alignItems: 'flex-start',
        justifyContent: 'center',      
        width: screenWidth * 0.43,
    },

    cardTitle: {
        fontWeight: '500',
        fontSize: screenHeight * 0.05,
        color: '#000000'
    },

    cardSubTitle: {
        fontWeight: '500',
        fontSize: screenHeight * 0.025,
        color: '#585858',
    },

    cardButton:{
        backgroundColor: IDLY_BLUE,
        width: screenWidth*0.35,
        height: screenHeight * 0.07,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5
    },

    cardButtonContainer:{
        height: screenHeight * 0.1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: screenHeight * 0.02,
        backgroundColor: '#FFFFFF'
    },

    roundedImg:{
        borderWidth:1,
        borderColor:'rgba(0,0,0,0)',
        alignItems:'center',
        justifyContent:'center',
        width:screenWidth * 0.387 < screenHeight * 0.225 ? screenWidth * 0.387 : screenHeight * 0.225,
        height:screenWidth * 0.387 < screenHeight * 0.225 ? screenWidth * 0.387 : screenHeight * 0.225,
        backgroundColor:'#FFFFFF',
        borderRadius:screenWidth * 0.387 < screenHeight * 0.225 ? screenWidth * 0.387 / 2 : screenHeight * 0.225 / 2
    },

    menu: {
        flex: 1,
        width: screenWidth,
        height: screenHeight,
        backgroundColor: '#F2F2F2',
    },

    devContainer: {
        height: screenHeight - 115,
        backgroundColor: '#F2F2F2',
        padding: 20,
    },

    infoContainer: {
        height: screenHeight * 0.07,
        justifyContent: 'flex-start',
        paddingLeft: screenWidth * 0.016,
        backgroundColor: '#F2F2F2',
    },

    menuItem: {
        fontSize: screenHeight * 0.021,
        fontWeight: '300',
        paddingTop: screenHeight * 0.0075,
    },

    nonUnread: {
        fontWeight: '500',
        fontSize: screenHeight * 0.025,
        color: '#585858'
    },
    
    unreadMessage: {
        borderBottomWidth: 0,
        backgroundColor: '#F2F2F2'
    },

    listContainer: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 0, 
        borderBottomWidth: 0,
        marginTop: 0,
        paddingTop: screenHeight * 0.015
    },

    msgContainer: {
        flex: 3,
        paddingLeft: screenWidth * 0.032,
        paddingRight: screenWidth * 0.032,
        backgroundColor: '#FFFFFF',
    }
});
