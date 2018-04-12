import { StyleSheet, Dimensions} from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY } from './../styles/common';

const {width} = Dimensions.get('window');
const screenWidth = width;
const buttonHeight = screenWidth * 0.10;


export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#F5F5F5'
    },

    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: screenWidth,
    },

    button: {
        height: buttonHeight,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 6,
    },

    topButtonText: {
        color: '#6666EE'
    }
});
