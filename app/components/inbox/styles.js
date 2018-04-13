import { StyleSheet } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY } from './../styles/common';

export default StyleSheet.create({
    inboxContainer: {
        flex: 1,
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
    }
});
