const INITIAL_STATE = {
    status: false,
    player: {
        id: 0,
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
            return {...state, status: action.status }
    
        default:
            return state
    }
}