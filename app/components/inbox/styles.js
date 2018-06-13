import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY, IDLY_BLUE } from './../styles/common';

const screenHeight = Dimensions.get('window').height;

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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    emptyText: {
        fontSize: 18,
        marginLeft: "10%",
        marginRight: "10%"
    },

    tipText: {
        color: IDLY_BLUE
    }
});
