import {REHYDRATE} from 'redux-persist/constants';
import types from '../constants/actionTypes';

const defaultState = {
    mode:'std'
};

module.exports = (state = defaultState, action) => {
    switch (action.type) {
    case REHYDRATE:
        if (action.payload.calculator) {
            return {
                ...state,
                ...action.payload.calculator
            };            
        }
        return state;
        
    case types.SET_CALC_CONFIG_MODE:
        return {
            ...state,
            mode: action.value
        };
        
    default:
        return state;
    }
}
