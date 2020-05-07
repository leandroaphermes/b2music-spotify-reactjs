import { getSessionUser, setSessionUser } from '../../utils/utils'

const INITIAL_STATE = {
    user: getSessionUser()
}


export default function session(state = INITIAL_STATE, action){
    switch (action.type) {
        case "SET_SESSION":
            setSessionUser(action.sessionDate)
            return {...state, user: action.sessionDate }
        default:
            return state
    }
}