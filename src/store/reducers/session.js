const INITIAL_STATE = {
    user: {}
}


export default function session(state = INITIAL_STATE, action){
    switch (action.type) {
        case "SET_SESSION":
            return {...state, user: action.sessionDate }

        default:
            return state
    }
}