import { combineReducers } from 'redux'

import player from './player'
import session from './session'

export default combineReducers({
    player,
    session
});