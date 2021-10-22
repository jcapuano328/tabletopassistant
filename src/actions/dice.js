import types from '../constants/actionTypes';

export const setEnabled = (b) => (dispatch) => {    
    dispatch({type: types.SET_DICE_CONFIG_ENABLED, value: b});
}

export const setZero = (b) => (dispatch) => {    
    dispatch({type: types.SET_DICE_CONFIG_ZERO, value: b});
}

export const setDice = (d) => (dispatch) => {        
    dispatch({type: types.SET_DICE_CONFIG_DICE, value: d});
}
