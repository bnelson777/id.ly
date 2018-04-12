import {combineReducers} from 'redux';

import {CARDS_AVAILABLE, MESSAGES_AVAILABLE} from "../actions/"


let dataState = {cards: [], messages: []};

const dataReducer = (state = dataState, action) => {
    switch(action.type){
        case CARDS_AVAILABLE:
            state = Object.assign({}, state, {cards: action.cards});
            return state;

        case MESSAGES_AVAILABLE:
            state = Object.assign({}, state, { messages: action.messages});
            return state;

        case CLEAR_ALL:
            state = Object.assign({}, state, dataState);
            return state;

        default:
            return state;
    }
};

const rootReducer = combineReducers({
    dataReducer
});

export default rootReducer;
