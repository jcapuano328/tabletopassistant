import types from '../constants/actionTypes';

export const setMode = (v) => (dispatch) => {    
    dispatch({type: types.SET_CALC_CONFIG_MODE, value: v});
}