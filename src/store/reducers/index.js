import { combineReducers } from 'redux'

import alert from './alert'
import player from './player'
import session from './session'

export default combineReducers({
    alert,
    player,
    session
});