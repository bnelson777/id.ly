export const CARDS_AVAILABLE = 'CARDS_AVAILABLE';
export const ADD_CARD = 'ADD_CARD';
export const CLEAR_ALL = 'CLEAR_ALL';
export const MESSAGES_AVAILABLE = 'MESSAGES_AVAILABLE';
export const ADD_MESSAGE = 'ADD_MESSAGE';

import RNFetchBlob from 'react-native-fetch-blob';
import SInfo from 'react-native-sensitive-info';
import AesCrypto from 'react-native-aes-kit';

const fileDir = RNFetchBlob.fs.dirs.DocumentDir + '/idly/';

// Add Card - CREATE (C)
export function addCard(card){
    var key = '';
    var iv = '';
    SInfo.getItem('key', {})
    .then((value) => {
        key = value;
    });
    SInfo.getItem('iv', {})
    .then((value) => {
        iv = value;
    });
    return (dispatch) => {
        RNFetchBlob.fs.readFile(fileDir + 'cards.dat', 'utf8')
        .then((cards) => {
            if (cards !== ''){
                AesCrypto.decrypt(cards, key, iv)
                .then(decCards => {
                    decCards = JSON.parse(decCards);
                    decCards.unshift(card); //add the new card to the top
                    decCards = JSON.stringify(decCards);
                    AesCrypto.encrypt(decCards, key, iv)
                    .then(encCards => {
                        RNFetchBlob.fs.writeFile(fileDir + 'cards.dat', encCards,'utf8', () => {
                            dispatch({type: ADD_CARD, card:card});
                    })
                        .catch((err) => {});
                    });
                });
            }
        })
    };
}

// Add Message- CREATE (C)
export function addMessage(message){
    var key = '';
    var iv = '';
    SInfo.getItem('key', {})
    .then((value) => {
        key = value;
    });
    SInfo.getItem('iv', {})
    .then((value) => {
        iv = value;
    });
    return (dispatch) => {
        RNFetchBlob.fs.readFile(fileDir + 'messages.dat', 'utf8')
        .then((messages) => {
            if (messages !== ''){
                AesCrypto.decrypt(messages, key, iv)
                .then(decMessages => {
                    decMessages = JSON.parse(decMessages);
                    decMessages.unshift(message); //add the new message to the top
                    decMessages = JSON.stringify(decMessages);
                    AesCrypto.encrypt(decMessages, key, iv)
                    .then(encMessages => {
                        RNFetchBlob.fs.writeFile(fileDir + 'messages.dat', encMessages,'utf8', () => {
                            dispatch({type: ADD_MESSAGE, message:message});
                    })
                        .catch((err) => {});
                    });
                });
            }
        })
    };
}

export function getCards(){
    var key = '';
    var iv = '';
    SInfo.getItem('key', {})
    .then((value) => {
        key = value;
    });
    SInfo.getItem('iv', {})
    .then((value) => {
        iv = value;
    });
    return (dispatch) => {
        RNFetchBlob.fs.readFile(fileDir + 'cards.dat', 'utf8')
        .then((cards) => {
            if (cards !== ''){
                AesCrypto.decrypt(cards, key, iv)
                .then(decCards => {
                    dispatch({type: CARDS_AVAILABLE, cards:JSON.parse(decCards)});
                });
            }
        })
        .catch((err) => {});
    };
}

export function getMessages(){
    var key = '';
    var iv = '';
    SInfo.getItem('key', {})
    .then((value) => {
        key = value;
    });
    SInfo.getItem('iv', {})
    .then((value) => {
        iv = value;
    });
    return (dispatch) => {
        RNFetchBlob.fs.readFile(fileDir + 'messages.dat', 'utf8')
        .then((messages) => {
            if (messages !== ''){
                AesCrypto.decrypt(messages, key, iv)
                .then(decMessages => {
                    dispatch({type: MESSAGES_AVAILABLE, messages:JSON.parse(decMessages)});
                });
            }
        })
        .catch((err) => {});
    };
}

// Clear card/messages - CLEAR (D)
export function clearAll(){
    return (dispatch) => {
        removeFiles(() => {
            dispatch({type: CLEAR_ALL});
        });
    }
}

function removeFiles(){
    RNFetchBlob.fs.unlink(fileDir + 'cards.dat')
    .catch((err) => {});

    RNFetchBlob.fs.unlink(fileDir + 'messages.dat')
    .catch((err) => {});
}

function getIndex(card, id){
    let clone = JSON.parse(JSON.stringify(card));
    return clone.findIndex((obj) => parseInt(obj.id) === parseInt(id));
}