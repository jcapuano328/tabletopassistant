import types from '../constants/actionTypes';

export const setEnabled = (b) => (dispatch) => {    
    dispatch({type: types.SET_BASE6_CONFIG_ENABLED, value: b});
}

export const setNumber = (v) => (dispatch) => {    
    dispatch({type: types.SET_BASE6_CONFIG_NUMBER, value: v});
}
