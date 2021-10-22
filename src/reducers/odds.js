import {REHYDRATE} from 'redux-persist/constants';
import types from '../constants/actionTypes';

const defaultState = {
    enabled: false,
    round: false,
    method:'std',
    attack: 1,
    defend: 1
};

module.exports = (state = defaultState, action) => {
    switch (action.type) {
    case REHYDRATE:
        if (action.payload.odds) {
            return {
                ...state,
                ...action.payload.odds                
            };            
        }
        return state;
        
    case types.SET_ODDS_CONFIG_ENABLED:
        return {
            ...state,
            enabled: action.value
        };
        
    case types.SET_ODDS_CONFIG_ROUND:
        return {
            ...state,
            round: action.value
        };

    case types.SET_ODDS_CONFIG_ROUNDMETHOD:
        return {
            ...state,
            method: action.value
        };
        
    case types.SET_ODDS_CONFIG_ATTACK:
        return {
            ...state,
            attack: action.value            
        };

    case types.SET_ODDS_CONFIG_DEFEND:
        return {
            ...state,
            defend: action.value            
        };

    default:
        return state;
    }
}
