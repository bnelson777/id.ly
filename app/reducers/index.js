/**
 * Create Reducers Page
 * by id.ly Team
 */

//Import Libraries
import {combineReducers} from 'redux';
import { CARDS_AVAILABLE, ADD_CARD, 
        ADD_MESSAGE, CLEAR_ALL, MESSAGES_AVAILABLE,
        ADD_CARD_TO_END, SET_DEFAULT } from "../actions/"

let dataState = {cards: [], messages: []};

const dataReducer = (state = dataState, action) => {
    switch(action.type) {
        case ADD_CARD:{
            let cards =  cloneObject(state.cards) //clone the current state
            cards.unshift(action.card); //add the new card to the top
            state = Object.assign({}, state, { cards: cards});
            return state;
        }

        case ADD_CARD_TO_END:{
            let cards =  cloneObject(state.cards) //clone the current state
            cards.push(action.card); //add the new card to the end
            state = Object.assign({}, state, { cards: cards});
            return state;
        }

        case ADD_MESSAGE:{
            let messages =  cloneObject(state.messages) //clone the current state
            messages.unshift(action.message); //add the new card to the top
            state = Object.assign({}, state, { messages: messages});
            return state;
        }

        case CARDS_AVAILABLE:
            state = Object.assign({}, state, { cards: action.cards, loading:false });
            return state;

        case MESSAGES_AVAILABLE:
            state = Object.assign({}, state, { messages: action.messages, loading:false });
            return state;

        case SET_DEFAULT:{
            let cards =  cloneObject(state.cards) //clone the current state
            let index = getIndex(cards, action.card.id); //find the index of the card with the id passed
            if(index !== -1) {
                cards.splice(index, 1);//if yes, undo, remove the CARD
                cards.splice(0, 0, action.card);
            }
            state = Object.assign({}, state, { cards: cards});
            return state;
        }

        case CLEAR_ALL:{
            state = Object.assign({}, state, dataState);
            return state;
        }

        default:
            return state;
    }
};

function cloneObject(object){
    return JSON.parse(JSON.stringify(object));
}

function getIndex(data, id){
    let clone = JSON.parse(JSON.stringify(data));
    return clone.findIndex((obj) => parseInt(obj.id) === parseInt(id));
}

const rootReducer = combineReducers({
    dataReducer
});

export default rootReducer;
