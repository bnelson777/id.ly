export const CARDS_AVAILABLE = 'CARDS_AVAILABLE';
export const ADD_CARD = 'ADD_CARD';
export const UPDATE_CARD = 'UPDATE_CARD';
export const DELETE_CARD = 'DELETE_CARD';
export const CLEAR_ALL = 'CLEAR_ALL';
export const MESSAGES_AVAILABLE = 'MESSAGES_AVAILABLE';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';

import {AsyncStorage} from 'react-native';

// Add Card - CREATE (C)
export function addCard(card){
    return (dispatch) => {
        AsyncStorage.getItem('carddata', (err, cards) => {
            if (cards !== null){
                cards = JSON.parse(cards);
                cards.unshift(card); //add the new card to the top
                AsyncStorage.setItem('carddata', JSON.stringify(cards), () => {
                    dispatch({type: ADD_CARD, card:card});
                });
            }
        });
    };
}

// Add Message- CREATE (C)
export function addMessage(message){
    return (dispatch) => {
        AsyncStorage.getItem('messagedata', (err, messages) => {
            if (messages !== null){
                messages = JSON.parse(messages);
                messages.unshift(message); //add the new card to the top
                AsyncStorage.setItem('messagedata', JSON.stringify(messages), () => {
                    dispatch({type: ADD_MESSAGE, message:message});
                });
            }
        });
    };
}



export function getCards(){
    return (dispatch) => {
        AsyncStorage.getItem('carddata', (err, cards) => {
            if (cards !== null){
                dispatch({type: CARDS_AVAILABLE, cards:JSON.parse(cards)});
            }
        });
    };
}

export function getMessages(){
    return (dispatch) => {
        AsyncStorage.getItem('messagedata', (err, messages) => {
            if (messages !== null){
                dispatch({type: MESSAGES_AVAILABLE, messages:JSON.parse(messages)});
            }
        });
    };
}

// Update Card - UPDATE (U)
export function updateCard(card){
    return (dispatch) => {
        AsyncStorage.getItem('carddata', (err, cards) => {
            if (cards !== null){
                cards = JSON.parse(cards);
                var index = getIndex(cards, card.id); //find the index of the card with the id passed
                if (index !== -1) {
                    cards[index]['author'] = card.author;
                    cards[index]['quote'] = card.quote;
                    cards[index]['email'] = card.email;
                }
                AsyncStorage.setItem('carddata', JSON.stringify(cards), () => {
                    dispatch({type: UPDATE_CARD, card:card});
                });
            }
        });
    };
}

// Delete Card - DELETE (D)
export function deleteCard(id){
    return (dispatch) => {
        AsyncStorage.getItem('carddata', (err, cards) => {
            if (cards !== null){
                cards = JSON.parse(cards);

                var index = getIndex(cards, id); //find the index of the card with the id passed
                if(index !== -1) cards.splice(index, 1);//if yes, undo, remove the card
                AsyncStorage.setItem('carddata', JSON.stringify(cards), () => {
                    dispatch({type: DELETE_CARD, id:id});
                });
            }
        });
    };
}

// Delete Card - DELETE (D)
export function deleteMessage(id){
    return (dispatch) => {
        AsyncStorage.getItem('messagedata', (err, messages) => {
            if (messages !== null){
                messages = JSON.parse(messages);

                var index = getIndex(messages, id); //find the index of the card with the id passed
                if(index !== -1) messages.splice(index, 1);//if yes, undo, remove the card
                AsyncStorage.setItem('messagedata', JSON.stringify(messages), () => {
                    dispatch({type: DELETE_MESSAGE, id:id});
                });
                console.log('in delete message')
            }
        });
    };
}

// Clear card/messages - CLEAR (D)
export function clearAll(){
    return (dispatch) => {
                AsyncStorage.clear(() => {
                    dispatch({type: CLEAR_ALL});
                });
            }
}

function getIndex(card, id){
    let clone = JSON.parse(JSON.stringify(card));
    return clone.findIndex((obj) => parseInt(obj.id) === parseInt(id));
}
