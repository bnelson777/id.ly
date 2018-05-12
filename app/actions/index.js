export const CARDS_AVAILABLE = 'CARDS_AVAILABLE';
export const ADD_CARD = 'ADD_CARD';
export const ADD_CARD_TO_END = 'ADD_CARD_TO_END';
export const SET_DEFAULT = 'SET_DEFAULT';
export const CLEAR_ALL = 'CLEAR_ALL';
export const MESSAGES_AVAILABLE = 'MESSAGES_AVAILABLE';
export const ADD_MESSAGE = 'ADD_MESSAGE';

import Platform from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import SInfo from 'react-native-sensitive-info';
import AesCrypto from 'react-native-aes-kit';

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
    var paths = getPaths();
    return (dispatch) => {
        RNFetchBlob.fs.readFile(paths.cardsPath, 'utf8')
        .then((cards) => {
            if (cards !== ''){
                AesCrypto.decrypt(cards, key, iv)
                .then(decCards => {
                    decCards = JSON.parse(decCards);
                    decCards.unshift(card); //add the new card to the top
                    decCards = JSON.stringify(decCards);
                    AesCrypto.encrypt(decCards, key, iv)
                    .then(encCards => {
                        console.log('Encrypted cards: ' + encCards)
                        RNFetchBlob.fs.writeFile(paths.cardsPath, encCards,'utf8', () => {
                            dispatch({type: ADD_CARD, card:card});
                    })
                        .catch((err) => {});
                    });
                });
            }
        })
    };
}

// Add Card To End - CREATE (C)
export function addCardToEnd(card){
    return (dispatch) => {
        AsyncStorage.getItem('carddata', (err, cards) => {
            if (cards !== null){
                cards = JSON.parse(cards);
                cards.push(card); //add the new card to the end
                AsyncStorage.setItem('carddata', JSON.stringify(cards), () => {
                    dispatch({type: ADD_CARD_TO_END, card:card});
                });
            }
        });
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
    var paths = getPaths();
    return (dispatch) => {
        RNFetchBlob.fs.readFile(paths.messagesPath, 'utf8')
        .then((messages) => {
            if (messages !== ''){
                AesCrypto.decrypt(messages, key, iv)
                .then(decMessages => {
                    decMessages = JSON.parse(decMessages);
                    decMessages.unshift(message); //add the new message to the top
                    decMessages = JSON.stringify(decMessages);
                    AesCrypto.encrypt(decMessages, key, iv)
                    .then(encMessages => {
                        console.log('Encrypted messages: ' + encMessages)
                        RNFetchBlob.fs.writeFile(paths.messagesPath, encMessages,'utf8', () => {
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
    var paths = getPaths();
    return (dispatch) => {
        RNFetchBlob.fs.readFile(paths.cardsPath, 'utf8')
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
    var paths = getPaths();
    return (dispatch) => {
        RNFetchBlob.fs.readFile(paths.messagesPath, 'utf8')
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

// Set Default Card - SET DEFAULT (D)
export function setDefault(card){
    return (dispatch) => {
        AsyncStorage.getItem('carddata', (err, cards) => {
            if (cards !== null){
                cards = JSON.parse(cards);
                var index = getIndex(cards, card.id); //find the index of the card with the id passed
                if(index !== -1) {
                    cards.splice(index, 1);//if yes, undo, remove the card
                    cards.splice(0,0, card);
                }
                AsyncStorage.setItem('carddata', JSON.stringify(cards), () => {
                    dispatch({type: SET_DEFAULT, card:card});
                });
            }
        });
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
    var paths = getPaths();
    RNFetchBlob.fs.unlink(paths.cardsPath)
    .catch((err) => {});

    RNFetchBlob.fs.unlink(paths.messagesPath)
    .catch((err) => {});

    SInfo.setItem('key', null, {});
    SInfo.setItem('iv', null, {});
}

function getIndex(card, id){
    let clone = JSON.parse(JSON.stringify(card));
    return clone.findIndex((obj) => parseInt(obj.id) === parseInt(id));
}

function getPaths(){
    const dirs = RNFetchBlob.fs.dirs;
    var cardsPath = '/idly/cards.dat';
    var messagesPath = '/idly/messages.dat';
    if (Platform.OS === 'ios') {
        cardsPath = `${dirs.DocumentDir}${cardsPath}`;
        messagesPath = `${dirs.DocumentDir}${messagesPath}`;
    } else {
        cardsPath = dirs.DocumentDir + cardsPath;
        messagesPath = dirs.DocumentDir + messagesPath;
    }
    return {cardsPath: cardsPath, messagesPath: messagesPath};
}