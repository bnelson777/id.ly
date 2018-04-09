export const CONTACT_AVAILABLE = 'CONTACT_AVAILABLE';

import {AsyncStorage} from 'react-native';

export function getContact(){
    return (dispatch) => {
        AsyncStorage.getItem('contactdata', (err, contact) => {
            if (contact !== null){
                dispatch({type: CONTACT_AVAILABLE, contact:JSON.parse(contact)});
            }
        });
    };
}