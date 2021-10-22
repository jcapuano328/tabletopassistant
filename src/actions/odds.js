import types from '../constants/actionTypes';

export const setEnabled = (b) => (dispatch) => {    
    dispatch({type: types.SET_ODDS_CONFIG_ENABLED, value: b});
}

export const setRound = (v) => (dispatch) => {    
    dispatch({type: types.SET_ODDS_CONFIG_ROUND, value: v});
}

export const setRoundMethod = (v) => (dispatch) => {    
    dispatch({type: types.SET_ODDS_CONFIG_ROUNDMETHOD, value: v});
}

export const setAttack = (v) => (dispatch) => {    
    dispatch({type: types.SET_ODDS_CONFIG_ATTACK, value: v});
}

export const setDefend = (v) => (dispatch) => {    
    dispatch({type: types.SET_ODDS_CONFIG_DEFEND, value: v});
}


