import { combineReducers } from 'redux';

import { CONTACT_AVAILABLE} from "../actions/" //Import the actions types constant we defined in our actions

let dataState = { info: [], loading:true };

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case CONTACT_AVAILABLE:
            state = Object.assign({}, state, { contact: action.contact});
            return state;

        default:
            return state;
    }
};

// Combine all the reducers
const rootReducer = combineReducers({
    dataReducer
})

export default rootReducer;
