const INITIAL_STATE = {
    user: {}
}


export default function session(state = INITIAL_STATE, action){
    switch (action) {
        case "SET_SESSION":
            console.log({...state, user: action.sessionDate })
            return {...state, user: action.sessionDate }

        default:
            return state
    }
}