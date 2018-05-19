export const CARDS_AVAILABLE = 'CARDS_AVAILABLE';
export const ADD_CARD = 'ADD_CARD';
export const ADD_CARD_TO_END = 'ADD_CARD_TO_END';
export const SET_DEFAULT = 'SET_DEFAULT';
export const CLEAR_ALL = 'CLEAR_ALL';
export const MESSAGES_AVAILABLE = 'MESSAGES_AVAILABLE';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SET_MESSAGES_AS_READ = 'SET_MESSAGES_AS_READ';

import Platform from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import SInfo from 'react-native-sensitive-info';
import AesCrypto from 'react-native-aes-kit';

// Add Card - CREATE (C)
export function addCard(card){
    var paths = getPaths();
    return (dispatch) => {
        SInfo.getItem('key', {})
        .then((key) => {
            SInfo.getItem('iv', {})
            .then((iv) => {
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
                                RNFetchBlob.fs.writeFile(paths.cardsPath, encCards,'utf8')
                                .then(() => {
                                    dispatch({type: ADD_CARD, card:card});
                                });
                            });
                        });
                    }
                });
            });
        });
    };
}

// Add Card To End - CREATE (C)
export function addCardToEnd(card){
    var paths = getPaths();
    return (dispatch) => {
        SInfo.getItem('key', {})
        .then((key) => {
            SInfo.getItem('iv', {})
            .then((iv) => {
                RNFetchBlob.fs.readFile(paths.cardsPath, 'utf8')
                .then((cards) => {
                    if (cards !== ''){
                        AesCrypto.decrypt(cards, key, iv)
                        .then(decCards => {
                            decCards = JSON.parse(decCards);
                            decCards.push(card); //add the new card to the top
                            decCards = JSON.stringify(decCards);
                            AesCrypto.encrypt(decCards, key, iv)
                            .then(encCards => {
                                console.log('Encrypted cards: ' + encCards)
                                RNFetchBlob.fs.writeFile(paths.cardsPath, encCards,'utf8')
                                .then(() => {
                                    dispatch({type: ADD_CARD_TO_END, card:card});
                                });
                            });
                        });
                    }
                });
            });
        });
    };
}

// Add Message- CREATE (C)
export function addMessage(message){
    var paths = getPaths();
    return (dispatch) => {
        SInfo.getItem('key', {})
        .then((key) => {
            SInfo.getItem('iv', {})
            .then((iv) => {
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
                                RNFetchBlob.fs.writeFile(paths.messagesPath, encMessages,'utf8')
                                .then(() => {
                                    dispatch({type: ADD_MESSAGE, message:message});
                                });
                            });
                        });
                    }
                });
            });
        });
    };
}

export function getCards(){
    var paths = getPaths();
    return (dispatch) => {
        SInfo.getItem('key', {})
        .then((key) => {
            SInfo.getItem('iv', {})
            .then((iv) => {
                RNFetchBlob.fs.readFile(paths.cardsPath, 'utf8')
                .then((cards) => {
                    if (cards !== ''){
                        AesCrypto.decrypt(cards, key, iv)
                        .then(decCards => {
                            dispatch({type: CARDS_AVAILABLE, cards:JSON.parse(decCards)});
                        });
                    }
                });
            });
        });
    };
}

export function getMessages(){
    var paths = getPaths();
    return (dispatch) => {
        SInfo.getItem('key', {})
        .then((key) => {
            SInfo.getItem('iv', {})
            .then((iv) => {
                RNFetchBlob.fs.readFile(paths.messagesPath, 'utf8')
                .then((messages) => {
                    if (messages !== ''){
                        AesCrypto.decrypt(messages, key, iv)
                        .then(decMessages => {
                            dispatch({type: MESSAGES_AVAILABLE, messages:JSON.parse(decMessages)});
                        });
                    }
                });
            });
        });
    };
}

// Update Message to Read (U)
export function setMessagesAsRead(keys) {
    let paths = getPaths();
    return (dispatch) => {
        SInfo.getItem('key', {})
        .then((key) => {
            SInfo.getItem('iv', {})
            .then((iv) => {
                RNFetchBlob.fs.readFile(paths.messagesPath, 'utf8')
                .then((messages) => {
                    if(messages !== '') {
                        AesCrypto.decrypt(messages, key, iv)
                        .then(decMessages => {
                            decMessages = JSON.parse(decMessages);
                            let key1 = keys._1,
                                key2 = keys._2;
                            for(let i = 0; i < decMessages.length; ++i) {
                                if((decMessages[i].to === key1 && decMessages[i].from === key2) ||
                                   (decMessages[i].from === key1 && decMessages[i].to === key2)) {
                                       decMessages[i].read = true;
                                   }
                            }
                            decMessages = JSON.stringify(decMessages);
                            AesCrypto.encrypt(decMessages, key, iv)
                            .then(encMessages => {
                                RNFetchBlob.fs.writeFile(paths.messagesPath, encMessages, 'utf8')
                                .then(() => {
                                    dispatch({type: SET_MESSAGES_AS_READ, keys:keys});
                                });
                            });
                        });
                    }
                });
            });
        });
    }
};

/*
        AsyncStorage.getItem('messagedata', (err, messages) => {
            if(messages !== null) {
                let key1 = keys._1,
                    key2 = keys._2;
                messages = JSON.parse(messages);
                for(let i = 0; i < messages.length; ++i) {
                    if((messages[i].to === key1 && messages[i].from === key2) ||
                       (messages[i].from === key1 && messages[i].to === key2)) {
                           messages[i].read = true;
                    }
                }
                AsyncStorage.setItem('messagedata', JSON.stringify(messages), () => {
                    dispatch({type: SET_MESSAGES_AS_READ, keys:keys});
                });
            }
        });
*/

// Set Default Card - SET DEFAULT (D)
export function setDefault(card){
    var paths = getPaths();
    return (dispatch) => {
        SInfo.getItem('key', {})
        .then((key) => {
            SInfo.getItem('iv', {})
            .then((iv) => {
                RNFetchBlob.fs.readFile(paths.cardsPath, 'utf8')
                .then((cards) => {
                    if (cards !== ''){
                        AesCrypto.decrypt(cards, key, iv)
                        .then(decCards => {
                            decCards = JSON.parse(decCards);
                            var index = getIndex(decCards, card.id); //find the index of the card with the id passed
                            if(index !== -1) {
                                decCards.splice(index, 1);//if yes, undo, remove the card
                                decCards.splice(0,0, card);
                            }
                            decCards = JSON.stringify(decCards);
                            AesCrypto.encrypt(decCards, key, iv)
                            .then(encCards => {
                                console.log('Encrypted cards: ' + encCards)
                                RNFetchBlob.fs.writeFile(paths.cardsPath, encCards,'utf8')
                                .then(() => {
                                    dispatch({type: SET_DEFAULT, card:card});
                                });
                            });
                        });
                    }
                });
            });
        });
    };
}

// Clear card/messages - CLEAR (D)
export function clearAll(){
    removeFiles();
    return (dispatch) => {
        dispatch({type: CLEAR_ALL});
    };
}

function removeFiles(){
    var paths = getPaths();
    RNFetchBlob.fs.writeFile(paths.cardsPath, '','utf8');
    RNFetchBlob.fs.writeFile(paths.messagesPath, '','utf8');

    SInfo.deleteItem('key', {});
    SInfo.deleteItem('iv', {});
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
    console.log('cardspath: ' + cardsPath);
    console.log('messagespath: ' + messagesPath);
    return {cardsPath: cardsPath, messagesPath: messagesPath};
}