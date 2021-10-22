import {REHYDRATE} from 'redux-persist/constants';
import types from '../constants/actionTypes';

const defaultState = {
    enabled: true,
    dice: [
        {sides: 6, diecolor: 'red', dotcolor: 'white', value: 1},
        {sides: 6, diecolor: 'white', dotcolor: 'black', value: 1}
    ]
};

let validState = (state) => {
    if (!state || !state.dice || state.dice.some((d) => !d.sides || !d.diecolor || !d.dotcolor))
        return {...defaultState};
    return state;    
}

module.exports = (state = defaultState, action) => {
    switch (action.type) {
    case REHYDRATE:
        if (action.payload.dice) {
            let s = {
                ...state,
                ...action.payload.dice
            };
            return validState(s);        	
        }
        return state;
                
    case types.SET_DICE_CONFIG_ENABLED:
        return {
            ...state,
            enabled: action.value
        };

    case types.SET_DICE_CONFIG_ZERO:
        return {
            ...state,
            zero: action.value
        };

    case types.SET_DICE_CONFIG_DICE:
        return {
            ...state,
            dice: [...action.value]            
        };

    default:
        return state;
    }
}
