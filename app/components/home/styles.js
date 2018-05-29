import { StyleSheet, Dimensions } from 'react-native';
import { BACKGROUND_COLOR, FONT_SIZE,
        BORDER_WIDTH, IDLY_BLUE } from './../styles/common';

const Height = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

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
        padding: 10
    },

    title: {
        fontSize: FONT_SIZE,
        fontWeight: "600",
        marginTop: 8 * 2
    },

    firstRow: {
        height: Height * 0.2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 30
    },

    secondRow: {
        height: Height * 0.458,
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
        paddingTop: 17,
        paddingRight: 5
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
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 20,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center'
    },

    upSideDown: {
        transform:[{rotate: '180deg'}]
    },

    cardContainer: {
        height: Height * 0.4,
        borderRadius: 5,
        borderWidth: 0,
        marginTop: 0
    },

    button:{
        backgroundColor: IDLY_BLUE,
        justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth * 0.35,
        height: 45,
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
        marginTop: Height * 0.15,
    },

    CardInner: {
        height: Height * 0.25,
        flexDirection: 'row',
    },

    CardInfo: {
        height: Height * 0.25,
        width: screenWidth * 0.43,
    },

    cardTitle: {
        paddingTop: Height * 0.09,
        marginLeft: 5,
        fontWeight: '500',
        fontSize: 32,
        color: '#000000'
    },

    cardSubTitle: {
        marginLeft: 10,
        fontWeight: '500',
        fontSize: 16,
        color: '#585858'
    },

    cardButton:{
        backgroundColor: IDLY_BLUE,
        width: screenWidth*0.35,
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5
    },

    cardButtonContainer:{
        height: Height * 0.15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        backgroundColor: BACKGROUND_COLOR
    },

    menu: {
        flex: 1,
        width: screenWidth,
        height: Height,
        backgroundColor: '#F2F2F2',
        padding: 20,
      },

    menuItem: {
        fontSize: 14,
        fontWeight: '300',
        paddingTop: 5,
    },

    nonUnread: {
        fontWeight: '500',
        fontSize: Height * 0.025,
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
        marginTop: 0
    },

});
