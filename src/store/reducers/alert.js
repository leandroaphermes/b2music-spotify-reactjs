const INITIAL_STATE = {
    status: false,
    type: "",
    message: "",
    float: true
}

export default function alert(state = INITIAL_STATE, action){
    switch (action.type) {
        case "SET_ALERT":
            return {...state, ...action.data}
        default:
            return state
    }
}