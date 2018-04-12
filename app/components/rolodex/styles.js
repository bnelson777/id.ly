import { StyleSheet } from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY } from './../styles/common';

export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#F5F5F5'
    },

    activityIndicatorContainer:{
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    row:{
        borderBottomWidth: 1,
        borderColor: "#ccc",
        padding: 10
    },

    name: {
        fontSize: 14,
        fontWeight: "600",
        marginTop: 8 * 2
    },

    info: {
        marginTop: 5,
        fontSize: 14,
    },
});
