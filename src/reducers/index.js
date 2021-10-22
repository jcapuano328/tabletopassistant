import { combineReducers } from 'redux';
import info from './info';
import toast from './toast';
import dice from './dice';
import spin from './spin';
import odds from './odds';
import calculator from './calculator';
import base6 from './base6';

module.exports = combineReducers({
    dice: dice,
    spin: spin,
    odds: odds,
    calculator: calculator,
    base6: base6,
    info: info,
    toast: toast
});
