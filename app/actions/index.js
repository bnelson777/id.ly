/**
 * Create Actions
 * by id.ly Team
 */

// Import libraries
import Platform from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import SInfo from 'react-native-sensitive-info';
import AesCrypto from 'react-native-aes-kit';

// Export actions
export const CARDS_AVAILABLE = 'CARDS_AVAILABLE';
export const ADD_CARD = 'ADD_CARD';
export const ADD_CARD_TO_END = 'ADD_CARD_TO_END';
export const SET_DEFAULT = 'SET_DEFAULT';
export const MESSAGES_AVAILABLE = 'MESSAGES_AVAILABLE';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SET_MESSAGES_AS_READ = 'SET_MESSAGES_AS_READ';
export const CLEAR_ALL = 'CLEAR_ALL';

// ACTIONS
// FUNCTION(S): The actions are the intermediary between the
// components and the store. These actions handle the manipulation,
// loading, and storage of message and card data.

// Get Cards
// Asynchronously reads the data from cards.dat and decrypts it.
// Returns the CARDS_AVAILABLE dispatch if cards are found.
export function getCards(){
    // Get the cards filepath.
    var paths = getPaths();

    // Perform the file read and decryption.
    return (dispatch) => {
        SInfo.getItem('key', {})
        .then((key) => {
            SInfo.getItem('iv', {})
            .then((iv) => {
                RNFetchBlob.fs.readFile(paths.cardsPath, 'utf8')
                .then((cards) => {
                    // Check if there is any card data.
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

// Add Card
// Asynchronously reads the data from cards.dat, decrypts it,
// adds the new card data to the top, encrypts the card structure,
// and writes it back to cards.dat.
// Returns the ADD_CARD dispatch.
export function addCard(card){
    // Get the cards filepath.
    var paths = getPaths();

    // Perform the calls to add the card.
    return (dispatch) => {
        SInfo.getItem('key', {})
        .then((key) => {
            SInfo.getItem('iv', {})
            .then((iv) => {
                RNFetchBlob.fs.readFile(paths.cardsPath, 'utf8')
                .then((cards) => {
                    // Check if there is any card data.
                    if (cards !== ''){
                        AesCrypto.decrypt(cards, key, iv)
                        .then(decCards => {
                                decCards = JSON.parse(decCards);
                                decCards.unshift(card); // Add the new card to the top.
                                decCards = JSON.stringify(decCards);
                            AesCrypto.encrypt(decCards, key, iv)
                            .then(encCards => {
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

// Add Card To End
// Asynchronously reads the data from cards.dat, decrypts it,
// adds the new card data to the end, encrypts the card structure,
// and writes it back to cards.dat.
// Returns the ADD_CARD_TO_END dispatch.
export function addCardToEnd(card){
    // Get the cards filepath.
    var paths = getPaths();

    // Perform the calls to add the card.
    return (dispatch) => {
        SInfo.getItem('key', {})
        .then((key) => {
            SInfo.getItem('iv', {})
            .then((iv) => {
                RNFetchBlob.fs.readFile(paths.cardsPath, 'utf8')
                .then((cards) => {
                    // Check if there is any card data.
                    if (cards !== ''){
                        AesCrypto.decrypt(cards, key, iv)
                        .then(decCards => {
                                decCards = JSON.parse(decCards);
                                decCards.push(card); // Add the new card to the end.
                                decCards = JSON.stringify(decCards);
                            AesCrypto.encrypt(decCards, key, iv)
                            .then(encCards => {
                                RNFetchBlob.fs.writeFile(paths.cardsPath, encCards,'utf8')
                                .then(() => {
                                    dispatch({type: ADD_CARD_TO_END, card:card});
                                });
                            });
                        });
                    }
                    // If no card data is found, add the first card.
                    else {
                        var firstCard = [];
                        firstCard.unshift(card); // Add the card to the new structure.
                        firstCard = JSON.stringify(firstCard);
                        AesCrypto.encrypt(firstCard, key, iv)
                        .then(encCards => {
                            RNFetchBlob.fs.writeFile(paths.cardsPath, encCards,'utf8')
                            .then(() => {
                                dispatch({type: ADD_CARD_TO_END, card:card});
                            });
                        });
                    }
                });
            });
        });
    };
}

// Set Default
// Asynchronously reads the data from cards.dat, decrypts it,
// moves the card passed in to be the first card in the structure,
// encrypts the card structure, and writes it back to cards.dat.
// Returns the SET_DEFAULT dispatch.
export function setDefault(card){
    // Get the cards filepath.
    var paths = getPaths();

    // Perform the calls to move the card.
    return (dispatch) => {
        SInfo.getItem('key', {})
        .then((key) => {
            SInfo.getItem('iv', {})
            .then((iv) => {
                RNFetchBlob.fs.readFile(paths.cardsPath, 'utf8')
                .then((cards) => {
                    // Check if there is any card data.
                    if (cards !== ''){
                        AesCrypto.decrypt(cards, key, iv)
                        .then(decCards => {
                            decCards = JSON.parse(decCards);
                            var index = getIndex(decCards, card.id); // Find the index of the card passed in.
                            // Check that the card is in the structure.
                            if(index !== -1) {
                                decCards.splice(index, 1); // Remove the card from the card structure.
                                decCards.splice(0, 0, card); // Insert the card at the top.
                            }
                            decCards = JSON.stringify(decCards);
                            AesCrypto.encrypt(decCards, key, iv)
                            .then(encCards => {
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

// Get Messages
// Asynchronously reads the data from messages.dat and decrypts it.
// Returns the MESSAGES_AVAILABLE dispatch if messages are found.
export function getMessages(){
    // Get the messages filepath.
    var paths = getPaths();

    // Perform the file read and decryption.
    return (dispatch) => {
        SInfo.getItem('key', {})
        .then((key) => {
            SInfo.getItem('iv', {})
            .then((iv) => {
                RNFetchBlob.fs.readFile(paths.messagesPath, 'utf8')
                .then((messages) => {
                    // Check if there is any message data.
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

// Add Message
// Asynchronously reads the data from messages.dat, decrypts it,
// adds the new message data to the top, encrypts the message structure,
// and writes it back to messages.dat.
// Returns the ADD_MESSAGE dispatch.
export function addMessage(message){
    // Get the messages filepath.
    var paths = getPaths();

    // Perform the calls to add the message.
    return (dispatch) => {
        SInfo.getItem('key', {})
        .then((key) => {
            SInfo.getItem('iv', {})
            .then((iv) => {
                RNFetchBlob.fs.readFile(paths.messagesPath, 'utf8')
                .then((messages) => {
                    // Check if there is any message data.
                    if (messages !== ''){
                        AesCrypto.decrypt(messages, key, iv)
                        .then(decMessages => {
                            decMessages = JSON.parse(decMessages);
                            decMessages.unshift(message); // Add the new message to the top.
                            decMessages = JSON.stringify(decMessages);
                            AesCrypto.encrypt(decMessages, key, iv)
                            .then(encMessages => {
                                RNFetchBlob.fs.writeFile(paths.messagesPath, encMessages,'utf8')
                                .then(() => {
                                    dispatch({type: ADD_MESSAGE, message:message});
                                });
                            });
                        });
                    }
                    // If no message data is found, add the first message.
                    else {
                        var firstMessage = [];
                        firstMessage.unshift(message); // Add the message data to the new structure.
                        firstMessage = JSON.stringify(firstMessage);
                        AesCrypto.encrypt(firstMessage, key, iv)
                        .then(encMessages => {
                            RNFetchBlob.fs.writeFile(paths.messagesPath, encMessages,'utf8')
                            .then(() => {
                                dispatch({type: ADD_MESSAGE, message:message});
                            });
                        });
                    }
                });
            });
        });
    };
}

// Set Messages As Read
// Asynchronously reads the data from messages.dat, decrypts it,
// sets the desired message data as read, encrypts the message structure,
// and writes it back to messages.dat.
// Returns the SET_MESSAGES_AS_READ dispatch.
export function setMessagesAsRead(keys) {
    // Get the messages filepath.
    var paths = getPaths();

    // Perform the calls to set the messages as read.
    return (dispatch) => {
        SInfo.getItem('key', {})
        .then((key) => {
            SInfo.getItem('iv', {})
            .then((iv) => {
                RNFetchBlob.fs.readFile(paths.messagesPath, 'utf8')
                .then((messages) => {
                    // Check if there is any message data.
                    if(messages !== '') {
                        AesCrypto.decrypt(messages, key, iv)
                        .then(decMessages => {
                            decMessages = JSON.parse(decMessages);

                            // Find the desired message and set it as read.
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

// Clear All
// Clears the card and message data from cards.dat and messages.dat.
// Clears out any items stored in the keychain/keystore.
// Returns the CLEAR_ALL dispatch.
export function clearAll(){
    // Call the function to remove the data.
    removeFiles();

    return (dispatch) => {
        dispatch({type: CLEAR_ALL});
    };
}

// Remove Files
// Helper function for clearAll() to remove the data.
function removeFiles(){
    // Get the card and message filepaths.
    var paths = getPaths();
    var len = 10;
    var pubStore = 'pubkey';
    var privStore = 'privkey';

    // Write the cards.dat and messages.dat files to be empty.
    RNFetchBlob.fs.writeFile(paths.cardsPath, '','utf8');
    RNFetchBlob.fs.writeFile(paths.messagesPath, '','utf8');

    // Remove all items from the keychain/keystore.
    SInfo.deleteItem('key', {});
    SInfo.deleteItem('iv', {});
    for (var i = 0; i < len; i++){
      SInfo.deleteItem(pubStore + i, {});
      SInfo.deleteItem(privStore + i, {});
    }
}

// Get Index
// Helper function to get the index of a passed in card in
// the card structure.
function getIndex(card, id){
    let clone = JSON.parse(JSON.stringify(card));
    return clone.findIndex((obj) => parseInt(obj.id) === parseInt(id));
}

// Get Paths
// Helper function to get the filepaths for cards.dat and messages.dat.
function getPaths(){
    const dirs = RNFetchBlob.fs.dirs;
    var cardsPath = '/idly/cards.dat';
    var messagesPath = '/idly/messages.dat';

    // Get the iOS or Android specific filepaths.
    if (Platform.OS === 'ios') {
        cardsPath = `${dirs.DocumentDir}${cardsPath}`;
        messagesPath = `${dirs.DocumentDir}${messagesPath}`;
    } else {
        cardsPath = dirs.DocumentDir + cardsPath;
        messagesPath = dirs.DocumentDir + messagesPath;
    }
    return {cardsPath: cardsPath, messagesPath: messagesPath};
}
