import types from '../constants/actionTypes';

export const setEnabled = (b) => (dispatch) => {    
    dispatch({type: types.SET_SPIN_CONFIG_ENABLED, value: b});
}

export const setNumber = (v) => (dispatch) => {    
    dispatch({type: types.SET_SPIN_CONFIG_NUMBER, value: v});
}

export const setFollowDice = (b) => (dispatch) => {    
    dispatch({type: types.SET_SPIN_CONFIG_FOLLOWDICE, value: b});
}


export const setValues = (v) => (dispatch) => {    
    dispatch({type: types.SET_SPIN_CONFIG_VALUES, value: v});
}

export const setValue = (v,i) => (dispatch) => {    
    dispatch({type: types.SET_SPIN_CONFIG_VALUE, value: {index: i, value: v}});
}

