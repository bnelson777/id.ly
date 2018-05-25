import { StyleSheet } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY } from './../styles/common';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },

    listContainer: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 0, 
        borderBottomWidth: 0,
        marginTop: 0
    },

    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: COLOR_PRIMARY,
        justifyContent: 'center',
        padding: 10
    },

    imageContainer: {
        borderWidth: 1,
        borderColor: COLOR_SECONDARY
    },

    textContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },

    messageContainer: {
        flex: 1,
        justifyContent: 'flex-start'
    },

    authorText: {
        fontWeight: 'bold'
    },

    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },

    imageStyle: {
        width: 80, 
        height: 80
    },
    
    sepLine: {
        height: 1,
        width: "86%",
        backgroundColor: "#CED0CE",
        marginLeft: "14%"
    },

    noBotBorder: {
        borderBottomWidth: 0,
        backgroundColor: '#FFFFFF'
    },

    unreadMessage: {
        borderBottomWidth: 0,
        backgroundColor: '#F2F2F2'
    },

    emptyTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    emptyText: {
        fontSize: 28
    }
});
