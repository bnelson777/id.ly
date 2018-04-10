import {combineReducers} from 'redux';

import {CARDS_AVAILABLE} from "../actions/"

let dataState = {cards: []};

const dataReducer = (state = dataState, action) => {
    switch(action.type){
        case CARDS_AVAILABLE:
            state = Object.assign({}, state, {cards: action.cards});
            return state;

        default:
            return state;
    }
};

const rootReducer = combineReducers({
    dataReducer
});

export default rootReducer;