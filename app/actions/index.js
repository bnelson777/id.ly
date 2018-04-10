export const CARDS_AVAILABLE = 'CARDS_AVAILABLE';

import {AsyncStorage} from 'react-native';

export function getCards(){
    return (dispatch) => {
        AsyncStorage.getItem('carddata', (err, cards) => {
            if (cards !== null){
                dispatch({type: CARDS_AVAILABLE, cards:JSON.parse(cards)});
            }
        });
    };
}