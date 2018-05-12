import { StyleSheet} from 'react-native';
import { COLOR_PRIMARY, COLOR_SECONDARY,
        BACKGROUND_COLOR, BORDER_RADIUS } from './components/styles/common';

export default StyleSheet.create({
    subtitle: {
        fontWeight: '500',
        fontSize: 22,
    },

    rightButton: {
        right: 0
    },

    rightButtonIcon: {
        right: 0,
        width: 28,
        height: 28
    },

    idlyColor: {
        backgroundColor: '#128DC9'
    },

    textColor: {
        fontWeight: '500',
        fontSize: 22,
        textAlign: 'center',
        alignSelf: 'center'
    },
});
