import {REHYDRATE} from 'redux-persist/constants';
import types from '../constants/actionTypes';

const defaultState = {
    enabled: false,
    number: 0
};

module.exports = (state = defaultState, action) => {
    switch (action.type) {
    case REHYDRATE:
        if (action.payload.base6) {
            let s = {
                ...state,
                ...action.payload.base6
            };              	
        }
        return state;
                
    case types.SET_BASE6_CONFIG_ENABLED:
        return {
            ...state,
            enabled: action.value
        };

    case types.SET_BASE6_CONFIG_NUMBER:
        return {
            ...state,
            number: action.value
        };
    

    default:
        return state;
    }
}
