const INITIAL_STATE = {
    status: false,
    player: {
        playingIndex: 0,
        playing: {},
        playlist: [ ]
    }
}

export default function player(state = INITIAL_STATE, action){
    switch (action.type) {
        case "SET_PLAYER_DATA":
            return {...state, player: action.data }
        case "SET_PLAYER_STATUS":
            console.log(action);
            
            return {...state, status: action.status }
    
        default:
            return state
    }
}